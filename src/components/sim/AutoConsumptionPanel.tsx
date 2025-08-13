import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AutoConsumptionState {
  autoToggle: boolean;
  consumptionKwh: number;
  coveragePct: number;
  edfTtc: number;
  solarHt: number;
  vatPct: number;
  inflationPct: number;
  horizonYears: number;
}

interface AutoConsumptionPanelProps {
  state: AutoConsumptionState;
  onStateChange: (updates: Partial<AutoConsumptionState>) => void;
}

const AutoConsumptionPanel = ({ state, onStateChange }: AutoConsumptionPanelProps) => {
  const handleNumberChange = (field: keyof AutoConsumptionState, value: string) => {
    const numValue = parseFloat(value) || 0;
    onStateChange({ [field]: numValue });
  };

  return (
    <div className="space-y-6">
      {/* Toggle principal */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="autoToggle"
          checked={state.autoToggle}
          onCheckedChange={(checked) => onStateChange({ autoToggle: !!checked })}
        />
        <Label htmlFor="autoToggle" className="text-base font-medium cursor-pointer">
          Voulez-vous faire des économies via l'autoconsommation ?
        </Label>
      </div>

      {/* Panel collapsible */}
      <Collapsible open={state.autoToggle}>
        <CollapsibleContent className="space-y-6">
          <div className="rounded-lg border bg-card/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-lg font-semibold">Autoconsommation</h3>
              <ChevronDown className="h-4 w-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Consommation annuelle */}
              <div>
                <Label htmlFor="consumptionKwh" className="text-sm font-medium">
                  Consommation annuelle du foyer (kWh/an)
                </Label>
                <p className="text-xs text-foreground/70 mt-1 mb-3">
                  Moyenne nationale ≈ 4 500 kWh/an — modifiable.
                </p>
                <input
                  id="consumptionKwh"
                  type="number"
                  min={0}
                  step={100}
                  value={state.consumptionKwh}
                  onChange={(e) => handleNumberChange('consumptionKwh', e.target.value)}
                  className="w-full h-10 rounded-md border bg-background px-3 focus-ring"
                  aria-describedby="consumptionKwh-help"
                />
              </div>

              {/* Part couverte */}
              <div>
                <Label htmlFor="coveragePct" className="text-sm font-medium">
                  Part de la conso couverte par la centrale (%)
                </Label>
                <p className="text-xs text-foreground/70 mt-1 mb-3">
                  Part estimée de votre conso couverte par le solaire.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Slider
                      value={[state.coveragePct]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(v) => onStateChange({ coveragePct: v[0] ?? 40 })}
                      aria-describedby="coveragePct-help"
                    />
                  </div>
                  <span className="text-sm font-medium w-12">{state.coveragePct}%</span>
                </div>
              </div>

              {/* Tarif EDF */}
              <div>
                <Label htmlFor="edfTtc" className="text-sm font-medium">
                  Tarif Bleu EDF TTC (€/kWh)
                </Label>
                <p className="text-xs text-foreground/70 mt-1 mb-3">
                  Éditable. Nous projeterons l'inflation sur {state.horizonYears} ans.
                </p>
                <input
                  id="edfTtc"
                  type="number"
                  min={0}
                  step={0.001}
                  value={state.edfTtc}
                  onChange={(e) => handleNumberChange('edfTtc', e.target.value)}
                  className="w-full h-10 rounded-md border bg-background px-3 focus-ring"
                  aria-describedby="edfTtc-help"
                />
              </div>

              {/* Prix solaire HT */}
              <div>
                <Label htmlFor="solarHt" className="text-sm font-medium">
                  Prix de l'énergie solaire (€/kWh HT)
                </Label>
                <p className="text-xs text-foreground/70 mt-1 mb-3">
                  Coût moyen production centrale. Pas d'inflation appliquée.
                </p>
                <input
                  id="solarHt"
                  type="number"
                  min={0}
                  step={0.001}
                  value={state.solarHt}
                  onChange={(e) => handleNumberChange('solarHt', e.target.value)}
                  className="w-full h-10 rounded-md border bg-background px-3 focus-ring"
                  aria-describedby="solarHt-help"
                />
              </div>

              {/* TVA */}
              <div>
                <Label htmlFor="vatPct" className="text-sm font-medium">
                  TVA (%) appliquée au solaire
                </Label>
                <input
                  id="vatPct"
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={state.vatPct}
                  onChange={(e) => handleNumberChange('vatPct', e.target.value)}
                  className="w-full h-10 rounded-md border bg-background px-3 focus-ring"
                />
              </div>

              {/* Inflation */}
              <div>
                <Label htmlFor="inflationPct" className="text-sm font-medium">
                  Inflation énergétique moyenne (%/an)
                </Label>
                <p className="text-xs text-foreground/70 mt-1 mb-3">
                  Appliquée au Tarif Bleu
                </p>
                <input
                  id="inflationPct"
                  type="number"
                  min={0}
                  max={50}
                  step={0.1}
                  value={state.inflationPct}
                  onChange={(e) => handleNumberChange('inflationPct', e.target.value)}
                  className="w-full h-10 rounded-md border bg-background px-3 focus-ring"
                  aria-describedby="inflationPct-help"
                />
              </div>

              {/* Durée projection */}
              <div>
                <Label htmlFor="horizonYears" className="text-sm font-medium">
                  Durée de projection (années)
                </Label>
                <input
                  id="horizonYears"
                  type="number"
                  min={1}
                  max={30}
                  step={1}
                  value={state.horizonYears}
                  onChange={(e) => handleNumberChange('horizonYears', e.target.value)}
                  className="w-full h-10 rounded-md border bg-background px-3 focus-ring"
                />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AutoConsumptionPanel;