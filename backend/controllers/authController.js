import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// Signup for user or admin
export const signup = async (req, res) => {
  try {
    const { email, adminId, password, role } = req.body;

    if (role === 'admin' && !adminId) {
      return res.status(400).json({ message: 'Admin ID is required for admin signup' });
    }

    if (role === 'user' && !email) {
      return res.status(400).json({ message: 'Email is required for user signup' });
    }

    const existing = await User.findOne({ $or: [{ email }, { adminId }] });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ email, adminId, passwordHash, role });
    await user.save();

    res.status(201).json({ message: `${role} created successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: 'user' });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const validPass = await user.isValidPassword(password);
    if (!validPass) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '6h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    const admin = await User.findOne({ adminId, role: 'admin' });
    if (!admin) return res.status(401).json({ message: 'Invalid admin ID or password' });

    const validPass = await admin.isValidPassword(password);
    if (!validPass) return res.status(401).json({ message: 'Invalid admin ID or password' });

    const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: '6h' });
    res.json({ token, role: admin.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
