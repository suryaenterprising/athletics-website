import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

/**
 * Utility to generate a JWT
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '6h' }
  );
};

/**
 * @desc Signup for user or admin
 * @route POST /api/auth/signup
 * @access Public
 */
export const signup = async (req, res) => {
  try {
    let { email, adminId, password, role } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    if (role === 'admin') {
      if (!adminId) {
        return res.status(400).json({ success: false, message: 'Admin ID is required for admin signup' });
      }
    } else {
      if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required for user signup' });
      }
    }

    email = email?.trim().toLowerCase();
    adminId = adminId?.trim();

    // Check for existing account
    const existing = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(adminId ? [{ adminId }] : [])
      ]
    });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      email: email || undefined,
      adminId: adminId || undefined,
      passwordHash,
      role: role.toLowerCase()
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: `${role} created successfully`,
      token: generateToken(user),
      role: user.role
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
};

/**
 * @desc Login for regular user
 * @route POST /api/auth/login
 * @access Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase(), role: 'user' });
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({ success: true, token: generateToken(user), role: user.role });
  } catch (err) {
    console.error('User login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

/**
 * @desc Login for admin
 * @route POST /api/auth/admin/login
 * @access Public
 */
export const adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    if (!adminId || !password) {
      return res.status(400).json({ success: false, message: 'Admin ID and password are required' });
    }

    const admin = await User.findOne({ adminId: adminId.trim(), role: 'admin' });
    if (!admin || !(await admin.isValidPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid admin ID or password' });
    }

    res.json({ success: true, token: generateToken(admin), role: admin.role });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ success: false, message: 'Server error during admin login' });
  }
};