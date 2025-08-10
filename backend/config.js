// config.js
import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
export const PORT = process.env.PORT || 5000;