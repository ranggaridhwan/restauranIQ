import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const AnalyticsHeader = ({ 
  selectedOutlets, 
  onOutletChange, 
  timePeriod, 
  onTimePeriodChange,
  comparisonMode,
  onComparisonModeChange,
  onBookmarkSave,
  onRefresh,
  lastUpdated
}) => {
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [bookmarkName, setBookmarkName] = useState('');
  const [savedBookmarks, setSavedBookmarks] = useState([]);

  const outletOptions = [
    { value: 'all', label: 'All Outlets' },
    { value: 'downtown', label: 'Downtown Location' },
    { value: 'mall', label: 'Shopping Mall' },
    { value: 'airport', label: 'Airport Terminal' },
    { value: 'suburb', label: 'Suburban Branch' },
    { value: 'waterfront', label: 'Waterfront Plaza' },
    { value: 'university', label: 'University Campus' }
  ];

  const timePeriodOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'last-week', label: 'Last Week' },
    { value: 'month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const comparisonModeOptions = [
    { value: 'outlet-vs-outlet', label: 'Outlet vs Outlet' },
    { value: 'period-vs-period', label: 'Period vs Period' },
    { value: 'category-analysis', label: 'Category Analysis' }
  ];

  useEffect(() => {
    // Load saved bookmarks from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('analytics-bookmarks') || '[]');
    setSavedBookmarks(bookmarks);
  }, []);

  const formatLastUpdated = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSaveBookmark = () => {
    if (!bookmarkName?.trim()) return;

    const bookmark = {
      id: Date.now(),
      name: bookmarkName,
      outlets: selectedOutlets,
      timePeriod,
      comparisonMode,
      createdAt: new Date()?.toISOString()
    };

    const updatedBookmarks = [...savedBookmarks, bookmark];
    setSavedBookmarks(updatedBookmarks);
    localStorage.setItem('analytics-bookmarks', JSON.stringify(updatedBookmarks));
    
    setBookmarkName('');
    setShowBookmarkModal(false);
    
    if (onBookmarkSave) {
      onBookmarkSave(bookmark);
    }
  };

  const handleLoadBookmark = (bookmark) => {
    onOutletChange(bookmark?.outlets);
    onTimePeriodChange(bookmark?.timePeriod);
    onComparisonModeChange(bookmark?.comparisonMode);
  };

  const handleDeleteBookmark = (bookmarkId) => {
    const updatedBookmarks = savedBookmarks?.filter(b => b?.id !== bookmarkId);
    setSavedBookmarks(updatedBookmarks);
    localStorage.setItem('analytics-bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Title and Status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={16} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Multi-Outlet Analytics</h1>
              <p className="text-sm text-muted-foreground">
                Comparing {Array.isArray(selectedOutlets) ? selectedOutlets?.length : 1} outlet{Array.isArray(selectedOutlets) && selectedOutlets?.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          {/* Live Status */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-md">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">
              Updated {formatLastUpdated(lastUpdated)}
            </span>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          {/* Outlet Selector */}
          <div className="min-w-48">
            <Select
              options={outletOptions}
              value={Array.isArray(selectedOutlets) ? selectedOutlets : [selectedOutlets]}
              onChange={onOutletChange}
              placeholder="Select outlets"
              multiple
              searchable
              label=""
            />
          </div>

          {/* Time Period Selector */}
          <div className="min-w-36">
            <Select
              options={timePeriodOptions}
              value={timePeriod}
              onChange={onTimePeriodChange}
              placeholder="Select period"
              label=""
            />
          </div>

          {/* Comparison Mode */}
          <div className="min-w-40">
            <Select
              options={comparisonModeOptions}
              value={comparisonMode}
              onChange={onComparisonModeChange}
              placeholder="Comparison mode"
              label=""
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Bookmark"
              onClick={() => setShowBookmarkModal(true)}
            >
              Save
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              onClick={onRefresh}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
      {/* Saved Bookmarks */}
      {savedBookmarks?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Bookmark" size={14} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Saved Views:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {savedBookmarks?.slice(0, 5)?.map((bookmark) => (
              <div
                key={bookmark?.id}
                className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-md group hover:bg-muted/80 transition-micro"
              >
                <button
                  onClick={() => handleLoadBookmark(bookmark)}
                  className="text-sm text-foreground hover:text-primary transition-micro"
                >
                  {bookmark?.name}
                </button>
                <button
                  onClick={() => handleDeleteBookmark(bookmark?.id)}
                  className="opacity-0 group-hover:opacity-100 transition-micro"
                >
                  <Icon name="X" size={12} className="text-muted-foreground hover:text-error" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Bookmark Modal */}
      {showBookmarkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Save Current View</h3>
              <button
                onClick={() => setShowBookmarkModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bookmark Name
                </label>
                <input
                  type="text"
                  value={bookmarkName}
                  onChange={(e) => setBookmarkName(e?.target?.value)}
                  placeholder="Enter a name for this view"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>This will save:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Selected outlets ({Array.isArray(selectedOutlets) ? selectedOutlets?.length : 1})</li>
                  <li>Time period ({timePeriod})</li>
                  <li>Comparison mode ({comparisonMode})</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowBookmarkModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveBookmark}
                disabled={!bookmarkName?.trim()}
              >
                Save Bookmark
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsHeader;