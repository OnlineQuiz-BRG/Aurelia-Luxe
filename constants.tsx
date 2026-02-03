
import { Product, SiteContent } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  // RINGS
  {
    id: 'r1', sku: 'AUR-RG-001', name: 'Handcrafted Floral Kundan Ring',
    description: 'Exquisite handmade 1 gram gold plated ring featuring traditional Kundan work and floral motifs.',
    basePrice: 1250, discount: 10, category: 'Rings', metalPurity: '1 Gram Gold', stoneType: 'Kundan',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '5g', hallmark: 'Handmade', isNew: true, isPopular: true, reviews: []
  },
  {
    id: 'r2', sku: 'AUR-RG-002', name: 'Antique Lakshmi Peacock Ring',
    description: 'Traditional South Indian temple jewelry inspired ring with intricate peacock carvings.',
    basePrice: 1800, discount: 15, category: 'Rings', metalPurity: '1 Gram Gold', stoneType: 'Ruby',
    images: ['https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '8g', hallmark: 'Handmade', isNew: false, isPopular: true, reviews: []
  },
  {
    id: 'r3', sku: 'AUR-RG-003', name: 'Minimalist Gold Bead Ring',
    description: 'Simple yet elegant handmade ring with tiny gold beads, perfect for daily wear.',
    basePrice: 950, discount: 5, category: 'Rings', metalPurity: '1 Gram Gold', stoneType: 'None',
    images: ['https://images.unsplash.com/photo-1603561591411-071c4f753934?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '3g', hallmark: 'Handmade', isNew: true, isPopular: false, reviews: []
  },
  // NECKLACES
  {
    id: 'n1', sku: 'AUR-NK-001', name: 'Heritage Guttapusalu Necklace',
    description: 'Traditional handmade 1 gram gold necklace adorned with clusters of pearls and rubies.',
    basePrice: 4500, discount: 20, category: 'Necklaces', metalPurity: '1 Gram Gold', stoneType: 'Pearl',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'Made to Order', weight: '45g', hallmark: 'Handmade', isNew: true, isPopular: true, reviews: []
  },
  {
    id: 'n2', sku: 'AUR-NK-002', name: 'Matte Finish Mango Mala',
    description: 'Classic South Indian Mango Mala handcrafted in premium matte gold plating.',
    basePrice: 3800, discount: 12, category: 'Necklaces', metalPurity: '1 Gram Gold', stoneType: 'Ruby',
    images: ['https://images.unsplash.com/photo-1626497748470-561d842f01f5?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '35g', hallmark: 'Handmade', isNew: false, isPopular: true, reviews: []
  },
  {
    id: 'n3', sku: 'AUR-NK-003', name: 'Delicate Filigree Choker',
    description: 'Intricate wire-work filigree choker handmade by master artisans.',
    basePrice: 2200, discount: 10, category: 'Necklaces', metalPurity: '1 Gram Gold', stoneType: 'None',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '20g', hallmark: 'Handmade', isNew: true, isPopular: false, reviews: []
  },
  // EARRINGS
  {
    id: 'e1', sku: 'AUR-ER-001', name: 'Grand Jhumkas with Ruby',
    description: 'Royal bell-shaped handmade earrings with dangling pearls and ruby studs.',
    basePrice: 1500, discount: 15, category: 'Earrings', metalPurity: '1 Gram Gold', stoneType: 'Ruby',
    images: ['https://images.unsplash.com/photo-1630019058353-5ff322399882?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '15g', hallmark: 'Handmade', isNew: true, isPopular: true, reviews: []
  },
  {
    id: 'e2', sku: 'AUR-ER-002', name: 'Traditional Chandbali Studs',
    description: 'Moon-shaped festive earrings featuring micro-plating and kundan stones.',
    basePrice: 1200, discount: 8, category: 'Earrings', metalPurity: '1 Gram Gold', stoneType: 'Kundan',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '12g', hallmark: 'Handmade', isNew: false, isPopular: false, reviews: []
  },
  {
    id: 'e3', sku: 'AUR-ER-003', name: 'Hand-Painted Meenakari Drops',
    description: 'Vibrant meenakari work earrings with gold plating and bird motifs.',
    basePrice: 850, discount: 5, category: 'Earrings', metalPurity: '1 Gram Gold', stoneType: 'None',
    images: ['https://images.unsplash.com/photo-1629227314026-02e112ffb374?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '10g', hallmark: 'Handmade', isNew: true, isPopular: true, reviews: []
  },
  // BRACELETS
  {
    id: 'b1', sku: 'AUR-BR-001', name: 'Traditional Temple Kada',
    description: 'Broad openable bangle with goddess motifs and semi-precious stones.',
    basePrice: 2500, discount: 18, category: 'Bracelets', metalPurity: '1 Gram Gold', stoneType: 'Ruby',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '25g', hallmark: 'Handmade', isNew: true, isPopular: true, reviews: []
  },
  {
    id: 'b2', sku: 'AUR-BR-002', name: 'Delicate Pearl Chain Bracelet',
    description: 'Thin gold chain bracelet with tiny freshwater pearls, handmade for elegance.',
    basePrice: 1100, discount: 10, category: 'Bracelets', metalPurity: '1 Gram Gold', stoneType: 'Pearl',
    images: ['https://images.unsplash.com/photo-1573408302185-9127ff5f6133?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '8g', hallmark: 'Handmade', isNew: false, isPopular: false, reviews: []
  },
  {
    id: 'b3', sku: 'AUR-BR-003', name: 'Nakshi Work Bangle Set',
    description: 'Set of two handmade bangles with intricate Nakshi carvings and matte gold finish.',
    basePrice: 3200, discount: 15, category: 'Bracelets', metalPurity: '1 Gram Gold', stoneType: 'None',
    images: ['https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '30g', hallmark: 'Handmade', isNew: true, isPopular: true, reviews: []
  }
];

export const INITIAL_SITE_CONTENT: SiteContent = {
  hero: {
    title: "The Soul of Indian Craftsmanship",
    subtitle: "Experience the elegance of handmade 1-gram gold jewelry designed for the modern queen.",
    imageUrl: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&q=80&w=1920"
  },
  philosophy: {
    quote: "Every piece of jewelry is a story told by the hands that shaped it, carrying the legacy of Indian heritage.",
    author: "Aurelia Luxe Master Artisans"
  },
  social: {
    instagram: "@aurelia_handmade_jewelry",
    facebook: "Aurelia Luxe Boutique",
    pinterest: "aurelia_luxe_crafts"
  }
};

export const PRICING_RULES = {
  metal: {
    '14k Gold': 2000,
    '18k Gold': 3500,
    '24k Gold': 5000,
    'Platinum': 6000,
    '1 Gram Gold': 0 // Base price usually includes plating
  },
  stone: {
    'Diamond': 10000,
    'Emerald': 5000,
    'Sapphire': 4000,
    'Ruby': 3500,
    'None': 0,
    'Pearl': 800,
    'Kundan': 1200
  }
};
