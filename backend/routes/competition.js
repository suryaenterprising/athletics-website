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

router.get('/', getCompetitions); // supports ?status=upcoming or ?status=present
router.get('/:id', getCompetition);
router.post('/', verifyToken, requireAdmin, createCompetition);
router.put('/:id', verifyToken, requireAdmin, updateCompetition);
router.delete('/:id', verifyToken, requireAdmin, deleteCompetition);

export default router;
