import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Truck, RotateCcw, HelpCircle, FileText, Info, Flame } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { storeConfig, navigateToHome, navigateToView, currentView, openComboBuilder, setActiveBrand } = useStore();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const container = document.getElementById('app-main-scroll-container');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 select-none">
      {/* Back to top ribbon */}
      <button
        onClick={handleBackToTop}
        className="w-full py-3 bg-slate-900/80 hover:bg-slate-800 text-xs font-bold text-slate-300 text-center tracking-wide transition-colors cursor-pointer border-b border-slate-800"
      >
        Back to top &uarr;
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand & Info */}
          <div className="sm:col-span-2 md:col-span-1 space-y-3">
            <div 
              onClick={() => {
                navigateToHome();
                const container = document.getElementById('app-main-scroll-container');
                if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <img 
                src="/logo.svg" 
                alt="Karnal Shoes Point Logo" 
                className="w-10 h-10 rounded-full object-contain drop-shadow-md group-hover:scale-105 transition-transform" 
              />
              <span className="text-lg font-black font-['Outfit'] text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight whitespace-nowrap">
                Karnal Shoes Point
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              India's premier sneaker destination with 50 video models across 8 leading global footwear brands. Flat ₹389 single pair &amp; ₹700 2-pairs combo with free express shipping.
            </p>
            
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Quality Guaranteed</span>
            </div>
          </div>

          {/* Brand Collections Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Shop By Company
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { name: 'All Shoes (58)', val: 'ALL' },
                { name: 'Nike (12 Models)', val: 'Nike' },
                { name: 'Puma (11 Models)', val: 'Puma' },
                { name: 'Adidas (8 Models)', val: 'Adidas' },
                { name: 'New Balance (6)', val: 'NB' },
                { name: 'Asics (3 Models)', val: 'Asics' },
                { name: 'Other Brands (18)', val: 'Other Brands' },
              ].map(b => (
                <button
                  key={b.val}
                  onClick={() => {
                    setActiveBrand(b.val);
                    handleBackToTop();
                  }}
                  className="text-left text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links & Policies */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateToView('FAQ')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToView('SHIPPING')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Shipping &amp; Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToView('RETURN')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  7 Days Exchange &amp; Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToView('PRIVACY')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToView('CONTACT')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Official Helpline
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${storeConfig.helplinePhone || '+91 98290 87654'}`}
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 98290 87654</span>
              </a>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>help@karnalshoespoint.com</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-[11px] leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>Karnal Shoes Point, Main Market, Sector 13, Karnal, Haryana - 132001</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Karnal Shoes Point. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Fast Express Courier Pan-India</span>
            &bull;
            <span>Safe UPI Payments</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
