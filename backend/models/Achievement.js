// backend/models/Achievement.js
import mongoose from 'mongoose';

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

const AchievementItemSchema = new mongoose.Schema({
  description: { type: String, required: true }
}, { _id: false });

const AchievementSchema = new mongoose.Schema({
  icon: String,
  title: { type: String, required: true },
  description: String,
  items: [AchievementItemSchema],
  gradient: String
}, { timestamps: true });

export const Achievement = mongoose.model('Achievement', AchievementSchema);
export const AchievementRecord = mongoose.model('AchievementRecord', achievementSchema);
