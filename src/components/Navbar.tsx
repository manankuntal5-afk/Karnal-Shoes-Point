import React from 'react';
import { 
  ShoppingBag, Sparkles, ShieldCheck, 
  Truck, ArrowRight, Zap, CheckCircle2, Home, Grid
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HeaderBrandNav } from './HeaderBrandNav';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const { 
    storeConfig, 
    currentView,
    navigateToHome,
    activeBrand,
    setActiveBrand,
    openComboBuilder, 
    proceedToCheckout,
    proceedToCheckoutWithCart,
    openCart,
    cartTotalCount,
    cartCount,
    isSelectionComplete,
    navigateToSellingPage
  } = useStore();

  const handleCartClick = () => {
    if (cartTotalCount > 0) {
      proceedToCheckoutWithCart();
    } else if (isSelectionComplete) {
      proceedToCheckout();
    } else {
      openCart();
    }
  };

  const handleBrandClick = () => {
    setActiveBrand('ALL');
    navigateToHome();
    const container = document.getElementById('app-main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAllShoesClick = () => {
    setActiveBrand('ALL');
    navigateToHome();
    const container = document.getElementById('app-main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCheckoutView = currentView === 'CHECKOUT' || currentView === 'ORDER_SUCCESS';
  const isHomeActive = currentView === 'HOME' && activeBrand === 'ALL';
  const isAllShoesActive = currentView === 'HOME' && activeBrand === 'ALL';
  const isBrandPageActive = currentView === 'HOME' && activeBrand !== 'ALL';
  const isDetailActive = currentView === 'DETAIL';

  return (
    <header className="shrink-0 z-40 w-full sticky top-0 shadow-lg select-none">
      {/* Main Navigation Bar - Positioned at the very top */}
      <div className="bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* User's Original Brand Logo with dynamic two-tone name & click color cycler */}
          <div id="navbar-brand-logo-button" className="shrink-0 min-w-0">
            <Logo 
              onClick={handleBrandClick} 
              size="md"
            />
          </div>

          {/* Center Navigation: Active Page Indicators with Distinct Color & Link Styling */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-2xl border border-slate-800/80 text-xs">
            {/* Home / All Shoes Link */}
            <button
              onClick={handleAllShoesClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                isHomeActive
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-black ring-1 ring-emerald-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home (23 Shoes)</span>
            </button>

            {/* If a specific company brand is active, display that brand pill */}
            {isBrandPageActive && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-bold">
                <Grid className="w-3.5 h-3.5" />
                <span>Brand: {activeBrand}</span>
              </span>
            )}

            {/* Selling Page Indicator if active */}
            {isDetailActive && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 font-black">
                <span>Product Selling Page</span>
              </span>
            )}
          </nav>

          {/* Quick Action Navigation Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* 2-Pairs Combo Quick Nav (Hide if already on checkout) */}
            {!isCheckoutView && (
              <button
                onClick={openComboBuilder}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-black font-['Outfit'] shadow-md shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 active:scale-95 transition-all cursor-pointer border border-indigo-400/30"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span className="hidden sm:inline">Combo 2 Pairs</span>
                <span>₹700</span>
              </button>
            )}

            {/* Cart / Bag Button: Distinct Active indicator when in checkout */}
            <button
              onClick={handleCartClick}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                isCheckoutView 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-300' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
              title={cartTotalCount > 0 ? "Proceed to Address & Checkout" : "Shopping Cart"}
            >
              <ShoppingBag className={`w-4 h-4 ${isCheckoutView ? 'text-slate-950 stroke-[2.5]' : 'text-emerald-400'}`} />
              <span className="text-xs font-bold font-['Outfit'] hidden sm:inline">
                {isCheckoutView ? 'Checkout Active' : 'Cart'}
              </span>
              {cartCount > 0 ? (
                <span className={`w-5 h-5 rounded-full font-black text-[11px] flex items-center justify-center animate-bounce ${
                  isCheckoutView ? 'bg-slate-950 text-emerald-300' : 'bg-emerald-500 text-slate-950'
                }`}>
                  {cartCount}
                </span>
              ) : (
                <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 font-bold text-[11px] flex items-center justify-center">
                  0
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Header Brand Navigation Strip:
          CRITICAL REQUIREMENT: HIDE COMPLETELY ON ADDRESS / CHECKOUT PAGE SO THE ADDRESS PAGE IS CLEAN AND TIDY! */}
      {!isCheckoutView && (
        <HeaderBrandNav />
      )}
    </header>
  );
};
