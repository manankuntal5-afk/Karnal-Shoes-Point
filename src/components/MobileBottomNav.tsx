import React, { useState } from 'react';
import { Flame, Sparkles, ShoppingBag, Phone, X, ChevronRight, Check, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SHOE_BRANDS } from '../data/shoesData';

export const MobileBottomNav: React.FC = () => {
  const { 
    currentView, 
    navigateToHome, 
    activeBrand, 
    setActiveBrand, 
    openComboBuilder,
    shoes
  } = useStore();

  const [isBrandSheetOpen, setIsBrandSheetOpen] = useState(false);

  const handleSelectBrand = (brandId: string) => {
    setActiveBrand(brandId);
    if (currentView !== 'HOME') {
      navigateToHome();
    }
    setIsBrandSheetOpen(false);

    // Scroll top
    const container = document.getElementById('app-main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allShoesCount = shoes.length || 23;

  // Hide bottom brand navigation on Checkout & Order Success for a clean, distraction-free address and payment flow!
  if (currentView === 'CHECKOUT' || currentView === 'ORDER_SUCCESS') {
    return null;
  }

  return (
    <>
      {/* Mobile Bottom Sticky Navigation Bar */}
      <nav 
        id="mobile-bottom-nav-bar"
        aria-label="Mobile Navigation"
        className="md:hidden shrink-0 w-full bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 text-white z-40 py-1.5 px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] select-none shadow-2xl"
      >
        <div className="flex items-center justify-around">
          
          {/* 1. Home (All Shoes - All 23 Models) */}
          <button
            onClick={() => handleSelectBrand('ALL')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              currentView === 'HOME' && activeBrand === 'ALL'
                ? 'text-emerald-400 font-extrabold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Flame className="w-5 h-5" />
              {activeBrand === 'ALL' && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-['Outfit']">
              All ({allShoesCount})
            </span>
          </button>

          {/* 2. Nike (12 Models) */}
          <button
            onClick={() => handleSelectBrand('Nike')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              activeBrand === 'Nike'
                ? 'text-rose-400 font-extrabold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight font-['Outfit']">
              Nike (12)
            </span>
          </button>

          {/* 3. Center Glowing Combo ₹700 Deal Button */}
          <button
            onClick={openComboBuilder}
            className="flex flex-col items-center justify-center py-1 px-2.5 -mt-3.5 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white shadow-lg shadow-rose-500/25 active:scale-95 transition-transform border border-amber-300/40"
          >
            <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
            <span className="text-[10px] font-black tracking-wider leading-none mt-0.5 uppercase">
              Combo
            </span>
            <span className="text-[11px] font-black leading-none text-amber-200">
              ₹700
            </span>
          </button>

          {/* 4. Puma (11 Models) */}
          <button
            onClick={() => handleSelectBrand('Puma')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
              activeBrand === 'Puma'
                ? 'text-emerald-400 font-extrabold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight font-['Outfit']">
              Puma (11)
            </span>
          </button>

          {/* 5. Support / WhatsApp */}
          <a
            href={`https://wa.me/919829087654?text=${encodeURIComponent("Hello Karnal Shoes Point, I am on the website and want to order shoes @ ₹389 / Combo @ ₹700")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 px-2 text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight font-['Outfit'] font-bold">
              Help
            </span>
          </a>

        </div>
      </nav>

      {/* Mobile Bottom Sheet: Brands Quick Switcher */}
      {isBrandSheetOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end animate-fade-in">
          <div 
            onClick={() => setIsBrandSheetOpen(false)} 
            className="flex-1"
          />

          <div className="w-full bg-slate-900 border-t border-slate-800 rounded-t-3xl p-4 pb-8 space-y-3 shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-base font-black text-white font-['Outfit']">
                  Choose Footwear Brand
                </h3>
                <p className="text-xs text-slate-400">
                  Nike (12 Models) &amp; Puma (11 Models) &bull; Total 23 Shoes
                </p>
              </div>

              <button
                onClick={() => setIsBrandSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of Brands */}
            <div className="space-y-2">
              {/* 1. ALL SHOES (23 MODELS) */}
              <button
                onClick={() => handleSelectBrand('ALL')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                  activeBrand === 'ALL'
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-400 shadow-md ring-1 ring-emerald-300'
                    : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 text-emerald-400" />
                  </div>

                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-emerald-300 font-['Outfit']">
                        1. All Shoes Collection
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-black">
                        HOME
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block">
                      Browse all 23 models (Nike + Puma)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-xs font-black">
                    {allShoesCount} Shoes
                  </span>
                  {activeBrand === 'ALL' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </button>

              {/* 2 & 3: Nike & Puma */}
              {SHOE_BRANDS.map((brand, idx) => {
                const isSelected = activeBrand.toLowerCase() === brand.name.toLowerCase();
                const count = shoes.filter(s => s.brand.toLowerCase() === brand.name.toLowerCase()).length || brand.shoeCount;

                return (
                  <button
                    key={brand.id}
                    onClick={() => handleSelectBrand(brand.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 border-emerald-500 shadow-md ring-1 ring-emerald-400/40'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-950 p-1 border border-white/10 shrink-0">
                        <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                      </div>

                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white font-['Outfit']">
                            {idx + 2}. {brand.displayName || brand.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block truncate max-w-[200px]">
                          {brand.tagline}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs font-black text-slate-300 border border-slate-700">
                        {count < 10 ? `0${count}` : count} Models
                      </span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
