// config.js
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Validate required variables
if (!process.env.MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in environment variables.");
}

export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret'; // Development fallback
export const PORT = process.env.PORT || 5000;
