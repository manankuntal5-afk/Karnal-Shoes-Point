import React, { useMemo } from 'react';
import { 
  ShieldCheck, Truck, RotateCcw, CheckCircle2, Zap, 
  Sparkles, ArrowRight, Check, Flame, Award, Heart, Phone,
  Play, Eye
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ReelsCard } from './ReelsCard';
import { ComboBuilderSection } from './ComboBuilderSection';
import { BrandViewPage } from './BrandViewPage';
import { AllShoesShoppingView } from './AllShoesShoppingView';
import { SHOE_BRANDS } from '../data/shoesData';
import { Logo } from './Logo';

export const HomePage: React.FC = () => {
  const { 
    shoes, 
    activeBrand, 
    setActiveBrand, 
    openComboBuilder, 
    featuredShoe 
  } = useStore();

  // Exactly Nike's 12 shoes for the Home Page
  const nikeShoes = useMemo(() => {
    return shoes.filter(s => s.brand.toLowerCase() === 'nike');
  }, [shoes]);

  // Default Home Page: When activeBrand === 'ALL' (the default), display All Shoes with all 58 models!
  if (activeBrand === 'ALL') {
    return <AllShoesShoppingView />;
  }

  // If user selected Nike or any other brand (Puma, Adidas, NB, Asics, Other Brands), show that brand page
  return <BrandViewPage brandName={activeBrand} />;
};

