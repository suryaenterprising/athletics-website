// backend/routes/records.js
const express = require('express');

// Controllers
const {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord
} = require('../controllers/recordController.js');

// Middleware
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware.js');

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

module.exports = router;