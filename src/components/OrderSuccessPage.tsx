import React, { useState } from 'react';
import { 
  CheckCircle2, Download, Truck, Calendar, ArrowRight, 
  ShieldCheck, Phone, Mail, MapPin, Sparkles, Loader2,
  FileText, Check, Printer, ImageIcon
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';
import { downloadInvoicePdf } from '../utils/generateInvoicePdf';

export const OrderSuccessPage: React.FC = () => {
  const { activeOrder, storeConfig, navigateToHome } = useStore();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!activeOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-[#0f1111]">No active order found</h2>
        <button
          onClick={navigateToHome}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] font-bold text-sm border border-[#fcd200] cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    try {
      await downloadInvoicePdf(activeOrder, storeConfig);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('PDF generation error, fallback to browser print dialog:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBrowserPrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Thank You Celebration Card (Amazon Themed) */}
      <div className="bg-gradient-to-br from-[#131921] via-[#232f3e] to-[#131921] text-white rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl text-center relative overflow-hidden">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/40">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Order Successfully Placed &amp; Confirmed
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight">
          Thank You, {activeOrder.customer.fullName}!
        </h1>

        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Your order has been verified and confirmed. Our team is inspecting and packaging your footwear for express dispatch.
        </p>

        {/* Order ID & Delivery Date Highlights */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/15">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Order Reference ID
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-[#febd69] font-mono mt-0.5">
              {activeOrder.orderId}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/15">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#ffa41c]" />
              Guaranteed Delivery
            </div>
            <div className="text-sm sm:text-base font-extrabold text-emerald-400 mt-0.5">
              {activeOrder.deliveryDateRange}
            </div>
            <div className="text-[10px] text-slate-300">Arriving at your doorstep</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2c200] disabled:opacity-75 text-[#0f1111] font-extrabold text-sm flex items-center justify-center gap-2 border border-[#fcd200] shadow-md transition-all cursor-pointer"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0f1111]" />
                <span>Generating Official PDF...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-800" />
                <span>PDF Downloaded Successfully!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#0f1111]" />
                <span>Download Official Invoice (PDF)</span>
              </>
            )}
          </button>

          <button
            onClick={handleBrowserPrint}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/20 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>

          <button
            onClick={navigateToHome}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#232f3e] hover:bg-[#2d3b4d] text-white font-bold text-sm flex items-center justify-center gap-2 border border-slate-600 transition-colors cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live Order Timeline Progress */}
      <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="text-xs font-extrabold text-[#0f1111] uppercase tracking-wider mb-6 flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#e47911]" />
          4-5 Days Doorstep Delivery Progress
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
              ✓
            </div>
            <div className="text-xs font-bold text-[#0f1111] mt-2">Order Confirmed</div>
            <div className="text-[11px] text-slate-500">Today ({activeOrder.orderTimestamp})</div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-full bg-[#ffa41c] text-[#0f1111] font-black flex items-center justify-center text-xs shadow-md animate-pulse">
              2
            </div>
            <div className="text-xs font-bold text-[#0f1111] mt-2">Quality Inspection</div>
            <div className="text-[11px] text-slate-500">Packaging at Central Hub</div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div className="text-xs font-bold text-slate-700 mt-2">Dispatched (BlueDart/Delhivery)</div>
            <div className="text-[11px] text-slate-400">Within 24 Hours</div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <div className="text-xs font-bold text-slate-700 mt-2">Delivered to Doorstep</div>
            <div className="text-[11px] text-emerald-700 font-semibold">{activeOrder.deliveryDateRange}</div>
          </div>
        </div>
      </div>

      {/* Printable / Downloadable Order Slip (Complete Official Invoice with all checkout details) */}
      <div 
        id="printable-order-slip"
        className="mt-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-300 shadow-md text-[#0f1111]"
      >
        {/* Invoice Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <Logo size="sm" darkText />
            </div>
            <p className="text-xs text-slate-500 mt-1">Official E-Commerce Sales Tax Invoice &amp; Packaging Slip</p>
            <div className="text-xs text-slate-600 mt-2 max-w-sm leading-relaxed">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{storeConfig.storeAddress}</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {storeConfig.helplinePhone}</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {storeConfig.email}</span>
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="inline-block bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-md border border-emerald-200 uppercase tracking-wider mb-2">
              Payment Status: PAID ONLINE
            </div>
            <div className="text-xs text-slate-500">Order ID:</div>
            <div className="text-base sm:text-lg font-mono font-bold text-[#0f1111]">
              {activeOrder.orderId}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Order Date: <strong>{activeOrder.orderTimestamp}</strong>
            </div>
            <div className="text-xs text-slate-500">
              Payment Mode: <strong>{activeOrder.payment.method === 'QR_CODE' ? 'Scan QR Code' : 'UPI ID / Apps'}</strong>
            </div>
            {activeOrder.payment.selectedApp && (
              <div className="text-xs text-slate-500">
                Channel: <strong>{activeOrder.payment.selectedApp}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Customer & Shipping Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
          <div>
            <h4 className="font-bold text-[#0f1111] uppercase tracking-wider mb-2 text-[11px] text-[#c45500]">
              Billed &amp; Shipped To:
            </h4>
            <div className="font-bold text-sm text-[#0f1111] mb-1">
              {activeOrder.customer.fullName}
            </div>
            <div className="text-slate-700 leading-relaxed">
              {activeOrder.customer.streetAddress}
              <div>{activeOrder.customer.city}, {activeOrder.customer.state} - <strong>{activeOrder.customer.pincode}</strong></div>
            </div>
            <div className="mt-2 text-slate-800">
              <div>Phone: <strong>+91 {activeOrder.customer.mobileNumber}</strong></div>
              {activeOrder.customer.whatsappNumber && (
                <div>WhatsApp: <strong>+91 {activeOrder.customer.whatsappNumber}</strong></div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#0f1111] uppercase tracking-wider mb-2 text-[11px] text-[#c45500]">
              Shipping &amp; Verification Logistics:
            </h4>
            <div className="space-y-1.5 text-slate-700">
              <div>Courier Partner: <strong>Delhivery / BlueDart Express Surface</strong></div>
              <div>Estimated Delivery Window: <strong className="text-emerald-700">{activeOrder.deliveryDateRange}</strong></div>
              <div>Verification Timestamp: <strong>{activeOrder.payment.verifiedTime}</strong></div>
              <div className="flex items-center gap-1.5">
                <span>Payment Verification:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                  Verified &amp; Confirmed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Itemized Footwear Products Table with Thumbnails */}
        <div className="py-6 border-b border-slate-200">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-300 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-2">Item Description</th>
                <th className="py-2 text-center">Shoe Size</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {activeOrder.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.shoe.thumbnail} 
                        alt={item.shoe.name} 
                        className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0" 
                      />
                      <div>
                        <div className="font-bold text-[#0f1111]">{item.shoe.name}</div>
                        <div className="text-[11px] text-slate-500">{item.shoe.tagline}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-center font-extrabold text-[#0f1111]">UK {item.selectedSize}</td>
                  <td className="py-3 text-center">{item.quantity}</td>
                  <td className="py-3 text-right font-bold text-emerald-700">
                    ₹{activeOrder.isCombo ? '350' : '389'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Proof Preview if screenshot was uploaded */}
        {activeOrder.payment.screenshotUrl && (
          <div className="py-4 border-b border-slate-200 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg border border-slate-300 overflow-hidden shrink-0 bg-slate-50">
                <img 
                  src={activeOrder.payment.screenshotUrl} 
                  alt="Payment Receipt Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-[#0f1111] flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Customer Payment Screenshot Receipt</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Verified by merchant &bull; Authenticated for dispatch
                </div>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-sm">
              Attached to Order
            </span>
          </div>
        )}

        {/* Invoice Summary & Terms */}
        <div className="pt-4 flex flex-col sm:flex-row justify-between items-start gap-4 text-xs">
          <div className="text-slate-500 space-y-1 max-w-sm">
            <div className="font-bold text-slate-700">Terms &amp; Replacement Policy:</div>
            <div>&bull; 7-Day Easy Size Exchange &amp; Replacement if unused in original packaging.</div>
            <div>&bull; For instant support or tracking inquiries, WhatsApp your Order ID to <strong>{storeConfig.helplineWhatsapp}</strong>.</div>
          </div>

          <div className="w-full sm:w-64 space-y-1.5 text-right">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>₹{activeOrder.totalAmount}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Express Delivery &amp; Packaging:</span>
              <span className="text-emerald-700 font-bold">FREE (₹0)</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GST &amp; Central Taxes:</span>
              <span>Included</span>
            </div>
            <div className="flex justify-between text-[#0f1111] font-extrabold text-base pt-2 border-t border-slate-300">
              <span>Total Paid:</span>
              <span className="text-[#b12704] font-['Outfit']">₹{activeOrder.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Authorized Stamp & Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div>
            This is an official computer-generated sales tax invoice for {storeConfig.storeName} India.
          </div>
          <div className="font-bold text-emerald-700 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Authorized Digitally Verified Order</span>
          </div>
        </div>
      </div>
    </div>
  );
};
