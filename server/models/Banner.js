const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    image: { type: String, required: true },
    buttonText: { type: String, default: 'Shop Now' },
    buttonLink: { type: String, default: '/catalog' },
    position: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
