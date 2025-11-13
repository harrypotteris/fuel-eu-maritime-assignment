export function percentDiff(baseline: number, comparison: number): number | null {
  if (!baseline || baseline === 0) return null;
  return ((comparison / baseline) - 1) * 100;
}
