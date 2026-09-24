import React, { useEffect, useState, useRef, useCallback } from 'react';

interface VideoProgressBarProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  variant?: 'inline' | 'fullscreen' | 'compact';
  className?: string;
  showTimeLabels?: boolean;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const VideoProgressBar: React.FC<VideoProgressBarProps> = ({
  videoRef,
  variant = 'inline',
  className = '',
  showTimeLabels = true
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const fillBarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animFrameId: number;

    const updateState = () => {
      if (!video) return;
      const curr = video.currentTime || 0;
      const dur = video.duration || 1;
      const pct = Math.min(100, Math.max(0, (curr / dur) * 100));
      
      setCurrentTime(curr);
      setDuration(dur);
      setProgress(pct);

      if (fillBarRef.current) {
        fillBarRef.current.style.width = `${pct}%`;
      }
    };

    const handleTimeUpdate = () => {
      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(updateState);
    };

    const handleLoadedMetadata = () => {
      updateState();
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handlePlaying = () => {
      setIsBuffering(false);
    };

    const handleStalled = () => {
      // Auto-recover if video gets stalled
      if (video && !video.paused) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('durationchange', handleLoadedMetadata);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('stalled', handleStalled);

    // Initial sync
    updateState();

    return () => {
      cancelAnimationFrame(animFrameId);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('durationchange', handleLoadedMetadata);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('stalled', handleStalled);
    };
  }, [videoRef]);

  const seekToPosition = useCallback((clientX: number) => {
    const video = videoRef.current;
    const bar = progressBarRef.current;
    if (!video || !bar) return;

    const rect = bar.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const dur = video.duration || 10;
    
    video.currentTime = ratio * dur;
    setCurrentTime(ratio * dur);
    const newPct = ratio * 100;
    setProgress(newPct);
    
    if (fillBarRef.current) {
      fillBarRef.current.style.width = `${newPct}%`;
    }

    if (video.paused) {
      video.play().catch(() => {});
    }
  }, [videoRef]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    seekToPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      e.stopPropagation();
      seekToPosition(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      e.stopPropagation();
      isDraggingRef.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  if (variant === 'compact') {
    return (
      <div 
        ref={progressBarRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`relative w-full h-1.5 bg-black/30 backdrop-blur-[2px] cursor-pointer overflow-hidden ${className}`}
        title="Click or drag to seek video"
      >
        <div 
          ref={fillBarRef}
          className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 relative transition-all duration-75 shadow-sm shadow-emerald-400/50"
          style={{ width: `${progress}%` }}
        >
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-md ring-1 ring-emerald-300" />
        </div>
      </div>
    );
  }

  const isFullscreen = variant === 'fullscreen';

  return (
    <div className={`space-y-1 select-none bg-transparent ${className}`}>
      {showTimeLabels && (
        <div className="flex items-center justify-between text-[11px] font-bold text-white px-1">
          {/* Left: Elapsed Time with translucent pill */}
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-emerald-300 font-mono shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{formatTime(currentTime)}</span>
          </span>

          {/* Center: Live percentage badge (semi-transparent, doesn't block video) */}
          <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] text-slate-200 font-bold shadow-sm">
            {isBuffering ? (
              <span className="text-amber-300 animate-pulse">Buffering...</span>
            ) : (
              `${Math.round(progress)}% Played • ${duration > 0 ? `-${formatTime(Math.max(0, duration - currentTime))} left` : 'HD Video'}`
            )}
          </span>

          {/* Right: Total duration */}
          <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-slate-300 font-mono shadow-sm">
            {duration > 0 ? formatTime(duration) : '0:00'}
          </span>
        </div>
      )}

      {/* Transparent Glassmorphism Seekable Line Scrubber ("Par Darshi" / Semi-Transparent) */}
      <div 
        ref={progressBarRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`relative w-full ${isFullscreen ? 'h-2.5' : 'h-2'} bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full overflow-hidden cursor-pointer group shadow-inner border border-white/25 transition-all`}
        title="Click or drag anywhere on this line to seek video"
      >
        <div 
          ref={fillBarRef}
          className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 rounded-full relative shadow-md shadow-emerald-400/60 transition-[width] duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white rounded-full shadow-lg ring-1 ring-emerald-300" />
        </div>
      </div>
    </div>
  );
};
