import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, trend, trendValue, status, icon, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success border-success/20 bg-success/5';
      case 'warning':
        return 'text-warning border-warning/20 bg-warning/5';
      case 'error':
        return 'text-error border-error/20 bg-error/5';
      default:
        return 'text-primary border-primary/20 bg-primary/5';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div 
      className={`
        bg-card border rounded-lg p-6 cursor-pointer transition-micro hover:shadow-card
        ${getStatusColor(status)}
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${getStatusColor(status)}`}>
          <Icon name={icon} size={20} />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${getTrendColor(trend)}`}>
          <Icon name={getTrendIcon(trend)} size={14} />
          <span>{trendValue}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-semibold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default KPICard;