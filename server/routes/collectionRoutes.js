const express = require('express');
const Collection = require('../models/Collection');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/collections
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: collections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/collections (Admin)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const collection = await Collection.create(req.body);
    res.status(201).json({ success: true, data: collection });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
