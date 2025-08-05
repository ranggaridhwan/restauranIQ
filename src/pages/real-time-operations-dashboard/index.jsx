import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import InventoryHeatmap from './components/InventoryHeatmap';
import AlertFeed from './components/AlertFeed';
import FastMovingProductsTable from './components/FastMovingProductsTable';
import LiveDataIndicator from './components/LiveDataIndicator';
import Select from '../../components/ui/Select';
import { formatCurrency, convertUSDToIDR } from '../../utils/currency';

const RealTimeOperationsDashboard = () => {
  const [selectedOutlet, setSelectedOutlet] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [refreshInterval, setRefreshInterval] = useState(15);

  // Mock KPI data - converted to IDR
  const kpiData = [
    {
      title: 'Current Inventory Value',
      value: formatCurrency(convertUSDToIDR(47832)),
      trend: 'up',
      trendValue: '+2.4%',
      status: 'success',
      icon: 'DollarSign'
    },
    {
      title: "Today\'s Sales",
      value: formatCurrency(convertUSDToIDR(12456)),
      trend: 'up',
      trendValue: '+8.2%',
      status: 'success',
      icon: 'TrendingUp'
    },
    {
      title: 'Low Stock Alerts',
      value: '23',
      trend: 'down',
      trendValue: '-5 items',
      status: 'warning',
      icon: 'AlertTriangle'
    },
    {
      title: 'Pending Procurement',
      value: '15',
      trend: 'up',
      trendValue: '+3 items',
      status: 'info',
      icon: 'ShoppingCart'
    },
    {
      title: 'Waste Incidents',
      value: '2',
      trend: 'down',
      trendValue: '-1 today',
      status: 'success',
      icon: 'Trash2'
    },
    {
      title: 'System Health',
      value: '98.5%',
      trend: 'stable',
      trendValue: 'Stable',
      status: 'success',
      icon: 'Activity'
    }
  ];

  // Mock inventory data
  const inventoryData = [
    {
      id: 1,
      name: 'Tomatoes',
      category: 'vegetables',
      currentStock: 45,
      minLevel: 50,
      unit: 'kg'
    },
    {
      id: 2,
      name: 'Chicken Breast',
      category: 'meat',
      currentStock: 12,
      minLevel: 25,
      unit: 'kg'
    },
    {
      id: 3,
      name: 'Milk',
      category: 'dairy',
      currentStock: 8,
      minLevel: 20,
      unit: 'liters'
    },
    {
      id: 4,
      name: 'Rice',
      category: 'grains',
      currentStock: 75,
      minLevel: 50,
      unit: 'kg'
    },
    {
      id: 5,
      name: 'Orange Juice',
      category: 'beverages',
      currentStock: 15,
      minLevel: 30,
      unit: 'liters'
    },
    {
      id: 6,
      name: 'Onions',
      category: 'vegetables',
      currentStock: 35,
      minLevel: 40,
      unit: 'kg'
    },
    {
      id: 7,
      name: 'Beef',
      category: 'meat',
      currentStock: 18,
      minLevel: 20,
      unit: 'kg'
    },
    {
      id: 8,
      name: 'Cheese',
      category: 'dairy',
      currentStock: 25,
      minLevel: 15,
      unit: 'kg'
    },
    {
      id: 9,
      name: 'Pasta',
      category: 'grains',
      currentStock: 40,
      minLevel: 30,
      unit: 'kg'
    },
    {
      id: 10,
      name: 'Coffee',
      category: 'beverages',
      currentStock: 5,
      minLevel: 15,
      unit: 'kg'
    }
  ];

  // Mock alerts data
  const alertsData = [
    {
      id: 1,
      type: 'stockout',
      priority: 'critical',
      title: 'Critical Stock Alert',
      message: 'Chicken Breast is running critically low (12kg remaining, minimum 25kg)',
      timestamp: new Date(Date.now() - 300000),
      actions: [
        { id: 'reorder', label: 'Reorder Now' },
        { id: 'dismiss', label: 'Dismiss' }
      ]
    },
    {
      id: 2,
      type: 'expiring',
      priority: 'warning',
      title: 'Items Expiring Soon',
      message: '5 items in dairy category will expire within 24 hours',
      timestamp: new Date(Date.now() - 600000),
      actions: [
        { id: 'view', label: 'View Items' },
        { id: 'mark_sale', label: 'Mark for Sale' }
      ]
    },
    {
      id: 3,
      type: 'low_stock',
      priority: 'warning',
      title: 'Low Stock Warning',
      message: 'Coffee inventory is below minimum threshold (5kg remaining)',
      timestamp: new Date(Date.now() - 900000),
      actions: [
        { id: 'add_to_procurement', label: 'Add to Procurement List' }
      ]
    },
    {
      id: 4,
      type: 'system',
      priority: 'info',
      title: 'System Update',
      message: 'Inventory sync completed successfully for all outlets',
      timestamp: new Date(Date.now() - 1200000),
      actions: []
    },
    {
      id: 5,
      type: 'waste',
      priority: 'warning',
      title: 'Waste Report',
      message: '2kg of vegetables marked as waste due to spoilage',
      timestamp: new Date(Date.now() - 1800000),
      actions: [
        { id: 'view_report', label: 'View Report' }
      ]
    }
  ];

  // Mock fast-moving products data - converted to IDR
  const fastMovingProducts = [
    {
      id: 1,
      name: 'Margherita Pizza',
      sku: 'PIZZA-001',
      category: 'prepared_food',
      currentStock: 25,
      minLevel: 15,
      unit: 'portions',
      velocity: 12.5,
      soldToday: 18,
      revenue: convertUSDToIDR(324.00)
    },
    {
      id: 2,
      name: 'Caesar Salad',
      sku: 'SALAD-002',
      category: 'prepared_food',
      currentStock: 15,
      minLevel: 10,
      unit: 'portions',
      velocity: 8.3,
      soldToday: 12,
      revenue: convertUSDToIDR(156.00)
    },
    {
      id: 3,
      name: 'Grilled Chicken',
      sku: 'MAIN-003',
      category: 'prepared_food',
      currentStock: 8,
      minLevel: 12,
      unit: 'portions',
      velocity: 7.8,
      soldToday: 9,
      revenue: convertUSDToIDR(198.00)
    },
    {
      id: 4,
      name: 'Cappuccino',
      sku: 'BEV-004',
      category: 'beverages',
      currentStock: 50,
      minLevel: 30,
      unit: 'cups',
      velocity: 15.2,
      soldToday: 22,
      revenue: convertUSDToIDR(88.00)
    },
    {
      id: 5,
      name: 'Chocolate Cake',
      sku: 'DESS-005',
      category: 'desserts',
      currentStock: 6,
      minLevel: 8,
      unit: 'slices',
      velocity: 4.5,
      soldToday: 5,
      revenue: convertUSDToIDR(45.00)
    }
  ];

  const outletOptions = [
    { value: 'all', label: 'All Outlets' },
    { value: 'downtown', label: 'Downtown Location' },
    { value: 'mall', label: 'Shopping Mall' },
    { value: 'airport', label: 'Airport Terminal' },
    { value: 'suburb', label: 'Suburban Branch' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  useEffect(() => {
    // Load saved preferences
    const savedOutlet = localStorage.getItem('selectedOutlet');
    const savedDateRange = localStorage.getItem('dateRange');
    
    if (savedOutlet) setSelectedOutlet(savedOutlet);
    if (savedDateRange) setDateRange(savedDateRange);
  }, []);

  const handleKPIClick = (title) => {
    console.log(`KPI clicked: ${title}`);
  };

  const handleCategoryClick = (categoryId) => {
    console.log(`Category clicked: ${categoryId}`);
  };

  const handleAlertAction = (alertId, action) => {
    console.log(`Alert action: ${action} for alert ${alertId}`);
  };

  const handleReorderClick = (productId) => {
    console.log(`Reorder clicked for product: ${productId}`);
  };

  const handleRefreshIntervalChange = (interval) => {
    setRefreshInterval(interval);
    console.log(`Refresh interval changed to: ${interval} minutes`);
  };

  const handleManualRefresh = async () => {
    console.log('Manual refresh triggered');
    // Simulate data refresh
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleOutletChange = (value) => {
    setSelectedOutlet(value);
    localStorage.setItem('selectedOutlet', value);
  };

  const handleDateRangeChange = (value) => {
    setDateRange(value);
    localStorage.setItem('dateRange', value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">
                  Real-Time Operations Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Monitor live inventory levels, sales performance, and critical alerts across all outlets
                </p>
              </div>
              
              {/* Global Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
                <Select
                  options={outletOptions}
                  value={selectedOutlet}
                  onChange={handleOutletChange}
                  placeholder="Select outlet"
                  className="w-full sm:w-40"
                />
                <Select
                  options={dateRangeOptions}
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  placeholder="Select period"
                  className="w-full sm:w-32"
                />
              </div>
            </div>

            {/* Live Data Indicator */}
            <div className="bg-card border rounded-lg p-4">
              <LiveDataIndicator
                onRefreshIntervalChange={handleRefreshIntervalChange}
                onManualRefresh={handleManualRefresh}
              />
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                trend={kpi?.trend}
                trendValue={kpi?.trendValue}
                status={kpi?.status}
                icon={kpi?.icon}
                onClick={() => handleKPIClick(kpi?.title)}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Inventory Heatmap - Takes 2/3 width on desktop */}
            <div className="xl:col-span-2">
              <InventoryHeatmap
                inventoryData={inventoryData}
                onCategoryClick={handleCategoryClick}
              />
            </div>

            {/* Alert Feed - Takes 1/3 width on desktop */}
            <div className="xl:col-span-1">
              <AlertFeed
                alerts={alertsData}
                onAlertAction={handleAlertAction}
              />
            </div>
          </div>

          {/* Fast-Moving Products Table */}
          <div className="mb-8">
            <FastMovingProductsTable
              products={fastMovingProducts}
              onReorderClick={handleReorderClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RealTimeOperationsDashboard;