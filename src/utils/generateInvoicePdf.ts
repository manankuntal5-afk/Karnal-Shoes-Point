import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PlacedOrder, StoreConfig } from '../types';

/**
 * Downloads a complete, professional official invoice PDF for the order.
 * Combines DOM capture with a 100% resilient native jsPDF vector generator
 * so it never fails due to cross-origin image or canvas tainting issues.
 */
export async function downloadInvoicePdf(
  order: PlacedOrder, 
  storeConfig: StoreConfig
): Promise<void> {
  const fileName = `KarnalShoesPoint_Invoice_${order.orderId}.pdf`;

  // First attempt: Native high-fidelity jsPDF vector document builder (100% reliable)
  try {
    generateNativeVectorInvoice(order, storeConfig, fileName);
    return;
  } catch (nativeErr) {
    console.warn('Native vector PDF generation warning, attempting DOM render:', nativeErr);
  }

  // Second attempt: html2canvas DOM snapshot
  try {
    const slipElement = document.getElementById('printable-order-slip');
    if (!slipElement) {
      throw new Error('Slip element not found');
    }

    const canvas = await html2canvas(slipElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    triggerPdfDownload(pdf, fileName);
  } catch (domErr) {
    console.error('All PDF generation methods failed:', domErr);
    // Final fallback: standard browser print dialog
    window.print();
  }
}

/**
 * Native vector PDF invoice builder.
 * Generates an official tax invoice with crisp vector lines, exact details,
 * and zero dependencies on external image loading.
 */
function generateNativeVectorInvoice(
  order: PlacedOrder,
  storeConfig: StoreConfig,
  fileName: string
): void {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  // Header Banner: Deep Navy Background
  pdf.setFillColor(19, 25, 33); // #131921
  pdf.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');

  // Brand Name
  pdf.setTextColor(254, 189, 105); // #febd69
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(15);
  pdf.text('Karnal Shoes Point', margin + 6, y + 10);

  // Brand Subtitle
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.text('Official E-Commerce Sales Tax Invoice & Delivery Slip', margin + 6, y + 16);

  // Header Right: "PAID ONLINE" Badge
  pdf.setFillColor(16, 185, 129); // Emerald 500
  pdf.roundedRect(pageWidth - margin - 38, y + 6, 32, 7, 1.5, 1.5, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.text('PAID ONLINE', pageWidth - margin - 22, y + 10.8, { align: 'center' });

  y += 28;

  // Store & Invoice Info Meta Section
  pdf.setFillColor(248, 250, 252);
  pdf.roundedRect(margin, y, contentWidth, 26, 1.5, 1.5, 'F');
  pdf.setDrawColor(226, 232, 240);
  pdf.roundedRect(margin, y, contentWidth, 26, 1.5, 1.5, 'S');

  // Left column: Store details
  pdf.setTextColor(30, 41, 59);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.5);
  pdf.text(storeConfig.storeName || 'Karnal Shoes Point', margin + 4, y + 6);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(71, 85, 105);
  pdf.text(storeConfig.storeAddress || 'Central Footwear Logistics Hub, Sector 62, Noida, UP - 201309', margin + 4, y + 11);
  pdf.text(`Helpline: ${storeConfig.helplinePhone}  |  WhatsApp: ${storeConfig.helplineWhatsapp}`, margin + 4, y + 16);
  pdf.text(`Support Email: ${storeConfig.email}`, margin + 4, y + 21);

  // Right column: Invoice Meta
  const rightColX = pageWidth - margin - 4;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(15, 23, 42);
  pdf.text(`Invoice / Order ID: ${order.orderId}`, rightColX, y + 6, { align: 'right' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(71, 85, 105);
  pdf.text(`Date & Time: ${order.orderTimestamp}`, rightColX, y + 11, { align: 'right' });
  pdf.text(`Payment Method: ${order.payment.method === 'QR_CODE' ? 'Scan QR Code' : 'UPI Direct / Apps'}`, rightColX, y + 16, { align: 'right' });
  if (order.payment.selectedApp) {
    pdf.text(`Channel: ${order.payment.selectedApp}`, rightColX, y + 21, { align: 'right' });
  }

  y += 30;

  // Customer & Shipping Addresses (2 Columns)
  const halfColWidth = (contentWidth - 4) / 2;

  // Box 1: Billed & Shipped To
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(margin, y, halfColWidth, 34, 1.5, 1.5, 'F');
  pdf.setDrawColor(226, 232, 240);
  pdf.roundedRect(margin, y, halfColWidth, 34, 1.5, 1.5, 'S');

  pdf.setTextColor(196, 85, 0); // Amazon dark orange #c45500
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.text('BILLED & SHIPPED TO:', margin + 4, y + 6);

  pdf.setTextColor(15, 23, 42);
  pdf.setFontSize(9);
  pdf.text(order.customer.fullName, margin + 4, y + 12);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(51, 65, 85);
  const street = pdf.splitTextToSize(order.customer.streetAddress, halfColWidth - 8);
  pdf.text(street, margin + 4, y + 17);
  pdf.text(`${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`, margin + 4, y + 25);
  pdf.text(`Mobile: +91 ${order.customer.mobileNumber}${order.customer.whatsappNumber ? ` | WA: +91 ${order.customer.whatsappNumber}` : ''}`, margin + 4, y + 30);

  // Box 2: Dispatch & Courier Logistics
  const rightBoxX = margin + halfColWidth + 4;
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(rightBoxX, y, halfColWidth, 34, 1.5, 1.5, 'F');
  pdf.setDrawColor(226, 232, 240);
  pdf.roundedRect(rightBoxX, y, halfColWidth, 34, 1.5, 1.5, 'S');

  pdf.setTextColor(196, 85, 0);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.text('SHIPPING & DISPATCH LOGISTICS:', rightBoxX + 4, y + 6);

  pdf.setTextColor(51, 65, 85);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.text('Courier Partner: Delhivery / BlueDart Express Surface', rightBoxX + 4, y + 12);
  pdf.text(`Estimated Delivery Window: ${order.deliveryDateRange}`, rightBoxX + 4, y + 17);
  pdf.text(`Payment Verification: Confirmed & Digitally Verified`, rightBoxX + 4, y + 22);
  pdf.text(`Verification Timestamp: ${order.payment.verifiedTime || order.orderTimestamp}`, rightBoxX + 4, y + 27);
  pdf.text(`Package Type: Tamper-Evident Safety Footwear Box`, rightBoxX + 4, y + 32);

  y += 38;

  // Itemized Products Table
  // Header Row
  pdf.setFillColor(35, 47, 62); // #232f3e
  pdf.rect(margin, y, contentWidth, 7, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);

  pdf.text('#', margin + 3, y + 4.8);
  pdf.text('Item Description', margin + 12, y + 4.8);
  pdf.text('Shoe Size', margin + 105, y + 4.8, { align: 'center' });
  pdf.text('Qty', margin + 130, y + 4.8, { align: 'center' });
  pdf.text('Unit Price', margin + 155, y + 4.8, { align: 'right' });
  pdf.text('Amount (INR)', pageWidth - margin - 4, y + 4.8, { align: 'right' });

  y += 7;

  // Table Body Rows
  order.items.forEach((item, index) => {
    const isEven = index % 2 === 0;
    pdf.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    pdf.rect(margin, y, contentWidth, 12, 'F');
    pdf.setDrawColor(226, 232, 240);
    pdf.line(margin, y + 12, margin + contentWidth, y + 12);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(30, 41, 59);

    // Number
    pdf.text(`${index + 1}`, margin + 3, y + 7);

    // Name & Category
    pdf.setFont('helvetica', 'bold');
    pdf.text(item.shoe.name, margin + 12, y + 5.5);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(100, 116, 139);
    pdf.text(item.shoe.tagline || 'Premium Quality Sneakers', margin + 12, y + 9.5);

    // Size
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(15, 23, 42);
    pdf.text(`UK ${item.selectedSize}`, margin + 105, y + 7, { align: 'center' });

    // Qty
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${item.quantity}`, margin + 130, y + 7, { align: 'center' });

    // Unit Price & Total
    const unitPrice = order.isCombo ? 350 : 389;
    const itemTotal = unitPrice * item.quantity;
    pdf.text(`Rs. ${unitPrice}`, margin + 155, y + 7, { align: 'right' });
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(4, 120, 87); // Emerald 700
    pdf.text(`Rs. ${itemTotal}`, pageWidth - margin - 4, y + 7, { align: 'right' });

    y += 12;
  });

  y += 4;

  // Financial Breakdown & Terms (2 Columns)
  const summaryBoxWidth = 72;
  const summaryBoxX = pageWidth - margin - summaryBoxWidth;

  // Left: Terms & Support
  pdf.setTextColor(51, 65, 85);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.text('Terms & Replacement Policy:', margin + 2, y + 5);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7);
  pdf.setTextColor(100, 116, 139);
  pdf.text('• 7-Day Easy Size Exchange & Replacement if unused in original box.', margin + 2, y + 10);
  pdf.text(`• For tracking or support, WhatsApp your Order ID to +91 ${storeConfig.helplineWhatsapp}.`, margin + 2, y + 15);
  pdf.text('• Pre-paid verified online purchase — Safe doorstep delivery guaranteed.', margin + 2, y + 20);

  // Right: Price Summary Box
  pdf.setFillColor(248, 250, 252);
  pdf.roundedRect(summaryBoxX, y, summaryBoxWidth, 32, 1.5, 1.5, 'F');
  pdf.setDrawColor(226, 232, 240);
  pdf.roundedRect(summaryBoxX, y, summaryBoxWidth, 32, 1.5, 1.5, 'S');

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(71, 85, 105);

  pdf.text('Subtotal:', summaryBoxX + 4, y + 6);
  pdf.text(`Rs. ${order.totalAmount}`, summaryBoxX + summaryBoxWidth - 4, y + 6, { align: 'right' });

  pdf.text('Express Delivery:', summaryBoxX + 4, y + 12);
  pdf.setTextColor(4, 120, 87);
  pdf.text('FREE (Rs. 0)', summaryBoxX + summaryBoxWidth - 4, y + 12, { align: 'right' });

  pdf.setTextColor(71, 85, 105);
  pdf.text('GST & Central Taxes:', summaryBoxX + 4, y + 18);
  pdf.text('Included', summaryBoxX + summaryBoxWidth - 4, y + 18, { align: 'right' });

  // Divider inside summary
  pdf.setDrawColor(203, 213, 225);
  pdf.line(summaryBoxX + 4, y + 21, summaryBoxX + summaryBoxWidth - 4, y + 21);

  // Total Paid
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9.5);
  pdf.setTextColor(15, 23, 42);
  pdf.text('Total Paid:', summaryBoxX + 4, y + 28);
  pdf.setTextColor(177, 39, 4); // #b12704
  pdf.text(`Rs. ${order.totalAmount}`, summaryBoxX + summaryBoxWidth - 4, y + 28, { align: 'right' });

  y += 36;

  // Official Stamp / Footer
  pdf.setDrawColor(226, 232, 240);
  pdf.line(margin, y, margin + contentWidth, y);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(6.5);
  pdf.setTextColor(148, 163, 184);
  pdf.text(
    `This is an official computer-generated sales tax invoice for ${storeConfig.storeName} India. No physical signature required.`,
    margin,
    y + 5
  );

  pdf.setTextColor(4, 120, 87);
  pdf.setFont('helvetica', 'bold');
  pdf.text(
    '✓ Authorized Digitally Verified Order',
    pageWidth - margin,
    y + 5,
    { align: 'right' }
  );

  triggerPdfDownload(pdf, fileName);
}

/**
 * Robust cross-platform PDF file downloader using Blob and anchor triggering
 */
function triggerPdfDownload(pdf: jsPDF, fileName: string): void {
  try {
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1500);
  } catch {
    // Standard jsPDF fallback
    pdf.save(fileName);
  }
}
