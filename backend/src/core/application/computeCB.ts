// Target intensity constant and unit conversions
const TARGET_INTENSITY = 89.3368; // gCO2e / MJ
const MJ_PER_TON = 41000; // MJ per tonne (approx)

export function computeCB(ghgIntensity: number, fuelTons: number) {
  // energy in MJ
  const energyMJ = fuelTons * MJ_PER_TON;
  // CB in gCO2e
  const cb_g = (TARGET_INTENSITY - ghgIntensity) * energyMJ;
  // return both grams and tonnes
  return {
    cb_gco2: cb_g,
    cb_tonnes: cb_g / 1_000_000
  };
}
