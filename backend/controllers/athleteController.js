const Athlete = require("../models/athleteModel");

// POST (for public form submissions)
exports.createAthlete = async (req, res) => {
  try {
    const newAthlete = new Athlete(req.body);
    await newAthlete.save();
    res.status(201).json(newAthlete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET all athletes by category (student, alumni, coach)
exports.getAthletesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const athletes = await Athlete.find({ category });
    res.status(200).json(athletes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
