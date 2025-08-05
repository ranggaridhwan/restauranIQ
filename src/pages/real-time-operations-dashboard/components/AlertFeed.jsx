import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertFeed = ({ alerts, onAlertAction }) => {
  const [filter, setFilter] = useState('all');

  const alertTypes = [
    { id: 'all', name: 'All Alerts', count: alerts?.length },
    { id: 'critical', name: 'Critical', count: alerts?.filter(a => a?.priority === 'critical')?.length },
    { id: 'warning', name: 'Warning', count: alerts?.filter(a => a?.priority === 'warning')?.length },
    { id: 'info', name: 'Info', count: alerts?.filter(a => a?.priority === 'info')?.length }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'stockout':
        return 'AlertTriangle';
      case 'low_stock':
        return 'AlertCircle';
      case 'expiring':
        return 'Clock';
      case 'system':
        return 'Settings';
      case 'waste':
        return 'Trash2';
      default:
        return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'info':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert.priority === filter);

  const handleQuickAction = (alertId, action) => {
    if (onAlertAction) {
      onAlertAction(alertId, action);
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Live Alerts</h3>
          <p className="text-sm text-muted-foreground">Real-time system notifications</p>
        </div>
        <Button variant="outline" size="sm" iconName="RefreshCw" iconSize={14}>
          Refresh
        </Button>
      </div>
      {/* Alert Type Filter */}
      <div className="flex space-x-1 mb-4 p-1 bg-muted rounded-lg">
        {alertTypes?.map((type) => (
          <button
            key={type?.id}
            onClick={() => setFilter(type?.id)}
            className={`
              flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-micro
              ${filter === type?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            {type?.name} ({type?.count})
          </button>
        ))}
      </div>
      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredAlerts?.map((alert) => (
          <div
            key={alert.id}
            className={`
              border rounded-lg p-4 transition-micro hover:shadow-sm
              ${getPriorityColor(alert.priority)}
            `}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <Icon name={getAlertIcon(alert.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground truncate">{alert.title}</p>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {formatTimeAgo(alert.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                
                {alert.actions && alert.actions?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {alert.actions?.map((action) => (
                      <Button
                        key={action?.id}
                        variant="outline"
                        size="xs"
                        onClick={() => handleQuickAction(alert.id, action?.id)}
                      >
                        {action?.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredAlerts?.length === 0 && (
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="text-center">
            <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-4" />
            <p className="text-muted-foreground">No alerts in this category</p>
          </div>
        </div>
      )}
      {/* Quick Actions Footer */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" fullWidth iconName="CheckCircle" iconSize={14}>
            Mark All Read
          </Button>
          <Button variant="outline" size="sm" fullWidth iconName="Settings" iconSize={14}>
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertFeed;