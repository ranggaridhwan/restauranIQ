import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  trend, 
  trendValue, 
  icon, 
  status = 'normal',
  subtitle,
  onClick 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-amber-200 bg-amber-50';
      case 'success': return 'border-green-200 bg-green-50';
      default: return 'border-border bg-card';
    }
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div 
      className={`p-6 rounded-lg border transition-micro hover:shadow-card cursor-pointer ${getStatusColor()}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={icon} size={20} className="text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-semibold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        {trend && trendValue && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={14} />
            <span className="text-xs font-medium">{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;