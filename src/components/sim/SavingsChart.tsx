import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { formatCurrency } from "@/lib/sim/autoconsommation";

interface SavingsChartProps {
  data: Array<{
    year: number;
    cumulEdf: number;
    cumulSolar: number;
    economie: number;
  }>;
}

const SavingsChart = ({ data }: SavingsChartProps) => {
  const formatTooltip = (value: number, name: string) => {
    const labels: Record<string, string> = {
      cumulEdf: 'Coût EDF cumulé',
      cumulSolar: 'Coût solaire cumulé',
      economie: 'Économie cumulée'
    };
    
    return [formatCurrency(value), labels[name] || name];
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12 }}
            label={{ value: 'Années', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${Math.round(value / 1000)}k€`}
          />
          <Tooltip 
            formatter={formatTooltip}
            labelFormatter={(label) => `Année ${label}`}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          
          {/* Zone d'économie */}
          <Area
            type="monotone"
            dataKey="economie"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.1}
            strokeWidth={2}
            name="economie"
          />
          
          {/* Ligne EDF */}
          <Line
            type="monotone"
            dataKey="cumulEdf"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="cumulEdf"
          />
          
          {/* Ligne Solaire */}
          <Line
            type="monotone"
            dataKey="cumulSolar"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            name="cumulSolar"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SavingsChart;