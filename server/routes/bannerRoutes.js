const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// @route   GET /api/banners
// @desc    Get active banners
// @access  Public
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ position: 1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/banners/admin/all
// @desc    Get all banners (Admin)
// @access  Private/Admin
router.get('/admin/all', requireAuth, requireAdmin, async (req, res) => {
  try {
    const banners = await Banner.find().sort({ position: 1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/banners
// @desc    Create banner (Admin)
// @access  Private/Admin
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/banners/:id
// @desc    Update banner (Admin)
// @access  Private/Admin
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/banners/:id
// @desc    Delete banner (Admin)
// @access  Private/Admin
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
