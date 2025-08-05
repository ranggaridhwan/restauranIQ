import React, { useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const OutletLeaderboard = ({ data, onOutletSelect }) => {
  const [sortBy, setSortBy] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');

  const formatScore = (score) => {
    return score?.toFixed(1);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(value);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-accent';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 75) return 'bg-accent/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const sortedData = [...data]?.sort((a, b) => {
    const aValue = a?.[sortBy];
    const bValue = b?.[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue - bValue;
    }
    return bValue - aValue;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const MiniTrendChart = ({ data }) => (
    <div className="w-16 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#2563EB" 
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Trophy" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Performance Leaderboard</h3>
            <p className="text-sm text-muted-foreground">Ranked by overall score</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleSort('score')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-micro ${
              sortBy === 'score' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Score
            {sortBy === 'score' && (
              <Icon 
                name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                size={12} 
                className="ml-1 inline"
              />
            )}
          </button>
          <button
            onClick={() => handleSort('revenue')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-micro ${
              sortBy === 'revenue' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Revenue
            {sortBy === 'revenue' && (
              <Icon 
                name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                size={12} 
                className="ml-1 inline"
              />
            )}
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {sortedData?.map((outlet, index) => (
          <div
            key={outlet?.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-micro cursor-pointer"
            onClick={() => onOutletSelect && onOutletSelect(outlet?.name)}
          >
            <div className="flex items-center space-x-4">
              {/* Rank */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-semibold text-foreground">
                {index + 1}
              </div>

              {/* Outlet Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground">{outlet?.name}</h4>
                  <span className="text-xs text-muted-foreground">{outlet?.location}</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Revenue: {formatCurrency(outlet?.revenue)}</span>
                  <span>•</span>
                  <span>Efficiency: {outlet?.efficiency}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Mini Trend Chart */}
              <div className="hidden md:block">
                <MiniTrendChart data={outlet?.trendData} />
              </div>

              {/* Trend Indicator */}
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getTrendIcon(outlet?.trend)} 
                  size={14} 
                  className={getTrendColor(outlet?.trend)}
                />
                <span className={`text-xs font-medium ${getTrendColor(outlet?.trend)}`}>
                  {Math.abs(outlet?.trend)?.toFixed(1)}%
                </span>
              </div>

              {/* Score */}
              <div className={`px-3 py-1 rounded-full ${getScoreBgColor(outlet?.score)}`}>
                <span className={`text-sm font-semibold ${getScoreColor(outlet?.score)}`}>
                  {formatScore(outlet?.score)}
                </span>
              </div>

              {/* Action */}
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Top Performer</p>
            <p className="font-semibold text-foreground">{sortedData?.[0]?.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg Score</p>
            <p className="font-semibold text-foreground">
              {formatScore(sortedData?.reduce((sum, outlet) => sum + outlet?.score, 0) / sortedData?.length)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Improving</p>
            <p className="font-semibold text-success">
              {sortedData?.filter(outlet => outlet?.trend > 0)?.length}/{sortedData?.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutletLeaderboard;