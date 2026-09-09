const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Collection || mongoose.model('Collection', collectionSchema);
