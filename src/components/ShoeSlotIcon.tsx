import React from 'react';

interface ShoeSlotIconProps {
  number: 1 | 2;
  className?: string;
}

export const ShoeSlotIcon: React.FC<ShoeSlotIconProps> = ({ number, className = '' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Sleek Vector Athletic Sneaker Icon */}
      <div className="w-12 h-10 rounded-lg bg-slate-800/90 border border-slate-600 flex items-center justify-center p-1.5 shadow-inner group-hover:border-[#febd69] transition-colors">
        <svg 
          viewBox="0 0 48 32" 
          className="w-full h-full text-slate-300 group-hover:text-[#febd69] transition-colors drop-shadow-xs" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Athletic Sneaker Body */}
          <path 
            d="M44 19 C 40 13, 34 10, 28 8 L 20 4 C 18 3, 15 4, 13 6 L 9 12 C 7 14, 4 16, 2 17 C 0.8 17.5, 0.8 19, 2 19.5 L 6 21 C 13 22, 22 22, 30 22 L 44 21.5 C 46 21.5, 47 20, 46 19 Z" 
            fill="currentColor" 
            opacity="0.85"
          />
          {/* Laces */}
          <path d="M17 9 L 21 11" stroke="#131921" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M21 11 L 25 13" stroke="#131921" strokeWidth="1.5" strokeLinecap="round" />
          {/* Cushion Sole */}
          <path 
            d="M1 21 C 1 21, 10 22, 22 22 C 34 22, 43 21.5, 46 21 C 47 21, 48 22, 46.5 24 C 44 27, 38 29, 25 29 C 12 29, 3 27, 1 24 C 0 22.5, 0 21.5, 1 21 Z" 
            fill="#ffa41c" 
          />
        </svg>
      </div>

      {/* Number Badge (1 or 2) */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#febd69] text-[#131921] flex items-center justify-center font-black text-[10px] shadow-sm ring-1 ring-[#131921]">
        {number}
      </div>
    </div>
  );
};
