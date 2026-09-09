import React from 'react';

export default function Homepage({ setCurrentView, addToCart, onQuickView }) {
  const featuredProducts = [
    {
      id: 'pdp-boski',
      title: 'Koh-i-Noor Royal Boski 10-Pound Unstitched Suit',
      category: "MEN'S UNSTITCHED • 4.5M",
      specs: '100% Natural Chinese Spun Silk • Grade A 10lb Fall',
      price: 14850,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmhpUZ5GJ3bNCO-67FTswqbMIsYYYwFmemtr_psiQ9xoubda9R2lnKy8mvVijFlzgFu17g2wbHix6xe83CKlCw88gi1a58uGGCd_aTttWkrv-uZ40camFc5H6WA5G3KUFy5KoQz7ipxrn9GJNrhl6NsuScb68PqX18n2MhDMO5Cd9Y1sxTTannS5h8nXGMC8kJVKkjU6mVLqU8uyFsC1CvsnaTXZljmVykxApvSKJlwCaT7-CUb0y0',
      tag: 'Bestseller'
    },
    {
      id: 'pdp-giza',
      title: 'Sultan Egyptian Giza Latha - Snowy White',
      category: "MEN'S UNSTITCHED • 4.5M",
      specs: '100s Double-Ply Combed Egyptian Cotton • Hard Finish',
      price: 8250,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsARnasjbBY_4qTcJ8dBwd1oqVM03FHo3Pp5hr4TnHXPLM0o8bvIm2Bg_BoTvlAE-ub-RxKaboHa_9iuF3O0W1EDrLHlaDSKWE_hWkGUA1D9HyYR29Pqw-qD1XYxr9EVX09p43mT5DpNzdnRXThAoy6qndtGBNCuxCGXAOkRDAccYtbAq4qCe_M84TC5zFp3m2u1GmUMuCmzCPWSWjaF9HiKTwsNBlLB-w_-Tf4BkAFc3GmCSrOw_j',
      tag: 'Loom Masterpiece'
    },
    {
      id: 'pdp-lawn',
      title: 'Gul-e-Rana Embroidered Lawn & Organza Silk 3-Piece',
      category: "WOMEN'S LUXURY COUTURE",
      specs: 'Fine Mulberry Lawn • Schiffli Neckline • Pure Silk Dupatta',
      price: 18500,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVx5BGIvIB1dIvcoE2Y3iWlzZyTaAW_ph_vvo0MdnKMTfHgu-fQ5aex68kiLdwatU1ILm9unWXUxLK5QSbnFAcRbHfZOSCPr-D7HQYbmepaPKO_AGeTw_Zr4Gcqr-3_Gn0kCUpQSztk-cBogQdyHi1ZisYkqNZt6rQLor-0mP3GWlJz4YDqXAvyOXqzZkJtt6N5obvCsQHsDeGcYsWbtnkVTtqtqriqpA1fqQCnVtxrtkgGQWeTSEC',
      tag: 'Festive Edit'
    },
    {
      id: 'pdp-karandi',
      title: 'Shahjahan Hand-Spun Karandi Khaddar',
      category: "MEN'S UNSTITCHED • 4.5M",
      specs: 'Textured Winter Weave • Natural Organic Fiber Blend',
      price: 9400,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKMz7Xh1r0Eg31Iuk6FDhNOJ6TGn0BKzzq4IoZz9dvwfLxSCSOlKlhYZZs0VJUr8HfPCgFVV-iGsYy67ePrekEsA_HQvuuVxW19RUky-SLojQ5Dljpoa0llrZP1Owcv1j3Jq4Of6nBq65TeFGuuTgxg5vlgmFYWEkpFzb0RXjWPoA93uzS3l_VJ34CnAaQkQEkXGj_lQUWS8T4ZD_WyXNyBCH6O8gJiNVnIMLM3AHpo4G_UBe0EJRW',
      tag: 'Heritage Weave'
    }
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Editorial Hero Section */}
      <section className="relative w-full overflow-hidden bg-surface-container-low">
        <div className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center">
          {/* High-Fashion Editorial Background Image with Scrim */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVx5BGIvIB1dIvcoE2Y3iWlzZyTaAW_ph_vvo0MdnKMTfHgu-fQ5aex68kiLdwatU1ILm9unWXUxLK5QSbnFAcRbHfZOSCPr-D7HQYbmepaPKO_AGeTw_Zr4Gcqr-3_Gn0kCUpQSztk-cBogQdyHi1ZisYkqNZt6rQLor-0mP3GWlJz4YDqXAvyOXqzZkJtt6N5obvCsQHsDeGcYsWbtnkVTtqtqriqpA1fqQCnVtxrtkgGQWeTSEC')` 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-on-background/85 via-on-background/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/70 via-transparent to-on-background/30"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop pt-[100px] pb-space-3xl flex flex-col justify-center">
            <div className="max-w-2xl space-y-space-md">
              <div className="inline-flex items-center gap-space-xs bg-surface-container-lowest/15 backdrop-blur-md px-space-sm py-1 rounded-full w-fit border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse"></span>
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-surface-bright">
                  Heirloom Weaves of Punjab • Edition 2026
                </span>
              </div>
              
              <h1 className="font-display-lg text-4xl sm:text-6xl text-on-primary tracking-tight font-normal leading-[1.08]">
                Tradition,<br/>
                <span className="italic font-normal text-[#C5A880]">Woven Beautifully</span>
              </h1>

              <p className="font-body-lg text-body-lg text-surface-container-high/90 max-w-xl leading-relaxed font-light">
                Archival unstitched textiles crafted with Egyptian combed cotton, pure Chinese mulberry silk, and hand-loomed khaddar. Sartorial dignity tailored by you.
              </p>

              <div className="pt-space-md flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md">
                <button 
                  onClick={() => setCurrentView('collection')}
                  className="inline-flex items-center justify-center px-space-xl py-4 bg-on-primary text-on-background hover:bg-surface-variant transition-colors font-label-caps text-label-caps uppercase tracking-widest text-center shadow-lg group cursor-pointer"
                >
                  <span>Explore Men's Unstitched</span>
                  <span className="material-symbols-outlined ml-2 text-[16px] transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>

                <button 
                  onClick={() => setCurrentView('pdp')}
                  className="inline-flex items-center justify-center px-space-xl py-4 bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest text-center shadow-md group cursor-pointer"
                >
                  <span>Discover Royal Boski PDP</span>
                  <span className="material-symbols-outlined ml-2 text-[16px] transform group-hover:translate-x-1 transition-transform">east</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge Strip */}
        <div className="w-full bg-primary text-on-primary py-space-sm shadow-md border-t border-[#30312E]">
          <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md items-center text-center">
              <div className="flex items-center justify-center gap-space-xs py-1">
                <span className="material-symbols-outlined text-[#C5A880] text-[20px]">verified</span>
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-surface-variant">100% Guaranteed Pure Weaves</span>
              </div>
              <div className="flex items-center justify-center gap-space-xs py-1">
                <span className="material-symbols-outlined text-[#C5A880] text-[20px]">local_shipping</span>
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-surface-variant">Nationwide 48-Hour Dispatch</span>
              </div>
              <div className="flex items-center justify-center gap-space-xs py-1">
                <span className="material-symbols-outlined text-[#C5A880] text-[20px]">storefront</span>
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-surface-variant">Flagship Store Exchanges</span>
              </div>
              <div className="flex items-center justify-center gap-space-xs py-1">
                <span className="material-symbols-outlined text-[#C5A880] text-[20px]">payments</span>
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-surface-variant">Cash on Delivery Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Split Category Spotlight */}
      <section className="w-full py-space-4xl max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="text-center max-w-xl mx-auto mb-space-3xl">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary block mb-space-xs">The Curated Ateliers</span>
          <h2 className="font-display-md text-display-md text-primary font-normal">Woven In Splendor</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Distinctly calibrated weaves crafted for the discerning connoisseur of Pakistani formal wear.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-stretch">
          {/* Men's Sovereign Edit */}
          <div className="lg:col-span-6 flex flex-col bg-surface-container-low rounded-DEFAULT overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-500">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img 
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsARnasjbBY_4qTcJ8dBwd1oqVM03FHo3Pp5hr4TnHXPLM0o8bvIm2Bg_BoTvlAE-ub-RxKaboHa_9iuF3O0W1EDrLHlaDSKWE_hWkGUA1D9HyYR29Pqw-qD1XYxr9EVX09p43mT5DpNzdnRXThAoy6qndtGBNCuxCGXAOkRDAccYtbAq4qCe_M84TC5zFp3m2u1GmUMuCmzCPWSWjaF9HiKTwsNBlLB-w_-Tf4BkAFc3GmCSrOw_j" 
                alt="Men's Unstitched Edit"
              />
              <div className="absolute top-space-md left-space-md bg-primary/80 backdrop-blur-sm text-on-primary px-space-sm py-1 font-label-caps text-label-caps uppercase tracking-widest">
                The Men's Archive
              </div>
            </div>
            <div className="p-space-2xl flex flex-col flex-grow justify-between bg-surface-container-lowest">
              <div className="space-y-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-caps text-label-caps uppercase text-outline tracking-wider">Unstitched 4.5m Cuts</span>
                  <span className="text-outline">•</span>
                  <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">Giza Cotton • Boski</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-primary">The Sovereign Men's Edit</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Timeless ceremonial fabrications including high-twist Giza combed cottons, mercerized snowy latha, and the regal drape of 10-pound pure Chinese mulberry Boski.
                </p>
              </div>
              <div className="pt-space-md">
                <button 
                  onClick={() => setCurrentView('collection')}
                  className="w-full py-3.5 bg-primary text-on-primary hover:bg-[#333] transition-colors font-label-caps text-label-caps uppercase tracking-widest text-center cursor-pointer"
                >
                  View Collection (42 Fabrics)
                </button>
              </div>
            </div>
          </div>

          {/* Women's Luxury Couture */}
          <div className="lg:col-span-6 flex flex-col bg-surface-container-low rounded-DEFAULT overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-500">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img 
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVx5BGIvIB1dIvcoE2Y3iWlzZyTaAW_ph_vvo0MdnKMTfHgu-fQ5aex68kiLdwatU1ILm9unWXUxLK5QSbnFAcRbHfZOSCPr-D7HQYbmepaPKO_AGeTw_Zr4Gcqr-3_Gn0kCUpQSztk-cBogQdyHi1ZisYkqNZt6rQLor-0mP3GWlJz4YDqXAvyOXqzZkJtt6N5obvCsQHsDeGcYsWbtnkVTtqtqriqpA1fqQCnVtxrtkgGQWeTSEC" 
                alt="Women's Luxury Couture"
              />
              <div className="absolute top-space-md left-space-md bg-secondary/90 backdrop-blur-sm text-on-secondary px-space-sm py-1 font-label-caps text-label-caps uppercase tracking-widest">
                Festive Lawn &amp; Silk
              </div>
            </div>
            <div className="p-space-2xl flex flex-col flex-grow justify-between bg-surface-container-lowest">
              <div className="space-y-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-caps text-label-caps uppercase text-outline tracking-wider">Unstitched 3-Piece</span>
                  <span className="text-outline">•</span>
                  <span className="font-label-caps text-label-caps uppercase text-secondary font-semibold">Schiffli • Organza</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-primary">Women's Luxury Archive</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Artisanal 3-piece ensembles featuring delicate Swiss voile embroideries, pure mulberry silk dupattas, and heavy chikankari panels designed for festive occasions.
                </p>
              </div>
              <div className="pt-space-md">
                <button 
                  onClick={() => setCurrentView('collection')}
                  className="w-full py-3.5 bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest text-center cursor-pointer"
                >
                  Explore Women's Atelier
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="w-full py-space-3xl bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-space-2xl gap-space-md">
            <div>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary block mb-1">
                Hand-Selected Loom Treasures
              </span>
              <h2 className="font-display-md text-display-md text-primary font-normal">
                Featured Unstitched Editions
              </h2>
            </div>
            <button 
              onClick={() => setCurrentView('collection')}
              className="font-label-caps text-label-caps uppercase text-primary border-b border-primary pb-0.5 hover:text-secondary hover:border-secondary transition-colors tracking-widest cursor-pointer"
            >
              Browse All Masterpieces &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-surface-container-lowest flex flex-col group border border-outline-variant/40 hover:border-primary transition-all duration-300">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-on-primary font-label-caps text-[10px] uppercase tracking-widest px-2 py-0.5">
                    {product.tag}
                  </span>
                  
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => setCurrentView('pdp')}
                      className="bg-surface/90 text-primary hover:bg-primary hover:text-on-primary text-xs font-label-caps uppercase tracking-widest px-3 py-2 transition-colors shadow-md cursor-pointer"
                    >
                      View PDP
                    </button>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-primary text-on-primary hover:bg-secondary text-xs font-label-caps uppercase tracking-widest px-3 py-2 transition-colors shadow-md cursor-pointer"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>

                <div className="p-space-md flex flex-col flex-grow justify-between space-y-space-xs">
                  <div>
                    <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider block">
                      {product.category}
                    </span>
                    <h4 
                      onClick={() => setCurrentView('pdp')}
                      className="font-headline-sm text-base text-primary font-medium hover:text-secondary cursor-pointer transition-colors mt-1 line-clamp-1"
                    >
                      {product.title}
                    </h4>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 line-clamp-1">
                      {product.specs}
                    </p>
                  </div>

                  <div className="pt-space-xs flex items-center justify-between border-t border-surface-container">
                    <span className="font-price-md text-price-md text-primary font-semibold">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <span className="font-label-caps text-[10px] text-secondary uppercase font-semibold">
                      In Stock
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loom Craftsmanship Story */}
      <section className="w-full py-space-4xl bg-primary text-on-primary">
        <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
            <div className="lg:col-span-6 space-y-space-md">
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed block">
                The Heritage Loom Code
              </span>
              <h2 className="font-display-md text-3xl sm:text-5xl text-on-primary font-normal leading-tight">
                Authentic Spun Boski &amp; Calibrated Thread Count
              </h2>
              <p className="font-body-lg text-body-lg text-surface-container-high/90 leading-relaxed font-light">
                In an era of synthetic blends, Tanabana adheres strictly to archival pure weaves. Our flagship 10-Pound Boski is crafted from pure Chinese mulberry cocoon filaments, slow-spun on traditional shuttles to ensure substantial weight, wrinkle resistance, and a matte luster that deepens with every wash.
              </p>
              
              <div className="grid grid-cols-2 gap-space-md pt-space-sm border-t border-white/10">
                <div>
                  <span className="font-display-md text-2xl text-secondary-fixed">120s Double-Ply</span>
                  <p className="font-label-caps text-xs text-surface-variant uppercase mt-1">High-Twist Warp Density</p>
                </div>
                <div>
                  <span className="font-display-md text-2xl text-secondary-fixed">10-Pound Fall</span>
                  <p className="font-label-caps text-xs text-surface-variant uppercase mt-1">Regal Heavy Suit Fall</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] bg-white/5 border border-white/10 rounded overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHYXgG6C7hfWMHorrrilBMqqA8o4JPmtFTF6pFmm39sR0qaMHxc83skaC3oNfLMy3Y7oella_Hq6PV6CTDi3aL3JU5huCFi9s8-EYCG5sjgD7hcoK8-3OEuucu9W57POxRBjHG0r8quo0gJ-HUpLAzNJM8fB-u_IuTK6l3DxIzMfGPEiqX3t_-HECSvHI8fLDirCLhj8mE_uvc5c_DfCXah1GZU7btVratzJ54TNlGdJxXMQXW3ehc" 
                  alt="Macro Boski Weave Close-up"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded font-label-caps text-[10px] text-secondary-fixed uppercase tracking-widest border border-white/20">
                  Micro Weave Magnification (200x)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
