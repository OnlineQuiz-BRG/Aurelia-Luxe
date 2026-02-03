
import { Product, SiteContent } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  // RINGS
  {
    id: 'r1', sku: 'AUR-RG-001', name: 'Artisan Floral Kundan Ring',
    description: 'Exquisite handmade 1 gram gold plated ring featuring traditional Kundan work and blooming floral motifs.',
    basePrice: 1450, discount: 15, category: 'Rings', metalPurity: '1 Gram Gold', stoneType: 'Kundan',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '5.2g', hallmark: 'Handmade', isNew: true, isPopular: true, reviews: []
  },
  {
    id: 'r2', sku: 'AUR-RG-002', name: 'Temple Peacock Statement Ring',
    description: 'Traditional South Indian temple jewelry inspired ring with intricate peacock carvings and ruby highlights.',
    basePrice: 1800, discount: 10, category: 'Rings', metalPurity: '1 Gram Gold', stoneType: 'Ruby',
    images: ['https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '8.5g', hallmark: 'Handmade', isNew: false, isPopular: true, reviews: []
  },
  {
    id: 'r3', sku: 'AUR-RG-003', name: 'Filigree Eternity Band',
    description: 'A delicate handmade band featuring fine gold wire filigree work, gold-plated to perfection.',
    basePrice: 990, discount: 5, category: 'Rings', metalPurity: '1 Gram Gold', stoneType: 'None',
    images: ['https://images.unsplash.com/photo-1603561591411-071c4f753934?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '3.1g', hallmark: 'Handmade', isNew: true, isPopular: false, reviews: []
  },
  // NECKLACES
  {
    id: 'n1', sku: 'AUR-NK-001', name: 'Heritage Guttapusalu Mala',
    description: 'Traditional handmade 1 gram gold necklace adorned with clusters of fresh pearls and kemp rubies.',
    basePrice: 6500, discount: 20, category: 'Necklaces', metalPurity: '1 Gram Gold', stoneType: 'Pearl',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'Made to Order', weight: '48g', hallmark: 'Handmade', isNew: true, isPopular: true, reviews: []
  },
  {
    id: 'n2', sku: 'AUR-NK-002', name: 'Matte Finish Mango Necklace',
    description: 'Classic Mango Mala handcrafted in premium matte gold finish, perfect for festive attire.',
    basePrice: 4200, discount: 12, category: 'Necklaces', metalPurity: '1 Gram Gold', stoneType: 'Ruby',
    images: ['https://images.unsplash.com/photo-1626497748470-561d842f01f5?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '38g', hallmark: 'Handmade', isNew: false, isPopular: true, reviews: []
  },
  {
    id: 'n3', sku: 'AUR-NK-003', name: 'Filigree Locket Choker',
    description: 'Intricate handmade filigree choker with a central pendant featuring traditional Nakshi work.',
    basePrice: 3200, discount: 10, category: 'Necklaces', metalPurity: '1 Gram Gold', stoneType: 'None',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '22g', hallmark: 'Handmade', isNew: true, isPopular: false, reviews: []
  },
  // EARRINGS
  {
    id: 'e1', sku: 'AUR-ER-001', name: 'Bridal Chandbali Jhumkas',
    description: 'Royal bell-shaped handmade earrings with dangling pearls and ruby studs. 1 gram gold plated.',
    basePrice: 1950, discount: 15, category: 'Earrings', metalPurity: '1 Gram Gold', stoneType: 'Ruby',
    images: ['https://images.unsplash.com/photo-1630019058353-5ff322399882?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '16g', hallmark: 'Handmade', isNew: true, isPopular: true, reviews: []
  },
  {
    id: 'e2', sku: 'AUR-ER-002', name: 'Pearl Drop Nakshi Studs',
    description: 'Hand-carved gold studs featuring intricate Nakshi work and premium shell pearls.',
    basePrice: 1250, discount: 10, category: 'Earrings', metalPurity: '1 Gram Gold', stoneType: 'Pearl',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '12g', hallmark: 'Handmade', isNew: false, isPopular: false, reviews: []
  },
  {
    id: 'e3', sku: 'AUR-ER-003', name: 'Meenakari Peacock Danglers',
    description: 'Vibrant hand-painted meenakari earrings with gold plating and artisan floral motifs.',
    basePrice: 890, discount: 5, category: 'Earrings', metalPurity: '1 Gram Gold', stoneType: 'None',
    images: ['https://images.unsplash.com/photo-1629227314026-02e112ffb374?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '9g', hallmark: 'Handmade', isNew: true, isPopular: true, reviews: []
  },
  // BRACELETS
  {
    id: 'b1', sku: 'AUR-BR-001', name: 'Goddess Lakshmi Kada',
    description: 'Broad openable bangle with goddess Lakshmi motifs and semi-precious ruby stones.',
    basePrice: 3500, discount: 18, category: 'Bracelets', metalPurity: '1 Gram Gold', stoneType: 'Ruby',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '28g', hallmark: 'Handmade', isNew: true, isPopular: true, reviews: []
  },
  {
    id: 'b2', sku: 'AUR-BR-002', name: 'Artisan Bead Chain Bracelet',
    description: 'Thin gold chain bracelet with tiny handmade gold beads, perfect for daily elegance.',
    basePrice: 1250, discount: 10, category: 'Bracelets', metalPurity: '1 Gram Gold', stoneType: 'Pearl',
    images: ['https://images.unsplash.com/photo-1573408302185-9127ff5f6133?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '9g', hallmark: 'Handmade', isNew: false, isPopular: false, reviews: []
  },
  {
    id: 'b3', sku: 'AUR-BR-003', name: 'Dual Peacock Bangle Set',
    description: 'Set of two handmade bangles with intricate dual peacock carvings and a matte gold finish.',
    basePrice: 3800, discount: 15, category: 'Bracelets', metalPurity: '1 Gram Gold', stoneType: 'None',
    images: ['https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?auto=format&fit=crop&q=80&w=800'],
    stockStatus: 'In Stock', weight: '34g', hallmark: 'Handmade', isNew: true, isPopular: true, reviews: []
  }
];

export const INITIAL_SITE_CONTENT: SiteContent = {
  hero: {
    title: "Handmade Treasures of Indian Heritage",
    subtitle: "Discover the timeless elegance of artisanal 1-gram gold jewelry crafted with soul.",
    imageUrl: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&q=80&w=1920"
  },
  philosophy: {
    quote: "Jewelry is a reflection of the artisan's hands and the wearer's heart, a bridge between tradition and the modern soul.",
    author: "Aurelia Heritage Circle"
  },
  social: {
    instagram: "@aurelia_heritage_gold",
    facebook: "Aurelia Luxe Handmade",
    pinterest: "aurelia_luxe_indian_jewelry"
  }
};

export const PRICING_RULES = {
  metal: {
    '14k Gold': 2500,
    '18k Gold': 4000,
    '24k Gold': 6000,
    'Platinum': 7500,
    '1 Gram Gold': 0
  },
  stone: {
    'Diamond': 12000,
    'Emerald': 6000,
    'Sapphire': 5000,
    'Ruby': 4500,
    'None': 0,
    'Pearl': 900,
    'Kundan': 1500
  }
};
