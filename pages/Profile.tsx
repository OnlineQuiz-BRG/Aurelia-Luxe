
import React, { useState, useEffect } from 'react';
import { User as UserIcon, Settings, LogOut, Shield, Key, ArrowLeft, Mail, Clock, Loader2 } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { supabase } from '../services/supabase';
import { User } from '../types';

const Profile: React.FC = () => {
  const { currentUser, setCurrentUser, isLoading: storeLoading } = useStore();
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);
    
    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();

    if (view === 'login') {
      const { data: user, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();
      
      if (dbError || !user) {
        setError('The artisan records do not match these credentials.');
      } else if (!user.is_approved) {
        setError('Your membership application is currently under artisan review.');
      } else {
        // Fix: Properly normalize raw database response to User interface
        const normalizedUser: User = {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          isAdmin: user.is_admin,
          isApproved: user.is_approved,
          isSubscribed: user.is_subscribed || false,
          orderHistory: [],
          wishlist: user.wishlist || []
        };
        setCurrentUser(normalizedUser);
        localStorage.setItem('al_current_user_id', normalizedUser.id);
        setSuccess('Identity verified. Welcome back.');
      }
    } else if (view === 'register') {
      const id = 'u-' + Math.random().toString(36).substring(7);
      const { error: regError } = await supabase
        .from('users')
        .insert([{
          id,
          name: form.name.trim(),
          email,
          password,
          is_admin: false,
          is_approved: false,
          wishlist: []
        }]);

      if (regError) {
        setError('This email is already registered in our heritage circle.');
      } else {
        setSuccess('Your membership request has been submitted for artisan review.');
        setForm({ name: '', email: '', password: '' });
        setTimeout(() => setView('login'), 3500);
      }
    }
    setIsProcessing(false);
  };

  if (storeLoading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-gold" size={48} />
    </div>
  );

  if (currentUser) {
    return (
      <div className="page-transition py-12 px-4 max-w-5xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gold/10 pb-12">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold">
              <UserIcon size={48} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gold">Heritage Member</p>
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
                <span>Curator Dashboard</span>
              </button>
            )}
            <button 
              onClick={() => { setCurrentUser(null); localStorage.removeItem('al_current_user_id'); }}
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
                <span>Account Preferences</span>
              </h2>
              <div className="glass p-8 border-gold/10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40">Registered Name</p>
                    <p className="text-sm font-medium">{currentUser.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40">Contact Email</p>
                    <p className="text-sm font-medium">{currentUser.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40">Account Status</p>
                    <p className="text-sm font-medium text-gold">{currentUser.isAdmin ? 'Master Curator' : 'Valued Client'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest text-charcoal/40">Heritage Circle</p>
                    <p className="text-sm font-medium italic">Gold Member</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition py-24 px-4 max-md mx-auto">
      <div className="glass p-12 border-gold/10 shadow-2xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-serif text-charcoal mb-4">
            {view === 'login' ? 'Welcome Home' : 'Begin Your Legacy'}
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-gold font-bold">The Aurelia Registry</p>
        </header>

        {error && <div className="bg-red-50 text-red-700 p-4 rounded text-xs mb-6 text-center italic flex items-center justify-center gap-2"><Clock size={14} /> {error}</div>}
        {success && <p className="bg-green-50 text-green-700 p-4 rounded text-xs mb-6 text-center italic">{success}</p>}

        <form onSubmit={handleAuth} className="space-y-6">
          {view === 'register' && (
            <input 
              required
              placeholder="Full Legal Name" 
              className="w-full bg-cream border-b border-gold/30 p-3 text-sm outline-none focus:border-gold"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
            />
          )}
          <input 
            required
            type="email"
            placeholder="Email Address" 
            className="w-full bg-cream border-b border-gold/30 p-3 text-sm outline-none focus:border-gold"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
          />
          <input 
            required
            type="password"
            placeholder="Master Password" 
            className="w-full bg-cream border-b border-gold/30 p-3 text-sm outline-none focus:border-gold"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
          />
          
          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full bg-charcoal text-cream py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing && <Loader2 className="animate-spin" size={14} />}
            {view === 'login' ? 'Sign In' : 'Submit Membership Request'}
          </button>
        </form>

        <p className="text-center mt-8 text-xs text-charcoal/50">
          {view === 'login' ? "Not yet registered?" : "Already a member?"}
          <button 
            onClick={() => setView(view === 'login' ? 'register' : 'login')} 
            className="ml-2 text-gold font-bold uppercase tracking-widest text-[10px] hover:underline"
          >
            {view === 'login' ? 'Create Account' : 'Sign In Now'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Profile;
