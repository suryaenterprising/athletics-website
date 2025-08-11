// routes/achievement.js
import express from 'express';
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement
} from '../controllers/achievementController.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/achievements
 * @desc    Fetch all achievements
 * @access  Public
 */
router.get('/', getAchievements);

/**
 * @route   POST /api/achievements
 * @desc    Create a new achievement
 * @access  Admin
 */
router.post('/', verifyToken, requireAdmin, createAchievement);

/**
 * @route   PUT /api/achievements/:id
 * @desc    Update an achievement by ID
 * @access  Admin
 */
router.put('/:id', verifyToken, requireAdmin, updateAchievement);

/**
 * @route   DELETE /api/achievements/:id
 * @desc    Delete an achievement by ID
 * @access  Admin
 */
router.delete('/:id', verifyToken, requireAdmin, deleteAchievement);

export default router;