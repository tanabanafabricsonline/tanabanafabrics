'use client';

import React, { useState, useEffect } from 'react';
import api from '../api';

export default function AdminDashboard({
  currentUser,
  currentAnnouncementText,
  currentIsCodEnabled,
  onSaveStoreSettings,
  onNavigateHome,
  onLogout,
  orders = [],
  onUpdateOrderStatus,
  onPlaceOrder
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'settings' | 'customers'

  // Settings State
  const [announcementText, setAnnouncementText] = useState(
    currentAnnouncementText || 'Free Nationwide Delivery on Orders > Rs. 3,500 | Cash on Delivery (COD) Available'
  );
  const [isCodEnabled, setIsCodEnabled] = useState(
    currentIsCodEnabled !== undefined ? currentIsCodEnabled : true
  );
  const [freeShippingMin, setFreeShippingMin] = useState(3500);
  const [supportPhone, setSupportPhone] = useState('+92 300 1234567');

  // Sync props when updated externally
  useEffect(() => {
    if (currentAnnouncementText) setAnnouncementText(currentAnnouncementText);
  }, [currentAnnouncementText]);

  useEffect(() => {
    if (currentIsCodEnabled !== undefined) setIsCodEnabled(currentIsCodEnabled);
  }, [currentIsCodEnabled]);

  // Product Catalog State
  const [products, setProducts] = useState([
    {
      id: 'pdp-boski',
      _id: 'pdp-boski',
      name: 'Koh-i-Noor Royal Boski 10-Pound Unstitched Suit',
      category: "MEN'S UNSTITCHED",
      price: 14850,
      specs: '100% Spun Silk • 4.5 Meters Cut • Horn Buttons',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAmhpUZ5GJ3bNCO-67FTswqbMIsYYYwFmemtr_psiQ9xoubda9R2lnKy8mvVijFlzgFu17g2wbHix6xe83CKlCw88gi1a58uGGCd_aTttWkrv-uZ40camFc5H6WA5G3KUFy5KoQz7ipxrn9GJNrhl6NsuScb68PqX18n2MhDMO5Cd9Y1sxTTannS5h8nXGMC8kJVKkjU6mVLqU8uyFsC1CvsnaTXZljmVykxApvSKJlwCaT7-CUb0y0'],
      inStock: true
    },
    {
      id: 'giza-latha-1',
      _id: 'giza-latha-1',
      name: 'Egyptian Giza Latha Supreme 120s Unstitched',
      category: 'GIZA COTTON',
      price: 11200,
      specs: '100% Egyptian Giza Cotton • 4.5 Meters',
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop'],
      inStock: true
    },
    {
      id: 'karandi-winter-1',
      _id: 'karandi-winter-1',
      name: 'Heritage Textured Karandi Winter Suit',
      category: 'WINTER SPECIAL',
      price: 8900,
      specs: 'Handloom Karandi Cotton • Warm Fall',
      images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop'],
      inStock: true
    },
    {
      id: 'silk-karandi-2',
      _id: 'silk-karandi-2',
      name: 'Imperial Pure Silk Karandi Limited Edition',
      category: 'LUXURY SILK',
      price: 18500,
      specs: 'Pure Silk Weave • 4.5m Premium Cut',
      images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop'],
      inStock: false
    }
  ]);
  const [productCategoryFilter, setProductCategoryFilter] = useState('ALL');
  const [productSearch, setProductSearch] = useState('');

  // Modals for Products
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    category: "MEN'S UNSTITCHED",
    price: 9500,
    specs: '100% Spun Silk • 4.5 Meters Cut',
    images: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
    inStock: true
  });

  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL');

  const handleSimulateTestOrder = () => {
    const randomId = `TB-${Math.floor(1000 + Math.random() * 9000)}`;
    const cities = ['Lahore (Gulberg)', 'Karachi (DHA)', 'Islamabad (F-8)', 'Rawalpindi (Bahria Town)'];
    const names = ['Hamza Ali', 'Zayn Malik', 'Kamran Akmal', 'Farhan Saeed'];
    const suits = ['Koh-i-Noor Royal Boski (4.5m)', 'Egyptian Giza Latha (4.5m)', 'Heritage Textured Karandi (4.5m)'];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const prices = [14850, 11200, 8900, 18500];
    const randomPrice = prices[Math.floor(Math.random() * prices.length)];

    const testOrder = {
      id: randomId,
      customerName: randomName,
      phone: '+92 300 ' + Math.floor(1000000 + Math.random() * 9000000),
      city: randomCity,
      address: `Street ${Math.floor(1 + Math.random()*20)}, ${randomCity}`,
      items: randomSuit,
      total: randomPrice,
      paymentMethod: 'Cash on Delivery (COD)',
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'Pending'
    };

    if (onPlaceOrder) {
      onPlaceOrder(testOrder);
    }
  };

  // Customer List State
  const [customers] = useState([
    { name: 'Tariq Mehmood', email: 'tariq@gmail.com', phone: '+92 300 4567890', city: 'Lahore', ordersCount: 3, totalSpent: 42500 },
    { name: 'Chaudhry Bilal', email: 'bilal@hotmail.com', phone: '+92 321 8765432', city: 'Islamabad', ordersCount: 2, totalSpent: 26000 },
    { name: 'Dr. Usman Khalid', email: 'usman.khalid@yahoo.com', phone: '+92 333 1122334', city: 'Karachi', ordersCount: 5, totalSpent: 89000 },
    { name: 'Shahid Afridi', email: 'shahid.afridi@gmail.com', phone: '+92 301 9988776', city: 'Peshawar', ordersCount: 1, totalSpent: 8900 }
  ]);

  // Load backend data if available
  useEffect(() => {
    api.getProducts()
      .then(res => {
        if (res.products && res.products.length > 0) {
          setProducts(res.products);
        }
      })
      .catch(() => {
        // Keep mock defaults if backend API offline
      });
  }, []);

  // Save Settings Handler
  const handleSaveSettings = (e) => {
    if (e) e.preventDefault();
    if (onSaveStoreSettings) {
      onSaveStoreSettings(announcementText, isCodEnabled);
    }
  };

  // Add Product Handler
  const handleAddProduct = (e) => {
    e.preventDefault();
    const newId = `suit-${Date.now()}`;
    const newSuit = {
      id: newId,
      _id: newId,
      name: productFormData.name,
      category: productFormData.category,
      price: Number(productFormData.price),
      specs: productFormData.specs,
      images: [productFormData.images],
      inStock: productFormData.inStock
    };

    setProducts([newSuit, ...products]);
    setShowAddProductModal(false);
    setProductFormData({
      name: '',
      category: "MEN'S UNSTITCHED",
      price: 9500,
      specs: '100% Spun Silk • 4.5 Meters Cut',
      images: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
      inStock: true
    });
    alert(`Success: "${newSuit.name}" published to catalog!`);
  };

  // Edit Product Handlers
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name || product.title,
      category: product.category || "MEN'S UNSTITCHED",
      price: product.price,
      specs: product.specs || '4.5 Meters Cut',
      images: Array.isArray(product.images) ? product.images[0] : (product.image || ''),
      inStock: product.inStock !== false
    });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProducts(prev => prev.map(p => {
      if ((p._id || p.id) === (editingProduct._id || editingProduct.id)) {
        return {
          ...p,
          name: productFormData.name,
          category: productFormData.category,
          price: Number(productFormData.price),
          specs: productFormData.specs,
          images: [productFormData.images],
          inStock: productFormData.inStock
        };
      }
      return p;
    }));

    setEditingProduct(null);
    alert(`Updated "${productFormData.name}" successfully!`);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to remove this suit from the store catalog?')) {
      setProducts(prev => prev.filter(p => (p._id || p.id) !== id));
    }
  };

  const handleToggleStock = (id) => {
    setProducts(prev => prev.map(p => {
      if ((p._id || p.id) === id) {
        return { ...p, inStock: !p.inStock };
      }
      return p;
    }));
  };

  // Update Order Status via App props
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, newStatus);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesCat = productCategoryFilter === 'ALL' || (p.category || '').toUpperCase().includes(productCategoryFilter);
    const matchesSearch = (p.name || p.title || '').toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter === 'ALL') return true;
    return (o.status || '').toUpperCase() === orderStatusFilter.toUpperCase();
  });

  // Calculate Metrics (CRITICAL: Cancelled orders payment is EXCLUDED from Gross Sales Revenue!)
  const activeOrders = orders.filter(o => o.status !== 'Cancelled');
  const totalRevenue = activeOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1E293B] flex flex-col font-sans antialiased">
      
      {/* EXECUTIVE TOP BAR */}
      <header className="bg-[#0F382C] text-white border-b border-[#D4AF37]/30 sticky top-0 z-40 shadow-lg px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#D4AF37] text-[#0F382C] font-serif font-bold text-xl flex items-center justify-center shadow-md">
            TB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-white">
                Tanabana Fabrics
              </h1>
              <span className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest">
                Executive Portal
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/80 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Storefront • Currency: PKR (Rs.)
            </p>
          </div>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={onNavigateHome}
            className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-white/15 transition-all cursor-pointer"
            title="View customer storefront"
          >
            <span className="material-symbols-outlined text-[16px]">storefront</span>
            <span className="hidden sm:inline">Storefront Preview</span>
          </button>

          <button
            onClick={() => setShowAddProductModal(true)}
            className="px-3.5 py-1.5 bg-[#B8860B] hover:bg-[#966C07] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>+ Add Suit</span>
          </button>

          <div className="h-6 w-px bg-white/20 mx-1 hidden sm:block"></div>

          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded text-xs">
            <span className="material-symbols-outlined text-[16px] text-[#D4AF37]">admin_panel_settings</span>
            <span className="font-medium text-white truncate max-w-[120px]">{currentUser?.email || 'admin@tanabana.com'}</span>
          </div>

          <button
            onClick={onLogout}
            className="px-3 py-1.5 bg-red-800/80 hover:bg-red-800 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
            title="Sign out of portal"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER WITH SIDEBAR & CONTENT */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SIDEBAR NAVIGATION TABS */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl shadow-xs border border-[#EAE6DF] p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-widest text-gray-400">
              Management Menu
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-gray-700 hover:bg-[#FAF8F5] hover:text-[#0F382C]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">dashboard</span>
                <span>Dashboard Overview</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 font-mono">1</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer transition-all ${
                activeTab === 'products'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-gray-700 hover:bg-[#FAF8F5] hover:text-[#0F382C]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">styler</span>
                <span>Fabric Suits Catalog</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] text-[#0F382C] font-bold border border-[#EAE6DF]">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-gray-700 hover:bg-[#FAF8F5] hover:text-[#0F382C]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                <span>Customer Orders</span>
              </div>
              {pendingOrdersCount > 0 ? (
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-white font-bold animate-pulse">
                  {pendingOrdersCount} New
                </span>
              ) : (
                <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-mono">
                  {orders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-gray-700 hover:bg-[#FAF8F5] hover:text-[#0F382C]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Storefront &amp; COD Settings</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                {isCodEnabled ? 'COD ON' : 'COD OFF'}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer transition-all ${
                activeTab === 'customers'
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'text-gray-700 hover:bg-[#FAF8F5] hover:text-[#0F382C]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px]">group</span>
                <span>Customer Directory</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-mono">
                {customers.length}
              </span>
            </button>

          </div>

          {/* Quick Announcement Bar Live Preview Widget */}
          <div className="bg-[#0F382C] text-white p-4 rounded-xl shadow-xs border border-[#D4AF37]/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#D4AF37] font-bold uppercase">
              <span>Live Banner Status</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p className="text-xs text-gray-200 font-medium bg-black/30 p-2.5 rounded border border-white/10 leading-snug">
              "{announcementText}"
            </p>
            <div className="flex items-center justify-between text-[11px] text-gray-300 pt-1">
              <span>COD Option:</span>
              <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${isCodEnabled ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                {isCodEnabled ? 'Active' : 'Disabled'}
              </span>
            </div>
          </div>
        </aside>

        {/* MAIN TAB CONTENT DISPLAY AREA */}
        <main className="lg:col-span-9 space-y-6">

          {/* TAB 1: OVERVIEW / DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Executive Welcome Card */}
              <div className="bg-gradient-to-r from-[#0F382C] to-[#1A4B3C] text-white p-6 rounded-xl shadow-md flex flex-wrap items-center justify-between gap-4 border border-[#D4AF37]/30">
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-[#D4AF37] text-[#0F382C] font-bold text-[10px] uppercase rounded tracking-widest mb-2">
                    Executive Overview
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                    Assalam-o-Alaikum, Store Admin
                  </h2>
                  <p className="text-xs text-gray-200 mt-1 max-w-xl">
                    Here is your live summary for Tanabana Fabrics Pakistani Luxury Unstitched Suits Store.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="px-4 py-2.5 bg-[#B8860B] hover:bg-[#966C07] text-white text-xs uppercase font-bold tracking-wider rounded shadow cursor-pointer transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  <span>Manage Storefront</span>
                </button>
              </div>

              {/* Stat Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                <div className="bg-white p-5 rounded-xl border border-[#EAE6DF] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[11px] uppercase font-bold tracking-wider">Gross Sales</span>
                    <span className="material-symbols-outlined text-2xl text-[#0F382C]">payments</span>
                  </div>
                  <p className="font-serif text-2xl font-bold text-[#0F382C]">
                    Rs. {totalRevenue.toLocaleString()}
                  </p>
                  <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                    ↑ 18.4% vs last month
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#EAE6DF] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[11px] uppercase font-bold tracking-wider">Total Orders</span>
                    <span className="material-symbols-outlined text-2xl text-[#0F382C]">local_shipping</span>
                  </div>
                  <p className="font-serif text-2xl font-bold text-[#0F382C]">
                    {orders.length + 14} Orders
                  </p>
                  <span className="text-[11px] text-amber-700 font-semibold">
                    {pendingOrdersCount} Orders Pending Dispatch
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#EAE6DF] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[11px] uppercase font-bold tracking-wider">Active Catalog</span>
                    <span className="material-symbols-outlined text-2xl text-[#0F382C]">styler</span>
                  </div>
                  <p className="font-serif text-2xl font-bold text-[#0F382C]">
                    {products.length} Suits
                  </p>
                  <span className="text-[11px] text-gray-500 font-semibold">
                    4.5m Cut Standard
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#EAE6DF] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[11px] uppercase font-bold tracking-wider">Verified Buyers</span>
                    <span className="material-symbols-outlined text-2xl text-[#0F382C]">group</span>
                  </div>
                  <p className="font-serif text-2xl font-bold text-[#0F382C]">
                    {customers.length + 10} Customers
                  </p>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    100% Verified Users
                  </span>
                </div>

              </div>

              {/* Recent Orders Section in Overview */}
              <div className="bg-white rounded-xl border border-[#EAE6DF] shadow-xs p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#F0ECE6] pb-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0F382C]">
                      Recent Customer Orders
                    </h3>
                    <p className="text-xs text-gray-500">Latest transactions &amp; dispatch status</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-[#B8860B] uppercase hover:underline cursor-pointer"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-[#0F382C] font-bold uppercase tracking-wider text-[11px] border-b border-[#EAE6DF]">
                      <tr>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">City</th>
                        <th className="py-3 px-4">Payment Method</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0ECE6]">
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#0F382C]">{order.id}</td>
                          <td className="py-3 px-4">
                            <p className="font-bold text-gray-800">{order.customerName}</p>
                            <p className="text-[10px] text-gray-500">{order.phone}</p>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{order.city}</td>
                          <td className="py-3 px-4">
                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold">
                              {order.paymentMethod}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-[#0F382C]">
                            Rs. {order.total.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                              order.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                              order.status === 'Dispatched' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PRODUCTS / SUIT CATALOG MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-xl border border-[#EAE6DF] shadow-xs space-y-4">
                
                {/* Header & Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0ECE6] pb-4">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#0F382C]">
                      Manage Unstitched Fabrics Catalog ({filteredProducts.length})
                    </h2>
                    <p className="text-xs text-gray-500">
                      Add, edit prices, update inventory stock, or delete suits in real-time.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddProductModal(true)}
                    className="px-4 py-2.5 bg-[#0F382C] text-white hover:bg-[#1A4B3C] text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    <span>+ Add New Suit</span>
                  </button>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] p-3 rounded-lg border border-[#EAE6DF]">
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {['ALL', 'UNSTITCHED', 'GIZA', 'WINTER', 'SILK'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setProductCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap ${
                          productCategoryFilter === cat
                            ? 'bg-[#0F382C] text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-200 border border-[#EAE6DF]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="relative flex-1 max-w-xs">
                    <span className="material-symbols-outlined absolute left-2.5 top-2 text-gray-400 text-[18px]">search</span>
                    <input
                      type="text"
                      placeholder="Search suit title..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#EAE6DF] rounded text-xs focus:outline-none focus:border-[#0F382C]"
                    />
                  </div>
                </div>

                {/* Product Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-[#0F382C] font-bold uppercase tracking-wider text-[11px] border-b border-[#EAE6DF]">
                      <tr>
                        <th className="py-3 px-4">Fabric Suit</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price (PKR)</th>
                        <th className="py-3 px-4">Specifications</th>
                        <th className="py-3 px-4">Stock Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0ECE6]">
                      {filteredProducts.map(prod => (
                        <tr key={prod._id || prod.id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={Array.isArray(prod.images) ? prod.images[0] : (prod.image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop')}
                                alt={prod.name || prod.title}
                                className="w-10 h-10 object-cover rounded border border-gray-200"
                              />
                              <div>
                                <p className="font-bold text-[#0F382C]">{prod.name || prod.title}</p>
                                <p className="text-[10px] text-gray-400 font-mono">ID: {prod._id || prod.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                              {prod.category || 'Unstitched'}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-[#0F382C] text-sm">
                            Rs. {(prod.price || 0).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                            {prod.specs || '4.5 Meters Cut'}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleStock(prod._id || prod.id)}
                              className={`px-2 py-1 rounded text-[10px] font-bold uppercase cursor-pointer ${
                                prod.inStock !== false
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-red-100 text-red-800 border border-red-300'
                              }`}
                              title="Click to toggle stock state"
                            >
                              {prod.inStock !== false ? 'In Stock ✓' : 'Out of Stock ✗'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditModal(prod)}
                              className="px-2.5 py-1 bg-white border border-[#0F382C] text-[#0F382C] hover:bg-[#0F382C] hover:text-white rounded text-xs font-bold uppercase transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod._id || prod.id)}
                              className="px-2.5 py-1 bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded text-xs font-bold uppercase transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: CUSTOMER ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-xl border border-[#EAE6DF] shadow-xs space-y-4">
                
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0ECE6] pb-4">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#0F382C]">
                      Manage Customer Orders ({filteredOrders.length})
                    </h2>
                    <p className="text-xs text-gray-500">
                      Track delivery addresses, payment modes, and update dispatch status.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleSimulateTestOrder}
                      className="px-3 py-1.5 bg-[#B8860B] hover:bg-[#966C07] text-white rounded text-xs font-bold uppercase cursor-pointer flex items-center gap-1 shadow-sm"
                      title="Generate a sample test customer order"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      <span>+ Simulate Test Order</span>
                    </button>

                    <div className="h-5 w-px bg-gray-300 mx-1"></div>

                    {['ALL', 'PENDING', 'PROCESSING', 'DISPATCHED', 'COMPLETED', 'CANCELLED'].map(st => (
                      <button
                        key={st}
                        onClick={() => setOrderStatusFilter(st)}
                        className={`px-2.5 py-1.5 rounded text-xs font-bold uppercase cursor-pointer transition-colors ${
                          orderStatusFilter === st
                            ? 'bg-[#0F382C] text-white'
                            : 'bg-[#FAF8F5] text-gray-700 hover:bg-gray-200 border border-[#EAE6DF]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-[#0F382C] font-bold uppercase tracking-wider text-[11px] border-b border-[#EAE6DF]">
                      <tr>
                        <th className="py-3 px-4">Order ID &amp; Date</th>
                        <th className="py-3 px-4">Customer Details &amp; Address</th>
                        <th className="py-3 px-4">Fabric Suit Items</th>
                        <th className="py-3 px-4">Payment Method</th>
                        <th className="py-3 px-4">Total (PKR)</th>
                        <th className="py-3 px-4">Manage Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0ECE6]">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-400">
                            No orders found under status "{orderStatusFilter}".
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map(order => (
                          <tr key={order.id} className={`hover:bg-[#FAF8F5] transition-colors ${order.status === 'Cancelled' ? 'opacity-60 bg-red-50/30' : ''}`}>
                            <td className="py-3 px-4">
                              <p className="font-mono font-bold text-[#0F382C]">{order.id}</p>
                              <p className="text-[10px] text-gray-400">{order.date}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-bold text-gray-800">{order.customerName}</p>
                              <p className="text-[11px] text-emerald-800 font-semibold">{order.phone}</p>
                              <p className="text-[10px] text-gray-500 max-w-xs">{order.address || order.city}</p>
                            </td>
                            <td className="py-3 px-4 text-gray-700 font-medium max-w-xs">
                              {order.items}
                            </td>
                            <td className="py-3 px-4">
                              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold">
                                {order.paymentMethod}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-bold text-[#0F382C] text-sm">
                              Rs. {order.total.toLocaleString()}
                              {order.status === 'Cancelled' && (
                                <span className="block text-[9px] text-red-600 font-bold">Excluded from Sales</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={order.status}
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                className={`px-2.5 py-1 rounded text-xs font-bold uppercase border focus:outline-none cursor-pointer shadow-xs ${
                                  order.status === 'Pending' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                                  order.status === 'Processing' ? 'bg-purple-100 text-purple-900 border-purple-300' :
                                  order.status === 'Dispatched' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                                  order.status === 'Completed' || order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                                  'bg-red-100 text-red-900 border-red-300'
                                }`}
                              >
                                <option value="Pending">⏳ Pending</option>
                                <option value="Processing">⚙️ Processing</option>
                                <option value="Dispatched">🚚 Dispatched / Shipping</option>
                                <option value="Completed">✅ Completed / Delivered</option>
                                <option value="Cancelled">❌ Cancelled (Subtract Revenue)</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: STOREFRONT & COD SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              
              <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-xl border border-[#EAE6DF] shadow-xs space-y-6">
                
                <div className="border-b border-[#F0ECE6] pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#0F382C]">
                      Storefront &amp; Cash on Delivery (COD) Master Configuration
                    </h2>
                    <p className="text-xs text-gray-500">
                      Changes updated here will instantly save and display live on the customer storefront.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#0F382C] text-white hover:bg-[#1A4B3C] text-xs font-bold uppercase tracking-wider rounded shadow cursor-pointer transition-colors"
                  >
                    Save All Settings Live
                  </button>
                </div>

                {/* Announcement Bar Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0F382C]">
                    1. Top Announcement Bar Banner Text
                  </label>
                  <input
                    type="text"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 border border-[#EAE6DF] rounded-lg text-xs font-medium focus:outline-none focus:border-[#0F382C] bg-[#FAF8F5]"
                  />
                  <p className="text-[11px] text-gray-400">
                    This message is displayed prominently in the top header bar of every page on the site.
                  </p>
                </div>

                {/* Live Preview Bar */}
                <div className="p-3 bg-[#0F382C] text-white rounded-lg text-center text-xs font-medium uppercase tracking-widest border border-[#D4AF37]">
                  <span className="text-[#D4AF37] font-bold text-[10px] block mb-0.5">STOREFRONT LIVE PREVIEW</span>
                  "{announcementText}"
                </div>

                {/* COD Master Switch Toggle */}
                <div className="p-4 bg-[#FAF8F5] border border-[#EAE6DF] rounded-lg flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-xs uppercase text-[#0F382C]">
                      2. Cash on Delivery (COD) Storefront Visibility
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Enable or disable COD badge display on products, cart drawer, and order checkout.
                    </p>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCodEnabled}
                      onChange={(e) => setIsCodEnabled(e.target.checked)}
                      className="w-5 h-5 accent-[#0F382C] rounded cursor-pointer"
                    />
                    <span className={`text-xs font-bold uppercase px-3 py-1 rounded ${
                      isCodEnabled ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-700'
                    }`}>
                      {isCodEnabled ? 'COD ACTIVE (ON)' : 'COD DISABLED (OFF)'}
                    </span>
                  </label>
                </div>

                {/* Shipping & Support Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">
                      Free Nationwide Shipping Minimum (PKR)
                    </label>
                    <input
                      type="number"
                      value={freeShippingMin}
                      onChange={(e) => setFreeShippingMin(e.target.value)}
                      className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs font-bold text-[#0F382C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">
                      Support WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={supportPhone}
                      onChange={(e) => setSupportPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs font-bold text-[#0F382C]"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F0ECE6]">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0F382C] text-white hover:bg-[#1A4B3C] font-bold text-xs uppercase tracking-widest rounded shadow transition-colors cursor-pointer"
                  >
                    Save &amp; Publish Storefront Settings
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* TAB 5: CUSTOMER DIRECTORY */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-xl border border-[#EAE6DF] shadow-xs space-y-4">
                <div className="border-b border-[#F0ECE6] pb-4">
                  <h2 className="font-serif text-xl font-bold text-[#0F382C]">
                    Registered Buyer Directory ({customers.length})
                  </h2>
                  <p className="text-xs text-gray-500">Verified buyer profile accounts &amp; historical spend</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-[#0F382C] font-bold uppercase tracking-wider text-[11px] border-b border-[#EAE6DF]">
                      <tr>
                        <th className="py-3 px-4">Buyer Name</th>
                        <th className="py-3 px-4">Contact Phone &amp; Email</th>
                        <th className="py-3 px-4">City</th>
                        <th className="py-3 px-4">Total Orders</th>
                        <th className="py-3 px-4">Lifetime Spend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0ECE6]">
                      {customers.map((cust, idx) => (
                        <tr key={idx} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="py-3 px-4 font-bold text-[#0F382C]">{cust.name}</td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-800">{cust.phone}</p>
                            <p className="text-[10px] text-gray-400">{cust.email}</p>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{cust.city}</td>
                          <td className="py-3 px-4 font-bold text-[#0F382C]">{cust.ordersCount} Orders</td>
                          <td className="py-3 px-4 font-bold text-emerald-800 text-sm">
                            Rs. {cust.totalSpent.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* MODAL: ADD NEW SUIT */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-[#EAE6DF]">
            <div className="bg-[#0F382C] text-white p-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#D4AF37]">add_circle</span>
                <span>Add New Unstitched Suit</span>
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-white text-2xl font-bold hover:text-[#D4AF37] cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">Suit Title</label>
                <input
                  type="text"
                  value={productFormData.name}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  required
                  placeholder="e.g. Koh-i-Noor Royal Boski 10-Pound"
                  className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">Category</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs font-bold text-[#0F382C]"
                  >
                    <option value="MEN'S UNSTITCHED">MEN'S UNSTITCHED</option>
                    <option value="GIZA COTTON">GIZA COTTON</option>
                    <option value="WINTER SPECIAL">WINTER SPECIAL</option>
                    <option value="LUXURY SILK">LUXURY SILK</option>
                    <option value="KHADDAR">KHADDAR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs font-bold text-[#0F382C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">Cut Length &amp; Fabric Specs</label>
                <input
                  type="text"
                  value={productFormData.specs}
                  onChange={(e) => setProductFormData({ ...productFormData, specs: e.target.value })}
                  placeholder="100% Spun Silk • 4.5 Meters Cut"
                  className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">Image URL</label>
                <input
                  type="text"
                  value={productFormData.images}
                  onChange={(e) => setProductFormData({ ...productFormData, images: e.target.value })}
                  className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0F382C] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#1A4B3C] shadow cursor-pointer"
                >
                  Publish Suit to Store
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="py-2.5 px-4 bg-gray-100 text-gray-700 font-bold text-xs uppercase rounded cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT EXISTING SUIT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-[#EAE6DF]">
            <div className="bg-[#0F382C] text-white p-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#D4AF37]">edit</span>
                <span>Edit Fabric Suit</span>
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-white text-2xl font-bold hover:text-[#D4AF37] cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">Suit Title</label>
                <input
                  type="text"
                  value={productFormData.name}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">Category</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs font-bold text-[#0F382C]"
                  >
                    <option value="MEN'S UNSTITCHED">MEN'S UNSTITCHED</option>
                    <option value="GIZA COTTON">GIZA COTTON</option>
                    <option value="WINTER SPECIAL">WINTER SPECIAL</option>
                    <option value="LUXURY SILK">LUXURY SILK</option>
                    <option value="KHADDAR">KHADDAR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs font-bold text-[#0F382C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">Specifications</label>
                <input
                  type="text"
                  value={productFormData.specs}
                  onChange={(e) => setProductFormData({ ...productFormData, specs: e.target.value })}
                  className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">Image URL</label>
                <input
                  type="text"
                  value={productFormData.images}
                  onChange={(e) => setProductFormData({ ...productFormData, images: e.target.value })}
                  className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0F382C] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#1A4B3C] shadow cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="py-2.5 px-4 bg-gray-100 text-gray-700 font-bold text-xs uppercase rounded cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
