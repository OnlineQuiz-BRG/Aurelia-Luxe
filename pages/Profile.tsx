
import React, { useState } from 'react';
import { User as UserIcon, Settings, LogOut, Shield } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { User } from '../types';

const Profile: React.FC = () => {
  const { currentUser, setCurrentUser } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock auth
    const user: User = {
      id: 'u1',
      name: isLogin ? (form.email === 'admin@aurelia.com' ? 'Boutique Curator' : 'Valued Client') : form.name,
      email: form.email,
      isAdmin: form.email === 'admin@aurelia.com',
      orderHistory: [],
      isSubscribed: true,
      wishlist: []
    };
    setCurrentUser(user);
  };

  if (currentUser) {
    return (
      <div className="page-transition py-12 px-4 max-w-5xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gold/10 pb-12">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold">
              <UserIcon size={48} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gold">Member Since 2024</p>
              <h1 className="text-4xl font-serif text-charcoal">{currentUser.name}</h1>
              <p className="text-sm text-charcoal/50">{currentUser.email}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            {currentUser.isAdmin && (
              <button 
                onClick={() => window.location.hash = '/admin'}
                className="bg-gold text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold rounded-full flex items-center space-x-2 shadow-lg"
              >
                <Shield size={14} />
                <span>Curator Suite</span>
              </button>
            )}
            <button 
              onClick={() => setCurrentUser(null)}
              className="border border-charcoal/20 px-6 py-3 text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-red-50 hover:border-red-200 transition-all flex items-center space-x-2"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center space-x-2">
                <Settings size={20} className="text-gold" />
                <span>Account Settings</span>
              </h2>
              <div className="glass p-8 border-gold/10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40">Full Name</p>
                    <p className="text-sm font-medium">{currentUser.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40">Primary Email</p>
                    <p className="text-sm font-medium">{currentUser.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40">Newsletter Status</p>
                    <p className="text-sm font-medium text-gold">Subscribed</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40">Loyalty Status</p>
                    <p className="text-sm font-medium italic">Sapphire Member</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div className="glass p-8 border-gold/10 text-center">
              <h3 className="font-serif text-lg mb-2">Heritage Rewards</h3>
              <p className="text-xs text-charcoal/60 italic mb-6">Earn points toward bespoke acquisitions.</p>
              <div className="w-24 h-24 bg-gold/5 rounded-full border-2 border-gold/10 flex flex-col items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-gold">450</span>
                <span className="text-[8px] uppercase tracking-widest">Points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition py-24 px-4 max-w-md mx-auto">
      <div className="glass p-12 border-gold/10 shadow-2xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-serif text-charcoal mb-4">{isLogin ? 'Welcome Back' : 'Create Legacy'}</h1>
          <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Access the Aurelia Registry</p>
        </header>

        <form onSubmit={handleAuth} className="space-y-6">
          {!isLogin && (
            <input 
              required
              placeholder="Full Name" 
              className="w-full bg-cream border-b border-gold/30 p-3 text-sm outline-none focus:border-gold"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
            />
          )}
          <input 
            required
            type="email"
            placeholder="Email Address (admin@aurelia.com for admin)" 
            className="w-full bg-cream border-b border-gold/30 p-3 text-sm outline-none focus:border-gold"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
          />
          <input 
            required
            type="password"
            placeholder="Secret Key" 
            className="w-full bg-cream border-b border-gold/30 p-3 text-sm outline-none focus:border-gold"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
          />
          <button 
            type="submit"
            className="w-full bg-charcoal text-cream py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold transition-all shadow-xl"
          >
            {isLogin ? 'Sign In' : 'Register Account'}
          </button>
        </form>

        <p className="text-center mt-8 text-xs text-charcoal/50">
          {isLogin ? "Don't have an account?" : "Already registered?"}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="ml-2 text-gold font-bold uppercase tracking-widest text-[10px]"
          >
            {isLogin ? 'Create One' : 'Sign In Instead'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Profile;
