const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// POST /api/orders/checkout (Public / Authenticated COD Checkout)
router.post('/checkout', async (req, res) => {
  try {
    const { items, customerInformation, shippingAddress, couponCode, paymentMethod = 'COD' } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Cart items are required.' });
    }
    if (!customerInformation || !shippingAddress) {
      return res.status(400).json({ success: false, message: 'Customer information and shipping address are required.' });
    }

    let subtotal = 0;
    const validatedItems = [];

    // Server-side validation of stock and prices directly from MongoDB
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || !product.isActive) {
        return res.status(404).json({ success: false, message: `Product "${item.name || 'Item'}" is no longer available.` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Only ${product.stock} available.`
        });
      }

      const itemPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price;
      subtotal += itemPrice * item.quantity;

      validatedItems.push({
        product: product._id,
        name: product.name,
        sku: product.sku || 'SKU-GEN',
        price: itemPrice,
        quantity: item.quantity,
        image: product.images[0] || '',
        color: item.color || product.color,
        size: item.size
      });
    }

    // Coupon discount calculation
    let discount = 0;
    let appliedCoupon = null;

    if (couponCode) {
      const couponDoc = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true
      });

      if (couponDoc && (!couponDoc.expiryDate || new Date(couponDoc.expiryDate) > new Date())) {
        if (subtotal >= couponDoc.minimumOrder) {
          if (couponDoc.discountType === 'percentage') {
            discount = (subtotal * couponDoc.discountValue) / 100;
            if (couponDoc.maximumDiscount && discount > couponDoc.maximumDiscount) {
              discount = couponDoc.maximumDiscount;
            }
          } else {
            discount = couponDoc.discountValue;
          }
          appliedCoupon = couponDoc._id;

          // Increment usage count
          couponDoc.usedCount += 1;
          await couponDoc.save();
        }
      }
    }

    const shippingFee = subtotal >= 3500 ? 0 : 250;
    const total = Math.max(0, subtotal - discount + shippingFee);

    const orderNumber = `TB-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await Order.create({
      orderNumber,
      user: req.user ? req.user._id : undefined,
      items: validatedItems,
      customerInformation,
      shippingAddress,
      subtotal,
      discount,
      shippingFee,
      total,
      coupon: appliedCoupon,
      paymentMethod,
      paymentStatus: 'Pending',
      orderStatus: 'Pending'
    });

    // Reduce inventory stock in MongoDB
    for (const item of validatedItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/my-orders (Customer Protected)
router.get('/my-orders', requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin GET /api/orders (Admin Only)
router.get('/admin/all', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) query.orderStatus = status;
    if (search) {
      query.$or = [
        { orderNumber: new RegExp(search, 'i') },
        { 'customerInformation.name': new RegExp(search, 'i') },
        { 'customerInformation.email': new RegExp(search, 'i') },
        { 'customerInformation.phone': new RegExp(search, 'i') }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin PUT /api/orders/:id/status (Admin Only)
router.put('/admin/:id/status', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const update = {};
    if (orderStatus) update.orderStatus = orderStatus;
    if (paymentStatus) update.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
