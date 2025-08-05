import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AnalyticsHeader from './components/AnalyticsHeader';
import MetricsStrip from './components/MetricsStrip';
import PerformanceScatterPlot from './components/PerformanceScatterPlot';
import OutletLeaderboard from './components/OutletLeaderboard';
import CategoryDistributionChart from './components/CategoryDistributionChart';
import { convertUSDToIDR } from '../../utils/currency';

const MultiOutletPerformanceAnalytics = () => {
  const [selectedOutlets, setSelectedOutlets] = useState(['downtown', 'mall', 'airport']);
  const [timePeriod, setTimePeriod] = useState('month');
  const [comparisonMode, setComparisonMode] = useState('outlet-vs-outlet');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for metrics strip - converted to IDR
  const metricsData = {
    revenue: {
      total: convertUSDToIDR(2847500),
      variance: 12.5,
      best: { outlet: 'Downtown Location', value: convertUSDToIDR(985000) },
      worst: { outlet: 'Suburban Branch', value: convertUSDToIDR(425000) }
    },
    turnover: {
      average: 8.2,
      variance: -3.2,
      best: { outlet: 'Airport Terminal', value: 12.1 },
      worst: { outlet: 'University Campus', value: 5.8 }
    },
    waste: {
      average: 4.8,
      variance: -8.5,
      best: { outlet: 'Shopping Mall', value: 2.1 },
      worst: { outlet: 'Waterfront Plaza', value: 7.9 }
    },
    procurement: {
      average: 87.3,
      variance: 5.7,
      best: { outlet: 'Downtown Location', value: 94.2 },
      worst: { outlet: 'Suburban Branch', value: 78.5 }
    }
  };

  // Mock data for scatter plot - converted to IDR
  const scatterPlotData = [
    {
      outlet: 'Downtown Location',
      salesPerformance: 92,
      inventoryEfficiency: 88,
      revenue: convertUSDToIDR(985000),
      profitability: 28.5
    },
    {
      outlet: 'Shopping Mall',
      salesPerformance: 85,
      inventoryEfficiency: 91,
      revenue: convertUSDToIDR(756000),
      profitability: 24.2
    },
    {
      outlet: 'Airport Terminal',
      salesPerformance: 78,
      inventoryEfficiency: 95,
      revenue: convertUSDToIDR(892000),
      profitability: 22.8
    },
    {
      outlet: 'Suburban Branch',
      salesPerformance: 65,
      inventoryEfficiency: 72,
      revenue: convertUSDToIDR(425000),
      profitability: 15.3
    },
    {
      outlet: 'Waterfront Plaza',
      salesPerformance: 71,
      inventoryEfficiency: 68,
      revenue: convertUSDToIDR(534000),
      profitability: 18.7
    },
    {
      outlet: 'University Campus',
      salesPerformance: 58,
      inventoryEfficiency: 65,
      revenue: convertUSDToIDR(389000),
      profitability: 12.4
    }
  ];

  // Mock data for leaderboard - converted to IDR
  const leaderboardData = [
    {
      id: 1,
      name: 'Downtown Location',
      location: 'City Center',
      score: 92.5,
      revenue: convertUSDToIDR(985000),
      efficiency: 88,
      trend: 5.2,
      trendData: [
        { value: 85 }, { value: 87 }, { value: 89 }, { value: 91 }, { value: 92.5 }
      ]
    },
    {
      id: 2,
      name: 'Airport Terminal',
      location: 'Terminal 2',
      score: 89.3,
      revenue: convertUSDToIDR(892000),
      efficiency: 95,
      trend: 3.8,
      trendData: [
        { value: 82 }, { value: 85 }, { value: 87 }, { value: 88 }, { value: 89.3 }
      ]
    },
    {
      id: 3,
      name: 'Shopping Mall',
      location: 'West Wing',
      score: 86.7,
      revenue: convertUSDToIDR(756000),
      efficiency: 91,
      trend: 2.1,
      trendData: [
        { value: 83 }, { value: 84 }, { value: 85 }, { value: 86 }, { value: 86.7 }
      ]
    },
    {
      id: 4,
      name: 'Waterfront Plaza',
      location: 'Harbor District',
      score: 74.2,
      revenue: convertUSDToIDR(534000),
      efficiency: 68,
      trend: -1.5,
      trendData: [
        { value: 78 }, { value: 76 }, { value: 75 }, { value: 74.5 }, { value: 74.2 }
      ]
    },
    {
      id: 5,
      name: 'Suburban Branch',
      location: 'Residential Area',
      score: 68.9,
      revenue: convertUSDToIDR(425000),
      efficiency: 72,
      trend: -2.8,
      trendData: [
        { value: 73 }, { value: 71 }, { value: 70 }, { value: 69.5 }, { value: 68.9 }
      ]
    },
    {
      id: 6,
      name: 'University Campus',
      location: 'Student Center',
      score: 62.4,
      revenue: convertUSDToIDR(389000),
      efficiency: 65,
      trend: 1.2,
      trendData: [
        { value: 60 }, { value: 61 }, { value: 61.5 }, { value: 62 }, { value: 62.4 }
      ]
    }
  ];

  // Mock data for category distribution - converted to IDR
  const categoryDistributionData = [
    {
      category: 'Main Courses',
      percentage: 35.2,
      total: convertUSDToIDR(1002040),
      outlets: [
        { name: 'Downtown Location', value: convertUSDToIDR(346740), percentage: 35.2 },
        { name: 'Shopping Mall', value: convertUSDToIDR(266112), percentage: 35.2 },
        { name: 'Airport Terminal', value: convertUSDToIDR(314024), percentage: 35.2 }
      ]
    },
    {
      category: 'Beverages',
      percentage: 28.7,
      total: convertUSDToIDR(817225),
      outlets: [
        { name: 'Downtown Location', value: convertUSDToIDR(282695), percentage: 28.7 },
        { name: 'Shopping Mall', value: convertUSDToIDR(216932), percentage: 28.7 },
        { name: 'Airport Terminal', value: convertUSDToIDR(256004), percentage: 28.7 }
      ]
    },
    {
      category: 'Appetizers',
      percentage: 15.8,
      total: convertUSDToIDR(449910),
      outlets: [
        { name: 'Downtown Location', value: convertUSDToIDR(155630), percentage: 15.8 },
        { name: 'Shopping Mall', value: convertUSDToIDR(119448), percentage: 15.8 },
        { name: 'Airport Terminal', value: convertUSDToIDR(140934), percentage: 15.8 }
      ]
    },
    {
      category: 'Desserts',
      percentage: 12.1,
      total: convertUSDToIDR(344548),
      outlets: [
        { name: 'Downtown Location', value: convertUSDToIDR(119185), percentage: 12.1 },
        { name: 'Shopping Mall', value: convertUSDToIDR(91476), percentage: 12.1 },
        { name: 'Airport Terminal', value: convertUSDToIDR(107932), percentage: 12.1 }
      ]
    },
    {
      category: 'Sides',
      percentage: 5.9,
      total: convertUSDToIDR(168003),
      outlets: [
        { name: 'Downtown Location', value: convertUSDToIDR(58115), percentage: 5.9 },
        { name: 'Shopping Mall', value: convertUSDToIDR(44604), percentage: 5.9 },
        { name: 'Airport Terminal', value: convertUSDToIDR(52627), percentage: 5.9 }
      ]
    },
    {
      category: 'Specials',
      percentage: 2.3,
      total: convertUSDToIDR(65524),
      outlets: [
        { name: 'Downtown Location', value: convertUSDToIDR(22655), percentage: 2.3 },
        { name: 'Shopping Mall', value: convertUSDToIDR(17388), percentage: 2.3 },
        { name: 'Airport Terminal', value: convertUSDToIDR(20512), percentage: 2.3 }
      ]
    }
  ];

  useEffect(() => {
    // Simulate data refresh
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleOutletChange = (outlets) => {
    setSelectedOutlets(outlets);
  };

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  const handleComparisonModeChange = (mode) => {
    setComparisonMode(mode);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const handleOutletClick = (outletName) => {
    console.log(`Navigating to detailed view for: ${outletName}`);
    // Navigate to outlet-specific dashboard
  };

  const handleOutletSelect = (outletName) => {
    console.log(`Selected outlet: ${outletName}`);
    // Handle outlet selection for detailed analysis
  };

  const handleCategoryDrillDown = (category, data) => {
    console.log(`Drilling down into category: ${category}`, data);
    // Handle category drill-down functionality
  };

  const handleBookmarkSave = (bookmark) => {
    console.log('Bookmark saved:', bookmark);
    // Handle bookmark save
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Analytics Header */}
          <AnalyticsHeader
            selectedOutlets={selectedOutlets}
            onOutletChange={handleOutletChange}
            timePeriod={timePeriod}
            onTimePeriodChange={handleTimePeriodChange}
            comparisonMode={comparisonMode}
            onComparisonModeChange={handleComparisonModeChange}
            onBookmarkSave={handleBookmarkSave}
            onRefresh={handleRefresh}
            lastUpdated={lastUpdated}
          />

          {/* Metrics Strip */}
          <MetricsStrip 
            metrics={metricsData}
            selectedOutlets={selectedOutlets}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
            {/* Performance Scatter Plot - 8 columns */}
            <div className="xl:col-span-8">
              <PerformanceScatterPlot
                data={scatterPlotData}
                onOutletClick={handleOutletClick}
              />
            </div>

            {/* Outlet Leaderboard - 4 columns */}
            <div className="xl:col-span-4">
              <OutletLeaderboard
                data={leaderboardData}
                onOutletSelect={handleOutletSelect}
              />
            </div>
          </div>

          {/* Category Distribution Chart - Full Width */}
          <CategoryDistributionChart
            data={categoryDistributionData}
            selectedOutlets={selectedOutlets}
            onCategoryDrillDown={handleCategoryDrillDown}
          />
        </div>
      </main>
    </div>
  );
};

export default MultiOutletPerformanceAnalytics;