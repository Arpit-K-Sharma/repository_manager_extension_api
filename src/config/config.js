import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 5000;
