const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    console.log("⏳ Trying to connect MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("😊 MongoDB Connected");

  }
  catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// Nodemon restart ko handle karne ke liye
process.once('SIGUSR2', async () => {
  await mongoose.connection.close();
  console.log("Nodemon restart: MongoDB Connection Closed");
  process.kill(process.pid, 'SIGUSR2');
});

 process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log("App terminated: MongoDB Connection Closed");
    process.exit(0);
  });

module.exports = connectDB;

