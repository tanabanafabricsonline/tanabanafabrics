const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  color: { type: String },
  size: { type: String },
  image: { type: String }
});

const shippingAddressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String }
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerInformation: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      name: { type: String, required: true }
    },
    items: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    paymentMethod: { type: String, enum: ['COD', 'Card', 'BankTransfer'], default: 'COD' },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    notes: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
