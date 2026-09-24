import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Star, ShoppingCart, Zap, ShieldCheck, Truck, RotateCcw, 
  Ruler, CheckCircle2, AlertCircle, Share2, Play, Pause, Volume2, VolumeX,
  Flame, Award, Sparkles, ChevronRight, Check, X,
  Layers, Activity, Feather, Maximize2, Clock, CreditCard, RefreshCw, HelpCircle
} from 'lucide-react';
import { Shoe } from '../types';
import { CustomerReviewsSection } from './CustomerReviewsSection';
import { useStore } from '../context/StoreContext';
import { VideoProgressBar } from './VideoProgressBar';

interface ShoeDetailPageProps {
  shoe: Shoe;
}

const AVAILABLE_SIZES = [5, 6, 7, 8, 9, 10, 11, 12];

const SIZE_CHART = [
  { size: 5, cm: "23.5 - 24.0 cm", fit: "Narrow / Petite Fit" },
  { size: 6, cm: "24.5 - 25.0 cm", fit: "Standard Indian Fit" },
  { size: 7, cm: "25.5 - 26.0 cm", fit: "Standard Indian Fit" },
  { size: 8, cm: "26.5 - 27.0 cm", fit: "Most Popular Indian Size" },
  { size: 9, cm: "27.5 - 28.0 cm", fit: "Standard Indian Fit" },
  { size: 10, cm: "28.5 - 29.0 cm", fit: "Large Fit" },
  { size: 11, cm: "29.5 - 30.0 cm", fit: "Extra Large Fit" },
  { size: 12, cm: "30.5 - 31.0 cm", fit: "Jumbo Comfort Fit" },
];

// Distinct brand themes per company as requested:
// Nike: Crimson Red
// Puma: Forest Emerald
// Adidas: Royal Cobalt Blue
// NB (New Balance): Hot Fuchsia Pink
// Asics: Sunset Amber Orange
// Other Brands: Electric Violet
export function getBrandSellingTheme(brand: string) {
  const b = brand.toLowerCase();
  if (b.includes('nike')) {
    return {
      name: 'Nike Crimson Theme',
      primaryText: 'text-rose-400',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      accentGradient: 'from-rose-500 via-red-500 to-rose-600',
      borderAccent: 'border-rose-500/40',
      ringColor: 'focus:border-rose-400',
      pillBg: 'bg-rose-500 text-white',
      buttonBg: 'bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 hover:from-rose-400 hover:to-red-500 text-white',
      glow: 'shadow-rose-950/40'
    };
  } else if (b.includes('puma')) {
    return {
      name: 'Puma Emerald Theme',
      primaryText: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      accentGradient: 'from-emerald-500 via-teal-500 to-emerald-600',
      borderAccent: 'border-emerald-500/40',
      ringColor: 'focus:border-emerald-400',
      pillBg: 'bg-emerald-500 text-slate-950',
      buttonBg: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black',
      glow: 'shadow-emerald-950/40'
    };
  } else if (b.includes('adidas')) {
    return {
      name: 'Adidas Cobalt Theme',
      primaryText: 'text-blue-400',
      badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      accentGradient: 'from-blue-500 via-indigo-500 to-blue-600',
      borderAccent: 'border-blue-500/40',
      ringColor: 'focus:border-blue-400',
      pillBg: 'bg-blue-500 text-white',
      buttonBg: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-400 hover:to-indigo-500 text-white',
      glow: 'shadow-blue-950/40'
    };
  } else if (b.includes('nb') || b.includes('new balance')) {
    return {
      name: 'New Balance Fuchsia Theme',
      primaryText: 'text-pink-400',
      badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
      accentGradient: 'from-pink-500 via-fuchsia-500 to-pink-600',
      borderAccent: 'border-pink-500/40',
      ringColor: 'focus:border-pink-400',
      pillBg: 'bg-pink-500 text-white',
      buttonBg: 'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600 hover:from-pink-400 hover:to-fuchsia-500 text-white',
      glow: 'shadow-pink-950/40'
    };
  } else if (b.includes('asics')) {
    return {
      name: 'Asics Amber Theme',
      primaryText: 'text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      accentGradient: 'from-amber-500 via-orange-500 to-amber-600',
      borderAccent: 'border-amber-500/40',
      ringColor: 'focus:border-amber-400',
      pillBg: 'bg-amber-500 text-slate-950',
      buttonBg: 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black',
      glow: 'shadow-amber-950/40'
    };
  } else {
    return {
      name: 'Other Brands Violet Theme',
      primaryText: 'text-purple-400',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      accentGradient: 'from-purple-500 via-violet-500 to-indigo-600',
      borderAccent: 'border-purple-500/40',
      ringColor: 'focus:border-purple-400',
      pillBg: 'bg-purple-500 text-white',
      buttonBg: 'bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-600 hover:from-purple-400 hover:to-violet-500 text-white',
      glow: 'shadow-purple-950/40'
    };
  }
}

export const ShoeDetailPage: React.FC<ShoeDetailPageProps> = ({ shoe }) => {
  const { 
    shoes,
    storeConfig,
    navigateToHome, 
    navigateToCheckoutSingle, 
    navigateToShoeDetail,
    setComboItem1, 
    openComboBuilder,
    addToCart,
    selectedSize,
    setOrderSuccess,
    openWithFullScreenVideo,
    setOpenWithFullScreenVideo
  } = useStore();

  const brandTheme = getBrandSellingTheme(shoe.brand);

  const [currentSize, setCurrentSize] = useState<number>(selectedSize || 8);
  const currentColor = shoe.colors[0] || 'Default';
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [addedToCartToast, setAddedToCartToast] = useState<boolean>(false);
  const [isFullScreenVideoOpen, setIsFullScreenVideoOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullScreenVideoRef = useRef<HTMLVideoElement>(null);

  // Other companies to order from (Strictly Nike and Puma as requested)
  const allCompanyNames = ['Nike', 'Puma'];
  const defaultOther = allCompanyNames.find(c => c.toLowerCase() !== shoe.brand.toLowerCase()) || 'Puma';
  const [activeOtherBrand, setActiveOtherBrand] = useState<string>(defaultOther);

  useEffect(() => {
    if (selectedSize) {
      setCurrentSize(selectedSize);
    }
  }, [selectedSize]);

  // When navigated with full screen video requested (e.g. from home page reel button):
  // Immediately open the mobile full-screen Instagram reel modal!
  useEffect(() => {
    if (openWithFullScreenVideo) {
      setIsFullScreenVideoOpen(true);
      setOpenWithFullScreenVideo(false);
    }
  }, [openWithFullScreenVideo, setOpenWithFullScreenVideo]);

  useEffect(() => {
    // When shoe detail page opens, do NOT autoplay video automatically as requested.
    // Video on selling page will only play if the customer manually taps the play button.
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
    const container = document.getElementById('app-main-scroll-container');
    if (container) {
      container.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [shoe.id, shoe.videoUrl]);

  // Open Full-Screen Video Player
  const openFullScreenVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsFullScreenVideoOpen(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Close Full-Screen Video Player with the Cross (X) button
  const closeFullScreenVideo = () => {
    let syncTime = 0;
    if (fullScreenVideoRef.current) {
      syncTime = fullScreenVideoRef.current.currentTime;
      fullScreenVideoRef.current.pause();
    }
    setIsFullScreenVideoOpen(false);

    if (videoRef.current) {
      videoRef.current.currentTime = syncTime;
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullScreenVideoOpen) {
        closeFullScreenVideo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreenVideoOpen, isMuted]);

  // Autoplay fullscreen video with sound when opened & ensure smooth playback
  useEffect(() => {
    if (isFullScreenVideoOpen && fullScreenVideoRef.current) {
      if (videoRef.current && videoRef.current.currentTime > 0) {
        fullScreenVideoRef.current.currentTime = videoRef.current.currentTime;
      }
      fullScreenVideoRef.current.muted = false;
      setIsMuted(false);
      fullScreenVideoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Fullscreen unmuted autoplay blocked by browser policy, trying muted:", err);
        if (fullScreenVideoRef.current) {
          fullScreenVideoRef.current.muted = true;
          setIsMuted(true);
          fullScreenVideoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      });
    }
  }, [isFullScreenVideoOpen]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.muted = isMuted;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      });
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
    if (fullScreenVideoRef.current) {
      fullScreenVideoRef.current.muted = nextMuted;
    }
    setIsMuted(nextMuted);
  };

  const handleBuyNow = () => {
    navigateToCheckoutSingle(shoe, currentSize, currentColor);
  };

  const handleAddToCart = () => {
    addToCart(shoe, currentSize, currentColor);
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 3000);
  };

  const handleAddToCombo = () => {
    setComboItem1(shoe, currentSize, currentColor);
    openComboBuilder();
  };

  // Filter shoes for the "Order Other Company Shoes" section
  const otherCompanyShoes = shoes.filter(s => {
    if (activeOtherBrand === 'Other Brands' || activeOtherBrand === 'Other') {
      return (s.brand === 'Other Brands' || s.brand === 'Other') && s.id !== shoe.id;
    }
    return s.brand.toLowerCase() === activeOtherBrand.toLowerCase() && s.id !== shoe.id;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 space-y-8 select-none">
      
      {/* Top Header: Breadcrumb & Brand Tag */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={navigateToHome}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/50 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs group"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>&larr; Back to All Shoes</span>
        </button>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${brandTheme.badgeBg}`}>
            {shoe.brand} Collection
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-400">
            Model: <strong className="text-white font-['Outfit']">{shoe.name}</strong>
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: TOP SHOE NAME */}
      {/* ========================================================================= */}
      <div className="text-center sm:text-left space-y-2">
        <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
          <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Limited Factory Deal &bull; 81% OFF
          </span>
          {shoe.badge && (
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {shoe.badge}
            </span>
          )}
          <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full">
            In Stock &bull; Dispatches within 24h
          </span>
        </div>

        {/* Big Premium Shoe Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit']">
          {shoe.name}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {shoe.tagline}
        </p>

        {/* Rating & Social Proof Strip */}
        <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 flex-wrap text-xs">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(shoe.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-800 text-slate-700'
                }`}
              />
            ))}
            <span className="font-black text-amber-300 ml-1 text-sm">{shoe.rating}</span>
          </div>
          <span className="text-slate-600">|</span>
          <a 
            href="#customer-reviews-section" 
            className="font-bold text-emerald-400 hover:text-emerald-300 underline"
          >
            {shoe.totalReviews.toLocaleString()}+ Indian Customer Ratings
          </a>
          <span className="text-slate-600">|</span>
          <span className="text-indigo-300 font-bold">100% Genuine Factory Quality</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: INSTAGRAM REEL VERTICAL VIDEO & SIZING DASHBOARD */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: 9:16 Vertical Instagram Reels Size Video */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* 9:16 Vertical Instagram Reel Video Player */}
          <div 
            className="relative mx-auto max-w-sm sm:max-w-md aspect-[9/16] rounded-3xl overflow-hidden bg-black border-2 border-slate-800 shadow-2xl group cursor-pointer"
            onClick={togglePlay}
            title={isPlaying ? "Click to Pause" : "Click to Play"}
          >
            <video
              ref={videoRef}
              src={shoe.videoUrl}
              poster={shoe.thumbnail}
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onWaiting={(e) => {
                // Buffer loading in background - keep intent to play
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

            {/* Top Floating Video Controls Overlay */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20" onClick={(e) => e.stopPropagation()}>
              {/* Sound Status Pill / Toggle */}
              <button
                type="button"
                onClick={toggleMute}
                className={`px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-black flex items-center gap-1.5 transition-all shadow-lg cursor-pointer border ${
                  isMuted 
                    ? 'bg-amber-500/90 text-slate-950 border-amber-400 animate-bounce' 
                    : 'bg-black/75 text-emerald-400 border-emerald-500/50'
                }`}
                title={isMuted ? "Tap to Turn ON Sound" : "Mute Sound"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-slate-950" />
                    <span>🔊 Turn Sound ON</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <span>🔊 Sound ON</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-black/75 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/90 active:scale-95 transition-all border border-white/20 cursor-pointer shadow-md"
                  title={isPlaying ? "Pause Video" : "Play Video"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={openFullScreenVideo}
                  className="w-9 h-9 rounded-full bg-black/75 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/90 active:scale-95 transition-all border border-white/20 cursor-pointer shadow-md"
                  title="Play Video in Full Screen"
                >
                  <Maximize2 className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>

            {/* Center Play Button: Compact icon so customer sees maximum video */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/15 transition-all hover:bg-black/10 cursor-pointer"
                onClick={togglePlay}
                title="Click to Play Video"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500/85 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform transform active:scale-95 group-hover:scale-110">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950 ml-0.5" />
                </div>
              </div>
            )}

            {/* Bottom Left Reel Badge */}
            <div className="absolute bottom-4 left-3 z-20 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real Live Video &bull; {shoe.name}</span>
            </div>

            {/* Compact Progress Line inside video frame */}
            <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-auto">
              <VideoProgressBar videoRef={videoRef} variant="compact" />
            </div>
          </div>

          {/* Interactive Progress Line Bar with Time Elapsed & Remaining */}
          <div className="max-w-sm sm:max-w-md mx-auto bg-slate-900/90 rounded-2xl p-2.5 border border-slate-800 shadow-md">
            <VideoProgressBar videoRef={videoRef} variant="inline" showTimeLabels={true} />
          </div>

          {/* Quick Action Bar under the video */}
          <div className="flex items-center justify-center gap-2 max-w-sm sm:max-w-md mx-auto">
            <button
              type="button"
              onClick={togglePlay}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />}
              <span>{isPlaying ? 'Pause Video' : 'Play Video'}</span>
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all ${
                isMuted 
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20' 
                  : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isMuted ? 'Unmute Sound' : 'Mute Sound'}</span>
            </button>

            <button
              type="button"
              onClick={openFullScreenVideo}
              className="py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-500/30 transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen</span>
            </button>
          </div>

          {/* Guarantees Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-sm sm:max-w-md mx-auto">
            <div className="bg-slate-900/90 p-2.5 sm:p-3 rounded-2xl border border-slate-800 text-center shadow-xs">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-emerald-400 mb-1" />
              <div className="text-[11px] sm:text-xs font-bold text-white">3-5 Days Delivery</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400">Free Express India</div>
            </div>
            <div className="bg-slate-900/90 p-2.5 sm:p-3 rounded-2xl border border-slate-800 text-center shadow-xs">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-indigo-400 mb-1" />
              <div className="text-[11px] sm:text-xs font-bold text-white">7 Days Exchange</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400">Size Misfit Safe</div>
            </div>
            <div className="bg-slate-900/90 p-2.5 sm:p-3 rounded-2xl border border-slate-800 text-center shadow-xs">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-amber-400 mb-1" />
              <div className="text-[11px] sm:text-xs font-bold text-white">100% Genuine</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400">Exact Same as Video</div>
            </div>
          </div>
        </div>

        {/* Right Column: Size Selection, Combo Add, Add to Cart & On-Page Address */}
        <div className="lg:col-span-6 bg-slate-900 p-5 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          
          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-['Outfit']">
                ₹389
              </span>
              <span className="text-sm text-slate-500 line-through">
                M.R.P.: ₹{shoe.originalPrice || 1999}
              </span>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Save ₹{(shoe.originalPrice || 1999) - 389} (81% OFF)
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1.5 font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>All Taxes &amp; Free Express Courier Included &bull; <strong>100% Safe Online UPI</strong></span>
            </div>
          </div>

          {/* 2-Pair Combo Upsell System */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-indigo-950/70 border border-indigo-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-indigo-300 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Special 2-Pairs Combo: Only ₹700 Total</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Add this {shoe.name} and pick any second pair for <strong>₹700 total</strong> (Save extra ₹78)!
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddToCombo}
              className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white text-xs font-black transition-all cursor-pointer shadow-md active:scale-95 whitespace-nowrap"
            >
              Add to 2-Pairs Combo &rarr;
            </button>
          </div>

          {/* Size Selection System: 5 to 12 Required */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>Select Shoe Size (UK 5 to 12):</span>
                <span className="text-emerald-400 font-black">UK {currentSize} Selected</span>
              </span>
              <button
                type="button"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer underline"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>{showSizeGuide ? "Hide Size Guide" : "Size Guide Chart (5-12)"}</span>
              </button>
            </div>

            {/* 8 Size Buttons: 5, 6, 7, 8, 9, 10, 11, 12 */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {AVAILABLE_SIZES.map(size => {
                const isSelected = currentSize === size;
                const chartItem = SIZE_CHART.find(c => c.size === size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setCurrentSize(size)}
                    className={`py-2 px-1 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center justify-center border ${
                      isSelected
                        ? `${brandTheme.pillBg} border-white shadow-lg scale-105`
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-black">UK {size}</span>
                    <span className={`text-[9px] font-medium ${isSelected ? 'font-bold opacity-90' : 'text-slate-500'}`}>
                      {chartItem ? chartItem.cm.split(' ')[0] + 'cm' : ''}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Size Chart Popup / Dropdown */}
            {showSizeGuide && (
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs animate-fade-in">
                <div className="font-bold text-white mb-2 flex items-center justify-between">
                  <span>Foot Size Measurement Chart (UK/IND 5 to 12):</span>
                  <span className="text-slate-400 text-[11px]">Heel-to-Toe measurement</span>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="py-1">Size</th>
                      <th className="py-1">Length (cm)</th>
                      <th className="py-1">Fit Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-slate-300 font-medium">
                    {SIZE_CHART.map(row => (
                      <tr key={row.size} className={currentSize === row.size ? "bg-emerald-500/10 text-emerald-300 font-bold" : ""}>
                        <td className="py-1">UK {row.size}</td>
                        <td className="py-1">{row.cm}</td>
                        <td className="py-1 text-slate-400">{row.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>


          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            
            {/* Added to cart toast notification */}
            {addedToCartToast && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between gap-2 animate-fade-in">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>"{shoe.name} (UK {currentSize})" added to your Cart!</span>
                </div>
                <span className="text-[11px] text-emerald-200">2-Pairs Combo @ ₹700 ready</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-750 text-white font-extrabold text-sm border border-slate-700 hover:border-slate-600 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 text-emerald-400" />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now Button (Directly opens Checkout page with Address & Shoes below it) */}
              <button
                type="button"
                onClick={handleBuyNow}
                className={`w-full py-3.5 px-4 rounded-2xl ${brandTheme.buttonBg} font-black text-sm sm:text-base font-['Outfit'] shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95`}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now &bull; Pay ₹389</span>
              </button>
            </div>

            {/* ================================================================ */}
            {/* ORDER GUARANTEES & CUSTOMER SERVICE INFORMATION BOX */}
            {/* ================================================================ */}
            <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-700 shadow-2xl space-y-6">
              {/* Box Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] tracking-tight">
                    Order Assurances &amp; Delivery Policies
                  </h3>
                </div>
                <span className="text-xs sm:text-sm font-black text-emerald-300 bg-emerald-500/15 px-3.5 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  100% Trust Guarantee
                </span>
              </div>

              {/* 6 Key Points List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {/* Point 1: All India Free delivery service */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-start gap-4 hover:border-emerald-500/40 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                      <span>All India Free Delivery Service</span>
                      <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 mt-1.5 leading-relaxed">
                      Zero shipping charges to every pin code across India
                    </p>
                  </div>
                </div>

                {/* Point 2: 4-6 days delivery time */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-start gap-4 hover:border-indigo-500/40 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                      <span>4-6 Days Delivery Time</span>
                      <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0" />
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 mt-1.5 leading-relaxed">
                      Fast express courier dispatch with live tracking link
                    </p>
                  </div>
                </div>

                {/* Point 3: Only online payment support */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-start gap-4 hover:border-amber-500/40 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                      <span>Only Online Payment Support</span>
                      <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" />
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 mt-1.5 leading-relaxed">
                      Instant 100% verified UPI payment (GPay, PhonePe, Paytm)
                    </p>
                  </div>
                </div>

                {/* Point 4: 7 Days Money Back Guarantee (PROMINENTLY HIGHLIGHTED AS REQUESTED) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border-2 border-emerald-400/80 shadow-xl shadow-emerald-500/20 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 group">
                  {/* Top mobile header row with icon + badge */}
                  <div className="flex items-center justify-between w-full sm:w-auto">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/25 border border-emerald-400 text-emerald-300 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/30">
                      <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                    </div>
                    <div className="sm:hidden flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black tracking-wider uppercase shadow-sm">
                      <Sparkles className="w-3 h-3 fill-slate-950" />
                      Special Assurance
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-base sm:text-lg font-black text-white font-['Outfit'] flex items-center gap-1.5">
                        <span className="text-emerald-300">7 Days Money Back Guarantee</span>
                        <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
                      </div>
                      <div className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-xs font-black tracking-wider uppercase shadow-sm shrink-0">
                        <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                        Special Assurance
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100/90 font-medium mt-1.5 leading-relaxed">
                      100% full refund directly transferred back to your UPI account with complete peace of mind.
                    </p>
                  </div>
                </div>

                {/* Point 5: 1 time Free size exchange available */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-start gap-4 hover:border-cyan-500/40 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                      <span>1 Time Free Size Exchange</span>
                      <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0" />
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 mt-1.5 leading-relaxed">
                      Wrong size? Hassle-free free exchange with doorstep pickup
                    </p>
                  </div>
                </div>

                {/* Point 6: 5 days return policy no question */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-start gap-4 hover:border-rose-500/40 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <RotateCcw className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base sm:text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                      <span>5 Days Return Policy (No Question)</span>
                      <ChevronRight className="w-4 h-4 text-rose-400 shrink-0" />
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 mt-1.5 leading-relaxed">
                      Easy returns accepted with zero complicated questions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: COMPREHENSIVE SPORTS SHOE MATERIALS & SPECIFICATIONS */}
      {/* ========================================================================= */}
      <section className="rounded-3xl p-5 sm:p-8 bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold border border-emerald-500/20 mb-2">
            <Feather className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sports Footwear Engineering &bull; 100% Genuine Quality</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
            Shoe Construction Materials &amp; Performance Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every athletic model in the Karnal Shoes Point collection is built specifically for athletic durability, running ergonomics, and all-day comfort.
          </p>
        </div>

        {/* 4 Core Construction Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Component 1: Upper Mesh & Aeration */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                  1. Upper Material: 3D Honeycomb Aeromesh
                </h3>
                <span className="text-[10px] text-emerald-400 font-medium">Breathable &bull; Odor Resistant</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Constructed with high-tensile 3D Honeycomb Poly-Yarn knit mesh that provides 360-degree continuous airflow. Keeps your feet cool and dry during intense running, long walks, or hot weather, preventing sweat accumulation and sock odor.
            </p>
          </div>

          {/* Component 2: Midsole Cushioning */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                  2. Midsole: Dual-Density Phylon EVA + Air Cushion
                </h3>
                <span className="text-[10px] text-indigo-400 font-medium">80% Shock Absorption &bull; Energy Rebound</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Equipped with a responsive dual-density Phylon EVA foam midsole and kinetic air cushion capsule. Absorbs sharp ground impact on concrete and asphalt roads, safeguarding your knees, ankles, and heels from fatigue.
            </p>
          </div>

          {/* Component 3: Outsole Rubber Grip */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                  3. Outsole: Vulcanized Anti-Skid Rubber
                </h3>
                <span className="text-[10px] text-amber-400 font-medium">Non-Slip Multi-Surface Traction</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Heavy-duty vulcanized gum-rubber outsole with deep multidirectional traction lugs. Delivers exceptional grip on wet road surfaces, gym rubber mats, bike footpegs, and smooth tiles without skidding or premature tread wear.
            </p>
          </div>

          {/* Component 4: Insole & Blister Protection */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-['Outfit']">
                  4. Insole &amp; Heel: 6mm Ortho-Comfort Memory Foam
                </h3>
                <span className="text-[10px] text-rose-400 font-medium">Anatomical Arch Support &bull; Anti-Blister Collar</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Features a 6mm thick removable orthopedic memory foam insole that molds to the contour of your foot arch. The ankle collar is lined with soft neoprene cushioning to completely prevent shoe bites and heel blisters.
            </p>
          </div>
        </div>

        {/* Quick Technical Specs Table */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3">
            Technical Product Specifications:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Weight</span>
              <strong className="text-white">~310 grams (Ultra Light)</strong>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Shoe Closure</span>
              <strong className="text-white">Reinforced Laces</strong>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Available Sizes</span>
              <strong className="text-emerald-400">UK 5 to 12</strong>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Best Recommended For</span>
              <strong className="text-white">Running, Gym, Daily Wear</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: CUSTOMER REVIEWS & RATINGS (4-5 Stars, 8k - 15k Count, 100% Indian) */}
      {/* ========================================================================= */}
      <CustomerReviewsSection shoe={shoe} />

      {/* ========================================================================= */}
      {/* SECTION 5: ORDER SHOES FROM OTHER COMPANIES (6 Companies - Placed Below Rating) */}
      {/* ========================================================================= */}
      <section className="rounded-3xl p-5 sm:p-7 bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold border border-indigo-500/20 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Multi-Brand Factory Outlet</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] tracking-tight">
              Order Shoes From Other Companies
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Select any company below to explore, pick size, and order directly or build a 2-Pairs Combo @ ₹700!
            </p>
          </div>

          <span className="text-xs font-extrabold text-emerald-400 self-start sm:self-auto bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            Flat ₹389 Each &bull; Any 2 for ₹700
          </span>
        </div>

        {/* Company Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {allCompanyNames.map(comp => (
            <button
              key={comp}
              type="button"
              onClick={() => setActiveOtherBrand(comp)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                activeOtherBrand === comp
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {comp} Shoes
            </button>
          ))}
        </div>

        {/* Grid of Other Company Shoes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {otherCompanyShoes.slice(0, 8).map(otherShoe => (
            <div
              key={otherShoe.id}
              className="rounded-2xl p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-xs"
            >
              <div>
                <div 
                  onClick={() => navigateToShoeDetail(otherShoe)}
                  className="w-full aspect-square rounded-xl overflow-hidden bg-slate-900 mb-2.5 relative cursor-pointer"
                >
                  <img 
                    src={otherShoe.thumbnail} 
                    alt={otherShoe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/75 text-[10px] font-black text-emerald-400 border border-white/10">
                    {otherShoe.brand}
                  </span>
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                    <span>{otherShoe.rating}</span>
                  </div>
                </div>

                <h4 
                  onClick={() => navigateToShoeDetail(otherShoe)}
                  className="text-white font-bold text-xs sm:text-sm line-clamp-1 group-hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {otherShoe.name}
                </h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm sm:text-base font-black text-emerald-400 font-['Outfit']">
                    ₹389
                  </span>
                  <span className="text-[11px] text-slate-500 line-through">
                    ₹{otherShoe.originalPrice || 1999}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => navigateToShoeDetail(otherShoe)}
                  className="flex-1 py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all cursor-pointer text-center"
                >
                  View Page &rarr;
                </button>
                <button
                  type="button"
                  onClick={() => addToCart(otherShoe, 8)}
                  className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 transition-all cursor-pointer"
                  title={`Add ${otherShoe.name} to Cart`}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FULL-SCREEN VIDEO PLAYER OVERLAY (As requested by user) */}
      {/* ========================================================================= */}
      {isFullScreenVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none animate-fadeIn">
          {/* Top Bar with Brand Badge, Audio Control, and the requested Cross (X) Close Button */}
          <div className="absolute top-0 inset-x-0 z-50 p-3 sm:p-5 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/60 to-transparent pointer-events-auto">
            {/* Left: Shoe Name Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-xs sm:text-sm font-black uppercase font-['Outfit']">
                {shoe.brand} &bull; {shoe.name}
              </span>
              <span className="text-[10px] text-amber-300 font-bold border-l border-white/20 pl-1.5">
                ★ 4.9
              </span>
            </div>

            {/* Right: Audio toggle + PROMINENT CROSS (X) BUTTON TO CLOSE FULLSCREEN & CONTINUE ON SELLING PAGE */}
            <div className="flex items-center gap-2">
              {/* Sound Toggle Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (fullScreenVideoRef.current) {
                    const nextMuted = !isMuted;
                    fullScreenVideoRef.current.muted = nextMuted;
                    setIsMuted(nextMuted);
                  }
                }}
                className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/90 active:scale-95 transition-all cursor-pointer shadow-xl"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              {/* CROSS (X) BUTTON TO CLOSE FULLSCREEN (VIDEO KEEPS PLAYING ON SELLING PAGE) */}
              <button
                type="button"
                onClick={closeFullScreenVideo}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm border-2 border-white shadow-2xl transition-all transform active:scale-95 cursor-pointer font-['Outfit']"
                title="Close Full Screen (Keep Video Playing on Page)"
              >
                <X className="w-5 h-5 stroke-[3]" />
                <span>Close (X)</span>
              </button>
            </div>
          </div>

          {/* Full-Screen Video Container (Takes full screen height) */}
          <div 
            className="relative w-full h-full flex items-center justify-center bg-black cursor-pointer"
            onClick={() => {
              if (fullScreenVideoRef.current) {
                if (fullScreenVideoRef.current.paused) {
                  fullScreenVideoRef.current.play();
                  setIsPlaying(true);
                } else {
                  fullScreenVideoRef.current.pause();
                  setIsPlaying(false);
                }
              }
            }}
          >
            <video
              ref={fullScreenVideoRef}
              src={shoe.videoUrl}
              poster={shoe.thumbnail}
              loop
              playsInline
              preload="auto"
              muted={isMuted}
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
              className="w-full h-full max-h-[100dvh] object-contain sm:max-w-md mx-auto"
            />

            {/* Tap to Resume / Play indicator if user taps video to pause */}
            {!isPlaying && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl">
                  <Play className="w-8 h-8 fill-slate-950 ml-1" />
                </div>
                <span className="mt-2 text-white font-bold text-xs bg-black/75 px-3 py-1 rounded-full border border-white/20">
                  Tap to Resume Video
                </span>
              </div>
            )}
          </div>

          {/* Bottom Overlay: Live Video Progress Line, Shoe Info, Size Selector in 1 Line, and Direct Buy Buttons */}
          <div className="absolute bottom-0 inset-x-0 z-40 p-3 sm:p-5 bg-gradient-to-t from-black via-black/95 to-transparent space-y-2.5 pointer-events-auto">
            <div className="max-w-md mx-auto space-y-2.5">
              
              {/* LIVE FULLSCREEN VIDEO PROGRESS LINE (Transparent Glassmorphic Scrubber) */}
              <div className="bg-transparent py-0.5">
                <VideoProgressBar videoRef={fullScreenVideoRef} variant="fullscreen" showTimeLabels={true} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-black text-sm sm:text-base font-['Outfit'] drop-shadow-md">
                    {shoe.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-emerald-400 font-black text-lg sm:text-xl font-['Outfit']">
                      ₹{shoe.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{shoe.originalPrice}
                    </span>
                    <span className="text-[10px] font-black text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                      80% OFF
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                    Free Express Delivery
                  </span>
                </div>
              </div>

              {/* Shoe Size Selector (6 to 10 in 1 line) */}
              <div className="flex items-center gap-1.5 w-full flex-nowrap pt-1">
                <span className="text-[10px] font-bold text-slate-300 uppercase shrink-0">
                  Size:
                </span>
                <div className="flex items-center gap-1 flex-1 flex-nowrap">
                  {[6, 7, 8, 9, 10].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSize(sz);
                      }}
                      className={`flex-1 h-7 rounded-lg text-[10px] font-black transition-all cursor-pointer flex items-center justify-center ${
                        currentSize === sz
                          ? 'bg-emerald-500 text-slate-950 font-black ring-2 ring-emerald-300 scale-105 shadow-md'
                          : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/20'
                      }`}
                      title={`Select Size UK ${sz}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Action Order Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    closeFullScreenVideo();
                    handleBuyNow();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xl active:scale-95 cursor-pointer font-['Outfit']"
                >
                  <Zap className="w-4 h-4 fill-slate-950 shrink-0" />
                  <span>Order ₹389 Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeFullScreenVideo();
                    handleAddToCombo();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xl active:scale-95 cursor-pointer font-['Outfit'] border border-indigo-400/30"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Combo @ ₹700</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
