
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
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  siteContent: SiteContent;
  updateSiteContent: (content: SiteContent) => void;
  calculatePrice: (product: Product, metal: MetalPurity, stone: StoneType) => { original: number, final: number };
  toggleWishlist: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEFAULT_ADMIN: User = {
  id: 'u-admin',
  email: 'admin@aurelia.com',
  password: 'admin',
  name: 'Boutique Curator',
  isAdmin: true,
  isApproved: true,
  orderHistory: [],
  isSubscribed: true,
  wishlist: []
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialState = <T,>(key: string, defaultValue: T): T => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return defaultValue;
      const parsed = JSON.parse(saved);
      if (key === 'al_users_list' && (!Array.isArray(parsed) || parsed.length === 0)) {
        return [DEFAULT_ADMIN] as unknown as T;
      }
      return parsed;
    } catch (e) {
      console.error(`Error loading ${key} from storage:`, e);
      return defaultValue;
    }
  };

  const [products, setProducts] = useState<Product[]>(() => getInitialState('al_products', INITIAL_PRODUCTS));
  const [cart, setCart] = useState<CartItem[]>(() => getInitialState('al_cart', []));
  const [users, setUsers] = useState<User[]>(() => getInitialState('al_users_list', [DEFAULT_ADMIN]));
  const [currentUser, setCurrentUser] = useState<User | null>(() => getInitialState('al_user', null));
  const [siteContent, setSiteContent] = useState<SiteContent>(() => getInitialState('al_site', INITIAL_SITE_CONTENT));

  useEffect(() => {
    localStorage.setItem('al_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('al_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('al_users_list', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('al_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('al_site', JSON.stringify(siteContent));
  }, [siteContent]);

  const calculatePrice = useCallback((product: Product, metal: MetalPurity, stone: StoneType) => {
    const baseWithOptions = product.basePrice + (PRICING_RULES.metal[metal] || 0) + (PRICING_RULES.stone[stone] || 0);
    const discountAmount = (product.discount || 0) / 100 * baseWithOptions;
    return {
      original: baseWithOptions,
      final: baseWithOptions - discountAmount
    };
  }, []);

  const addToCart = (product: Product, metal?: MetalPurity, stone?: StoneType) => {
    const selectedMetal = metal || product.metalPurity;
    const selectedStone = stone || product.stoneType;
    const { final } = calculatePrice(product, selectedMetal, selectedStone);

    const newItem: CartItem = {
      ...product,
      quantity: 1,
      selectedMetal,
      selectedStone,
      finalPrice: final
    };
    setCart(prev => [...prev, newItem]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);
  const updateSiteContent = (content: SiteContent) => setSiteContent(content);

  const toggleWishlist = (productId: string) => {
    if (!currentUser) return;
    setCurrentUser(prev => {
      if (!prev) return null;
      const updatedWishlist = prev.wishlist.includes(productId)
        ? prev.wishlist.filter(id => id !== productId)
        : [...prev.wishlist, productId];
      const updatedUser = { ...prev, wishlist: updatedWishlist };
      setUsers(allUsers => allUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
      return updatedUser;
    });
  };

  return (
    <StoreContext.Provider value={{
      products, setProducts, cart, addToCart, removeFromCart, clearCart,
      currentUser, setCurrentUser, users, setUsers, siteContent, updateSiteContent,
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
