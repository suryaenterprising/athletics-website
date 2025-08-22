import express from 'express';
import {
  getRecords,
  getRecordByCategory,
  createRecord,
  updateRecord,
  deleteRecord,
  addEvent,
  updateEvent,
  deleteEvent
} from '../controllers/recordController.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/records
 * @desc    Get all records
 * @access  Public
 */
router.get('/', getRecords);

/**
 * @route   GET /api/records/:category
 * @desc    Get records by category (e.g., boys, girls)
 * @access  Public
 */
router.get('/:category', getRecordByCategory);

/**
 * @route   POST /api/records
 * @desc    Create a new record category (admin only)
 * @access  Private (Admin)
 */
router.post('/', verifyToken, requireAdmin, createRecord);

/**
 * @route   PUT /api/records/:id
 * @desc    Update an entire record category by ID (admin only)
 * @access  Private (Admin)
 */
router.put('/:id', verifyToken, requireAdmin, updateRecord);

/**
 * @route   DELETE /api/records/:id
 * @desc    Delete an entire record category by ID (admin only)
 * @access  Private (Admin)
 */
router.delete('/:id', verifyToken, requireAdmin, deleteRecord);

/**
 * @route   POST /api/records/:id/:type
 * @desc    Add a new event entry to a category (track/field)
 * @access  Private (Admin)
 */
router.post('/:id/:type', verifyToken, requireAdmin, addEvent);

/**
 * @route   PUT /api/records/:id/:type/:eventIndex
 * @desc    Update a specific event entry by index
 * @access  Private (Admin)
 */
router.put('/:id/:type/:eventIndex', verifyToken, requireAdmin, updateEvent);

/**
 * @route   DELETE /api/records/:id/:type/:eventIndex
 * @desc    Delete a specific event entry by index
 * @access  Private (Admin)
 */
router.delete('/:id/:type/:eventIndex', verifyToken, requireAdmin, deleteEvent);

export default router;
