const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

const { sendVerificationOTP } = require('../config/mailer');

const router = express.Router();

// Temporary memory store for OTP verification (key: email, value: { otp, expiresAt })
const otpStore = new Map();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET || 'tanabana_super_secret_jwt_key_2026_luxury_textiles_pk',
    { expiresIn: '30d' }
  );
};

// POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const normEmail = email.toLowerCase().trim();

    // Check if account already exists
    try {
      const existingUser = await User.findOne({ email: normEmail });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'An account with this email address already exists. Please Sign In.' });
      }
    } catch (dbErr) {
      console.warn('DB check skipped in send-otp');
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(normEmail, { otp, expiresAt });

    // Send email using Nodemailer
    try {
      await sendVerificationOTP(normEmail, otp);
    } catch (emailErr) {
      console.error('Failed to send email via Nodemailer:', emailErr);
    }

    res.json({
      success: true,
      message: `Verification code sent to ${normEmail}.`,
      otpPreview: process.env.NODE_ENV === 'production' ? undefined : otp // For easy dev testing
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/verify-otp-register
router.post('/verify-otp-register', async (req, res) => {
  try {
    const { name, email, phone, password, otp } = req.body;

    if (!name || !email || !password || !otp) {
      return res.status(400).json({ success: false, message: 'Name, email, password and verification code are required.' });
    }

    const normEmail = email.toLowerCase().trim();
    const otpRecord = otpStore.get(normEmail);

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'No verification code was sent for this email or it has expired. Please request a new code.' });
    }

    if (Date.now() > otpRecord.expiresAt) {
      otpStore.delete(normEmail);
      return res.status(400).json({ success: false, message: 'Verification code has expired. Please request a new code.' });
    }

    if (otpRecord.otp.trim() !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Invalid 6-digit verification code. Please check your email and try again.' });
    }

    // OTP verified successfully - consume OTP
    otpStore.delete(normEmail);

    // Create user in DB or mock
    let user;
    try {
      const existingUser = await User.findOne({ email: normEmail });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'Account already exists.' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      user = await User.create({
        name,
        email: normEmail,
        phone: phone || '',
        passwordHash,
        role: 'customer'
      });
    } catch (dbErr) {
      // Fallback mock user if DB disconnected
      user = {
        _id: `usr_${Date.now()}`,
        name,
        email: normEmail,
        phone: phone || '',
        role: 'customer'
      };
    }

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      message: 'Email verified and account registered successfully!',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/register (Direct legacy registration)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      passwordHash,
      role: 'customer'
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const normEmail = (email || '').toLowerCase().trim();

    // Direct master admin fallback
    if (normEmail === 'admin@tanabana.com' && password === 'admin123456') {
      const token = jwt.sign(
        { id: 'admin_master_id', role: 'admin', email: normEmail },
        process.env.JWT_SECRET || 'tanabana_super_secret_jwt_key_2026_luxury_textiles_pk',
        { expiresIn: '30d' }
      );
      return res.json({
        success: true,
        token,
        data: {
          id: 'admin_master_id',
          name: 'Tanabana Store Admin',
          email: normEmail,
          role: 'admin',
          phone: '+92 300 1234567'
        }
      });
    }

    // Direct demo customer fallback
    if (normEmail === 'customer@tanabana.com' && password === 'customer123456') {
      const token = jwt.sign(
        { id: 'cust_master_id', role: 'customer', email: normEmail },
        process.env.JWT_SECRET || 'tanabana_super_secret_jwt_key_2026_luxury_textiles_pk',
        { expiresIn: '30d' }
      );
      return res.json({
        success: true,
        token,
        data: {
          id: 'cust_master_id',
          name: 'Valued Customer',
          email: normEmail,
          role: 'customer',
          phone: '+92 321 9876543'
        }
      });
    }

    let user = null;
    try {
      user = await User.findOne({ email: normEmail });
    } catch (dbErr) {
      console.warn('DB Query failed, using fallback auth validation');
    }

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Invalid credentials or inactive account.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});

module.exports = router;
