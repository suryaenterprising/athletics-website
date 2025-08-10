// routes/auth.js
import express from 'express';
import { signup, login, adminLogin } from '../controllers/authController.js';

const router = express.Router();

// User signup
router.post('/signup', signup);

// User login
router.post('/login', login);

// Admin login (matches frontend: /api/auth/admin/login)
router.post('/admin/login', adminLogin);

export default router;
