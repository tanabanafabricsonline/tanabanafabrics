import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import CollectionListing from './components/CollectionListing';
import PDP from './components/PDP';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'collection' | 'pdp'
  const [currency, setCurrency] = useState('PKR');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [cartItems, setCartItems] = useState([
    {
      id: 'pdp-boski',
      title: 'Koh-i-Noor Royal Boski 10-Pound Unstitched Suit',
      category: "MEN'S UNSTITCHED",
      price: 14850,
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmhpUZ5GJ3bNCO-67FTswqbMIsYYYwFmemtr_psiQ9xoubda9R2lnKy8mvVijFlzgFu17g2wbHix6xe83CKlCw88gi1a58uGGCd_aTttWkrv-uZ40camFc5H6WA5G3KUFy5KoQz7ipxrn9GJNrhl6NsuScb68PqX18n2MhDMO5Cd9Y1sxTTannS5h8nXGMC8kJVKkjU6mVLqU8uyFsC1CvsnaTXZljmVykxApvSKJlwCaT7-CUb0y0',
      options: '4.5m Cut + Horn Buttons'
    }
  ]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += product.quantity || 1;
        return updated;
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });

    showToast(`Added "${product.title}" to Bag!`);
    setIsCartOpen(true);
  };

  const updateQuantity = (idx, newQty) => {
    if (newQty <= 0) {
      removeItem(idx);
      return;
    }
    setCartItems(prev => {
      const updated = [...prev];
      updated[idx].quantity = newQty;
      return updated;
    });
  };

  const removeItem = (idx) => {
    setCartItems(prev => prev.filter((_, i) => i !== idx));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface">
      {/* Top Navbar */}
      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cartCount}
        cartTotal={cartTotal}
        currency={currency}
        setCurrency={setCurrency}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        setIsSearchOpen={setIsSearchOpen}
      />

      {/* Main View Router */}
      <main className="flex-1 pt-[116px]">
        {currentView === 'home' && (
          <Homepage 
            setCurrentView={setCurrentView} 
            addToCart={addToCart} 
          />
        )}

        {currentView === 'collection' && (
          <CollectionListing 
            setCurrentView={setCurrentView} 
            addToCart={addToCart} 
          />
        )}

        {currentView === 'pdp' && (
          <PDP 
            setCurrentView={setCurrentView} 
            addToCart={addToCart} 
          />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        cartTotal={cartTotal}
        currency={currency}
        setCurrentView={setCurrentView}
      />

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-24 px-4">
          <div className="bg-surface-container-lowest w-full max-w-2xl p-space-lg rounded shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-surface-container pb-2">
              <span className="font-label-caps text-xs uppercase tracking-widest text-secondary font-bold">Search Catalog</span>
              <button onClick={() => setIsSearchOpen(false)} className="text-outline hover:text-primary">&times;</button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-outline">search</span>
              <input 
                autoFocus
                placeholder="Search Giza Latha, Boski Silk, Lawn 3pc, or Karandi..." 
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-surface-container-high rounded text-sm focus:outline-none focus:border-primary"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsSearchOpen(false);
                    setCurrentView('collection');
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-outline pt-2">
              <span>Press Enter to search all 42 catalog items</span>
              <button 
                onClick={() => { setIsSearchOpen(false); setCurrentView('collection'); }}
                className="text-primary underline font-bold"
              >
                Browse All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-space-lg py-space-md shadow-2xl rounded flex items-center gap-3 animate-fade-in">
          <span className="material-symbols-outlined text-[#C5A880]">check_circle</span>
          <span className="font-label-caps text-xs uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
