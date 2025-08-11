// controllers/competitionController.js
import Competition from '../models/Competition.js';

/**
 * @desc    Get all competitions
 * @route   GET /api/competitions
 * @access  Public
 */
export const getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find({});
    res.status(200).json({ success: true, data: competitions });
  } catch (err) {
    console.error('Error fetching competitions:', err);
    res.status(500).json({ success: false, message: 'Server error while fetching competitions.' });
  }
};

/**
 * @desc    Get a single competition by ID
 * @route   GET /api/competitions/:id
 * @access  Public
 */
export const getCompetition = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      return res.status(404).json({ success: false, message: 'Competition not found.' });
    }
    res.status(200).json({ success: true, data: competition });
  } catch (err) {
    console.error(`Error fetching competition ${req.params.id}:`, err);
    res.status(500).json({ success: false, message: 'Server error while fetching competition.' });
  }
};

/**
 * @desc    Create a new competition
 * @route   POST /api/competitions
 * @access  Admin
 */
export const createCompetition = async (req, res) => {
  try {
    const { key, title, description, gradient, years, upcomingEventDetails } = req.body;

    if (!key || !title) {
      return res.status(400).json({ success: false, message: 'Key and title are required' });
    }

    const competition = new Competition({
      key: key.trim(),
      title: title.trim(),
      description: description?.trim(),
      gradient: gradient?.trim(),
      years: years || [],
      upcomingEventDetails: upcomingEventDetails || {}
    });

    const savedCompetition = await competition.save();
    res.status(201).json({ success: true, data: savedCompetition });
  } catch (err) {
    console.error('Error creating competition:', err);
    res.status(400).json({ success: false, message: err.message || 'Invalid competition data.' });
  }
};

/**
 * @desc    Update a competition by ID (partial updates supported)
 * @route   PUT /api/competitions/:id
 * @access  Admin
 */
export const updateCompetition = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Trim string fields
    ['key', 'title', 'description', 'gradient'].forEach(field => {
      if (typeof updateData[field] === 'string') {
        updateData[field] = updateData[field].trim();
      }
    });

    const updatedCompetition = await Competition.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedCompetition) {
      return res.status(404).json({ success: false, message: 'Competition not found.' });
    }

    res.status(200).json({ success: true, data: updatedCompetition });
  } catch (err) {
    console.error(`Error updating competition ${req.params.id}:`, err);
    res.status(400).json({ success: false, message: err.message || 'Invalid update data.' });
  }
};

/**
 * @desc    Delete a competition by ID
 * @route   DELETE /api/competitions/:id
 * @access  Admin
 */
export const deleteCompetition = async (req, res) => {
  try {
    const deletedCompetition = await Competition.findByIdAndDelete(req.params.id);
    if (!deletedCompetition) {
      return res.status(404).json({ success: false, message: 'Competition not found.' });
    }
    res.status(200).json({ success: true, message: 'Competition deleted successfully.' });
  } catch (err) {
    console.error(`Error deleting competition ${req.params.id}:`, err);
    res.status(500).json({ success: false, message: 'Server error while deleting competition.' });
  }
};