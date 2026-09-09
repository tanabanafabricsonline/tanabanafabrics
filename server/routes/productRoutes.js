const express = require('express');
const Product = require('../models/Product');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/products (Filtering, Sorting, Pagination, Search)
router.get('/', async (req, res) => {
  try {
    const {
      category,
      gender,
      collection,
      fabric,
      color,
      minPrice,
      maxPrice,
      featured,
      newArrival,
      search,
      sort = 'newest',
      page = 1,
      limit = 12
    } = req.query;

    const query = { isActive: true };

    if (category) query.category = new RegExp(`^${category}$`, 'i');
    if (gender) query.gender = gender.toLowerCase();
    if (collection) query.collectionName = new RegExp(`^${collection}$`, 'i');
    if (fabric) query.fabric = new RegExp(fabric, 'i');
    if (color) query.color = new RegExp(color, 'i');
    if (featured === 'true') query.featured = true;
    if (newArrival === 'true') query.newArrival = true;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { sku: new RegExp(search, 'i') },
        { category: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') }
      ];
    }

    let sortOptions = {};
    if (sort === 'newest') sortOptions = { createdAt: -1 };
    else if (sort === 'price-low-high') sortOptions = { price: 1 };
    else if (sort === 'price-high-low') sortOptions = { price: -1 };
    else if (sort === 'popular') sortOptions = { featured: -1, createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: products,
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

// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/products (Admin Only)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/products/:id (Admin Only)
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/products/:id (Admin Only)
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
