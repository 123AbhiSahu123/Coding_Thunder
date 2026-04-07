const mongoose = require("mongoose");
const path = require("path");
 require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const connectDB = async () => {
  try {
     console.log("⏳ Trying to connect MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("😊 MongoDB Connected");
    
  }
  catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }

};

module.exports = connectDB;

