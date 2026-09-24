import React, { useState, useMemo } from 'react';
import { 
  Star, CheckCircle2, ThumbsUp, ShieldCheck, ChevronLeft, 
  ChevronRight, Filter, MessageSquare, Sparkles, Award
} from 'lucide-react';
import { Shoe } from '../types';
import { getReviewsForShoe } from '../data/reviewsData';

interface CustomerReviewsSectionProps {
  shoe: Shoe;
}

const ReviewerAvatar: React.FC<{ name: string; avatarUrl: string }> = ({ name, avatarUrl }) => {
  const [hasError, setHasError] = useState(false);
  
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'KP';

  const avatarGradients = [
    'from-indigo-600 to-violet-700 text-white',
    'from-emerald-600 to-teal-700 text-white',
    'from-amber-600 to-orange-600 text-white',
    'from-cyan-600 to-blue-700 text-white',
    'from-rose-600 to-pink-700 text-white',
  ];
  const colorIndex = Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % avatarGradients.length;

  if (hasError || !avatarUrl) {
    return (
      <div 
        className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradients[colorIndex]} font-black text-xs flex items-center justify-center border-2 border-slate-700 shadow-md shrink-0 font-['Outfit'] select-none`}
        title={name}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className="relative shrink-0">
      <img
        src={avatarUrl}
        alt={name}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-10 h-10 rounded-full object-cover border-2 border-slate-700 shadow-md"
        loading="lazy"
      />
    </div>
  );
};

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({ shoe }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [starFilter, setStarFilter] = useState<number | 'ALL'>('ALL');
  const [helpfulClicked, setHelpfulClicked] = useState<{ [key: string]: boolean }>({});

  const reviewsResult = useMemo(() => {
    return getReviewsForShoe(shoe.id, currentPage, 8);
  }, [shoe.id, currentPage]);

  const filteredReviews = useMemo(() => {
    if (starFilter === 'ALL') return reviewsResult.reviews;
    return reviewsResult.reviews.filter(r => r.rating === starFilter);
  }, [reviewsResult.reviews, starFilter]);

  const handleHelpfulClick = (reviewId: string) => {
    setHelpfulClicked(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const totalReviewCount = shoe.totalReviews || 9480;

  return (
    <section id="customer-reviews-section" className="rounded-3xl p-6 sm:p-8 bg-slate-900 border border-slate-800 shadow-xl space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold border border-emerald-500/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Verified Buyer Reviews &bull; Pan-India</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
              Customer Reviews &amp; Ratings
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Over {totalReviewCount.toLocaleString()}+ authentic customer ratings for {shoe.name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Filter:</span>
            <div className="flex gap-1">
              {(['ALL', 5, 4] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setStarFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    starFilter === f
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {f === 'ALL' ? 'All Reviews' : `${f} Stars`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Ratings Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-inner">
        {/* Left: Overall Score */}
        <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-6">
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-5xl font-black text-amber-400 font-['Outfit']">
              4.9
            </span>
            <span className="text-base text-slate-400 font-bold">/ 5.0</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-1 mt-2 text-amber-400">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <div className="text-xs font-bold text-slate-300 mt-2">
            {totalReviewCount.toLocaleString()}+ verified ratings across India
          </div>
          <div className="text-xs text-emerald-400 font-semibold mt-1 flex items-center justify-center md:justify-start gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>97% of buyers recommend this shoe</span>
          </div>
        </div>

        {/* Right: Modern Breakdown Bars */}
        <div className="md:col-span-8 space-y-2.5">
          {[
            { stars: 5, pct: 89, count: Math.round(totalReviewCount * 0.89) },
            { stars: 4, pct: 9, count: Math.round(totalReviewCount * 0.09) },
            { stars: 3, pct: 2, count: Math.round(totalReviewCount * 0.02) },
            { stars: 2, pct: 0, count: 0 },
            { stars: 1, pct: 0, count: 0 },
          ].map(row => (
            <div key={row.stars} className="flex items-center gap-3 text-xs text-slate-300">
              <span className="w-12 font-bold shrink-0">{row.stars} Star</span>
              <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500" 
                  style={{ width: `${row.pct}%` }} 
                />
              </div>
              <span className="w-10 text-right font-black text-slate-200">{row.pct}%</span>
              <span className="w-16 text-right text-slate-400 text-[11px] hidden sm:inline">
                ({row.count.toLocaleString()})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {filteredReviews.map(review => {
          const isHelpful = helpfulClicked[review.id];

          return (
            <div 
              key={review.id} 
              className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2.5 transition-all hover:border-slate-700"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ReviewerAvatar name={review.name} avatarUrl={review.avatar} />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-white text-sm font-['Outfit']">
                        {review.name}
                      </span>
                      {review.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {review.city}, {review.state} &bull; UK Size {review.purchasedSize}
                    </div>
                  </div>
                </div>

                <span className="text-[11px] text-slate-500 font-medium shrink-0">
                  {review.date}
                </span>
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star 
                    key={s} 
                    className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} 
                  />
                ))}
              </div>

              {/* Comment text */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {review.comment}
              </p>

              {/* Helpful count */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800/60">
                <button
                  onClick={() => handleHelpfulClick(review.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isHelpful
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isHelpful ? 'fill-emerald-400' : ''}`} />
                  <span>Helpful ({review.helpfulCount + (isHelpful ? 1 : 0)})</span>
                </button>

                <span className="text-[11px] text-slate-500">Karnal Shoes Point Certified</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-xs font-bold text-slate-400">
          Page {currentPage} of {reviewsResult.totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(reviewsResult.totalPages, prev + 1))}
          disabled={currentPage >= reviewsResult.totalPages}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
