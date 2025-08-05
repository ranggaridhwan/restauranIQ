import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ForecastChart = ({ data, selectedCategory }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.dataKey}:</span>
              <span className="font-medium text-foreground">
                {entry?.value} {entry?.dataKey === 'consumption' ? 'units' : 'predicted'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Consumption & Forecast Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Historical consumption vs predicted demand for {selectedCategory}
          </p>
        </div>
        
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-sm" />
            <span className="text-muted-foreground">Historical Consumption</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-sm" />
            <span className="text-muted-foreground">Predicted Demand</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="period" 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="consumption" 
              fill="var(--color-primary)"
              name="Historical Consumption"
              radius={[2, 2, 0, 0]}
            />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="var(--color-accent)"
              strokeWidth={3}
              name="Predicted Demand"
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;