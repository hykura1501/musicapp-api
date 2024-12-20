import mongoose from "mongoose";
import "dotenv/config";
export const connect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      dbName: process.env.DB_NAME
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};
