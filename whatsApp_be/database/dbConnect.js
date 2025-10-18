import mongoose from "mongoose";
import config from "../config.js";

const dbConnect = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(config.DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully at:", new Date());
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

export default dbConnect;
