const express = require('express');
const Category = require('../models/Category');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/categories (Admin)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
