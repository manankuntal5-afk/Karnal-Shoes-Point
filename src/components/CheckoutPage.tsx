import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Copy, Check, 
  Truck, AlertCircle, Loader2, Lock, QrCode, Smartphone,
  RotateCcw, Sparkles, Tag, Upload, Image as ImageIcon,
  Clock, X, HelpCircle, Edit3, MapPin, Zap
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PlacedOrder } from '../types';
import { UpiAppButtons } from './UpiAppButtons';

export const CheckoutPage: React.FC = () => {
  const { 
    selectedShoe, 
    selectedSize, 
    selectedColor,
    isComboCheckout, 
    comboSelection, 
    storeConfig,
    navigateToHome,
    setOrderSuccess,
    cart,
    cartTotalCount,
    cartTotalPrice,
    combosCount,
    singlesCount,
    clearCart,
    removeFromCart
  } = useStore();

  // Mobile Checkout Step: 'ADDRESS' -> 'PAYMENT'
  const [mobileStep, setMobileStep] = useState<'ADDRESS' | 'PAYMENT'>('ADDRESS');

  // Customer shipping details
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('Rajasthan');
  const [pincode, setPincode] = useState<string>('');
  const [alternatePhone, setAlternatePhone] = useState<string>('');

  // Payment Options: 'QR_CODE' | 'UPI_ID' (default 'QR_CODE' so customer immediately sees QR & App buttons)
  const [paymentOption, setPaymentOption] = useState<'QR_CODE' | 'UPI_ID' | null>('QR_CODE');
  const [paymentApp, setPaymentApp] = useState<string>('PhonePe');
  const [hasCopiedUpi, setHasCopiedUpi] = useState<boolean>(false);

  // Payment Verification Flow State:
  const [verificationState, setVerificationState] = useState<'IDLE' | 'FETCHING' | 'FETCH_FAILED'>('IDLE');
  const [fetchCountdown, setFetchCountdown] = useState<number>(15);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotFileName, setScreenshotFileName] = useState<string>('');
  const [isProcessingFinalOrder, setIsProcessingFinalOrder] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCartCheckout = cart.length > 0;

  const totalItemCount = isCartCheckout 
    ? cartTotalCount 
    : (isComboCheckout ? 2 : 1);

  const orderAmount = isCartCheckout
    ? cartTotalPrice
    : (isComboCheckout ? 700 : 389);

  const checkoutItems = isCartCheckout
    ? cart.map(item => ({
        cartItemId: item.cartItemId,
        shoe: item.shoe,
        selectedSize: item.selectedSize,
        selectedColor: item.shoe.colors[0] || 'Default',
        quantity: item.quantity,
        isCartItem: true
      }))
    : isComboCheckout && comboSelection.item1 && comboSelection.item2
    ? [
        {
          cartItemId: 'combo-1',
          shoe: comboSelection.item1.shoe,
          selectedSize: comboSelection.item1.size,
          selectedColor: comboSelection.item1.color,
          quantity: 1,
          isCartItem: false
        },
        {
          cartItemId: 'combo-2',
          shoe: comboSelection.item2.shoe,
          selectedSize: comboSelection.item2.size,
          selectedColor: comboSelection.item2.color,
          quantity: 1,
          isCartItem: false
        }
      ]
    : selectedShoe
    ? [
        {
          cartItemId: 'single-1',
          shoe: selectedShoe,
          selectedSize: selectedSize || 8,
          selectedColor: selectedColor,
          quantity: 1,
          isCartItem: false
        }
      ]
    : [];

  const handleDeleteShoe = (item: any) => {
    if (item.isCartItem && item.cartItemId) {
      removeFromCart(item.cartItemId);
    } else {
      // If customer came via quick-pick single or combo, clearing takes them back to pick
      clearCart();
      navigateToHome();
    }
  };

  // CRITICAL: Guarantees page ALWAYS lands at the very TOP on mobile view when entering checkout or changing steps
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
    const t3 = setTimeout(resetScroll, 200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [mobileStep]);

  // 15-second countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (verificationState === 'FETCHING') {
      if (fetchCountdown > 0) {
        timer = setTimeout(() => {
          setFetchCountdown(prev => prev - 1);
        }, 1000);
      } else {
        setVerificationState('FETCH_FAILED');
      }
    }
    return () => clearTimeout(timer);
  }, [verificationState, fetchCountdown]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(storeConfig.upiId);
    setHasCopiedUpi(true);
    setTimeout(() => setHasCopiedUpi(false), 2500);
  };

  const validateShippingAddress = (): boolean => {
    setFormError('');
    if (checkoutItems.length === 0) {
      setFormError('Your cart is empty. Please select shoes to proceed with checkout.');
      return false;
    }
    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return false;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setFormError('Please enter a valid 10-digit mobile number for delivery updates.');
      return false;
    }
    if (!streetAddress.trim() || streetAddress.trim().length < 8) {
      setFormError('Please enter complete house/flat number, street and area address.');
      return false;
    }
    if (!city.trim()) {
      setFormError('Please enter your city or town name.');
      return false;
    }
    if (!pincode.trim() || pincode.trim().length !== 6) {
      setFormError('Please enter a valid 6-digit postal pincode.');
      return false;
    }
    return true;
  };

  const validateFullCheckout = (): boolean => {
    if (!validateShippingAddress()) return false;
    if (!paymentOption) {
      setFormError('Please select a Payment Option (Option 01: Scan QR Code or Option 02: UPI ID).');
      const el = document.getElementById('checkout-payment-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return false;
    }
    return true;
  };

  // Mobile: User clicks "Proceed to Payment"
  const handleProceedToMobilePayment = () => {
    if (!validateShippingAddress()) {
      const el = document.getElementById('shipping-form-card');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setMobileStep('PAYMENT');
    // Force instant scroll to top on next step
    const container = document.getElementById('app-main-scroll-container');
    if (container) container.scrollTop = 0;
    window.scrollTo(0, 0);
  };

  const handleStartVerification = () => {
    if (!validateFullCheckout()) return;
    setVerificationState('FETCHING');
    setFetchCountdown(15);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFormError('File size is too large. Please upload an image under 10MB.');
        return;
      }
      setScreenshotFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
        setFormError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveScreenshot = () => {
    setScreenshotPreview(null);
    setScreenshotFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmOrder = () => {
    if (!validateFullCheckout()) return;

    if (!screenshotPreview) {
      setFormError('Please upload your payment screenshot to verify payment and generate your order slip.');
      return;
    }

    setIsProcessingFinalOrder(true);

    const newOrder: PlacedOrder = {
      orderId: 'KP-' + Math.floor(100000 + Math.random() * 900000),
      orderTimestamp: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      deliveryDateRange: '3 to 5 Business Days',
      items: checkoutItems,
      isCombo: isComboCheckout || (isCartCheckout && combosCount > 0),
      totalAmount: orderAmount,
      shippingFee: 0,
      customer: {
        fullName: customerName.trim(),
        mobileNumber: phone.trim(),
        whatsappNumber: alternatePhone.trim() || phone.trim(),
        streetAddress: streetAddress.trim(),
        landmark: '',
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim()
      },
      payment: {
        method: paymentOption || 'QR_CODE',
        selectedApp: paymentOption === 'UPI_ID' ? paymentApp : 'UPI QR',
        screenshotUrl: screenshotPreview || undefined,
        verifiedTime: new Date().toLocaleTimeString('en-IN')
      }
    };

    setTimeout(() => {
      setIsProcessingFinalOrder(false);
      if (isCartCheckout) {
        clearCart();
      }
      setOrderSuccess(newOrder);
    }, 1200);
  };

  // Dynamic QR Code URL for exact payment amount
  const qrCodeUrl = storeConfig.customQrUrl || 
    `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
      `upi://pay?pa=${storeConfig.upiId}&pn=${encodeURIComponent(storeConfig.merchantName)}&am=${orderAmount}&cu=INR&tn=KarnalShoes_Order_${orderAmount}`
    )}`;

  // Reusable Payment Section (Used directly on Desktop, and conditionally on Mobile Step 2)
  const renderPaymentSection = () => (
    <div className="rounded-3xl p-5 sm:p-7 bg-slate-900 border border-slate-800 shadow-xl space-y-6" id="checkout-payment-section">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black text-sm flex items-center justify-center shadow-md">
            2
          </span>
          <h2 className="text-lg sm:text-xl font-black text-white font-['Outfit']">
            Secure Payment Options
          </h2>
        </div>
        <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-black px-3 py-1 rounded-full">
          Total: ₹{orderAmount}
        </span>
      </div>

      <p className="text-xs text-slate-300">
        Select one of the payment options below to pay securely via Google Pay, PhonePe, Paytm, or any UPI app:
      </p>

      {/* Payment Options Grid */}
      <div className="space-y-3">
        {/* Option 01: Scan QR Code */}
        <div 
          onClick={() => {
            setPaymentOption(prev => prev === 'QR_CODE' ? null : 'QR_CODE');
            setFormError('');
          }}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            paymentOption === 'QR_CODE'
              ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/20'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                paymentOption === 'QR_CODE' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-800 text-slate-300'
              }`}>
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white font-['Outfit']">
                  Option 01: Scan &amp; Pay via UPI QR Code
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Scan using PhonePe, Google Pay, Paytm, BHIM, or any banking app
                </p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              paymentOption === 'QR_CODE'
                ? 'border-emerald-400 bg-emerald-500'
                : 'border-slate-600'
            }`}>
              {paymentOption === 'QR_CODE' && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
            </div>
          </div>

          {/* QR Code Reveal */}
          {paymentOption === 'QR_CODE' && (
            <div className="mt-5 pt-4 border-t border-slate-800 text-center space-y-4 animate-fade-in">
              <div className="inline-block p-4 rounded-2xl bg-white shadow-2xl border border-slate-300">
                <img 
                  src={qrCodeUrl} 
                  alt="UPI QR Code" 
                  className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain"
                />
                <div className="mt-2 text-slate-900 font-mono text-xs font-bold">
                  {storeConfig.upiId}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-300 block">
                  Amount: <strong className="text-emerald-400 text-base font-black font-['Outfit']">₹{orderAmount}</strong> (Free Express Delivery)
                </span>
                <p className="text-[11px] text-slate-400 mt-1">
                  Open any UPI app &rarr; Click Scan QR &rarr; Pay ₹{orderAmount}
                </p>
              </div>

              {/* Direct UPI App Buttons */}
              <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                <UpiAppButtons 
                  upiId={storeConfig.upiId} 
                  amount={orderAmount} 
                  merchantName={storeConfig.merchantName}
                  selectedApp={paymentApp}
                  onSelectApp={setPaymentApp}
                />
              </div>
            </div>
          )}
        </div>

        {/* Option 02: Pay using UPI ID */}
        <div 
          onClick={() => {
            setPaymentOption(prev => prev === 'UPI_ID' ? null : 'UPI_ID');
            setFormError('');
          }}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            paymentOption === 'UPI_ID'
              ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/20'
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                paymentOption === 'UPI_ID' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-800 text-slate-300'
              }`}>
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white font-['Outfit']">
                  Option 02: Pay by Entering UPI ID
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Copy our official merchant UPI ID and paste in your UPI App
                </p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              paymentOption === 'UPI_ID'
                ? 'border-emerald-400 bg-emerald-500'
                : 'border-slate-600'
            }`}>
              {paymentOption === 'UPI_ID' && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
            </div>
          </div>

          {/* UPI ID Reveal */}
          {paymentOption === 'UPI_ID' && (
            <div className="mt-5 pt-4 border-t border-slate-800 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-700">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Official Merchant UPI ID:
                  </span>
                  <span className="font-mono text-sm sm:text-base font-black text-emerald-400">
                    {storeConfig.upiId}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyUpi();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
                >
                  {hasCopiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{hasCopiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                </button>
              </div>

              {/* Direct UPI App Buttons */}
              <div onClick={(e) => e.stopPropagation()}>
                <UpiAppButtons 
                  upiId={storeConfig.upiId} 
                  amount={orderAmount} 
                  merchantName={storeConfig.merchantName}
                  selectedApp={paymentApp}
                  onSelectApp={setPaymentApp}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Verification Flow & Screenshot Upload */}
      {verificationState === 'IDLE' && (
        <div className="pt-2">
          <button
            onClick={handleStartVerification}
            className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-base font-['Outfit'] shadow-xl shadow-emerald-500/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 fill-slate-950" />
            <span>I Have Paid &bull; Verify Payment (₹{orderAmount})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Verification State 2: 15s Countdown Timer */}
      {verificationState === 'FETCHING' && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/40 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 mx-auto relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-emerald-400 animate-spin" />
            <span className="text-xl font-black text-emerald-400 font-mono">
              {fetchCountdown}s
            </span>
          </div>

          <div>
            <h4 className="text-white font-extrabold text-base font-['Outfit']">
              Connecting to Banking Gateway...
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Verifying your UPI transaction for ₹{orderAmount}. Please wait while we sync with the banking settlement server.
            </p>
          </div>
        </div>
      )}

      {/* Verification State 3: Prompt for Screenshot Upload */}
      {verificationState === 'FETCH_FAILED' && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <h4 className="font-extrabold text-sm font-['Outfit'] text-white">
              Instant Verification: Upload Payment Screenshot
            </h4>
          </div>

          <p className="text-xs text-slate-300">
            Please attach the screenshot of your UPI payment of ₹{orderAmount} from Google Pay, PhonePe, or Paytm to immediately generate your official order slip and tracking code.
          </p>

          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />

          {!screenshotPreview ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-400 bg-slate-900/60 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-900"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-400/30 text-indigo-400 flex items-center justify-center mb-2">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white font-['Outfit']">
                Click to Upload Payment Screenshot
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                Supports JPG, PNG, WebP (Max 10MB)
              </span>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img 
                  src={screenshotPreview} 
                  alt="Payment Screenshot" 
                  className="w-14 h-14 rounded-xl object-cover border border-white/20"
                />
                <div>
                  <span className="text-xs font-black text-white font-['Outfit'] block">
                    Screenshot Attached
                  </span>
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Ready to place order
                  </span>
                </div>
              </div>
              <button
                onClick={handleRemoveScreenshot}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Confirm & Place Order Button */}
          <button
            onClick={handleConfirmOrder}
            disabled={isProcessingFinalOrder}
            className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-base font-['Outfit'] shadow-xl shadow-emerald-500/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessingFinalOrder ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Order Slip...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 fill-slate-950 text-emerald-400" />
                <span>Confirm Order &amp; Generate Slip Now</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Safety Notice */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
        <Lock className="w-3.5 h-3.5 text-emerald-400" />
        <span>256-Bit Bank Grade SSL Encrypted Checkout &bull; 100% Safe</span>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-6 select-none">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={navigateToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">Verified Fast Checkout</span>
        </div>
      </div>

      {/* Mobile Step Indicator (Only visible on small screens) */}
      <div className="md:hidden flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
        <div 
          onClick={() => setMobileStep('ADDRESS')}
          className={`flex items-center gap-2 cursor-pointer ${
            mobileStep === 'ADDRESS' ? 'text-emerald-400 font-black' : 'text-slate-400 font-medium'
          }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            mobileStep === 'ADDRESS' ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
          }`}>
            1
          </span>
          <span className="text-xs font-['Outfit']">Delivery Address</span>
        </div>

        <ArrowRight className="w-4 h-4 text-slate-600" />

        <div 
          onClick={() => {
            if (validateShippingAddress()) setMobileStep('PAYMENT');
          }}
          className={`flex items-center gap-2 cursor-pointer ${
            mobileStep === 'PAYMENT' ? 'text-emerald-400 font-black' : 'text-slate-400 font-medium'
          }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            mobileStep === 'PAYMENT' ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300'
          }`}>
            2
          </span>
          <span className="text-xs font-['Outfit']">UPI Payment</span>
        </div>
      </div>

      {/* Form Error Banner */}
      {formError && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Address on Mobile Step 1 / Always on Desktop) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Address Step Form */}
          {(mobileStep === 'ADDRESS' || window.innerWidth >= 1024) && (
            <div id="shipping-form-card" className="rounded-3xl p-5 sm:p-7 bg-slate-900 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                    1
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-white font-['Outfit']">
                    Delivery Address
                  </h2>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  Free Express Delivery
                </span>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Customer Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-hidden transition-all"
                  />
                </div>

                {/* Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Mobile Number (For Courier SMS) *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Alternate / WhatsApp Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={alternatePhone}
                      onChange={(e) => setAlternatePhone(e.target.value)}
                      placeholder="Alternate phone number"
                      maxLength={10}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Complete House / Flat / Street Address *
                  </label>
                  <textarea
                    rows={2}
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="House/Flat number, Road, Colony, Landmark"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-hidden transition-all resize-none"
                  />
                </div>

                {/* City, State, Pincode */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Karnal"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Haryana"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="6-digit pincode"
                      maxLength={6}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-emerald-400 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Selected Shoes in Cart & Cross Delete Button: Placed directly below Address as requested */}
                <div className="pt-4 mt-2 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <h4 className="text-xs sm:text-sm font-black text-white font-['Outfit'] uppercase tracking-wider">
                        Selected Shoes in Cart ({checkoutItems.length} {checkoutItems.length === 1 ? 'Pair' : 'Pairs'})
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Tap <strong className="text-rose-400 font-bold">✕ Button</strong> to Remove
                    </span>
                  </div>

                  {checkoutItems.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-dashed border-slate-700 text-center space-y-2">
                      <p className="text-xs text-slate-300 font-medium">
                        Your cart is currently empty
                      </p>
                      <button
                        type="button"
                        onClick={navigateToHome}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs hover:from-emerald-400 hover:to-teal-400 transition-all cursor-pointer shadow-md"
                      >
                        <span>Select Shoes &rarr;</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {checkoutItems.map((item, idx) => (
                        <div 
                          key={item.cartItemId || idx}
                          className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-3 shadow-xs group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img 
                              src={item.shoe.thumbnail} 
                              alt={item.shoe.name}
                              loading="lazy"
                              decoding="async"
                              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-white/10 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                                Pair #{idx + 1} &bull; {item.shoe.brand}
                              </span>
                              <h5 className="text-white font-bold text-xs sm:text-sm truncate">
                                {item.shoe.name}
                              </h5>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-amber-300 font-bold px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                                  UK Size {item.selectedSize}
                                </span>
                                {item.quantity > 1 && (
                                  <span className="text-xs text-slate-400 font-semibold">
                                    Qty: {item.quantity}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Customer Delete Cross Button: Clearly removes shoe from cart */}
                          <button
                            type="button"
                            onClick={() => handleDeleteShoe(item)}
                            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/30 hover:border-rose-500/60 text-rose-400 hover:text-rose-200 transition-all cursor-pointer group/btn"
                            title={`Delete ${item.shoe.name} from Cart`}
                            aria-label={`Delete ${item.shoe.name} from Cart`}
                          >
                            <X className="w-4 h-4 text-rose-400 group-hover/btn:scale-125 transition-transform stroke-[2.5]" />
                            <span className="text-xs font-bold whitespace-nowrap">
                              Remove
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Button: Proceed to Payment */}
                <div className="pt-2 md:hidden">
                  <button
                    onClick={handleProceedToMobilePayment}
                    disabled={checkoutItems.length === 0}
                    className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-base font-['Outfit'] shadow-xl shadow-emerald-500/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to UPI Payment &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Section (Rendered on mobile Step 2) */}
          <div className="md:hidden">
            {mobileStep === 'PAYMENT' && renderPaymentSection()}
          </div>

          {/* Payment Section (Always rendered on Desktop) */}
          <div className="hidden md:block">
            {renderPaymentSection()}
          </div>
        </div>

        {/* Right Column: Order Summary & Selected Shoes Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl p-5 sm:p-7 bg-slate-900 border border-slate-800 shadow-xl space-y-5 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base sm:text-lg font-black text-white font-['Outfit']">
                Order Summary ({totalItemCount} {totalItemCount === 1 ? 'Pair' : 'Pairs'})
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black">
                ₹{orderAmount} Total
              </span>
            </div>

            {/* Selected Items List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {checkoutItems.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex gap-3 items-center">
                  <img 
                    src={item.shoe.thumbnail} 
                    alt={item.shoe.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">
                      Pair #{idx + 1} &bull; {item.shoe.brand}
                    </span>
                    <h5 className="text-white font-bold text-xs truncate">
                      {item.shoe.name}
                    </h5>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-300 font-extrabold">
                        UK Size {item.selectedSize}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[11px] text-amber-400 font-bold">
                          &times; {item.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteShoe(item)}
                    className="shrink-0 p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/30 text-rose-400 hover:text-rose-200 border border-rose-500/20 transition-all cursor-pointer"
                    title={`Delete ${item.shoe.name}`}
                    aria-label={`Delete ${item.shoe.name}`}
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Items Total MRP</span>
                <span className="line-through">₹{totalItemCount * 1999}</span>
              </div>
              {isCartCheckout && combosCount > 0 && (
                <div className="flex items-center justify-between text-indigo-300 font-medium">
                  <span>Combo Discount ({combosCount} &times; 2 Pairs @ ₹700)</span>
                  <span className="font-bold">₹{combosCount * 700}</span>
                </div>
              )}
              {isCartCheckout && singlesCount > 0 && (
                <div className="flex items-center justify-between text-slate-400">
                  <span>Single Pair Addition ({singlesCount} &times; ₹389)</span>
                  <span className="font-bold">₹{singlesCount * 389}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-400">
                <span>Promotional Factory Discount</span>
                <span className="text-emerald-400 font-bold">- ₹{(totalItemCount * 1999) - orderAmount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Express Courier Shipping</span>
                <span className="text-emerald-400 font-bold uppercase">FREE</span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-sm sm:text-base font-black text-white font-['Outfit']">
                <span>Amount Payable</span>
                <span className="text-2xl text-emerald-400">₹{orderAmount}</span>
              </div>
            </div>

            {/* Delivery Guarantees */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-semibold">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-slate-800">
                <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>3-5 Days Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-slate-800">
                <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>7 Days Exchange</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
