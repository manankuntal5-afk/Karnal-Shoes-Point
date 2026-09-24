import React from 'react';
import { ArrowLeft, CreditCard, ShieldCheck, QrCode, Smartphone, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PaymentPolicyPage: React.FC = () => {
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
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% Online UPI Verified
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight">
            Payment Terms &amp; Security Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Transparent online UPI payment system guaranteeing direct factory wholesale prices without Cash-on-Delivery surcharges.
          </p>
        </div>

        {/* 2 Payment Modes Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#131921] text-[#febd69] flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-[#0f1111]">
              Option 01: Dynamic QR Code
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scan the dynamic UPI QR code displayed during checkout with Google Pay, PhonePe, Paytm, or BHIM. The exact payable amount (₹389 or ₹700) is pre-configured.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#131921] text-[#febd69] flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-[#0f1111]">
              Option 02: Merchant UPI ID
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Copy our official merchant ID <strong className="font-mono text-slate-800">{storeConfig.upiId}</strong> into any banking or UPI app and transfer funds directly.
            </p>
          </div>
        </div>

        {/* Why 100% Online Payment */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111]">
            Why Does {storeConfig.storeName} Operate 100% Online?
          </h2>
          <p>
            Standard Cash-on-Delivery (COD) services incur hefty courier surcharge penalties (₹80 - ₹120 per package) and high return refusal rates across India. By eliminating COD overheads and intermediary handling costs, we pass 100% of these savings directly to you, making premium footwear available at just ₹389 per pair and ₹700 for a 2-pair combo.
          </p>
        </div>

        {/* Verification & Proof */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
          <h2 className="text-base sm:text-lg font-extrabold text-[#0f1111]">
            Payment Verification &amp; Invoice Generation
          </h2>
          <p>
            Upon completing your transaction, you can verify your payment status and attach your payment screenshot. Once confirmed, an official sales tax invoice slip is instantly generated and available for PDF download.
          </p>
        </div>
      </div>
    </div>
  );
};
export default PaymentPolicyPage;
