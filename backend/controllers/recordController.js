// controllers/recordController.js
import Record from '../models/Record.js';

/**
 * @desc    Get all records (optionally filtered by category)
 * @route   GET /api/records
 * @access  Public
 */
export const getRecords = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const records = await Record.find(filter).lean();
    res.status(200).json(records);
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ message: "Server error retrieving records" });
  }
};

/**
 * @desc    Create a new record category
 * @route   POST /api/records
 * @access  Admin
 */
export const createRecord = async (req, res) => {
  try {
    const rec = new Record(req.body);
    const savedRecord = await rec.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    console.error("Error creating record:", err);
    res.status(400).json({ message: err.message || "Invalid record data" });
  }
};

/**
 * @desc    Update a record category by ID
 * @route   PUT /api/records/:id
 * @access  Admin
 */
export const updateRecord = async (req, res) => {
  try {
    const updated = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Record category not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(400).json({ message: err.message || "Error updating record" });
  }
};

/**
 * @desc    Delete a record category by ID
 * @route   DELETE /api/records/:id
 * @access  Admin
 */
export const deleteRecord = async (req, res) => {
  try {
    const deleted = await Record.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Record category not found" });
    }
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).json({ message: "Server error deleting record" });
  }
};
