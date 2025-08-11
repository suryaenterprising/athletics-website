// controllers/achievementController.js
import Achievement from '../models/Achievement.js';

/**
 * @desc    Get all achievements
 * @route   GET /api/achievements
 * @access  Public
 */
export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({});
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching achievements', error: error.message });
  }
};

/**
 * @desc    Create a new achievement
 * @route   POST /api/achievements
 * @access  Admin
 */
export const createAchievement = async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ message: 'Error creating achievement', error: error.message });
  }
};

/**
 * @desc    Update an achievement by ID
 * @route   PUT /api/achievements/:id
 * @access  Admin
 */
export const updateAchievement = async (req, res) => {
  try {
    const updatedAchievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAchievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.status(200).json(updatedAchievement);
  } catch (error) {
    res.status(400).json({ message: 'Error updating achievement', error: error.message });
  }
};

/**
 * @desc    Delete an achievement by ID
 * @route   DELETE /api/achievements/:id
 * @access  Admin
 */
export const deleteAchievement = async (req, res) => {
  try {
    const deletedAchievement = await Achievement.findByIdAndDelete(req.params.id);

    if (!deletedAchievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting achievement', error: error.message });
  }
};
