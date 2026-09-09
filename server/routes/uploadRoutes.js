const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { requireAuth, requireAdmin } = require('../middleware/auth');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'tanabana',
  api_key: process.env.CLOUDINARY_API_KEY || '123456789',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'secret'
});

// Configure Multer in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// @route   POST /api/upload
// @desc    Upload image to Cloudinary (or fallback)
// @access  Private/Admin
router.post('/', requireAuth, requireAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    // Check if Cloudinary is configured with valid credentials
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'tanabana') {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'tanabana_products'
      });

      return res.json({ url: result.secure_url, public_id: result.public_id });
    } else {
      // Fallback data URL for dev/testing environment
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      return res.json({ url: dataURI, note: 'Cloudinary credentials not set in server/.env, using Data URI fallback' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
