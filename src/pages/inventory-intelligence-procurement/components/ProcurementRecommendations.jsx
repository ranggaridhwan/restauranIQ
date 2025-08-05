import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcurementRecommendations = ({ recommendations, onOrderGenerate, onBulkSelect }) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [expandedItem, setExpandedItem] = useState(null);

  const handleItemSelect = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected?.has(itemId)) {
      newSelected?.delete(itemId);
    } else {
      newSelected?.add(itemId);
    }
    setSelectedItems(newSelected);
    onBulkSelect(Array.from(newSelected));
  };

  const handleSelectAll = () => {
    if (selectedItems?.size === recommendations?.length) {
      setSelectedItems(new Set());
      onBulkSelect([]);
    } else {
      const allIds = new Set(recommendations.map(item => item.id));
      setSelectedItems(allIds);
      onBulkSelect(Array.from(allIds));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-amber-600 bg-amber-100';
      case 'medium': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'Clock';
      case 'medium': return 'Info';
      default: return 'CheckCircle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Procurement Recommendations</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered ordering suggestions based on consumption patterns
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              iconName={selectedItems?.size === recommendations?.length ? "CheckSquare" : "Square"}
              iconPosition="left"
            >
              {selectedItems?.size === recommendations?.length ? 'Deselect All' : 'Select All'}
            </Button>
            
            {selectedItems?.size > 0 && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onOrderGenerate(Array.from(selectedItems))}
                iconName="ShoppingCart"
                iconPosition="left"
              >
                Generate Order ({selectedItems?.size})
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {recommendations?.map((item) => (
          <div 
            key={item?.id}
            className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-micro"
          >
            <div className="flex items-start space-x-3">
              <div className="flex items-center pt-1">
                <input
                  type="checkbox"
                  checked={selectedItems?.has(item?.id)}
                  onChange={() => handleItemSelect(item?.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {item?.productName}
                    </h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item?.priority)}`}>
                      <Icon name={getPriorityIcon(item?.priority)} size={12} className="mr-1" />
                      {item?.priority}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setExpandedItem(expandedItem === item?.id ? null : item?.id)}
                    className="text-muted-foreground hover:text-foreground transition-micro"
                  >
                    <Icon name={expandedItem === item?.id ? "ChevronUp" : "ChevronDown"} size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-2">
                  <div>
                    <span className="font-medium">Current Stock:</span> {item?.currentStock} units
                  </div>
                  <div>
                    <span className="font-medium">Recommended:</span> {item?.recommendedQuantity} units
                  </div>
                  <div>
                    <span className="font-medium">Days Until Stockout:</span> {item?.daysUntilStockout}
                  </div>
                  <div>
                    <span className="font-medium">Est. Cost:</span> ${item?.estimatedCost?.toFixed(2)}
                  </div>
                </div>
                
                {expandedItem === item?.id && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Supplier Options</h5>
                        {item?.suppliers?.map((supplier, index) => (
                          <div key={index} className="flex justify-between items-center py-1">
                            <span className="text-muted-foreground">{supplier?.name}</span>
                            <div className="text-right">
                              <div className="font-medium text-foreground">${supplier?.price}/unit</div>
                              <div className="text-muted-foreground">{supplier?.deliveryTime}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Consumption Pattern</h5>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Daily Average:</span>
                            <span className="font-medium text-foreground">{item?.dailyConsumption} units</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Weekly Trend:</span>
                            <span className={`font-medium ${item?.trend === 'up' ? 'text-green-600' : item?.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'}`}>
                              {item?.trendValue}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Seasonality:</span>
                            <span className="font-medium text-foreground">{item?.seasonality}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="xs"
                        iconName="Eye"
                        iconPosition="left"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="default"
                        size="xs"
                        onClick={() => onOrderGenerate([item?.id])}
                        iconName="ShoppingCart"
                        iconPosition="left"
                      >
                        Order Now
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcurementRecommendations;