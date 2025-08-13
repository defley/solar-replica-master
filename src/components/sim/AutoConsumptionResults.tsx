import { AutoConsumptionResults } from "@/lib/sim/autoconsommation";
import { formatCurrency, formatPrice } from "@/lib/sim/autoconsommation";
interface AutoConsumptionResultsProps {
  results: AutoConsumptionResults;
}

const AutoConsumptionResultsDisplay = ({ results }: AutoConsumptionResultsProps) => {

  return (
    <div className="mt-8 space-y-6">
      {/* Comparaison 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colonne gauche - Année 1 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Année 1</h3>
          
          <div className="rounded-xl border bg-card p-6">
            <div className="text-sm text-foreground/70">Économie année 1</div>
            <div className="mt-2 text-3xl font-semibold text-green-600">
              {formatCurrency(results.savingY1)}
            </div>
            
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/70">Coût EDF (part couverte)</span>
                <span className="font-medium">{formatCurrency(results.costEdfY1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Coût solaire</span>
                <span className="font-medium">{formatCurrency(results.costSolarY1)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-foreground/70">Conso couverte</span>
                <span className="font-medium">{Math.round(results.consumptionCovered).toLocaleString("fr-FR")} kWh/an</span>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite - Sur 30 ans */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sur 30 ans</h3>
          
          <div className="rounded-xl border bg-card p-6">
            <div className="text-sm text-foreground/70">Économie sur 30 ans</div>
            <div className="mt-2 text-3xl font-semibold text-green-600">
              {formatCurrency(results.savingTotal)}
            </div>
            
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/70">Total EDF (avec inflation)</span>
                <span className="font-medium">{formatCurrency(results.totalEdf)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Total solaire (prix constant)</span>
                <span className="font-medium">{formatCurrency(results.totalSolar)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-foreground/70">Prix EDF en année 30</span>
                <span className="font-medium">{formatPrice(results.edfPriceYearY)}/kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Prix moyen EDF vs solaire</span>
                <span className="font-medium">
                  {formatPrice(results.avgEdfPrice)} vs {formatPrice(results.avgSolarPrice)}/kWh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AutoConsumptionResultsDisplay;