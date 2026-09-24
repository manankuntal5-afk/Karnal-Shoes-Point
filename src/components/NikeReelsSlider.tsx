import React, { useRef } from 'react';
import { 
  Flame, ChevronLeft, ChevronRight, Play, 
  Sparkles, Star, ShoppingBag, Eye, Heart 
} from 'lucide-react';
import { Shoe } from '../types';
import { useStore } from '../context/StoreContext';

interface NikeReelsSliderProps {
  nikeShoes: Shoe[];
}

export const NikeReelsSlider: React.FC<NikeReelsSliderProps> = ({ nikeShoes }) => {
  const { openReelModal, navigateToCheckoutSingle, openComboBuilderWithShoe, navigateToShoeDetail } = useStore();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Slider Header with Title and Navigation Controls */}
      <div className="flex items-center justify-between px-1">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-rose-600 to-orange-500 flex items-center justify-center shadow-md shadow-rose-500/20">
              <Flame className="w-4 h-4 text-white fill-white" />
            </div>
            <h2 className="text-lg sm:text-2xl font-black font-['Outfit'] text-white tracking-tight flex items-center gap-2">
              <span>Nike - 12 Shoes Video Slider</span>
              <span className="inline-block px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-black">
                12 Video Reels
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Swipe to watch genuine 9:16 vertical video clips of all 12 Nike models. Flat ₹389 / Combo ₹700
          </p>
        </div>

        {/* Prev / Next Slider Arrows */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={scrollLeft}
            aria-label="Previous Slide"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center transition-all cursor-pointer shadow active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Next Slide"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center transition-all cursor-pointer shadow active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Snap Reel Slider Container */}
      <div
        ref={sliderRef}
        className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar snap-x snap-mandatory touch-pan-x"
      >
        {nikeShoes.map((shoe, idx) => {
          return (
            <div
              key={shoe.id}
              className="w-[260px] sm:w-[290px] shrink-0 snap-start rounded-3xl bg-slate-900 border border-slate-800/90 shadow-xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-rose-500/50 hover:shadow-rose-950/30 select-none"
            >
              {/* 9:16 Vertical Instagram Reels Video Container */}
              <div 
                onClick={() => navigateToShoeDetail(shoe, undefined, undefined, true)}
                className="relative aspect-[9/16] w-full bg-black overflow-hidden cursor-pointer group/slideritem"
              >
                {/* Thumbnail Image */}
                <img
                  src={shoe.thumbnail}
                  alt={shoe.name}
                  loading={idx < 3 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={idx < 3 ? "high" : "auto"}
                  className="w-full h-full object-cover group-hover/slideritem:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none" />

                {/* Top Floating Badges */}
                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider shadow">
                    Model {idx + 1} / 12
                  </span>

                  <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-emerald-400 text-[10px] font-black tracking-wide border border-white/20">
                    Reel ⚡
                  </span>
                </div>

                {/* Center Play Button: Clicking opens Full Screen Reel */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 group-hover/slideritem:bg-black/15 transition-all">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 group-hover/slideritem:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/50 transition-transform transform group-hover/slideritem:scale-110 active:scale-95">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                  <div className="mt-2.5 px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-blue-400/40 shadow-xl flex items-center gap-1.5 transition-transform group-hover/slideritem:scale-105">
                    <Play className="w-3 h-3 fill-blue-400 text-blue-400" />
                    <span className="text-blue-400 hover:text-blue-300 underline underline-offset-2 text-xs font-black tracking-wide cursor-pointer drop-shadow-sm">
                      Play Video
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Content & Actions: Placed below the video so shoes are 100% visible */}
              <div className="p-3 bg-slate-900 flex-1 flex flex-col justify-between space-y-2 border-t border-slate-800">
                {/* Shoe Name, Badge, and Tagline (Cleanly below the video!) */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                      {shoe.badge}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-amber-300 font-bold ml-auto">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>4.9★</span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-1.5">
                    <h3 
                      onClick={(e) => { e.stopPropagation(); navigateToShoeDetail(shoe); }}
                      className="text-sm font-black font-['Outfit'] text-white hover:text-emerald-400 truncate leading-snug drop-shadow-sm transition-colors cursor-pointer flex-1"
                      title={shoe.name}
                    >
                      {shoe.name}
                    </h3>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); navigateToShoeDetail(shoe, undefined, undefined, true); }}
                      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline underline-offset-2 text-[11px] font-bold shrink-0 cursor-pointer transition-colors"
                      title="Click to play video"
                    >
                      <Play className="w-2.5 h-2.5 fill-blue-400 text-blue-400" />
                      <span>Play video</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {shoe.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline justify-between pt-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black font-['Outfit'] text-emerald-400">
                      ₹{shoe.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{shoe.originalPrice}
                    </span>
                    <span className="text-[10px] font-black text-amber-400 px-1.5 py-0.2 rounded bg-amber-400/10 border border-amber-400/20">
                      81% OFF
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-400/20">
                    Combo: ₹700
                  </span>
                </div>

                {/* Quick Order Buttons */}
                <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                  <button
                    onClick={() => navigateToCheckoutSingle(shoe, 8)}
                    className="w-full py-2 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black text-xs font-['Outfit'] transition-all shadow cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-slate-950" />
                    <span>Order ₹389</span>
                  </button>

                  <button
                    onClick={() => openComboBuilderWithShoe(shoe)}
                    className="w-full py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs font-['Outfit'] border border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add Combo</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
