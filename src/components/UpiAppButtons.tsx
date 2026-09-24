import React, { useState } from 'react';
import { Check, Smartphone, Zap, ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';

interface UpiAppButtonsProps {
  upiId: string;
  merchantName: string;
  amount: number;
  selectedApp?: string;
  onSelectApp?: (appName: string) => void;
}

interface AppOption {
  id: string;
  name: string;
  tagline: string;
  androidPackage: string;
  iosScheme: string;
  brandBg: string;
  brandText: string;
  brandBorder: string;
  badgeBg: string;
  logo: React.ReactNode;
}

export const UpiAppButtons: React.FC<UpiAppButtonsProps> = ({
  upiId,
  merchantName,
  amount,
  selectedApp: propSelectedApp,
  onSelectApp,
}) => {
  const [internalSelectedApp, setInternalSelectedApp] = useState<string>('PhonePe');
  const [statusMessage, setStatusMessage] = useState<{
    appName: string;
    text: string;
    isOpening: boolean;
  } | null>(null);

  const currentSelectedApp = propSelectedApp || internalSelectedApp;
  const formattedAmount = Number(amount || 0).toFixed(2);
  const cleanAmount = Number(amount || 0);

  const appOptions: AppOption[] = [
    {
      id: 'PhonePe',
      name: 'PhonePe',
      tagline: 'Fastest 1-Click Payment',
      androidPackage: 'com.phonepe.app',
      iosScheme: 'phonepe://pay',
      brandBg: 'bg-[#5f259f]/10 hover:bg-[#5f259f]/20',
      brandText: 'text-[#8c4be6]',
      brandBorder: 'border-[#5f259f]/50 hover:border-[#8c4be6]',
      badgeBg: 'bg-[#5f259f] text-white',
      logo: (
        <div className="w-8 h-8 rounded-xl bg-[#5f259f] flex items-center justify-center text-white font-black text-sm shadow-md select-none shrink-0">
          Pe
        </div>
      ),
    },
    {
      id: 'Paytm',
      name: 'Paytm',
      tagline: 'Auto-Filled Paytm UPI',
      androidPackage: 'net.one97.paytm',
      iosScheme: 'paytmmp://pay',
      brandBg: 'bg-[#002e6e]/15 hover:bg-[#002e6e]/25',
      brandText: 'text-[#00baf2]',
      brandBorder: 'border-[#00baf2]/50 hover:border-[#00baf2]',
      badgeBg: 'bg-[#002e6e] text-[#00baf2] border border-[#00baf2]/40',
      logo: (
        <div className="h-8 px-2 rounded-xl bg-[#002e6e] border border-[#00baf2]/30 flex items-center justify-center text-white font-black text-xs tracking-tight shadow-md select-none shrink-0">
          <span className="text-[#00baf2]">Pay</span>tm
        </div>
      ),
    },
    {
      id: 'Google Pay',
      name: 'Google Pay',
      tagline: 'Instant GPay UPI',
      androidPackage: 'com.google.android.apps.nbu.paisa.user',
      iosScheme: 'tez://upi/pay',
      brandBg: 'bg-white/10 hover:bg-white/15',
      brandText: 'text-white',
      brandBorder: 'border-white/30 hover:border-white/60',
      badgeBg: 'bg-blue-600 text-white',
      logo: (
        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-md shrink-0">
          <svg className="w-full h-full" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
        </div>
      ),
    },
    {
      id: 'BHIM UPI',
      name: 'BHIM UPI',
      tagline: 'Govt NPCI BHIM',
      androidPackage: 'in.org.npci.upiapp',
      iosScheme: 'bhim://pay',
      brandBg: 'bg-emerald-950/20 hover:bg-emerald-950/30',
      brandText: 'text-emerald-400',
      brandBorder: 'border-emerald-500/50 hover:border-emerald-400',
      badgeBg: 'bg-emerald-700 text-white',
      logo: (
        <div className="h-8 px-2 rounded-xl bg-white border border-slate-300 flex items-center justify-center gap-1 shadow-md select-none shrink-0">
          <span className="font-black text-xs text-[#00843d]">BHIM</span>
          <span className="font-black text-[10px] text-[#f26522] italic">UPI</span>
        </div>
      ),
    },
  ];

  // Helper to build URLs
  const getUpiUrls = (app: AppOption | null) => {
    const note = `Shoes_Order_${cleanAmount}`;
    const query = `pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName)}&am=${formattedAmount}&cu=INR&tn=${encodeURIComponent(note)}&mode=02`;
    const genericUri = `upi://pay?${query}`;

    if (!app) {
      return { primaryUri: genericUri, fallbackUri: genericUri };
    }

    const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
    const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);

    let primaryUri = genericUri;

    if (isAndroid && app.androidPackage) {
      // Android Chrome intent URL strictly binds package to ensure the exact app launches
      primaryUri = `intent://pay?${query}#Intent;scheme=upi;package=${app.androidPackage};end`;
    } else if (app.iosScheme) {
      primaryUri = `${app.iosScheme}?${query}`;
    }

    return { primaryUri, fallbackUri: genericUri };
  };

  const handleLaunchApp = (app: AppOption) => {
    setInternalSelectedApp(app.id);
    if (onSelectApp) {
      onSelectApp(app.id);
    }

    setStatusMessage({
      appName: app.name,
      text: `${app.name} is opening... ₹${cleanAmount} is auto-filled. Enter your UPI PIN to finish.`,
      isOpening: true,
    });

    const { primaryUri, fallbackUri } = getUpiUrls(app);

    // Method 1: Create an invisible anchor tag and simulate click (safest for mobile browser security sandbox)
    const anchor = document.createElement('a');
    anchor.href = primaryUri;
    anchor.rel = 'noreferrer';
    anchor.target = '_top';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    // Method 2: Direct location assignment for broader browser compatibility
    try {
      window.location.href = primaryUri;
    } catch {
      // ignore
    }

    // Fallback timer: If specific app failed or isn't installed, trigger generic upi://
    setTimeout(() => {
      try {
        window.location.href = fallbackUri;
      } catch {
        // ignore
      }
    }, 800);
  };

  const handleLaunchGenericUpi = () => {
    setStatusMessage({
      appName: 'UPI App',
      text: `Payment app is opening... ₹${cleanAmount} is auto-filled. Enter your UPI PIN to complete order.`,
      isOpening: true,
    });

    const { fallbackUri } = getUpiUrls(null);
    const anchor = document.createElement('a');
    anchor.href = fallbackUri;
    anchor.rel = 'noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    try {
      window.location.href = fallbackUri;
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-3 mt-4 pt-4 border-t border-slate-800">
      {/* Header with clear instructions in English */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div className="flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-wide text-white font-['Outfit']">
            1-Click Direct UPI Payment Apps
          </span>
        </div>
        <span className="text-[11px] font-black text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full w-fit">
          ⚡ Auto-Filled: ₹{cleanAmount}
        </span>
      </div>

      <p className="text-xs text-slate-300">
        Tap your preferred payment app below (PhonePe, Paytm, Google Pay). The amount <strong>₹{cleanAmount}</strong> is automatically filled; simply enter your UPI PIN to complete your order:
      </p>

      {/* Grid of 4 major UPI Apps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {appOptions.map((app) => {
          const isSelected = currentSelectedApp === app.id;
          const { primaryUri } = getUpiUrls(app);

          return (
            <a
              key={app.id}
              href={primaryUri}
              onClick={(e) => {
                // Keep standard anchor navigation while triggering rich status update & fallback
                handleLaunchApp(app);
              }}
              className={`p-3 rounded-2xl border-2 transition-all duration-200 text-left flex items-center justify-between gap-3 group relative cursor-pointer no-underline shadow-lg ${
                isSelected
                  ? 'bg-slate-900 border-emerald-400 ring-2 ring-emerald-500/30 shadow-emerald-500/10'
                  : 'bg-slate-950/80 border-slate-700 hover:border-slate-500 hover:bg-slate-900'
              }`}
              title={`Open ${app.name} & Pay ₹${cleanAmount}`}
            >
              {/* Left: App Logo & Details */}
              <div className="flex items-center gap-3 min-w-0">
                {app.logo}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-white font-['Outfit'] group-hover:text-emerald-300 transition-colors">
                      {app.name}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>Enter UPI PIN only</span>
                  </div>
                </div>
              </div>

              {/* Right: Pay Action Button Pill */}
              <div className="shrink-0 flex items-center gap-1.5">
                <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-md group-hover:scale-105 transition-transform flex items-center gap-1">
                  <span>Pay ₹{cleanAmount}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Universal 1-Tap Launcher for Any UPI App */}
      <div className="pt-1">
        <button
          type="button"
          onClick={handleLaunchGenericUpi}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.99] text-white font-black text-xs sm:text-sm shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 border border-indigo-400/40 cursor-pointer transition-all font-['Outfit']"
        >
          <Zap className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
          <span>Pay ₹{cleanAmount} with Any Other UPI App</span>
          <ExternalLink className="w-4 h-4 text-indigo-200 shrink-0 ml-1" />
        </button>
      </div>

      {/* Real-time Status Feedback Banner */}
      {statusMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-start gap-2.5 animate-fade-in shadow-md">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mt-1 shrink-0" />
          <div className="flex-1">
            <div className="font-bold text-white text-xs">
              ✓ {statusMessage.text}
            </div>
            <div className="text-[11px] text-emerald-300 mt-1 flex flex-wrap items-center gap-2">
              <span>UPI ID: <strong className="font-mono text-white">{upiId}</strong></span>
              <span>&bull;</span>
              <span>Amount: <strong className="text-white">₹{cleanAmount}</strong> (Auto-Filled)</span>
            </div>
          </div>
        </div>
      )}

      {/* Trust & Guarantee Note */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 px-1">
        <div className="flex items-center gap-1 text-emerald-400 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>NPCI 100% Verified UPI &bull; Zero Extra Charges</span>
        </div>
        <span className="text-slate-500 font-medium">
          Instant Auto Confirmation
        </span>
      </div>
    </div>
  );
};

