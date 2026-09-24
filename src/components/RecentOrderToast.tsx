import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShoppingBag, Sparkles, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface OrderNotification {
  id: string;
  customerName: string;
  city: string;
  itemType: 'SINGLE' | 'COMBO';
  itemTitle: string;
  priceText: string;
  timeAgo: string;
  sizeDetail: string;
}

const SAMPLE_ORDERS: Omit<OrderNotification, 'id'>[] = [
  {
    customerName: 'Rajesh Sharma',
    city: 'Jaipur, Rajasthan',
    itemType: 'SINGLE',
    itemTitle: 'Single Pair Athletic Shoe',
    priceText: '₹389 Paid Online',
    timeAgo: 'Just now',
    sizeDetail: 'Size: UK 8',
  },
  {
    customerName: 'Priya Patel',
    city: 'Ahmedabad, Gujarat',
    itemType: 'COMBO',
    itemTitle: '2-Pairs Combo Mega Pack',
    priceText: '₹700 Paid Online (Saved ₹78)',
    timeAgo: '1 min ago',
    sizeDetail: 'Sizes: UK 7 & UK 8',
  },
  {
    customerName: 'Amit Verma',
    city: 'New Delhi',
    itemType: 'SINGLE',
    itemTitle: 'Single Pair Athletic Shoe',
    priceText: '₹389 Paid Online',
    timeAgo: '2 mins ago',
    sizeDetail: 'Size: UK 9',
  },
  {
    customerName: 'Ananya Singh',
    city: 'Lucknow, Uttar Pradesh',
    itemType: 'COMBO',
    itemTitle: '2-Pairs Combo Mega Pack',
    priceText: '₹700 Paid Online (Saved ₹78)',
    timeAgo: 'Just now',
    sizeDetail: 'Sizes: UK 6 & UK 8',
  },
  {
    customerName: 'Vikram Rathore',
    city: 'Jodhpur, Rajasthan',
    itemType: 'COMBO',
    itemTitle: '2-Pairs Combo Mega Pack',
    priceText: '₹700 Paid Online (Saved ₹78)',
    timeAgo: '3 mins ago',
    sizeDetail: 'Sizes: UK 8 & UK 9',
  },
  {
    customerName: 'Sneha Iyer',
    city: 'Bengaluru, Karnataka',
    itemType: 'SINGLE',
    itemTitle: 'Single Pair Athletic Shoe',
    priceText: '₹389 Paid Online',
    timeAgo: 'Just now',
    sizeDetail: 'Size: UK 7',
  },
  {
    customerName: 'Rahul Joshi',
    city: 'Pune, Maharashtra',
    itemType: 'COMBO',
    itemTitle: '2-Pairs Combo Mega Pack',
    priceText: '₹700 Paid Online (Saved ₹78)',
    timeAgo: '2 mins ago',
    sizeDetail: 'Sizes: UK 8 & UK 10',
  },
  {
    customerName: 'Pooja Gupta',
    city: 'Indore, Madhya Pradesh',
    itemType: 'SINGLE',
    itemTitle: 'Single Pair Athletic Shoe',
    priceText: '₹389 Paid Online',
    timeAgo: 'Just now',
    sizeDetail: 'Size: UK 6',
  },
  {
    customerName: 'Sandeep Choudhary',
    city: 'Sikar, Rajasthan',
    itemType: 'COMBO',
    itemTitle: '2-Pairs Combo Mega Pack',
    priceText: '₹700 Paid Online (Saved ₹78)',
    timeAgo: '4 mins ago',
    sizeDetail: 'Sizes: UK 8 & UK 8',
  },
  {
    customerName: 'Kavita Reddy',
    city: 'Hyderabad, Telangana',
    itemType: 'SINGLE',
    itemTitle: 'Single Pair Athletic Shoe',
    priceText: '₹389 Paid Online',
    timeAgo: 'Just now',
    sizeDetail: 'Size: UK 8',
  },
  {
    customerName: 'Manoj Kumar',
    city: 'Patna, Bihar',
    itemType: 'COMBO',
    itemTitle: '2-Pairs Combo Mega Pack',
    priceText: '₹700 Paid Online (Saved ₹78)',
    timeAgo: '1 min ago',
    sizeDetail: 'Sizes: UK 7 & UK 9',
  },
  {
    customerName: 'Divya Nair',
    city: 'Kochi, Kerala',
    itemType: 'SINGLE',
    itemTitle: 'Single Pair Athletic Shoe',
    priceText: '₹389 Paid Online',
    timeAgo: '3 mins ago',
    sizeDetail: 'Size: UK 7',
  },
];

export const RecentOrderToast: React.FC = () => {
  const { featuredShoe, currentView } = useStore();
  const [currentNotification, setCurrentNotification] = useState<OrderNotification | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only show notifications on HOME view to prevent disturbing checkout
    if (currentView !== 'HOME') {
      setIsVisible(false);
      return;
    }

    let isCancelled = false;
    let hideTimer: NodeJS.Timeout;
    let nextTimer: NodeJS.Timeout;

    const triggerRandomNotification = () => {
      if (isCancelled) return;

      // Select random customer order
      const randomIndex = Math.floor(Math.random() * SAMPLE_ORDERS.length);
      const chosen = SAMPLE_ORDERS[randomIndex];
      
      setCurrentNotification({
        ...chosen,
        id: `${Date.now()}-${Math.random()}`,
      });
      setIsVisible(true);

      // Stay visible for 3.5 seconds
      hideTimer = setTimeout(() => {
        if (!isCancelled) {
          setIsVisible(false);

          // Schedule next notification in 70 to 110 seconds (very occasional and calm)
          const randomDelay = Math.floor(Math.random() * 40000) + 70000;
          nextTimer = setTimeout(triggerRandomNotification, randomDelay);
        }
      }, 3500);
    };

    // First appearance after 35 seconds of browsing the page
    const initialTimer = setTimeout(triggerRandomNotification, 35000);

    return () => {
      isCancelled = true;
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [currentView]);

  if (!currentNotification || !isVisible) return null;

  const isCombo = currentNotification.itemType === 'COMBO';

  return (
    <div 
      id="recent-order-notification-toast"
      className="fixed bottom-20 sm:bottom-24 left-3 sm:left-6 z-40 max-w-xs sm:max-w-sm w-[calc(100vw-24px)] pointer-events-auto animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className={`p-3.5 rounded-2xl shadow-2xl border transition-all ${
        isCombo
          ? 'bg-gradient-to-br from-[#131921] via-[#1a2433] to-[#0d131a] text-white border-[#febd69]/60 ring-1 ring-[#febd69]/30'
          : 'bg-white text-[#0f1111] border-slate-300 ring-1 ring-black/5'
      }`}>
        <div className="flex items-start gap-3">
          {/* Website Logo replacing shoe thumbnail as requested */}
          {/* Brand Logo: Official Karnal Shoes Point Circular Emblem */}
          <div className="relative shrink-0">
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#131921] border-2 border-[#febd69]/60 flex items-center justify-center shadow-md select-none overflow-hidden">
              <img 
                src="/logo.svg" 
                alt="Karnal Shoes Point" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.2 rounded-full ${
                isCombo
                  ? 'bg-[#febd69] text-[#131921]'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {isCombo ? '⚡ Combo Pack Order' : '✓ Verified Order'}
              </span>
              <span className={`text-[10px] ${isCombo ? 'text-slate-300' : 'text-slate-400'}`}>
                {currentNotification.timeAgo}
              </span>
            </div>

            <div className="mt-1 text-xs font-black truncate font-['Outfit']">
              <span className={isCombo ? 'text-[#febd69]' : 'text-[#0f1111]'}>
                {currentNotification.customerName}
              </span>
              <span className={`font-normal text-[11px] ml-1.5 ${isCombo ? 'text-slate-300' : 'text-slate-500'}`}>
                from {currentNotification.city}
              </span>
            </div>

            <div className={`text-[11px] font-bold mt-0.5 truncate ${
              isCombo ? 'text-amber-200' : 'text-slate-700'
            }`}>
              Ordered {currentNotification.itemTitle}
            </div>

            <div className="flex items-center gap-2 mt-1 text-[10px] font-bold">
              <span className={isCombo ? 'text-emerald-400' : 'text-emerald-700'}>
                {currentNotification.priceText}
              </span>
              <span className={isCombo ? 'text-slate-400' : 'text-slate-300'}>&bull;</span>
              <span className={isCombo ? 'text-slate-300' : 'text-slate-500'}>
                {currentNotification.sizeDetail}
              </span>
            </div>
          </div>

          {/* Dismiss Button */}
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className={`p-1 rounded-full hover:bg-black/10 transition-colors cursor-pointer shrink-0 -mt-1 -mr-1 ${
              isCombo ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
            }`}
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
