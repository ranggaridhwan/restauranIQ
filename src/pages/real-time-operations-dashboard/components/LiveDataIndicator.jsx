import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const LiveDataIndicator = ({ onRefreshIntervalChange, onManualRefresh }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [refreshInterval, setRefreshInterval] = useState('15');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: 'manual', label: 'Manual only' }
  ];

  useEffect(() => {
    let interval;
    
    if (refreshInterval !== 'manual') {
      interval = setInterval(() => {
        setLastUpdate(new Date());
        if (onRefreshIntervalChange) {
          onRefreshIntervalChange(parseInt(refreshInterval));
        }
      }, parseInt(refreshInterval) * 60 * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [refreshInterval, onRefreshIntervalChange]);

  useEffect(() => {
    // Simulate connection status changes
    const connectionCheck = setInterval(() => {
      // Simulate occasional disconnections (5% chance)
      setIsConnected(Math.random() > 0.05);
    }, 10000);

    return () => clearInterval(connectionCheck);
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    setLastUpdate(new Date());
    
    if (onManualRefresh) {
      await onManualRefresh();
    }
    
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleRefreshIntervalChange = (value) => {
    setRefreshInterval(value);
    if (onRefreshIntervalChange) {
      onRefreshIntervalChange(value === 'manual' ? null : parseInt(value));
    }
  };

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getConnectionStatus = () => {
    if (!isConnected) {
      return {
        color: 'text-error',
        bgColor: 'bg-error',
        text: 'Disconnected',
        icon: 'WifiOff'
      };
    }
    
    if (isRefreshing) {
      return {
        color: 'text-warning',
        bgColor: 'bg-warning',
        text: 'Updating...',
        icon: 'RefreshCw'
      };
    }
    
    return {
      color: 'text-success',
      bgColor: 'bg-success',
      text: 'Connected',
      icon: 'Wifi'
    };
  };

  const status = getConnectionStatus();

  return (
    <div className="flex items-center space-x-4">
      {/* Connection Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${status.bgColor} animate-pulse`} />
        <div className="flex items-center space-x-1">
          <Icon 
            name={status.icon} 
            size={14} 
            className={`${status.color} ${isRefreshing ? 'animate-spin' : ''}`} 
          />
          <span className={`text-sm font-medium ${status.color}`}>
            {status.text}
          </span>
        </div>
      </div>

      {/* Last Update Time */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Icon name="Clock" size={14} />
        <span>Updated {formatLastUpdate(lastUpdate)}</span>
      </div>

      {/* Refresh Interval Selector */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Refresh:</span>
        <Select
          options={refreshOptions}
          value={refreshInterval}
          onChange={handleRefreshIntervalChange}
          className="w-32"
        />
      </div>

      {/* Manual Refresh Button */}
      <button
        onClick={handleManualRefresh}
        disabled={isRefreshing}
        className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-micro disabled:opacity-50 disabled:cursor-not-allowed"
        title="Refresh data now"
      >
        <Icon 
          name="RefreshCw" 
          size={14} 
          className={isRefreshing ? 'animate-spin' : ''} 
        />
        <span>Refresh</span>
      </button>
    </div>
  );
};

export default LiveDataIndicator;