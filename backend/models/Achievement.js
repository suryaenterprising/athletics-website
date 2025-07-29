// backend/models/Achievement.js
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
rank: Number,
name: String,
result: String,
remarks: String
});

const achievementSchema = new mongoose.Schema({
event: String,
gender: { type: String, enum: ['Boys', 'Girls'] },
records: [recordSchema]
});

module.exports = mongoose.model('Achievement', achievementSchema);