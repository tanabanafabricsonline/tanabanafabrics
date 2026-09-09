const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/collections', require('./routes/collectionRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));
app.use('/api', require('./routes/contactRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Tanabana Fabrics Server API',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.send('Tanabana Fabrics Luxury E-Commerce Server is running.');
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Tanabana Fabrics Node.js Backend Server running on port ${PORT}`);
});
