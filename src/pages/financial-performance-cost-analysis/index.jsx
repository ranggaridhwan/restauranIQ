import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import WaterfallChart from './components/WaterfallChart';
import CostTrendAnalysis from './components/CostTrendAnalysis';
import ProfitabilityGrid from './components/ProfitabilityGrid';
import FilterControls from './components/FilterControls';
import { convertUSDToIDR } from '../../utils/currency';

const FinancialPerformanceCostAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCostCenter, setSelectedCostCenter] = useState('all');
  const [varianceToggle, setVarianceToggle] = useState('budget');
  const [loading, setLoading] = useState(false);

  // Mock financial metrics data - converted to IDR
  const financialMetrics = [
    {
      title: 'Total Revenue',
      value: convertUSDToIDR(285000),
      change: '+12.5%',
      changeType: 'positive',
      benchmark: convertUSDToIDR(275000),
      icon: 'DollarSign'
    },
    {
      title: 'Cost of Goods Sold',
      value: convertUSDToIDR(114000),
      change: '+8.2%',
      changeType: 'negative',
      benchmark: convertUSDToIDR(110000),
      icon: 'ShoppingCart'
    },
    {
      title: 'Gross Margin',
      value: '60.0%',
      change: '+2.1%',
      changeType: 'positive',
      benchmark: '58.5%',
      icon: 'TrendingUp',
      currency: false
    },
    {
      title: 'Inventory Carrying Cost',
      value: convertUSDToIDR(18500),
      change: '-5.3%',
      changeType: 'positive',
      benchmark: convertUSDToIDR(19200),
      icon: 'Package'
    }
  ];

  // Mock waterfall chart data - converted to IDR
  const waterfallData = [
    { name: 'Revenue', value: convertUSDToIDR(285000), type: 'positive', impact: 'Total sales for the period' },
    { name: 'Food Costs', value: convertUSDToIDR(-85000), type: 'negative', impact: 'Raw ingredients and supplies' },
    { name: 'Beverage Costs', value: convertUSDToIDR(-29000), type: 'negative', impact: 'Drinks and bar supplies' },
    { name: 'Labor Costs', value: convertUSDToIDR(-95000), type: 'negative', impact: 'Staff wages and benefits' },
    { name: 'Overhead', value: convertUSDToIDR(-32000), type: 'negative', impact: 'Rent, utilities, insurance' },
    { name: 'Other Expenses', value: convertUSDToIDR(-18000), type: 'negative', impact: 'Marketing, maintenance, misc' },
    { name: 'Net Profit', value: convertUSDToIDR(26000), type: 'total', impact: 'Final profit after all expenses' }
  ];

  // Mock cost trend data - converted to IDR  
  const costTrends = [
    { month: 'Jan', beef: convertUSDToIDR(12.50), chicken: convertUSDToIDR(8.25), vegetables: convertUSDToIDR(3.75) },
    { month: 'Feb', beef: convertUSDToIDR(13.20), chicken: convertUSDToIDR(8.45), vegetables: convertUSDToIDR(4.10) },
    { month: 'Mar', beef: convertUSDToIDR(12.80), chicken: convertUSDToIDR(8.60), vegetables: convertUSDToIDR(3.95) },
    { month: 'Apr', beef: convertUSDToIDR(14.10), chicken: convertUSDToIDR(9.20), vegetables: convertUSDToIDR(4.25) },
    { month: 'May', beef: convertUSDToIDR(13.75), chicken: convertUSDToIDR(8.95), vegetables: convertUSDToIDR(4.05) },
    { month: 'Jun', beef: convertUSDToIDR(14.50), chicken: convertUSDToIDR(9.40), vegetables: convertUSDToIDR(4.35) }
  ];

  // Mock supplier performance data
  const supplierScores = [
    { id: 1, name: 'Fresh Foods Co.', category: 'Produce', score: 92 },
    { id: 2, name: 'Prime Meats Ltd.', category: 'Meat & Poultry', score: 88 },
    { id: 3, name: 'Dairy Direct', category: 'Dairy Products', score: 85 },
    { id: 4, name: 'Beverage Plus', category: 'Beverages', score: 78 },
    { id: 5, name: 'Supplies Central', category: 'Kitchen Supplies', score: 72 }
  ];

  // Mock profitability data - converted to IDR
  const profitabilityData = [
    {
      id: 1,
      name: 'Grilled Salmon',
      category: 'mains',
      costPerUnit: convertUSDToIDR(8.50),
      margin: 65.2,
      profit: convertUSDToIDR(15420),
      contribution: 12.8
    },
    {
      id: 2,
      name: 'Caesar Salad',
      category: 'appetizers',
      costPerUnit: convertUSDToIDR(3.25),
      margin: 72.1,
      profit: convertUSDToIDR(8950),
      contribution: 7.4
    },
    {
      id: 3,
      name: 'Chocolate Cake',
      category: 'desserts',
      costPerUnit: convertUSDToIDR(2.80),
      margin: 78.5,
      profit: convertUSDToIDR(6780),
      contribution: 5.6
    },
    {
      id: 4,
      name: 'House Wine',
      category: 'beverages',
      costPerUnit: convertUSDToIDR(4.20),
      margin: 82.3,
      profit: convertUSDToIDR(12340),
      contribution: 10.2
    },
    {
      id: 5,
      name: 'Beef Burger',
      category: 'mains',
      costPerUnit: convertUSDToIDR(6.75),
      margin: 58.9,
      profit: convertUSDToIDR(11200),
      contribution: 9.3
    },
    {
      id: 6,
      name: 'Chicken Wings',
      category: 'appetizers',
      costPerUnit: convertUSDToIDR(4.90),
      margin: 45.2,
      profit: convertUSDToIDR(5670),
      contribution: 4.7
    },
    {
      id: 7,
      name: 'Craft Beer',
      category: 'beverages',
      costPerUnit: convertUSDToIDR(2.10),
      margin: 85.7,
      profit: convertUSDToIDR(9850),
      contribution: 8.2
    },
    {
      id: 8,
      name: 'Fish Tacos',
      category: 'mains',
      costPerUnit: convertUSDToIDR(5.40),
      margin: 62.8,
      profit: convertUSDToIDR(7890),
      contribution: 6.5
    }
  ];

  const handleSegmentClick = (data) => {
    console.log('Waterfall segment clicked:', data);
    // Handle drill-down navigation
  };

  const handleRowClick = (item) => {
    console.log('Product row clicked:', item);
    // Handle detailed product analysis
  };

  const handleExport = () => {
    setLoading(true);
    // Simulate export process
    setTimeout(() => {
      setLoading(false);
      console.log('Financial report exported');
    }, 2000);
  };

  useEffect(() => {
    // Load saved preferences
    const savedPeriod = localStorage.getItem('financialPeriod');
    const savedCostCenter = localStorage.getItem('costCenter');
    const savedVariance = localStorage.getItem('varianceToggle');
    
    if (savedPeriod) setSelectedPeriod(savedPeriod);
    if (savedCostCenter) setSelectedCostCenter(savedCostCenter);
    if (savedVariance) setVarianceToggle(savedVariance);
  }, []);

  useEffect(() => {
    // Save preferences
    localStorage.setItem('financialPeriod', selectedPeriod);
    localStorage.setItem('costCenter', selectedCostCenter);
    localStorage.setItem('varianceToggle', varianceToggle);
  }, [selectedPeriod, selectedCostCenter, varianceToggle]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Financial Performance & Cost Analysis
            </h1>
            <p className="text-muted-foreground">
              Monitor profitability, track cost trends, and identify optimization opportunities through comprehensive financial metrics.
            </p>
          </div>

          {/* Filter Controls */}
          <FilterControls
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            selectedCostCenter={selectedCostCenter}
            onCostCenterChange={setSelectedCostCenter}
            varianceToggle={varianceToggle}
            onVarianceToggle={setVarianceToggle}
            onExport={handleExport}
          />

          {/* Financial Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {financialMetrics?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                benchmark={metric?.benchmark}
                icon={metric?.icon}
                currency={metric?.currency}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Waterfall Chart - 8 columns */}
            <div className="lg:col-span-8">
              <WaterfallChart 
                data={waterfallData}
                onSegmentClick={handleSegmentClick}
              />
            </div>

            {/* Cost Trend Analysis - 4 columns */}
            <div className="lg:col-span-4">
              <CostTrendAnalysis 
                trends={costTrends}
                supplierScores={supplierScores}
              />
            </div>
          </div>

          {/* Profitability Grid */}
          <ProfitabilityGrid 
            data={profitabilityData}
            onRowClick={handleRowClick}
          />
        </div>
      </main>
    </div>
  );
};

export default FinancialPerformanceCostAnalysis;