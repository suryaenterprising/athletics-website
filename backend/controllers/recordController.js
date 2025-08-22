// controllers/recordController.js
import Record from "../models/recordModel.js";

/**
 * @desc    Get all records
 * @route   GET /api/records
 * @access  Public
 */
export const getRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Get records by category
 * @route   GET /api/records/category/:category
 * @access  Public
 */
export const getRecordByCategory = async (req, res) => {
  try {
    const record = await Record.findOne({ category: req.params.category.toLowerCase() });
    if (!record) return res.status(404).json({ message: "Category not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Create new record category
 * @route   POST /api/records
 * @access  Private/Admin
 */
export const createRecord = async (req, res) => {
  try {
    const { category } = req.body;
    const existing = await Record.findOne({ category: category.toLowerCase() });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const newRecord = new Record({ category: category.toLowerCase() });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Update record category
 * @route   PUT /api/records/:id
 * @access  Private/Admin
 */
export const updateRecord = async (req, res) => {
  try {
    const updated = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Delete record category
 * @route   DELETE /api/records/:id
 * @access  Private/Admin
 */
export const deleteRecord = async (req, res) => {
  try {
    const deleted = await Record.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Add new event to track/field
 * @route   POST /api/records/:id/:type
 * @access  Private/Admin
 */
export const addEvent = async (req, res) => {
  try {
    const { id, type } = req.params;
    const { event, record, athlete, year } = req.body;

    if (!["track", "field"].includes(type))
      return res.status(400).json({ message: "Invalid type (use 'track' or 'field')" });

    const recordDoc = await Record.findById(id);
    if (!recordDoc) return res.status(404).json({ message: "Record category not found" });

    recordDoc[type].push({ event, record, athlete, year });
    await recordDoc.save();

    res.status(201).json(recordDoc);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Update event in track/field
 * @route   PUT /api/records/:id/:type/:eventId
 * @access  Private/Admin
 */
export const updateEvent = async (req, res) => {
  try {
    const { id, type, eventId } = req.params;

    if (!["track", "field"].includes(type))
      return res.status(400).json({ message: "Invalid type (use 'track' or 'field')" });

    const recordDoc = await Record.findById(id);
    if (!recordDoc) return res.status(404).json({ message: "Record category not found" });

    const event = recordDoc[type].id(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    Object.assign(event, req.body); // merge updates
    await recordDoc.save();

    res.json(recordDoc);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Delete event from track/field
 * @route   DELETE /api/records/:id/:type/:eventId
 * @access  Private/Admin
 */
export const deleteEvent = async (req, res) => {
  try {
    const { id, type, eventId } = req.params;

    if (!["track", "field"].includes(type))
      return res.status(400).json({ message: "Invalid type (use 'track' or 'field')" });

    const recordDoc = await Record.findById(id);
    if (!recordDoc) return res.status(404).json({ message: "Record category not found" });

    const event = recordDoc[type].id(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.deleteOne(); // remove the subdocument
    await recordDoc.save();

    res.json(recordDoc);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
