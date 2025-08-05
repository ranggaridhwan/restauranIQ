import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ProfitabilityGrid = ({ data, onRowClick }) => {
  const [sortField, setSortField] = useState('profit');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'appetizers', label: 'Appetizers' },
    { value: 'mains', label: 'Main Courses' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'beverages', label: 'Beverages' }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getMarginColor = (margin) => {
    if (margin >= 30) return 'text-success bg-success/10';
    if (margin >= 15) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const filteredData = data?.filter(item => 
      (filterCategory === 'all' || item?.category === filterCategory) &&
      item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )?.sort((a, b) => {
      const aVal = a?.[sortField];
      const bVal = b?.[sortField];
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      return (aVal - bVal) * multiplier;
    });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Product Profitability Analysis</h3>
        <div className="flex items-center space-x-3">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-48"
          />
          <Select
            options={categoryOptions}
            value={filterCategory}
            onChange={setFilterCategory}
            className="w-40"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Product
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-micro"
                onClick={() => handleSort('costPerUnit')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Cost/Unit</span>
                  <Icon name={getSortIcon('costPerUnit')} size={14} />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-micro"
                onClick={() => handleSort('margin')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Margin %</span>
                  <Icon name={getSortIcon('margin')} size={14} />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-micro"
                onClick={() => handleSort('profit')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Total Profit</span>
                  <Icon name={getSortIcon('profit')} size={14} />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-micro"
                onClick={() => handleSort('contribution')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Contribution %</span>
                  <Icon name={getSortIcon('contribution')} size={14} />
                </div>
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((item) => (
              <tr 
                key={item?.id}
                className="border-b border-border hover:bg-muted/50 cursor-pointer transition-micro"
                onClick={() => onRowClick(item)}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="Package" size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item?.name}</p>
                      <p className="text-xs text-muted-foreground">{item?.category}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right text-sm text-foreground">
                  Rp{item?.costPerUnit?.toFixed(2)}
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMarginColor(item?.margin)}`}>
                    {item?.margin?.toFixed(1)}%
                  </span>
                </td>
                <td className="py-4 px-4 text-right text-sm font-medium text-foreground">
                  Rp{item?.profit?.toLocaleString('id-ID')}
                </td>
                <td className="py-4 px-4 text-right text-sm text-foreground">
                  {item?.contribution?.toFixed(1)}%
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center">
                    {item?.margin >= 30 ? (
                      <Icon name="TrendingUp" size={16} className="text-success" />
                    ) : item?.margin >= 15 ? (
                      <Icon name="Minus" size={16} className="text-warning" />
                    ) : (
                      <Icon name="TrendingDown" size={16} className="text-error" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredData?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProfitabilityGrid;