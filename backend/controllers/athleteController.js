import Athlete from '../models/Athlete.js';

/**
 * @desc    Get all athletes, optionally filtered by category
 * @route   GET /api/athletes
 * @access  Public
 */
export const getAthletes = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const athletes = await Athlete.find(filter);
    res.status(200).json({ success: true, count: athletes.length, data: athletes });
  } catch (err) {
    console.error('Error fetching athletes:', err);
    res.status(500).json({ success: false, message: 'Server error while fetching athletes.' });
  }
};

/**
 * @desc    Create a new athlete
 * @route   POST /api/athletes
 * @access  Admin
 */
export const createAthlete = async (req, res) => {
  try {
    const { category, name } = req.body;

    if (!category || !name) {
      return res.status(400).json({ success: false, message: 'Category and name are required' });
    }

    const athlete = new Athlete({
      ...req.body,
      category: category.trim(),
      name: name.trim(),
      branch: req.body.branch?.trim(),
      roll: req.body.roll?.trim(),
      batch: req.body.batch?.trim(),
      role: req.body.role?.trim(),
      spec: req.body.spec?.trim(),
      phone: req.body.phone?.trim(),
      email: req.body.email?.trim(),
      contact: req.body.contact?.trim(),
      events: Array.isArray(req.body.events) ? req.body.events.map(e => e.trim()) : [],
      achv: Array.isArray(req.body.achv) ? req.body.achv.map(a => a.trim()) : []
    });

    const saved = await athlete.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error('Error creating athlete:', err);
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Update athlete by ID
 * @route   PUT /api/athletes/:id
 * @access  Admin
 */
export const updateAthlete = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Trim string fields
    ['category', 'name', 'branch', 'roll', 'batch', 'role', 'spec', 'phone', 'email', 'contact'].forEach(field => {
      if (typeof updateData[field] === 'string') {
        updateData[field] = updateData[field].trim();
      }
    });

    if (updateData.events && Array.isArray(updateData.events)) {
      updateData.events = updateData.events.map(e => e.trim());
    }
    if (updateData.achv && Array.isArray(updateData.achv)) {
      updateData.achv = updateData.achv.map(a => a.trim());
    }

    const updated = await Athlete.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true, runValidators: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Athlete not found' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error(`Error updating athlete ${req.params.id}:`, err);
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Delete athlete by ID
 * @route   DELETE /api/athletes/:id
 * @access  Admin
 */
export const deleteAthlete = async (req, res) => {
  try {
    const deleted = await Athlete.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Athlete not found' });
    }

    res.status(200).json({ success: true, message: 'Athlete deleted successfully' });
  } catch (err) {
    console.error(`Error deleting athlete ${req.params.id}:`, err);
    res.status(500).json({ success: false, message: err.message });
  }
};