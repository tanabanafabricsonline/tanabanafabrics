import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import CollectionListing from './components/CollectionListing';
import PDP from './components/PDP';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import api from './api';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'collection' | 'pdp' | 'admin' | 'admin-login'
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [announcementText, setAnnouncementText] = useState(() => {
    return localStorage.getItem('tanabana_announcement_text') || 'Free Nationwide Delivery on Orders > Rs. 3,500 | Cash on Delivery (COD) Available';
  });
  const [isCodEnabled, setIsCodEnabled] = useState(() => {
    return localStorage.getItem('tanabana_cod_enabled') !== 'false';
  });
  const [toastMessage, setToastMessage] = useState(null);

  const handleSaveStoreSettings = (newText, newCodStatus) => {
    setAnnouncementText(newText);
    setIsCodEnabled(newCodStatus);
    localStorage.setItem('tanabana_announcement_text', newText);
    localStorage.setItem('tanabana_cod_enabled', newCodStatus ? 'true' : 'false');
    showToast('Storefront Settings & COD configuration updated live!');
  };

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('tanabana_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'TB-1092',
        customerName: 'Tariq Mehmood',
        phone: '+92 300 4567890',
        city: 'Lahore (Gulberg III)',
        address: 'House 14, Block B, Main Boulevard, Gulberg III, Lahore',
        items: 'Koh-i-Noor Royal Boski (4.5m)',
        total: 14850,
        paymentMethod: 'Cash on Delivery (COD)',
        date: '2026-09-10 18:24',
        status: 'Pending'
      },
      {
        id: 'TB-1091',
        customerName: 'Chaudhry Bilal',
        phone: '+92 321 8765432',
        city: 'Islamabad (F-7/2)',
        address: 'Street 12, Sector F-7/2, Islamabad',
        items: 'Egyptian Giza Latha Supreme (4.5m)',
        total: 11200,
        paymentMethod: 'Cash on Delivery (COD)',
        date: '2026-09-10 16:10',
        status: 'Dispatched'
      },
      {
        id: 'TB-1090',
        customerName: 'Dr. Usman Khalid',
        phone: '+92 333 1122334',
        city: 'Karachi (DHA Phase 6)',
        address: 'Bungalow 88, Khayaban-e-Seher, DHA Phase 6, Karachi',
        items: 'Imperial Pure Silk Karandi (4.5m)',
        total: 18500,
        paymentMethod: 'Prepaid Bank Transfer',
        date: '2026-09-09 21:45',
        status: 'Completed'
      },
      {
        id: 'TB-1089',
        customerName: 'Shahid Afridi',
        phone: '+92 301 9988776',
        city: 'Peshawar (Cantonment)',
        address: 'Mall Road, Peshawar Cantt',
        items: 'Heritage Textured Karandi (4.5m)',
        total: 8900,
        paymentMethod: 'Cash on Delivery (COD)',
        date: '2026-09-09 14:15',
        status: 'Completed'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tanabana_orders', JSON.stringify(orders));
  }, [orders]);

  const handlePlaceOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    showToast(`Order #${newOrder.id} placed successfully!`);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order #${orderId} status changed to "${newStatus}"`);
  };

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

  // Helper to change view and update browser URL bar path
  const changeView = (view) => {
    setCurrentView(view);
    let path = '/';
    if (view === 'admin-login') path = '/admin-login';
    else if (view === 'admin') path = '/admin';
    else if (view === 'collection') path = '/collection';
    else if (view === 'pdp') path = '/pdp';
    
    if (window.location.pathname !== path) {
      window.history.pushState({ view }, '', path);
    }
  };

  // Load existing session & URL path routes on mount & popstate
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname;
      const search = window.location.search;

      if (path === '/admin-login' || path === '/admin/login' || search.includes('admin=login') || search.includes('admin')) {
        setCurrentView('admin-login');
      } else if (path === '/admin' || path === '/admin/dashboard') {
        setCurrentView('admin');
      } else if (path === '/collection') {
        setCurrentView('collection');
      } else if (path === '/pdp' || path.startsWith('/product')) {
        setCurrentView('pdp');
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);

    const token = localStorage.getItem('tanabana_token');
    if (token) {
      api.getProfile()
        .then(res => {
          if (res.data) {
            setCurrentUser(res.data);
            const path = window.location.pathname;
            if ((path === '/admin' || path === '/admin-login' || window.location.search.includes('admin')) && res.data.role === 'admin') {
              changeView('admin');
            }
          }
        })
        .catch(() => {
          localStorage.removeItem('tanabana_token');
        });
    }

    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, []);

  const handleCustomerLoginSuccess = (user) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name || user.email}!`);
  };

  const handleAdminLoginSuccess = (adminUser) => {
    setCurrentUser(adminUser);
    changeView('admin');
    showToast('Admin Authentication Successful. Welcome to Dashboard!');
  };

  const handleLogout = () => {
    localStorage.removeItem('tanabana_token');
    setCurrentUser(null);
    if (currentView === 'admin' || currentView === 'admin-login') changeView('home');
    showToast('Logged out successfully.');
  };

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

  const isAdminRoute = currentView === 'admin-login' || currentView === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-background font-body-md text-on-surface">
      {/* Top Navbar (Hidden on Admin Routes) */}
      {!isAdminRoute && (
        <Navbar 
          currentView={currentView}
          setCurrentView={changeView}
          cartCount={cartCount}
          cartTotal={cartTotal}
          toggleCart={() => setIsCartOpen(!isCartOpen)}
          setIsSearchOpen={setIsSearchOpen}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          announcementText={announcementText}
        />
      )}

      {/* Main View Router */}
      <main className={`flex-1 ${isAdminRoute ? 'pt-0' : 'pt-[116px]'}`}>
        {currentView === 'home' && (
          <Homepage 
            setCurrentView={changeView} 
            addToCart={addToCart} 
          />
        )}

        {currentView === 'collection' && (
          <CollectionListing 
            setCurrentView={changeView} 
            addToCart={addToCart} 
          />
        )}

        {currentView === 'pdp' && (
          <PDP 
            setCurrentView={changeView} 
            addToCart={addToCart} 
          />
        )}

        {currentView === 'admin-login' && (
          <AdminLogin 
            onAdminLoginSuccess={handleAdminLoginSuccess}
            onCancel={() => changeView('home')}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard 
            currentUser={currentUser}
            currentAnnouncementText={announcementText}
            currentIsCodEnabled={isCodEnabled}
            onSaveStoreSettings={handleSaveStoreSettings}
            onNavigateHome={() => changeView('home')}
            onLogout={handleLogout}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onPlaceOrder={handlePlaceOrder}
          />
        )}
      </main>

      {/* Footer (Hidden on Admin Routes) */}
      {!isAdminRoute && (
        <Footer setCurrentView={changeView} />
      )}

      {/* Auth Modal (Login / Registration) */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleCustomerLoginSuccess}
      />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        cartTotal={cartTotal}
        setCurrentView={setCurrentView}
        onPlaceOrder={handlePlaceOrder}
        isCodEnabled={isCodEnabled}
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
              <span>Press Enter to search all catalog items</span>
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

      {/* Floating WhatsApp Quick Order Button (Hidden on Admin Routes) */}
      {!isAdminRoute && (
        <a
          href="https://wa.me/923001234567?text=Assalam-o-Alaikum!%20I%20have%20a%20query%20about%20Tanabana%20Fabrics."
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:bg-[#1EBE5B] transition-all flex items-center gap-2 font-label-caps text-xs uppercase font-bold tracking-wider cursor-pointer group"
          title="Chat on WhatsApp"
        >
          <span className="material-symbols-outlined text-[24px]">chat</span>
          <span className="hidden sm:inline">WhatsApp Order</span>
        </a>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F382C] text-white px-space-lg py-space-md shadow-2xl rounded flex items-center gap-3 animate-fade-in border border-[#D4AF37]">
          <span className="material-symbols-outlined text-[#D4AF37]">check_circle</span>
          <span className="font-label-caps text-xs uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
