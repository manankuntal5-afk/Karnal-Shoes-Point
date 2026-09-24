import React from 'react';
import { ShoppingBag, ArrowRight, Sparkles, CheckCircle2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingCartBar: React.FC = () => {
  const { 
    cartTotalCount, 
    cartCombosCount, 
    cartSinglesCount, 
    cartTotalPrice, 
    openCart, 
    proceedToCheckoutWithCart,
    currentView,
    cartNotification,
    dismissCartNotification
  } = useStore();

  // Don't show if on CHECKOUT or ORDER_SUCCESS
  if (currentView === 'CHECKOUT' || currentView === 'ORDER_SUCCESS') return null;

  return (
    <>
      {/* 1. Quick Toast Notification when user taps Add to Cart */}
      {cartNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md animate-fade-in select-none">
          <div className="px-4 py-3 rounded-2xl bg-slate-950 border border-emerald-500/50 shadow-2xl shadow-emerald-500/20 text-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <p className="text-xs font-bold text-slate-100 line-clamp-2">
                {cartNotification}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={proceedToCheckoutWithCart}
                className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black text-[11px] hover:bg-emerald-400 active:scale-95 cursor-pointer shadow-sm"
              >
                Checkout
              </button>
              <button
                onClick={dismissCartNotification}
                className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Floating Bottom Cart Summary Pill: Clicking immediately proceeds straight to Address page! */}
      {cartTotalCount > 0 && (
        <div className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-md animate-slide-up select-none">
          <div 
            onClick={proceedToCheckoutWithCart}
            className="p-3 sm:py-3 sm:px-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/60 shadow-2xl shadow-emerald-500/20 text-white flex items-center justify-between gap-3 cursor-pointer hover:border-emerald-400 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {/* Left: Bag Icon & Item Info */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black text-[11px] flex items-center justify-center shadow-md">
                  {cartTotalCount}
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-white font-['Outfit']">
                    {cartTotalCount} {cartTotalCount === 1 ? 'Pair' : 'Pairs'} &bull; ₹{cartTotalPrice}
                  </span>
                  {cartCombosCount > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                      Combo
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                  <span>Free Express Delivery Across India</span>
                </div>
              </div>
            </div>

            {/* Right: Action Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                proceedToCheckoutWithCart();
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs font-['Outfit'] shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
            >
              <span>Address & Pay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
