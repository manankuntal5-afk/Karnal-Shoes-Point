import React from 'react';
import { ArrowLeft, ShieldCheck, Award, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { navigateToHome, openComboBuilder, storeConfig } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb / Back button */}
      <div className="mb-6">
        <button
          onClick={navigateToHome}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#007185] hover:text-[#c7511f] transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-md border border-slate-300 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Shoes</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
        {/* Header Banner */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-black uppercase tracking-wider text-[#b12704] bg-[#fff8e7] px-2.5 py-1 rounded-sm border border-[#fbd888]">
            About Our Brand
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f1111] font-['Outfit'] mt-3 tracking-tight">
            About {storeConfig.storeName}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            Redefining athletic footwear in India by delivering premium sports sneakers, cushioned runners, and versatile lifestyle shoes directly from factory floors to your doorstep at unbeatable wholesale pricing.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#131921] text-[#febd69] flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-[#0f1111]">
              Uncompromising Quality
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every pair is crafted with lightweight breathable mesh, high-rebound EVA cushioning soles, and reinforced heel cups engineered for Indian road and gym conditions.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#131921] text-[#febd69] flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-[#0f1111]">
              Honest Transparent Pricing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              By eliminating retail middlemen and high distributor margins, we offer our featured pair at flat ₹389 and our mega saver 2-pairs combo pack for only ₹700 with free delivery.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#131921] text-[#febd69] flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-[#0f1111]">
              Customer First Policy
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We stand behind every shoe sold. Enjoy our 7-day hassle-free size replacement guarantee and dedicated WhatsApp customer helpline support for any query.
            </p>
          </div>
        </div>

        {/* Company Mission Story */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f1111]">
            Our Mission &amp; Vision
          </h2>
          <p>
            Founded with the belief that top-tier athletic styling and foot comfort should be accessible to everyone across India, {storeConfig.storeName} has served over 50,000+ satisfied customers nationwide. From morning marathon training to everyday college, gym, and office wear, our curated collection is tested for maximum longevity and comfort.
          </p>
          <p>
            Operating through high-tech centralized logistics hubs in Rajasthan and Haryana, our express surface courier network ensures reliable 4 to 5 business days delivery across all major pin codes in India.
          </p>
        </div>

        {/* CTA Strip */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#131921] to-[#232f3e] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold font-['Outfit'] text-white">
              Ready to Upgrade Your Daily Steps?
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Pick 2 pairs for just ₹700 with zero delivery charges.
            </p>
          </div>
          <div className="flex gap-2.5 shrink-0">
            <button
              onClick={openComboBuilder}
              className="px-5 py-2.5 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] font-black text-xs border border-[#fcd200] cursor-pointer shadow-xs"
            >
              Build 2-Pairs Combo
            </button>
            <button
              onClick={navigateToHome}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 cursor-pointer"
            >
              Browse All Shoes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
