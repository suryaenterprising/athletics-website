const express = require('express');
const router = express.Router();

const {
  getAllAchievements,
  getAchievementByEvent,
  createAchievement,
  updateAchievement,
  deleteAchievement
} = require('../controllers/achievementController');

// GET all records
router.get('/', getAllAchievements);

// GET by event
router.get('/:event', getAchievementByEvent);

// POST new record
router.post('/', createAchievement);

// PUT update record
router.put('/:id', updateAchievement);

// DELETE record
router.delete('/:id', deleteAchievement);

module.exports = router;
