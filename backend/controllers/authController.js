const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
const { username, password } = req.body;

try {
const admin = await Admin.findOne({ username });
if (!admin) return res.status(401).json({ message: 'Invalid username or password' });

pgsql

const isMatch = await bcrypt.compare(password, admin.password);
if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
res.json({ token });
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};

exports.createAdmin = async (req, res) => {
const { username, password } = req.body;
try {
const hashed = await bcrypt.hash(password, 10);
const newAdmin = new Admin({ username, password: hashed });
await newAdmin.save();
res.status(201).json({ message: 'Admin created' });
} catch (err) {
res.status(500).json({ message: 'Failed to create admin' });
}
};