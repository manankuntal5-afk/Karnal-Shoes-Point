import React, { useState, useEffect } from 'react';
import { 
  Play, ShoppingBag, Check, Zap
} from 'lucide-react';
import { Shoe } from '../types';
import { useStore } from '../context/StoreContext';

interface CompactShoeVideoCardProps {
  shoe: Shoe;
  index: number;
}

export const CompactShoeVideoCard: React.FC<CompactShoeVideoCardProps> = ({ shoe, index = 0 }) => {
  const { 
    navigateToShoeDetail, 
    navigateToCheckoutSingle, 
    openComboBuilderWithShoe, 
    addToCart 
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<number>(8);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(shoe.thumbnail);

  useEffect(() => {
    setImgSrc(shoe.thumbnail);
  }, [shoe.thumbnail]);

  const handleImageError = () => {
    if (shoe.galleryImages && shoe.galleryImages[1] && shoe.galleryImages[1] !== imgSrc) {
      setImgSrc(shoe.galleryImages[1]);
    } else {
      setImgSrc("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80");
    }
  };

  // User clicked Play Video / Watch Reel or Card top section:
  // Opens the shoe's selling page AND immediately plays the full-screen reel video!
  const handlePlayVideoAndOpenSellingPage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigateToShoeDetail(shoe, selectedSize, undefined, true);
  };

  // User clicked bottom info section: navigates to selling page
  const handleCardClick = () => {
    navigateToShoeDetail(shoe, selectedSize, undefined, false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(shoe, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateToCheckoutSingle(shoe, selectedSize);
  };

  const handleComboAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    openComboBuilderWithShoe(shoe);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative w-full rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col select-none cursor-pointer"
    >
      {/* 
        TOP SECTION: 9:16 REEL PREVIEW THUMBNAIL (No video plays on home page)
        Clicking the Play Button or Image directly opens Selling Page with Full Screen Reel!
      */}
      <div 
        className="relative w-full aspect-[9/13] sm:aspect-[9/14] bg-black overflow-hidden group/thumb cursor-pointer"
        onClick={handlePlayVideoAndOpenSellingPage}
      >
        <img 
          src={imgSrc} 
          alt={shoe.name}
          onError={handleImageError}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={index < 4 ? "high" : "auto"}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Floating Brand Badge */}
        <div className="absolute top-2.5 inset-x-2.5 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase font-['Outfit'] text-emerald-300">
              {shoe.brand}
            </span>
            <span className="text-[9px] text-slate-300 font-bold border-l border-white/20 pl-1">
              4.9★
            </span>
          </div>
        </div>

        {/* Small Center Green Play Icon (Compact so customer can see maximum video) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 hover:bg-black/5 transition-all">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-500/85 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg transition-all transform group-hover/thumb:scale-110 active:scale-95">
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-slate-950 ml-0.5" />
          </div>
        </div>
      </div>

      {/* 
        BOTTOM SECTION: STRICTLY BELOW THE VIDEO
        Shoe Name, Pricing, Shoe Size 6 to 10 in ONE line, and Action Buttons are all cleanly placed below!
      */}
      <div className="p-2.5 sm:p-3 space-y-2 bg-slate-900 border-t border-slate-800 pointer-events-auto">
        {/* Shoe Name & Category */}
        <div>
          <h3 
            className="text-white font-black text-xs sm:text-sm font-['Outfit'] truncate tracking-tight group-hover:text-emerald-300 transition-colors"
            title={shoe.name}
          >
            {shoe.name}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-slate-400 truncate mt-0.5">
            {shoe.tagline}
          </p>
        </div>

        {/* Pricing Bar */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black font-['Outfit'] text-emerald-400">
              ₹{shoe.price}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 line-through">
              ₹{shoe.originalPrice}
            </span>
            <span className="text-[9px] sm:text-[10px] font-black text-amber-400 bg-amber-400/10 px-1 py-0.2 rounded border border-amber-400/20">
              80% OFF
            </span>
          </div>

          <button
            type="button"
            onClick={handleComboAdd}
            className="px-2 py-0.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 text-[9px] sm:text-[10px] font-black transition-colors"
          >
            Combo ₹700
          </button>
        </div>

        {/* 
          SHOE SIZE 6 TO 10 STRICTLY IN 1 SINGLE LINE:
          - Uses flex-nowrap with flex-1 compact buttons
          - Guaranteed to never break into a second line on any screen!
        */}
        <div 
          className="flex items-center gap-1.5 w-full flex-nowrap pt-0.5" 
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase shrink-0 tracking-wider">
            Size:
          </span>
          <div className="flex items-center gap-1 flex-1 flex-nowrap">
            {[6, 7, 8, 9, 10].map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSelectedSize(sz)}
                className={`flex-1 h-5.5 sm:h-6 rounded-md text-[9px] sm:text-[10px] font-black transition-all cursor-pointer flex items-center justify-center ${
                  selectedSize === sz
                    ? 'bg-emerald-500 text-slate-950 font-black ring-1 ring-emerald-300 shadow-sm scale-105'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 hover:text-white'
                }`}
                title={`Select Size UK ${sz}`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 gap-1.5 pt-0.5" onClick={(e) => e.stopPropagation()}>
          {/* Direct Order / Buy Now Button */}
          <button
            type="button"
            onClick={handleBuyNow}
            className="py-1.5 px-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-[10px] sm:text-[11px] font-black flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all cursor-pointer font-['Outfit']"
          >
            <Zap className="w-3 h-3 fill-slate-950 shrink-0" />
            <span>Order ₹389</span>
          </button>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`py-1.5 px-2 rounded-xl text-[10px] sm:text-[11px] font-black flex items-center justify-center gap-1 transition-all cursor-pointer border ${
              isAdded
                ? 'bg-emerald-400 text-slate-950 border-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 active:scale-95'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3 h-3 stroke-[3] shrink-0" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 shrink-0" />
                <span>Add Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
