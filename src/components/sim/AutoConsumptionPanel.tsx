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
            </div>

            {/* Hypothèses */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-sm mb-3">Hypothèses de calcul :</h4>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• Prix EDF : 0,1952 €/kWh TTC</li>
                <li>• Prix centrale solaire : 0,15 €/kWh TTC</li>
                <li>• Inflation énergétique : 4 %/an (appliquée uniquement à EDF)</li>
                <li>• Durée de projection : 30 ans</li>
                <li>• Prix solaire constant (production propre)</li>
              </ul>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AutoConsumptionPanel;