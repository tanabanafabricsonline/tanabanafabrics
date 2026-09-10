import React, { useState } from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeItem,
  cartTotal,
  setCurrentView,
  onPlaceOrder,
  isCodEnabled
}) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Lahore');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isOpen) return null;

  const freeShippingThreshold = 3500;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const shippingFee = cartTotal >= freeShippingThreshold ? 0 : 250;
  const totalPayable = cartTotal + shippingFee;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    const orderId = `TB-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemsSummary = cartItems.map(item => `${item.title} (x${item.quantity})`).join(', ');

    const newOrder = {
      id: orderId,
      customerName: customerName.trim(),
      phone: customerPhone.trim(),
      city: `${customerCity.trim()}`,
      address: `${customerAddress.trim()}, ${customerCity.trim()}`,
      items: itemsSummary,
      total: totalPayable,
      paymentMethod: isCodEnabled ? 'Cash on Delivery (COD)' : 'Bank Transfer',
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'Pending'
    };

    if (onPlaceOrder) {
      onPlaceOrder(newOrder);
    }

    setShowCheckoutForm(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    onClose();
  };

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
                {showCheckoutForm ? 'Express Checkout' : `Your Atelier Bag (${cartItems.length})`}
              </h2>
            </div>
            <button 
              onClick={() => { setShowCheckoutForm(false); onClose(); }} 
              className="p-1 rounded text-outline hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Checkout Form View */}
          {showCheckoutForm ? (
            <form onSubmit={handleCheckoutSubmit} className="flex-1 p-space-lg space-y-4 overflow-y-auto bg-white">
              <div className="bg-[#FAF8F5] p-3 rounded border border-[#EAE6DF] space-y-1 text-xs">
                <span className="font-bold text-[#0F382C] uppercase text-[11px] block">Order Summary ({cartItems.length} Suits)</span>
                <p className="text-gray-600 line-clamp-2">{cartItems.map(i => i.title).join(', ')}</p>
                <p className="font-bold text-[#0F382C] text-sm pt-1">Total Payable: Rs. {totalPayable.toLocaleString()}</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  placeholder="e.g. Muhammad Hassan" 
                  className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">WhatsApp / Contact Phone</label>
                <input 
                  type="tel" 
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                  placeholder="e.g. 0300 1234567" 
                  className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">City</label>
                <select 
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs font-bold text-[#0F382C]"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Quetta">Quetta</option>
                  <option value="Sialkot">Sialkot</option>
                  <option value="Gujranwala">Gujranwala</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0F382C] mb-1">Complete Delivery Address</label>
                <textarea 
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  required
                  rows={3}
                  placeholder="House #, Street #, Sector / Area..."
                  className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-xs focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-[#0F382C] text-white font-label-caps text-xs uppercase tracking-widest font-bold hover:bg-[#B8860B] transition-colors shadow-lg cursor-pointer rounded"
                >
                  Confirm &amp; Place Order (Rs. {totalPayable.toLocaleString()})
                </button>
                <button 
                  type="button"
                  onClick={() => setShowCheckoutForm(false)}
                  className="w-full py-2 bg-gray-100 text-gray-700 font-bold text-xs uppercase rounded cursor-pointer"
                >
                  ← Back to Bag
                </button>
              </div>
            </form>
          ) : (
            <>
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
                            <span className="font-price-md text-sm font-bold text-[#0F382C]">
                              Rs. {(item.price * item.quantity).toLocaleString()}
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
                    <span className="font-bold text-[#0F382C]">
                      Rs. {cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between font-label-caps uppercase text-xs">
                    <span className="text-outline">Shipping Nationwide</span>
                    <span className="text-[#B8860B] font-bold">
                      {cartTotal >= freeShippingThreshold ? 'FREE' : 'Rs. 250'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-surface-container-high flex justify-between font-price-lg text-lg font-bold text-[#0F382C]">
                    <span>Total Payable</span>
                    <span>
                      Rs. {totalPayable.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-1 flex items-center justify-center gap-2 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    {isCodEnabled && <span className="bg-[#0F382C] text-white px-2 py-0.5 rounded">COD</span>}
                    <span className="bg-[#931A25] text-white px-2 py-0.5 rounded">JazzCash</span>
                    <span className="bg-[#38A169] text-white px-2 py-0.5 rounded">EasyPaisa</span>
                    <span className="bg-[#2B6CB0] text-white px-2 py-0.5 rounded">Bank Transfer</span>
                  </div>

                  <button 
                    onClick={() => setShowCheckoutForm(true)}
                    className="w-full py-3.5 bg-[#0F382C] text-white font-label-caps text-xs uppercase tracking-widest font-bold hover:bg-[#B8860B] transition-colors shadow-lg text-center cursor-pointer rounded"
                  >
                    Proceed to Order Checkout
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
