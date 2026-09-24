export interface Shoe {
  id: number;
  brand: string;
  name: string;
  tagline: string;
  category: 'Running' | 'Sneakers' | 'Casual' | 'Sports' | 'Loafers' | 'High-Top' | 'Walking';
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  totalReviews: number;
  videoUrl: string;
  thumbnail: string;
  galleryImages?: string[];
  colors: string[];
  sizes: number[];
  badge?: string;
  description: string;
  features: string[];
  stockCount: number;
  reelLikes?: number;
}

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  state: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  avatar: string;
  purchasedSize: number;
  helpfulCount: number;
}

export type AppView = 
  | 'HOME' 
  | 'DETAIL' 
  | 'CHECKOUT' 
  | 'ORDER_SUCCESS' 
  | 'COMBO_BUILDER'
  | 'ABOUT'
  | 'PRIVACY'
  | 'SHIPPING'
  | 'RETURN'
  | 'PAYMENT_POLICY'
  | 'CONTACT'
  | 'FAQ';

export interface CustomerAddress {
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CartItem {
  cartItemId: string;
  shoe: Shoe;
  selectedSize: number;
  selectedColor?: string;
  quantity: number;
}

export interface OrderItem {
  shoe: Shoe;
  selectedSize: number;
  selectedColor?: string;
  quantity: number;
}

export interface PlacedOrder {
  orderId: string;
  orderTimestamp: string;
  deliveryDateRange: string;
  items: OrderItem[];
  isCombo: boolean;
  totalAmount: number;
  shippingFee: number;
  customer: CustomerAddress;
  payment: {
    method: 'QR_CODE' | 'UPI_ID' | 'UPI_APP';
    selectedApp?: string;
    utrNumber?: string;
    screenshotUrl?: string;
    verifiedTime: string;
  };
}

export interface StoreConfig {
  storeName: string;
  tagline: string;
  helplinePhone: string;
  helplineWhatsapp: string;
  email: string;
  storeAddress: string;
  upiId: string;
  merchantName: string;
  customQrUrl?: string;
}
