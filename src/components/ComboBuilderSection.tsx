import React, { useState } from 'react';
import { 
  Sparkles, Check, ArrowRight, RefreshCw, Zap, ShieldCheck, 
  Truck, Star, Tag, Layers, X, Plus, ShoppingBag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Shoe } from '../types';

export const ComboBuilderSection: React.FC = () => {
  const { 
    shoes, 
    comboPair1Shoe, 
    setComboPair1Shoe, 
    comboPair2Shoe, 
    setComboPair2Shoe,
    comboPair1Size,
    setComboPair1Size,
    comboPair2Size,
    setComboPair2Size,
    navigateToCheckoutComboWithPairs,
    addToCart
  } = useStore();

  const [pickingSlot, setPickingSlot] = useState<'PAIR_1' | 'PAIR_2' | null>(null);
  const [filterBrand, setFilterBrand] = useState<string>('ALL');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const activePair1Size = comboPair1Size || 8;
  const activePair2Size = comboPair2Size || 9;

  // Exactly Nike (12) & Puma (11)
  const brands = ['ALL', 'Nike', 'Puma'];

  const filteredShoes = filterBrand === 'ALL' 
    ? shoes 
    : shoes.filter(s => s.brand.toLowerCase() === filterBrand.toLowerCase());

  const handleSelectShoeForSlot = (shoe: Shoe) => {
    if (pickingSlot === 'PAIR_1') {
      setComboPair1Shoe(shoe);
    } else if (pickingSlot === 'PAIR_2') {
      setComboPair2Shoe(shoe);
    }
    setPickingSlot(null);
  };

  const handleOrderCombo = () => {
    if (!comboPair1Size || !comboPair2Size) {
      if (!comboPair1Size) setComboPair1Size(8);
      if (!comboPair2Size) setComboPair2Size(9);
    }
    setErrorMsg('');
    navigateToCheckoutComboWithPairs(
      { shoe: comboPair1Shoe, size: comboPair1Size || 8 },
      { shoe: comboPair2Shoe, size: comboPair2Size || 9 }
    );
  };

  const handleAddComboToCart = () => {
    addToCart(comboPair1Shoe, activePair1Size);
    addToCart(comboPair2Shoe, activePair2Size);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2500);
  };

  return (
    <section id="combo-builder-section" className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 scroll-mt-28 select-none">
      {/* Outer Glow Container */}
      <div className="relative rounded-3xl p-5 sm:p-7 bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-900 border-2 border-indigo-500/30 shadow-2xl shadow-indigo-500/10 overflow-hidden">
        
        {/* Decorative ambient gradients */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Mix & Match Any 2 Nike or Puma Shoes</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white">
            Special 2-Pairs Combo Pack for <span className="text-emerald-400">₹700</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Choose ANY 2 shoes from our 23 models (Nike 12 models + Puma 11 models) for just ₹700 + Free Express Delivery!
          </p>
        </div>

        {/* Side-by-Side Pair Selection Slots */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6">
          
          {/* Pair #1 Slot */}
          <div className="rounded-2xl p-4 bg-slate-800/80 border border-slate-700/80 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[11px] font-black uppercase tracking-wider">
                  Pair #01 Selection
                </span>
                <button
                  type="button"
                  onClick={() => setPickingSlot('PAIR_1')}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Change Model</span>
                </button>
              </div>

              {/* Shoe Preview */}
              <div className="flex gap-3 items-center mt-2">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-white/10 relative">
                  <img 
                    src={comboPair1Shoe.thumbnail} 
                    alt={comboPair1Shoe.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/70 text-[9px] font-bold text-white">
                    {comboPair1Shoe.brand}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-extrabold text-sm font-['Outfit'] truncate">
                    {comboPair1Shoe.name}
                  </h4>
                  <p className="text-slate-400 text-xs truncate mt-0.5">
                    {comboPair1Shoe.tagline}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400" />
                      4.9
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({comboPair1Shoe.totalReviews.toLocaleString()}+ reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Size Selector for Pair #1 */}
              <div className="mt-4 pt-3 border-t border-slate-700">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-300">Select UK Size for Pair #01:</span>
                  <span className="text-xs font-black text-emerald-400">Size {activePair1Size}</span>
                </div>
                <div className="flex gap-2">
                  {[6, 7, 8, 9, 10].map(sz => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setComboPair1Size(sz)}
                      className={`flex-1 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                        activePair1Size === sz
                          ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-300'
                          : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pair #2 Slot */}
          <div className="rounded-2xl p-4 bg-slate-800/80 border border-slate-700/80 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[11px] font-black uppercase tracking-wider">
                  Pair #02 Selection
                </span>
                <button
                  type="button"
                  onClick={() => setPickingSlot('PAIR_2')}
                  className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Change Model</span>
                </button>
              </div>

              {/* Shoe Preview */}
              <div className="flex gap-3 items-center mt-2">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-white/10 relative">
                  <img 
                    src={comboPair2Shoe.thumbnail} 
                    alt={comboPair2Shoe.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/70 text-[9px] font-bold text-white">
                    {comboPair2Shoe.brand}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-extrabold text-sm font-['Outfit'] truncate">
                    {comboPair2Shoe.name}
                  </h4>
                  <p className="text-slate-400 text-xs truncate mt-0.5">
                    {comboPair2Shoe.tagline}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400" />
                      4.9
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({comboPair2Shoe.totalReviews.toLocaleString()}+ reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Size Selector for Pair #2 */}
              <div className="mt-4 pt-3 border-t border-slate-700">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-300">Select UK Size for Pair #02:</span>
                  <span className="text-xs font-black text-emerald-400">Size {activePair2Size}</span>
                </div>
                <div className="flex gap-2">
                  {[6, 7, 8, 9, 10].map(sz => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setComboPair2Size(sz)}
                      className={`flex-1 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                        activePair2Size === sz
                          ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-300'
                          : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Combo Order Summary Bar */}
        <div className="relative z-10 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Combo Price (2 Pairs):
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-['Outfit'] text-emerald-400">
                  ₹700
                </span>
                <span className="text-sm text-slate-400 line-through">
                  ₹3,998
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black">
                  Save ₹78 Extra + FREE Delivery
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAddComboToCart}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-black text-sm font-['Outfit'] border transition-all cursor-pointer ${
                isAddedToCart
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600'
              }`}
            >
              {isAddedToCart ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Combo Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span>Add Combo to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleOrderCombo}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm sm:text-base font-['Outfit'] shadow-xl shadow-emerald-500/30 active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Buy Combo @ ₹700 Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Modal to pick any shoe from 23 shoes for Pair 1 or Pair 2 */}
      {pickingSlot && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in">
          <div className="w-full max-w-2xl max-h-[85vh] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-white font-extrabold text-base font-['Outfit']">
                  Choose Shoe for {pickingSlot === 'PAIR_1' ? 'Pair #01' : 'Pair #02'}
                </h3>
                <p className="text-xs text-slate-400">
                  Pick from 23 models across Nike (12) and Puma (11)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPickingSlot(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Brand Filter Pills inside modal */}
            <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center gap-2">
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mr-1">
                Select Brand:
              </span>
              {brands.map(b => {
                const count = b === 'Nike' ? 12 : b === 'Puma' ? 11 : 23;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setFilterBrand(b)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                      filterBrand === b
                        ? 'bg-emerald-500 text-slate-950 font-black border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <span>{b === 'ALL' ? 'All Shoes' : b}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      filterBrand === b ? 'bg-slate-950 text-emerald-300' : 'bg-slate-900 text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Grid of Shoes */}
            <div className="p-4 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredShoes.map(shoe => (
                <div
                  key={shoe.id}
                  onClick={() => handleSelectShoeForSlot(shoe)}
                  className="rounded-xl p-2 bg-slate-800/70 border border-slate-700 hover:border-emerald-400 hover:bg-slate-800 cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-slate-950 mb-2 relative">
                    <img 
                      src={shoe.thumbnail} 
                      alt={shoe.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-black/70 text-[9px] font-bold text-emerald-300">
                      {shoe.brand}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-xs line-clamp-1">
                      {shoe.name}
                    </h5>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-emerald-400 font-black text-xs">₹389</span>
                      <span className="text-[10px] text-slate-400">⭐ 4.9</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
