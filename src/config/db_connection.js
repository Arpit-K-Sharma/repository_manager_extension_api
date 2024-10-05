import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js"; // Importing config variables

const connectDB = async () => {
    try {
        // Connect to MongoDB without deprecated options
        const conn = await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
            socketTimeoutMS: 45000,        // Set socket timeout to 45 seconds
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process if connection fails
    }
};

// Call the connectDB function to connect to MongoDB
connectDB();

export default mongoose.connection;
