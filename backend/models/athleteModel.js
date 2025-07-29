// backend/models/athleteModel.js
const mongoose = require('mongoose');

const athleteSchema = new mongoose.Schema({
name: { type: String, required: true },
gender: { type: String, enum: ['Male', 'Female'], required: true },
photo: { type: String }, // store image path or URL
events: [String],
achievements: [String],
year: String
});

module.exports = mongoose.model('Athlete', athleteSchema);