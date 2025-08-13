// Autoconsommation calculation module

export interface AutoConsumptionParams {
  consumptionKwh: number;      // kWh/an
  coveragePct: number;         // 0-100
  edfTtc: number;             // €/kWh TTC
  solarHt: number;            // €/kWh HT
  vatPct: number;             // 0-100
  inflationPct: number;       // 0-100
  horizonYears: number;       // années
}

export interface AutoConsumptionResults {
  // Année 1
  costEdfY1: number;
  costSolarY1: number;
  savingY1: number;
  
  // Projection
  totalEdf: number;
  totalSolar: number;
  savingTotal: number;
  
  // Prix moyens et finaux
  edfPriceYearY: number;
  avgEdfPrice: number;
  avgSolarPrice: number;
  
  // Données pour graphique
  yearlyData: Array<{
    year: number;
    cumulEdf: number;
    cumulSolar: number;
    economie: number;
  }>;
  
  // Métadonnées
  consumptionCovered: number; // kWh/an
  solarPriceTtc: number;      // €/kWh TTC
}

export function calculateAutoConsumption(params: AutoConsumptionParams): AutoConsumptionResults {
  const {
    consumptionKwh,
    coveragePct,
    edfTtc,
    solarHt,
    vatPct,
    inflationPct,
    horizonYears
  } = params;

  // Calculs de base
  const cov = coveragePct / 100;
  const VAT = vatPct / 100;
  const r = inflationPct / 100;
  const consumptionCovered = consumptionKwh * cov;
  const solarPriceTtc = solarHt * (1 + VAT);

  // Année 1
  const costEdfY1 = consumptionCovered * edfTtc;
  const costSolarY1 = consumptionCovered * solarPriceTtc;
  const savingY1 = Math.max(costEdfY1 - costSolarY1, 0);

  // Projection sur horizonYears
  let totalEdf = 0;
  let totalSolar = 0;
  const yearlyData: Array<{
    year: number;
    cumulEdf: number;
    cumulSolar: number;
    economie: number;
  }> = [];

  for (let t = 0; t < horizonYears; t++) {
    const yearEdfCost = consumptionCovered * edfTtc * Math.pow(1 + r, t);
    const yearSolarCost = consumptionCovered * solarPriceTtc;
    
    totalEdf += yearEdfCost;
    totalSolar += yearSolarCost;
    
    yearlyData.push({
      year: t + 1,
      cumulEdf: totalEdf,
      cumulSolar: totalSolar,
      economie: Math.max(totalEdf - totalSolar, 0)
    });
  }

  const savingTotal = Math.max(totalEdf - totalSolar, 0);

  // Prix moyens et finaux
  const edfPriceYearY = edfTtc * Math.pow(1 + r, horizonYears - 1);
  const avgEdfPrice = totalEdf / (consumptionCovered * horizonYears);
  const avgSolarPrice = solarPriceTtc;

  return {
    costEdfY1,
    costSolarY1,
    savingY1,
    totalEdf,
    totalSolar,
    savingTotal,
    edfPriceYearY,
    avgEdfPrice,
    avgSolarPrice,
    yearlyData,
    consumptionCovered,
    solarPriceTtc
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(price);
}