// backend/config.js
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set NODE_ENV to 'development' if not defined
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Validate required variables
if (!process.env.MONGO_URI) {
  throw new Error('❌ MONGO_URI is not defined in environment variables.');
}

// In production, JWT_SECRET must be explicitly set
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('❌ JWT_SECRET must be defined in production.');
}

export const MONGO_URI = process.env.MONGO_URI;

// Use fallback ONLY in non-production environments
export const JWT_SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV !== 'production' ? 'dev_jwt_secret' : undefined);

export const PORT = process.env.PORT || 5000;

// Optionally add NODE_ENV export
export const NODE_ENV = process.env.NODE_ENV || 'development';