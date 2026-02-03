
export type MetalPurity = '14k Gold' | '18k Gold' | '24k Gold' | 'Platinum' | '1 Gram Gold';
export type StoneType = 'Diamond' | 'Emerald' | 'Sapphire' | 'Ruby' | 'None' | 'Pearl' | 'Kundan';
export type StockStatus = 'In Stock' | 'Made to Order';

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  basePrice: number;
  discount?: number; // Percentage discount
  category: string;
  metalPurity: MetalPurity;
  stoneType: StoneType;
  images: string[];
  stockStatus: StockStatus;
  weight: string;
  hallmark: string;
  isNew: boolean;
  isPopular: boolean;
  reviews: ProductReview[];
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Completed';
  refNumber: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedMetal?: MetalPurity;
  selectedStone?: StoneType;
  finalPrice: number;
}

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  isAdmin: boolean;
  isApproved: boolean; // Added for registration review flow
  orderHistory: Order[];
  isSubscribed: boolean;
  wishlist: string[]; // Product IDs
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    imageUrl: string;
  };
  philosophy: {
    quote: string;
    author: string;
  };
  social: {
    instagram: string;
    facebook: string;
    pinterest: string;
  };
}

export interface StoreState {
  products: Product[];
  currentUser: User | null;
  users: User[]; // Store multiple users for admin management
  cart: CartItem[];
  siteContent: SiteContent;
  categories: string[];
}
