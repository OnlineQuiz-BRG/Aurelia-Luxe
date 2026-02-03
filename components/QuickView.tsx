
import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Heart } from 'lucide-react';
import { Product, MetalPurity, StoneType } from '../types';
import { useStore } from '../contexts/StoreContext';

interface QuickViewProps {
  product: Product;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, onClose }) => {
  const { addToCart, calculatePrice, toggleWishlist, currentUser } = useStore();
  const [selectedMetal, setSelectedMetal] = useState<MetalPurity>(product.metalPurity);
  const [selectedStone, setSelectedStone] = useState<StoneType>(product.stoneType);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const finalPrice = calculatePrice(product.basePrice, selectedMetal, selectedStone);
  const isWishlisted = currentUser?.wishlist.includes(product.id);

  const metals: MetalPurity[] = ['14k Gold', '18k Gold', '24k Gold', 'Platinum'];
  const stones: StoneType[] = ['Diamond', 'Emerald', 'Sapphire', 'Ruby', 'None'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-charcoal hover:text-gold transition-colors">
          <X size={24} />
        </button>

        {/* Gallery */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-white">
          <img
            src={product.images[currentImageIdx]}
            alt={product.name}
            className="w-full h-full object-contain p-8 transition-opacity duration-500"
          />
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${currentImageIdx === idx ? 'bg-gold w-4' : 'bg-charcoal/20'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-cream">
          <p className="text-[10px] uppercase tracking-widest-luxury text-gold mb-2 font-bold">{product.sku}</p>
          <h2 className="text-3xl font-serif text-charcoal mb-4 leading-tight">{product.name}</h2>
          <p className="text-lg text-charcoal/80 mb-6 italic border-b border-gold/10 pb-4">
            ${finalPrice.toLocaleString()}
          </p>
          
          <div className="space-y-6 mb-8">
            <p className="text-sm leading-relaxed text-charcoal/70">{product.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-widest text-charcoal/60">
              <div className="flex items-center space-x-2">
                <Check size={14} className="text-gold" />
                <span>Weight: {product.weight}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check size={14} className="text-gold" />
                <span>Hallmark: {product.hallmark}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check size={14} className="text-gold" />
                <span>Status: {product.stockStatus}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={14} className="text-gold" />
                <span>Certified Heirloom</span>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-8 mb-10">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4">Select Metal Purity</h4>
              <div className="flex flex-wrap gap-2">
                {metals.map((metal) => (
                  <button
                    key={metal}
                    onClick={() => setSelectedMetal(metal)}
                    className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-all ${
                      selectedMetal === metal ? 'bg-charcoal text-white border-charcoal' : 'border-gold/30 text-charcoal/60 hover:border-gold'
                    }`}
                  >
                    {metal}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4">Stone Selection</h4>
              <div className="flex flex-wrap gap-2">
                {stones.map((stone) => (
                  <button
                    key={stone}
                    onClick={() => setSelectedStone(stone)}
                    className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-all ${
                      selectedStone === stone ? 'bg-charcoal text-white border-charcoal' : 'border-gold/30 text-charcoal/60 hover:border-gold'
                    }`}
                  >
                    {stone}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => { addToCart(product, selectedMetal, selectedStone); onClose(); }}
              className="flex-grow bg-gold text-white py-4 px-8 text-xs uppercase tracking-widest font-bold hover:bg-charcoal transition-all flex items-center justify-center space-x-2 shadow-xl hover:-translate-y-1"
            >
              <ShoppingBag size={18} />
              <span>Add to Boutique Bag</span>
            </button>
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`p-4 border border-gold/30 transition-all ${isWishlisted ? 'bg-gold/10 text-gold' : 'text-charcoal hover:bg-gold hover:text-white'}`}
            >
              <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
