const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['New', 'Read', 'Replied'], default: 'New' }
  },
  { timestamps: true }
);

module.exports = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);
