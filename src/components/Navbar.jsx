import React from 'react';
import Logo from './Logo';

export default function Navbar({ currentView, setCurrentView, cartCount, cartTotal, currency, setCurrency, toggleCart, setIsSearchOpen }) {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* View Switcher Top Bar for Stitch Screens */}
      <div className="bg-[#181716] text-[#C5A880] text-xs py-1.5 px-4 flex items-center justify-between border-b border-[#333]">
        <div className="flex items-center gap-2 font-label-caps uppercase tracking-wider text-[11px]">
          <span className="bg-[#C5A880] text-[#181716] font-bold px-2 py-0.5 rounded text-[10px]">Stitch Screens</span>
          <span className="hidden md:inline text-gray-400">Project ID: 5671272351440654145</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentView('home')}
            className={`px-2.5 py-1 rounded transition-all font-label-caps text-[11px] uppercase tracking-wider ${
              currentView === 'home'
                ? 'bg-[#C5A880] text-[#181716] font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            1. Homepage
          </button>
          <button
            onClick={() => setCurrentView('collection')}
            className={`px-2.5 py-1 rounded transition-all font-label-caps text-[11px] uppercase tracking-wider ${
              currentView === 'collection'
                ? 'bg-[#C5A880] text-[#181716] font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            2. Collection Listing
          </button>
          <button
            onClick={() => setCurrentView('pdp')}
            className={`px-2.5 py-1 rounded transition-all font-label-caps text-[11px] uppercase tracking-wider ${
              currentView === 'pdp'
                ? 'bg-[#C5A880] text-[#181716] font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            3. Royal Boski PDP
          </button>
          <button
            onClick={() => setCurrentView('design-system')}
            className={`px-2.5 py-1 rounded transition-all font-label-caps text-[11px] uppercase tracking-wider ${
              currentView === 'design-system'
                ? 'bg-[#C5A880] text-[#181716] font-bold'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            4. Design System
          </button>
        </div>
      </div>

      {/* Main Top Announcement Bar */}
      <div className="h-9 bg-primary text-on-primary flex items-center justify-between px-gutter-mobile lg:px-gutter-desktop max-w-[1440px] mx-auto">
        <div className="hidden md:flex items-center gap-space-md">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-surface-variant flex items-center gap-space-2xs">
            <span className="material-symbols-outlined text-[14px]">call</span> +92 42 111-TANABANA
          </span>
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-surface-variant flex items-center gap-space-2xs">
            <span className="material-symbols-outlined text-[14px]">pin_drop</span> Gulberg • Clifton
          </span>
        </div>
        <div className="flex-1 text-center font-label-caps text-label-caps tracking-widest uppercase truncate px-space-xs">
          <span className="text-on-primary">Complimentary Express Delivery on Orders &gt; Rs. 3,500</span>
          <span className="text-surface-variant mx-space-xs hidden sm:inline">|</span>
          <span className="text-surface-variant hidden sm:inline">COD Available Nationwide</span>
        </div>
        <div className="flex items-center gap-space-md font-label-caps text-label-caps uppercase tracking-wider">
          <a className="hidden lg:inline text-surface-variant hover:text-on-primary transition-colors" href="#">
            Track Order
          </a>
          <div className="flex items-center gap-space-2xs bg-surface-container-highest/20 px-space-xs py-0.5 rounded-full">
            <span 
              onClick={() => setCurrency('PKR')}
              className={`cursor-pointer ${currency === 'PKR' ? 'text-on-primary font-bold' : 'text-surface-variant hover:text-on-primary'}`}
            >
              PKR
            </span>
            <span className="text-surface-variant">/</span>
            <span 
              onClick={() => setCurrency('USD')}
              className={`cursor-pointer ${currency === 'USD' ? 'text-on-primary font-bold' : 'text-surface-variant hover:text-on-primary'}`}
            >
              USD
            </span>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header class="bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <button onClick={() => setCurrentView('home')} className="flex items-center gap-space-sm">
              <Logo className="h-9 w-auto object-contain" />
            </button>
          </div>

          <nav className="hidden xl:flex items-center gap-space-lg">
            <button
              onClick={() => setCurrentView('home')}
              className={`font-label-caps text-label-caps uppercase transition-colors tracking-widest ${
                currentView === 'home' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView('collection')}
              className={`font-label-caps text-label-caps uppercase transition-colors tracking-widest ${
                currentView === 'collection' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Men's Unstitched
            </button>
            <button
              onClick={() => setCurrentView('collection')}
              className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors tracking-widest"
            >
              Women's Luxury
            </button>
            <button
              onClick={() => setCurrentView('pdp')}
              className={`font-label-caps text-label-caps uppercase transition-colors tracking-widest ${
                currentView === 'pdp' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Festive Lawn &amp; Silk
            </button>
            <button
              onClick={() => setCurrentView('collection')}
              className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors tracking-widest"
            >
              Heritage Shawls
            </button>
            <button
              onClick={() => setCurrentView('collection')}
              className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors tracking-widest"
            >
              Collections
            </button>
            <button
              onClick={() => setCurrentView('collection')}
              className="font-label-caps text-label-caps uppercase text-secondary hover:text-primary transition-colors tracking-widest font-semibold"
            >
              Sale
            </button>
          </nav>

          <div className="flex items-center gap-space-sm lg:gap-space-md">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-space-xs px-space-sm py-1.5 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">Search</span>
              <span className="font-label-caps text-label-caps text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded text-outline">⌘K</span>
            </button>

            <button className="relative p-1.5 text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-on-primary font-label-caps text-[9px] flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            <button
              onClick={toggleCart}
              className="flex items-center gap-space-xs p-1.5 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <div className="relative">
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-on-primary font-label-caps text-[9px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              </div>
              <div className="hidden md:flex flex-col text-left leading-none">
                <span className="font-label-caps text-[10px] text-outline uppercase">Bag</span>
                <span className="font-price-md text-price-md text-primary">
                  {currency === 'PKR' ? `Rs. ${cartTotal.toLocaleString()}` : `$ ${(cartTotal / 278).toFixed(0)}`}
                </span>
              </div>
            </button>

            <button className="flex items-center gap-space-2xs text-on-surface-variant hover:text-on-surface transition-colors pl-space-2xs">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
