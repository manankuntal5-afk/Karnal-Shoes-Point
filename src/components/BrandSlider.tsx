import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BrandSlider: React.FC = () => {
  const { activeBrand, setActiveBrand, brandList, shoes } = useStore();

  const handleSelectBrand = (brandId: string) => {
    setActiveBrand(brandId);
    // Smooth scroll down to the shoes section if needed
    const el = document.getElementById('all-shoes-reels-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="brand-slider-bar" className="w-full bg-slate-900/90 backdrop-blur-md border-y border-slate-800 py-3 sticky top-16 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Mobile Swipe Notice */}
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-['Outfit'] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Brand Collection</span>
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            Swipe brands &rarr;
          </span>
        </div>

        {/* Horizontal Slider of 8 Brand Buttons + All Shoes */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar snap-x touch-pan-x">
          {/* Button 0: All Shoes */}
          <button
            onClick={() => handleSelectBrand('ALL')}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-['Outfit'] font-black text-xs shrink-0 snap-start transition-all cursor-pointer ${
              activeBrand === 'ALL'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105 ring-2 ring-emerald-300'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700'
            }`}
          >
            <Flame className={`w-4 h-4 ${activeBrand === 'ALL' ? 'fill-slate-950 text-slate-950' : 'text-amber-400'}`} />
            <span>All Shoes</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeBrand === 'ALL' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-700 text-slate-300'
            }`}>
              {shoes.length}
            </span>
          </button>

          {/* 8 Company Buttons */}
          {brandList.map((brand) => {
            const isSelected = activeBrand === brand.name;
            const count = shoes.filter(s => s.brand.toLowerCase() === brand.name.toLowerCase()).length || brand.shoeCount;

            return (
              <button
                key={brand.id}
                onClick={() => handleSelectBrand(brand.name)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-['Outfit'] font-bold text-xs shrink-0 snap-start transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 border-indigo-400 scale-105 ring-2 ring-indigo-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border-slate-700/80'
                }`}
              >
                {/* Brand Thumbnail Logo */}
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-4 h-4 rounded-full object-cover shrink-0 ring-1 ring-white/20"
                  referrerPolicy="no-referrer"
                />
                <span className="whitespace-nowrap font-extrabold">{brand.name}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-700/80 text-slate-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
