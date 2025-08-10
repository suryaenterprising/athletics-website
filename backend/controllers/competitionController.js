import Competition from '../models/Competition.js';

// Get all competitions
export const getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find({});
    res.json(competitions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single competition by ID
export const getCompetition = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) return res.status(404).json({ message: "Competition not found" });
    res.json(competition);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new competition
export const createCompetition = async (req, res) => {
  try {
    const newCompetition = new Competition(req.body);
    await newCompetition.save();
    res.status(201).json(newCompetition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update competition partially (including nested objects)
export const updateCompetition = async (req, res) => {
  try {
    const updatedCompetition = await Competition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCompetition) return res.status(404).json({ message: "Competition not found" });
    res.json(updatedCompetition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a competition by ID
export const deleteCompetition = async (req, res) => {
  try {
    const deleted = await Competition.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Competition not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};