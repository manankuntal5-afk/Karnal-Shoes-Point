import { Shoe, StoreConfig } from '../types';

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  storeName: "Karnal Shoes Point",
  tagline: "India's #1 Trending Footwear Store",
  helplinePhone: "+91 98290 87654",
  helplineWhatsapp: "+91 98290 87654",
  email: "support@karnalshoespoint.in",
  storeAddress: "Karnal Shoes Point, Main Market, Railway Road, Karnal, Haryana - 132001",
  upiId: "97229722972@ybl",
  merchantName: "Karnal Shoes Point",
  customQrUrl: "/images/phonepe-qr-square.png"
};

export interface BrandInfo {
  id: string;
  name: string;
  displayName: string;
  shortName: string;
  logo: string;
  tagline: string;
  badge: string;
  accentColor: string;
  bgGradient: string;
  shoeCount: number;
}

// Exactly the 2 companies requested: Nike (12 models) & Puma (11 models)
export const SHOE_BRANDS: BrandInfo[] = [
  {
    id: "Nike",
    name: "Nike",
    displayName: "Nike",
    shortName: "Nike",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&auto=format&fit=crop&q=80",
    tagline: "Nike Model-1 to Model-12 Exclusive High-Performance Collection",
    badge: "12 Models",
    accentColor: "#ef4444",
    bgGradient: "from-rose-500/20 via-red-500/15 to-orange-500/10",
    shoeCount: 12
  },
  {
    id: "Puma",
    name: "Puma",
    displayName: "Puma",
    shortName: "Puma",
    logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=120&auto=format&fit=crop&q=80",
    tagline: "Puma Model-1 to Model-11 Nitro Speed & Softride Series",
    badge: "11 Models",
    accentColor: "#10b981",
    bgGradient: "from-emerald-500/20 via-teal-500/15 to-cyan-500/10",
    shoeCount: 11
  }
];

export interface ShoeSeed {
  id: number;
  brand: 'Nike' | 'Puma';
  name: string;
  tagline: string;
  category: 'Running' | 'Sneakers' | 'Casual' | 'Sports' | 'Loafers' | 'High-Top';
  badge: string;
  reviews: number;
  likes: number;
  videoUrl: string;
}

// ============================================================================
// EXACTLY 23 SHOE MODELS:
// 1. Nike: 12 models (Nike Model-1 to Nike Model-12)
// 2. Puma: 11 models (Puma Model-1 to Puma Model-11)
// ALL SHOES HAVE 7,000 - 15,000 REVIEWS & RATINGS 4.6 - 4.9 & SIZES 5 TO 12!
// ============================================================================

export const RAW_SEEDS: ShoeSeed[] = [
  // 1. NIKE - 12 MODELS (Nike Model-1 to Nike Model-12)
  { id: 1, brand: "Nike", name: "Nike Model-1", tagline: "Responsive Zoom Air cushioning with breathable flymesh upper", category: "Running", badge: "Best Seller 🔥", reviews: 14280, likes: 38400, videoUrl: "/videos/nike-01.mp4" },
  { id: 2, brand: "Nike", name: "Nike Model-2", tagline: "Point-loaded Air unit providing springy bounce all day", category: "Sneakers", badge: "Trending ⚡", reviews: 12620, likes: 42100, videoUrl: "/videos/nike-02.mp4" },
  { id: 3, brand: "Nike", name: "Nike Model-3", tagline: "Engineered rocker sole to guide smooth foot transitions", category: "Running", badge: "Top Rated ★", reviews: 11340, likes: 29800, videoUrl: "/videos/nike-03.mp4" },
  { id: 4, brand: "Nike", name: "Nike Model-4", tagline: "Supportive midfoot band with lightweight breathable mesh", category: "Sports", badge: "Hot Drop 🔥", reviews: 13810, likes: 34500, videoUrl: "/videos/nike-04.mp4" },
  { id: 5, brand: "Nike", name: "Nike Model-5", tagline: "Soft foam cushioning with cushioned heel puff collar", category: "Running", badge: "Value Deal 💰", reviews: 9750, likes: 31200, videoUrl: "/videos/nike-05.mp4" },
  { id: 6, brand: "Nike", name: "Nike Model-6", tagline: "Maximum rebound cushion for heavy duty running & gym", category: "Sports", badge: "Pro Grade 🏅", reviews: 14610, likes: 44000, videoUrl: "/videos/nike-06.mp4" },
  { id: 7, brand: "Nike", name: "Nike Model-7", tagline: "Classic 80s basketball styling with durable rubber cupsole", category: "Casual", badge: "Streetwear ⭐", reviews: 8990, likes: 27900, videoUrl: "/videos/nike-07.mp4" },
  { id: 8, brand: "Nike", name: "Nike Model-8", tagline: "Encapsulated Air-Sole unit with premium stitched leather", category: "Sneakers", badge: "Viral Classic ⚡", reviews: 14940, likes: 51200, videoUrl: "/videos/nike-08.mp4" },
  { id: 9, brand: "Nike", name: "Nike Model-9", tagline: "Two-tone leather upper with padded low-cut collar", category: "Sneakers", badge: "Bestseller 🏆", reviews: 13870, likes: 49300, videoUrl: "/videos/nike-09.mp4" },
  { id: 10, brand: "Nike", name: "Nike Model-10", tagline: "Legendary Nike Air cushioning with durable crisp leather", category: "Casual", badge: "Iconic White 🤍", reviews: 12690, likes: 46100, videoUrl: "/videos/nike-10.mp4" },
  { id: 11, brand: "Nike", name: "Nike Model-11", tagline: "Hyperlift plate in heel for stability during heavy squats", category: "Sports", badge: "Gym Beast 💥", reviews: 10430, likes: 36700, videoUrl: "/videos/nike-11.mp4" },
  { id: 12, brand: "Nike", name: "Nike Model-12", tagline: "Full-length Nike Air cushioning with roomier toe box", category: "Running", badge: "Comfort Daily ☁️", reviews: 9280, likes: 30400, videoUrl: "/videos/nike-12.mp4" },

  // 2. PUMA - 11 MODELS (Puma Model-1 to Puma Model-11)
  { id: 13, brand: "Puma", name: "Puma Model-1", tagline: "Advanced NITRO foam technology for ultra-lightweight spring", category: "Running", badge: "Hot Drop 🔥", reviews: 13560, likes: 41300, videoUrl: "/videos/puma-01.mp4" },
  { id: 14, brand: "Puma", name: "Puma Model-2", tagline: "Softride EVA foam with aggressive clamshell ankle support", category: "Sports", badge: "Trending ⚡", reviews: 11380, likes: 32600, videoUrl: "/videos/puma-02.mp4" },
  { id: 15, brand: "Puma", name: "Puma Model-3", tagline: "INNOPLATE carbon composite propulsion for explosive takeoffs", category: "Running", badge: "Pro Grade 🏅", reviews: 14780, likes: 45700, videoUrl: "/videos/puma-03.mp4" },
  { id: 16, brand: "Puma", name: "Puma Model-4", tagline: "Clean silhouette with SoftFoam+ optimal step-in comfort", category: "Casual", badge: "Comfort Pick ☁️", reviews: 8810, likes: 28400, videoUrl: "/videos/puma-04.mp4" },
  { id: 17, brand: "Puma", name: "Puma Model-5", tagline: "TPU midfoot shank for extreme stability and heel shock absorption", category: "Sports", badge: "High Grip 🛡️", reviews: 12490, likes: 36800, videoUrl: "/videos/puma-05.mp4" },
  { id: 18, brand: "Puma", name: "Puma Model-6", tagline: "Bi-density NITRO and ProFoam Lite for responsive jogging", category: "Running", badge: "Best Seller ★", reviews: 10320, likes: 33500, videoUrl: "/videos/puma-06.mp4" },
  { id: 19, brand: "Puma", name: "Puma Model-7", tagline: "Futuristic 1980s retro running revival with bold color-blocking", category: "Sneakers", badge: "Chunky Viral 🚀", reviews: 14190, likes: 47200, videoUrl: "/videos/puma-07.mp4" },
  { id: 20, brand: "Puma", name: "Puma Model-8", tagline: "Timeless suede upper with gold foil branding and rubber cupsole", category: "Casual", badge: "Heritage Icon ⭐", reviews: 11950, likes: 39100, videoUrl: "/videos/puma-08.mp4" },
  { id: 21, brand: "Puma", name: "Puma Model-9", tagline: "Full length rubber coverage with flex grooves for natural motion", category: "Running", badge: "Fast Pace ⚡", reviews: 8930, likes: 27500, videoUrl: "/videos/puma-09.mp4" },
  { id: 22, brand: "Puma", name: "Puma Model-10", tagline: "Breathable engineered mesh with molded synthetic midfoot cage", category: "Sports", badge: "Gym Ready 💥", reviews: 12640, likes: 35800, videoUrl: "/videos/puma-10.mp4" },
  { id: 23, brand: "Puma", name: "Puma Model-11", tagline: "Exaggerated sole thickness for supreme shock attenuation", category: "Running", badge: "Cloud Walk ☁️", reviews: 13780, likes: 43600, videoUrl: "/videos/puma-11.mp4" }
];

// Compile all 23 shoes with complete details, flat ₹389 pricing, 2-pairs combo ₹700, 7k-15k reviews, ratings 4.6-4.9, and sizes 5 to 12
export const INITIAL_SHOES_DATA: Shoe[] = RAW_SEEDS.map((seed, index) => {
  let thumbnail: string;
  if (seed.id >= 1 && seed.id <= 12) {
    const padId = String(seed.id).padStart(2, '0');
    thumbnail = `/thumbnails/nike-${padId}.jpg`;
  } else {
    const pumaModelNum = seed.id - 12; // 1 to 11
    const padId = String(pumaModelNum).padStart(2, '0');
    thumbnail = `/thumbnails/puma-${padId}.jpg`;
  }

  // Colors available for this shoe
  const colorOptions = [
    ["Crimson Red", "Jet Black", "Steel Grey", "Navy Blue"],
    ["Triple White", "Volt Green", "Midnight Blue", "Onyx Black"],
    ["Electric Orange", "Slate Grey", "Pure Black", "Aqua Blue"],
    ["Neon Lime", "Carbon Black", "Frost White", "Royal Blue"]
  ][index % 4];

  // Dynamic rating between 4.6 and 4.9 (4 to 5 stars)
  const rating = Number((4.6 + ((index * 3) % 4) * 0.1).toFixed(1));

  return {
    id: seed.id,
    brand: seed.brand,
    name: seed.name,
    tagline: seed.tagline,
    category: seed.category,
    price: 389,
    originalPrice: 1999,
    discountPercentage: 81,
    rating,
    totalReviews: seed.reviews, // Guaranteed between 7,000 and 15,000 reviews
    reelLikes: seed.likes,
    videoUrl: seed.videoUrl,
    thumbnail,
    galleryImages: [
      thumbnail,
      thumbnail
    ],
    colors: colorOptions,
    sizes: [5, 6, 7, 8, 9, 10, 11, 12], // ALL SHOES HAVE SIZES 5 TO 12
    badge: seed.badge,
    description: `Engineered for running, jogging, gym workouts, and stylish daily wear. Features shock-absorbing air cushion sole, breathable honeycomb knit aeromesh to keep feet cool and odor-free, and high-traction grooved vulcanized rubber grip designed for Indian roads, gyms, and sports grounds. Available at flat promotional factory price of ₹389 or get the 2-Pairs Combo for ₹700 with Free Express Shipping across India.`,
    features: [
      "Heavy-Duty Shock-Absorbing Air Cushion Sole",
      "Breathable Honeycomb Knit Mesh (Washable & Odor-Free)",
      "High-Traction Anti-Skid Rubber Grip for Indian Roads",
      "Ergonomic Featherweight Construction (Only ~310g)",
      "Anti-Blister Padded Insole & Ankle Collar",
      "Standard Indian UK Sizes 5 to 12"
    ],
    stockCount: 18 + (index * 3) % 25
  };
});
