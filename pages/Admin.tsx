
import React, { useState } from 'react';
import { Settings, Package, Layout as LayoutIcon, Users, Plus, Edit2, Trash2, Save, Image as ImageIcon, Key, Mail, UserPlus, ShieldCheck } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { Product, SiteContent, User } from '../types';

const Admin: React.FC = () => {
  const { products, setProducts, siteContent, updateSiteContent, currentUser, users, setUsers } = useStore();
  const [activeTab, setActiveTab] = useState<'Inventory' | 'Site' | 'Users'>('Inventory');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', isAdmin: false });

  if (!currentUser?.isAdmin) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-4xl font-serif mb-4">Access Restricted</h1>
        <p className="text-charcoal/60">Only boutique curators may access the heritage management suite.</p>
      </div>
    );
  }

  const handleProductSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    if (editingProduct.id) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct as Product : p));
    } else {
      const newProduct = { 
        ...editingProduct, 
        id: Math.random().toString(36).substring(7),
        reviews: [] 
      } as Product;
      setProducts([...products, newProduct]);
    }
    setEditingProduct(null);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const userObj: User = {
      ...newUser,
      id: 'u-' + Math.random().toString(36).substring(7),
      orderHistory: [],
      isSubscribed: true,
      wishlist: []
    };
    setUsers([...users, userObj]);
    setNewUser({ name: '', email: '', password: '', isAdmin: false });
    setIsCreatingUser(false);
  };

  const deleteProduct = (id: string) => {
    if (confirm("Are you certain you wish to retire this piece?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const deleteUser = (id: string) => {
    if (id === currentUser.id) return alert("You cannot delete your own curator account.");
    if (confirm("Revoke this member's access?")) {
      setUsers(users.filter(u => u.id !== id));
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

  return (
    <div className="page-transition py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div className="flex items-center space-x-4">
          <div className="bg-gold p-3 text-white rounded-lg shadow-lg">
            <Settings size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-charcoal">Heritage Curator Suite</h1>
            <p className="text-xs uppercase tracking-widest text-gold font-bold">Handmade Legacy Management</p>
          </div>
        </div>

        <div className="flex glass p-1 rounded-lg border-gold/10">
          {[
            { id: 'Inventory', icon: Package },
            { id: 'Site', icon: LayoutIcon },
            { id: 'Users', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-2 rounded-md text-[10px] uppercase tracking-widest font-bold transition-all ${
                activeTab === tab.id ? 'bg-charcoal text-white shadow-lg' : 'text-charcoal/50 hover:text-gold'
              }`}
            >
              <tab.icon size={14} />
              <span>{tab.id}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Inventory' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif">Artisan Inventory ({products.length})</h2>
            <button 
              onClick={() => setEditingProduct({ 
                name: '', basePrice: 0, discount: 0, category: 'Necklaces', 
                metalPurity: '1 Gram Gold', stoneType: 'None', images: [], 
                sku: '', stockStatus: 'In Stock', weight: '', hallmark: 'Handmade',
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
                    {p.discount ? <span className="text-[8px] bg-charcoal text-gold px-2 py-0.5 font-bold rounded">-{p.discount}%</span> : null}
                  </div>
                  <h3 className="font-serif text-sm text-charcoal truncate pr-4">{p.name}</h3>
                  <p className="text-xs text-charcoal/50 font-bold mt-1">₹{p.basePrice.toLocaleString()}</p>
                  <div className="flex space-x-4 mt-4">
                    <button onClick={() => setEditingProduct(p)} className="text-charcoal/40 hover:text-gold transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => deleteProduct(p.id)} className="text-charcoal/40 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Users' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif">Aurelia Registry ({users.length})</h2>
            <button 
              onClick={() => setIsCreatingUser(true)}
              className="bg-gold text-white px-6 py-3 rounded-full flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold hover:bg-charcoal transition-all shadow-md"
            >
              <UserPlus size={16} />
              <span>Register New Member</span>
            </button>
          </div>

          <div className="glass border-gold/10 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream border-b border-gold/10">
                <tr className="uppercase tracking-widest text-gold font-bold">
                  <th className="p-4">Full Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Privilege</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-gold/5 hover:bg-cream/30 transition-colors">
                    <td className="p-4 font-serif text-charcoal">{user.name}</td>
                    <td className="p-4 text-charcoal/60 italic">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[8px] uppercase font-bold tracking-widest ${user.isAdmin ? 'bg-gold/10 text-gold border border-gold/20' : 'bg-charcoal/5 text-charcoal/40'}`}>
                        {user.isAdmin ? 'Master Curator' : 'Client Member'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => deleteUser(user.id)} 
                        className="text-red-400 hover:text-red-600 transition-colors"
                        disabled={user.id === currentUser.id}
                      >
                        <Trash2 size={14} className={user.id === currentUser.id ? 'opacity-20' : ''} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isCreatingUser && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setIsCreatingUser(false)} />
              <form onSubmit={handleCreateUser} className="relative glass-dark text-white w-full max-w-md p-10 rounded-2xl space-y-6 shadow-2xl border border-gold/20">
                <h3 className="text-2xl font-serif text-gold">Establish New Membership</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <LayoutIcon className="absolute left-3 top-3 text-gold/50" size={14} />
                    <input required placeholder="Full Member Name" className="w-full bg-white/5 border-b border-gold/20 p-2 pl-10 text-sm outline-none focus:border-gold transition-colors" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gold/50" size={14} />
                    <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border-b border-gold/20 p-2 pl-10 text-sm outline-none focus:border-gold transition-colors" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 text-gold/50" size={14} />
                    <input required type="password" placeholder="Temporary Credentials" className="w-full bg-white/5 border-b border-gold/20 p-2 pl-10 text-sm outline-none focus:border-gold transition-colors" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} />
                  </div>
                  <div className="flex items-center gap-3 py-2 bg-white/5 p-3 rounded border border-gold/5">
                    <input type="checkbox" id="adminCheck" checked={newUser.isAdmin} onChange={e => setNewUser({...newUser, isAdmin: e.target.checked})} className="accent-gold w-4 h-4" />
                    <label htmlFor="adminCheck" className="text-[10px] uppercase tracking-widest text-gold/80 font-bold flex items-center gap-1 cursor-pointer">
                      <ShieldCheck size={12} /> Grant Curatorial Privileges
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 pt-6">
                  <button type="button" onClick={() => setIsCreatingUser(false)} className="text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Cancel</button>
                  <button type="submit" className="bg-gold text-charcoal px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-all shadow-xl">Confirm Registration</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Site' && (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-2">
          <div className="glass p-10 border-gold/10 space-y-6 shadow-sm">
            <h3 className="text-xl font-serif flex items-center space-x-3 text-charcoal">
              <ImageIcon className="text-gold" />
              <span>Boutique Narrative Editor</span>
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold">Hero Title</label>
                <input 
                  placeholder="The Heritage Masterpiece"
                  className="w-full bg-cream border-b border-gold/20 p-3 text-lg font-serif outline-none focus:border-gold"
                  value={siteContent.hero.title}
                  onChange={e => updateSiteContent({ ...siteContent, hero: { ...siteContent.hero, title: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold">Sub-narrative</label>
                <textarea 
                  placeholder="Describe the artisan soul..."
                  rows={2}
                  className="w-full bg-cream border-b border-gold/20 p-3 text-sm outline-none resize-none focus:border-gold"
                  value={siteContent.hero.subtitle}
                  onChange={e => updateSiteContent({ ...siteContent, hero: { ...siteContent.hero, subtitle: e.target.value } })}
                />
              </div>
            </div>
          </div>

          <div className="glass p-10 border-gold/10 space-y-6 shadow-sm">
            <h3 className="text-xl font-serif text-charcoal">Artisan Philosophy</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold">The Quote</label>
                <textarea 
                  rows={3}
                  className="w-full bg-cream border-b border-gold/20 p-3 text-xl font-serif italic outline-none resize-none focus:border-gold text-charcoal/80"
                  value={siteContent.philosophy.quote}
                  onChange={e => updateSiteContent({ ...siteContent, philosophy: { ...siteContent.philosophy, quote: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gold">Attribution</label>
                <input 
                  className="w-full bg-cream border-b border-gold/20 p-3 text-xs uppercase tracking-widest outline-none focus:border-gold"
                  value={siteContent.philosophy.author}
                  onChange={e => updateSiteContent({ ...siteContent, philosophy: { ...siteContent.philosophy, author: e.target.value } })}
                />
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
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest font-bold text-gold/60">Product Name</label>
                <input required className="w-full bg-white/5 border-b border-gold/30 p-2 text-sm outline-none focus:border-gold" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest font-bold text-gold/60">Registry SKU</label>
                <input required className="w-full bg-white/5 border-b border-gold/30 p-2 text-sm outline-none focus:border-gold" value={editingProduct.sku} onChange={e => setEditingProduct({...editingProduct, sku: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest font-bold text-gold/60">Base Price (INR)</label>
                <input required type="number" className="w-full bg-white/5 border-b border-gold/30 p-2 text-sm outline-none focus:border-gold" value={editingProduct.basePrice} onChange={e => setEditingProduct({...editingProduct, basePrice: parseInt(e.target.value)})} />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest font-bold text-gold/60">Legacy Discount (%)</label>
                <input type="number" className="w-full bg-white/5 border-b border-gold/30 p-2 text-sm outline-none focus:border-gold" value={editingProduct.discount} onChange={e => setEditingProduct({...editingProduct, discount: parseInt(e.target.value)})} />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest font-bold text-gold/60">Boutique Category</label>
                <input className="w-full bg-white/5 border-b border-gold/30 p-2 text-sm outline-none focus:border-gold" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest font-bold text-gold/60">Metal Specification</label>
                <input className="w-full bg-white/5 border-b border-gold/30 p-2 text-sm outline-none focus:border-gold" value={editingProduct.metalPurity} onChange={e => setEditingProduct({...editingProduct, metalPurity: e.target.value as any})} />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden border border-gold/20 shadow-inner">
                {editingProduct.images?.[0] ? <img src={editingProduct.images[0]} className="w-full h-full object-cover" /> : <ImageIcon size={32} className="text-gold/20" />}
              </div>
              <label className="bg-gold text-charcoal px-6 py-3 text-[10px] uppercase tracking-widest font-bold cursor-pointer rounded-full hover:bg-white transition-all shadow-lg active:scale-95">
                Update Visual Asset
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>

            <div className="flex justify-end space-x-6 pt-8">
              <button type="button" onClick={() => setEditingProduct(null)} className="text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Discard</button>
              <button type="submit" className="bg-gold text-charcoal px-10 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-all shadow-xl">Secure Asset</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
