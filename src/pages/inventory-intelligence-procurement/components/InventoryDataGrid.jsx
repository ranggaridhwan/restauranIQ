import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InventoryDataGrid = ({ data, onEdit, onExport }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterText, setFilterText] = useState('');
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const columns = [
    { key: 'productName', label: 'Product Name', sortable: true, width: 'w-48' },
    { key: 'category', label: 'Category', sortable: true, width: 'w-32' },
    { key: 'currentStock', label: 'Current Stock', sortable: true, width: 'w-28', editable: true },
    { key: 'consumptionVelocity', label: 'Velocity', sortable: true, width: 'w-24' },
    { key: 'daysUntilStockout', label: 'Days Left', sortable: true, width: 'w-24' },
    { key: 'recommendedOrder', label: 'Recommended', sortable: true, width: 'w-28' },
    { key: 'bestSupplier', label: 'Best Supplier', sortable: false, width: 'w-36' },
    { key: 'unitCost', label: 'Unit Cost', sortable: true, width: 'w-24' },
    { key: 'status', label: 'Status', sortable: true, width: 'w-24' }
  ];

  const sortedAndFilteredData = useMemo(() => {
    let filteredData = data?.filter(item =>
      item?.productName?.toLowerCase()?.includes(filterText?.toLowerCase()) ||
      item?.category?.toLowerCase()?.includes(filterText?.toLowerCase())
    );

    if (sortConfig?.key) {
      filteredData?.sort((a, b) => {
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [data, sortConfig, filterText]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleCellEdit = (rowId, columnKey, value) => {
    setEditingCell(`${rowId}-${columnKey}`);
    setEditValue(value);
  };

  const handleCellSave = (rowId, columnKey) => {
    onEdit(rowId, columnKey, editValue);
    setEditingCell(null);
    setEditValue('');
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-amber-100 text-amber-800';
      case 'normal': return 'bg-green-100 text-green-800';
      case 'overstocked': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'critical': return 'AlertTriangle';
      case 'low': return 'AlertCircle';
      case 'normal': return 'CheckCircle';
      case 'overstocked': return 'TrendingUp';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Inventory Overview</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive product analysis with procurement insights
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={filterText}
                onChange={(e) => setFilterText(e?.target?.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className={`px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider ${column?.width}`}
                >
                  {column?.sortable ? (
                    <button
                      onClick={() => handleSort(column?.key)}
                      className="flex items-center space-x-1 hover:text-foreground transition-micro"
                    >
                      <span>{column?.label}</span>
                      <Icon 
                        name={
                          sortConfig?.key === column?.key 
                            ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown')
                            : 'ChevronsUpDown'
                        } 
                        size={14} 
                      />
                    </button>
                  ) : (
                    column?.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {sortedAndFilteredData?.map((row, index) => (
              <tr key={row?.id} className="hover:bg-muted/30 transition-micro">
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  {row?.productName}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {row?.category}
                </td>
                <td className="px-4 py-3 text-sm">
                  {editingCell === `${row?.id}-currentStock` ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e?.target?.value)}
                        className="w-16 px-2 py-1 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        autoFocus
                      />
                      <button
                        onClick={() => handleCellSave(row?.id, 'currentStock')}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Icon name="Check" size={14} />
                      </button>
                      <button
                        onClick={handleCellCancel}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCellEdit(row?.id, 'currentStock', row?.currentStock)}
                      className="text-foreground hover:text-primary transition-micro"
                    >
                      {row?.currentStock} units
                    </button>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {row?.consumptionVelocity}/day
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`font-medium ${row?.daysUntilStockout <= 3 ? 'text-red-600' : row?.daysUntilStockout <= 7 ? 'text-amber-600' : 'text-foreground'}`}>
                    {row?.daysUntilStockout}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  {row?.recommendedOrder} units
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-col">
                    <span className="text-foreground font-medium">{row?.bestSupplier?.name}</span>
                    <span className="text-xs text-muted-foreground">${row?.bestSupplier?.price}/unit</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  ${row?.unitCost?.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row?.status)}`}>
                    <Icon name={getStatusIcon(row?.status)} size={12} className="mr-1" />
                    {row?.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedAndFilteredData?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default InventoryDataGrid;