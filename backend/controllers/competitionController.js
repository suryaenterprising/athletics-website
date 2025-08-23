import Competition from '../models/Competition.js';

export const getCompetitions = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) filter.status = status;

    const competitions = await Competition.find(filter);
    res.status(200).json({ success: true, data: competitions });
  } catch (err) {
    console.error('Error fetching competitions:', err);
    res.status(500).json({ success: false, message: 'Server error while fetching competitions.' });
  }
};

export const getCompetition = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition)
      return res.status(404).json({ success: false, message: 'Competition not found.' });

    res.status(200).json({ success: true, data: competition });
  } catch (err) {
    console.error(`Error fetching competition ${req.params.id}:`, err);
    res.status(500).json({ success: false, message: 'Server error while fetching competition.' });
  }
};

export const createCompetition = async (req, res) => {
  try {
    const { key, title, description, gradient, years, upcomingEventDetails, status } = req.body;
    if (!key || !title)
      return res.status(400).json({ success: false, message: 'Key and title are required' });

    const competition = new Competition({
      key: key.trim(),
      title: title.trim(),
      description: description?.trim(),
      gradient: gradient?.trim(),
      years: years || [],
      upcomingEventDetails: upcomingEventDetails || {},
      status: status || 'upcoming'
    });

    const savedCompetition = await competition.save();
    res.status(201).json({ success: true, data: savedCompetition });
  } catch (err) {
    console.error('Error creating competition:', err);
    res.status(400).json({ success: false, message: err.message || 'Invalid competition data.' });
  }
};

export const updateCompetition = async (req, res) => {
  try {
    const updateData = { ...req.body };
    ['key', 'title', 'description', 'gradient'].forEach(field => {
      if (typeof updateData[field] === 'string') updateData[field] = updateData[field].trim();
    });

    const updatedCompetition = await Competition.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedCompetition)
      return res.status(404).json({ success: false, message: 'Competition not found.' });

    res.status(200).json({ success: true, data: updatedCompetition });
  } catch (err) {
    console.error(`Error updating competition ${req.params.id}:`, err);
    res.status(400).json({ success: false, message: err.message || 'Invalid update data.' });
  }
};

export const deleteCompetition = async (req, res) => {
  try {
    const deletedCompetition = await Competition.findByIdAndDelete(req.params.id);
    if (!deletedCompetition)
      return res.status(404).json({ success: false, message: 'Competition not found.' });

    res.status(200).json({ success: true, message: 'Competition deleted successfully.' });
  } catch (err) {
    console.error(`Error deleting competition ${req.params.id}:`, err);
    res.status(500).json({ success: false, message: 'Server error while deleting competition.' });
  }
};
