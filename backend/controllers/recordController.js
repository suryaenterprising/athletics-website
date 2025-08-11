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
      filter.category = req.query.category.trim();
    }
    const records = await Record.find(filter).lean();
    res.status(200).json({ success: true, count: records.length, data: records });
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ success: false, message: "Server error retrieving records" });
  }
};

/**
 * @desc    Create a new record category
 * @route   POST /api/records
 * @access  Admin
 */
export const createRecord = async (req, res) => {
  try {
    if (!req.body.category) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }

    // Trim strings in body
    req.body.category = req.body.category.trim();
    if (req.body.track && Array.isArray(req.body.track)) {
      req.body.track = req.body.track.map(item => ({
        ...item,
        event: item.event?.trim(),
        athlete: item.athlete?.trim(),
        record: item.record?.trim(),
        year: item.year
      }));
    }
    if (req.body.field && Array.isArray(req.body.field)) {
      req.body.field = req.body.field.map(item => ({
        ...item,
        event: item.event?.trim(),
        athlete: item.athlete?.trim(),
        record: item.record?.trim(),
        year: item.year
      }));
    }

    const rec = new Record(req.body);
    const savedRecord = await rec.save();
    res.status(201).json({ success: true, data: savedRecord });
  } catch (err) {
    console.error("Error creating record:", err);
    res.status(400).json({ success: false, message: err.message || "Invalid record data" });
  }
};

/**
 * @desc    Update a record category by ID
 * @route   PUT /api/records/:id
 * @access  Admin
 */
export const updateRecord = async (req, res) => {
  try {
    // Optional: run same trimming logic as in create
    if (req.body.category && typeof req.body.category === 'string') {
      req.body.category = req.body.category.trim();
    }

    const updated = await Record.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Record category not found" });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error(`Error updating record ${req.params.id}:`, err);
    res.status(400).json({ success: false, message: err.message || "Error updating record" });
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
      return res.status(404).json({ success: false, message: "Record category not found" });
    }
    res.status(200).json({ success: true, message: "Record deleted successfully" });
  } catch (err) {
    console.error(`Error deleting record ${req.params.id}:`, err);
    res.status(500).json({ success: false, message: "Server error deleting record" });
  }
};