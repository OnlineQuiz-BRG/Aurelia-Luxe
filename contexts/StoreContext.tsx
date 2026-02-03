
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, User, CartItem, SiteContent, MetalPurity, StoneType } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SITE_CONTENT, PRICING_RULES } from '../constants';
import { supabase } from '../services/supabase';

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
  updateSiteContent: (content: SiteContent) => Promise<void>;
  calculatePrice: (product: Product, metal: MetalPurity, stone: StoneType) => { original: number, final: number };
  toggleWishlist: (productId: string) => Promise<void>;
  isLoading: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [siteContent, setSiteContent] = useState<SiteContent>(INITIAL_SITE_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        { data: productsData },
        { data: usersData },
        { data: siteData }
      ] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('users').select('*'),
        supabase.from('site_content').select('*').eq('id', 'main').maybeSingle()
      ]);

      if (productsData && productsData.length > 0) {
        setProducts(productsData.map(p => ({
          id: p.id,
          sku: p.sku,
          name: p.name,
          description: p.description,
          basePrice: Number(p.base_price),
          discount: p.discount,
          category: p.category,
          metalPurity: p.metal_purity,
          stoneType: p.stone_type,
          images: p.images || [],
          stockStatus: p.stock_status,
          weight: p.weight,
          hallmark: p.hallmark,
          isNew: p.is_new,
          isPopular: p.is_popular,
          reviews: []
        })));
      } else {
        setProducts(INITIAL_PRODUCTS);
      }
      
      if (usersData) {
        const mappedUsers = (usersData as any[]).map(u => ({
          id: u.id,
          email: u.email,
          password: u.password,
          name: u.name,
          isAdmin: u.is_admin,
          isApproved: u.is_approved,
          orderHistory: u.order_history || [],
          isSubscribed: u.is_subscribed || false,
          wishlist: u.wishlist || []
        })) as User[];
        setUsers(mappedUsers);

        const savedUserId = localStorage.getItem('al_current_user_id');
        if (savedUserId) {
          const found = mappedUsers.find(u => u.id === savedUserId);
          if (found && found.isApproved) setCurrentUser(found);
        }
      }

      if (siteData) {
        setSiteContent({
          hero: siteData.hero || INITIAL_SITE_CONTENT.hero,
          philosophy: siteData.philosophy || INITIAL_SITE_CONTENT.philosophy,
          social: siteData.social || INITIAL_SITE_CONTENT.social
        });
      }
    } catch (error) {
      console.warn("Supabase fetch failed, using local boutique state.", error);
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const productSub = supabase.channel('products_realtime')
      .on('postgres_changes', { event: '*', table: 'products' }, fetchData)
      .subscribe();

    const userSub = supabase.channel('users_realtime')
      .on('postgres_changes', { event: '*', table: 'users' }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(productSub);
      supabase.removeChannel(userSub);
    };
  }, [fetchData]);

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

  const updateSiteContent = async (content: SiteContent) => {
    const { error } = await supabase
      .from('site_content')
      .upsert({
        id: 'main',
        hero: content.hero,
        philosophy: content.philosophy,
        social: content.social
      });
    
    if (!error) setSiteContent(content);
  };

  const toggleWishlist = async (productId: string) => {
    if (!currentUser) return;
    const updatedWishlist = currentUser.wishlist.includes(productId)
      ? currentUser.wishlist.filter(id => id !== productId)
      : [...currentUser.wishlist, productId];
    
    const { error } = await supabase.from('users').update({ wishlist: updatedWishlist }).eq('id', currentUser.id);
    if (!error) setCurrentUser({ ...currentUser, wishlist: updatedWishlist });
  };

  return (
    <StoreContext.Provider value={{
      products, setProducts, cart, addToCart, removeFromCart, clearCart,
      currentUser, setCurrentUser, users, setUsers, siteContent, updateSiteContent,
      calculatePrice, toggleWishlist, isLoading
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
