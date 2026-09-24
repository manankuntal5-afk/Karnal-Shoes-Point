import React, { createContext, useContext, useState, useEffect } from 'react';
import { Shoe, AppView, PlacedOrder, StoreConfig, CartItem } from '../types';
import { INITIAL_SHOES_DATA, DEFAULT_STORE_CONFIG, SHOE_BRANDS, BrandInfo } from '../data/shoesData';

export interface ComboSelectionItem {
  shoe: Shoe;
  size: number;
  color?: string;
}

export interface ComboSelection {
  item1: ComboSelectionItem;
  item2: ComboSelectionItem;
}

interface StoreContextType {
  shoes: Shoe[];
  featuredShoe: Shoe;
  storeConfig: StoreConfig;
  currentView: AppView;
  selectedShoe: Shoe | null;
  selectedSize: number | null;
  selectedColor: string;
  isComboCheckout: boolean;
  comboSelection: ComboSelection;
  activeOrder: PlacedOrder | null;
  
  // Brand filtering & Brand Dedicated Pages (ALL, Nike, Puma)
  activeBrand: string; // 'ALL' | 'Nike' | 'Puma'
  setActiveBrand: (brand: string) => void;
  brandList: BrandInfo[];

  // Instagram Reels Modal Viewer
  selectedReelShoe: Shoe | null;
  isReelModalOpen: boolean;
  openReelModal: (shoe: Shoe) => void;
  closeReelModal: () => void;

  // Real Multi-Item Cart State & Calculations
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (shoe: Shoe, size: number, color?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  updateCartItemSize: (cartItemId: string, newSize: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartCombosCount: number;
  cartSinglesCount: number;
  combosCount: number;
  singlesCount: number;
  cartTotalPrice: number;
  cartMrpTotal: number;
  cartComboSavings: number;
  cartNotification: string | null;
  dismissCartNotification: () => void;
  proceedToCheckoutWithCart: () => void;

  // Selection states
  purchaseMode: 'SINGLE' | 'COMBO' | null;
  singleSize: number | null;
  comboPair1Size: number | null;
  comboPair2Size: number | null;
  comboPair1Shoe: Shoe;
  comboPair2Shoe: Shoe;
  setComboPair1Shoe: (shoe: Shoe) => void;
  setComboPair2Shoe: (shoe: Shoe) => void;
  isComboOpen: boolean;
  comboState: {
    pair1: { shoe: Shoe; size: number; color?: string } | null;
    pair2: { shoe: Shoe; size: number; color?: string } | null;
    isComplete: boolean;
  };

  // Ready and Cart indicators
  cartCount: number;
  isSingleReady: boolean;
  isComboReady: boolean;
  isSelectionComplete: boolean;
  openWithFullScreenVideo: boolean;
  setOpenWithFullScreenVideo: (val: boolean) => void;

  // Navigation & Actions
  navigateToHome: () => void;
  resetToHome: () => void;
  navigateToStep1: () => void;
  navigateToDetail: (shoe?: Shoe, customSize?: number, customColor?: string, autoOpenFullScreen?: boolean) => void;
  navigateToShoeDetail: (shoe: Shoe, customSize?: number, customColor?: string, autoOpenFullScreen?: boolean) => void;
  navigateToCheckoutSingle: (shoe: Shoe, size: number, color?: string) => void;
  navigateToCheckoutCombo: () => void;
  navigateToCheckoutComboWithPairs: (
    pair1: { shoe?: Shoe; size: number; color?: string }, 
    pair2: { shoe?: Shoe; size: number; color?: string }
  ) => void;
  proceedToCheckout: () => void;
  navigateToView: (view: AppView) => void;
  navigateToSellingPage: () => void;
  openComboBuilder: () => void;
  selectSinglePairMode: () => void;
  openComboBuilderWithShoe: (shoe: Shoe) => void;
  closeComboBuilder: () => void;
  setSelectedSize: (size: number | null) => void;
  setSelectedColor: (color: string) => void;
  setPurchaseMode: (mode: 'SINGLE' | 'COMBO' | null) => void;
  setSingleSize: (size: number | null) => void;
  setComboPair1Size: (size: number | null) => void;
  setComboPair2Size: (size: number | null) => void;
  
  // Combo Management
  setComboItem1: (shoe: Shoe, size: number, color?: string) => void;
  setComboItem2: (shoe: Shoe, size: number, color?: string) => void;
  clearCombo: () => void;
  
  // Order Completion
  setOrderSuccess: (order: PlacedOrder) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load exactly 23 shoes (12 Nike + 11 Puma)
  const [shoes, setShoes] = useState<Shoe[]>(() => {
    try {
      const saved = localStorage.getItem('karnal_shoes_products_v23_nike_puma');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 23) {
          for (let i = 0; i < 23; i++) {
            if (parsed[i]) {
              parsed[i].videoUrl = INITIAL_SHOES_DATA[i].videoUrl;
              parsed[i].thumbnail = INITIAL_SHOES_DATA[i].thumbnail;
              if (parsed[i].galleryImages && parsed[i].galleryImages.length > 0) {
                parsed[i].galleryImages[0] = INITIAL_SHOES_DATA[i].thumbnail;
              }
            }
          }
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_SHOES_DATA;
  });

  const featuredShoe: Shoe = shoes[0] || INITIAL_SHOES_DATA[0];

  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem('karnal_shoes_point_config_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STORE_CONFIG,
          ...parsed,
          upiId: DEFAULT_STORE_CONFIG.upiId,
          customQrUrl: DEFAULT_STORE_CONFIG.customQrUrl
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_STORE_CONFIG;
  });

  const [currentView, setCurrentView] = useState<AppView>('HOME');
  // Home page starts with All Shoes (23 models in ultra-fast video cards)
  const [activeBrand, setActiveBrand] = useState<string>('ALL');
  const [selectedShoe, setSelectedShoe] = useState<Shoe | null>(featuredShoe);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(featuredShoe.colors[0] || 'Crimson Red');
  
  // Instagram Reels Modal State
  const [selectedReelShoe, setSelectedReelShoe] = useState<Shoe | null>(null);
  const [isReelModalOpen, setIsReelModalOpen] = useState<boolean>(false);

  const openReelModal = (shoe: Shoe) => {
    setSelectedReelShoe(shoe);
    setIsReelModalOpen(false);
    navigateToDetail(shoe);
  };

  const closeReelModal = () => {
    setIsReelModalOpen(false);
  };

  // Selection state
  const [purchaseMode, setPurchaseMode] = useState<'SINGLE' | 'COMBO' | null>(null);
  const [singleSize, setSingleSize] = useState<number | null>(null);
  const [comboPair1Size, setComboPair1Size] = useState<number | null>(null);
  const [comboPair2Size, setComboPair2Size] = useState<number | null>(null);
  const [comboPair1Shoe, setComboPair1Shoe] = useState<Shoe>(shoes[0] || featuredShoe);
  const [comboPair2Shoe, setComboPair2Shoe] = useState<Shoe>(shoes[12] || shoes[1] || featuredShoe);

  const [isComboCheckout, setIsComboCheckout] = useState<boolean>(false);
  const [comboSelection, setComboSelection] = useState<ComboSelection>({
    item1: { shoe: shoes[0] || featuredShoe, size: 8, color: featuredShoe.colors[0] || 'Crimson Red' },
    item2: { shoe: shoes[12] || shoes[1] || featuredShoe, size: 8, color: 'Triple White' }
  });

  const [activeOrder, setActiveOrder] = useState<PlacedOrder | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('karnal_shoes_cart_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartNotification, setCartNotification] = useState<string | null>(null);
  const [openWithFullScreenVideo, setOpenWithFullScreenVideo] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('karnal_shoes_cart_v3', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Cart Pricing Math
  const cartTotalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartCombosCount = Math.floor(cartTotalCount / 2);
  const cartSinglesCount = cartTotalCount % 2;
  const cartTotalPrice = (cartCombosCount * 700) + (cartSinglesCount * 389);
  const cartMrpTotal = cartTotalCount * 1999;
  const cartComboSavings = (cartTotalCount * 389) - cartTotalPrice;

  const isSingleReady = purchaseMode === 'SINGLE' && singleSize !== null;
  const isComboReady = purchaseMode === 'COMBO' && comboPair1Size !== null && comboPair2Size !== null;
  const isSelectionComplete = isSingleReady || isComboReady;

  const cartCount = cartTotalCount > 0 ? cartTotalCount : isSingleReady ? 1 : isComboReady ? 2 : 0;

  const addToCart = (shoe: Shoe, size: number, color?: string, quantity: number = 1) => {
    const chosenColor = color || shoe.colors[0] || 'Original';
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.shoe.id === shoe.id && item.selectedSize === size && item.selectedColor === chosenColor
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId: `${shoe.id}-${size}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          shoe,
          selectedSize: size,
          selectedColor: chosenColor,
          quantity
        };
        return [...prev, newItem];
      }
    });

    const nextCount = cartTotalCount + quantity;
    const isNowCombo = nextCount >= 2;
    setCartNotification(
      `Added "${shoe.name} (UK ${size})" to Cart! ${
        isNowCombo 
          ? '🎉 Combo Offer active: 2 pairs for ₹700!' 
          : '💡 Add 1 more pair to get 2-Pairs Combo @ ₹700!'
      }`
    );
    setTimeout(() => {
      setCartNotification(null);
    }, 4000);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity } : item));
  };

  const updateCartItemSize = (cartItemId: string, newSize: number) => {
    setCart(prev => prev.map(item => item.cartItemId === cartItemId ? { ...item, selectedSize: newSize } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const dismissCartNotification = () => setCartNotification(null);

  const proceedToCheckoutWithCart = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setIsComboCheckout(cartTotalCount >= 2);
    setCurrentView('CHECKOUT');
    scrollToAppTop();
  };

  // Persist updated catalog
  useEffect(() => {
    try {
      localStorage.setItem('karnal_shoes_products_v23_nike_puma', JSON.stringify(shoes));
    } catch {
      // ignore
    }
  }, [shoes]);

  // Persist store configuration
  useEffect(() => {
    try {
      localStorage.setItem('karnal_shoes_point_config_v2', JSON.stringify(storeConfig));
    } catch {
      // ignore
    }
  }, [storeConfig]);

  const scrollToAppTop = () => {
    const performScroll = () => {
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

    performScroll();
    setTimeout(performScroll, 20);
    setTimeout(performScroll, 80);
    setTimeout(performScroll, 200);
  };

  const resetToHome = () => {
    setPurchaseMode(null);
    setSingleSize(null);
    setComboPair1Size(null);
    setComboPair2Size(null);
    setSelectedSize(null);
    setIsComboCheckout(false);
    setActiveBrand('ALL');
    setCurrentView('HOME');
    scrollToAppTop();
  };

  const scrollToStep1 = () => {
    const el = document.getElementById('combo-builder-section') ||
               document.getElementById('step-1-single-card') || 
               document.getElementById('step-1-combo-card') || 
               document.getElementById('header-brand-nav-bar') ||
               document.getElementById('all-shoes-reels-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      scrollToAppTop();
    }
  };

  const navigateToHome = () => {
    resetToHome();
  };

  const navigateToStep1 = () => {
    if (currentView !== 'HOME') {
      setCurrentView('HOME');
      setTimeout(scrollToStep1, 100);
    } else {
      scrollToStep1();
    }
  };

  const navigateToView = (view: AppView) => {
    setCurrentView(view);
    scrollToAppTop();
  };

  const navigateToDetail = (shoe?: Shoe, customSize?: number, customColor?: string, autoOpenFullScreen?: boolean) => {
    const targetShoe = shoe || featuredShoe;
    setSelectedShoe(targetShoe);
    setSelectedSize(customSize !== undefined ? customSize : 8);
    setSelectedColor(customColor || targetShoe.colors[0] || 'Crimson Red');
    setIsComboCheckout(false);
    if (autoOpenFullScreen) {
      setOpenWithFullScreenVideo(true);
    }
    setCurrentView('DETAIL');
    scrollToAppTop();
  };

  const navigateToCheckoutSingle = (shoe: Shoe, size: number, color?: string) => {
    const chosenColor = color || shoe.colors[0] || 'Original';
    setSelectedShoe(shoe);
    setSelectedSize(size);
    setSelectedColor(chosenColor);
    setIsComboCheckout(false);

    const singleItem: CartItem = {
      cartItemId: `single-${shoe.id}-${size}-${Date.now()}`,
      shoe,
      selectedSize: size,
      selectedColor: chosenColor,
      quantity: 1
    };
    setCart([singleItem]);

    setCurrentView('CHECKOUT');
    scrollToAppTop();
  };

  const navigateToCheckoutCombo = () => {
    setIsComboCheckout(true);
    setCurrentView('CHECKOUT');
    scrollToAppTop();
  };

  const navigateToCheckoutComboWithPairs = (
    pair1: { shoe?: Shoe; size: number; color?: string },
    pair2: { shoe?: Shoe; size: number; color?: string }
  ) => {
    const s1 = pair1.shoe || comboPair1Shoe || featuredShoe;
    const s2 = pair2.shoe || comboPair2Shoe || featuredShoe;
    const chosenColor1 = pair1.color || s1.colors[0] || 'Original';
    const chosenColor2 = pair2.color || s2.colors[0] || 'Original';
    setComboSelection({
      item1: { shoe: s1, size: pair1.size, color: chosenColor1 },
      item2: { shoe: s2, size: pair2.size, color: chosenColor2 }
    });
    setIsComboCheckout(true);

    const item1: CartItem = {
      cartItemId: `combo-1-${s1.id}-${pair1.size}-${Date.now()}`,
      shoe: s1,
      selectedSize: pair1.size,
      selectedColor: chosenColor1,
      quantity: 1
    };
    const item2: CartItem = {
      cartItemId: `combo-2-${s2.id}-${pair2.size}-${Date.now() + 1}`,
      shoe: s2,
      selectedSize: pair2.size,
      selectedColor: chosenColor2,
      quantity: 1
    };
    setCart([item1, item2]);

    setCurrentView('CHECKOUT');
    scrollToAppTop();
  };

  const proceedToCheckout = () => {
    if (purchaseMode === 'SINGLE' && singleSize !== null) {
      navigateToCheckoutSingle(selectedShoe || featuredShoe, singleSize);
    } else if (purchaseMode === 'COMBO' && comboPair1Size !== null && comboPair2Size !== null) {
      navigateToCheckoutComboWithPairs(
        { shoe: comboPair1Shoe, size: comboPair1Size },
        { shoe: comboPair2Shoe, size: comboPair2Size }
      );
    } else {
      navigateToStep1();
    }
  };

  const navigateToSellingPage = () => {
    navigateToStep1();
  };

  const openComboBuilder = () => {
    setPurchaseMode('COMBO');
    const el = document.getElementById('combo-builder-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      navigateToStep1();
    }
  };

  const selectSinglePairMode = () => {
    setPurchaseMode('SINGLE');
    navigateToStep1();
  };

  const openComboBuilderWithShoe = (shoe: Shoe) => {
    setComboPair1Shoe(shoe);
    openComboBuilder();
  };

  const closeComboBuilder = () => {
    // No-op
  };

  const setComboItem1 = (shoe: Shoe, size: number, color?: string) => {
    setComboPair1Shoe(shoe);
    setComboPair1Size(size);
    setComboSelection(prev => ({
      ...prev,
      item1: { shoe, size, color: color || shoe.colors[0] }
    }));
  };

  const setComboItem2 = (shoe: Shoe, size: number, color?: string) => {
    setComboPair2Shoe(shoe);
    setComboPair2Size(size);
    setComboSelection(prev => ({
      ...prev,
      item2: { shoe, size, color: color || shoe.colors[0] }
    }));
  };

  const clearCombo = () => {
    setComboSelection({
      item1: { shoe: featuredShoe, size: 8, color: featuredShoe.colors[0] },
      item2: { shoe: shoes[12] || featuredShoe, size: 8, color: 'Triple White' }
    });
  };

  const setOrderSuccess = (order: PlacedOrder) => {
    setActiveOrder(order);
    setCurrentView('ORDER_SUCCESS');
    scrollToAppTop();
  };

  return (
    <StoreContext.Provider
      value={{
        shoes,
        featuredShoe,
        storeConfig,
        currentView,
        selectedShoe,
        selectedSize,
        selectedColor,
        isComboCheckout,
        comboSelection,
        activeOrder,
        activeBrand,
        setActiveBrand,
        brandList: SHOE_BRANDS,
        selectedReelShoe,
        isReelModalOpen,
        openReelModal,
        closeReelModal,
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateCartItemSize,
        clearCart,
        cartTotalCount,
        cartCombosCount,
        cartSinglesCount,
        combosCount: cartCombosCount,
        singlesCount: cartSinglesCount,
        cartTotalPrice,
        cartMrpTotal,
        cartComboSavings,
        cartNotification,
        dismissCartNotification,
        proceedToCheckoutWithCart,
        purchaseMode,
        singleSize,
        comboPair1Size,
        comboPair2Size,
        comboPair1Shoe,
        comboPair2Shoe,
        setComboPair1Shoe,
        setComboPair2Shoe,
        isComboOpen: currentView === 'COMBO_BUILDER',
        comboState: {
          pair1: comboSelection.item1 ? { shoe: comboSelection.item1.shoe, size: comboSelection.item1.size, color: comboSelection.item1.color } : (comboPair1Shoe ? { shoe: comboPair1Shoe, size: comboPair1Size || 8 } : null),
          pair2: comboSelection.item2 ? { shoe: comboSelection.item2.shoe, size: comboSelection.item2.size, color: comboSelection.item2.color } : (comboPair2Shoe ? { shoe: comboPair2Shoe, size: comboPair2Size || 8 } : null),
          isComplete: isComboReady
        },
        cartCount,
        isSingleReady,
        isComboReady,
        isSelectionComplete,
        openWithFullScreenVideo,
        setOpenWithFullScreenVideo,
        navigateToHome,
        resetToHome,
        navigateToStep1,
        navigateToDetail,
        navigateToShoeDetail: navigateToDetail,
        navigateToCheckoutSingle,
        navigateToCheckoutCombo,
        navigateToCheckoutComboWithPairs,
        proceedToCheckout,
        navigateToView,
        navigateToSellingPage,
        openComboBuilder,
        selectSinglePairMode,
        openComboBuilderWithShoe,
        closeComboBuilder,
        setSelectedSize,
        setSelectedColor,
        setPurchaseMode,
        setSingleSize,
        setComboPair1Size,
        setComboPair2Size,
        setComboItem1,
        setComboItem2,
        clearCombo,
        setOrderSuccess
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
