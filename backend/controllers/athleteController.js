// backend/controllers/athleteController.js
const Athlete = require("../models/athleteModel");

// GET all athletes
exports.getAllAthletes = async (req, res) => {
try {
const athletes = await Athlete.find();
res.status(200).json(athletes);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

// GET athlete by ID
exports.getAthleteById = async (req, res) => {
try {
const athlete = await Athlete.findById(req.params.id);
if (!athlete) return res.status(404).json({ message: "Athlete not found" });
res.status(200).json(athlete);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

// CREATE new athlete
exports.createAthlete = async (req, res) => {
try {
const newAthlete = new Athlete(req.body);
await newAthlete.save();
res.status(201).json(newAthlete);
} catch (err) {
res.status(400).json({ message: err.message });
}
};

// UPDATE athlete
exports.updateAthlete = async (req, res) => {
try {
const updated = await Athlete.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!updated) return res.status(404).json({ message: "Athlete not found" });
res.status(200).json(updated);
} catch (err) {
res.status(400).json({ message: err.message });
}
};

// DELETE athlete
exports.deleteAthlete = async (req, res) => {
try {
const deleted = await Athlete.findByIdAndDelete(req.params.id);
if (!deleted) return res.status(404).json({ message: "Athlete not found" });
res.status(200).json({ message: "Athlete deleted" });
} catch (err) {
res.status(500).json({ message: err.message });
}
};