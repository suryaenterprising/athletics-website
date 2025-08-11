import Athlete from '../models/Athlete.js';

/**
 * Get all athletes, optionally filtered by category
 */
export const getAthletes = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const athletes = await Athlete.find(filter);
    res.status(200).json({ success: true, count: athletes.length, athletes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Create a new athlete
 */
export const createAthlete = async (req, res) => {
  try {
    if (!req.body.name || !req.body.sport) {
      return res.status(400).json({ success: false, message: 'Name and sport are required' });
    }

    const athlete = new Athlete(req.body);
    await athlete.save();

    res.status(201).json({ success: true, athlete });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * Update athlete
 */
export const updateAthlete = async (req, res) => {
  try {
    const updated = await Athlete.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Athlete not found' });
    }

    res.status(200).json({ success: true, athlete: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * Delete athlete
 */
export const deleteAthlete = async (req, res) => {
  try {
    const deleted = await Athlete.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Athlete not found' });
    }

    res.status(200).json({ success: true, message: 'Athlete deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
