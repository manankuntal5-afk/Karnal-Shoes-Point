import React, { useState } from 'react';
import { 
  X, Check, Sparkles, ArrowRight, ShieldCheck, 
  Flame, Search, Zap, Layers 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Shoe } from '../types';

export const ComboSelectorModal: React.FC = () => {
  const {
    isComboOpen,
    closeComboBuilder,
    comboState,
    setComboItem1,
    setComboItem2,
    shoes,
    navigateToCheckoutCombo
  } = useStore();

  const [activeTab, setActiveTab] = useState<'PAIR_1' | 'PAIR_2'>('PAIR_1');
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isComboOpen) return null;

  // Exactly Nike (12), Puma (11), ALL (23)
  const brands = ['ALL', 'Nike', 'Puma'];

  const filteredShoes = shoes.filter(shoe => {
    const matchesBrand = selectedBrand === 'ALL' 
      ? true 
      : shoe.brand.toLowerCase() === selectedBrand.toLowerCase();

    const matchesSearch = searchQuery === '' 
      ? true 
      : shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shoe.brand.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBrand && matchesSearch;
  });

  const AVAILABLE_SIZES = [6, 7, 8, 9, 10];

  const handleSelectShoeForActiveTab = (shoe: Shoe) => {
    const defaultSize = 8;
    const defaultColor = shoe.colors[0] || 'Standard';

    if (activeTab === 'PAIR_1') {
      setComboItem1(shoe, defaultSize, defaultColor);
      if (!comboState.pair2) {
        setActiveTab('PAIR_2');
      }
    } else {
      setComboItem2(shoe, defaultSize, defaultColor);
    }
  };

  const item1 = comboState.pair1;
  const item2 = comboState.pair2;
  const isReady = !!(item1 && item2);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto select-none">
      <div className="bg-slate-900 rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-800 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-slate-950 p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-rose-600/30 text-rose-300 border border-rose-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5 fill-rose-300 text-rose-300" />
              Limited Time Combo Deal
            </div>
            <h2 className="text-lg sm:text-2xl font-black font-['Outfit'] text-white">
              Build Your 2-Pairs Combo for Only <span className="text-emerald-400">₹700</span>!
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Pick any 2 shoes from 23 models across Nike (12) &amp; Puma (11) &bull; Free Express Delivery
            </p>
          </div>
          <button
            type="button"
            onClick={closeComboBuilder}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Pair Slots Bar */}
        <div className="bg-slate-950/80 p-3 sm:p-4 border-b border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {/* Slot 1 Selector Button */}
            <div 
              onClick={() => setActiveTab('PAIR_1')}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                activeTab === 'PAIR_1' 
                  ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-400 shadow-md' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="relative shrink-0">
                {item1 ? (
                  <img
                    src={item1.shoe.thumbnail}
                    alt="Pair 01"
                    className="w-12 h-12 rounded-xl object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 font-black text-sm">
                    #1
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pair #01 Selection
                </div>
                {item1 ? (
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span className="text-xs sm:text-sm font-bold truncate text-white">
                      {item1.shoe.name}
                    </span>
                    <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-black shrink-0">
                      UK {item1.size}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-indigo-400 font-semibold mt-0.5">
                    Click below to choose shoe #1
                  </div>
                )}
              </div>
              {item1 && <Check className="w-5 h-5 text-emerald-400 shrink-0" />}
            </div>

            {/* Slot 2 Selector Button */}
            <div 
              onClick={() => setActiveTab('PAIR_2')}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                activeTab === 'PAIR_2' 
                  ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-400 shadow-md' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="relative shrink-0">
                {item2 ? (
                  <img
                    src={item2.shoe.thumbnail}
                    alt="Pair 02"
                    className="w-12 h-12 rounded-xl object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 font-black text-sm">
                    #2
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pair #02 Selection
                </div>
                {item2 ? (
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span className="text-xs sm:text-sm font-bold truncate text-white">
                      {item2.shoe.name}
                    </span>
                    <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-black shrink-0">
                      UK {item2.size}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-indigo-400 font-semibold mt-0.5">
                    Click below to choose shoe #2
                  </div>
                )}
              </div>
              {item2 && <Check className="w-5 h-5 text-emerald-400 shrink-0" />}
            </div>
          </div>
        </div>

        {/* Brand Filter Chips & Search Bar */}
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {brands.map(b => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBrand(b)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedBrand === b
                    ? 'bg-emerald-500 text-slate-950 font-black border-emerald-400 shadow'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {b === 'ALL' ? `All Shoes (${shoes.length})` : b === 'Nike' ? 'Nike (12)' : 'Puma (11)'}
              </button>
            ))}
          </div>

          {/* Quick search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search shoes by name..."
              className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-700 text-xs focus:outline-none focus:border-emerald-500 bg-slate-950 text-white w-full"
            />
          </div>
        </div>

        {/* Shoes Grid for Selection */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-950">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>
              Now choosing: <strong className="text-white uppercase">{activeTab === 'PAIR_1' ? 'Pair #1' : 'Pair #2'}</strong>
            </span>
            <span className="text-emerald-400 font-bold">Both Pairs for ₹700 Total</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredShoes.map(shoe => {
              const currentSlotItem = activeTab === 'PAIR_1' ? item1 : item2;
              const isSelectedHere = currentSlotItem?.shoe.id === shoe.id;

              return (
                <div
                  key={shoe.id}
                  onClick={() => handleSelectShoeForActiveTab(shoe)}
                  className={`bg-slate-900 rounded-2xl p-3 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelectedHere
                      ? 'border-emerald-500 ring-2 ring-emerald-400/50 shadow-lg'
                      : 'border-slate-800 hover:border-slate-700 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-black">
                      <img
                        src={shoe.thumbnail}
                        alt={shoe.name}
                        className="w-full h-full object-cover"
                      />
                      {shoe.badge && (
                        <span className="absolute top-1.5 left-1.5 bg-black/80 text-emerald-300 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                          {shoe.badge}
                        </span>
                      )}
                      {isSelectedHere && (
                        <div className="absolute inset-0 bg-emerald-950/50 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg">
                            <Check className="w-5 h-5 stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {shoe.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {shoe.brand} &bull; {shoe.rating} ★
                    </p>
                  </div>

                  {/* Size quick pick if selected: Range 6 to 10 */}
                  {isSelectedHere && (
                    <div className="mt-2 pt-2 border-t border-slate-800" onClick={e => e.stopPropagation()}>
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center justify-between">
                        <span>Select Size (6-10):</span>
                        <span className="text-emerald-400">UK {currentSlotItem?.size}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1">
                        {AVAILABLE_SIZES.map(size => {
                          const isCurrentSize = currentSlotItem?.size === size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => {
                                if (activeTab === 'PAIR_1') {
                                  setComboItem1(shoe, size, shoe.colors[0]);
                                } else {
                                  setComboItem2(shoe, size, shoe.colors[0]);
                                }
                              }}
                              className={`py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                                isCurrentSize
                                  ? 'bg-emerald-500 text-slate-950 ring-1 ring-emerald-300'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {!isSelectedHere && (
                    <button
                      type="button"
                      className="mt-2 w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
                    >
                      + Choose This Pair
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Combo Price for 2 Pairs:</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Outfit']">
                ₹700
              </span>
              <span className="text-xs text-slate-500 line-through">₹3,998</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                FREE Delivery Included
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={closeComboBuilder}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold text-xs hover:bg-slate-800 transition-colors w-1/2 sm:w-auto cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (isReady) {
                  navigateToCheckoutCombo();
                } else if (!item1) {
                  setActiveTab('PAIR_1');
                } else {
                  setActiveTab('PAIR_2');
                }
              }}
              disabled={!isReady}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all w-1/2 sm:w-auto shadow-sm cursor-pointer ${
                isReady
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border-transparent'
              }`}
            >
              <span>{isReady ? "Proceed to Address & Pay ₹700" : "Select Both Pairs"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
