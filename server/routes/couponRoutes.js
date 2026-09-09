const express = require('express');
const Coupon = require('../models/Coupon');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// POST /api/coupons/validate (Public)
router.post('/validate', async (req, res) => {
  try {
    const { code, subtotal } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code is required.' });
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or inactive coupon code.' });
    }

    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ success: false, message: 'This coupon has expired.' });
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: 'Coupon usage limit reached.' });
    }

    if (subtotal && subtotal < coupon.minimumOrder) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount of Rs. ${coupon.minimumOrder.toLocaleString()} required for this coupon.`
      });
    }

    res.json({
      success: true,
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        maximumDiscount: coupon.maximumDiscount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/coupons (Admin Only)
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/coupons (Admin Only)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
