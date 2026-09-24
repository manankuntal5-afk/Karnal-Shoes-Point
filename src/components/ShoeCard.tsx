import React, { useState } from 'react';
import { Star, Zap, ShoppingCart, ArrowRight, ShieldCheck, Check, ShoppingBag, Play } from 'lucide-react';
import { Shoe } from '../types';
import { VideoPlayer } from './VideoPlayer';
import { useStore } from '../context/StoreContext';

interface ShoeCardProps {
  shoe: Shoe;
}

export const ShoeCard: React.FC<ShoeCardProps> = ({ shoe }) => {
  const { 
    navigateToDetail, 
    openComboBuilderWithShoe,
    comboSelection,
    addToCart
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<number>(8);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const isSelectedInCombo1 = comboSelection.item1?.shoe.id === shoe.id;
  const isSelectedInCombo2 = comboSelection.item2?.shoe.id === shoe.id;
  const isSelectedInCombo = isSelectedInCombo1 || isSelectedInCombo2;

  const handleComboAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    openComboBuilderWithShoe(shoe);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(shoe, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div 
      onClick={() => navigateToDetail(shoe)}
      className="group bg-white rounded-xl border border-slate-200 hover:border-[#febd69] hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Video Container */}
      <div className="relative p-2.5 pb-0">
        <VideoPlayer
          videoUrl={shoe.videoUrl}
          thumbnail={shoe.thumbnail}
          title={shoe.name}
          badge={shoe.badge}
          className="aspect-4/3 w-full"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Limited time deal badge */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="bg-[#cc0c39] text-white text-[10px] font-black px-2 py-0.5 rounded-xs uppercase tracking-wider">
              Limited time deal
            </span>
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
              In Stock
            </span>
          </div>

          {/* Shoe Name */}
          <div>
            <h3 className="font-bold text-sm sm:text-base text-[#0f1111] line-clamp-1 group-hover:text-[#c45500] transition-colors leading-snug">
              {shoe.name}
            </h3>
          </div>

          {/* Amazon Star Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(shoe.rating)
                      ? 'fill-[#ffa41c] text-[#ffa41c]'
                      : 'fill-slate-200 text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[#0f1111]">{shoe.rating}</span>
            <span className="text-xs text-[#007185] hover:text-[#c7511f] font-medium">
              ({shoe.totalReviews.toLocaleString()})
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {shoe.tagline}
          </p>

          {/* Sizes available: 5 to 12 with direct sync & navigation */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-[11px] font-bold text-slate-500">Sizes (UK/IND):</span>
            <div className="flex items-center gap-1 flex-wrap justify-end">
              {[5, 6, 7, 8, 9, 10, 11, 12].map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  title={`Select Size UK ${size}`}
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-xs border transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 scale-105 shadow-xs font-extrabold'
                      : 'text-[#0f1111] bg-slate-100 hover:bg-[#febd69] hover:border-[#f08804] border-slate-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-3 mt-3 border-t border-slate-100">
          {/* Price Block */}
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xs font-bold text-[#cc0c39]">-61%</span>
            <span className="text-2xl font-black text-[#0f1111] font-['Outfit']">
              ₹{shoe.price}
            </span>
            <span className="text-xs text-slate-500 line-through">
              M.R.P.: ₹{shoe.originalPrice}
            </span>
          </div>

          <div className="text-[11px] text-slate-600 mb-3 flex items-center gap-1">
            <span className="text-emerald-700 font-bold">FREE Delivery</span>
            <span>&bull;</span>
            <span>Deliver in 4-5 Days</span>
          </div>

          {/* Action Buttons: Add to Cart + Buy + Combo */}
          <div className="space-y-1.5">
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 px-2 text-xs font-black rounded-lg border shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isAdded
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 border-emerald-400'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Add to Cart (UK {selectedSize})</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              {/* Primary Buy Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToDetail(shoe, selectedSize);
                }}
                className="w-full py-1.5 px-2 bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2c200] text-[#0f1111] text-xs font-bold rounded-lg border border-[#fcd200] shadow-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Secondary Combo Button */}
              <button
                onClick={handleComboAdd}
                className={`w-full py-1.5 px-2 text-xs font-bold rounded-lg border shadow-xs flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                  isSelectedInCombo
                    ? 'bg-indigo-600 text-white border-indigo-700'
                    : 'bg-[#ffa41c] hover:bg-[#fa8900] active:bg-[#e67a00] text-[#0f1111] border-[#ff8f00]'
                }`}
              >
                {isSelectedInCombo ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>In Combo</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>+ Combo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
