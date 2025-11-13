import { prisma } from "../../adapters/outbound/prismaClient";

export async function bankSurplus(shipId: string, year: number, amount: number) {
  if (amount <= 0) throw new Error("amount must be positive to bank");
  const rec = await prisma.bankEntry.create({
    data: { shipId, year, amount }
  });
  return rec;
}

export async function getBanked(shipId: string, year: number) {
  const rows = await prisma.bankEntry.findMany({
    where: { shipId, year }
  });
  return rows.reduce((s: any, r: { amount: any; }) => s + r.amount, 0);
}

// apply banked amount: subtract from bank entries (simple implementation)
export async function applyBanked(shipId: string, year: number, applyAmount: number) {
  // fetch total
  const total = await getBanked(shipId, year);
  if (applyAmount > total) throw new Error("apply amount exceeds available banked amount");
  // create negative entry to represent application
  const rec = await prisma.bankEntry.create({
    data: { shipId, year, amount: -Math.abs(applyAmount) }
  });
  return rec;
}
