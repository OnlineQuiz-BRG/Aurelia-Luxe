
import React, { useState } from 'react';
import { Settings, Package, Layout as LayoutIcon, Users, Plus, Edit2, Trash2, Save, Image as ImageIcon, Key, Mail, UserPlus } from 'lucide-react';
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
        <p className="text-charcoal/60">Only boutique curators may access this suite.</p>
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
    setProducts(products.filter(p => p.id !== id));
  };

  const deleteUser = (id: string) => {
    if (id === currentUser.id) return alert("Cannot delete your own admin account.");
    setUsers(users.filter(u => u.id !== id));
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
            <h1 className="text-3xl font-serif text-charcoal">Curator's Suite</h1>
            <p className="text-xs uppercase tracking-widest text-gold font-bold">Aurelia Luxe Management</p>
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
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif">Product Catalog ({products.length})</h2>
            <button 
              onClick={() => setEditingProduct({ 
                name: '', basePrice: 0, discount: 0, category: 'Rings', 
                metalPurity: '1 Gram Gold', stoneType: 'None', images: [], 
                sku: '', stockStatus: 'In Stock', weight: '', hallmark: '',
                isNew: true, isPopular: false
              })}
              className="bg-gold text-white px-6 py-3 rounded-full flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold hover:bg-charcoal transition-all"
            >
              <Plus size={16} />
              <span>New Piece</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="glass p-6 border-gold/10 flex items-start space-x-4">
                <div className="w-20 h-20 bg-cream rounded-lg overflow-hidden flex-shrink-0">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <p className="text-[10px] uppercase text-gold font-bold">{p.sku}</p>
                    {p.discount ? <span className="text-[8px] bg-charcoal text-gold px-1 font-bold">-{p.discount}%</span> : null}
                  </div>
                  <h3 className="font-serif text-sm text-charcoal truncate">{p.name}</h3>
                  <p className="text-xs text-charcoal/50">₹{p.basePrice.toLocaleString()}</p>
                  <div className="flex space-x-3 mt-4">
                    <button onClick={() => setEditingProduct(p)} className="text-charcoal/60 hover:text-gold transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => deleteProduct(p.id)} className="text-charcoal/60 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Users' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif">Registry Management ({users.length})</h2>
            <button 
              onClick={() => setIsCreatingUser(true)}
              className="bg-gold text-white px-6 py-3 rounded-full flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold hover:bg-charcoal transition-all"
            >
              <UserPlus size={16} />
              <span>Create Login</span>
            </button>
          </div>

          <div className="glass border-gold/10 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream border-b border-gold/10">
                <tr className="uppercase tracking-widest text-gold font-bold">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-gold/5 hover:bg-cream/30 transition-colors">
                    <td className="p-4 font-serif">{user.name}</td>
                    <td className="p-4 text-charcoal/60">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[8px] uppercase font-bold ${user.isAdmin ? 'bg-gold/10 text-gold' : 'bg-charcoal/5 text-charcoal/50'}`}>
                        {user.isAdmin ? 'Curator' : 'Member'}
                      </span>
                    </td>
                    <td className="p-4">
                      <button onClick={() => deleteUser(user.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isCreatingUser && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setIsCreatingUser(false)} />
              <form onSubmit={handleCreateUser} className="relative glass-dark text-white w-full max-w-md p-8 rounded-lg space-y-6">
                <h3 className="text-2xl font-serif text-gold">Register New Login</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <LayoutIcon className="absolute left-3 top-3 text-gold/50" size={14} />
                    <input required placeholder="Full Name" className="w-full bg-white/10 border-b border-gold/30 p-2 pl-10 text-sm outline-none" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gold/50" size={14} />
                    <input required type="email" placeholder="Email Address" className="w-full bg-white/10 border-b border-gold/30 p-2 pl-10 text-sm outline-none" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 text-gold/50" size={14} />
                    <input required type="password" placeholder="Initial Password" className="w-full bg-white/10 border-b border-gold/30 p-2 pl-10 text-sm outline-none" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} />
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <input type="checkbox" checked={newUser.isAdmin} onChange={e => setNewUser({...newUser, isAdmin: e.target.checked})} className="accent-gold" />
                    <label className="text-[10px] uppercase tracking-widest">Grant Admin Access</label>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 pt-6">
                  <button type="button" onClick={() => setIsCreatingUser(false)} className="text-white/50 text-[10px] uppercase tracking-widest hover:text-white">Cancel</button>
                  <button type="submit" className="bg-gold text-charcoal px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-all">Create Account</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Site' && (
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="glass p-8 border-gold/10 space-y-6">
            <h3 className="text-xl font-serif flex items-center space-x-3">
              <ImageIcon className="text-gold" />
              <span>Hero Section Editor</span>
            </h3>
            <div className="space-y-4">
              <input 
                placeholder="Hero Title"
                className="w-full bg-cream border-b border-gold/20 p-3 text-lg font-serif outline-none"
                value={siteContent.hero.title}
                onChange={e => updateSiteContent({ ...siteContent, hero: { ...siteContent.hero, title: e.target.value } })}
              />
              <textarea 
                placeholder="Hero Subtitle"
                rows={2}
                className="w-full bg-cream border-b border-gold/20 p-3 text-sm outline-none resize-none"
                value={siteContent.hero.subtitle}
                onChange={e => updateSiteContent({ ...siteContent, hero: { ...siteContent.hero, subtitle: e.target.value } })}
              />
            </div>
          </div>

          <div className="glass p-8 border-gold/10 space-y-6">
            <h3 className="text-xl font-serif">Philosophical Core</h3>
            <div className="space-y-4">
              <textarea 
                rows={3}
                className="w-full bg-cream border-b border-gold/20 p-3 text-xl font-serif italic outline-none resize-none"
                value={siteContent.philosophy.quote}
                onChange={e => updateSiteContent({ ...siteContent, philosophy: { ...siteContent.philosophy, quote: e.target.value } })}
              />
              <input 
                className="w-full bg-cream border-b border-gold/20 p-3 text-xs uppercase tracking-widest outline-none"
                value={siteContent.philosophy.author}
                onChange={e => updateSiteContent({ ...siteContent, philosophy: { ...siteContent.philosophy, author: e.target.value } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />
          <form onSubmit={handleProductSave} className="relative glass-dark text-white w-full max-w-2xl p-8 rounded-lg space-y-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-serif text-gold">Edit Masterpiece</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <input required placeholder="Name" className="bg-white/10 border-b border-gold/30 p-2 text-sm outline-none" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
              <input required placeholder="SKU" className="bg-white/10 border-b border-gold/30 p-2 text-sm outline-none" value={editingProduct.sku} onChange={e => setEditingProduct({...editingProduct, sku: e.target.value})} />
              <input required type="number" placeholder="Base Price (INR)" className="bg-white/10 border-b border-gold/30 p-2 text-sm outline-none" value={editingProduct.basePrice} onChange={e => setEditingProduct({...editingProduct, basePrice: parseInt(e.target.value)})} />
              <input type="number" placeholder="Discount %" className="bg-white/10 border-b border-gold/30 p-2 text-sm outline-none" value={editingProduct.discount} onChange={e => setEditingProduct({...editingProduct, discount: parseInt(e.target.value)})} />
              <input placeholder="Category" className="bg-white/10 border-b border-gold/30 p-2 text-sm outline-none" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} />
              <input placeholder="Metal Purity" className="bg-white/10 border-b border-gold/30 p-2 text-sm outline-none" value={editingProduct.metalPurity} onChange={e => setEditingProduct({...editingProduct, metalPurity: e.target.value as any})} />
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden">
                {editingProduct.images?.[0] ? <img src={editingProduct.images[0]} className="w-full h-full object-cover" /> : <ImageIcon size={24} />}
              </div>
              <label className="bg-gold text-charcoal px-4 py-2 text-[10px] uppercase tracking-widest font-bold cursor-pointer rounded-full">
                Upload Image
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button type="button" onClick={() => setEditingProduct(null)} className="text-white/50 text-[10px] uppercase tracking-widest hover:text-white">Cancel</button>
              <button type="submit" className="bg-gold text-charcoal px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-all">Save Changes</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
