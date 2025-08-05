import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import ControlBar from './components/ControlBar';
import ForecastChart from './components/ForecastChart';
import ProcurementRecommendations from './components/ProcurementRecommendations';
import InventoryDataGrid from './components/InventoryDataGrid';
import { formatCurrency, convertUSDToIDR } from '../../utils/currency';

const InventoryIntelligenceProcurement = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [forecastHorizon, setForecastHorizon] = useState('2');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedProcurementItems, setSelectedProcurementItems] = useState([]);

  // Mock data for key metrics - converted to IDR
  const keyMetrics = [
    {
      title: "Total Stock Value",
      value: formatCurrency(convertUSDToIDR(127450)),
      trend: "up",
      trendValue: "+5.2%",
      icon: "DollarSign",
      status: "normal",
      subtitle: "Across all outlets"
    },
    {
      title: "Items Requiring Reorder",
      value: "23",
      trend: "down",
      trendValue: "-3 items",
      icon: "AlertTriangle",
      status: "warning",
      subtitle: "Critical & low stock"
    },
    {
      title: "Predicted Stockouts",
      value: "8",
      trend: "up",
      trendValue: "+2 items",
      icon: "TrendingDown",
      status: "critical",
      subtitle: "Next 7 days"
    },
    {
      title: "Procurement Budget",
      value: "78%",
      trend: "up",
      trendValue: "+12%",
      icon: "CreditCard",
      status: "success",
      subtitle: "Monthly utilization"
    }
  ];

  // Mock data for categories
  const categories = [
    { value: 'all', label: 'All Categories', count: 156 },
    { value: 'proteins', label: 'Proteins', count: 28 },
    { value: 'vegetables', label: 'Vegetables', count: 45 },
    { value: 'dairy', label: 'Dairy', count: 18 },
    { value: 'grains', label: 'Grains & Cereals', count: 22 },
    { value: 'beverages', label: 'Beverages', count: 31 },
    { value: 'condiments', label: 'Condiments', count: 12 }
  ];

  // Mock data for suppliers
  const suppliers = [
    { value: 'all', label: 'All Suppliers' },
    { value: 'fresh-foods', label: 'Fresh Foods Co.' },
    { value: 'metro-supply', label: 'Metro Supply Chain' },
    { value: 'organic-farms', label: 'Organic Farms Ltd.' },
    { value: 'dairy-direct', label: 'Dairy Direct' },
    { value: 'beverage-plus', label: 'Beverage Plus' }
  ];

  // Mock data for forecast chart
  const forecastData = [
    { period: 'Week 1', consumption: 450, forecast: 420 },
    { period: 'Week 2', consumption: 380, forecast: 390 },
    { period: 'Week 3', consumption: 520, forecast: 510 },
    { period: 'Week 4', consumption: 340, forecast: 360 },
    { period: 'Week 5', consumption: 0, forecast: 480 },
    { period: 'Week 6', consumption: 0, forecast: 440 },
    { period: 'Week 7', consumption: 0, forecast: 520 },
    { period: 'Week 8', consumption: 0, forecast: 490 }
  ];

  // Mock data for procurement recommendations - converted to IDR
  const procurementRecommendations = [
    {
      id: 1,
      productName: "Premium Ground Beef",
      priority: "critical",
      currentStock: 12,
      recommendedQuantity: 50,
      daysUntilStockout: 2,
      estimatedCost: convertUSDToIDR(875.00),
      dailyConsumption: 6,
      trend: "up",
      trendValue: "+15%",
      seasonality: "High",
      suppliers: [
        { name: "Fresh Foods Co.", price: convertUSDToIDR(17.50), deliveryTime: "Next day" },
        { name: "Metro Supply", price: convertUSDToIDR(16.80), deliveryTime: "2-3 days" },
        { name: "Organic Farms", price: convertUSDToIDR(19.20), deliveryTime: "3-4 days" }
      ]
    },
    {
      id: 2,
      productName: "Organic Tomatoes",
      priority: "high",
      currentStock: 25,
      recommendedQuantity: 40,
      daysUntilStockout: 5,
      estimatedCost: convertUSDToIDR(320.00),
      dailyConsumption: 5,
      trend: "up",
      trendValue: "+8%",
      seasonality: "Medium",
      suppliers: [
        { name: "Organic Farms", price: convertUSDToIDR(8.00), deliveryTime: "Next day" },
        { name: "Fresh Foods Co.", price: convertUSDToIDR(7.50), deliveryTime: "2 days" }
      ]
    },
    {
      id: 3,
      productName: "Whole Milk (1L)",
      priority: "medium",
      currentStock: 48,
      recommendedQuantity: 60,
      daysUntilStockout: 8,
      estimatedCost: convertUSDToIDR(180.00),
      dailyConsumption: 6,
      trend: "stable",
      trendValue: "0%",
      seasonality: "Low",
      suppliers: [
        { name: "Dairy Direct", price: convertUSDToIDR(3.00), deliveryTime: "Daily delivery" },
        { name: "Metro Supply", price: convertUSDToIDR(2.85), deliveryTime: "Next day" }
      ]
    },
    {
      id: 4,
      productName: "Basmati Rice (5kg)",
      priority: "medium",
      currentStock: 8,
      recommendedQuantity: 20,
      daysUntilStockout: 12,
      estimatedCost: convertUSDToIDR(240.00),
      dailyConsumption: 0.7,
      trend: "down",
      trendValue: "-5%",
      seasonality: "Low",
      suppliers: [
        { name: "Metro Supply", price: convertUSDToIDR(12.00), deliveryTime: "2-3 days" },
        { name: "Fresh Foods Co.", price: convertUSDToIDR(11.50), deliveryTime: "3-4 days" }
      ]
    },
    {
      id: 5,
      productName: "Fresh Salmon Fillets",
      priority: "high",
      currentStock: 6,
      recommendedQuantity: 25,
      daysUntilStockout: 3,
      estimatedCost: convertUSDToIDR(625.00),
      dailyConsumption: 2,
      trend: "up",
      trendValue: "+20%",
      seasonality: "High",
      suppliers: [
        { name: "Fresh Foods Co.", price: convertUSDToIDR(25.00), deliveryTime: "Next day" },
        { name: "Organic Farms", price: convertUSDToIDR(27.50), deliveryTime: "2 days" }
      ]
    }
  ];

  // Mock data for inventory grid - converted to IDR
  const inventoryData = [
    {
      id: 1,
      productName: "Premium Ground Beef",
      category: "Proteins",
      currentStock: 12,
      consumptionVelocity: 6,
      daysUntilStockout: 2,
      recommendedOrder: 50,
      bestSupplier: { name: "Metro Supply", price: convertUSDToIDR(16.80) },
      unitCost: convertUSDToIDR(17.50),
      status: "Critical"
    },
    {
      id: 2,
      productName: "Organic Tomatoes",
      category: "Vegetables",
      currentStock: 25,
      consumptionVelocity: 5,
      daysUntilStockout: 5,
      recommendedOrder: 40,
      bestSupplier: { name: "Fresh Foods Co.", price: convertUSDToIDR(7.50) },
      unitCost: convertUSDToIDR(8.00),
      status: "Low"
    },
    {
      id: 3,
      productName: "Whole Milk (1L)",
      category: "Dairy",
      currentStock: 48,
      consumptionVelocity: 6,
      daysUntilStockout: 8,
      recommendedOrder: 60,
      bestSupplier: { name: "Dairy Direct", price: convertUSDToIDR(2.85) },
      unitCost: convertUSDToIDR(3.00),
      status: "Normal"
    },
    {
      id: 4,
      productName: "Basmati Rice (5kg)",
      category: "Grains",
      currentStock: 8,
      consumptionVelocity: 0.7,
      daysUntilStockout: 12,
      recommendedOrder: 20,
      bestSupplier: { name: "Fresh Foods Co.", price: convertUSDToIDR(11.50) },
      unitCost: convertUSDToIDR(12.00),
      status: "Normal"
    },
    {
      id: 5,
      productName: "Fresh Salmon Fillets",
      category: "Proteins",
      currentStock: 6,
      consumptionVelocity: 2,
      daysUntilStockout: 3,
      recommendedOrder: 25,
      bestSupplier: { name: "Fresh Foods Co.", price: convertUSDToIDR(25.00) },
      unitCost: convertUSDToIDR(25.00),
      status: "Critical"
    },
    {
      id: 6,
      productName: "Cheddar Cheese",
      category: "Dairy",
      currentStock: 15,
      consumptionVelocity: 1.5,
      daysUntilStockout: 10,
      recommendedOrder: 30,
      bestSupplier: { name: "Dairy Direct", price: convertUSDToIDR(8.50) },
      unitCost: convertUSDToIDR(9.00),
      status: "Normal"
    },
    {
      id: 7,
      productName: "Bell Peppers",
      category: "Vegetables",
      currentStock: 32,
      consumptionVelocity: 4,
      daysUntilStockout: 8,
      recommendedOrder: 35,
      bestSupplier: { name: "Organic Farms", price: convertUSDToIDR(4.20) },
      unitCost: convertUSDToIDR(4.50),
      status: "Normal"
    },
    {
      id: 8,
      productName: "Olive Oil (500ml)",
      category: "Condiments",
      currentStock: 22,
      consumptionVelocity: 1,
      daysUntilStockout: 22,
      recommendedOrder: 15,
      bestSupplier: { name: "Metro Supply", price: convertUSDToIDR(12.00) },
      unitCost: convertUSDToIDR(12.50),
      status: "Overstocked"
    }
  ];

  useEffect(() => {
    // Simulate auto-refresh every 30 minutes
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 1800000); // 30 minutes

    return () => clearInterval(interval);
  }, []);

  const handleMetricClick = (metric) => {
    console.log(`Clicked on metric: ${metric?.title}`);
  };

  const handleRefresh = () => {
    setLastUpdate(new Date());
    console.log('Refreshing data...');
  };

  const handleOrderGenerate = (itemIds) => {
    console.log('Generating order for items:', itemIds);
    // Here you would typically integrate with procurement system
  };

  const handleBulkSelect = (selectedIds) => {
    setSelectedProcurementItems(selectedIds);
  };

  const handleInventoryEdit = (rowId, columnKey, value) => {
    console.log(`Editing ${columnKey} for row ${rowId} to ${value}`);
    // Here you would update the inventory data
  };

  const handleInventoryExport = () => {
    console.log('Exporting inventory data...');
    // Here you would export the data
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Inventory Intelligence & Procurement
            </h1>
            <p className="text-muted-foreground">
              AI-powered inventory analysis with automated procurement recommendations and predictive insights
            </p>
          </div>

          {/* Control Bar */}
          <ControlBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            suppliers={suppliers}
            selectedSupplier={selectedSupplier}
            onSupplierChange={setSelectedSupplier}
            forecastHorizon={forecastHorizon}
            onForecastChange={setForecastHorizon}
            lastUpdate={lastUpdate}
            onRefresh={handleRefresh}
          />

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyMetrics?.map((metric, index) => (
              <MetricCard
                key={index}
                {...metric}
                onClick={() => handleMetricClick(metric)}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-16 gap-6 mb-8">
            {/* Forecast Chart - 10 columns */}
            <div className="lg:col-span-10">
              <ForecastChart
                data={forecastData}
                selectedCategory={selectedCategory}
              />
            </div>

            {/* Procurement Recommendations - 6 columns */}
            <div className="lg:col-span-6">
              <ProcurementRecommendations
                recommendations={procurementRecommendations}
                onOrderGenerate={handleOrderGenerate}
                onBulkSelect={handleBulkSelect}
              />
            </div>
          </div>

          {/* Inventory Data Grid */}
          <InventoryDataGrid
            data={inventoryData}
            onEdit={handleInventoryEdit}
            onExport={handleInventoryExport}
          />
        </div>
      </main>
    </div>
  );
};

export default InventoryIntelligenceProcurement;