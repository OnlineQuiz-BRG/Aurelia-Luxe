
import React, { useState } from 'react';
import { User as UserIcon, Settings, LogOut, Shield, Key, ArrowLeft, Mail } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { User } from '../types';

const Profile: React.FC = () => {
  const { currentUser, setCurrentUser, users } = useStore();
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (view === 'login') {
      // Normalize search criteria
      const searchEmail = form.email.trim().toLowerCase();
      const searchPassword = form.password.trim();

      const user = users.find(u => 
        u.email.toLowerCase() === searchEmail && 
        u.password === searchPassword
      );

      if (user) {
        setCurrentUser(user);
      } else {
        setError('Invalid credentials. Please verify your email and password.');
      }
    } else if (view === 'register') {
      setSuccess('Your membership request has been submitted for artisan review.');
      setTimeout(() => setView('login'), 2500);
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(`A restoration link has been dispatched to ${form.email}.`);
    setTimeout(() => {
      setSuccess('');
      setView('login');
    }, 4000);
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

          <div className="space-y-8">
            <div className="glass p-8 border-gold/10 text-center">
              <h3 className="font-serif text-lg mb-2">Artisan Points</h3>
              <p className="text-xs text-charcoal/60 italic mb-6">Redeemable for bespoke creations.</p>
              <div className="w-24 h-24 bg-gold/5 rounded-full border-2 border-gold/10 flex flex-col items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-gold">1,250</span>
                <span className="text-[8px] uppercase tracking-widest">Points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'forgot') {
    return (
      <div className="page-transition py-24 px-4 max-w-md mx-auto">
        <div className="glass p-12 border-gold/10 shadow-2xl">
          <button onClick={() => setView('login')} className="flex items-center gap-2 text-gold text-[10px] uppercase tracking-widest font-bold mb-8 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft size={12} /> Back to Sign In
          </button>
          <header className="text-center mb-12">
            <h1 className="text-3xl font-serif text-charcoal mb-4">Restore Access</h1>
            <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Credential Recovery</p>
          </header>
          {success && <p className="bg-green-50 text-green-700 p-4 rounded text-xs mb-6 text-center italic">{success}</p>}
          <form onSubmit={handleForgot} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gold/50" size={14} />
              <input 
                required
                type="email"
                placeholder="Heritage Email Address" 
                className="w-full bg-cream border-b border-gold/30 p-3 pl-10 text-sm outline-none focus:border-gold"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-charcoal text-cream py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold transition-all shadow-xl"
            >
              Dispatch Recovery Link
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition py-24 px-4 max-w-md mx-auto">
      <div className="glass p-12 border-gold/10 shadow-2xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-serif text-charcoal mb-4">
            {view === 'login' ? 'Welcome Home' : 'Begin Your Legacy'}
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-gold font-bold">The Aurelia Registry</p>
        </header>

        {error && <p className="bg-red-50 text-red-700 p-4 rounded text-xs mb-6 text-center italic">{error}</p>}
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
          
          {view === 'login' && (
            <div className="text-right">
              <button 
                type="button" 
                onClick={() => setView('forgot')}
                className="text-[10px] uppercase tracking-widest text-gold font-bold hover:text-charcoal transition-colors"
              >
                Forgotten Password?
              </button>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-charcoal text-cream py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold transition-all shadow-xl"
          >
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
