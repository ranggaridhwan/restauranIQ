import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, benchmark, icon, currency = true }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const formatValue = (val) => {
    if (currency && typeof val === 'number') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })?.format(val);
    }
    return val;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-micro">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="text-2xl font-semibold text-foreground">
          {formatValue(value)}
        </div>
        
        {change && (
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
              <Icon name={getChangeIcon()} size={14} />
              <span className="text-sm font-medium">{change}</span>
            </div>
            <span className="text-xs text-muted-foreground">vs last period</span>
          </div>
        )}
        
        {benchmark && (
          <div className="text-xs text-muted-foreground">
            Industry avg: {formatValue(benchmark)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;