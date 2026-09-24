import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactUsPage: React.FC = () => {
  const { navigateToHome, storeConfig } = useStore();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    orderId: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            Customer Support
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight mt-3">
            Contact Us
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Have questions about sizes, your order delivery status, or combo deals? We are here to help 7 days a week.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#131921] text-[#febd69] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-[#0f1111]">
              Phone Helpline
            </h3>
            <p className="text-sm font-bold text-[#007185]">
              {storeConfig.helplinePhone}
            </p>
            <p className="text-xs text-slate-500">
              Monday to Saturday: 9:00 AM - 8:00 PM
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#131921] text-[#febd69] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-[#0f1111]">
              WhatsApp Support
            </h3>
            <p className="text-sm font-bold text-emerald-700">
              {storeConfig.helplineWhatsapp}
            </p>
            <p className="text-xs text-slate-500">
              Instant assistance for tracking &amp; size exchange
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#131921] text-[#febd69] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-[#0f1111]">
              Email Desk
            </h3>
            <p className="text-sm font-bold text-[#007185] truncate">
              {storeConfig.email}
            </p>
            <p className="text-xs text-slate-500">
              Official customer queries &amp; invoice support
            </p>
          </div>
        </div>

        {/* Central Fulfillment Office */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[#c45500] shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-slate-700">
            <strong className="block text-[#0f1111] text-sm">Central Fulfillment &amp; Logistics Hub</strong>
            {storeConfig.storeAddress}
          </div>
        </div>

        {/* Send Us a Message Form */}
        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-lg font-bold text-[#0f1111] mb-4">
            Send Us a Direct Inquiry
          </h2>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-900">
                Inquiry Received!
              </h3>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                Thank you for contacting {storeConfig.storeName}. Our support desk will reach out to your mobile number within 2 to 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0f1111] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#f90] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f1111] mb-1">
                  10-Digit Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Mobile number"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#f90] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#0f1111] mb-1">
                  Order ID (Optional - if already placed)
                </label>
                <input
                  type="text"
                  placeholder="e.g. SC-123456"
                  value={formData.orderId}
                  onChange={e => setFormData({ ...formData, orderId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#f90] focus:outline-none font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#0f1111] mb-1">
                  Message / Query Details *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="How can we assist you with sizing, delivery, or orders?"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#f90] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] font-bold text-xs border border-[#fcd200] flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default ContactUsPage;
