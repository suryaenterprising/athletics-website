// backend/routes/athletes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import {
  getAthletes,
  createAthlete,
  updateAthlete,
  deleteAthlete
} from '../controllers/athleteController.js';

import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

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
 * File filter for images
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
 * GET all athletes (public)
 */
router.get('/', getAthletes);

/**
 * POST create athlete (admin only)
 * Accepts 'photo' file field
 */
router.post(
  '/',
  verifyToken,
  requireAdmin,
  upload.single('photo'),
  (req, res, next) => {
    if (req.file) {
      req.body.image = `/uploads/athletes/${req.file.filename}`; // match model's field name
    }
    next();
  },
  createAthlete
);

/**
 * PUT update athlete (admin only)
 */
router.put(
  '/:id',
  verifyToken,
  requireAdmin,
  upload.single('photo'),
  (req, res, next) => {
    if (req.file) {
      req.body.image = `/uploads/athletes/${req.file.filename}`;
    }
    next();
  },
  updateAthlete
);

/**
 * DELETE athlete (admin only)
 */
router.delete('/:id', verifyToken, requireAdmin, deleteAthlete);

export default router;