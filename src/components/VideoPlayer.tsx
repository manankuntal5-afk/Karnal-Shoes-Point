import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail: string;
  title: string;
  autoPlayOnHover?: boolean;
  className?: string;
  badge?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnail,
  title,
  autoPlayOnHover = false,
  className = "",
  badge
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    setIsLoaded(false);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch {
        // ignore
      }
    }
  }, [videoUrl]);

  const safePlay = useCallback(async () => {
    if (!videoRef.current) return;
    try {
      videoRef.current.muted = isMuted;
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        playPromiseRef.current = promise;
        await promise;
        setIsPlaying(true);
      }
    } catch {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true;
          setIsMuted(true);
          const retryPromise = videoRef.current.play();
          if (retryPromise !== undefined) {
            playPromiseRef.current = retryPromise;
            await retryPromise;
            setIsPlaying(true);
          }
        } catch {
          setIsPlaying(false);
        }
      }
    } finally {
      playPromiseRef.current = null;
    }
  }, [isMuted]);

  const safePause = useCallback(async () => {
    if (!videoRef.current) return;
    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current;
      } catch {
        // ignore
      }
    }
    try {
      videoRef.current.pause();
      setIsPlaying(false);
    } catch {
      // ignore
    }
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isPlaying) {
      safePause();
    } else {
      safePlay();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime || 0;
      const dur = videoRef.current.duration || 1;
      setCurrentTime(current);
      setDuration(dur);
      setProgress((current / dur) * 100);
    }
  };

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      safePlay();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const dur = videoRef.current.duration || 10;
    videoRef.current.currentTime = ratio * dur;
    setCurrentTime(ratio * dur);
    setProgress(ratio * 100);
    if (videoRef.current.paused) {
      safePlay();
    }
  };

  const handleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div 
      className={`relative group overflow-hidden bg-slate-950 rounded-2xl select-none ${className}`}
      onMouseEnter={() => {
        if (autoPlayOnHover) {
          safePlay();
        }
      }}
      onMouseLeave={() => {
        if (autoPlayOnHover) {
          safePause();
        }
      }}
    >
      {/* Video Element with continuous playback */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnail}
        playsInline
        preload="auto"
        muted={isMuted}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => setIsLoaded(true)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
      />

      {/* Transparent Glassmorphism Seekable Progress Bar Line ("Par Darshi") */}
      <div 
        onClick={handleSeek}
        className="absolute bottom-0 left-0 right-0 h-2 bg-white/20 hover:bg-white/30 backdrop-blur-xs z-30 cursor-pointer transition-all"
        title="Click anywhere to seek video"
      >
        <div 
          className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 transition-all duration-75 relative shadow-sm shadow-emerald-400/50"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md ring-1 ring-emerald-300" />
        </div>
      </div>

      {/* Video Overlay Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
        {badge ? (
          <span className="bg-rose-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-md shadow-md uppercase tracking-wider">
            {badge}
          </span>
        ) : (
          <span className="bg-slate-950/80 text-white text-[11px] font-bold px-2 py-0.5 rounded-md border border-slate-700 backdrop-blur-xs">
            Video Clip
          </span>
        )}

        <span className="bg-slate-950/90 text-emerald-400 text-[11px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs border border-emerald-500/40 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          HD 360°
        </span>
      </div>

      {/* Large Center Play Button when paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-slate-950/90 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border-2 border-emerald-400 flex items-center justify-center shadow-xl transform transition-all duration-200 group-hover:scale-110 active:scale-95 z-20 cursor-pointer"
          aria-label={`Play video clip for ${title}`}
        >
          <Play className="w-7 h-7 fill-current ml-1" />
        </button>
      )}

      {/* Interactive Controls Bar */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-20 px-2.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-xs text-white opacity-90 group-hover:opacity-100 transition-opacity border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-1 hover:bg-white/20 rounded transition-colors text-emerald-400 cursor-pointer"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <span className="text-[10px] font-mono text-emerald-400">
            {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : '0:00'}
          </span>
        </div>

        <div className="text-[11px] font-medium tracking-wide text-slate-200 truncate px-2">
          {isPlaying ? `${Math.round(progress)}% Played` : "Click to Play"}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleMute}
            className="p-1 hover:bg-white/20 rounded transition-colors text-slate-300 hover:text-white cursor-pointer"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
          <button
            onClick={handleFullScreen}
            className="p-1 hover:bg-white/20 rounded transition-colors text-slate-300 hover:text-white cursor-pointer"
            title="Full Screen"
          >
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
