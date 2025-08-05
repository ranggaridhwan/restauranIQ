import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ 
  selectedPeriod, 
  onPeriodChange, 
  selectedCostCenter, 
  onCostCenterChange,
  varianceToggle,
  onVarianceToggle,
  onExport 
}) => {
  const periodOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const costCenterOptions = [
    { value: 'all', label: 'All Cost Centers' },
    { value: 'food', label: 'Food Costs' },
    { value: 'beverage', label: 'Beverage Costs' },
    { value: 'supplies', label: 'Supplies' },
    { value: 'labor', label: 'Labor Costs' },
    { value: 'overhead', label: 'Overhead' }
  ];

  const varianceOptions = [
    { value: 'budget', label: 'Budget vs Actual' },
    { value: 'period', label: 'Period vs Period' },
    { value: 'forecast', label: 'Forecast vs Actual' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <Select
              options={periodOptions}
              value={selectedPeriod}
              onChange={onPeriodChange}
              className="w-40"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <Select
              options={costCenterOptions}
              value={selectedCostCenter}
              onChange={onCostCenterChange}
              className="w-44"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={16} className="text-muted-foreground" />
            <Select
              options={varianceOptions}
              value={varianceToggle}
              onChange={onVarianceToggle}
              className="w-48"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => window.location?.reload()}
          >
            Refresh
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;