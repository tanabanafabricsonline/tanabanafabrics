import React from 'react';

export default function DesignSystemViewer() {
  const colorTokens = [
    { name: 'Primary (Atelier Charcoal)', hex: '#181716', usage: 'Primary headlines, structural elements, CTAs' },
    { name: 'Secondary (Camel Gold)', hex: '#C5A880', usage: 'Editorial flourishes, accents, badges, highlights' },
    { name: 'Tertiary (Botanical Sage)', hex: '#424D43', usage: 'Provenance indicators, organic silk tags' },
    { name: 'Base Canvas (Silk Ivory)', hex: '#FDFBF7', usage: 'Default page background canvas' },
    { name: 'Surface Secondary (Plaster Cream)', hex: '#F7F4EE', usage: 'Card backings, drawers, utility modules' },
    { name: 'Hairline Boundary (Rule Border)', hex: '#EAE5DC', usage: '1px delicate grid dividers' },
    { name: 'Muted Editorial Text', hex: '#5C5852', usage: 'Secondary product specs and fabric copy' },
  ];

  const typographyScale = [
    { name: 'display-lg', font: 'Playfair Display', size: '56px / 64px', sample: 'Tradition, Woven Beautifully' },
    { name: 'display-md', font: 'Playfair Display', size: '42px / 48px', sample: 'Woven In Splendor' },
    { name: 'headline-lg', font: 'Playfair Display', size: '32px / 38px', sample: 'The Sovereign Men\'s Edit' },
    { name: 'headline-sm', font: 'Playfair Display', size: '20px / 26px', sample: 'Koh-i-Noor Royal Boski' },
    { name: 'body-lg', font: 'Plus Jakarta Sans', size: '18px / 28px', sample: 'Archival unstitched textiles crafted with Egyptian combed cotton...' },
    { name: 'body-md', font: 'Plus Jakarta Sans', size: '15px / 24px', sample: 'From ceremonial Chinese Boski to crisp superfine Egyptian Latha.' },
    { name: 'label-caps', font: 'Plus Jakarta Sans (Caps)', size: '11px / 14px (0.14em tracking)', sample: 'HEIRLOOM WEAVES OF PUNJAB' },
    { name: 'price-lg', font: 'Playfair Display', size: '22px / 26px', sample: 'Rs. 14,850' },
  ];

  return (
    <div className="w-full flex flex-col bg-background min-h-screen">
      {/* Header Banner */}
      <section className="w-full bg-[#181716] text-[#FDFBF7] py-space-2xl border-b border-[#333]">
        <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="inline-flex items-center gap-2 bg-[#C5A880]/20 text-[#C5A880] px-3 py-1 rounded font-label-caps text-xs uppercase tracking-widest mb-3 border border-[#C5A880]/40">
            <span>Stitch MCP Asset ID: asset-stub-assets_8233403c8fc44472beb41240de5fb393</span>
          </div>
          <h1 className="font-display-lg text-4xl sm:text-5xl font-normal">
            Editorial Luxury Couture Design System
          </h1>
          <p className="font-body-lg text-[#8C867E] max-w-3xl mt-2 leading-relaxed">
            Stitch MCP design theme specification for Tanabana Fabrics. High-end South Asian sartorial heritage translated into modern digital editorial minimalism with architectural 0px radiuses and calibrated thread-count palettes.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-3xl space-y-space-3xl">
        
        {/* Section 1: Color Tokens */}
        <section className="space-y-space-lg">
          <div className="border-b border-surface-container pb-space-sm">
            <span className="font-label-caps text-xs text-secondary uppercase tracking-widest font-bold">Token Spec 01</span>
            <h2 className="font-display-md text-2xl text-primary">Color Palette &amp; Tonal System</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {colorTokens.map((token, i) => (
              <div key={i} className="bg-surface-container-lowest p-space-md rounded border border-surface-container-high shadow-sm space-y-3">
                <div 
                  className="w-full h-24 rounded border border-black/10 flex items-end p-2 text-xs font-mono font-bold" 
                  style={{ backgroundColor: token.hex, color: token.hex === '#FDFBF7' || token.hex === '#F7F4EE' || token.hex === '#EAE5DC' ? '#181716' : '#FFFFFF' }}
                >
                  {token.hex}
                </div>
                <div>
                  <h4 className="font-label-caps text-xs uppercase font-bold text-primary">{token.name}</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">{token.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Typography Scale */}
        <section className="space-y-space-lg">
          <div className="border-b border-surface-container pb-space-sm">
            <span className="font-label-caps text-xs text-secondary uppercase tracking-widest font-bold">Token Spec 02</span>
            <h2 className="font-display-md text-2xl text-primary">Typography Scale &amp; Font Families</h2>
          </div>

          <div className="bg-surface-container-lowest rounded border border-surface-container-high divide-y divide-surface-container">
            {typographyScale.map((type, i) => (
              <div key={i} className="p-space-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="w-48 flex-shrink-0">
                  <span className="font-label-caps text-xs font-bold text-secondary uppercase">{type.name}</span>
                  <p className="text-[11px] text-outline">{type.font} • {type.size}</p>
                </div>
                <div className="flex-1">
                  <p 
                    className="text-primary" 
                    style={{ 
                      fontFamily: type.font.includes('Playfair') ? "'Playfair Display', serif" : "'Plus Jakarta Sans', sans-serif",
                      fontSize: type.name.includes('display-lg') ? '32px' : type.name.includes('display-md') ? '24px' : '16px',
                      textTransform: type.name.includes('caps') ? 'uppercase' : 'none',
                      letterSpacing: type.name.includes('caps') ? '0.14em' : 'normal'
                    }}
                  >
                    {type.sample}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Component Library Interactive Sandbox */}
        <section className="space-y-space-lg">
          <div className="border-b border-surface-container pb-space-sm">
            <span className="font-label-caps text-xs text-secondary uppercase tracking-widest font-bold">Token Spec 03</span>
            <h2 className="font-display-md text-2xl text-primary">Interactive Component Sandbox</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl">
            {/* Buttons */}
            <div className="bg-surface-container-low p-space-lg rounded border border-surface-container space-y-4">
              <h3 className="font-label-caps text-xs uppercase text-primary font-bold">Button Variants</h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-outline font-mono block mb-1">Primary Button (0px radius)</span>
                  <button className="px-6 py-3 bg-[#181716] text-[#FDFBF7] font-label-caps text-xs uppercase tracking-widest font-bold hover:bg-[#333] transition-colors">
                    Add To Atelier Bag
                  </button>
                </div>

                <div>
                  <span className="text-[10px] text-outline font-mono block mb-1">Secondary / Accent Button</span>
                  <button className="px-6 py-3 bg-[#C5A880] text-[#181716] font-label-caps text-xs uppercase tracking-widest font-bold hover:bg-[#b09268] transition-colors">
                    Explore Royal Boski Edit
                  </button>
                </div>

                <div>
                  <span className="text-[10px] text-outline font-mono block mb-1">Outline Editorial Button</span>
                  <button className="px-6 py-3 bg-transparent border border-[#181716] text-[#181716] font-label-caps text-xs uppercase tracking-widest font-bold hover:bg-[#181716] hover:text-[#FDFBF7] transition-colors">
                    Inspect Loom Breakdown
                  </button>
                </div>
              </div>
            </div>

            {/* Badges & Swatches */}
            <div className="bg-surface-container-low p-space-lg rounded border border-surface-container space-y-4">
              <h3 className="font-label-caps text-xs uppercase text-primary font-bold">Micro-Badges &amp; Swatch Indicators</h3>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-outline font-mono block mb-2">Metadata Badges</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#181716] text-white px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest">
                      Unstitched 4.5m
                    </span>
                    <span className="bg-[#C5A880] text-[#181716] px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest font-bold">
                      100% Pure Boski
                    </span>
                    <span className="bg-[#424D43] text-white px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest">
                      Giza Egyptian
                    </span>
                    <span className="border border-[#EAE5DC] bg-white text-[#5C5852] px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest">
                      120s Double-Ply
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-outline font-mono block mb-2">Textile Weave Swatches</span>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-primary bg-[#FDFBF7] shadow-sm flex items-center justify-center text-[9px] font-bold">Ivory</div>
                    <div className="w-8 h-8 rounded-full border border-gray-300 bg-[#E8E2D5] shadow-sm flex items-center justify-center text-[9px] font-bold">Boski</div>
                    <div className="w-8 h-8 rounded-full border border-gray-300 bg-[#181716] text-white shadow-sm flex items-center justify-center text-[9px] font-bold">Navy</div>
                    <div className="w-8 h-8 rounded-full border border-gray-300 bg-[#424D43] text-white shadow-sm flex items-center justify-center text-[9px] font-bold">Sage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
