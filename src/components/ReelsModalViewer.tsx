import React, { useRef, useState, useEffect } from 'react';
import { 
  X, Heart, Share2, Volume2, VolumeX, ChevronUp, ChevronDown, 
  Star, Zap, Sparkles, Check, ShoppingBag, Play 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { VideoProgressBar } from './VideoProgressBar';

export const ReelsModalViewer: React.FC = () => {
  const { 
    shoes, 
    selectedReelShoe, 
    isReelModalOpen, 
    closeReelModal, 
    openReelModal,
    navigateToCheckoutSingle, 
    openComboBuilderWithShoe,
    addToCart 
  } = useStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<number>(8);
  const [showShareToast, setShowShareToast] = useState<boolean>(false);
  const [isJustAdded, setIsJustAdded] = useState<boolean>(false);

  // Reset playback to paused when shoe changes
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [selectedReelShoe?.id]);

  if (!isReelModalOpen || !selectedReelShoe) return null;

  const currentIndex = shoes.findIndex(s => s.id === selectedReelShoe.id);
  const totalCount = shoes.length;

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % totalCount;
    openReelModal(shoes[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + totalCount) % totalCount;
    openReelModal(shoes[prevIdx]);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${selectedReelShoe.name} @ ₹389`,
        text: `Check out ${selectedReelShoe.name} for ₹389 on Karnal Shoes Point!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  const handleDirectBuy = () => {
    closeReelModal();
    navigateToCheckoutSingle(selectedReelShoe, selectedSize);
  };

  const handleAddToCart = () => {
    addToCart(selectedReelShoe, selectedSize);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 2000);
  };

  const handleAddToCombo = () => {
    closeReelModal();
    openComboBuilderWithShoe(selectedReelShoe);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center select-none animate-fade-in">
      {/* Container simulating Instagram Reel on Mobile */}
      <div className="relative w-full h-full max-w-[440px] max-h-[92vh] sm:rounded-3xl overflow-hidden bg-black flex flex-col justify-between shadow-2xl border border-white/10">
        
        {/* Background Vertical Video */}
        <div className="absolute inset-0 z-0 bg-black cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={selectedReelShoe.videoUrl}
            poster={selectedReelShoe.thumbnail}
            playsInline
            loop
            muted={isMuted}
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onWaiting={(e) => {
              if (isPlaying) {
                e.currentTarget.play().catch(() => {});
              }
            }}
            onCanPlay={(e) => {
              if (isPlaying && e.currentTarget.paused) {
                e.currentTarget.play().catch(() => {});
              }
            }}
            onEnded={(e) => {
              e.currentTarget.currentTime = 0;
              e.currentTarget.play().catch(() => {});
            }}
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/95 pointer-events-none" />

          {/* Center Play Indicator when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[2px]">
              <div className="w-18 h-18 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/50 transition-transform transform active:scale-95">
                <Play className="w-9 h-9 fill-slate-950 ml-1" />
              </div>
              <span className="mt-3 px-3.5 py-1 rounded-full bg-black/80 border border-white/20 text-white text-xs font-bold">
                Click to Play Reel
              </span>
            </div>
          )}
        </div>

        {/* Top Header Bar */}
        <div className="relative z-10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-black font-['Outfit'] tracking-wider uppercase text-emerald-300">
              {selectedReelShoe.brand}
            </span>
            <span className="text-[11px] text-slate-300 font-bold border-l border-white/20 pl-2">
              Reel {currentIndex + 1}/{totalCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={closeReelModal}
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/80 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Vertical Navigation & Action Controls */}
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
          {/* Previous Shoe Reel */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 active:scale-95 cursor-pointer shadow-lg"
            title="Previous Shoe"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          {/* Like Reel */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center active:scale-90 transition-transform cursor-pointer"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg ${
              isLiked ? 'bg-rose-500 border-rose-400 text-white' : 'bg-black/50 border-white/20 text-white'
            }`}>
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : 'text-white'}`} />
            </div>
            <span className="text-[10px] font-bold text-white mt-1">
              {((selectedReelShoe.reelLikes || 24000) / 1000).toFixed(1)}k
            </span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex flex-col items-center active:scale-90 transition-transform cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-black/50 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-white mt-1">Share</span>
          </button>

          {/* Next Shoe Reel */}
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/80 active:scale-95 cursor-pointer shadow-lg"
            title="Next Shoe"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Drawer with Live Progress Line, Direct Size Selector & Checkout */}
        <div className="relative z-10 p-4 space-y-2.5">
          
          {/* LIVE REEL VIDEO PROGRESS LINE (Transparent Glassmorphic Scrubber) */}
          <div className="bg-transparent py-0.5">
            <VideoProgressBar videoRef={videoRef} variant="fullscreen" showTimeLabels={true} />
          </div>

          {/* Shoe Name & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px]">
                {selectedReelShoe.badge || "Special Deal"}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-200">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>4.9</span>
                <span className="text-slate-400">({selectedReelShoe.totalReviews.toLocaleString()}+ verified reviews)</span>
              </div>
            </div>

            <h3 className="text-white font-extrabold text-base font-['Outfit'] drop-shadow-md">
              {selectedReelShoe.name}
            </h3>
            <p className="text-slate-300 text-xs mt-0.5 line-clamp-1">
              {selectedReelShoe.tagline}
            </p>
          </div>

          {/* Price & Promo Banner */}
          <div className="flex items-baseline justify-between py-1 border-t border-white/15">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-['Outfit'] text-emerald-400">
                ₹{selectedReelShoe.price}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{selectedReelShoe.originalPrice}
              </span>
              <span className="text-xs font-bold text-amber-400">
                80% OFF
              </span>
            </div>

            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              Combo 2 @ ₹700
            </span>
          </div>

          {/* Size Selector */}
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-bold text-slate-300">Select UK Size:</span>
            <div className="flex items-center gap-1.5">
              {[6, 7, 8, 9, 10].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`w-8 h-8 rounded-lg text-xs font-black transition-all cursor-pointer ${
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

          {/* Action Buttons: Add to Cart + Buy + Combo */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-black text-xs font-['Outfit'] shadow-lg active:scale-95 transition-all cursor-pointer ${
                isJustAdded
                  ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-300'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 shadow-emerald-500/25'
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

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDirectBuy}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-['Outfit'] border border-slate-700 active:scale-95 transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Buy 1 @ ₹389</span>
              </button>

              <button
                onClick={handleAddToCombo}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs font-['Outfit'] shadow-lg active:scale-95 transition-all cursor-pointer border border-indigo-400/30"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Combo 2 @ ₹700</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showShareToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white text-slate-950 text-xs font-black shadow-2xl">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};
