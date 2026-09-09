const mongoose = require('mongoose');
const dns = require('dns');

// Set DNS servers to resolve MongoDB Atlas SRV records reliably on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore DNS set errors if restricted
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    // Non-fatal fallback for development if database is unreachable
  }
};

module.exports = connectDB;
