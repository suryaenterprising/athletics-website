import express from 'express';

// Controllers
import {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord
} from '../controllers/recordController.js';

// Middleware
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/records
 * @desc    Get all records
 * @access  Public
 */
router.get('/', getRecords);

/**
 * @route   POST /api/records
 * @desc    Create a new record category (admin only)
 * @access  Private (Admin)
 */
router.post('/', verifyToken, requireAdmin, createRecord);

/**
 * @route   PUT /api/records/:id
 * @desc    Update a record category by ID (admin only)
 * @access  Private (Admin)
 */
router.put('/:id', verifyToken, requireAdmin, updateRecord);

/**
 * @route   DELETE /api/records/:id
 * @desc    Delete a record category by ID (admin only)
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, requireAdmin, deleteRecord);

export default router;