import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  darkText?: boolean;
  onClick?: () => void;
}

// Color theme presets for the two lines of the brand name matching logo.svg colors:
// In logo.svg: Leaping shoe is Golden Leather (#f59e0b / #fbbf24) and Monogram is Electric Blue (#38bdf8 / #2563eb)
// Line 1: "KARNAL", Line 2: "SHOES POINT"
const COLOR_THEMES = [
  {
    name: 'Logo Authentic (Gold & Electric Blue)',
    line1Text: 'text-amber-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
    line2Text: 'text-sky-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
    glow: 'hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]'
  },
  {
    name: 'Logo Crisp (Pure White & Gold)',
    line1Text: 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
    line2Text: 'text-amber-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
    glow: 'hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]'
  },
  {
    name: 'Logo Dual Metallic (Electric Cyan & Amber Gold)',
    line1Text: 'text-cyan-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
    line2Text: 'text-amber-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
    glow: 'hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]'
  },
  {
    name: 'Logo Amber & Mint Emerald',
    line1Text: 'text-amber-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
    line2Text: 'text-emerald-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
    glow: 'hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]'
  }
];

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true,
  darkText = false,
  onClick
}) => {
  const [themeIndex, setThemeIndex] = useState<number>(0);

  // Emblem dimensions matching size prop
  const emblemSize = size === 'sm' 
    ? 'w-8 h-8 sm:w-9 sm:h-9' 
    : size === 'lg' 
      ? 'w-12 h-12 sm:w-16 sm:h-16' 
      : 'w-9 h-9 sm:w-11 sm:h-11';

  const line1Size = size === 'sm' 
    ? 'text-[11px] sm:text-xs' 
    : size === 'lg' 
      ? 'text-base sm:text-xl' 
      : 'text-[11px] sm:text-sm';

  const line2Size = size === 'sm' 
    ? 'text-[10px] sm:text-xs' 
    : size === 'lg' 
      ? 'text-sm sm:text-lg' 
      : 'text-[10px] sm:text-xs';

  const currentTheme = COLOR_THEMES[themeIndex];

  const handleClick = (e: React.MouseEvent) => {
    // Cycle color theme on click as requested by user
    setThemeIndex((prev) => (prev + 1) % COLOR_THEMES.length);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`flex items-center gap-2 select-none cursor-pointer group transition-all duration-300 ${currentTheme.glow} ${className}`}
      title="Karnal Shoes Point - Tap to change colors & go Home"
      role="button"
      tabIndex={0}
    >
      {/* Official Circular 3D Emblem (KSP / Leaping Shoe) */}
      <div className={`relative shrink-0 ${emblemSize} rounded-full transition-transform duration-200 group-hover:scale-105 shadow-md`}>
        <img 
          src="/logo.svg" 
          alt="Karnal Shoes Point Logo" 
          className="w-full h-full object-contain rounded-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Website name written in 2 lines:
          Top Line: KARNAL
          Bottom Line: SHOES POINT
          In mobile view, having 2 lines prevents the Cart button from getting squished or hidden! */}
      {showText && (
        <div className="flex flex-col text-left justify-center leading-tight min-w-0">
          {/* Top Line: KARNAL */}
          <span 
            className={`font-black font-['Outfit'] tracking-wider uppercase whitespace-nowrap transition-colors duration-300 ${line1Size} ${currentTheme.line1Text}`}
          >
            KARNAL
          </span>

          {/* Bottom Line: SHOES POINT */}
          <span 
            className={`font-black font-['Outfit'] tracking-wider uppercase whitespace-nowrap transition-colors duration-300 ${line2Size} ${currentTheme.line2Text}`}
          >
            SHOES POINT
          </span>
        </div>
      )}
    </div>
  );
};
