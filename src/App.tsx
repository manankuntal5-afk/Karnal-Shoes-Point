import React, { Suspense, lazy, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { StoreProvider, useStore } from './context/StoreContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ShoeDetailPage } from './components/ShoeDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderSuccessPage } from './components/OrderSuccessPage';
import { ComboSelectorModal } from './components/ComboSelectorModal';
import { Footer } from './components/Footer';
import { RecentOrderToast } from './components/RecentOrderToast';
import { MobileBottomNav } from './components/MobileBottomNav';

// Code-splitting / Lazy loading for secondary information and policy pages
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const ShippingPolicyPage = lazy(() => import('./pages/ShippingPolicyPage'));
const ReturnPolicyPage = lazy(() => import('./pages/ReturnPolicyPage'));
const PaymentPolicyPage = lazy(() => import('./pages/PaymentPolicyPage'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));

const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center py-16 text-slate-400">
    <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mb-3" />
    <span className="text-xs font-bold text-slate-400 font-['Outfit']">Loading Karnal Shoes Point...</span>
  </div>
);

const AppContent: React.FC = () => {
  const { 
    currentView, 
    selectedShoe, 
    isSelectionComplete, 
    proceedToCheckout, 
    openComboBuilder,
    purchaseMode 
  } = useStore();

  // Scroll to top automatically whenever the view changes (crucial fix for mobile checkout)
  useEffect(() => {
    const resetScroll = () => {
      const container = document.getElementById('app-main-scroll-container');
      if (container) {
        container.scrollTop = 0;
        try {
          container.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        } catch {
          container.scrollTop = 0;
        }
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();
    const t1 = setTimeout(resetScroll, 20);
    const t2 = setTimeout(resetScroll, 80);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentView]);

  return (
    <div className="h-full h-dvh w-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden selection:bg-emerald-500 selection:text-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Modern Navbar */}
      <Navbar />

      {/* Dynamic View Router - Single Inner Scroll Container */}
      <main id="app-main-scroll-container" className="flex-1 overflow-y-auto overflow-x-hidden relative overscroll-y-contain">
        <Suspense fallback={<PageLoadingFallback />}>
          {currentView === 'HOME' && <HomePage />}
          {currentView === 'DETAIL' && selectedShoe && <ShoeDetailPage shoe={selectedShoe} />}
          {currentView === 'CHECKOUT' && <CheckoutPage />}
          {currentView === 'ORDER_SUCCESS' && <OrderSuccessPage />}
          {currentView === 'COMBO_BUILDER' && <HomePage />}

          {/* Lazy Loaded Policy and Information Pages */}
          {currentView === 'ABOUT' && <AboutPage />}
          {currentView === 'PRIVACY' && <PrivacyPolicyPage />}
          {currentView === 'SHIPPING' && <ShippingPolicyPage />}
          {currentView === 'RETURN' && <ReturnPolicyPage />}
          {currentView === 'PAYMENT_POLICY' && <PaymentPolicyPage />}
          {currentView === 'CONTACT' && <ContactUsPage />}
          {currentView === 'FAQ' && <FaqPage />}
        </Suspense>

        {/* Bottom Modern Footer inside scrollable area */}
        <Footer />
      </main>

      {/* Dedicated Mobile Thumb-Friendly Bottom Navigation Bar - Kept intact as requested */}
      <MobileBottomNav />

      {/* 2-Pair Combo Selector Modal */}
      {currentView === 'COMBO_BUILDER' && <ComboSelectorModal />}

      {/* Social Proof Live Order Toast Notifications */}
      <RecentOrderToast />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </ErrorBoundary>
  );
}
