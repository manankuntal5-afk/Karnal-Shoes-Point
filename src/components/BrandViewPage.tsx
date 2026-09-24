import React from 'react';
import { ArrowLeft, Sparkles, Star, ShieldCheck, Flame, Zap, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CompactShoeVideoCard } from './CompactShoeVideoCard';
import { SHOE_BRANDS } from '../data/shoesData';

interface BrandViewPageProps {
  brandName: string;
}

export const BrandViewPage: React.FC<BrandViewPageProps> = ({ brandName }) => {
  const { shoes, setActiveBrand, openComboBuilder } = useStore();

  const brandInfo = SHOE_BRANDS.find(
    b => b.name.toLowerCase() === brandName.toLowerCase() || b.id.toLowerCase() === brandName.toLowerCase()
  ) || SHOE_BRANDS[0];

  const brandShoes = shoes.filter(s => s.brand.toLowerCase() === brandInfo.name.toLowerCase());

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 select-none">
      {/* Top Back Navigation & Quick Actions */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setActiveBrand('ALL')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold font-['Outfit'] border border-slate-700 transition-all cursor-pointer active:scale-95 shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>&larr; Back to All Shoes (23 Models)</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveBrand(brandInfo.name.toLowerCase() === 'nike' ? 'Puma' : 'Nike')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-bold font-['Outfit'] border border-slate-700 cursor-pointer transition-all"
          >
            <span>View {brandInfo.name.toLowerCase() === 'nike' ? 'Puma (11)' : 'Nike (12)'}</span>
          </button>

          <button
            onClick={openComboBuilder}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-black font-['Outfit'] shadow-lg shadow-indigo-600/30 cursor-pointer border border-indigo-400/40 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Combo 2 Pairs @ ₹700</span>
          </button>
        </div>
      </div>

      {/* Brand Hero Showcase Banner */}
      <div className={`relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r ${brandInfo.bgGradient} bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden`}>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-950 p-2 border-2 border-white/20 shadow-xl shrink-0">
              <img 
                src={brandInfo.logo} 
                alt={brandInfo.name}
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black uppercase tracking-wider">
                  {brandInfo.badge}
                </span>
                <span className="text-xs font-bold text-slate-300">
                  {brandShoes.length} Video Models Available
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black font-['Outfit'] text-white tracking-tight">
                {brandInfo.name} Collection
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {brandInfo.tagline}
              </p>
            </div>
          </div>

          <div className="sm:text-right bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">
              Exclusive Factory Offer
            </span>
            <div className="flex items-baseline gap-1.5 sm:justify-end mt-0.5">
              <span className="text-2xl sm:text-3xl font-black font-['Outfit'] text-emerald-400">
                ₹389
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹1,999
              </span>
              <span className="text-xs font-black text-amber-400">
                81% OFF
              </span>
            </div>
            <span className="text-[11px] font-bold text-indigo-300 block mt-0.5">
              Any 2 Pairs for ₹700 (Combo Deal)
            </span>
          </div>
        </div>
      </div>

      {/* Brand Shoes Video Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg sm:text-xl font-black font-['Outfit'] text-white">
              {brandInfo.name} Video Showcase ({brandShoes.length} Models)
            </h2>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
            Flat ₹389 &bull; Combo 2 @ ₹700
          </span>
        </div>

        {/* Compact Video Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {brandShoes.map((shoe, idx) => (
            <CompactShoeVideoCard key={shoe.id} shoe={shoe} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};
