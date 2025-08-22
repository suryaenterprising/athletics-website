import express from "express";

// Controllers
import {
  getRecords,
  getRecordByCategory,
  createRecord,
  updateRecord,
  deleteRecord,
  addEvent,
  updateEvent,
  deleteEvent
} from "../controllers/recordController.js";

// Middleware
import { verifyToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/records
 * @desc    Get all records
 * @access  Public
 */
router.get("/", getRecords);

/**
 * @route   POST /api/records
 * @desc    Create a new record category (admin only)
 * @access  Private/Admin
 */
router.post("/", verifyToken, requireAdmin, createRecord);

/**
 * @route   PUT /api/records/:id
 * @desc    Update a record category by ID (admin only)
 * @access  Private/Admin
 */
router.put("/:id", verifyToken, requireAdmin, updateRecord);

/**
 * @route   DELETE /api/records/:id
 * @desc    Delete a record category by ID (admin only)
 * @access  Private/Admin
 */
router.delete("/:id", verifyToken, requireAdmin, deleteRecord);

/**
 * @route   GET /api/records/category/:category
 * @desc    Get records by category (e.g. boys, girls)
 * @access  Public
 */
router.get("/category/:category", getRecordByCategory);

/**
 * @route   POST /api/records/:id/:type
 * @desc    Add new event to category (admin only)
 * @access  Private/Admin
 */
router.post("/:id/:type", verifyToken, requireAdmin, addEvent);

/**
 * @route   PUT /api/records/:id/:type/:eventId
 * @desc    Update event by eventId (admin only)
 * @access  Private/Admin
 */
router.put("/:id/:type/:eventId", verifyToken, requireAdmin, updateEvent);

/**
 * @route   DELETE /api/records/:id/:type/:eventId
 * @desc    Delete event by eventId (admin only)
 * @access  Private/Admin
 */
router.delete("/:id/:type/:eventId", verifyToken, requireAdmin, deleteEvent);

export default router;
