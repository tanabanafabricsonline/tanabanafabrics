import React, { useState } from 'react';

export default function CollectionListing({ setCurrentView, addToCart }) {
  const [layoutMode, setLayoutMode] = useState('grid-4'); // 'grid-2', 'grid-4', 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState(['Egyptian Cotton', 'Under Rs. 10,000']);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const catalogProducts = [
    {
      id: 'pdp-boski',
      title: 'Koh-i-Noor Royal Boski 10-Pound Unstitched Suit',
      category: "MEN'S UNSTITCHED",
      weave: 'Chinese Spun Silk',
      weight: '10-Pound Fall',
      color: 'Creamy Ivory',
      price: 14850,
      originalPrice: 16500,
      rating: 4.9,
      reviewsCount: 38,
      badge: 'Heritage Masterpiece',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmhpUZ5GJ3bNCO-67FTswqbMIsYYYwFmemtr_psiQ9xoubda9R2lnKy8mvVijFlzgFu17g2wbHix6xe83CKlCw88gi1a58uGGCd_aTttWkrv-uZ40camFc5H6WA5G3KUFy5KoQz7ipxrn9GJNrhl6NsuScb68PqX18n2MhDMO5Cd9Y1sxTTannS5h8nXGMC8kJVKkjU6mVLqU8uyFsC1CvsnaTXZljmVykxApvSKJlwCaT7-CUb0y0',
    },
    {
      id: 'pdp-giza',
      title: 'Sultan Egyptian Giza Latha - Snowy White',
      category: "MEN'S UNSTITCHED",
      weave: 'Giza Combed Cotton',
      weight: 'Hard Finish 100s',
      color: 'Snow White',
      price: 8250,
      originalPrice: 9000,
      rating: 4.8,
      reviewsCount: 64,
      badge: '100s Double-Ply',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsARnasjbBY_4qTcJ8dBwd1oqVM03FHo3Pp5hr4TnHXPLM0o8bvIm2Bg_BoTvlAE-ub-RxKaboHa_9iuF3O0W1EDrLHlaDSKWE_hWkGUA1D9HyYR29Pqw-qD1XYxr9EVX09p43mT5DpNzdnRXThAoy6qndtGBNCuxCGXAOkRDAccYtbAq4qCe_M84TC5zFp3m2u1GmUMuCmzCPWSWjaF9HiKTwsNBlLB-w_-Tf4BkAFc3GmCSrOw_j',
    },
    {
      id: 'pdp-lawn',
      title: 'Gul-e-Rana Embroidered Lawn & Organza Silk 3-Piece',
      category: "WOMEN'S LUXURY",
      weave: 'Mulberry Lawn & Silk',
      weight: 'Lightweight Festive',
      color: 'Sage & Gold',
      price: 18500,
      originalPrice: 21000,
      rating: 5.0,
      reviewsCount: 22,
      badge: 'Festive Edition',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVx5BGIvIB1dIvcoE2Y3iWlzZyTaAW_ph_vvo0MdnKMTfHgu-fQ5aex68kiLdwatU1ILm9unWXUxLK5QSbnFAcRbHfZOSCPr-D7HQYbmepaPKO_AGeTw_Zr4Gcqr-3_Gn0kCUpQSztk-cBogQdyHi1ZisYkqNZt6rQLor-0mP3GWlJz4YDqXAvyOXqzZkJtt6N5obvCsQHsDeGcYsWbtnkVTtqtqriqpA1fqQCnVtxrtkgGQWeTSEC',
    },
    {
      id: 'pdp-karandi',
      title: 'Shahjahan Hand-Spun Karandi Khaddar',
      category: "MEN'S UNSTITCHED",
      weave: 'Handloomed Karandi',
      weight: 'Midweight Winter',
      color: 'Natural Oatmeal',
      price: 9400,
      originalPrice: 10500,
      rating: 4.7,
      reviewsCount: 19,
      badge: 'Handloomed',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKMz7Xh1r0Eg31Iuk6FDhNOJ6TGn0BKzzq4IoZz9dvwfLxSCSOlKlhYZZs0VJUr8HfPCgFVV-iGsYy67ePrekEsA_HQvuuVxW19RUky-SLojQ5Dljpoa0llrZP1Owcv1j3Jq4Of6nBq65TeFGuuTgxg5vlgmFYWEkpFzb0RXjWPoA93uzS3l_VJ34CnAaQkQEkXGj_lQUWS8T4ZD_WyXNyBCH6O8gJiNVnIMLM3AHpo4G_UBe0EJRW',
    },
    {
      id: 'pdp-washwear',
      title: 'Imperial Micro-Poly Wash & Wear Suit',
      category: "MEN'S UNSTITCHED",
      weave: 'Wrinkle-Free Wash & Wear',
      weight: 'All-Season Drape',
      color: 'Charcoal Grey',
      price: 6850,
      originalPrice: 7500,
      rating: 4.6,
      reviewsCount: 41,
      badge: 'Wrinkle-Free',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc-UPLnNSEx8MjMGAuKKqA5DfHUpJi3AYzesDI6y5VEQlNBmd_hBk2uA25JIK500jkhd9dTpW7-gpNHI1QiYvK5h7XGSi1dIkMoCly1N-WDrDmg8soePhvhLqOoUyWgRy4nASrS6POGo5BEs0uM3FHJlqZN6RFjVQBubVnaNUCd9xW67aGc2GPjGM3Bfk8M_bipsrVCqNaVkfBKKdCBoRvmwDaft-Wc1HvSGZpe3UInRvz2JNfeLaR',
    },
    {
      id: 'pdp-pashmina',
      title: 'Kashmir Imperial Wool & Silk Shawl',
      category: "HERITAGE SHAWLS",
      weave: 'Pure Pashmina & Silk',
      weight: 'Ultra-Fine Warmth',
      color: 'Antique Bronze',
      price: 24500,
      originalPrice: 28000,
      rating: 5.0,
      reviewsCount: 15,
      badge: 'Authentic Kashmir',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtpDbSXYOre5PmSVI3sJsfcH9vEWiF6B6XB5_UzhsLSd33bdRkxKgrpL8c_htusioLSGYpnRnd7lHsz67RT5i1reLuRaBT_kAlnnhHygyb7qraipruumlk74Stffr8mIxJso1EBrCkdLuid2LkGKGpEUYgMLlwTPQtRztM2rgdOmjluaMvuvTvQHlWpy6SyovsqTXiL45v4r_3asJBBbGmouo0qWvmsAYAE00HFh7HNmizutZIjLYl',
    }
  ];

  const removeFilter = (filterText) => {
    setActiveFilters(activeFilters.filter(f => f !== filterText));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const filteredProducts = catalogProducts.filter(p => {
    if (!searchQuery) return true;
    return p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           p.weave.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-full flex flex-col bg-background min-h-screen">
      {/* Editorial Page Title Section */}
      <section className="w-full bg-surface-container-lowest py-space-xl border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <nav className="flex items-center gap-space-xs font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-space-sm">
            <button onClick={() => setCurrentView('home')} className="hover:text-primary transition-colors">Home</button>
            <span className="text-outline">/</span>
            <span className="hover:text-primary transition-colors">Collections</span>
            <span className="text-outline">/</span>
            <span className="text-primary font-bold">Men's Unstitched Luxury</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="space-y-space-xs max-w-3xl">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">Seasonal Masterpieces</span>
              </div>
              <h1 className="font-display-md text-display-md text-primary tracking-tight font-normal">
                Men's Unstitched Heritage Collection
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                From ceremonial Chinese Boski to crisp superfine Egyptian Latha and all-weather wash-and-wear, tailored to traditional 4.5-meter suit cuts. Hand-picked loom counts calibrated for the discerning Pakistani gentleman.
              </p>
            </div>
            
            <div className="flex items-center gap-space-md pb-space-xs">
              <div className="text-right">
                <span className="font-label-caps text-label-caps uppercase text-outline block">Catalog Archive</span>
                <span className="font-headline-sm text-headline-sm text-primary">42 Fabrics</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-[24px]">texture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Bar: Filter Pills, Search, View Switcher & Sorting */}
      <section className="sticky top-[116px] z-30 bg-surface/95 backdrop-blur-md shadow-sm py-space-sm border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop flex flex-col md:flex-row items-center justify-between gap-space-sm">
          {/* Active Filters Pill Stack */}
          <div className="flex items-center gap-space-xs flex-wrap w-full md:w-auto">
            <button 
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-space-xs px-space-md py-2 bg-primary text-on-primary rounded font-label-caps text-label-caps uppercase cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Filters ({activeFilters.length})</span>
            </button>

            <span className="hidden lg:inline-block font-label-caps text-label-caps text-outline uppercase tracking-wider mr-space-2xs">Active:</span>

            {activeFilters.map((filter, index) => (
              <div 
                key={index} 
                onClick={() => removeFilter(filter)}
                className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-high rounded text-on-surface font-label-caps text-label-caps uppercase tracking-wider group hover:bg-surface-variant cursor-pointer transition-colors"
              >
                <span>{filter}</span>
                <span className="material-symbols-outlined text-[13px] text-outline group-hover:text-primary">close</span>
              </div>
            ))}

            {activeFilters.length > 0 && (
              <button 
                onClick={clearAllFilters}
                className="font-label-caps text-label-caps text-secondary underline hover:text-primary transition-colors tracking-widest uppercase pl-space-xs cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Quick Search + Layout View Selector + Sort Trigger */}
          <div className="flex items-center gap-space-sm w-full md:w-auto justify-end">
            <div className="relative flex-1 sm:w-60">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-outline">search</span>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-lowest pl-9 pr-3 py-1.5 font-body-sm text-body-sm text-on-surface rounded shadow-sm focus:outline-none focus:bg-surface-container-low transition-colors border border-surface-container-high" 
                placeholder="Search within cut or loom..." 
                type="text"
              />
            </div>

            {/* Density Layout Switcher */}
            <div className="hidden sm:flex items-center bg-surface-container rounded p-0.5 border border-surface-container-high">
              <button 
                onClick={() => setLayoutMode('grid-2')}
                className={`p-1.5 rounded transition-colors ${layoutMode === 'grid-2' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`} 
                title="Editorial 2-Column"
              >
                <span className="material-symbols-outlined text-[18px]">view_agenda</span>
              </button>
              <button 
                onClick={() => setLayoutMode('grid-4')}
                className={`p-1.5 rounded transition-colors ${layoutMode === 'grid-4' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`} 
                title="4-Column Grid (Standard)"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
              <button 
                onClick={() => setLayoutMode('list')}
                className={`p-1.5 rounded transition-colors ${layoutMode === 'list' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`} 
                title="List View"
              >
                <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select 
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="appearance-none bg-surface-container-lowest text-on-surface font-label-caps text-label-caps uppercase tracking-widest pl-3 pr-8 py-2 rounded shadow-sm cursor-pointer focus:outline-none hover:bg-surface-container-low transition-colors border border-surface-container-high"
              >
                <option value="featured">Sort: Featured Curations</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="new">New Weave Arrivals</option>
                <option value="rating">Loom Weight &amp; Rating</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[16px] pointer-events-none text-outline">expand_more</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Architectural 12-Column Grid */}
      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-xl w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          
          {/* Faceted Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-space-lg sticky top-[188px] pr-space-xs">
            {/* Category Accordion */}
            <div className="bg-surface-container-low p-space-md rounded-lg space-y-space-sm border border-surface-container">
              <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold flex items-center justify-between">
                <span>Fabrication Weaves</span>
                <span className="material-symbols-outlined text-[16px] text-outline">expand_less</span>
              </h3>
              <div className="space-y-1 font-body-sm text-on-surface-variant pt-1">
                {[
                  { name: 'All Masterpieces', count: 42, id: 'all' },
                  { name: 'Pure Chinese Boski Silk', count: 12, id: 'boski' },
                  { name: 'Combed Giza Egyptian Latha', count: 14, id: 'giza' },
                  { name: 'Hand-Spun Karandi Khaddar', count: 8, id: 'karandi' },
                  { name: 'Wrinkle-Free Wash & Wear', count: 5, id: 'washwear' },
                  { name: 'Pashmina & Wool Shawls', count: 3, id: 'pashmina' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCategory(item.id)}
                    className={`w-full flex items-center justify-between py-1.5 px-2 rounded text-left font-label-caps text-[12px] uppercase transition-colors ${
                      selectedCategory === item.id 
                        ? 'bg-primary text-on-primary font-bold' 
                        : 'hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="opacity-70 text-[10px]">({item.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-surface-container-low p-space-md rounded-lg space-y-space-sm border border-surface-container">
              <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold flex items-center justify-between">
                <span>Price Bracket (PKR)</span>
                <span className="material-symbols-outlined text-[16px] text-outline">expand_less</span>
              </h3>
              <div className="space-y-space-xs pt-1">
                <input type="range" min="3000" max="45000" defaultValue="25000" className="w-full accent-primary" />
                <div className="flex items-center justify-between font-label-caps text-[11px] text-outline">
                  <span>Rs. 3,000</span>
                  <span className="text-primary font-bold">Rs. 25,000</span>
                  <span>Rs. 45,000</span>
                </div>
              </div>
            </div>

            {/* Suit Cut Length */}
            <div className="bg-surface-container-low p-space-md rounded-lg space-y-space-sm border border-surface-container">
              <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
                Suit Cut Length
              </h3>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button className="py-2 px-3 bg-primary text-on-primary font-label-caps text-[11px] uppercase tracking-wider rounded text-center font-bold">
                  4.5M Standard
                </button>
                <button className="py-2 px-3 bg-surface-container-lowest border border-outline-variant text-on-surface hover:border-primary font-label-caps text-[11px] uppercase tracking-wider rounded text-center transition-colors">
                  7.0M Double
                </button>
              </div>
            </div>

            {/* Weave Weight */}
            <div className="bg-surface-container-low p-space-md rounded-lg space-y-space-sm border border-surface-container">
              <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
                Loom Weight &amp; Fall
              </h3>
              <div className="space-y-2 pt-1 font-body-sm text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-primary" />
                  <span>10-Pound Heavy Fall (Boski)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-primary" />
                  <span>100s Double-Ply (Egyptian)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-primary" />
                  <span>6-Pound Lightweight Summer</span>
                </label>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Product Catalog Grid */}
          <main className="lg:col-span-9 space-y-space-xl">
            {/* Catalog Grid Renderer */}
            <div className={`grid gap-space-lg ${
              layoutMode === 'grid-2' ? 'grid-cols-1 sm:grid-cols-2' : 
              layoutMode === 'grid-4' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 
              'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={`bg-surface-container-lowest border border-surface-container-high hover:border-primary transition-all duration-300 group ${
                    layoutMode === 'list' ? 'flex flex-col sm:flex-row items-stretch' : 'flex flex-col'
                  }`}
                >
                  {/* Image Showcase */}
                  <div className={`relative bg-surface-container overflow-hidden ${
                    layoutMode === 'list' ? 'w-full sm:w-64 aspect-[3/4] flex-shrink-0' : 'w-full aspect-[3/4]'
                  }`}>
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-primary text-on-primary font-label-caps text-[9.5px] uppercase tracking-widest px-2 py-0.5">
                      {product.badge}
                    </span>

                    {/* Quick action buttons on hover */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                      <button 
                        onClick={() => setCurrentView('pdp')}
                        className="bg-surface/95 text-primary hover:bg-primary hover:text-on-primary font-label-caps text-[11px] uppercase tracking-widest px-3 py-2 transition-colors shadow-md cursor-pointer"
                      >
                        Inspect PDP
                      </button>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-primary text-on-primary hover:bg-secondary font-label-caps text-[11px] uppercase tracking-widest px-3 py-2 transition-colors shadow-md cursor-pointer"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-space-md flex flex-col flex-grow justify-between space-y-space-xs">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-secondary text-xs">
                          <span className="material-symbols-outlined text-[14px]">star</span>
                          <span className="font-bold">{product.rating}</span>
                          <span className="text-outline text-[10px]">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 
                        onClick={() => setCurrentView('pdp')}
                        className="font-headline-sm text-base text-primary font-medium hover:text-secondary cursor-pointer transition-colors line-clamp-2"
                      >
                        {product.title}
                      </h3>

                      <p className="font-body-sm text-xs text-on-surface-variant mt-1.5">
                        Weave: <span className="text-primary font-medium">{product.weave}</span> • {product.weight}
                      </p>
                    </div>

                    <div className="pt-space-sm border-t border-surface-container flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-price-md text-price-md text-[#0F382C] font-bold">
                              Rs. {product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                              <span className="font-body-sm text-xs text-outline line-through">
                                Rs. {product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <span className="font-label-caps text-[9px] text-[#B8860B] uppercase font-semibold">
                            Cash on Delivery Available
                          </span>
                        </div>

                        <button 
                          onClick={() => addToCart(product)}
                          className="p-2 rounded bg-[#0F382C] text-white hover:bg-[#B8860B] transition-colors cursor-pointer"
                          title="Add to Bag"
                        >
                          <span className="material-symbols-outlined text-[20px]">add_shopping_bag</span>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          const text = encodeURIComponent(`Assalam-o-Alaikum! I want to order "${product.title}" (Rs. ${product.price.toLocaleString()}) via Cash on Delivery.`);
                          window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
                        }}
                        className="w-full py-1.5 bg-[#25D366] text-white hover:bg-[#1EBE5B] text-[11px] uppercase font-bold tracking-wider rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">chat</span>
                        <span>Order on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="pt-space-xl flex items-center justify-between border-t border-surface-container font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
              <span>Showing 1 – 6 of 42 Items</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 rounded bg-primary text-on-primary font-bold">1</button>
                <button className="px-3 py-1.5 rounded hover:bg-surface-container transition-colors">2</button>
                <button className="px-3 py-1.5 rounded hover:bg-surface-container transition-colors">3</button>
                <span className="px-1 text-outline">...</span>
                <button className="px-3 py-1.5 rounded hover:bg-surface-container transition-colors">7</button>
              </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
