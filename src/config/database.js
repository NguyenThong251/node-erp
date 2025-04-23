import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://thongs2501:sziiJCtU1l4oKM8F@erp.rb2irbt.mongodb.net/?retryWrites=true&w=majority&appName=ERP"
    );
    // ("mongodb+srv://thongs2501:sziiJCtU1l4oKM8F@cluster0.h9jyetp.mongodb.net/?retryWrites=true&w=majority&appName=ERP");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
