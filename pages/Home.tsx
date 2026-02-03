
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Diamond } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import { Product } from '../types';

const Home: React.FC = () => {
  const { siteContent, products } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featured = products.filter(p => p.isPopular).slice(0, 4);

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <img 
          src={siteContent.hero.imageUrl} 
          alt="Luxury Jewelry" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center text-center p-4">
          <div className="max-w-4xl space-y-8 animate-in fade-in zoom-in duration-1000">
            <p className="text-gold uppercase tracking-widest-luxury text-sm font-bold">Aurelia Luxe Boutique</p>
            <h1 className="text-5xl md:text-8xl text-white font-serif tracking-tight leading-tight">
              {siteContent.hero.title}
            </h1>
            <p className="text-white/80 text-lg font-light tracking-widest italic max-w-2xl mx-auto">
              {siteContent.hero.subtitle}
            </p>
            <div className="pt-8">
              <Link 
                to="/catalog" 
                className="bg-gold text-white px-12 py-5 uppercase tracking-widest-luxury text-xs font-bold hover:bg-white hover:text-charcoal transition-all shadow-2xl inline-block"
              >
                View the Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <p className="text-gold uppercase tracking-widest-luxury text-xs font-bold mb-4">Curated Selection</p>
              <h2 className="text-4xl font-serif text-charcoal">Featured Treasures</h2>
            </div>
            <Link to="/catalog" className="text-charcoal border-b border-gold pb-1 uppercase tracking-widest text-[10px] font-bold flex items-center space-x-2 hover:text-gold transition-colors">
              <span>Explore All Pieces</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={(p) => setSelectedProduct(p)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 bg-charcoal text-cream relative overflow-hidden">
        <div className="absolute -top-24 -right-24 text-gold/5 pointer-events-none">
          <Diamond size={400} />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center space-y-12 relative z-10">
          <Diamond size={32} className="mx-auto text-gold mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif italic leading-relaxed">
            "{siteContent.philosophy.quote}"
          </h2>
          <div className="space-y-2">
            <p className="uppercase tracking-widest text-gold text-xs font-bold">— {siteContent.philosophy.author} —</p>
            <p className="text-[10px] text-cream/40 uppercase tracking-widest">Est. 1924</p>
          </div>
        </div>
      </section>

      {/* Heritage Features */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mx-auto text-gold mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-serif">Certified Sourcing</h3>
            <p className="text-sm text-charcoal/60 leading-relaxed italic">
              Every stone is conflict-free and ethically sourced through our exclusive global network of mines.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mx-auto text-gold mb-6">
              <Star size={32} />
            </div>
            <h3 className="text-xl font-serif">Master Craftsmanship</h3>
            <p className="text-sm text-charcoal/60 leading-relaxed italic">
              Hand-finished by our artisans with over 40 years of experience in high jewelry fabrication.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mx-auto text-gold mb-6">
              <Diamond size={32} />
            </div>
            <h3 className="text-xl font-serif">Lifetime Gaurantee</h3>
            <p className="text-sm text-charcoal/60 leading-relaxed italic">
              Your investment is protected with our complimentary annual cleaning and resizing services.
            </p>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickView 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Home;
