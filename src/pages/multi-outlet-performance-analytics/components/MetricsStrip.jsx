import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsStrip = ({ metrics, selectedOutlets }) => {
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

  const getVarianceColor = (variance) => {
    if (variance > 0) return 'text-success';
    if (variance < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getVarianceIcon = (variance) => {
    if (variance > 0) return 'TrendingUp';
    if (variance < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Consolidated Revenue */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={16} className="text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
          </div>
          <div className="flex items-center space-x-1">
            <Icon 
              name={getVarianceIcon(metrics?.revenue?.variance)} 
              size={14} 
              className={getVarianceColor(metrics?.revenue?.variance)}
            />
            <span className={`text-xs font-medium ${getVarianceColor(metrics?.revenue?.variance)}`}>
              {formatPercentage(Math.abs(metrics?.revenue?.variance))}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-foreground">
            {formatCurrency(metrics?.revenue?.total)}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Best: {metrics?.revenue?.best?.outlet}</span>
            <span>{formatCurrency(metrics?.revenue?.best?.value)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Worst: {metrics?.revenue?.worst?.outlet}</span>
            <span>{formatCurrency(metrics?.revenue?.worst?.value)}</span>
          </div>
        </div>
      </div>
      {/* Average Inventory Turnover */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="RotateCcw" size={16} className="text-accent" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Avg Turnover</h3>
          </div>
          <div className="flex items-center space-x-1">
            <Icon 
              name={getVarianceIcon(metrics?.turnover?.variance)} 
              size={14} 
              className={getVarianceColor(metrics?.turnover?.variance)}
            />
            <span className={`text-xs font-medium ${getVarianceColor(metrics?.turnover?.variance)}`}>
              {formatPercentage(Math.abs(metrics?.turnover?.variance))}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-foreground">
            {metrics?.turnover?.average?.toFixed(1)}x
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Best: {metrics?.turnover?.best?.outlet}</span>
            <span>{metrics?.turnover?.best?.value?.toFixed(1)}x</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Worst: {metrics?.turnover?.worst?.outlet}</span>
            <span>{metrics?.turnover?.worst?.value?.toFixed(1)}x</span>
          </div>
        </div>
      </div>
      {/* Total Waste Percentage */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Trash2" size={16} className="text-warning" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Total Waste</h3>
          </div>
          <div className="flex items-center space-x-1">
            <Icon 
              name={getVarianceIcon(-metrics?.waste?.variance)} 
              size={14} 
              className={getVarianceColor(-metrics?.waste?.variance)}
            />
            <span className={`text-xs font-medium ${getVarianceColor(-metrics?.waste?.variance)}`}>
              {formatPercentage(Math.abs(metrics?.waste?.variance))}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-foreground">
            {formatPercentage(metrics?.waste?.average)}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Best: {metrics?.waste?.best?.outlet}</span>
            <span>{formatPercentage(metrics?.waste?.best?.value)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Worst: {metrics?.waste?.worst?.outlet}</span>
            <span>{formatPercentage(metrics?.waste?.worst?.value)}</span>
          </div>
        </div>
      </div>
      {/* Procurement Efficiency */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="ShoppingCart" size={16} className="text-success" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Procurement Eff.</h3>
          </div>
          <div className="flex items-center space-x-1">
            <Icon 
              name={getVarianceIcon(metrics?.procurement?.variance)} 
              size={14} 
              className={getVarianceColor(metrics?.procurement?.variance)}
            />
            <span className={`text-xs font-medium ${getVarianceColor(metrics?.procurement?.variance)}`}>
              {formatPercentage(Math.abs(metrics?.procurement?.variance))}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-foreground">
            {formatPercentage(metrics?.procurement?.average)}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Best: {metrics?.procurement?.best?.outlet}</span>
            <span>{formatPercentage(metrics?.procurement?.best?.value)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Worst: {metrics?.procurement?.worst?.outlet}</span>
            <span>{formatPercentage(metrics?.procurement?.worst?.value)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsStrip;