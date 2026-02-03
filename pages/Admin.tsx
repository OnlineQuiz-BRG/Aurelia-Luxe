
import React, { useState } from 'react';
import { Settings, Package, Layout as LayoutIcon, Users, Plus, Edit2, Trash2, Save, Image as ImageIcon, Key, Mail, UserPlus, ShieldCheck, Check, X, Clock, Loader2 } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { Product, SiteContent, User } from '../types';
import { supabase } from '../services/supabase';

const Admin: React.FC = () => {
  const { products, siteContent, updateSiteContent, currentUser, users, isLoading } = useStore();
  const [activeTab, setActiveTab] = useState<'Inventory' | 'Site' | 'Users'>('Inventory');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', isAdmin: false });
  const [isSaving, setIsSaving] = useState(false);

  if (!currentUser?.isAdmin) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-4xl font-serif mb-4">Access Restricted</h1>
        <p className="text-charcoal/60">Only boutique curators may access the heritage management suite.</p>
      </div>
    );
  }

  const handleProductSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);
    
    try {
      if (editingProduct.id) {
        await supabase.from('products').update(editingProduct).eq('id', editingProduct.id);
      } else {
        const newProd = {
          ...editingProduct,
          id: Math.random().toString(36).substring(7),
          created_at: new Date()
        };
        await supabase.from('products').insert([newProd]);
      }
      setEditingProduct(null);
    } catch (err) {
      alert("Error saving masterpiece record.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const email = newUser.email.trim().toLowerCase();
    
    const { error } = await supabase.from('users').insert([{
      id: 'u-' + Math.random().toString(36).substring(7),
      name: newUser.name.trim(),
      email: email,
      password: newUser.password.trim(),
      is_admin: newUser.isAdmin,
      is_approved: true,
      wishlist: []
    }]);

    if (error) {
      alert("Record establishment failed.");
    } else {
      setIsCreatingUser(false);
      setNewUser({ name: '', email: '', password: '', isAdmin: false });
    }
    setIsSaving(false);
  };

  const approveUser = async (id: string) => {
    await supabase.from('users').update({ is_approved: true }).eq('id', id);
  };

  const deleteUser = async (id: string) => {
    if (id === currentUser.id) return alert("You cannot delete your own curator account.");
    if (confirm("Permanently remove this record?")) {
      await supabase.from('users').delete().eq('id', id);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct(prev => ({ ...prev, images: [reader.result as string] }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Fix: Use camelCase property isApproved as defined in User interface
  const pendingUsers = users.filter(u => !u.isApproved);
  const activeUsers = users.filter(u => u.isApproved);

  return (
    <div className="page-transition py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div className="flex items-center space-x-4">
          <div className="bg-gold p-3 text-white rounded-lg shadow-lg">
            <Settings size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-charcoal">Heritage Curator Suite</h1>
            <p className="text-xs uppercase tracking-widest text-gold font-bold">Remote Sync Active</p>
          </div>
        </div>

        <div className="flex glass p-1 rounded-lg border-gold/10">
          {['Inventory', 'Site', 'Users'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-md text-[10px] uppercase tracking-widest font-bold transition-all ${
                activeTab === tab ? 'bg-charcoal text-white shadow-lg' : 'text-charcoal/50 hover:text-gold'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <div className="py-24 text-center"><Loader2 className="animate-spin text-gold mx-auto" size={48} /></div>}

      {!isLoading && activeTab === 'Inventory' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif">Artisan Inventory ({products.length})</h2>
            <button 
              onClick={() => setEditingProduct({ 
                name: '', basePrice: 0, discount: 0, category: 'Necklaces', 
                metalPurity: '1 Gram Gold', stoneType: 'None', images: [], 
                sku: 'AL-' + Math.floor(Math.random() * 9000), stockStatus: 'In Stock', weight: '', hallmark: 'Handmade',
                isNew: true, isPopular: false
              })}
              className="bg-gold text-white px-6 py-3 rounded-full flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold hover:bg-charcoal transition-all shadow-md"
            >
              <Plus size={16} />
              <span>Catalog New Piece</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="glass p-6 border-gold/10 flex items-start space-x-4 hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 bg-cream rounded-lg overflow-hidden flex-shrink-0 border border-gold/5">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] uppercase text-gold font-bold">{p.sku}</p>
                  </div>
                  <h3 className="font-serif text-sm text-charcoal truncate pr-4">{p.name}</h3>
                  <p className="text-xs text-charcoal/50 font-bold mt-1">₹{p.basePrice.toLocaleString()}</p>
                  <div className="flex space-x-4 mt-4">
                    <button onClick={() => setEditingProduct(p)} className="text-charcoal/40 hover:text-gold transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => { if(confirm("Retire this piece?")) supabase.from('products').delete().eq('id', p.id) }} className="text-charcoal/40 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && activeTab === 'Users' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
          {/* Pending Applications */}
          <section className="space-y-6">
            <h2 className="text-xl font-serif flex items-center gap-3"><Clock className="text-gold" /> Pending Applications ({pendingUsers.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pendingUsers.map(user => (
                <div key={user.id} className="glass p-6 border-gold/20 bg-gold/5">
                  <h3 className="font-serif text-lg">{user.name}</h3>
                  <p className="text-xs italic mb-4">{user.email}</p>
                  <button onClick={() => approveUser(user.id)} className="w-full bg-gold text-white py-2 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-charcoal transition-all">Grant Membership</button>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gold/10" />

          {/* Active Registry */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-serif">Active Registry ({activeUsers.length})</h2>
              <button onClick={() => setIsCreatingUser(true)} className="bg-gold text-white px-6 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 shadow-md"><UserPlus size={16} /> Add Curator</button>
            </div>
            <div className="glass overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream border-b border-gold/10 uppercase tracking-widest text-gold font-bold">
                  <tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Privilege</th><th className="p-4 text-right">Actions</th></tr>
                </thead>
                <tbody>
                  {activeUsers.map(user => (
                    <tr key={user.id} className="border-b border-gold/5 hover:bg-cream/30">
                      <td className="p-4 font-serif">{user.name}</td>
                      <td className="p-4 italic text-charcoal/60">{user.email}</td>
                      {/* Fix: Use camelCase property isAdmin as defined in User interface */}
                      <td className="p-4 uppercase text-[8px] font-bold">{user.isAdmin ? 'Curator' : 'Member'}</td>
                      <td className="p-4 text-right"><button onClick={() => deleteUser(user.id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {!isLoading && activeTab === 'Site' && (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-2">
          <div className="glass p-10 border-gold/10 space-y-6">
            <h3 className="text-xl font-serif flex items-center gap-3"><ImageIcon className="text-gold" /> Boutique Narrative Editor</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gold">Hero Title</label>
                <input className="w-full bg-cream border-b border-gold/20 p-3 text-lg font-serif" value={siteContent.hero.title} onChange={e => updateSiteContent({...siteContent, hero: {...siteContent.hero, title: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gold">Sub-narrative</label>
                <textarea className="w-full bg-cream border-b border-gold/20 p-3 text-sm" value={siteContent.hero.subtitle} onChange={e => updateSiteContent({...siteContent, hero: {...siteContent.hero, subtitle: e.target.value}})} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-md" onClick={() => setEditingProduct(null)} />
          <form onSubmit={handleProductSave} className="relative glass-dark text-white w-full max-w-2xl p-10 rounded-2xl space-y-8 max-h-[90vh] overflow-y-auto border border-gold/20 shadow-2xl">
            <h3 className="text-2xl font-serif text-gold">Catalog Masterpiece</h3>
            <div className="grid grid-cols-2 gap-8">
              <input required placeholder="Name" className="bg-white/5 border-b border-gold/30 p-2 text-sm" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
              <input required type="number" placeholder="Price" className="bg-white/5 border-b border-gold/30 p-2 text-sm" value={editingProduct.basePrice} onChange={e => setEditingProduct({...editingProduct, basePrice: parseInt(e.target.value)})} />
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden border border-gold/20">
                {editingProduct.images?.[0] ? <img src={editingProduct.images[0]} className="w-full h-full object-cover" /> : <ImageIcon size={32} className="text-gold/20" />}
              </div>
              <label className="bg-gold text-charcoal px-6 py-3 text-[10px] uppercase font-bold cursor-pointer rounded-full hover:bg-white transition-all shadow-lg">
                Update Image
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="flex justify-end gap-6 pt-8">
              <button type="button" onClick={() => setEditingProduct(null)} className="text-white/40 uppercase text-[10px] tracking-widest">Discard</button>
              <button type="submit" disabled={isSaving} className="bg-gold text-charcoal px-10 py-4 rounded-full text-[10px] uppercase font-bold hover:bg-white transition-all flex items-center gap-2">
                {isSaving && <Loader2 className="animate-spin" size={14} />} Secure Asset
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
