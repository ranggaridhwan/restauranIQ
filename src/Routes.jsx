import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import InventoryIntelligenceProcurement from './pages/inventory-intelligence-procurement';
import RealTimeOperationsDashboard from './pages/real-time-operations-dashboard';
import MultiOutletPerformanceAnalytics from './pages/multi-outlet-performance-analytics';
import FinancialPerformanceCostAnalysis from './pages/financial-performance-cost-analysis';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<FinancialPerformanceCostAnalysis />} />
        <Route path="/inventory-intelligence-procurement" element={<InventoryIntelligenceProcurement />} />
        <Route path="/real-time-operations-dashboard" element={<RealTimeOperationsDashboard />} />
        <Route path="/multi-outlet-performance-analytics" element={<MultiOutletPerformanceAnalytics />} />
        <Route path="/financial-performance-cost-analysis" element={<FinancialPerformanceCostAnalysis />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
