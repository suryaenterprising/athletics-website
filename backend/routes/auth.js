// backend/routes/auth.js
import express from 'express';

// Controllers
import { signup, login, adminLogin } from '../controllers/authController.js';

// Utility wrapper to avoid repetitive try/catch blocks
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user or admin
 * @access  Public
 */
router.post('/signup', asyncHandler(signup));

/**
 * @route   POST /api/auth/login
 * @desc    Login for regular users
 * @access  Public
 */
router.post('/login', asyncHandler(login));

/**
 * @route   POST /api/auth/admin/login
 * @desc    Login for admin users
 * @access  Public (credentials verify admin role)
 */
router.post('/admin/login', asyncHandler(adminLogin));

export default router;