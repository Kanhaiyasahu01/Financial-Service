import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing");
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Error connecting to MongoDB");
        console.error(err.message);
        throw err;
    }
}