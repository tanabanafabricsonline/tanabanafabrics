const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// @route   GET /api/reviews/product/:productId
// @desc    Get approved reviews for a product
// @access  Public
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      isApproved: true
    }).populate('user', 'name').sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/reviews
// @desc    Submit a review for a product
// @access  Private
router.post('/', requireAuth, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ message: 'Product, rating, and comment are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({ product: productId, user: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      rating: Number(rating),
      comment,
      isApproved: true // Auto-approve or queue for moderation
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/reviews/admin/all
// @desc    Get all reviews (Admin)
// @access  Private/Admin
router.get('/admin/all', requireAuth, requireAdmin, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('product', 'name slug images')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PATCH /api/reviews/admin/:id/approve
// @desc    Approve/Unapprove review
// @access  Private/Admin
router.patch('/admin/:id/approve', requireAuth, requireAdmin, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.isApproved = !review.isApproved;
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/reviews/admin/:id
// @desc    Delete review
// @access  Private/Admin
router.delete('/admin/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
