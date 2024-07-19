import mongoose from "mongoose";
import { ENV_VARS } from "./config_env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB");
    process.exit(1); // 1 means error, 0 means success
  }
};
