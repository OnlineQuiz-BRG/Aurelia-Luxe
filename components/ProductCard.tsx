
import React from 'react';
import { Heart, Eye, ArrowRight, Tag } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { toggleWishlist, currentUser, calculatePrice } = useStore();
  const isWishlisted = currentUser?.wishlist.includes(product.id);
  
  const prices = calculatePrice(product, product.metalPurity, product.stoneType);

  return (
    <div className="group relative bg-white border border-transparent hover:border-gold/20 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl">
      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-gold text-white text-[10px] uppercase tracking-widest px-3 py-1 shadow-sm">
            New Arrival
          </span>
        )}
        {product.discount && (
          <span className="bg-charcoal text-gold text-[10px] uppercase tracking-widest px-3 py-1 flex items-center gap-1 shadow-sm font-bold">
            <Tag size={10} />
            {product.discount}% OFF
          </span>
        )}
      </div>
      
      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream/50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100">
          <button 
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className={`p-3 rounded-full transition-all duration-300 ${isWishlisted ? 'bg-gold text-white' : 'bg-white text-charcoal hover:bg-gold hover:text-white'}`}
          >
            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="p-3 bg-white text-charcoal rounded-full hover:bg-gold hover:text-white transition-all duration-300"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-6 text-center">
        <p className="text-[10px] uppercase tracking-widest text-gold mb-2 font-bold">{product.category}</p>
        <h3 className="text-sm font-serif tracking-wider text-charcoal mb-2 truncate group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <div className="flex justify-center items-center gap-3 mb-4">
          <p className="text-sm font-bold text-charcoal">₹{prices.final.toLocaleString()}</p>
          {product.discount && (
            <p className="text-xs text-charcoal/40 line-through">₹{prices.original.toLocaleString()}</p>
          )}
        </div>
        <button 
          onClick={() => onQuickView(product)}
          className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest border-b border-gold pb-1 hover:text-gold transition-colors"
        >
          <span>Examine Piece</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
