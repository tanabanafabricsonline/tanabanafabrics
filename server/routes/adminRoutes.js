const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// @route   GET /api/admin/dashboard
// @desc    Get dashboard metrics & analytics
// @access  Private/Admin
router.get('/dashboard', requireAuth, requireAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalProducts = await Product.countDocuments();

    // Total Revenue calculation from delivered / non-cancelled orders
    const revenueResult = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'Cancelled' } } },
      { $group: { _id: null, totalSales: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalSales : 0;

    // Low stock items (stock <= 5)
    const lowStockItems = await Product.find({ stock: { $lte: 5 }, isActive: true })
      .select('name sku stock price images category')
      .limit(10);

    // Recent 5 orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    // Order status counts
    const pendingOrders = await Order.countDocuments({ orderStatus: 'Pending' });
    const processingOrders = await Order.countDocuments({ orderStatus: 'Processing' });
    const shippedOrders = await Order.countDocuments({ orderStatus: 'Shipped' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'Delivered' });

    res.json({
      metrics: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        totalProducts,
        pendingOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
      },
      lowStockItems,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
