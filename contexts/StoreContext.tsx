
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, User, CartItem, SiteContent, MetalPurity, StoneType } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SITE_CONTENT, PRICING_RULES } from '../constants';

interface StoreContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, metal?: MetalPurity, stone?: StoneType) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  siteContent: SiteContent;
  updateSiteContent: (content: SiteContent) => void;
  calculatePrice: (base: number, metal: MetalPurity, stone: StoneType) => number;
  toggleWishlist: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('al_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('al_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('al_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('al_site');
    return saved ? JSON.parse(saved) : INITIAL_SITE_CONTENT;
  });

  useEffect(() => localStorage.setItem('al_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('al_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('al_user', JSON.stringify(currentUser)), [currentUser]);
  useEffect(() => localStorage.setItem('al_site', JSON.stringify(siteContent)), [siteContent]);

  const calculatePrice = useCallback((base: number, metal: MetalPurity, stone: StoneType) => {
    return base + (PRICING_RULES.metal[metal] || 0) + (PRICING_RULES.stone[stone] || 0);
  }, []);

  const addToCart = (product: Product, metal?: MetalPurity, stone?: StoneType) => {
    const selectedMetal = metal || product.metalPurity;
    const selectedStone = stone || product.stoneType;
    const finalPrice = calculatePrice(product.basePrice, selectedMetal, selectedStone);

    const newItem: CartItem = {
      ...product,
      quantity: 1,
      selectedMetal,
      selectedStone,
      finalPrice
    };
    setCart([...cart, newItem]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const updateSiteContent = (content: SiteContent) => setSiteContent(content);

  const toggleWishlist = (productId: string) => {
    if (!currentUser) return;
    const updatedWishlist = currentUser.wishlist.includes(productId)
      ? currentUser.wishlist.filter(id => id !== productId)
      : [...currentUser.wishlist, productId];
    setCurrentUser({ ...currentUser, wishlist: updatedWishlist });
  };

  return (
    <StoreContext.Provider value={{
      products, setProducts, cart, addToCart, removeFromCart, clearCart,
      currentUser, setCurrentUser, siteContent, updateSiteContent,
      calculatePrice, toggleWishlist
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
