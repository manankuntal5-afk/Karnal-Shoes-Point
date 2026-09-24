import React, { useState, useRef } from 'react';
import { Play, ZoomIn, Maximize2, ShieldCheck, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Shoe } from '../types';

interface ProductGalleryProps {
  shoe: Shoe;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ shoe }) => {
  // 0 is Video, 1..N are HD photo gallery images
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [isHoveringImage, setIsHoveringImage] = useState<boolean>(false);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const galleryList = [
    { type: 'VIDEO' as const, label: '360° Video', src: shoe.videoUrl, thumb: shoe.thumbnail },
    ...(shoe.galleryImages || [shoe.thumbnail]).map((imgUrl, idx) => {
      const labels = [
        'Hero Front View',
        'Side Air Cushion',
        'Outsole Grip Tread',
        'Top-Down & Insole',
        'Heel Counter',
        'On-Feet Lifestyle'
      ];
      return {
        type: 'PHOTO' as const,
        label: labels[idx] || `Angle ${idx + 1}`,
        src: imgUrl,
        thumb: imgUrl
      };
    })
  ];

  const currentMedia = galleryList[activeMediaIndex] || galleryList[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main Media Display Stage (Amazon Style with Hover Zoom Lens) */}
      <div 
        className="relative bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden aspect-square sm:aspect-[4/3] flex items-center justify-center group select-none"
        onMouseEnter={() => currentMedia.type === 'PHOTO' && setIsHoveringImage(true)}
        onMouseLeave={() => setIsHoveringImage(false)}
        onMouseMove={handleMouseMove}
      >
        {currentMedia.type === 'VIDEO' ? (
          /* HTML5 Video Showcase */
          <div className="relative w-full h-full bg-[#131921] flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={shoe.videoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('reel-1.mp4')) {
                  target.src = '/videos/reel-1.mp4';
                  target.load();
                }
              }}
            />

            {/* Video overlay controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Video Play/Pause & Mute Bar */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
              <button
                onClick={toggleVideoPlay}
                className="px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs border border-white/20 transition-all cursor-pointer shadow-md"
              >
                {isPlaying ? (
                  <>
                    <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span>Playing 360° Video</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#ffd814] fill-[#ffd814]" />
                    <span>Resume Video</span>
                  </>
                )}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-xs border border-white/20 transition-all cursor-pointer shadow-md"
                title={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#ffd814]" />}
              </button>
            </div>

            {/* Top Video Badge */}
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="inline-flex items-center gap-1 bg-[#cc0c39] text-white text-[11px] font-black px-2.5 py-1 rounded-sm shadow-md uppercase tracking-wider">
                🎥 Real Product Video
              </span>
            </div>
          </div>
        ) : (
          /* High-Resolution Photo Viewer with Amazon Hover Magnifier Zoom */
          <div className="relative w-full h-full cursor-crosshair overflow-hidden bg-white flex items-center justify-center">
            {/* Standard Image */}
            <img
              src={currentMedia.src}
              alt={`${shoe.name} - ${currentMedia.label}`}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== shoe.galleryImages[1]) {
                  target.src = shoe.galleryImages[1] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80";
                }
              }}
              className={`w-full h-full object-contain transition-opacity duration-200 ${
                isHoveringImage ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {/* Zoomed Lens Image on Hover (Amazon signature zoom) */}
            {isHoveringImage && (
              <div 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  backgroundImage: `url(${currentMedia.src})`,
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  backgroundSize: '240%',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            )}

            {/* Roll over zoom hint */}
            <div className="absolute top-3 right-3 pointer-events-none bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-300 text-[11px] font-semibold text-slate-700 flex items-center gap-1 shadow-xs">
              <ZoomIn className="w-3.5 h-3.5 text-[#007185]" />
              <span>Hover over photo to zoom</span>
            </div>

            {/* Angle Name Badge */}
            <div className="absolute bottom-3 left-3 pointer-events-none bg-black/70 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
              {currentMedia.label}
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Selector Strip (Amazon signature layout: Main on top, thumbnails below) */}
      <div>
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Click to view video or HD angle photos:</span>
          <span className="text-[#007185] font-semibold">{galleryList.length} media available</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {galleryList.map((item, idx) => {
            const isSelected = activeMediaIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveMediaIndex(idx)}
                className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all p-0.5 bg-white cursor-pointer group ${
                  isSelected 
                    ? 'border-[#e77600] ring-2 ring-[#febd69] shadow-md scale-105 z-10' 
                    : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={item.thumb}
                  alt={item.label}
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Video Play Badge overlay for thumbnail 0 */}
                {item.type === 'VIDEO' && (
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-[#ffd814] text-[#0f1111] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-3 h-3 fill-[#0f1111] ml-0.5" />
                    </div>
                    <span className="text-[9px] font-black text-white uppercase tracking-tight mt-0.5 drop-shadow-md">
                      VIDEO
                    </span>
                  </div>
                )}

                {/* Selected marker pip */}
                {isSelected && (
                  <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#e77600]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
