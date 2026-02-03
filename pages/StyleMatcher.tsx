
import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, ArrowRight, RefreshCw, Diamond } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { analyzeStyleMatch } from '../services/gemini';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import { Product } from '../types';

const StyleMatcher: React.FC = () => {
  const { products } = useStore();
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ analysis: string, matches: { sku: string, reason: string }[] } | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        performAnalysis(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const performAnalysis = async (base64: string) => {
    setIsAnalyzing(true);
    setResult(null);
    const data = await analyzeStyleMatch(base64, products);
    setResult(data);
    setIsAnalyzing(false);
  };

  const matchedProducts = result?.matches.map(m => ({
    product: products.find(p => p.sku === m.sku),
    reason: m.reason
  })).filter(m => m.product) || [];

  return (
    <div className="page-transition py-12 px-4 max-w-7xl mx-auto">
      <header className="mb-16 text-center space-y-4">
        <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles size={32} className="text-gold" />
        </div>
        <p className="text-gold uppercase tracking-widest text-xs font-bold">The Aurelia AI</p>
        <h1 className="text-5xl font-serif text-charcoal">Style Matcher</h1>
        <p className="text-sm text-charcoal/50 italic font-light tracking-widest max-w-xl mx-auto">
          Allow our AI curator to analyze your ensemble and suggest the perfect radiant companion.
        </p>
      </header>

      {!image && !isAnalyzing && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="max-w-2xl mx-auto h-80 border-2 border-dashed border-gold/20 rounded-2xl flex flex-col items-center justify-center space-y-4 cursor-pointer hover:border-gold/50 transition-all bg-white shadow-sm hover:shadow-xl group"
        >
          <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
            <Upload size={28} />
          </div>
          <p className="text-xs uppercase tracking-widest font-bold text-charcoal/60">Upload Your Look</p>
          <p className="text-[10px] text-charcoal/30 italic">Drag and drop or click to browse</p>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
        </div>
      )}

      {isAnalyzing && (
        <div className="text-center py-24 space-y-8">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 border-4 border-gold/10 rounded-full" />
            <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Diamond size={32} className="text-gold animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-serif italic text-charcoal">Curating your legacy...</p>
            <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Analyzing silhouettes & color palettes</p>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-16 animate-in fade-in duration-700">
          {/* Analysis Text */}
          <div className="max-w-3xl mx-auto text-center glass p-8 border-gold/10">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gold mb-4">The Curator's Verdict</p>
            <p className="text-xl font-serif italic leading-relaxed text-charcoal">
              "{result.analysis}"
            </p>
          </div>

          {/* Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {matchedProducts.map(({ product, reason }, idx) => (
              <div key={idx} className="space-y-6 flex flex-col h-full">
                <div className="flex-grow">
                  <ProductCard product={product!} onQuickView={(p) => setSelectedProduct(p)} />
                </div>
                <div className="p-4 bg-white border-l-2 border-gold italic text-xs text-charcoal/70 leading-relaxed shadow-sm">
                  {reason}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <button 
              onClick={() => { setImage(null); setResult(null); }}
              className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest border-b border-gold pb-1 hover:text-gold transition-colors"
            >
              <RefreshCw size={12} />
              <span>Analyze Another Look</span>
            </button>
          </div>
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

export default StyleMatcher;
