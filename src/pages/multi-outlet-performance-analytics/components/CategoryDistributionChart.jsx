import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const CategoryDistributionChart = ({ data, selectedOutlets, onCategoryDrillDown }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('percentage'); // 'percentage' or 'absolute'

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

  const categoryColors = {
    'Beverages': '#2563EB',
    'Main Courses': '#059669',
    'Appetizers': '#D97706',
    'Desserts': '#DC2626',
    'Sides': '#7C3AED',
    'Specials': '#0EA5E9'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-modal">
          <h4 className="font-semibold text-foreground mb-3">{label}</h4>
          <div className="space-y-2">
            {selectedOutlets?.map((outlet) => {
              const outletData = data?.outlets?.find(o => o?.name === outlet);
              if (!outletData) return null;
              
              return (
                <div key={outlet} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{outlet}:</span>
                  <div className="text-right">
                    <span className="text-sm font-medium text-foreground">
                      {viewMode === 'percentage' 
                        ? formatPercentage(outletData?.percentage)
                        : formatCurrency(outletData?.value)
                      }
                    </span>
                    {viewMode === 'percentage' && (
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(outletData?.value)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-2 border-t border-border">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-foreground">Total:</span>
              <span className="text-sm font-semibold text-foreground">
                {formatCurrency(data?.total)}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">Click to drill down</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data) => {
    setSelectedCategory(data?.category);
    if (onCategoryDrillDown) {
      onCategoryDrillDown(data?.category, data);
    }
  };

  const getDisplayValue = (item) => {
    if (viewMode === 'percentage') {
      return item?.percentage;
    }
    return item?.total;
  };

  const maxValue = Math.max(...data?.map(item => getDisplayValue(item)));

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Category Distribution</h3>
            <p className="text-sm text-muted-foreground">
              Sales breakdown across {selectedOutlets?.length} outlet{selectedOutlets?.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('percentage')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-micro ${
                viewMode === 'percentage' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Percentage
            </button>
            <button
              onClick={() => setViewMode('absolute')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-micro ${
                viewMode === 'absolute' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Absolute
            </button>
          </div>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="category" 
              stroke="#64748B"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#64748B"
              fontSize={12}
              tickFormatter={(value) => 
                viewMode === 'percentage' 
                  ? `${value}%` 
                  : `$${(value / 1000)?.toFixed(0)}K`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={viewMode === 'percentage' ? 'percentage' : 'total'}
              onClick={handleBarClick}
              style={{ cursor: 'pointer' }}
            >
              {data?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={selectedCategory === entry?.category 
                    ? categoryColors?.[entry?.category] || '#2563EB'
                    : (categoryColors?.[entry?.category] || '#2563EB') + '80'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Category Legend and Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data?.map((category) => (
            <div
              key={category?.category}
              className={`p-3 rounded-lg border transition-micro cursor-pointer ${
                selectedCategory === category?.category
                  ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground/50'
              }`}
              onClick={() => handleBarClick(category)}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColors?.[category?.category] || '#2563EB' }}
                />
                <span className="text-sm font-medium text-foreground">{category?.category}</span>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-foreground">
                  {formatPercentage(category?.percentage)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(category?.total)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Top Category</p>
            <p className="font-semibold text-foreground">
              {data?.reduce((max, cat) => cat?.total > max?.total ? cat : max, data?.[0])?.category}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Sales</p>
            <p className="font-semibold text-foreground">
              {formatCurrency(data?.reduce((sum, cat) => sum + cat?.total, 0))}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Categories</p>
            <p className="font-semibold text-foreground">{data?.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDistributionChart;