// controllers/authController.js
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
 * @desc    Signup for user or admin
 * @route   POST /api/auth/signup
 * @access  Public
 */
export const signup = async (req, res) => {
  const { email, adminId, password, role } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  if (role === 'admin') {
    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required for admin signup' });
    }
  } else if (role === 'user') {
    if (!email) {
      return res.status(400).json({ message: 'Email is required for user signup' });
    }
  }

  // Check if a user with same email or adminId already exists
  const existing = await User.findOne({
    $or: [
      ...(email ? [{ email: email.toLowerCase() }] : []),
      ...(adminId ? [{ adminId }] : [])
    ]
  });

  if (existing) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    email: email ? email.toLowerCase() : undefined,
    adminId,
    passwordHash,
    role
  });

  await user.save();

  res.status(201).json({
    message: `${role} created successfully`,
    token: generateToken(user),
    role: user.role
  });
};

/**
 * @desc    Login for regular user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase(), role: 'user' });
  if (!user || !(await user.isValidPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({ token: generateToken(user), role: user.role });
};

/**
 * @desc    Login for admin
 * @route   POST /api/auth/admin/login
 * @access  Public
 */
export const adminLogin = async (req, res) => {
  const { adminId, password } = req.body;

  if (!adminId || !password) {
    return res.status(400).json({ message: 'Admin ID and password are required' });
  }

  const admin = await User.findOne({ adminId, role: 'admin' });
  if (!admin || !(await admin.isValidPassword(password))) {
    return res.status(401).json({ message: 'Invalid admin ID or password' });
  }

  res.json({ token: generateToken(admin), role: admin.role });
};
