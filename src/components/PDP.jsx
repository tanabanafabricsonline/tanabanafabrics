'use client';

import React, { useState } from 'react';

export default function PDP({ setCurrentView, addToCart }) {
  const galleryImages = [
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmhpUZ5GJ3bNCO-67FTswqbMIsYYYwFmemtr_psiQ9xoubda9R2lnKy8mvVijFlzgFu17g2wbHix6xe83CKlCw88gi1a58uGGCd_aTttWkrv-uZ40camFc5H6WA5G3KUFy5KoQz7ipxrn9GJNrhl6NsuScb68PqX18n2MhDMO5Cd9Y1sxTTannS5h8nXGMC8kJVKkjU6mVLqU8uyFsC1CvsnaTXZljmVykxApvSKJlwCaT7-CUb0y0',
      alt: 'Folded bolt view with copper Tanabana seal ribbon',
      caption: 'Full 4.5m Bolt Unboxing'
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHYXgG6C7hfWMHorrrilBMqqA8o4JPmtFTF6pFmm39sR0qaMHxc83skaC3oNfLMy3Y7oella_Hq6PV6CTDi3aL3JU5huCFi9s8-EYCG5sjgD7hcoK8-3OEuucu9W57POxRBjHG0r8quo0gJ-HUpLAzNJM8fB-u_IuTK6l3DxIzMfGPEiqX3t_-HECSvHI8fLDirCLhj8mE_uvc5c_DfCXah1GZU7btVratzJ54TNlGdJxXMQXW3ehc',
      alt: 'Extreme macro close-up of spun silk boski weave',
      caption: 'Macro Thread Density (200x)'
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKMz7Xh1r0Eg31Iuk6FDhNOJ6TGn0BKzzq4IoZz9dvwfLxSCSOlKlhYZZs0VJUr8HfPCgFVV-iGsYy67ePrekEsA_HQvuuVxW19RUky-SLojQ5Dljpoa0llrZP1Owcv1j3Jq4Of6nBq65TeFGuuTgxg5vlgmFYWEkpFzb0RXjWPoA93uzS3l_VJ34CnAaQkQEkXGj_lQUWS8T4ZD_WyXNyBCH6O8gJiNVnIMLM3AHpo4G_UBe0EJRW',
      alt: 'Distinguished Pakistani gentleman wearing bespoke tailored Kurta Shalwar',
      caption: 'Tailored Fit Silhouette'
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc-UPLnNSEx8MjMGAuKKqA5DfHUpJi3AYzesDI6y5VEQlNBmd_hBk2uA25JIK500jkhd9dTpW7-gpNHI1QiYvK5h7XGSi1dIkMoCly1N-WDrDmg8soePhvhLqOoUyWgRy4nASrS6POGo5BEs0uM3FHJlqZN6RFjVQBubVnaNUCd9xW67aGc2GPjGM3Bfk8M_bipsrVCqNaVkfBKKdCBoRvmwDaft-Wc1HvSGZpe3UInRvz2JNfeLaR',
      alt: 'Boxed atelier package featuring 8 carved genuine horn buttons',
      caption: 'Horn Buttons & Label Suite'
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtpDbSXYOre5PmSVI3sJsfcH9vEWiF6B6XB5_UzhsLSd33bdRkxKgrpL8c_htusioLSGYpnRnd7lHsz67RT5i1reLuRaBT_kAlnnhHygyb7qraipruumlk74Stffr8mIxJso1EBrCkdLuid2LkGKGpEUYgMLlwTPQtRztM2rgdOmjluaMvuvTvQHlWpy6SyovsqTXiL45v4r_3asJBBbGmouo0qWvmsAYAE00HFh7HNmizutZIjLYl',
      alt: 'Calligraphic Tanabana Certificate of Authenticity card',
      caption: 'Authenticity Guarantee Card'
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedLength, setSelectedLength] = useState('4.5m'); // '4.5m' or '7.0m'
  const [includeHornButtons, setIncludeHornButtons] = useState(true);
  const [includeGiftBox, setIncludeGiftBox] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'authenticity', 'care', 'shipping'
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Price calculations
  const basePrice = selectedLength === '4.5m' ? 14850 : 22350;
  const buttonsPrice = includeHornButtons ? 1200 : 0;
  const giftBoxPrice = includeGiftBox ? 1500 : 0;
  const unitPrice = basePrice + buttonsPrice + giftBoxPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToBag = () => {
    const itemToAdd = {
      id: `pdp-boski-${selectedLength}-${includeHornButtons ? 'buttons' : ''}`,
      title: `Koh-i-Noor Royal Boski 10-Pound (${selectedLength})`,
      category: "MEN'S UNSTITCHED",
      price: unitPrice,
      quantity: quantity,
      image: galleryImages[0].src,
      options: `${selectedLength} Cut ${includeHornButtons ? '+ Horn Buttons' : ''} ${includeGiftBox ? '+ Gift Box' : ''}`
    };
    addToCart(itemToAdd);
  };

  return (
    <div className="w-full flex flex-col bg-background min-h-screen">
      {/* Editorial Sub-Navigation & Breadcrumbs */}
      <section className="w-full bg-surface-container-lowest/60 border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-sm flex flex-wrap items-center justify-between gap-space-xs text-body-sm text-on-surface-variant">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-space-2xs text-body-sm">
            <button onClick={() => setCurrentView('home')} className="hover:text-primary transition-colors">Home</button>
            <span className="text-outline-variant font-label-caps text-[10px]">/</span>
            <button onClick={() => setCurrentView('collection')} className="hover:text-primary transition-colors">Men's Unstitched</button>
            <span className="text-outline-variant font-label-caps text-[10px]">/</span>
            <span className="hover:text-primary transition-colors">Silk &amp; Boski</span>
            <span className="text-outline-variant font-label-caps text-[10px]">/</span>
            <span className="text-primary font-medium truncate max-w-[200px] sm:max-w-none">Koh-i-Noor Royal Boski 4.5m</span>
          </nav>
          
          <div className="hidden sm:flex items-center gap-space-md font-label-caps text-label-caps uppercase tracking-wider text-outline">
            <span className="flex items-center gap-space-3xs text-secondary font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Lot #TB-2026-Q1
            </span>
            <span>Certificate of Authenticity Enclosed</span>
          </div>
        </div>
      </section>

      {/* Main Atelier Display Section */}
      <section className="w-full max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-lg lg:py-space-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-start">
          
          {/* LEFT: Multi-Angle Interactive Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {/* Hero Main Image */}
            <div className="relative w-full aspect-[4/5] bg-surface-container overflow-hidden group rounded-DEFAULT border border-surface-container-high">
              <img 
                src={galleryImages[activeImageIndex].src} 
                alt={galleryImages[activeImageIndex].alt} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-space-md left-space-md flex flex-col gap-space-2xs pointer-events-none">
                <span className="bg-primary text-on-primary font-label-caps text-label-caps px-space-sm py-1 uppercase tracking-widest font-semibold">
                  Unstitched {selectedLength}
                </span>
                <span className="bg-surface/90 backdrop-blur-sm text-primary font-label-caps text-label-caps px-space-sm py-1 uppercase tracking-widest border border-outline/20">
                  10-Pound Grade A Silk
                </span>
              </div>

              {/* Top Action Icons */}
              <div className="absolute top-space-md right-space-md flex items-center gap-space-2xs">
                <button 
                  className="w-9 h-9 rounded-full bg-surface/90 backdrop-blur-sm text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors shadow-sm cursor-pointer"
                  title="Silk Purity Guaranteed"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </button>
                <button 
                  onClick={() => setIsZoomOpen(true)}
                  className="w-9 h-9 rounded-full bg-surface/90 backdrop-blur-sm text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors shadow-sm cursor-pointer"
                  title="Full Screen Atelier Zoom"
                >
                  <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                </button>
              </div>

              {/* Bottom Inspection Pill */}
              <div className="absolute bottom-space-md left-space-md bg-surface-container-lowest/90 backdrop-blur-md px-space-sm py-1.5 flex items-center gap-space-xs text-on-surface rounded shadow-sm border border-surface-container">
                <span className="material-symbols-outlined text-[16px] text-secondary">loupe</span>
                <span className="font-label-caps text-[10px] uppercase tracking-wider">Hover to inspect warp &amp; weft luster</span>
              </div>

              <div className="absolute bottom-space-md right-space-md hidden sm:block font-label-caps text-[9px] text-outline uppercase tracking-widest bg-surface/80 backdrop-blur-xs px-space-xs py-1 rounded">
                Weave Density: 120s Double-Ply
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-space-sm overflow-x-auto pb-space-xs pt-1 no-scrollbar">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`flex-shrink-0 w-20 sm:w-24 aspect-[4/5] bg-surface-container overflow-hidden transition-all rounded ${
                    activeImageIndex === idx 
                      ? 'border-2 border-primary opacity-100 shadow-md' 
                      : 'opacity-60 hover:opacity-100 border border-transparent'
                  }`}
                >
                  <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Craft Notes Callout Bar */}
            <div className="grid grid-cols-3 gap-space-sm bg-surface-container-low p-space-md rounded-DEFAULT border border-surface-container">
              <div className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">verified_user</span>
                <div>
                  <p className="font-label-caps text-label-caps uppercase text-primary font-bold">Loom Origin</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">Jiangsu Spun Silk</p>
                </div>
              </div>
              <div className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">scale</span>
                <div>
                  <p className="font-label-caps text-label-caps uppercase text-primary font-bold">10-Pound Fall</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">Heavy non-translucent</p>
                </div>
              </div>
              <div className="flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">water_drop</span>
                <div>
                  <p className="font-label-caps text-label-caps uppercase text-primary font-bold">Luster Grace</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">Gleams with wash</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Purchase & Specification Panel */}
          <div className="lg:col-span-5 space-y-space-lg">
            {/* Title & Reviews */}
            <div className="space-y-space-xs pb-space-md border-b border-surface-container">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary font-semibold">
                  Royal Boski Series • Lot #TB-2026
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-label-caps font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> In Stock
                </span>
              </div>

              <h1 className="font-display-md text-2xl sm:text-3xl text-primary font-normal leading-tight">
                Koh-i-Noor Royal Boski 10-Pound Unstitched Suit
              </h1>

              <div className="flex items-center gap-space-md pt-1">
                <div className="flex items-center gap-1 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]">star</span>
                  ))}
                  <span className="font-body-sm font-bold text-primary text-xs ml-1">4.9 / 5</span>
                </div>
                <span className="text-outline text-xs">•</span>
                <span className="font-label-caps text-xs text-on-surface-variant underline cursor-pointer">
                  38 Verified Collector Reviews
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-space-2xs bg-surface-container-low p-space-md rounded border border-surface-container">
              <span className="font-label-caps text-[10px] text-outline uppercase tracking-widest block">
                Atelier Price (Includes Customs &amp; Certification)
              </span>
              <div className="flex items-baseline gap-space-md">
                <span className="font-display-lg text-3xl text-primary font-bold">
                  Rs. {totalPrice.toLocaleString()}
                </span>
                {selectedLength === '4.5m' && (
                  <span className="font-body-md text-base text-outline line-through">
                    Rs. 16,500
                  </span>
                )}
                <span className="bg-secondary/15 text-secondary font-label-caps text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                  Save 10%
                </span>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Includes complimentary nationwide 48-hr courier dispatch &amp; insurance.
              </p>
            </div>

            {/* Cut Length Selection */}
            <div className="space-y-space-xs">
              <label className="font-label-caps text-label-caps uppercase text-primary font-bold flex items-center justify-between">
                <span>Select Fabric Length</span>
                <span className="text-xs text-secondary font-normal underline cursor-pointer">Length Calculator Guide</span>
              </label>
              
              <div className="grid grid-cols-2 gap-space-sm">
                <button
                  onClick={() => setSelectedLength('4.5m')}
                  className={`p-space-sm text-left rounded border transition-all cursor-pointer ${
                    selectedLength === '4.5m'
                      ? 'border-primary bg-primary text-on-primary shadow-sm'
                      : 'border-surface-container-high bg-surface-container-lowest text-on-surface hover:border-primary'
                  }`}
                >
                  <p className="font-label-caps text-xs font-bold uppercase">4.5 Meters Standard</p>
                  <p className="text-[11px] opacity-80 mt-0.5">Ideal for 1 Kurta &amp; Shalwar (Up to 6ft 1in)</p>
                </button>

                <button
                  onClick={() => setSelectedLength('7.0m')}
                  className={`p-space-sm text-left rounded border transition-all cursor-pointer ${
                    selectedLength === '7.0m'
                      ? 'border-primary bg-primary text-on-primary shadow-sm'
                      : 'border-surface-container-high bg-surface-container-lowest text-on-surface hover:border-primary'
                  }`}
                >
                  <p className="font-label-caps text-xs font-bold uppercase">7.0 Meters Double Suit</p>
                  <p className="text-[11px] opacity-80 mt-0.5">Full Double Cut for 2 Suits (+ Rs. 7,500)</p>
                </button>
              </div>
            </div>

            {/* Add-ons Checkboxes */}
            <div className="space-y-space-xs bg-surface-container-lowest p-space-md rounded border border-surface-container">
              <p className="font-label-caps text-label-caps uppercase text-primary font-bold">
                Atelier Finishing Add-Ons
              </p>
              
              <label className="flex items-start gap-space-sm p-2 rounded hover:bg-surface-container-low cursor-pointer transition-colors">
                <input 
                  type="checkbox" 
                  checked={includeHornButtons}
                  onChange={(e) => setIncludeHornButtons(e.target.checked)}
                  className="mt-1 accent-primary" 
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-primary">
                    <span>Hand-Carved Buffalo Horn Buttons (8 Pcs)</span>
                    <span className="text-secondary">+ Rs. 1,200</span>
                  </div>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">
                    Authentic deep brown horn buttons engraved with Tanabana crest + neck label.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-space-sm p-2 rounded hover:bg-surface-container-low cursor-pointer transition-colors">
                <input 
                  type="checkbox" 
                  checked={includeGiftBox}
                  onChange={(e) => setIncludeGiftBox(e.target.checked)}
                  className="mt-1 accent-primary" 
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-primary">
                    <span>Rigid Wooden Atelier Heritage Gift Box</span>
                    <span className="text-secondary">+ Rs. 1,500</span>
                  </div>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">
                    Hardwood magnetic presentation box with silk lining &amp; wax seal ribbon.
                  </p>
                </div>
              </label>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-space-sm">
              <div className="flex items-center gap-space-md">
                <div className="flex items-center border border-surface-container-high rounded bg-surface-container-lowest">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-11 flex items-center justify-center text-primary font-bold hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-sm">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-11 flex items-center justify-center text-primary font-bold hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={handleAddToBag}
                  className="flex-1 py-3.5 bg-[#0F382C] text-white hover:bg-[#1A4B3C] font-label-caps text-label-caps uppercase tracking-widest transition-colors font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer rounded"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>Add To Bag</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button 
                  onClick={handleAddToBag}
                  className="w-full py-3.5 bg-[#B8860B] text-white hover:bg-[#966C07] font-label-caps text-xs uppercase tracking-widest transition-colors font-bold text-center cursor-pointer shadow-md rounded"
                >
                  Cash on Delivery Checkout
                </button>

                <button
                  onClick={() => {
                    const text = encodeURIComponent(`Assalam-o-Alaikum! I want to order "Koh-i-Noor Royal Boski 10-Pound (${selectedLength})" (Rs. ${totalPrice.toLocaleString()}) via Cash on Delivery.`);
                    window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
                  }}
                  className="w-full py-3.5 bg-[#25D366] text-white hover:bg-[#1EBE5B] font-label-caps text-xs uppercase tracking-widest transition-colors font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md rounded"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Information Accordion Tabs */}
            <div className="pt-space-md border-t border-surface-container space-y-2">
              <div className="flex border-b border-surface-container font-label-caps text-xs uppercase tracking-widest">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`py-2 px-3 border-b-2 font-bold transition-colors ${
                    activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-primary'
                  }`}
                >
                  Specs &amp; Weave
                </button>
                <button
                  onClick={() => setActiveTab('authenticity')}
                  className={`py-2 px-3 border-b-2 font-bold transition-colors ${
                    activeTab === 'authenticity' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-primary'
                  }`}
                >
                  Authenticity
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`py-2 px-3 border-b-2 font-bold transition-colors ${
                    activeTab === 'care' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-primary'
                  }`}
                >
                  Care Guide
                </button>
              </div>

              <div className="py-space-sm text-xs font-body-sm text-on-surface-variant leading-relaxed">
                {activeTab === 'specs' && (
                  <ul className="space-y-1.5 list-disc pl-4">
                    <li><strong className="text-primary">Composition:</strong> 100% Spun Silk from Natural Chinese Mulberry Silk Cocoons.</li>
                    <li><strong className="text-primary">Fabric Cut:</strong> {selectedLength} Unstitched Standard Cut (54 Inches Width).</li>
                    <li><strong className="text-primary">Weight Grade:</strong> 10-Pound Heavy Fall (Ideal for formal Kurta Shalwar).</li>
                    <li><strong className="text-primary">Finish:</strong> Soft matte silk sheen with natural slub texture.</li>
                  </ul>
                )}
                {activeTab === 'authenticity' && (
                  <p>
                    Every length of Koh-i-Noor Royal Boski is accompanied by a stamped <strong>Tanabana Certificate of Silk Purity</strong>. You can perform the traditional flame test: pure spun silk produces a faint organic aroma and leaves fine ash, confirming zero synthetic polyester content.
                  </p>
                )}
                {activeTab === 'care' && (
                  <p>
                    Dry clean recommended for first 2 washes to preserve natural silk luster. Subsequent gentle hand washes in cool water with mild silk detergent. Do not wring or tumble dry; dry in soft shade.
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button 
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-secondary text-3xl cursor-pointer"
          >
            &times;
          </button>
          <img 
            src={galleryImages[activeImageIndex].src} 
            alt="Zoom view" 
            className="max-w-full max-h-[90vh] object-contain rounded"
          />
        </div>
      )}
    </div>
  );
}
