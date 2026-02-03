
import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Trash2, Mail, User, Phone, CheckCircle } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

const Bag: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useStore();
  const [step, setStep] = useState<'Bag' | 'Details' | 'Confirmed'>('Bag');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [refNumber, setRefNumber] = useState('');

  const total = cart.reduce((sum, item) => sum + item.finalPrice, 0);

  const handleConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = 'ALX-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setRefNumber(generatedRef);
    setStep('Confirmed');
    clearCart();
  };

  if (step === 'Confirmed') {
    return (
      <div className="page-transition py-24 px-4 max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} className="text-gold" />
        </div>
        <h1 className="text-4xl font-serif text-charcoal mb-4">Inquiry Received</h1>
        <p className="text-sm text-charcoal/60 leading-relaxed mb-8 italic">
          Your curation has been submitted for a bespoke consultation. A jewelry specialist will contact you within 24 hours to finalize your masterpiece.
        </p>
        <div className="bg-charcoal text-cream p-8 rounded-lg mb-8">
          <p className="text-[10px] uppercase tracking-widest mb-2 opacity-50">Your Reference Number</p>
          <p className="text-2xl font-serif tracking-widest text-gold">{refNumber}</p>
        </div>
        <button 
          onClick={() => window.location.href = '#/'}
          className="text-gold border-b border-gold pb-1 uppercase tracking-widest text-xs font-bold"
        >
          Return to Boutique
        </button>
      </div>
    );
  }

  return (
    <div className="page-transition py-12 px-4 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-serif text-charcoal mb-4">Boutique Bag</h1>
        <div className="flex justify-center items-center space-x-4 text-[10px] uppercase tracking-widest-luxury">
          <span className={step === 'Bag' ? 'text-gold font-bold' : 'text-charcoal/30'}>01 Review</span>
          <span className="text-charcoal/30">•</span>
          <span className={step === 'Details' ? 'text-gold font-bold' : 'text-charcoal/30'}>02 Details</span>
          <span className="text-charcoal/30">•</span>
          <span className="text-charcoal/30">03 Confirmation</span>
        </div>
      </header>

      {cart.length === 0 && step === 'Bag' ? (
        <div className="text-center py-24">
          <ShoppingBag size={48} className="mx-auto text-charcoal/10 mb-6" />
          <p className="text-xl font-serif italic text-charcoal/40 mb-8">Your bag is currently empty.</p>
          <button 
            onClick={() => window.location.href = '#/catalog'}
            className="bg-charcoal text-cream px-12 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold transition-all"
          >
            Explore Collections
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main area */}
          <div className="lg:col-span-2 space-y-8">
            {step === 'Bag' ? (
              <div className="space-y-6">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 p-6 glass border-gold/10 hover:shadow-lg transition-shadow">
                    <div className="w-full sm:w-32 aspect-square">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover rounded-sm" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-lg text-charcoal">{item.name}</h3>
                        <button onClick={() => removeFromCart(idx)} className="text-charcoal/30 hover:text-red-400">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="space-y-1 text-[10px] uppercase tracking-widest text-charcoal/50 mb-4">
                        <p>Metal: <span className="text-charcoal font-bold">{item.selectedMetal}</span></p>
                        <p>Stone: <span className="text-charcoal font-bold">{item.selectedStone}</span></p>
                        <p>SKU: {item.sku}</p>
                      </div>
                      <p className="text-sm font-serif italic text-gold">${item.finalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleConsultation} className="space-y-6 glass p-8 border-gold/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold flex items-center space-x-2">
                      <User size={12} className="text-gold" />
                      <span>Full Name</span>
                    </label>
                    <input 
                      required
                      className="w-full bg-cream border-b border-gold/20 focus:border-gold outline-none py-2 text-sm"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold flex items-center space-x-2">
                      <Mail size={12} className="text-gold" />
                      <span>Email Address</span>
                    </label>
                    <input 
                      required
                      type="email"
                      className="w-full bg-cream border-b border-gold/20 focus:border-gold outline-none py-2 text-sm"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold flex items-center space-x-2">
                    <Phone size={12} className="text-gold" />
                    <span>Preferred Phone</span>
                  </label>
                  <input 
                    className="w-full bg-cream border-b border-gold/20 focus:border-gold outline-none py-2 text-sm"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold">Inquiry Details (Optional)</label>
                  <textarea 
                    rows={4}
                    placeholder="E.g. Special engraving requests, size requirements..."
                    className="w-full bg-cream border-b border-gold/20 focus:border-gold outline-none py-2 text-sm resize-none"
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gold text-white py-5 uppercase tracking-widest-luxury text-xs font-bold hover:bg-charcoal transition-all shadow-xl"
                >
                  Confirm Quote Request
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass p-8 border-gold/20 space-y-6">
              <h3 className="font-serif text-xl border-b border-gold/10 pb-4">Inquiry Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-xs tracking-widest">
                  <span className="text-charcoal/60 uppercase">Base Value</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs tracking-widest">
                  <span className="text-charcoal/60 uppercase">Consultation Fee</span>
                  <span className="text-gold uppercase">Complimentary</span>
                </div>
                <div className="flex justify-between text-xs tracking-widest">
                  <span className="text-charcoal/60 uppercase">Taxes & Logistics</span>
                  <span className="text-gold italic">Calculated in bespoke quote</span>
                </div>
                <div className="pt-4 border-t border-gold/10 flex justify-between">
                  <span className="font-serif text-lg">Total Estimate</span>
                  <span className="font-serif text-xl text-gold">${total.toLocaleString()}</span>
                </div>
              </div>

              {step === 'Bag' && (
                <button 
                  onClick={() => setStep('Details')}
                  className="w-full bg-charcoal text-cream py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-gold transition-all flex items-center justify-center space-x-2"
                >
                  <span>Begin Consultation Flow</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

            <div className="p-6 bg-cream border border-gold/10 space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gold">The Aurelia Guarantee</p>
              <p className="text-xs text-charcoal/60 italic leading-relaxed">
                Aurelia Luxe operates via a high-touch inquiry system. Your submission secures the selected pieces for a period of 48 hours while our specialists prepare your bespoke acquisition quote.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bag;
