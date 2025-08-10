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

import mongoose from 'mongoose';

const AchievementItemSchema = new mongoose.Schema({
  description: { type: String, required: true }
}, { _id: false });

const AchievementSchema = new mongoose.Schema({
  icon: String,            // e.g., "fas fa-trophy"
  title: { type: String, required: true },
  description: String,    // short description of category
  items: [AchievementItemSchema],  // list of achievement strings
  gradient: String        // UI color gradient as a string class like "from-blue-600 to-blue-800"
}, { timestamps: true });

export default mongoose.model('Achievement', AchievementSchema);module.exports = mongoose.model('Achievement', achievementSchema);