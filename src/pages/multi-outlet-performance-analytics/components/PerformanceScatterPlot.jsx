import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceScatterPlot = ({ data, onOutletClick }) => {
  const [hoveredOutlet, setHoveredOutlet] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(value);
  };

  const formatPercentage = (value) => {
    return `${value?.toFixed(1)}%`;
  };

  const getOutletColor = (profitability) => {
    if (profitability >= 25) return '#059669'; // success
    if (profitability >= 15) return '#0EA5E9'; // accent
    if (profitability >= 10) return '#D97706'; // warning
    return '#DC2626'; // error
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-modal">
          <div className="flex items-center space-x-2 mb-3">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: getOutletColor(data?.profitability) }}
            />
            <h4 className="font-semibold text-foreground">{data?.outlet}</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sales Performance:</span>
              <span className="font-medium">{formatPercentage(data?.salesPerformance)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Inventory Efficiency:</span>
              <span className="font-medium">{formatPercentage(data?.inventoryEfficiency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue:</span>
              <span className="font-medium">{formatCurrency(data?.revenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Profitability:</span>
              <span className="font-medium">{formatPercentage(data?.profitability)}</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">Click to view details</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleDotClick = (data) => {
    if (onOutletClick) {
      onOutletClick(data?.outlet);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Scatter" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Performance Correlation</h3>
            <p className="text-sm text-muted-foreground">Sales vs Inventory Efficiency</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>Bubble size = Revenue</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>Color = Profitability</span>
          </div>
        </div>
      </div>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              type="number" 
              dataKey="salesPerformance" 
              name="Sales Performance"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="#64748B"
              fontSize={12}
            />
            <YAxis 
              type="number" 
              dataKey="inventoryEfficiency" 
              name="Inventory Efficiency"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="#64748B"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              data={data} 
              fill="#2563EB"
              onClick={handleDotClick}
              style={{ cursor: 'pointer' }}
            >
              {data?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getOutletColor(entry?.profitability)}
                  r={Math.max(6, Math.min(20, entry?.revenue / 50000))}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">Profitability:</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">≥25%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">15-24%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-xs text-muted-foreground">10-14%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-error" />
                <span className="text-xs text-muted-foreground">&lt;10%</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Click any bubble for detailed analysis
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceScatterPlot;