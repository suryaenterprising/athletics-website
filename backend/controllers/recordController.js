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
      filter.category = req.query.category.trim().toLowerCase();
    }

    const records = await Record.find(filter).lean();
    res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({
      success: false,
      message: "Server error retrieving records"
    });
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
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }

    req.body.category = req.body.category.trim().toLowerCase();

    const normalizeEntries = (entries) =>
      entries.map(item => ({
        ...item,
        event: item.event?.trim(),
        athlete: item.athlete?.trim(),
        record: item.record?.trim(),
        year: item.year
      }));

    if (Array.isArray(req.body.track)) req.body.track = normalizeEntries(req.body.track);
    if (Array.isArray(req.body.field)) req.body.field = normalizeEntries(req.body.field);

    const newRecord = new Record(req.body);
    const saved = await newRecord.save();

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error("Error creating record:", err);
    res.status(400).json({
      success: false,
      message: err.message || "Invalid record data"
    });
  }
};

/**
 * @desc    Update a record category by ID
 * @route   PUT /api/records/:id
 * @access  Admin
 */
export const updateRecord = async (req, res) => {
  try {
    if (req.body.category) {
      req.body.category = req.body.category.trim().toLowerCase();
    }

    const normalizeEntries = (entries) =>
      entries.map(item => ({
        ...item,
        event: item.event?.trim(),
        athlete: item.athlete?.trim(),
        record: item.record?.trim(),
        year: item.year
      }));

    if (Array.isArray(req.body.track)) req.body.track = normalizeEntries(req.body.track);
    if (Array.isArray(req.body.field)) req.body.field = normalizeEntries(req.body.field);

    const updated = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Record category not found"
      });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error(`Error updating record ${req.params.id}:`, err);
    res.status(400).json({
      success: false,
      message: err.message || "Error updating record"
    });
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
      return res.status(404).json({
        success: false,
        message: "Record category not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Record deleted successfully",
      data: deleted
    });
  } catch (err) {
    console.error(`Error deleting record ${req.params.id}:`, err);
    res.status(500).json({
      success: false,
      message: "Server error deleting record"
    });
  }
};
