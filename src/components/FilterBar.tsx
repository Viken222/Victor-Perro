import React from 'react';
import { Search, SlidersHorizontal, Layers, Sparkles, Presentation } from 'lucide-react';
import { CategoryType } from '../types';

interface FilterBarProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
  onOpenPPTHub?: () => void;
  pptCount?: number;
}

const CATEGORIES: { id: CategoryType; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'graphic-design', label: 'Graphic & ID Design' },
  { id: 'ceramics', label: 'Ceramics & Form' },
  { id: 'leather', label: 'Leather Goods' },
  { id: 'jewelry', label: 'Jewelry & Sculpture' },
  { id: 'photography', label: 'Product Photography' },
  { id: 'exhibition', label: 'Exhibitions & Display' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalCount,
  onOpenPPTHub,
  pptCount = 0,
}) => {
  return (
    <div className="bg-[#FAF8F5] py-8 border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Category Filter Pills Row */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold uppercase text-[#8C857B] mr-2 flex items-center shrink-0">
            <Layers className="w-3.5 h-3.5 mr-1 text-[#C5A059]" />
            Disciplines:
          </span>

          {onOpenPPTHub && (
            <button
              onClick={onOpenPPTHub}
              className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all bg-[#C5A059] text-white hover:bg-[#B38F48] shadow-xs flex items-center space-x-1.5 shrink-0"
              title="Open Exclusive PowerPoint Presentations Hub"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>📊 PPT Decks Hub</span>
              {pptCount > 0 && (
                <span className="bg-black/20 text-white text-[10px] px-1.5 py-0.2 rounded-full ml-1">
                  {pptCount}
                </span>
              )}
            </button>
          )}

          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#1A1A18] text-[#FAF8F5] shadow-sm font-semibold'
                    : 'bg-white text-[#59554E] hover:bg-[#F2ECE4] border border-[#E0D8CE]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search, Sort & Counter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C857B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search projects, materials, client names..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-[#D5CECE] bg-white text-[#1A1A18] placeholder-[#9C958C] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C857B] hover:text-[#1A1A18]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector & Results Indicator */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 text-xs">
            <div className="text-[#736E65]">
              Showing <span className="font-semibold text-[#1A1A18]">{totalCount}</span> project{totalCount === 1 ? '' : 's'}
            </div>

            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[#736E65] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-white border border-[#D5CECE] rounded-lg px-3 py-1.5 text-xs text-[#1A1A18] focus:outline-none focus:border-[#C5A059]"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest First</option>
                <option value="title">Title (A-Z)</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
