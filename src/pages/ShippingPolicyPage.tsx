import React from 'react';
import { ArrowLeft, Truck, Clock, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ShippingPolicyPage: React.FC = () => {
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
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200 mb-2">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            Express Surface Delivery
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Speedy, safe, and transparent footwear dispatch across all serviceable pin codes in India.
          </p>
        </div>

        {/* Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500 font-bold uppercase">Delivery Charge</div>
            <div className="text-base font-extrabold text-emerald-700 mt-1">100% FREE (₹0)</div>
            <div className="text-[11px] text-slate-500">No hidden handling fees</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500 font-bold uppercase">Estimated Timeline</div>
            <div className="text-base font-extrabold text-[#0f1111] mt-1">4 to 5 Business Days</div>
            <div className="text-[11px] text-slate-500">From order confirmation</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500 font-bold uppercase">Courier Logistics</div>
            <div className="text-base font-extrabold text-[#0f1111] mt-1">BlueDart / Delhivery</div>
            <div className="text-[11px] text-slate-500">Live SMS Tracking enabled</div>
          </div>
        </div>

        {/* Section 1 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111]">
            1. Order Processing &amp; Dispatch Timeline
          </h2>
          <p>
            Every order placed on {storeConfig.storeName} is inspected by our warehouse quality team within 24 hours of online payment verification. Footwear is packed in tamper-evident protective cardboard packaging to prevent transit deformation.
          </p>
          <p>
            Orders are dispatched on business days (Monday to Saturday, excluding national public holidays).
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111]">
            2. Real-Time Tracking &amp; Delivery Updates
          </h2>
          <p>
            Once your package is handed over to our courier partner, you will receive an automated tracking link and AWB number on your registered mobile number and WhatsApp. You can follow your parcel from the fulfillment center directly to your doorstep.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111]">
            3. Doorstep Delivery Protocol
          </h2>
          <p>
            On the day of delivery, the courier delivery executive will call your 10-digit mobile number to confirm availability before arriving at your address. An OTP may be sent to your mobile phone by the courier company to ensure safe handover.
          </p>
          <p>
            If you are not available at your premises during the first delivery attempt, the delivery agent will re-attempt delivery on the following business day.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ShippingPolicyPage;
