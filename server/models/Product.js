const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, trim: true },
    collectionName: { type: String, trim: true },
    gender: { type: String, enum: ['Women', 'Men', 'Unisex'], default: 'Women' },
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    sku: { type: String, required: true, unique: true, trim: true },
    fabric: { type: String, trim: true },
    color: { type: String, trim: true },
    colors: [{ type: String }],
    sizes: [{ type: String }],
    stock: { type: Number, required: true, default: 0, min: 0 },
    images: [{ type: String, required: true }],
    featured: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    tags: [{ type: String }],
    seo: {
      title: String,
      description: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
