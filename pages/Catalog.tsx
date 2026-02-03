
import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import { Product, MetalPurity, StoneType } from '../types';

const Catalog: React.FC = () => {
  const { products } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // State for filters
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [metalFilter, setMetalFilter] = useState<MetalPurity | 'All'>('All');
  const [stoneFilter, setStoneFilter] = useState<StoneType | 'All'>('All');
  const [sortBy, setSortBy] = useState<'Newest' | 'Price Low' | 'Price High'>('Newest');

  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.category)))], [products]);
  const metals: (MetalPurity | 'All')[] = ['All', '14k Gold', '18k Gold', '24k Gold', 'Platinum'];
  const stones: (StoneType | 'All')[] = ['All', 'Diamond', 'Emerald', 'Sapphire', 'Ruby', 'None'];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => categoryFilter === 'All' || p.category === categoryFilter)
      .filter(p => metalFilter === 'All' || p.metalPurity === metalFilter)
      .filter(p => stoneFilter === 'All' || p.stoneType === stoneFilter)
      .sort((a, b) => {
        if (sortBy === 'Price Low') return a.basePrice - b.basePrice;
        if (sortBy === 'Price High') return b.basePrice - a.basePrice;
        return 0; // 'Newest' would need a date field, skipping for seed simplicity
      });
  }, [products, categoryFilter, metalFilter, stoneFilter, sortBy]);

  return (
    <div className="page-transition py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center space-y-4">
          <p className="text-gold uppercase tracking-widest text-xs font-bold">The Archives</p>
          <h1 className="text-5xl font-serif text-charcoal">Our Collections</h1>
          <p className="text-sm text-charcoal/50 italic font-light tracking-widest">Refinement in every detail.</p>
        </header>

        {/* Filters bar */}
        <div className="glass sticky top-24 z-40 p-4 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6 border-gold/10 shadow-xl">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gold" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Filters:</span>
            </div>
            
            <div className="relative group">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none bg-transparent text-[10px] uppercase tracking-widest border-b border-gold/20 pb-1 pr-6 focus:outline-none focus:border-gold cursor-pointer"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={10} className="absolute right-0 top-1 pointer-events-none text-gold" />
            </div>

            <div className="relative group">
              <select 
                value={metalFilter}
                onChange={(e) => setMetalFilter(e.target.value as any)}
                className="appearance-none bg-transparent text-[10px] uppercase tracking-widest border-b border-gold/20 pb-1 pr-6 focus:outline-none focus:border-gold cursor-pointer"
              >
                {metals.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown size={10} className="absolute right-0 top-1 pointer-events-none text-gold" />
            </div>

            <div className="relative group">
              <select 
                value={stoneFilter}
                onChange={(e) => setStoneFilter(e.target.value as any)}
                className="appearance-none bg-transparent text-[10px] uppercase tracking-widest border-b border-gold/20 pb-1 pr-6 focus:outline-none focus:border-gold cursor-pointer"
              >
                {stones.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={10} className="absolute right-0 top-1 pointer-events-none text-gold" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal size={16} className="text-gold" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-transparent text-[10px] uppercase tracking-widest border-b border-gold/20 pb-1 pr-6 focus:outline-none focus:border-gold cursor-pointer"
              >
                <option value="Newest">Newest First</option>
                <option value="Price Low">Price: Low to High</option>
                <option value="Price High">Price: High to Low</option>
              </select>
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40">
              {filteredProducts.length} Pieces
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={(p) => setSelectedProduct(p)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 space-y-6">
            <p className="text-xl font-serif italic text-charcoal/40">Our apologies, but no pieces match your criteria.</p>
            <button 
              onClick={() => { setCategoryFilter('All'); setMetalFilter('All'); setStoneFilter('All'); }}
              className="text-gold uppercase tracking-widest text-xs border-b border-gold pb-1"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <QuickView 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Catalog;
