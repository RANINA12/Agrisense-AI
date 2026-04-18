const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("bufferCommands", false); // 🔥 important

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // 🔥 stop server if DB fails
  }
};

module.exports = connectDB;