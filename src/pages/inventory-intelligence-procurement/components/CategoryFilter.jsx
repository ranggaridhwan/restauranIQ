import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      <div className="flex items-center space-x-1 text-sm text-muted-foreground whitespace-nowrap">
        <Icon name="Filter" size={16} />
        <span>Category:</span>
      </div>
      <div className="flex space-x-2">
        {categories?.map((category) => (
          <button
            key={category?.value}
            onClick={() => onCategoryChange(category?.value)}
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-micro
              ${selectedCategory === category?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }
            `}
          >
            {category?.label}
            {category?.count && (
              <span className="ml-1 opacity-75">({category?.count})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;