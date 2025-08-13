import { useEffect, useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import AutoConsumptionPanel, { AutoConsumptionState } from "@/components/sim/AutoConsumptionPanel";
import AutoConsumptionResultsDisplay from "@/components/sim/AutoConsumptionResults";
import { calculateAutoConsumption } from "@/lib/sim/autoconsommation";

// Constantes pour les calculs
const PROD_SPEC_KWH_PER_M2 = 198; // Production spécifique kWh/m²/an (basé sur 0.165 kWc/m² × 1200 kWh/kWc/an)
const EM_CO2_RTE_2019_G_PER_KWH = 80; // Émission CO₂ RTE 2019 en g/kWh
const PAIEMENT_UNIQUE_RATIO = 0.576599327; // Ratio appliqué au total 30 ans pour paiement unique

const PAYMENT_MODES = [
  { key: "monthly", label: "Loyer mensuel" },
  { key: "lump_sum", label: "Paiement en une fois à la construction" },
] as const;

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

const SimulateurToiture = () => {
  const [surface, setSurface] = useState<number>(800);
  const [paymentMode, setPaymentMode] = useState<(typeof PAYMENT_MODES)[number]["key"]>("monthly");
  const [autoSavings, setAutoSavings] = useState<number>(0);
  
  // État autoconsommation
  const [autoConsumptionState, setAutoConsumptionState] = useState<AutoConsumptionState>({
    autoToggle: false,
    consumptionKwh: 4500,
    coveragePct: 40
  });

  // Charger depuis localStorage au montage
  useEffect(() => {
    const saved = localStorage.getItem("simulateur-toiture");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSurface(data.surface || 800);
        setPaymentMode(data.paymentMode || "monthly");
        setAutoSavings(data.autoSavings || 0);
        
        // Charger état autoconsommation
        if (data.autoConsumption) {
          setAutoConsumptionState(prev => ({ ...prev, ...data.autoConsumption }));
        }
      } catch (e) {
        console.error("Erreur lors du chargement des données:", e);
      }
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("simulateur-toiture", JSON.stringify({
      surface,
      paymentMode,
      autoSavings,
      autoConsumption: autoConsumptionState
    }));
  }, [surface, paymentMode, autoSavings, autoConsumptionState]);

  const onSurfaceChange = (v: number) => setSurface(clamp(Number.isFinite(v) ? v : 100, 100, 3000));
  
  const onAutoConsumptionChange = (updates: Partial<AutoConsumptionState>) => {
    setAutoConsumptionState(prev => ({ ...prev, ...updates }));
  };

  // Calculs
  const isFeasible = surface >= 500;
  const showAutoConsumption = surface > 900;
  
  const calculatedResults = useMemo(() => {
    if (!isFeasible) {
      return { loyerAnnuel: 0, co2Evite: 0 };
    }

    const loyerAnnuel = surface * 3.5;

    const prodAnnuelle = surface * PROD_SPEC_KWH_PER_M2;
    const co2Evite = Math.round((prodAnnuelle * EM_CO2_RTE_2019_G_PER_KWH / 1000) / 1000 * 10) / 10; // Arrondi à 0.1 t près

    return { loyerAnnuel, co2Evite };
  }, [surface, isFeasible]);

  const { loyerAnnuel, co2Evite } = calculatedResults;
  const totalSur30Ans = loyerAnnuel * 30;
  const paiementUnique = totalSur30Ans * PAIEMENT_UNIQUE_RATIO;
  const co2Total30Ans = Math.round(co2Evite * 30 * 10) / 10; // Arrondi à 0.1 T près

  // Calculs autoconsommation
  const autoConsumptionResults = useMemo(() => {
    if (!autoConsumptionState.autoToggle) return null;
    return calculateAutoConsumption(autoConsumptionState);
  }, [autoConsumptionState]);

  return (
    <section id="simulateur-toiture" className="py-20 md:py-28">
      <div className="container-xl">
        <header className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl leading-tight">
            Simuler votre loyer annuel pendant 30 ans
          </h2>
        </header>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Controls */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <Label className="text-base">Taille du toit (m²)</Label>
              <p className="text-sm text-foreground/70 mt-1">
                Surface disponible pour l'installation photovoltaïque.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1">
                  <Slider
                    value={[surface]}
                    min={100}
                    max={3000}
                    step={10}
                    onValueChange={(v) => onSurfaceChange(v[0] ?? 100)}
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    min={100}
                    max={3000}
                    step={10}
                    value={surface}
                    onChange={(e) => onSurfaceChange(Number(e.target.value))}
                    className="w-full h-10 rounded-md border bg-background px-3 text-right focus-ring"
                    aria-label="Surface en m²"
                  />
                </div>
                <span className="text-sm font-medium">m²</span>
              </div>
              {surface < 500 && (
                <p className="mt-2 text-sm text-destructive">
                  ⚠️ Projet non réalisable en dessous de 500 m²
                </p>
              )}
            </div>

            <div>
              <Label className="text-base">Mode de paiement</Label>
              <RadioGroup 
                value={paymentMode} 
                onValueChange={(value) => setPaymentMode(value as typeof paymentMode)}
                className="mt-4"
              >
                {PAYMENT_MODES.map((mode) => (
                  <div key={mode.key} className="flex items-center space-x-2">
                    <RadioGroupItem value={mode.key} id={mode.key} />
                    <Label htmlFor={mode.key} className="font-medium cursor-pointer">
                      {mode.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Panel autoconsommation - affiché uniquement si surface > 900 m² */}
            {showAutoConsumption && (
              <AutoConsumptionPanel 
                state={autoConsumptionState}
                onStateChange={onAutoConsumptionChange}
              />
            )}

          </div>

          {/* Right: Results */}
          <aside className="lg:col-span-5">
            {!isFeasible ? (
              <div className="rounded-xl border bg-card p-6">
                <div className="text-center">
                  <div className="text-destructive font-medium mb-2">Projet non réalisable</div>
                  <p className="text-sm text-foreground/70">
                    La surface minimale requise est de 500 m² pour rendre le projet viable.
                  </p>
                </div>
                <div className="mt-6">
                  <button 
                    disabled
                    className="w-full rounded-full h-11 px-5 inline-flex items-center justify-center bg-muted text-muted-foreground font-medium cursor-not-allowed"
                  >
                    Demander une étude gratuite
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {paymentMode === "monthly" ? (
                  <>
                    <div className="rounded-xl border bg-card p-6">
                      <div className="text-sm text-foreground/70">Loyer annuel</div>
                      <div className="mt-2 text-3xl font-semibold">{formatCurrency(loyerAnnuel)}</div>
                    </div>
                    <div className="rounded-xl border bg-card p-6">
                      <div className="text-sm text-foreground/70">Total de CO₂ évité sur 30 ans</div>
                      <div className="mt-2 text-2xl font-semibold">-{co2Total30Ans.toLocaleString("fr-FR")} T</div>
                      <div className="mt-1 text-xs text-foreground/70">
                        Source : Étude RTE (2019)
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-xl border bg-card p-6">
                      <div className="text-sm text-foreground/70">Montant unique</div>
                      <div className="mt-2 text-3xl font-semibold">{formatCurrency(paiementUnique)}</div>
                    </div>
                    <div className="rounded-xl border bg-card p-6">
                      <div className="text-sm text-foreground/70">Total de CO₂ évité sur 30 ans</div>
                      <div className="mt-2 text-xl font-semibold">-{co2Total30Ans.toLocaleString("fr-FR")} T</div>
                      <div className="mt-1 text-xs text-foreground/70">
                        Source : Étude RTE (2019)
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-2">
                  <a 
                    href="/mondossier" 
                    className="w-full rounded-full h-11 px-5 inline-flex items-center justify-center bg-primary text-primary-foreground font-medium focus-ring"
                  >
                    Demander une étude gratuite
                  </a>
                  <a 
                    href="tel:+33412280241" 
                    className="mt-3 block text-center text-sm text-foreground/80 hover:underline focus-ring rounded-md"
                  >
                    ou appelez nous au 04.12.28.02.41
                  </a>
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Résultats autoconsommation - affichés seulement si surface > 900 m² ET toggle activé */}
        {showAutoConsumption && autoConsumptionState.autoToggle && autoConsumptionResults && (
          <AutoConsumptionResultsDisplay 
            results={autoConsumptionResults}
          />
        )}
      </div>
    </section>
  );
};

export default SimulateurToiture;