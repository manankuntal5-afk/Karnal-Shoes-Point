import React, { useState, useMemo } from 'react';
import { 
  Flame, Sparkles, Filter, Search, ArrowUpDown, ShoppingBag, 
  CheckCircle2, Star, Tag, Grid, Layers, Zap, ShieldCheck, Truck, RotateCcw
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CompactShoeVideoCard } from './CompactShoeVideoCard';
import { ShoeCard } from './ShoeCard';
import { SHOE_BRANDS } from '../data/shoesData';
import { Shoe } from '../types';

export const AllShoesShoppingView: React.FC = () => {
  const { shoes, setActiveBrand, openComboBuilder } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [filterBrand, setFilterBrand] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'reviews' | 'likes'>('featured');
  const [viewMode, setViewMode] = useState<'reels' | 'grid'>('reels');

  const categories = ['ALL', 'Running', 'Sneakers', 'Sports', 'Casual'];

  const filteredShoes = useMemo(() => {
    let result = [...shoes];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        s => s.name.toLowerCase().includes(q) || 
             s.brand.toLowerCase().includes(q) || 
             s.tagline.toLowerCase().includes(q) ||
             s.category.toLowerCase().includes(q)
      );
    }

    // Brand filter (Only Nike and Puma)
    if (filterBrand !== 'ALL') {
      result = result.filter(s => s.brand.toLowerCase() === filterBrand.toLowerCase());
    }

    // Category filter
    if (selectedCategory !== 'ALL') {
      result = result.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Sorting
    if (sortBy === 'reviews') {
      result.sort((a, b) => b.totalReviews - a.totalReviews);
    } else if (sortBy === 'likes') {
      result.sort((a, b) => (b.reelLikes || 0) - (a.reelLikes || 0));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [shoes, searchQuery, filterBrand, selectedCategory, sortBy]);

  const nikeCount = shoes.filter(s => s.brand.toLowerCase() === 'nike').length || 12;
  const pumaCount = shoes.filter(s => s.brand.toLowerCase() === 'puma').length || 11;

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 space-y-6 select-none">
      {/* Shopping Filters & Search Controls Toolbar */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-800 p-3 sm:p-4 space-y-3 shadow-xl">
        {/* Row 1: Search + View Switcher + Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Nike or Puma model name, category, or features..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-slate-900 text-white">Featured</option>
                <option value="reviews" className="bg-slate-900 text-white">Top Rated (10k+)</option>
                <option value="likes" className="bg-slate-900 text-white">Most Liked Reels</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950 border border-slate-700/80 rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('reels')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'reels' ? 'bg-emerald-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                }`}
                title="Reels Format"
              >
                Reels
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-emerald-500 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid Format"
              >
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Brand Filter Chips - EXACTLY 3: All Shoes (23), Nike (12), Puma (11) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar text-xs">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-emerald-400" />
            <span>Filter Brand:</span>
          </span>

          {/* 1. All Shoes */}
          <button
            onClick={() => setFilterBrand('ALL')}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 font-bold transition-all cursor-pointer border ${
              filterBrand === 'ALL'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 border-emerald-400 font-black shadow-md shadow-emerald-500/20'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            All Shoes ({shoes.length})
          </button>

          {/* 2. Nike */}
          <button
            onClick={() => setFilterBrand('Nike')}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 font-bold transition-all cursor-pointer border ${
              filterBrand.toLowerCase() === 'nike'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-400 font-black shadow-md shadow-red-500/20'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            Nike ({nikeCount})
          </button>

          {/* 3. Puma */}
          <button
            onClick={() => setFilterBrand('Puma')}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 font-bold transition-all cursor-pointer border ${
              filterBrand.toLowerCase() === 'puma'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 font-black shadow-md shadow-emerald-500/20'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            Puma ({pumaCount})
          </button>
        </div>

        {/* Row 3: Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar text-xs border-t border-slate-800/80 pt-2.5">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg shrink-0 font-semibold transition-all cursor-pointer text-[11px] ${
                selectedCategory === cat
                  ? 'bg-slate-700 text-white font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Results Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-rose-500" />
          <h2 className="text-lg sm:text-xl font-black font-['Outfit'] text-white">
            Showing {filteredShoes.length} of {shoes.length} Shoes
          </h2>
        </div>
        <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
          Flat ₹389 &bull; Combo 2 @ ₹700
        </span>
      </div>

      {/* Shoes Grid: Either Instagram 9:16 Reels Video Cards or Classic E-Commerce Cards */}
      {filteredShoes.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-slate-900 rounded-3xl border border-slate-800">
          <p className="text-slate-400 text-sm">
            No shoes found matching your search or filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterBrand('ALL');
              setSelectedCategory('ALL');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'reels' ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredShoes.map((shoe, idx) => (
            <CompactShoeVideoCard key={shoe.id} shoe={shoe} index={idx} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {filteredShoes.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} />
          ))}
        </div>
      )}
    </div>
  );
};
