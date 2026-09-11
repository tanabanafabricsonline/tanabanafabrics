'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [announcementText, setAnnouncementText] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tanabana_announcement_text') || 'Free Nationwide Delivery on Orders > Rs. 3,500 | Cash on Delivery (COD) Available';
    }
    return 'Free Nationwide Delivery on Orders > Rs. 3,500 | Cash on Delivery (COD) Available';
  });

  const [isCodEnabled, setIsCodEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tanabana_cod_enabled') !== 'false';
    }
    return true;
  });

  const [toastMessage, setToastMessage] = useState(null);

  const [checkoutDraft, setCheckoutDraft] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tanabana_checkout_draft');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return { customerName: '', customerPhone: '', customerCity: 'Lahore', customerAddress: '' };
  });

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

  const [orders, setOrders] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tanabana_orders');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
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

  // Hydrate user profile on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('tanabana_token');
      if (token) {
        api.getProfile()
          .then(res => {
            if (res.data) setCurrentUser(res.data);
          })
          .catch(() => {
            localStorage.removeItem('tanabana_token');
          });
      }
    }
  }, []);

  // Save orders changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tanabana_orders', JSON.stringify(orders));
    }
  }, [orders]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveStoreSettings = (newText, newCodStatus) => {
    setAnnouncementText(newText);
    setIsCodEnabled(newCodStatus);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tanabana_announcement_text', newText);
      localStorage.setItem('tanabana_cod_enabled', newCodStatus ? 'true' : 'false');
    }
    showToast('Storefront Settings & COD configuration updated live!');
  };

  // Automatically close cart sidebar whenever Auth Modal is opened
  useEffect(() => {
    if (isAuthModalOpen) {
      setIsCartOpen(false);
    }
  }, [isAuthModalOpen]);

  const saveCheckoutDraft = (draft) => {
    setCheckoutDraft(draft);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tanabana_checkout_draft', JSON.stringify(draft));
    }
  };

  const handleCustomerLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${user.name || user.email}!`);
    // Re-open cart drawer after Auth Modal finishes closing
    setTimeout(() => {
      if (cartItems.length > 0) {
        setIsCartOpen(true);
      }
    }, 100);
  };

  const handleAdminLoginSuccess = (adminUser) => {
    setCurrentUser(adminUser);
    showToast('Admin Authentication Successful. Welcome to Dashboard!');
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tanabana_token');
    }
    setCurrentUser(null);
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

  const handlePlaceOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tanabana_checkout_draft');
    }
    setCheckoutDraft({ customerName: '', customerPhone: '', customerCity: 'Lahore', customerAddress: '' });
    showToast(`Order #${newOrder.id} placed successfully!`);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order #${orderId} status changed to "${newStatus}"`);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const value = {
    isCartOpen,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    setCurrentUser,
    checkoutDraft,
    saveCheckoutDraft,
    announcementText,
    setAnnouncementText,
    isCodEnabled,
    setIsCodEnabled,
    handleSaveStoreSettings,
    toastMessage,
    showToast,
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    cartTotal,
    cartCount,
    orders,
    handlePlaceOrder,
    handleUpdateOrderStatus,
    handleCustomerLoginSuccess,
    handleAdminLoginSuccess,
    handleLogout
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
