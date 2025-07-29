const Competition = require("../models/Competition");

// GET all competitions
exports.getAllCompetitions = async (req, res) => {
try {
const competitions = await Competition.find();
res.status(200).json(competitions);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

// GET one competition
exports.getCompetitionById = async (req, res) => {
try {
const competition = await Competition.findById(req.params.id);
if (!competition) return res.status(404).json({ message: "Not found" });
res.status(200).json(competition);
} catch (err) {
res.status(500).json({ message: err.message });
}
};

// POST create competition
exports.createCompetition = async (req, res) => {
try {
const competition = new Competition(req.body);
const saved = await competition.save();
res.status(201).json(saved);
} catch (err) {
res.status(400).json({ message: err.message });
}
};

// PUT update competition
exports.updateCompetition = async (req, res) => {
try {
const updated = await Competition.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!updated) return res.status(404).json({ message: "Not found" });
res.status(200).json(updated);
} catch (err) {
res.status(400).json({ message: err.message });
}
};

// DELETE competition
exports.deleteCompetition = async (req, res) => {
try {
const deleted = await Competition.findByIdAndDelete(req.params.id);
if (!deleted) return res.status(404).json({ message: "Not found" });
res.status(200).json({ message: "Deleted successfully" });
} catch (err) {
res.status(500).json({ message: err.message });
}
};