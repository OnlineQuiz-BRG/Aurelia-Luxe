
import React, { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import { Product } from '../types';

const Wishlist: React.FC = () => {
  const { currentUser, products } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const wishlistProducts = products.filter(p => currentUser?.wishlist.includes(p.id));

  return (
    <div className="page-transition py-12 px-4 max-w-7xl mx-auto min-h-[60vh]">
      <header className="mb-16 text-center space-y-4">
        <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart size={32} className="text-gold" fill="currentColor" />
        </div>
        <p className="text-gold uppercase tracking-widest text-xs font-bold">The Private Gallery</p>
        <h1 className="text-5xl font-serif text-charcoal">Treasured Items</h1>
        <p className="text-sm text-charcoal/50 italic font-light tracking-widest">Your curated selection of fine pieces.</p>
      </header>

      {!currentUser ? (
        <div className="text-center py-24 space-y-8">
          <p className="text-xl font-serif italic text-charcoal/40">Please sign in to view your treasured gallery.</p>
          <button 
            onClick={() => window.location.hash = '/profile'}
            className="bg-charcoal text-cream px-12 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold transition-all"
          >
            Sign In / Register
          </button>
        </div>
      ) : wishlistProducts.length === 0 ? (
        <div className="text-center py-24 space-y-8">
          <p className="text-xl font-serif italic text-charcoal/40">Your gallery is currently empty.</p>
          <button 
            onClick={() => window.location.hash = '/catalog'}
            className="text-gold border-b border-gold pb-1 uppercase tracking-widest text-xs font-bold inline-flex items-center space-x-2"
          >
            <span>Begin Your Collection</span>
            <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={(p) => setSelectedProduct(p)} 
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <QuickView 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Wishlist;
