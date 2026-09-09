import React from 'react';
import Logo from './Logo';

export default function Footer({ setCurrentView }) {
  return (
    <footer className="w-full bg-[#181716] text-[#E4E2DE] pt-space-4xl pb-space-2xl border-t border-[#30312E]">
      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-2xl pb-space-3xl border-b border-[#30312E]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-space-md pr-0 lg:pr-space-xl">
            <div className="flex items-center gap-space-sm bg-white/5 p-2 rounded w-fit">
              <Logo className="h-10 w-auto text-white" />
            </div>
            <p className="font-body-md text-body-md text-[#8C867E] max-w-md leading-relaxed">
              Tanabana Fabrics preserves centuries-old South Asian weaving heritage. Calibrated thread counts, authentic Giza cotton, and 100% natural spun Boski silk crafted for high fashion and sartorial prestige.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C5A880] hover:text-[#181716] transition-colors">
                <span className="material-symbols-outlined text-[18px]">share</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C5A880] hover:text-[#181716] transition-colors">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#C5A880] hover:text-[#181716] transition-colors">
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-space-md">
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-[#C5A880] font-semibold">The Ateliers</h4>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-[#8C867E]">
              <li>
                <button onClick={() => setCurrentView('collection')} className="hover:text-white transition-colors">
                  Men's Sovereign Boski
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('collection')} className="hover:text-white transition-colors">
                  Superfine Giza Latha
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('collection')} className="hover:text-white transition-colors">
                  Festive Lawn &amp; Schiffli
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('collection')} className="hover:text-white transition-colors">
                  Heritage Raw Silk
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('collection')} className="hover:text-white transition-colors">
                  Pashmina &amp; Jamawar
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-space-md">
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-[#C5A880] font-semibold">Customer Concierge</h4>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-[#8C867E]">
              <li><a href="#" className="hover:text-white transition-colors">Track Order Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bespoke Tailoring Concierge</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Silk Purity Verification</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Worldwide Shipping &amp; Duties</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns &amp; Exchange Policy</a></li>
            </ul>
          </div>

          {/* Flagship Stores */}
          <div className="space-y-space-md">
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-[#C5A880] font-semibold">Flagship Ateliers</h4>
            <div className="space-y-space-sm font-body-sm text-[#8C867E]">
              <div>
                <p className="text-white font-medium">Gulberg III Flagship</p>
                <p className="text-xs">MM Alam Road, Lahore</p>
                <p className="text-xs text-[#C5A880]">+92 42 35789100</p>
              </div>
              <div className="pt-2">
                <p className="text-white font-medium">Clifton Atelier</p>
                <p className="text-xs">Block 4, Main Clifton, Karachi</p>
                <p className="text-xs text-[#C5A880]">+92 21 35874200</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & payment icons */}
        <div className="pt-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md font-label-caps text-[11px] text-[#8C867E] uppercase tracking-wider">
          <p>© 2026 Tanabana Fabrics Ltd. All rights reserved. Crafted from Stitch Design System Project #5671272351440654145.</p>
          <div className="flex items-center gap-space-md">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>UnionPay</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
