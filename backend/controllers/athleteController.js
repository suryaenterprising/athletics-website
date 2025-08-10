import Athlete from '../models/Athlete.js';

// Get all athletes (optionally filter by category)
export const getAthletes = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const athletes = await Athlete.find(filter);
    res.json(athletes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new athlete
export const createAthlete = async (req, res) => {
  try {
    const athlete = new Athlete(req.body);
    await athlete.save();
    res.status(201).json(athlete);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update athlete
export const updateAthlete = async (req, res) => {
  try {
    const updated = await Athlete.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Athlete not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete athlete
export const deleteAthlete = async (req, res) => {
  try {
    const deleted = await Athlete.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Athlete not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};