import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PrivacyPolicyPage: React.FC = () => {
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
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            256-Bit SSL Encrypted
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })} &bull; Applicable to all users of {storeConfig.storeName}
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#febd69]" />
            1. Information We Collect
          </h2>
          <p>
            When you place an order on {storeConfig.storeName}, we collect only the essential details required to fulfill delivery of your footwear:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Customer Full Name for package label identification.</li>
            <li>10-Digit Mobile Number and WhatsApp Number for SMS dispatch notifications, tracking links, and delivery agent coordination.</li>
            <li>Detailed Shipping Postal Address (House number, Street, City, State, and 6-digit Pincode).</li>
            <li>Order payment verification records (transaction reference and uploaded payment proof screenshot).</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#febd69]" />
            2. How We Safeguard Your Information
          </h2>
          <p>
            Your privacy is our utmost priority. We employ industry-grade 256-bit SSL encryption across all customer order submission channels. We strictly never sell, rent, trade, or share your personal contact details with third-party advertising companies or telemarketers.
          </p>
          <p>
            Customer shipping information is shared strictly with trusted licensed courier partners (e.g. BlueDart Express, Delhivery) solely for the logistical purpose of delivering your parcel to your doorstep.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111] flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#febd69]" />
            3. Payment Security &amp; Banking Details
          </h2>
          <p>
            {storeConfig.storeName} conducts payments via official UPI payment channels (Google Pay, PhonePe, Paytm, BHIM, and QR Code). We never store your UPI PIN, banking passwords, debit/credit card CVV numbers, or sensitive financial account credentials on our servers.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#febd69]" />
            4. Customer Rights &amp; Grievance Redressal
          </h2>
          <p>
            You have the right to request access, correction, or deletion of your stored customer records at any time. For any privacy queries or data requests, contact our designated grievance officer at <strong>{storeConfig.email}</strong> or WhatsApp us at <strong>{storeConfig.helplineWhatsapp}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicyPage;
