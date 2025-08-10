import express from 'express';
import {
  getCompetitions,
  getCompetition,
  createCompetition,
  updateCompetition,
  deleteCompetition
} from '../controllers/competitionController.js';

import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public read routes
router.get('/', getCompetitions);
router.get('/:id', getCompetition);

// Admin protected write routes
router.post('/', verifyToken, requireAdmin, createCompetition);
router.put('/:id', verifyToken, requireAdmin, updateCompetition);
router.delete('/:id', verifyToken, requireAdmin, deleteCompetition);

export default router;