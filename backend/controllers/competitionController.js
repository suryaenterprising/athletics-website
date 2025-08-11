// backend/controllers/competitionController.js
import Competition from '../models/Competition.js';

/**
 * @desc    Get all competitions
 * @route   GET /api/competitions
 * @access  Public
 */
export const getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find({});
    res.status(200).json(competitions);
  } catch (err) {
    console.error('Error fetching competitions:', err);
    res.status(500).json({ message: 'Server error while fetching competitions.' });
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
      return res.status(404).json({ message: 'Competition not found.' });
    }
    res.status(200).json(competition);
  } catch (err) {
    console.error(`Error fetching competition ${req.params.id}:`, err);
    res.status(500).json({ message: 'Server error while fetching competition.' });
  }
};

/**
 * @desc    Create a new competition
 * @route   POST /api/competitions
 * @access  Admin
 */
export const createCompetition = async (req, res) => {
  try {
    const newCompetition = new Competition(req.body);
    await newCompetition.save();
    res.status(201).json(newCompetition);
  } catch (err) {
    console.error('Error creating competition:', err);
    res.status(400).json({ message: err.message || 'Invalid competition data.' });
  }
};

/**
 * @desc    Update a competition by ID (partial updates supported)
 * @route   PUT /api/competitions/:id
 * @access  Admin
 */
export const updateCompetition = async (req, res) => {
  try {
    const updatedCompetition = await Competition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCompetition) {
      return res.status(404).json({ message: 'Competition not found.' });
    }
    res.status(200).json(updatedCompetition);
  } catch (err) {
    console.error(`Error updating competition ${req.params.id}:`, err);
    res.status(400).json({ message: err.message || 'Invalid update data.' });
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
      return res.status(404).json({ message: 'Competition not found.' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(`Error deleting competition ${req.params.id}:`, err);
    res.status(500).json({ message: 'Server error while deleting competition.' });
  }
};
