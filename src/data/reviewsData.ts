import { CustomerReview } from '../types';

const INDIAN_BUYER_NAMES = [
  { name: "Rajesh Kumar Sharma", city: "Jaipur", state: "Rajasthan" },
  { name: "Amitabh Verma", city: "Lucknow", state: "Uttar Pradesh" },
  { name: "Vikram Rathore", city: "Jodhpur", state: "Rajasthan" },
  { name: "Priya Patel", city: "Ahmedabad", state: "Gujarat" },
  { name: "Deepak Singh Rawat", city: "Dehradun", state: "Uttarakhand" },
  { name: "Suresh Yadav", city: "Gurugram", state: "Haryana" },
  { name: "Manoj Kumar Gupta", city: "Patna", state: "Bihar" },
  { name: "Arvind Joshi", city: "Pune", state: "Maharashtra" },
  { name: "Rohit Meena", city: "Kota", state: "Rajasthan" },
  { name: "Sunita Choudhary", city: "Indore", state: "Madhya Pradesh" },
  { name: "Naveen Rao", city: "Hyderabad", state: "Telangana" },
  { name: "Manish Jain", city: "Udaipur", state: "Rajasthan" },
  { name: "Pooja Sharma", city: "Chandigarh", state: "Punjab" },
  { name: "Gaurav Malhotra", city: "Delhi NCR", state: "Delhi" },
  { name: "Kailash Tiwari", city: "Varanasi", state: "Uttar Pradesh" },
  { name: "Dinesh Patel", city: "Surat", state: "Gujarat" },
  { name: "Rameshwar Sen", city: "Bhopal", state: "Madhya Pradesh" },
  { name: "Anand Murthy", city: "Bengaluru", state: "Karnataka" },
  { name: "Mohit Choudhary", city: "Ajmer", state: "Rajasthan" },
  { name: "Subhash Chandra", city: "Ranchi", state: "Jharkhand" },
  { name: "Jitendra Solanki", city: "Vadodara", state: "Gujarat" },
  { name: "Ashok Verma", city: "Kanpur", state: "Uttar Pradesh" },
  { name: "Harish Nair", city: "Kochi", state: "Kerala" },
  { name: "Balraj Singh", city: "Amritsar", state: "Punjab" },
  { name: "Prashant Kulkarni", city: "Nagpur", state: "Maharashtra" },
  { name: "Mahesh Agarwal", city: "Agra", state: "Uttar Pradesh" },
  { name: "Devendra Bishnoi", city: "Bikaner", state: "Rajasthan" },
  { name: "Kunal Deshmukh", city: "Nashik", state: "Maharashtra" },
  { name: "Satish Chauhan", city: "Faridabad", state: "Haryana" },
  { name: "Pankaj Saini", city: "Alwar", state: "Rajasthan" }
];

const POSITIVE_REVIEW_COMMENTS = [
  "Honestly surprised by the quality for just Rs 389! The air cushion grip is super firm and the shoes look exactly like shown in the video clip. Full value for money!",
  "I bought the 2 pairs combo pack for Rs 700. Got free express delivery in just 4 days to my village. Very lightweight and soft on feet.",
  "Video and HD photos helped me see the exact flexibility of the air cushion sole. Wearing it for morning running since 2 weeks, no pain at all. 5 stars from me!",
  "Great finishing! Usually online shoes disappoint, but Karnal Shoes Point provided genuine product. Will order another pair for my brother in the Rs 700 combo deal.",
  "Super comfortable memory foam insole. My daily duty is 8 hours standing and my heels feel relaxed now. Thank you Karnal Shoes Point team!",
  "Payment by PhonePe was smooth and easy. Received my order slip immediately and package reached in 4 days in neat condition.",
  "Value for money deal! Slashed from Rs 1999 to Rs 389 is 100% genuine discount. Shoes look like a Rs 2500 branded showroom pair.",
  "Size fits accurately according to Indian UK chart. I wear size 8 and it fits with good toe space. Highly recommended to all!",
  "The mesh fabric is very airy and keeps socks odorless during hot afternoons. Sturdy stitches and nice clean look.",
  "Order slip with helpline number gave me confidence to pay online. Customer care responded quickly on WhatsApp when I asked for tracking.",
  "Bought 2 pairs in Rs 700 combo offer. Both pairs are awesome. Free delivery was really fast.",
  "The video clip and zoom photos showed real details. Exactly the same shoe came in the parcel. Very happy buyer!",
  "Rubber sole doesn't slip on wet tiles or bike footpegs. Excellent build quality for daily rough use.",
  "Tying laces is smooth and the collar padding prevents shoe bite blisters. Good job!",
  "Everyone in my gym asked me where I bought these cool sneakers from. Shared your website link with them!"
];

const AVATAR_URLS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
];

// Generates paginated reviews on demand without lagging the browser
export function getReviewsForShoe(
  shoeId: number,
  page: number = 1,
  pageSize: number = 10
): {
  reviews: CustomerReview[];
  currentPage: number;
  totalPages: number;
  totalReviews: number;
} {
  // Deterministic seed based on shoeId so each shoe gets realistic ratings & reviews
  // Generates 8,000 to 15,000 realistic Indian reviews per shoe model (User Request)
  const baseCount = 8200 + ((shoeId * 239) % 6700);
  const totalReviews = baseCount;
  const totalPages = Math.ceil(totalReviews / pageSize);

  const startIndex = (page - 1) * pageSize;
  const reviews: CustomerReview[] = [];

  for (let i = 0; i < pageSize; i++) {
    const reviewIndex = startIndex + i;
    if (reviewIndex >= totalReviews) break;

    const personIndex = (shoeId * 7 + reviewIndex * 13) % INDIAN_BUYER_NAMES.length;
    const commentIndex = (shoeId * 3 + reviewIndex * 11) % POSITIVE_REVIEW_COMMENTS.length;
    const avatarIndex = (shoeId * 2 + reviewIndex) % AVATAR_URLS.length;
    const buyer = INDIAN_BUYER_NAMES[personIndex];

    // Rating: 85% are 5 stars, 15% are 4 stars (average between 4.5 and 4.9)
    const isFiveStar = (shoeId + reviewIndex) % 7 !== 0;
    const rating = isFiveStar ? 5 : 4;

    const daysAgo = (reviewIndex % 28) + 1;
    const dateStr = daysAgo === 1 ? "Yesterday" : `${daysAgo} days ago`;

    const size = [7, 8, 9, 10, 6][(shoeId + reviewIndex) % 5];
    const helpfulCount = 12 + ((reviewIndex * 7) % 65);

    reviews.push({
      id: `rev-${shoeId}-${reviewIndex}`,
      name: buyer.name,
      city: buyer.city,
      state: buyer.state,
      rating,
      date: dateStr,
      comment: POSITIVE_REVIEW_COMMENTS[commentIndex],
      verifiedPurchase: true,
      avatar: AVATAR_URLS[avatarIndex],
      purchasedSize: size,
      helpfulCount
    });
  }

  return {
    reviews,
    currentPage: page,
    totalPages,
    totalReviews
  };
}
