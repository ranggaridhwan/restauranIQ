import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InventoryHeatmap = ({ inventoryData, onCategoryClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const categories = [
    { id: 'all', name: 'All Items', count: inventoryData?.length },
    { id: 'vegetables', name: 'Vegetables', count: inventoryData?.filter(item => item?.category === 'vegetables')?.length },
    { id: 'meat', name: 'Meat & Poultry', count: inventoryData?.filter(item => item?.category === 'meat')?.length },
    { id: 'dairy', name: 'Dairy', count: inventoryData?.filter(item => item?.category === 'dairy')?.length },
    { id: 'grains', name: 'Grains & Cereals', count: inventoryData?.filter(item => item?.category === 'grains')?.length },
    { id: 'beverages', name: 'Beverages', count: inventoryData?.filter(item => item?.category === 'beverages')?.length }
  ];

  const getStockStatusColor = (stockLevel, minLevel) => {
    const percentage = (stockLevel / minLevel) * 100;
    if (percentage <= 25) return 'bg-error text-error-foreground';
    if (percentage <= 50) return 'bg-warning text-warning-foreground';
    if (percentage <= 75) return 'bg-accent text-accent-foreground';
    return 'bg-success text-success-foreground';
  };

  const getStockStatusIcon = (stockLevel, minLevel) => {
    const percentage = (stockLevel / minLevel) * 100;
    if (percentage <= 25) return 'AlertTriangle';
    if (percentage <= 50) return 'AlertCircle';
    return 'CheckCircle';
  };

  const filteredData = selectedCategory === 'all' 
    ? inventoryData 
    : inventoryData?.filter(item => item?.category === selectedCategory);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Inventory Heatmap</h3>
          <p className="text-sm text-muted-foreground">Real-time stock levels across all products</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-micro ${
              viewMode === 'grid' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name="Grid3X3" size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-micro ${
              viewMode === 'list' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name="List" size={16} />
          </button>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => handleCategorySelect(category?.id)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-micro
              ${selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }
            `}
          >
            {category?.name} ({category?.count})
          </button>
        ))}
      </div>
      {/* Heatmap Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {filteredData?.map((item) => (
            <div
              key={item?.id}
              className={`
                p-3 rounded-lg cursor-pointer transition-micro hover:scale-105
                ${getStockStatusColor(item?.currentStock, item?.minLevel)}
              `}
              title={`${item?.name}: ${item?.currentStock} ${item?.unit} (Min: ${item?.minLevel})`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon name={getStockStatusIcon(item?.currentStock, item?.minLevel)} size={14} />
                <span className="text-xs font-medium">
                  {Math.round((item?.currentStock / item?.minLevel) * 100)}%
                </span>
              </div>
              <p className="text-xs font-medium truncate">{item?.name}</p>
              <p className="text-xs opacity-80">{item?.currentStock} {item?.unit}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredData?.map((item) => (
            <div
              key={item?.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-micro cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-1.5 rounded ${getStockStatusColor(item?.currentStock, item?.minLevel)}`}>
                  <Icon name={getStockStatusIcon(item?.currentStock, item?.minLevel)} size={12} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item?.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{item?.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{item?.currentStock} {item?.unit}</p>
                <p className="text-sm text-muted-foreground">Min: {item?.minLevel}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredData?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No items found in this category</p>
        </div>
      )}
    </div>
  );
};

export default InventoryHeatmap;