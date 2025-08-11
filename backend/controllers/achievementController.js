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
    res.status(200).json({ success: true, data: achievements });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ success: false, message: 'Server error while fetching achievements' });
  }
};

/**
 * @desc    Create a new achievement
 * @route   POST /api/achievements
 * @access  Admin
 */
export const createAchievement = async (req, res) => {
  try {
    const { icon, title, description, items, gradient } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const achievement = new Achievement({
      icon: typeof icon === 'string' ? icon.trim() : '',
      title: typeof title === 'string' ? title.trim() : '',
      description: typeof description === 'string' ? description.trim() : '',
      items: Array.isArray(items) ? items.map(i => typeof i === 'string' ? i.trim() : '') : [],
      gradient: typeof gradient === 'string' ? gradient.trim() : ''
    });

    const savedAchievement = await achievement.save();
    res.status(201).json({ success: true, data: savedAchievement });
  } catch (error) {
    console.error("Error creating achievement:", error);
    res.status(400).json({ success: false, message: 'Error creating achievement', error: error.message });
  }
};

/**
 * @desc    Update an achievement by ID
 * @route   PUT /api/achievements/:id
 * @access  Admin
 */
export const updateAchievement = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Trim string fields
    ['icon', 'title', 'description', 'gradient'].forEach(field => {
      if (updateData[field] && typeof updateData[field] === 'string') {
        updateData[field] = updateData[field].trim();
      }
    });

    if (updateData.items && Array.isArray(updateData.items)) {
      updateData.items = updateData.items.map(i => i.trim());
    }

    const updatedAchievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedAchievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    res.status(200).json({ success: true, data: updatedAchievement });
  } catch (error) {
    console.error("Error updating achievement:", error);
    res.status(400).json({ success: false, message: 'Error updating achievement', error: error.message });
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
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    res.status(200).json({ success: true, message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error("Error deleting achievement:", error);
    res.status(500).json({ success: false, message: 'Server error while deleting achievement', error: error.message });
  }
};