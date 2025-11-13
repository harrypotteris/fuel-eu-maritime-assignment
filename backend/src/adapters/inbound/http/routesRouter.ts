import { Router } from "express";
import { prisma } from "../../outbound/prismaClient";
import { computeCB } from "../../../core/application/computeCB";
import { percentDiff } from "../../../core/application/computeComparison";
import { allocatePoolGreedy } from "../../../core/application/pooling";
import { bankSurplus, getBanked, applyBanked } from "../../../core/application/banking";

const router = Router();

/**
 * GET /api/routes
 * fetch all routes (optionally filter by year, vesselType, fuelType)
 */
router.get("/routes", async (req, res) => {
  const { year, vesselType, fuelType } = req.query;
  const where: any = {};
  if (year) where.year = Number(year);
  if (vesselType) where.vesselType = String(vesselType);
  if (fuelType) where.fuelType = String(fuelType);
  const rows = await prisma.route.findMany({ where, orderBy: { routeId: "asc" } });
  res.json(rows);
});

/**
 * POST /api/routes/:routeId/baseline
 * set the given route as baseline for its year (unset other baselines that year)
 */
router.post("/routes/:routeId/baseline", async (req, res) => {
  const { routeId } = req.params;
  const route = await prisma.route.findUnique({ where: { routeId } });
  if (!route) return res.status(404).json({ error: "route not found" });

  // unset previous baseline for same year
  await prisma.route.updateMany({
    where: { year: route.year },
    data: { isBaseline: false }
  });

  const updated = await prisma.route.update({
    where: { routeId },
    data: { isBaseline: true }
  });

  res.json(updated);
});

/**
 * GET /api/routes/comparison
 * returns comparisons between baseline and others per year
 */
router.get("/routes/comparison", async (req, res) => {
  const rows = await prisma.route.findMany();
  const byYear: Record<number, { baseline: any | null; others: any[] }> = {};

  for (const r of rows) {
    byYear[r.year] ||= { baseline: null, others: [] };
    if (r.isBaseline) byYear[r.year].baseline = r;
    else byYear[r.year].others.push(r);
  }

  const out: any[] = [];
  for (const [yearStr, group] of Object.entries(byYear)) {
    const year = Number(yearStr);
    const baseline = group.baseline;
    if (!baseline) continue;
    for (const other of group.others) {
      const pd = percentDiff(baseline.ghgIntensity, other.ghgIntensity);
      out.push({
        year,
        baselineRouteId: baseline.routeId,
        comparisonRouteId: other.routeId,
        baselineIntensity: baseline.ghgIntensity,
        comparisonIntensity: other.ghgIntensity,
        percentDiff: pd,
        compliant: other.ghgIntensity <= 89.3368
      });
    }
  }

  res.json(out);
});

/**
 * GET /api/compliance/cb?routeId=&year=
 * compute CB for specific route
 */
router.get("/compliance/cb", async (req, res) => {
  const { routeId } = req.query;
  if (!routeId) return res.status(400).json({ error: "routeId required" });

  const r = await prisma.route.findUnique({ where: { routeId: String(routeId) } });
  if (!r) return res.status(404).json({ error: "route not found" });

  const cb = computeCB(r.ghgIntensity, r.fuelConsumption);
  res.json({ routeId: r.routeId, year: r.year, cb });
});

/**
 * BANKING endpoints
 */

/**
 * GET /api/banking/records?shipId=&year=
 */
router.get("/banking/records", async (req, res) => {
  const { shipId, year } = req.query;
  if (!shipId || !year) return res.status(400).json({ error: "shipId and year required" });
  const rows = await prisma.bankEntry.findMany({ where: { shipId: String(shipId), year: Number(year) }, orderBy: { createdAt: "desc" } });
  res.json(rows);
});

/**
 * POST /api/banking/bank
 * body: { shipId, year, amount }
 */
router.post("/banking/bank", async (req, res) => {
  const { shipId, year, amount } = req.body;
  if (!shipId || !year || amount == null) return res.status(400).json({ error: "shipId, year, amount required" });
  try {
    const rec = await bankSurplus(String(shipId), Number(year), Number(amount));
    res.json(rec);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "bank failed" });
  }
});

/**
 * POST /api/banking/apply
 * body: { shipId, year, amount }
 */
router.post("/banking/apply", async (req, res) => {
  const { shipId, year, amount } = req.body;
  if (!shipId || !year || amount == null) return res.status(400).json({ error: "shipId, year, amount required" });
  try {
    const rec = await applyBanked(String(shipId), Number(year), Number(amount));
    res.json(rec);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "apply failed" });
  }
});

/**
 * POOLS
 * POST /api/pools
 * body: { year, members: [{ shipId, cbBefore }] }
 */
router.post("/pools", async (req, res) => {
  const { year, members } = req.body;
  if (!year || !members || !Array.isArray(members)) return res.status(400).json({ error: "year and members[] required" });

  const parsed = members.map((m: any) => ({ shipId: String(m.shipId), cbBefore: Number(m.cbBefore) }));
  const alloc = allocatePoolGreedy(parsed);
  if (!alloc.ok) return res.status(400).json({ error: alloc.message });

  // persist pool + members
  const pool = await prisma.pool.create({ data: { year: Number(year) } });
  const items = Object.entries(alloc.cbAfter as Record<string, number>).map(([shipId, cbAfter]) => ({
    poolId: pool.id,
    shipId,
    cbBefore: parsed.find(p => p.shipId === shipId)?.cbBefore ?? 0,
    cbAfter
  }));

  for (const it of items) {
    await prisma.poolMember.create({ data: it });
  }

  res.json({ poolId: pool.id, cbAfter: alloc.cbAfter });
});

export default router;
