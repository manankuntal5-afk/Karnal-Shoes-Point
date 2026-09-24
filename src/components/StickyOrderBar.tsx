import React from 'react';
import { ArrowRight, Sparkles, Zap, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface StickyOrderBarProps {
  onOrderNowClick: () => void;
}

export const StickyOrderBar: React.FC<StickyOrderBarProps> = ({ onOrderNowClick }) => {
  const { 
    purchaseMode, 
    setPurchaseMode, 
    openComboBuilder,
    proceedToCheckout,
    isSelectionComplete 
  } = useStore();

  const isCombo = purchaseMode === 'COMBO';
  const isSingle = purchaseMode === 'SINGLE';
  const price = isCombo ? '700' : '389';

  const handleSelectSingle = () => {
    setPurchaseMode('SINGLE');
    const el = document.getElementById('all-shoes-reels-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectCombo = () => {
    setPurchaseMode('COMBO');
    openComboBuilder();
  };

  const handleOrderClick = () => {
    if (isSelectionComplete) {
      proceedToCheckout();
    } else if (purchaseMode === 'COMBO') {
      openComboBuilder();
    } else {
      const el = document.getElementById('all-shoes-reels-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside 
      id="sticky-order-now-bottom-bar"
      aria-label="Quick order bar"
      className="shrink-0 w-full max-w-full bg-slate-950/95 backdrop-blur-md text-white border-t border-slate-800 shadow-2xl z-40 transition-all select-none"
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 w-full">
        
        {/* Left: Pack Selection Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleSelectSingle}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 font-['Outfit'] select-none shrink-0 ${
              isSingle 
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <span>1 Pair</span>
            <span className="font-extrabold text-xs">₹389</span>
          </button>
          
          <button
            type="button"
            onClick={handleSelectCombo}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 font-['Outfit'] select-none shrink-0 ${
              isCombo 
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400' 
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>2 Pairs</span>
            <span className="font-extrabold text-xs text-amber-300">₹700</span>
          </button>
        </div>

        {/* Center: Live Pricing & Offer */}
        <div className="flex flex-col items-center justify-center leading-none text-center hidden xs:flex">
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total:</span>
            <span className="text-base sm:text-lg font-black text-emerald-400 font-['Outfit']">
              ₹{price}
            </span>
          </div>
          <span className="text-[10px] text-indigo-300 font-medium mt-0.5">
            {isCombo ? 'Free Delivery • Save ₹78' : 'Free Express Delivery'}
          </span>
        </div>

        {/* Right: Modern High-Converting Action Button */}
        <button
          type="button"
          onClick={handleOrderClick}
          className="flex-1 sm:flex-none sm:min-w-[200px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 font-['Outfit']"
        >
          <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
          <span>{isSelectionComplete ? 'Pay Now' : isCombo ? 'Pick 2 Pairs @ ₹700' : 'Order Now @ ₹389'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </aside>
  );
};
