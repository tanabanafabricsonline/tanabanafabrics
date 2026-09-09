const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    image: { type: String },
    gender: { type: String, enum: ['Women', 'Men', 'Unisex'], default: 'Women' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
