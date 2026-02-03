
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './contexts/StoreContext';
import Layout from './components/Layout';
import AIConcierge from './components/AIConcierge';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Bag from './pages/Bag';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/bag" element={<Bag />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
        <AIConcierge />
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
