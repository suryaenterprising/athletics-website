// backend/models/Achievement.js
import mongoose from 'mongoose';

// Schema for competition achievement records
const recordSchema = new mongoose.Schema({
  rank: Number,
  name: String,
  result: String,
  remarks: String
});

// Schema for an event's achievements
const achievementRecordSchema = new mongoose.Schema({
  event: String,
  gender: { type: String, enum: ['Boys', 'Girls'] },
  records: [recordSchema]
});

// Schema for achievement items in a category
const achievementItemSchema = new mongoose.Schema({
  description: { type: String, required: true }
}, { _id: false });

// Schema for achievement categories (UI display purposes)
const achievementCategorySchema = new mongoose.Schema({
  icon: String,               // e.g., "fas fa-trophy"
  title: { type: String, required: true },
  description: String,        // short description of category
  items: [achievementItemSchema], // list of achievement strings
  gradient: String            // e.g., "from-blue-600 to-blue-800"
}, { timestamps: true });

// Named export (if you ever want to use it separately)
export const AchievementRecord = mongoose.model('AchievementRecord', achievementRecordSchema);

// Default export (so `import Achievement from ...` works)
export default mongoose.model('Achievement', achievementCategorySchema);
