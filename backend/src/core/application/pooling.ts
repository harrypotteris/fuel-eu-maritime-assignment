type Member = { shipId: string; cbBefore: number };

export function allocatePoolGreedy(members: Member[]) {
  // Validate
  const total = members.reduce((s, m) => s + m.cbBefore, 0);
  if (total < 0) {
    // insufficient total surplus
    return { ok: false, message: "Total CB sum is negative — cannot create pool", cbAfter: null };
  }

  // Start with cbAfter = cbBefore
  const cbAfterMap: Record<string, number> = {};
  for (const m of members) cbAfterMap[m.shipId] = m.cbBefore;

  // Surplus list (descending), deficit list (ascending by cb)
  const surplus = members.filter(m => m.cbBefore > 0).sort((a,b) => b.cbBefore - a.cbBefore);
  const deficit = members.filter(m => m.cbBefore < 0).sort((a,b) => a.cbBefore - b.cbBefore);

  for (const d of deficit) {
    let needed = -d.cbBefore;
    for (let i = 0; i < surplus.length && needed > 0; i++) {
      const s = surplus[i];
      const available = cbAfterMap[s.shipId];
      if (available <= 0) continue;
      const transfer = Math.min(available, needed);
      cbAfterMap[s.shipId] -= transfer;
      cbAfterMap[d.shipId] += transfer;
      needed -= transfer;
    }
    if (needed > 0) {
      // Not enough surplus to fully cover this deficit — should not happen due to total check, but guard
      return { ok: false, message: "Insufficient surplus to cover deficits", cbAfter: null };
    }
  }

  return { ok: true, message: "Allocated", cbAfter: cbAfterMap };
}
