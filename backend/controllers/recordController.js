import Record from '../models/Record.js';

// Get all records (optionally filter by category)
export const getRecords = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const records = await Record.find(filter);
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new record category
export const createRecord = async (req, res) => {
  try {
    const rec = new Record(req.body);
    await rec.save();
    res.status(201).json(rec);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update record category (replace track/field arrays or update properties)
export const updateRecord = async (req, res) => {
  try {
    const updated = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Record category not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete record category
export const deleteRecord = async (req, res) => {
  try {
    const deleted = await Record.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Record category not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};