const express = require("express");
const router = express.Router();
const {
  createAthlete,
  getAthletesByCategory
} = require("../controllers/athleteController");

// Public POST route to allow individual profile creation
router.post("/", createAthlete);

// GET by category (student, alumni, coach)
router.get("/:category", getAthletesByCategory);

module.exports = router;
