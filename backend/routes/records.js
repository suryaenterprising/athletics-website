// routes/records.js
import express from 'express';
import {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord
} from '../controllers/recordController.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/records
 * @desc    Get all records (public)
 */
router.get('/', getRecords);

/**
 * @route   POST /api/records
 * @desc    Create a new record (admin only)
 */
router.post('/', verifyToken, requireAdmin, createRecord);

/**
 * @route   PUT /api/records/:id
 * @desc    Update a record by ID (admin only)
 */
router.put('/:id', verifyToken, requireAdmin, updateRecord);

/**
 * @route   DELETE /api/records/:id
 * @desc    Delete a record by ID (admin only)
 */
router.delete('/:id', verifyToken, requireAdmin, deleteRecord);

export default router;
