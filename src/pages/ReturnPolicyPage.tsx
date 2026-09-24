import React from 'react';
import { ArrowLeft, RotateCcw, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ReturnPolicyPage: React.FC = () => {
  const { navigateToHome, storeConfig } = useStore();

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

      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-[#0f1111]">
        {/* Header */}
        <div className="border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#b12704] bg-[#fff8e7] px-2.5 py-1 rounded-sm border border-[#fbd888] mb-2">
            <RotateCcw className="w-3.5 h-3.5 text-[#f08804]" />
            7-Day Replacement Guarantee
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight">
            Return &amp; Size Exchange Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Hassle-free 7 days size replacement and damage claim process for complete peace of mind.
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            1. 7-Day Free Size Exchange
          </h2>
          <p>
            We understand that getting the perfect fit is important when ordering footwear online. If your shoes do not fit comfortably, you can request an exchange for a smaller or larger size (available sizes UK 5 to 12) within <strong>7 days of delivery</strong>.
          </p>
          <p>
            The replacement pair will be dispatched to your doorstep with zero extra shipping charges.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#febd69]" />
            2. Replacement Conditions
          </h2>
          <p>
            To be eligible for a replacement or return, please ensure the footwear adheres to standard hygiene criteria:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>The shoes must be unworn outdoors and in their original, undamaged condition.</li>
            <li>Original shoe packaging, box, tags, and internal tissue wrappers must be intact.</li>
            <li>Exchange request must be raised within 7 calendar days from the date stamped on your courier delivery receipt.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#febd69]" />
            3. Damaged or Defective Items
          </h2>
          <p>
            Every product goes through multi-stage quality control. In the rare event that your product arrives damaged or with a manufacturing defect, simply send a photo or video of the parcel and shoes to our WhatsApp helpline at <strong>{storeConfig.helplineWhatsapp}</strong> within 48 hours of delivery. We will arrange a priority free replacement immediately.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111]">
            4. How to Initiate a Size Exchange
          </h2>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
            <li>Open WhatsApp and message our customer team at <strong>{storeConfig.helplineWhatsapp}</strong>.</li>
            <li>Provide your <strong>Order ID</strong> (found on your official PDF invoice) along with your desired replacement size.</li>
            <li>Our team will verify the request and schedule reverse courier pickup and immediate dispatch of your new size.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
export default ReturnPolicyPage;
