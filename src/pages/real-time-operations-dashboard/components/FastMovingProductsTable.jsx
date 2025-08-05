import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { formatCurrency } from '../../../utils/currency';

const FastMovingProductsTable = ({ products, onReorderClick }) => {
  const [sortBy, setSortBy] = useState('velocity');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortedProducts = [...products]?.sort((a, b) => {
    const aValue = a?.[sortBy];
    const bValue = b?.[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getStockStatusBadge = (currentStock, minLevel) => {
    const percentage = (currentStock / minLevel) * 100;
    
    if (percentage <= 25) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error/10 text-error">
          <Icon name="AlertTriangle" size={12} className="mr-1" />
          Critical
        </span>
      );
    }
    
    if (percentage <= 50) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
          <Icon name="AlertCircle" size={12} className="mr-1" />
          Low
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
        <Icon name="CheckCircle" size={12} className="mr-1" />
        Good
      </span>
    );
  };

  const formatVelocity = (velocity) => {
    return `${velocity?.toFixed(1)}/day`;
  };

  const SortableHeader = ({ column, children }) => (
    <th 
      className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-micro"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortBy === column && (
          <Icon 
            name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
            size={14} 
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Fast-Moving Products</h3>
            <p className="text-sm text-muted-foreground">Top 20 products by sales velocity</p>
          </div>
          <Button variant="outline" size="sm" iconName="Download" iconSize={14}>
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Rank
              </th>
              <SortableHeader column="name">Product</SortableHeader>
              <SortableHeader column="category">Category</SortableHeader>
              <SortableHeader column="currentStock">Stock</SortableHeader>
              <SortableHeader column="velocity">Velocity</SortableHeader>
              <SortableHeader column="revenue">Revenue</SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-border">
            {sortedProducts?.map((product, index) => (
              <tr key={product?.id} className="hover:bg-muted/30 transition-micro">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-foreground">
                      #{index + 1}
                    </span>
                  </div>
                </td>
                
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <Icon name="Package" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{product?.name}</div>
                      <div className="text-sm text-muted-foreground">{product?.sku}</div>
                    </div>
                  </div>
                </td>
                
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm text-foreground capitalize">{product?.category}</span>
                </td>
                
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">
                    {product?.currentStock} {product?.unit}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Min: {product?.minLevel}
                  </div>
                </td>
                
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">
                    {formatVelocity(product?.velocity)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {product?.soldToday} sold today
                  </div>
                </td>
                
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">
                    {formatCurrency(product?.revenue)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Today
                  </div>
                </td>
                
                <td className="px-4 py-4 whitespace-nowrap">
                  {getStockStatusBadge(product?.currentStock, product?.minLevel)}
                </td>
                
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="xs"
                      iconName="ShoppingCart"
                      iconSize={12}
                      onClick={() => onReorderClick && onReorderClick(product?.id)}
                    >
                      Reorder
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="MoreHorizontal"
                      iconSize={12}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedProducts?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="TrendingUp" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No product data available</p>
        </div>
      )}
    </div>
  );
};

export default FastMovingProductsTable;