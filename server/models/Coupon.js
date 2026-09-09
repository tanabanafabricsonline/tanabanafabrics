const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: { type: Number, required: true, min: 0 },
    minimumOrder: { type: Number, default: 0 },
    maximumDiscount: { type: Number },
    usageLimit: { type: Number, default: 100 },
    usedCount: { type: Number, default: 0 },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
