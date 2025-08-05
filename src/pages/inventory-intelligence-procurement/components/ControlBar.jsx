import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import CategoryFilter from './CategoryFilter';

const ControlBar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  suppliers,
  selectedSupplier,
  onSupplierChange,
  forecastHorizon,
  onForecastChange,
  lastUpdate,
  onRefresh
}) => {
  const forecastOptions = [
    { value: '1', label: '1 Week' },
    { value: '2', label: '2 Weeks' },
    { value: '3', label: '3 Weeks' },
    { value: '4', label: '4 Weeks' }
  ];

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Category Filter */}
        <div className="flex-1 min-w-0">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Supplier Selector */}
          <div className="min-w-0">
            <Select
              options={suppliers}
              value={selectedSupplier}
              onChange={onSupplierChange}
              placeholder="All Suppliers"
              className="w-40"
            />
          </div>
          
          {/* Forecast Horizon */}
          <div className="min-w-0">
            <Select
              options={forecastOptions}
              value={forecastHorizon}
              onChange={onForecastChange}
              placeholder="Forecast"
              className="w-32"
            />
          </div>
          
          {/* Auto-refresh Status */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onRefresh}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-micro hover:bg-muted"
              title="Click to refresh data"
            >
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-muted-foreground">
                {formatLastUpdate(lastUpdate)}
              </span>
              <Icon name="RefreshCw" size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;