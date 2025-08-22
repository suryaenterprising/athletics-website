// backend/controllers/recordController.js
import Record from '../models/Record.js';

/**
 * @desc    Get all record categories
 * @route   GET /api/records
 * @access  Public
 */
export const getRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc    Get records by category (e.g., boys, girls)
 * @route   GET /api/records/:category
 * @access  Public
 */
export const getRecordByCategory = async (req, res) => {
  try {
    const record = await Record.findOne({ category: req.params.category });
    if (!record) return res.status(404).json({ message: 'Category not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc    Create a new record category
 * @route   POST /api/records
 * @access  Private/Admin
 */
export const createRecord = async (req, res) => {
  try {
    const record = new Record(req.body);
    const saved = await record.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @desc    Update entire record category by ID
 * @route   PUT /api/records/:id
 * @access  Private/Admin
 */
export const updateRecord = async (req, res) => {
  try {
    const updated = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Record not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @desc    Delete entire record category by ID
 * @route   DELETE /api/records/:id
 * @access  Private/Admin
 */
export const deleteRecord = async (req, res) => {
  try {
    const deleted = await Record.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc    Add a new event to a category (track or field)
 * @route   POST /api/records/:id/:type
 * @access  Private/Admin
 */
export const addEvent = async (req, res) => {
  try {
    const { id, type } = req.params;
    const record = await Record.findById(id);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    record[type].push(req.body); // req.body = { event, holder, year, performance }
    await record.save();

    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @desc    Update a specific event by index
 * @route   PUT /api/records/:id/:type/:eventIndex
 * @access  Private/Admin
 */
export const updateEvent = async (req, res) => {
  try {
    const { id, type, eventIndex } = req.params;
    const record = await Record.findById(id);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    if (!record[type] || !record[type][eventIndex]) {
      return res.status(404).json({ message: 'Event not found' });
    }

    record[type][eventIndex] = { ...record[type][eventIndex]._doc, ...req.body };
    await record.save();

    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @desc    Delete a specific event by index
 * @route   DELETE /api/records/:id/:type/:eventIndex
 * @access  Private/Admin
 */
export const deleteEvent = async (req, res) => {
  try {
    const { id, type, eventIndex } = req.params;
    const record = await Record.findById(id);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    if (!record[type] || !record[type][eventIndex]) {
      return res.status(404).json({ message: 'Event not found' });
    }

    record[type].splice(eventIndex, 1);
    await record.save();

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
