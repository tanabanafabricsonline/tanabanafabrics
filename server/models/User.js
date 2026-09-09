const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  label: { type: String, default: 'Home' },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine: { type: String, required: true },
  city: { type: String, required: true, default: 'Lahore' },
  province: { type: String, required: true, default: 'Punjab' },
  postalCode: { type: String },
  isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    avatar: { type: String },
    addresses: [addressSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
