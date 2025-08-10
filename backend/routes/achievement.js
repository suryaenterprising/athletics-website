import express from 'express';
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement
} from '../controllers/achievementController.js';

import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to fetch achievements
router.get('/', getAchievements);

// Admin routes for CRUD operations
router.post('/', verifyToken, requireAdmin, createAchievement);
router.put('/:id', verifyToken, requireAdmin, updateAchievement);
router.delete('/:id', verifyToken, requireAdmin, deleteAchievement);

export default router;