'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '../context/StoreContext';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';

export default function StorefrontWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const store = useStore();

  const isAdminRoute = pathname === '/admin' || pathname === '/admin-login' || pathname.startsWith('/admin');

  const changeView = (view) => {
    if (view === 'home') router.push('/');
    else if (view === 'collection') router.push('/collection');
    else if (view === 'pdp') router.push('/pdp');
    else if (view === 'admin-login') router.push('/admin-login');
    else if (view === 'admin') router.push('/admin');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E293B]">
      {/* Customer Navbar (Hidden on Admin routes) */}
      {!isAdminRoute && (
        <Navbar 
          currentView={pathname.replace('/', '') || 'home'}
          setCurrentView={changeView}
          cartCount={store.cartCount}
          cartTotal={store.cartTotal}
          toggleCart={() => store.setIsCartOpen(!store.isCartOpen)}
          setIsSearchOpen={store.setIsSearchOpen}
          currentUser={store.currentUser}
          onOpenAuthModal={() => store.setIsAuthModalOpen(true)}
          onLogout={store.handleLogout}
          announcementText={store.announcementText}
        />
      )}

      {/* Main Content View */}
      <main className={`flex-1 ${isAdminRoute ? 'pt-0' : 'pt-[116px]'}`}>
        {children}
      </main>

      {/* Customer Footer (Hidden on Admin routes) */}
      {!isAdminRoute && (
        <Footer setCurrentView={changeView} />
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={store.isAuthModalOpen}
        onClose={() => store.setIsAuthModalOpen(false)}
        onLoginSuccess={store.handleCustomerLoginSuccess}
      />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={store.isCartOpen}
        onClose={() => store.setIsCartOpen(false)}
        cartItems={store.cartItems}
        updateQuantity={store.updateQuantity}
        removeItem={store.removeItem}
        cartTotal={store.cartTotal}
        setCurrentView={changeView}
        onPlaceOrder={store.handlePlaceOrder}
        isCodEnabled={store.isCodEnabled}
        currentUser={store.currentUser}
        onOpenAuthModal={() => store.setIsAuthModalOpen(true)}
        checkoutDraft={store.checkoutDraft}
        saveCheckoutDraft={store.saveCheckoutDraft}
        showToast={store.showToast}
      />

      {/* Search Modal */}
      {store.isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-24 px-4">
          <div className="bg-white w-full max-w-2xl p-6 rounded shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <span className="font-bold text-xs uppercase tracking-widest text-[#0F382C]">Search Catalog</span>
              <button onClick={() => store.setIsSearchOpen(false)} className="text-gray-500 hover:text-black">&times;</button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">search</span>
              <input 
                autoFocus
                placeholder="Search Giza Latha, Boski Silk, Lawn 3pc, or Karandi..." 
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#EAE6DF] rounded text-sm focus:outline-none focus:border-[#0F382C]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    store.setIsSearchOpen(false);
                    router.push('/collection');
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
              <span>Press Enter to search all catalog items</span>
              <button 
                onClick={() => { store.setIsSearchOpen(false); router.push('/collection'); }}
                className="text-[#0F382C] underline font-bold"
              >
                Browse All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Quick Order Button (Hidden on Admin routes) */}
      {!isAdminRoute && (
        <a
          href="https://wa.me/923001234567?text=Assalam-o-Alaikum!%20I%20have%20a%20query%20about%20Tanabana%20Fabrics."
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:bg-[#1EBE5B] transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-wider cursor-pointer group"
          title="Chat on WhatsApp"
        >
          <span className="material-symbols-outlined text-[24px]">chat</span>
          <span className="hidden sm:inline">WhatsApp Order</span>
        </a>
      )}

      {/* Toast Notification */}
      {store.toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F382C] text-white px-6 py-3 shadow-2xl rounded flex items-center gap-3 animate-fade-in border border-[#D4AF37]">
          <span className="material-symbols-outlined text-[#D4AF37]">check_circle</span>
          <span className="text-xs uppercase font-bold tracking-wider">{store.toastMessage}</span>
        </div>
      )}
    </div>
  );
}
