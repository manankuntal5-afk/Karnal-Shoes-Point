import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FaqPage: React.FC = () => {
  const { navigateToHome, openComboBuilder, storeConfig } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the 2 Pairs for ₹700 Mega Saver Combo offer work?',
      a: 'You can choose 2 pairs of the featured shoe in your preferred sizes and colors. When you bundle 2 pairs, the total cart price is just ₹700 with completely free express delivery across India.'
    },
    {
      q: 'What is the price of a single shoe pair if I do not want the combo?',
      a: 'A single shoe pair is available for a flat price of ₹389 with zero extra delivery fees.'
    },
    {
      q: 'What sizes are available for purchase?',
      a: 'All shoes in our collection are available in Indian/UK standard sizes ranging from UK 5 to UK 12. You can click on any shoe size button to select your size.'
    },
    {
      q: 'How long does delivery take to my address?',
      a: 'All orders are dispatched via premier express surface logistics partners (BlueDart / Delhivery) within 24 hours of payment verification. Typical doorstep delivery takes 4 to 5 business days.'
    },
    {
      q: 'How do I pay for my order?',
      a: 'We accept 100% online UPI payments through any standard banking app including Google Pay, PhonePe, Paytm, and BHIM. You can either scan our dynamic on-screen QR code or copy our official merchant UPI ID. After paying, you can verify your payment and attach your receipt screenshot to confirm your booking.'
    },
    {
      q: 'What if the shoe does not fit? Can I exchange the size?',
      a: 'Yes! We provide a 7-day hassle-free size replacement guarantee. If you need a size exchange, simply message our WhatsApp support desk at ' + storeConfig.helplineWhatsapp + ' with your Order ID, and our team will arrange a free exchange pair.'
    },
    {
      q: 'Will I get an official bill or tax invoice?',
      a: 'Yes, immediately after confirming your payment and booking your order, you can download a complete printable PDF tax invoice featuring your order ID, items list, delivery address, and verification details.'
    }
  ];

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
          <span className="text-xs font-black uppercase tracking-wider text-[#b12704] bg-[#fff8e7] px-2.5 py-1 rounded-sm border border-[#fbd888]">
            Help &amp; Answers
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight mt-3">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Quick answers to common questions regarding shoe sizing, 2-pair combo savings, delivery schedules, and payments.
          </p>
        </div>

        {/* Accordion FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`rounded-xl border transition-colors overflow-hidden ${
                  isOpen ? 'border-[#febd69] bg-slate-50/50' : 'border-slate-200 bg-white'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0f1111] cursor-pointer hover:text-[#007185]"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className={`w-4 h-4 shrink-0 ${isOpen ? 'text-[#b12704]' : 'text-slate-400'}`} />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-500" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-500" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help footer banner */}
        <div className="p-6 rounded-2xl bg-[#131921] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-white">
              Still Have a Question?
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Contact our friendly customer support desk via WhatsApp or phone.
            </p>
          </div>
          <button
            onClick={openComboBuilder}
            className="px-5 py-2.5 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] font-black text-xs border border-[#fcd200] cursor-pointer shrink-0 shadow-xs"
          >
            Explore ₹700 Combo Deal
          </button>
        </div>
      </div>
    </div>
  );
};
export default FaqPage;
