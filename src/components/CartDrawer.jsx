import React from 'react';

export default function CartDrawer({ isOpen, onClose, cartItems, updateQuantity, removeItem, cartTotal, currency, setCurrentView }) {
  if (!isOpen) return null;

  const freeShippingThreshold = 3500;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-space-lg border-b border-surface-container flex items-center justify-between bg-surface-container-low">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>
              <h2 className="font-headline-sm text-lg font-bold text-primary uppercase tracking-wide">
                Your Atelier Bag ({cartItems.length})
              </h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-1 rounded text-outline hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Complimentary Delivery Progress Bar */}
          <div className="bg-primary text-on-primary p-space-sm font-label-caps text-xs">
            <div className="flex justify-between mb-1">
              <span>
                {cartTotal >= freeShippingThreshold 
                  ? '🎉 You unlocked Complimentary Express Delivery!' 
                  : `Add Rs. ${(freeShippingThreshold - cartTotal).toLocaleString()} for Free Delivery`}
              </span>
              <span>{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary-fixed transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-space-lg space-y-space-md divide-y divide-surface-container">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <span className="material-symbols-outlined text-6xl text-outline-variant">shopping_bag</span>
                <p className="font-headline-sm text-lg text-primary">Your atelier bag is currently empty</p>
                <p className="font-body-sm text-xs text-on-surface-variant max-w-xs mx-auto">
                  Explore our luxury unstitched Pakistani weaves and Giza cotton collections.
                </p>
                <button 
                  onClick={() => { onClose(); setCurrentView('collection'); }}
                  className="px-6 py-3 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-widest font-bold hover:bg-secondary transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="pt-space-md first:pt-0 flex gap-space-md items-start">
                  <img src={item.image} alt={item.title} className="w-20 aspect-[3/4] object-cover rounded bg-surface-container" />
                  <div className="flex-1 space-y-1">
                    <span className="font-label-caps text-[9px] text-secondary uppercase font-bold">{item.category}</span>
                    <h4 className="font-headline-sm text-sm font-medium text-primary line-clamp-1">{item.title}</h4>
                    {item.options && <p className="text-[11px] text-outline">{item.options}</p>}
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-surface-container-high rounded text-xs">
                        <button 
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                          className="px-2 py-0.5 text-primary font-bold hover:bg-surface-container cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-0.5 text-primary font-bold hover:bg-surface-container cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-price-md text-sm font-bold text-primary">
                          {currency === 'PKR' ? `Rs. ${(item.price * item.quantity).toLocaleString()}` : `$ ${((item.price * item.quantity) / 278).toFixed(0)}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeItem(idx)} 
                    className="text-outline hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-space-lg border-t border-surface-container bg-surface-container-low space-y-space-sm">
              <div className="flex justify-between font-label-caps uppercase text-xs">
                <span className="text-outline">Subtotal</span>
                <span className="font-bold text-primary">
                  {currency === 'PKR' ? `Rs. ${cartTotal.toLocaleString()}` : `$ ${(cartTotal / 278).toFixed(0)}`}
                </span>
              </div>
              <div className="flex justify-between font-label-caps uppercase text-xs">
                <span className="text-outline">Shipping</span>
                <span className="text-secondary font-bold">
                  {cartTotal >= freeShippingThreshold ? 'FREE' : 'Rs. 250'}
                </span>
              </div>

              <div className="pt-2 border-t border-surface-container-high flex justify-between font-price-lg text-lg font-bold text-primary">
                <span>Total Due</span>
                <span>
                  {currency === 'PKR' ? `Rs. ${(cartTotal + (cartTotal >= freeShippingThreshold ? 0 : 250)).toLocaleString()}` : `$ ${((cartTotal + (cartTotal >= freeShippingThreshold ? 0 : 250)) / 278).toFixed(0)}`}
                </span>
              </div>

              <button 
                onClick={() => alert('Order Placed Successfully! Thank you for choosing Tanabana Fabrics.')}
                className="w-full py-4 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-widest font-bold hover:bg-secondary transition-colors shadow-lg text-center cursor-pointer"
              >
                Proceed To Secure Checkout (COD Available)
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
