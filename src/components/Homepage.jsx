import React, { useState } from 'react';

export default function Homepage({ setCurrentView, addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const allProducts = [
    {
      id: 'pdp-boski',
      title: 'Koh-i-Noor Royal Boski 10-Pound Unstitched Suit',
      category: 'boski',
      categoryLabel: "MEN'S UNSTITCHED • 4.5 METERS",
      specs: '100% Pure Natural Spun Silk • 10lb Heavy Fall',
      price: 14850,
      originalPrice: 16500,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmhpUZ5GJ3bNCO-67FTswqbMIsYYYwFmemtr_psiQ9xoubda9R2lnKy8mvVijFlzgFu17g2wbHix6xe83CKlCw88gi1a58uGGCd_aTttWkrv-uZ40camFc5H6WA5G3KUFy5KoQz7ipxrn9GJNrhl6NsuScb68PqX18n2MhDMO5Cd9Y1sxTTannS5h8nXGMC8kJVKkjU6mVLqU8uyFsC1CvsnaTXZljmVykxApvSKJlwCaT7-CUb0y0',
      tag: 'Bestseller'
    },
    {
      id: 'pdp-giza',
      title: 'Sultan Egyptian Giza Latha - Snowy White',
      category: 'cotton',
      categoryLabel: "MEN'S UNSTITCHED • 4.5 METERS",
      specs: '100s Double-Ply Combed Egyptian Cotton • Hard Finish',
      price: 8250,
      originalPrice: 9000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsARnasjbBY_4qTcJ8dBwd1oqVM03FHo3Pp5hr4TnHXPLM0o8bvIm2Bg_BoTvlAE-ub-RxKaboHa_9iuF3O0W1EDrLHlaDSKWE_hWkGUA1D9HyYR29Pqw-qD1XYxr9EVX09p43mT5DpNzdnRXThAoy6qndtGBNCuxCGXAOkRDAccYtbAq4qCe_M84TC5zFp3m2u1GmUMuCmzCPWSWjaF9HiKTwsNBlLB-w_-Tf4BkAFc3GmCSrOw_j',
      tag: 'Egyptian Cotton'
    },
    {
      id: 'pdp-lawn',
      title: 'Gul-e-Rana Embroidered Lawn & Organza Silk 3-Piece',
      category: 'lawn',
      categoryLabel: "WOMEN'S LUXURY LAWN",
      specs: 'Fine Swiss Lawn • Schiffli Neckline • Pure Silk Dupatta',
      price: 18500,
      originalPrice: 21000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVx5BGIvIB1dIvcoE2Y3iWlzZyTaAW_ph_vvo0MdnKMTfHgu-fQ5aex68kiLdwatU1ILm9unWXUxLK5QSbnFAcRbHfZOSCPr-D7HQYbmepaPKO_AGeTw_Zr4Gcqr-3_Gn0kCUpQSztk-cBogQdyHi1ZisYkqNZt6rQLor-0mP3GWlJz4YDqXAvyOXqzZkJtt6N5obvCsQHsDeGcYsWbtnkVTtqtqriqpA1fqQCnVtxrtkgGQWeTSEC',
      tag: '3-Piece Festive'
    },
    {
      id: 'pdp-karandi',
      title: 'Shahjahan Hand-Spun Karandi Khaddar',
      category: 'karandi',
      categoryLabel: "MEN'S UNSTITCHED • 4.5 METERS",
      specs: 'Textured Winter Weave • Natural Organic Fiber Blend',
      price: 9400,
      originalPrice: 10500,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKMz7Xh1r0Eg31Iuk6FDhNOJ6TGn0BKzzq4IoZz9dvwfLxSCSOlKlhYZZs0VJUr8HfPCgFVV-iGsYy67ePrekEsA_HQvuuVxW19RUky-SLojQ5Dljpoa0llrZP1Owcv1j3Jq4Of6nBq65TeFGuuTgxg5vlgmFYWEkpFzb0RXjWPoA93uzS3l_VJ34CnAaQkQEkXGj_lQUWS8T4ZD_WyXNyBCH6O8gJiNVnIMLM3AHpo4G_UBe0EJRW',
      tag: 'Handloomed'
    },
    {
      id: 'pdp-washwear',
      title: 'Imperial Micro-Poly Wash & Wear Suit',
      category: 'washwear',
      categoryLabel: "MEN'S UNSTITCHED • 4.5 METERS",
      specs: 'Wrinkle-Free Wash & Wear • All-Season Fall',
      price: 6850,
      originalPrice: 7500,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc-UPLnNSEx8MjMGAuKKqA5DfHUpJi3AYzesDI6y5VEQlNBmd_hBk2uA25JIK500jkhd9dTpW7-gpNHI1QiYvK5h7XGSi1dIkMoCly1N-WDrDmg8soePhvhLqOoUyWgRy4nASrS6POGo5BEs0uM3FHJlqZN6RFjVQBubVnaNUCd9xW67aGc2GPjGM3Bfk8M_bipsrVCqNaVkfBKKdCBoRvmwDaft-Wc1HvSGZpe3UInRvz2JNfeLaR',
      tag: 'Wrinkle-Free'
    },
    {
      id: 'pdp-pashmina',
      title: 'Kashmir Imperial Wool & Silk Shawl Enclosure',
      category: 'shawls',
      categoryLabel: 'HERITAGE UNSTITCHED',
      specs: 'Pure Kashmir Pashmina & Silk • Hand Embroidered',
      price: 24500,
      originalPrice: 28000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtpDbSXYOre5PmSVI3sJsfcH9vEWiF6B6XB5_UzhsLSd33bdRkxKgrpL8c_htusioLSGYpnRnd7lHsz67RT5i1reLuRaBT_kAlnnhHygyb7qraipruumlk74Stffr8mIxJso1EBrCkdLuid2LkGKGpEUYgMLlwTPQtRztM2rgdOmjluaMvuvTvQHlWpy6SyovsqTXiL45v4r_3asJBBbGmouo0qWvmsAYAE00HFh7HNmizutZIjLYl',
      tag: 'Pashmina Silk'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  const handleWhatsAppOrder = (title, price) => {
    const text = encodeURIComponent(`Assalam-o-Alaikum! I want to order "${title}" (Rs. ${price.toLocaleString()}) via Cash on Delivery.`);
    window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
  };

  return (
    <div className="w-full flex flex-col bg-[#FAF8F5]">
      
      {/* Top Delivery & COD Bar */}
      <div className="w-full bg-[#0F382C] text-white py-2.5 px-4 text-center border-b border-[#1A4B3C]">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between text-xs font-medium tracking-wide gap-2">
          <span className="flex items-center gap-1.5 text-[#D4AF37]">
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            <span>Free Delivery Across Pakistan</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#D4AF37]">payments</span>
            <span>Cash on Delivery (COD) Available</span>
          </span>
          <a 
            href="https://wa.me/923001234567" 
            target="_blank" 
            rel="noreferrer" 
            className="hidden sm:flex items-center gap-1.5 text-[#25D366] hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>WhatsApp Order: +92 300 1234567</span>
          </a>
        </div>
      </div>

      {/* Clean Unstitched Suiting Store Main Area */}
      <section className="w-full py-8 max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        
        {/* Simple Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {[
            { id: 'all', label: 'All Unstitched Suits' },
            { id: 'boski', label: 'Royal Boski Silk (4.5m)' },
            { id: 'cotton', label: 'Egyptian Giza Latha' },
            { id: 'lawn', label: "Women's Swiss Lawn 3pc" },
            { id: 'karandi', label: 'Karandi & Khaddar' },
            { id: 'washwear', label: 'Wash & Wear' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#0F382C] text-white shadow-md'
                  : 'bg-white text-[#0F382C] border border-[#EAE6DF] hover:border-[#0F382C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Unstitched Suits Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white border border-[#EAE6DF] hover:border-[#0F382C] transition-all rounded overflow-hidden flex flex-col group shadow-xs hover:shadow-lg"
            >
              {/* Suit Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E2D8C6]">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="bg-[#0F382C] text-white text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-xs shadow-xs">
                    {product.tag}
                  </span>
                  <span className="bg-[#B8860B] text-white text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs">
                    COD Available
                  </span>
                </div>

                {/* Direct Action Buttons on Hover */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                  <button 
                    onClick={() => setCurrentView('pdp')}
                    className="w-full max-w-[200px] bg-white text-[#0F382C] hover:bg-[#0F382C] hover:text-white text-xs uppercase tracking-wider font-bold py-2.5 transition-colors rounded shadow-md cursor-pointer"
                  >
                    View Suit Details
                  </button>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full max-w-[200px] bg-[#0F382C] text-white hover:bg-[#B8860B] text-xs uppercase tracking-wider font-bold py-2.5 transition-colors rounded shadow-md cursor-pointer"
                  >
                    Add To Bag
                  </button>
                </div>
              </div>

              {/* Suit Details & Pricing */}
              <div className="p-4 flex flex-col flex-grow justify-between space-y-3 bg-white">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-medium">
                    {product.categoryLabel}
                  </span>
                  <h3 
                    onClick={() => setCurrentView('pdp')}
                    className="font-serif text-base text-[#0F382C] font-semibold hover:text-[#B8860B] cursor-pointer transition-colors mt-1 line-clamp-1"
                  >
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {product.specs}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0ECE6] flex flex-col gap-2.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xl text-[#0F382C] font-bold">
                        Rs. {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-2">
                          Rs. {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded">
                      In Stock
                    </span>
                  </div>

                  {/* Buttons: Add to Bag & Order via WhatsApp */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => addToCart(product)}
                      className="py-2.5 bg-[#0F382C] text-white hover:bg-[#1A4B3C] text-xs uppercase font-bold tracking-wider rounded transition-colors cursor-pointer text-center"
                    >
                      Add To Bag
                    </button>

                    <button
                      onClick={() => handleWhatsAppOrder(product.title, product.price)}
                      className="py-2.5 bg-[#25D366] text-white hover:bg-[#1EBE5B] text-xs uppercase font-bold tracking-wider rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Simple Pakistan Guarantee Bar at Bottom */}
      <section className="w-full py-8 bg-[#0F382C] text-white border-t border-[#1A4B3C]">
        <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[#D4AF37] text-[22px]">payments</span>
              <span className="text-xs font-semibold uppercase text-gray-200">Cash on Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[#D4AF37] text-[22px]">verified</span>
              <span className="text-xs font-semibold uppercase text-gray-200">100% Original Suits</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[#D4AF37] text-[22px]">local_shipping</span>
              <span className="text-xs font-semibold uppercase text-gray-200">Free Express Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[#D4AF37] text-[22px]">published_with_changes</span>
              <span className="text-xs font-semibold uppercase text-gray-200">Easy 7-Day Exchange</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

