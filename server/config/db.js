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
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Atlas DB Connection Error: ${error.message}`);
    
    // Attempt local fallback if MongoDB service is running locally
    try {
      const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/tanabanafabrics', {
        serverSelectionTimeoutMS: 2000
      });
      console.log(`🍃 Connected to Local Fallback DB: ${localConn.connection.host}`);
    } catch (localErr) {
      console.log('⚠️ Running Server in Standalone Mode. Please whitelist your IP on MongoDB Atlas (0.0.0.0/0) to enable online database syncing.');
    }
  }
};

module.exports = connectDB;
