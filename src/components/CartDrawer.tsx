import React from 'react';
import { 
  X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles, 
  Truck, ShieldCheck, Tag, Zap, CheckCircle2, RotateCcw
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateCartQuantity, 
    updateCartItemSize,
    clearCart,
    cartTotalCount,
    cartCombosCount,
    cartSinglesCount,
    cartTotalPrice,
    cartMrpTotal,
    cartComboSavings,
    proceedToCheckoutWithCart,
    openComboBuilder
  } = useStore();

  if (!isCartOpen) return null;

  const isNeedOneMoreForCombo = cartTotalCount % 2 === 1;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in select-none">
      {/* Backdrop */}
      <div 
        onClick={closeCart}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity cursor-pointer"
      />

      {/* Slide-in Drawer Container */}
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col z-10 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white font-['Outfit'] flex items-center gap-2">
                <span>Your Shopping Cart</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {cartTotalCount} {cartTotalCount === 1 ? 'Pair' : 'Pairs'}
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Mix & Match Any Brands &bull; ₹700 Combo Pack
              </p>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Combo Offer Progress Banner */}
        <div className="px-4 py-3 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-950 border-b border-indigo-500/20">
          {cartTotalCount === 0 ? (
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Add any 2 shoes from any brand for flat <strong className="text-emerald-400 font-bold">₹700</strong>!</span>
            </div>
          ) : isNeedOneMoreForCombo ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Add 1 more shoe for Combo Offer!
                </span>
                <span className="text-[10px] text-slate-400">Save ₹78 extra</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                Add any other pair for just <strong className="text-emerald-400 font-bold">₹311</strong> more to complete a 2-Pairs Combo @ <strong className="text-amber-400 font-bold">₹700</strong>!
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {cartCombosCount === 1 ? '🎉 1 Combo Pack Activated (@ ₹700)!' : `🎉 ${cartCombosCount} Combo Packs Activated (@ ₹${cartCombosCount * 700})!`}
                {' '}You saved ₹{cartComboSavings} on combo!
              </span>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-10 h-10 stroke-1" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  Your Cart is Empty
                </h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                  Explore our video reels or brands catalog and add your favorite shoes to cart or combo pack!
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    closeCart();
                    openComboBuilder();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs font-['Outfit'] shadow-lg hover:from-indigo-500 hover:to-violet-500 cursor-pointer"
                >
                  Browse 2-Pairs Combo @ ₹700
                </button>
              </div>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div 
                key={item.cartItemId}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 shadow-md flex gap-3 items-start relative group"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800 relative">
                  <img 
                    src={item.shoe.thumbnail} 
                    alt={item.shoe.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-black text-white">
                    {item.shoe.brand}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                      {item.shoe.brand}
                    </span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="text-[10px] text-slate-400">
                      {item.shoe.category}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-white font-['Outfit'] truncate mt-0.5">
                    {item.shoe.name}
                  </h4>

                  {/* Size Selector */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] text-slate-400 font-semibold">
                      Size:
                    </span>
                    <select
                      value={item.selectedSize}
                      onChange={(e) => updateCartItemSize(item.cartItemId, Number(e.target.value))}
                      className="bg-slate-900 text-emerald-300 font-extrabold text-xs px-2 py-0.5 rounded-lg border border-slate-700 cursor-pointer focus:outline-hidden"
                    >
                      {[6, 7, 8, 9, 10].map(sz => (
                        <option key={sz} value={sz}>UK {sz}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity & Unit Base Price */}
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-900">
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:bg-slate-800 active:scale-95 cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:bg-slate-800 active:scale-95 cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-black text-emerald-400">
                      ₹{item.quantity * 389}
                    </span>
                  </div>
                </div>

                {/* Delete Item Button */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-colors cursor-pointer"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Bill Breakdown */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 space-y-3">
            {/* Calculation Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-400 border-b border-slate-800/80 pb-3">
              <div className="flex items-center justify-between">
                <span>Total Items ({cartTotalCount} pairs)</span>
                <span className="line-through text-slate-500">₹{cartMrpTotal}</span>
              </div>

              {cartCombosCount > 0 && (
                <div className="flex items-center justify-between text-indigo-300 font-semibold">
                  <span>{cartCombosCount} × 2-Pairs Combo (@ ₹700)</span>
                  <span>₹{cartCombosCount * 700}</span>
                </div>
              )}

              {cartSinglesCount > 0 && (
                <div className="flex items-center justify-between text-slate-300">
                  <span>{cartSinglesCount} × Single Shoe (@ ₹389)</span>
                  <span>₹{cartSinglesCount * 389}</span>
                </div>
              )}

              {cartComboSavings > 0 && (
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>Combo Discount Savings</span>
                  <span>- ₹{cartComboSavings}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Express Delivery Across India</span>
                <span className="text-emerald-400 font-bold uppercase">FREE</span>
              </div>
            </div>

            {/* Total Payable */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Total Amount Payable</span>
                <span className="text-2xl font-black text-emerald-400 font-['Outfit']">
                  ₹{cartTotalPrice}
                </span>
              </div>

              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Free Shipping
              </span>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={proceedToCheckoutWithCart}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 text-slate-950 font-black text-sm font-['Outfit'] shadow-xl shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout (₹{cartTotalPrice})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Guarantees */}
            <div className="flex items-center justify-around text-[10px] text-slate-400 pt-1">
              <div className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-emerald-400" />
                <span>3-5 Days Delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-amber-400" />
                <span>7 Days Return</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-indigo-400" />
                <span>Genuine Quality</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
