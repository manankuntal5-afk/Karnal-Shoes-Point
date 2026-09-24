import React, { useRef, useState, useEffect } from 'react';
import { 
  Heart, Share2, Volume2, VolumeX, Play, Star, ShieldCheck, 
  Sparkles, ShoppingBag, ArrowRight, Zap, Check, Eye
} from 'lucide-react';
import { Shoe } from '../types';
import { useStore } from '../context/StoreContext';

interface ReelsCardProps {
  shoe: Shoe;
  index: number;
}

export const ReelsCard: React.FC<ReelsCardProps> = ({ shoe, index }) => {
  const { 
    navigateToCheckoutSingle, 
    openComboBuilderWithShoe, 
    openReelModal,
    addToCart,
    navigateToShoeDetail
  } = useStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(shoe.reelLikes || 24800 + (index * 730) % 18000);
  const [selectedSize, setSelectedSize] = useState<number>(8);
  const [showShareToast, setShowShareToast] = useState<boolean>(false);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);
  const [isJustAdded, setIsJustAdded] = useState<boolean>(false);

  // Pause video if card scrolls out of view, but NEVER autoplay on scroll (Click-to-play only)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Video play error:", err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${shoe.name} @ ₹389 - Karnal Shoes Point`,
        text: `Watch this video review of ${shoe.name}! Only ₹389 (2 Pairs for ₹700 with Free Delivery).`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  const handleDirectBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateToCheckoutSingle(shoe, selectedSize);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(shoe, selectedSize);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 2000);
  };

  const handleAddToCombo = (e: React.MouseEvent) => {
    e.stopPropagation();
    openComboBuilderWithShoe(shoe);
  };

  return (
    <div 
      ref={containerRef}
      className="group relative w-full aspect-[9/16] max-w-[380px] mx-auto rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/80 shadow-xl shadow-black/40 select-none flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/20"
    >
      {/* 9:16 Background Video Player with Poster fallback */}
      <div 
        className="absolute inset-0 z-0 bg-slate-950 overflow-hidden cursor-pointer"
        onClick={togglePlay}
        title={isPlaying ? "Click to Pause Video" : "Click to Play Video"}
      >
        {!hasVideoError ? (
          <video
            ref={videoRef}
            src={shoe.videoUrl}
            poster={shoe.thumbnail}
            playsInline
            muted={isMuted}
            loop
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setHasVideoError(true)}
            className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img 
            src={shoe.thumbnail} 
            alt={shoe.name}
            className="w-full h-full object-cover object-center"
          />
        )}

        {/* Cinematic Instagram Reels Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/95 pointer-events-none" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 p-3.5 sm:p-4 flex items-center justify-between pointer-events-auto">
        {/* Brand Tag Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-black tracking-wider uppercase font-['Outfit'] text-emerald-300">
            {shoe.brand}
          </span>
          <span className="text-[10px] text-slate-300 font-bold border-l border-white/20 pl-1.5">
            {shoe.category}
          </span>
        </div>

        {/* Sound Toggle Button */}
        <button
          onClick={toggleMute}
          className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all shadow-md cursor-pointer"
          title={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-300" />
          ) : (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          )}
        </button>
      </div>

      {/* Center Play Indicator (Compact icon so customer sees maximum video) */}
      {!isPlaying ? (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer bg-black/15 hover:bg-black/5 transition-all"
          title="Click to Play Video Reel"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-500/85 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform transform active:scale-90 group-hover:scale-110">
            <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
          </div>
        </div>
      ) : null}

      {/* Right Action Rail (Instagram Reels Style) */}
      <div className="absolute right-3 bottom-32 z-20 flex flex-col items-center gap-4">
        {/* Like / Heart Button */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center group/btn active:scale-90 transition-transform cursor-pointer"
        >
          <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg transition-colors ${
            isLiked 
              ? 'bg-rose-500/90 border-rose-400 text-white' 
              : 'bg-black/50 border-white/20 text-white hover:bg-black/70'
          }`}>
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
          </div>
          <span className="text-[11px] font-bold text-white mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {(likeCount / 1000).toFixed(1)}k
          </span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center group/btn active:scale-90 transition-transform cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-black/50 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 shadow-lg">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-white mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Share
          </span>
        </button>

        {/* View Shoe Selling Page Button (User Request: Eye button opens selling page) */}
        <button
          onClick={() => navigateToShoeDetail(shoe, selectedSize)}
          className="flex flex-col items-center group/btn active:scale-90 transition-transform cursor-pointer"
          title={`Open ${shoe.name} Selling Page`}
        >
          <div className="w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-400 border border-emerald-300/60 backdrop-blur-md flex items-center justify-center text-slate-950 shadow-lg transition-transform group-hover/btn:scale-105">
            <Eye className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-black text-emerald-300 mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Details
          </span>
        </button>
      </div>

      {/* Bottom Content & Direct Purchasing Box (Optimized for 99% Mobile Shoppers) */}
      <div className="relative z-10 p-3.5 sm:p-4 space-y-2.5">
        {/* Deal Badge & 9000+ Reviews Proof */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/90 text-slate-950 font-black text-[11px] tracking-wide shadow-sm">
            {shoe.badge || "Trending Deal"}
          </span>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white text-[11px] font-bold">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>4.9</span>
            <span className="text-slate-400">({shoe.totalReviews.toLocaleString()}+ reviews)</span>
          </div>
        </div>

        {/* Shoe Name & Tagline (Clickable to open Selling Page!) */}
        <div 
          onClick={() => navigateToShoeDetail(shoe, selectedSize)}
          className="cursor-pointer group/title"
          title={`Click to open ${shoe.name} Selling Page`}
        >
          <h3 className="text-white group-hover/title:text-emerald-400 font-extrabold text-sm sm:text-base font-['Outfit'] leading-snug line-clamp-2 drop-shadow-md transition-colors flex items-center gap-1.5">
            <span>{shoe.name}</span>
            <span className="text-[10px] text-emerald-400 underline font-normal opacity-85 group-hover/title:opacity-100">(View Page &rarr;)</span>
          </h3>
          <p className="text-slate-300 text-[11px] line-clamp-1 mt-0.5">
            {shoe.tagline}
          </p>
        </div>

        {/* Dynamic Pricing Bar */}
        <div className="flex items-baseline justify-between pt-1 border-t border-white/15">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-['Outfit'] text-emerald-400 drop-shadow-sm">
              ₹{shoe.price}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ₹{shoe.originalPrice}
            </span>
            <span className="text-[11px] font-bold text-amber-400">
              80% OFF
            </span>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
            Combo 2 @ ₹700
          </span>
        </div>

        {/* Quick Size Selector Bar (Mobile Friendly Thumb Buttons) */}
        <div className="flex items-center justify-between gap-1 pt-0.5" onClick={(e) => e.stopPropagation()}>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Size:
          </span>
          <div className="flex items-center gap-1.5 flex-1 justify-end">
            {[6, 7, 8, 9, 10].map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`w-7 h-7 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedSize === sz
                    ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-300 scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons: Add to Cart + Direct Buy + Combo */}
        <div className="space-y-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
          {/* Main Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-black text-xs font-['Outfit'] shadow-lg active:scale-95 transition-all cursor-pointer ${
              isJustAdded
                ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-300'
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 text-slate-950 shadow-emerald-500/20'
            }`}
          >
            {isJustAdded ? (
              <>
                <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 fill-slate-950" />
                <span>Add to Cart (UK {selectedSize})</span>
              </>
            )}
          </button>

          {/* Quick Dual Actions: Buy Single & Combo @ ₹700 */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={handleDirectBuy}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-[11px] font-['Outfit'] active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Buy 1 @ ₹389</span>
            </button>

            <button
              onClick={handleAddToCombo}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-gradient-to-r from-indigo-600/90 to-violet-600/90 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-[11px] font-['Outfit'] border border-indigo-400/40 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Combo @ ₹700</span>
            </button>
          </div>
        </div>
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/90 border border-white/20 text-white text-xs font-bold shadow-2xl animate-fade-in">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};
