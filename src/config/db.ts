import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING ||
        "Error: No connection string provided"
    );
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};