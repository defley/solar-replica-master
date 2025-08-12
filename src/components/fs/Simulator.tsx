import { useEffect, useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Internal reproduction authorized by Ferme Solaire
// NOTE: This is a faithful reimplementation of the homepage simulator UI.
// The calculation model is a placeholder and will be replaced with the exact
// formula after build-time scraping of the original assets/scripts.

const TERRAIN_TYPES = [
  { key: "prairie", label: "Prairie et Pâturage" },
  { key: "degrade", label: "Terrain dégradé" },
  { key: "prairie-friche", label: "Prairie et friche agricole" },
  { key: "cultive", label: "Terrain cultivé" },
  { key: "inutilise", label: "Terrain inutilisé / plan d'eau" },
  { key: "ombriere", label: "Ombrière" },
  { key: "un_a_trois", label: "De 1 à 3 hectares" },
] as const;

const ENSOLEILLEMENT = [
  { key: "sud", label: "Moitié Sud" },
  { key: "nord", label: "Moitié Nord" },
] as const;

// Temporary coefficients tuned to match headline ranges; will be replaced.
const BASE_EUR_PER_HA = 3500;
const TERRAIN_COEF: Record<string, number> = {
  prairie: 1,
  degrade: 1.15,
  "prairie-friche": 0.95,
  cultive: 1,
  inutilise: 1.05,
  ombriere: 0.6,
  un_a_trois: 1,
};
const SUN_COEF: Record<string, number> = { sud: 1.2, nord: 0.9 };

function formatCurrency(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function clamp(v: number, min: number, max: number) { return Math.min(max, Math.max(min, v)); }

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
    setHectares((h) => Math.round(h));
  }, []);

  return (
    <section id="simulateur" className="py-20 md:py-28">
      <div className="container-xl">
        <header className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl leading-tight">Simulez votre loyer annuel sur une durée de 20 à 40 ans</h2>
        </header>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Controls */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <Label className="text-base">Type de terrain</Label>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TERRAIN_TYPES.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTerrain(t.key)}
                    className={cn(
                      "text-left rounded-lg border px-4 py-3 transition-colors focus-ring",
                      terrain === t.key ? "bg-primary/5 border-primary text-foreground" : "bg-card hover:bg-muted"
                    )}
                    aria-pressed={terrain === t.key}
                  >
                    <div className="font-medium">{t.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base">Taille de votre terrain</Label>
              <p className="text-sm text-foreground/70 mt-1">Surface, en hectares, du terrain à étudier.</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1">
                  <Slider
                    value={[hectares]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(v) => onHectaresChange(v[0] ?? 1)}
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={hectares}
                    onChange={(e) => onHectaresChange(Number(e.target.value))}
                    className="w-full h-10 rounded-md border bg-background px-3 text-right focus-ring"
                    aria-label="Hectares"
                  />
                </div>
                <span className="text-sm font-medium">Ha</span>
              </div>
            </div>

            <div>
              <Label className="text-base">Niveau d'ensoleillement</Label>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {ENSOLEILLEMENT.map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setSun(r.key)}
                    className={cn(
                      "rounded-lg border px-4 py-3 text-left transition-colors focus-ring",
                      sun === r.key ? "bg-primary/5 border-primary" : "bg-card hover:bg-muted"
                    )}
                    aria-pressed={sun === r.key}
                  >
                    <div className="font-medium">{r.label}</div>
                    <div className="text-xs text-foreground/70 mt-1">
                      {r.key === "sud"
                        ? "Nouvelle Aquitaine, Occitanie, PACA, Auvergne Rhône-Alpes et Corse"
                        : "Toutes les régions françaises non situées sur la moitié sud"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <aside className="lg:col-span-5">
            <div className="rounded-xl border bg-card p-6">
              <div>
                <div className="text-sm text-foreground/70">Loyer maximum escompté</div>
                <div className="mt-2 text-3xl font-semibold">{formatCurrency(perYear)}/an</div>
                <div className="mt-1 text-sm text-foreground/70">
                  soit un total de <span className="font-medium">{formatCurrency(total40)}</span> pour un bail de 40 ans
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="text-sm text-foreground/70">Tonnes de CO2 évitées</div>
                <div className="mt-2 text-xl font-semibold">{co2.toLocaleString("fr-FR")} t/an</div>
                <div className="mt-1 text-xs text-foreground/70">
                  Source : Étude RTE (2019) – simulation du système électrique sans éolien ni photovoltaïque.
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                <a href="/monprojet" className="rounded-full h-11 px-5 inline-flex items-center justify-center bg-primary text-primary-foreground font-medium focus-ring">
                  Déposer son dossier
                </a>
                <a href="tel:+33412280241" className="text-center text-sm text-foreground/80 hover:underline focus-ring rounded-md">
                  ou appelez nous au 04.12.28.02.41
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Simulator;
