import { useEffect, useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Internal reproduction authorized by Copro Solaire
// NOTE: This is a faithful reimplementation of the homepage simulator UI.
// The calculation model is a placeholder and will be replaced with the exact
// formula after build-time scraping of the original assets/scripts.

const TERRAIN_TYPES = [{
  key: "prairie",
  label: "Prairie et Pâturage"
}, {
  key: "degrade",
  label: "Terrain dégradé"
}, {
  key: "prairie-friche",
  label: "Prairie et friche agricole"
}, {
  key: "cultive",
  label: "Terrain cultivé"
}, {
  key: "inutilise",
  label: "Terrain inutilisé / plan d'eau"
}, {
  key: "ombriere",
  label: "Ombrière"
}, {
  key: "un_a_trois",
  label: "De 1 à 3 hectares"
}] as const;
const ENSOLEILLEMENT = [{
  key: "sud",
  label: "Moitié Sud"
}, {
  key: "nord",
  label: "Moitié Nord"
}] as const;

// Temporary coefficients tuned to match headline ranges; will be replaced.
const BASE_EUR_PER_HA = 3500;
const TERRAIN_COEF: Record<string, number> = {
  prairie: 1,
  degrade: 1.15,
  "prairie-friche": 0.95,
  cultive: 1,
  inutilise: 1.05,
  ombriere: 0.6,
  un_a_trois: 1
};
const SUN_COEF: Record<string, number> = {
  sud: 1.2,
  nord: 0.9
};
function formatCurrency(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(n);
}
function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}
const Simulator = () => {
  const [terrain, setTerrain] = useState<(typeof TERRAIN_TYPES)[number]["key"]>("prairie");
  const [sun, setSun] = useState<(typeof ENSOLEILLEMENT)[number]["key"]>("sud");
  const [hectares, setHectares] = useState<number>(5);

  // Derived outputs (placeholder model)
  const perYear = useMemo(() => {
    const coef = (TERRAIN_COEF[terrain] ?? 1) * (SUN_COEF[sun] ?? 1);
    return clamp(hectares * BASE_EUR_PER_HA * coef, 1000, 5500 * hectares);
  }, [terrain, sun, hectares]);
  const total40 = useMemo(() => perYear * 40, [perYear]);
  const co2 = useMemo(() => Math.round(-1440 * hectares * (sun === "sud" ? 1.25 : 0.9)), [hectares, sun]);

  // Keep number input and slider in sync
  const onHectaresChange = (v: number) => setHectares(clamp(Number.isFinite(v) ? v : 0, 1, 100));
  useEffect(() => {
    // Ensure integers to mirror the UX feel
    setHectares(h => Math.round(h));
  }, []);
  return <section id="simulateur" className="py-20 md:py-28">
      
    </section>;
};
export default Simulator;