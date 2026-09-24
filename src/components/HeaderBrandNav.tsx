import React from 'react';
import { Flame, Sparkles, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SHOE_BRANDS } from '../data/shoesData';

export const HeaderBrandNav: React.FC = () => {
  const { activeBrand, setActiveBrand, shoes, currentView, navigateToView } = useStore();

  const handleSelectBrand = (brandId: string) => {
    setActiveBrand(brandId);
    if (currentView !== 'HOME') {
      navigateToView('HOME');
    }
    const container = document.getElementById('app-main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allShoesCount = shoes.length || 23;
  const nikeCount = shoes.filter(s => s.brand.toLowerCase() === 'nike').length || 12;
  const pumaCount = shoes.filter(s => s.brand.toLowerCase() === 'puma').length || 11;

  return (
    <div id="header-brand-nav-bar" className="w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 py-2.5 px-3 sm:px-6 shadow-2xl select-none sticky top-[57px] z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Navigation Label */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="uppercase tracking-wider font-['Outfit'] text-slate-300">Browse Store:</span>
        </div>

        {/* 3 Main Tabs: 1. All Shoes (23), 2. Nike (12), 3. Puma (11) */}
        <div className="grid grid-cols-3 gap-2 w-full lg:w-auto flex-1 max-w-2xl mx-auto lg:mx-0">
          
          {/* 1. ALL SHOES TAB (23 Models) */}
          <button
            type="button"
            data-active={activeBrand === 'ALL'}
            onClick={() => handleSelectBrand('ALL')}
            className={`group relative flex items-center justify-center gap-1.5 sm:gap-2.5 py-2 sm:py-2.5 px-2 sm:px-5 rounded-2xl transition-all duration-200 cursor-pointer border ${
              activeBrand === 'ALL'
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-300 border-emerald-300 font-black scale-[1.02]'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-850 border-slate-800 hover:border-emerald-500/40 font-bold active:scale-95'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-slate-950/30 flex items-center justify-center shrink-0">
              <Flame className={`w-3.5 h-3.5 ${activeBrand === 'ALL' ? 'text-slate-950 fill-slate-950' : 'text-emerald-400'}`} />
            </div>

            <span className="text-xs sm:text-sm font-['Outfit'] tracking-tight truncate">
              All Shoes
            </span>

            <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider ${
              activeBrand === 'ALL'
                ? 'bg-slate-950 text-emerald-300 ring-1 ring-emerald-400/40'
                : 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
            }`}>
              {allShoesCount}
            </span>

            {activeBrand === 'ALL' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-ping" />
            )}
          </button>

          {/* 2. NIKE TAB (12 Models) */}
          <button
            type="button"
            data-active={activeBrand.toLowerCase() === 'nike'}
            onClick={() => handleSelectBrand('Nike')}
            className={`group relative flex items-center justify-center gap-1.5 sm:gap-2.5 py-2 sm:py-2.5 px-2 sm:px-5 rounded-2xl transition-all duration-200 cursor-pointer border ${
              activeBrand.toLowerCase() === 'nike'
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 text-white shadow-lg shadow-red-600/30 ring-2 ring-red-400 border-red-300 font-black scale-[1.02]'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-850 border-slate-800 hover:border-red-500/40 font-bold active:scale-95'
            }`}
          >
            <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-950 shrink-0 p-0.5 ring-1 ring-white/30">
              <img
                src={SHOE_BRANDS[0]?.logo || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&auto=format&fit=crop&q=80"}
                alt="Nike"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>

            <span className="text-xs sm:text-sm font-['Outfit'] tracking-tight truncate">
              Nike
            </span>

            <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider ${
              activeBrand.toLowerCase() === 'nike'
                ? 'bg-black/40 text-white ring-1 ring-white/40'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}>
              {nikeCount}
            </span>

            {activeBrand.toLowerCase() === 'nike' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-400 ring-2 ring-slate-950 animate-ping" />
            )}
          </button>

          {/* 3. PUMA TAB (11 Models) */}
          <button
            type="button"
            data-active={activeBrand.toLowerCase() === 'puma'}
            onClick={() => handleSelectBrand('Puma')}
            className={`group relative flex items-center justify-center gap-1.5 sm:gap-2.5 py-2 sm:py-2.5 px-2 sm:px-5 rounded-2xl transition-all duration-200 cursor-pointer border ${
              activeBrand.toLowerCase() === 'puma'
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400 border-emerald-300 font-black scale-[1.02]'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-850 border-slate-800 hover:border-emerald-500/40 font-bold active:scale-95'
            }`}
          >
            <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-950 shrink-0 p-0.5 ring-1 ring-white/30">
              <img
                src={SHOE_BRANDS[1]?.logo || "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=120&auto=format&fit=crop&q=80"}
                alt="Puma"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>

            <span className="text-xs sm:text-sm font-['Outfit'] tracking-tight truncate">
              Puma
            </span>

            <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider ${
              activeBrand.toLowerCase() === 'puma'
                ? 'bg-black/40 text-white ring-1 ring-white/40'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}>
              {pumaCount}
            </span>

            {activeBrand.toLowerCase() === 'puma' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-ping" />
            )}
          </button>

        </div>

        {/* Promo Price Tag for Desktop */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-300 border border-amber-500/30 text-xs font-black font-['Outfit'] flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Flat ₹389 &bull; Combo 2 @ ₹700</span>
          </span>
        </div>

      </div>
    </div>
  );
};
