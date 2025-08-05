import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Select from './Select';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOutlet, setSelectedOutlet] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showQuickActions, setShowQuickActions] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/real-time-operations-dashboard',
      icon: 'BarChart3',
      tooltip: 'Real-time operational command center'
    },
    {
      label: 'Analytics',
      path: '/multi-outlet-performance-analytics',
      icon: 'TrendingUp',
      tooltip: 'Multi-outlet performance insights'
    },
    {
      label: 'Inventory',
      path: '/inventory-intelligence-procurement',
      icon: 'Package',
      tooltip: 'Intelligent procurement planning'
    },
    {
      label: 'Financials',
      path: '/financial-performance-cost-analysis',
      icon: 'DollarSign',
      tooltip: 'Cost analysis and profitability'
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

  const quickActions = [
    { label: 'Generate Procurement List', icon: 'ShoppingCart', action: 'procurement' },
    { label: 'Export Daily Report', icon: 'Download', action: 'export' },
    { label: 'Acknowledge Alerts', icon: 'CheckCircle', action: 'alerts' },
    { label: 'Update Stock Levels', icon: 'RefreshCw', action: 'stock' }
  ];

  useEffect(() => {
    // Simulate WebSocket connection status
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedOutlet = localStorage.getItem('selectedOutlet');
    const savedDateRange = localStorage.getItem('dateRange');
    
    if (savedOutlet) setSelectedOutlet(savedOutlet);
    if (savedDateRange) setDateRange(savedDateRange);
  }, []);

  const handleOutletChange = (value) => {
    setSelectedOutlet(value);
    localStorage.setItem('selectedOutlet', value);
  };

  const handleDateRangeChange = (value) => {
    setDateRange(value);
    localStorage.setItem('dateRange', value);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleQuickAction = (action) => {
    console.log(`Executing quick action: ${action}`);
    setShowQuickActions(false);
  };

  const handleRefresh = () => {
    setLastUpdate(new Date());
    // Trigger data refresh
  };

  const formatLastUpdate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="ChefHat" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground tracking-tight">
                RestaurantIQ
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => {
            const isActive = location.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium tracking-nav
                  transition-micro hover:bg-muted
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Controls */}
        <div className="flex items-center space-x-4">
          {/* Outlet Selector */}
          <div className="hidden lg:block">
            <Select
              options={outletOptions}
              value={selectedOutlet}
              onChange={handleOutletChange}
              placeholder="Select outlet"
              className="w-40"
            />
          </div>

          {/* Date Range Selector */}
          <div className="hidden lg:block">
            <Select
              options={dateRangeOptions}
              value={dateRange}
              onChange={handleDateRangeChange}
              placeholder="Select period"
              className="w-32"
            />
          </div>

          {/* Live Status Indicator */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-micro hover:bg-muted"
              title="Click to refresh data"
            >
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-error'}`} />
              <span className="text-muted-foreground">
                {formatLastUpdate(lastUpdate)}
              </span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="relative">
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
              title="Quick actions"
            >
              <Icon name="Zap" size={18} />
            </button>

            {showQuickActions && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-modal z-1010">
                <div className="p-2">
                  {quickActions?.map((action) => (
                    <button
                      key={action?.action}
                      onClick={() => handleQuickAction(action?.action)}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-left rounded-md hover:bg-muted transition-micro"
                    >
                      <Icon name={action?.icon} size={16} />
                      <span>{action?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-micro">
              <Icon name="Menu" size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border">
        <nav className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => {
            const isActive = location.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium
                  transition-micro
                  ${isActive 
                    ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;