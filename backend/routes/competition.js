// backend/routes/competition.js
import express from 'express';

// Controllers
import {
  getCompetitions,
  getCompetition,
  createCompetition,
  updateCompetition,
  deleteCompetition
} from '../controllers/competitionController.js';

// Middleware
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/competitions
 * @desc    Get all competitions
 * @access  Public
 */
router.get('/', getCompetitions);

/**
 * @route   GET /api/competitions/:id
 * @desc    Get a single competition by ID
 * @access  Public
 */
router.get('/:id', getCompetition);

/**
 * @route   POST /api/competitions
 * @desc    Create a new competition
 * @access  Admin only
 */
router.post('/', verifyToken, requireAdmin, createCompetition);

/**
 * @route   PUT /api/competitions/:id
 * @desc    Update a competition by ID
 * @access  Admin only
 */
router.put('/:id', verifyToken, requireAdmin, updateCompetition);

/**
 * @route   DELETE /api/competitions/:id
 * @desc    Delete a competition by ID
 * @access  Admin only
 */
router.delete('/:id', verifyToken, requireAdmin, deleteCompetition);

export default router;