const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// @route   POST /api/contact
// @desc    Submit contact message
// @access  Public
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const contact = await ContactMessage.create({ name, email, phone, subject, message });
    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/contact/messages (Admin)
router.get('/contact/messages', requireAuth, requireAdmin, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email is already subscribed' });
    }

    await NewsletterSubscriber.create({ email });
    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
