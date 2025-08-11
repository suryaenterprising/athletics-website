// routes/athletes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Athlete from '../models/Athlete.js';

const router = express.Router();

/**
 * Ensure uploads directory exists
 */
const uploadDir = path.join(process.cwd(), 'uploads', 'athletes');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Multer storage configuration
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

/**
 * File filter to allow only images
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype.toLowerCase();
  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

/**
 * Add athlete
 */
router.post('/add', upload.single('photo'), async (req, res) => {
  try {
    const { name, sport, achievements } = req.body;
    if (!name || !sport) {
      return res.status(400).json({ success: false, message: 'Name and sport are required' });
    }

    const newAthlete = new Athlete({
      name,
      sport,
      achievements,
      photo: req.file ? `/uploads/athletes/${req.file.filename}` : null
    });

    await newAthlete.save();
    res.status(201).json({ success: true, athlete: newAthlete });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * Edit athlete
 */
router.put('/edit/:id', upload.single('photo'), async (req, res) => {
  try {
    const { name, sport, achievements } = req.body;
    const updateData = { name, sport, achievements };

    if (req.file) {
      updateData.photo = `/uploads/athletes/${req.file.filename}`;
    }

    const athlete = await Athlete.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!athlete) {
      return res.status(404).json({ success: false, message: 'Athlete not found' });
    }

    res.json({ success: true, athlete });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * Get all athletes
 */
router.get('/', async (req, res) => {
  try {
    const athletes = await Athlete.find();
    res.json({ success: true, athletes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
