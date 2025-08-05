import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const WaterfallChart = ({ data, onSegmentClick }) => {
  const colors = {
    positive: '#059669',
    negative: '#DC2626',
    total: '#2563EB',
    neutral: '#64748B'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Amount: <span className="font-medium text-foreground">
              Rp{data?.value?.toLocaleString('id-ID')}
            </span>
          </p>
          {data?.impact && (
            <p className="text-xs text-muted-foreground mt-1">
              Impact: {data?.impact}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Profit Margin Breakdown</h3>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span className="text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded"></div>
            <span className="text-muted-foreground">Costs</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-muted-foreground">Net Profit</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#64748B' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748B' }}
              tickFormatter={(value) => `Rp${(value / 1000)?.toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              onClick={onSegmentClick}
              cursor="pointer"
            >
              {data?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors?.[entry?.type] || colors?.neutral} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WaterfallChart;