
import { Product, SiteContent } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'AUR-RG-001',
    name: 'Aurelia Solitaire Diamond Ring',
    description: 'A timeless expression of elegance, featuring a brilliant-cut ethically sourced diamond set in a minimalist band.',
    basePrice: 4500,
    category: 'Rings',
    metalPurity: '18k Gold',
    stoneType: 'Diamond',
    images: ['https://picsum.photos/id/111/800/1000', 'https://picsum.photos/id/112/800/1000'],
    stockStatus: 'In Stock',
    weight: '4.2g',
    hallmark: '750',
    isNew: true,
    isPopular: true,
    reviews: [
      { id: 'r1', userName: 'Seraphina V.', rating: 5, comment: 'Absolutely stunning. The craftsmanship is unparalleled.', date: '2023-10-12' }
    ]
  },
  {
    id: '2',
    sku: 'AUR-NK-002',
    name: 'Emerald Cascade Necklace',
    description: 'Inspired by the lush gardens of Versailles, this necklace features vibrant emeralds surrounded by a halo of micro-diamonds.',
    basePrice: 12800,
    category: 'Necklaces',
    metalPurity: '18k Gold',
    stoneType: 'Emerald',
    images: ['https://picsum.photos/id/123/800/1000', 'https://picsum.photos/id/124/800/1000'],
    stockStatus: 'Made to Order',
    weight: '12.5g',
    hallmark: '750',
    isNew: false,
    isPopular: true,
    reviews: []
  },
  {
    id: '3',
    sku: 'AUR-ER-003',
    name: 'Celestial Pearl Drop Earrings',
    description: 'Luminous South Sea pearls dangling from a constellation of white gold and diamonds.',
    basePrice: 3200,
    category: 'Earrings',
    metalPurity: '14k Gold',
    stoneType: 'Diamond',
    images: ['https://picsum.photos/id/132/800/1000', 'https://picsum.photos/id/133/800/1000'],
    stockStatus: 'In Stock',
    weight: '6.8g',
    hallmark: '585',
    isNew: true,
    isPopular: false,
    reviews: []
  },
  {
    id: '4',
    sku: 'AUR-BR-004',
    name: 'Midnight Sapphire Cuff',
    description: 'A bold statement piece in blackened platinum, encrusted with deep blue sapphires that catch the light like a midnight sky.',
    basePrice: 8900,
    category: 'Bracelets',
    metalPurity: 'Platinum',
    stoneType: 'Sapphire',
    images: ['https://picsum.photos/id/145/800/1000', 'https://picsum.photos/id/146/800/1000'],
    stockStatus: 'In Stock',
    weight: '24.1g',
    hallmark: '950',
    isNew: false,
    isPopular: false,
    reviews: []
  }
];

export const INITIAL_SITE_CONTENT: SiteContent = {
  hero: {
    title: "Timeless Artistry for the Modern Soul",
    subtitle: "Discover our curated collection of ethically sourced, handcrafted jewelry.",
    imageUrl: "https://picsum.photos/id/42/1920/1080"
  },
  philosophy: {
    quote: "Jewelry is not merely an ornament; it is an artifact of one's journey and a beacon of one's legacy.",
    author: "Aurelia Luxe Heritage"
  },
  social: {
    instagram: "@aurelia_luxe",
    facebook: "Aurelia Luxe Boutique",
    pinterest: "aurelia_luxe_jewelry"
  }
};

export const PRICING_RULES = {
  metal: {
    '14k Gold': 0,
    '18k Gold': 400,
    '24k Gold': 900,
    'Platinum': 1500
  },
  stone: {
    'Diamond': 1000,
    'Emerald': 800,
    'Sapphire': 600,
    'Ruby': 700,
    'None': 0
  }
};
