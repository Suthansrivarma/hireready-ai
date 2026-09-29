const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hireready_ai', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`[MongoDB] Connection Error: ${error.message}`);
    console.warn('[MongoDB] Running with standard fallback/mock persistence if DB is unavailable.');
    return false;
  }
};

module.exports = connectDB;
