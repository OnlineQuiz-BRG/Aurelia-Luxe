
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X, Search, LogOut } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart, currentUser, setCurrentUser } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Collections', path: '/catalog' },
    { name: 'Bespoke', path: '/bespoke' },
    { name: 'Heritage', path: '/heritage' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-charcoal hover:text-gold transition-colors tracking-widest text-xs uppercase font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-serif tracking-widest-luxury font-bold text-charcoal">
                AURELIA LUXE
              </Link>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-charcoal hover:text-gold transition-colors"><Search size={20} /></button>
              <Link to="/wishlist" className="text-charcoal hover:text-gold transition-colors relative">
                <Heart size={20} />
                {currentUser && currentUser.wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {currentUser.wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/bag" className="text-charcoal hover:text-gold transition-colors relative">
                <ShoppingBag size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <Link to={currentUser.isAdmin ? "/admin" : "/profile"} className="text-charcoal hover:text-gold flex items-center space-x-1">
                    <User size={20} />
                    <span className="text-xs uppercase tracking-widest font-medium">{currentUser.name.split(' ')[0]}</span>
                  </Link>
                  <button onClick={handleLogout} className="text-charcoal/50 hover:text-gold"><LogOut size={16} /></button>
                </div>
              ) : (
                <Link to="/profile" className="text-charcoal hover:text-gold transition-colors"><User size={20} /></Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-charcoal">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-dark text-white border-t border-gold/10 pb-8">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-xl font-serif tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gold/20" />
              <div className="flex space-x-6 py-4">
                <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}><Heart /></Link>
                <Link to="/bag" onClick={() => setIsMenuOpen(false)}><ShoppingBag /></Link>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}><User /></Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-cream py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-serif tracking-widest">AURELIA LUXE</h3>
            <p className="text-sm text-cream/60 leading-relaxed italic">
              "Crafting legacies, one radiant piece at a time."
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest-luxury font-bold mb-6 text-gold">Boutique</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li><Link to="/catalog">The Collections</Link></li>
              <li><Link to="/heritage">Our Story</Link></li>
              <li><Link to="/ethics">Ethical Sourcing</Link></li>
              <li><Link to="/bespoke">Custom Design</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest-luxury font-bold mb-6 text-gold">Concierge</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li>Contact Us</li>
              <li>Care Guide</li>
              <li>Sizing Guide</li>
              <li>Shipping & Returns</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest-luxury font-bold mb-6 text-gold">Newsletter</h4>
            <p className="text-xs text-cream/60 mb-4">Join our inner circle for exclusive previews.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-b border-cream/30 focus:border-gold py-2 text-sm w-full outline-none" 
              />
              <button className="text-gold px-2">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-cream/10 text-[10px] text-center text-cream/40 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Aurelia Luxe Fine Jewelry. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
