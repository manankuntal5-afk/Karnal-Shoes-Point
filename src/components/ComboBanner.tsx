import React from 'react';
import { Zap, CheckCircle2, Truck, ArrowRight, X, Plus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ShoeSlotIcon } from './ShoeSlotIcon';

export const ComboBanner: React.FC = () => {
  const { 
    comboSelection, 
    setComboItem1, 
    setComboItem2, 
    clearCombo, 
    navigateToCheckoutCombo, 
    openComboBuilder
  } = useStore();

  const isComplete = comboSelection.item1 && comboSelection.item2;

  return (
    <section id="combo-section" className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#131921] via-[#232f3e] to-[#131921] text-white p-5 sm:p-7 md:p-8 shadow-lg border border-slate-700 scroll-mt-24">
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Headline & Details */}
        <div className="max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#cc0c39] text-white text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-white text-white" />
            Amazon Mega Saver Combo Deal
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit'] leading-tight">
            Buy <span className="text-[#febd69]">2 Pairs Combo Pack</span> for Only <span className="text-[#ffa41c] underline decoration-[#febd69]">₹700</span>!
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            Order <strong>2 pairs combo</strong> of this premium shoe in your preferred sizes and colors with <strong>Free Express Delivery</strong> across India!
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-200">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Save Extra ₹78 Instantly
            </span>
            <span className="flex items-center gap-1.5 font-bold text-[#febd69]">
              <Truck className="w-4 h-4" /> Free Doorstep Delivery
            </span>
            <span className="flex items-center gap-1.5 font-bold text-slate-300">
              &bull; Delivered in 4-5 Days
            </span>
          </div>
        </div>

        {/* Right Interactive Selection Slot Container */}
        <div className="w-full lg:w-auto bg-white/10 backdrop-blur-xs rounded-xl p-4 sm:p-5 border border-white/20 max-w-md shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-[#febd69]">
              Your 2-Pair Combo Tray
            </h3>
            {(comboSelection.item1 || comboSelection.item2) && (
              <button
                onClick={clearCombo}
                className="text-[11px] text-slate-300 hover:text-white underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Slots Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Slot 1 */}
            <div className="bg-[#131921]/90 rounded-xl p-2.5 border border-slate-700 flex flex-col items-center text-center justify-center min-h-[125px]">
              {comboSelection.item1 ? (
                <div className="relative w-full">
                  <button
                    onClick={() => setComboItem1(null as any, 0, '')}
                    className="absolute -top-1 -right-1 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 cursor-pointer"
                    title="Remove"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <img
                    src={comboSelection.item1.shoe.thumbnail}
                    alt={comboSelection.item1.shoe.name}
                    className="w-12 h-12 rounded-lg object-cover mx-auto mb-1 border border-white/20"
                  />
                  <div className="text-xs font-bold truncate text-white">
                    {comboSelection.item1.shoe.name}
                  </div>
                  <div className="text-[11px] text-[#febd69] font-bold mt-0.5">
                    UK {comboSelection.item1.size}
                  </div>
                </div>
              ) : (
                <button
                  onClick={openComboBuilder}
                  className="flex flex-col items-center justify-center gap-1.5 py-1.5 w-full text-slate-300 hover:text-[#febd69] transition-colors cursor-pointer group"
                >
                  <ShoeSlotIcon number={1} />
                  <span className="text-xs font-bold text-slate-200 group-hover:text-[#febd69] leading-tight mt-1">
                    Select Pair 01
                  </span>
                </button>
              )}
            </div>

            {/* Slot 2 */}
            <div className="bg-[#131921]/90 rounded-xl p-2.5 border border-slate-700 flex flex-col items-center text-center justify-center min-h-[125px]">
              {comboSelection.item2 ? (
                <div className="relative w-full">
                  <button
                    onClick={() => setComboItem2(null as any, 0, '')}
                    className="absolute -top-1 -right-1 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 cursor-pointer"
                    title="Remove"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <img
                    src={comboSelection.item2.shoe.thumbnail}
                    alt={comboSelection.item2.shoe.name}
                    className="w-12 h-12 rounded-lg object-cover mx-auto mb-1 border border-white/20"
                  />
                  <div className="text-xs font-bold truncate text-white">
                    {comboSelection.item2.shoe.name}
                  </div>
                  <div className="text-[11px] text-[#febd69] font-bold mt-0.5">
                    UK {comboSelection.item2.size}
                  </div>
                </div>
              ) : (
                <button
                  onClick={openComboBuilder}
                  className="flex flex-col items-center justify-center gap-1.5 py-1.5 w-full text-slate-300 hover:text-[#febd69] transition-colors cursor-pointer group"
                >
                  <ShoeSlotIcon number={2} />
                  <span className="text-xs font-bold text-slate-200 group-hover:text-[#febd69] leading-tight mt-1">
                    Select Pair 02
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-300">Combo Total:</div>
              <div className="text-xl font-black text-[#febd69] font-['Outfit']">
                ₹700
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-300 font-bold bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                FREE Delivery
              </span>
            </div>
          </div>

          {/* Action CTA */}
          {isComplete ? (
            <button
              id="choose-combo-btn"
              onClick={navigateToCheckoutCombo}
              className="mt-3 w-full py-2.5 px-4 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#fcd200] shadow-sm transition-all cursor-pointer ring-2 ring-[#febd69]/40"
            >
              <span>Order 2-Pairs Combo @ ₹700</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="choose-combo-btn"
              onClick={openComboBuilder}
              className="mt-3 w-full py-2.5 px-4 rounded-full bg-[#ffa41c] hover:bg-[#fa8900] text-[#0f1111] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#ff8f00] shadow-sm transition-all cursor-pointer ring-2 ring-[#febd69]/40"
            >
              <span>Choose Your 02 Shoes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
