import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const CostTrendAnalysis = ({ trends, supplierScores }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: Rp{entry?.value?.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Ingredient Price Trends */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={18} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Ingredient Price Trends</h3>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trends}>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11, fill: '#64748B' }}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickFormatter={(value) => `Rp${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="beef" 
                stroke="#DC2626" 
                strokeWidth={2}
                name="Beef"
                dot={{ r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="chicken" 
                stroke="#059669" 
                strokeWidth={2}
                name="Chicken"
                dot={{ r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="vegetables" 
                stroke="#2563EB" 
                strokeWidth={2}
                name="Vegetables"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Supplier Performance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Users" size={18} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Supplier Performance</h3>
        </div>
        
        <div className="space-y-4">
          {supplierScores?.map((supplier) => (
            <div key={supplier?.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    {supplier?.name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{supplier?.name}</p>
                  <p className="text-xs text-muted-foreground">{supplier?.category}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      supplier?.score >= 80 ? 'bg-success' : 
                      supplier?.score >= 60 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${supplier?.score}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-8">
                  {supplier?.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Waste Impact */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="AlertTriangle" size={18} className="text-warning" />
          <h3 className="text-lg font-semibold text-foreground">Waste Impact</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Food Waste Cost</span>
            <span className="text-sm font-medium text-error">Rp2,340</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Overstock Loss</span>
            <span className="text-sm font-medium text-error">Rp1,890</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Expired Items</span>
            <span className="text-sm font-medium text-error">Rp567</span>
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Total Impact</span>
              <span className="text-sm font-semibold text-error">Rp4,797</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              2.3% of total revenue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostTrendAnalysis;