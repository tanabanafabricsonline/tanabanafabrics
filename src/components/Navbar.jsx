import React, { useState } from 'react';
import Logo from './Logo';

export default function Navbar({ currentView, setCurrentView, cartCount, cartTotal, currency, setCurrency, toggleCart, setIsSearchOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Main Top Announcement Bar */}
      <div className="h-9 bg-primary text-on-primary flex items-center justify-between px-gutter-mobile lg:px-gutter-desktop max-w-[1440px] mx-auto text-xs uppercase font-label-caps tracking-widest">
        <div className="hidden md:flex items-center gap-space-md">
          <span className="text-surface-variant flex items-center gap-space-2xs">
            <span className="material-symbols-outlined text-[14px]">call</span> +92 42 111-TANABANA
          </span>
          <span className="text-surface-variant flex items-center gap-space-2xs">
            <span className="material-symbols-outlined text-[14px]">pin_drop</span> Gulberg • Clifton
          </span>
        </div>
        <div className="flex-1 text-center truncate px-space-xs text-[11px] sm:text-xs">
          <span className="text-on-primary">Complimentary Express Delivery on Orders &gt; Rs. 3,500</span>
          <span className="text-surface-variant mx-space-xs hidden sm:inline">|</span>
          <span className="text-surface-variant hidden sm:inline">COD Available Nationwide</span>
        </div>
        <div className="flex items-center gap-space-md">
          <a className="hidden lg:inline text-surface-variant hover:text-on-primary transition-colors" href="#">
            Track Order
          </a>
          <div className="flex items-center gap-1 bg-surface-container-highest/20 px-2 py-0.5 rounded-full text-[11px]">
            <span 
              onClick={() => setCurrency('PKR')}
              className={`cursor-pointer transition-colors ${currency === 'PKR' ? 'text-on-primary font-bold' : 'text-surface-variant hover:text-on-primary'}`}
            >
              PKR
            </span>
            <span className="text-surface-variant">/</span>
            <span 
              onClick={() => setCurrency('USD')}
              className={`cursor-pointer transition-colors ${currency === 'USD' ? 'text-on-primary font-bold' : 'text-surface-variant hover:text-on-primary'}`}
            >
              USD
            </span>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header className="bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container">
        <div className="h-20 max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-md">
          
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-space-md">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-1.5 text-on-surface hover:text-primary transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-[26px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <button onClick={() => handleNavClick('home')} className="flex items-center gap-space-sm cursor-pointer">
              <Logo className="h-8 sm:h-9 w-auto object-contain" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-space-lg">
            <button
              onClick={() => handleNavClick('home')}
              className={`font-label-caps text-label-caps uppercase transition-all tracking-widest cursor-pointer ${
                currentView === 'home' 
                  ? 'text-primary font-bold border-b-2 border-primary pb-0.5' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('collection')}
              className={`font-label-caps text-label-caps uppercase transition-all tracking-widest cursor-pointer ${
                currentView === 'collection' 
                  ? 'text-primary font-bold border-b-2 border-primary pb-0.5' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Men's Unstitched
            </button>

            <button
              onClick={() => handleNavClick('collection')}
              className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors tracking-widest cursor-pointer"
            >
              Women's Luxury
            </button>

            <button
              onClick={() => handleNavClick('pdp')}
              className={`font-label-caps text-label-caps uppercase transition-all tracking-widest cursor-pointer ${
                currentView === 'pdp' 
                  ? 'text-primary font-bold border-b-2 border-primary pb-0.5' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Festive Lawn &amp; Silk
            </button>

            <button
              onClick={() => handleNavClick('collection')}
              className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors tracking-widest cursor-pointer"
            >
              Heritage Shawls
            </button>

            <button
              onClick={() => handleNavClick('collection')}
              className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors tracking-widest cursor-pointer"
            >
              Collections
            </button>

            <button
              onClick={() => handleNavClick('collection')}
              className="font-label-caps text-label-caps uppercase text-secondary hover:text-primary transition-colors tracking-widest font-semibold cursor-pointer"
            >
              Sale
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-space-xs sm:gap-space-md">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-space-xs px-2.5 sm:px-space-sm py-1.5 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span className="hidden sm:inline font-label-caps text-label-caps uppercase text-on-surface-variant">Search</span>
              <span className="hidden md:inline font-label-caps text-label-caps text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded text-outline">⌘K</span>
            </button>

            <button className="relative p-1.5 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-on-primary font-label-caps text-[9px] flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            <button
              onClick={toggleCart}
              className="flex items-center gap-space-xs p-1.5 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              <div className="relative">
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-on-primary font-label-caps text-[9px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              </div>
              <div className="hidden lg:flex flex-col text-left leading-none">
                <span className="font-label-caps text-[10px] text-outline uppercase">Bag</span>
                <span className="font-price-md text-price-md text-primary">
                  {currency === 'PKR' ? `Rs. ${cartTotal.toLocaleString()}` : `$ ${(cartTotal / 278).toFixed(0)}`}
                </span>
              </div>
            </button>

            <button className="hidden sm:flex items-center gap-space-2xs text-on-surface-variant hover:text-on-surface transition-colors pl-space-2xs cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-b border-surface-container shadow-2xl animate-fade-in">
          <div className="max-w-[1440px] mx-auto p-space-lg space-y-space-md">
            <div className="flex flex-col space-y-space-xs font-label-caps text-sm uppercase tracking-widest">
              <button
                onClick={() => handleNavClick('home')}
                className={`py-2.5 px-3 rounded text-left transition-colors ${currentView === 'home' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface hover:bg-surface-container'}`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('collection')}
                className={`py-2.5 px-3 rounded text-left transition-colors ${currentView === 'collection' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface hover:bg-surface-container'}`}
              >
                Men's Unstitched Collection
              </button>
              <button
                onClick={() => handleNavClick('collection')}
                className="py-2.5 px-3 rounded text-left text-on-surface hover:bg-surface-container transition-colors"
              >
                Women's Luxury Couture
              </button>
              <button
                onClick={() => handleNavClick('pdp')}
                className={`py-2.5 px-3 rounded text-left transition-colors ${currentView === 'pdp' ? 'bg-primary text-on-primary font-bold' : 'text-on-surface hover:bg-surface-container'}`}
              >
                Koh-i-Noor Boski (PDP Detail)
              </button>
              <button
                onClick={() => handleNavClick('collection')}
                className="py-2.5 px-3 rounded text-left text-on-surface hover:bg-surface-container transition-colors"
              >
                Heritage Shawls
              </button>
              <button
                onClick={() => handleNavClick('collection')}
                className="py-2.5 px-3 rounded text-left text-secondary font-bold hover:bg-surface-container transition-colors"
              >
                Sale (Up to 30% Off)
              </button>
            </div>
            
            <div className="pt-space-sm border-t border-surface-container flex items-center justify-between text-xs font-label-caps uppercase text-outline">
              <span>Customer Care: +92 42 111-TANABANA</span>
              <span className="text-secondary font-bold">Gulberg • Clifton</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
