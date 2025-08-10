import express from 'express';
import {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord
} from '../controllers/recordController.js';

import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to read records
router.get('/', getRecords);

// Admin routes to modify records
router.post('/', verifyToken, requireAdmin, createRecord);
router.put('/:id', verifyToken, requireAdmin, updateRecord);
router.delete('/:id', verifyToken, requireAdmin, deleteRecord);

export default router;