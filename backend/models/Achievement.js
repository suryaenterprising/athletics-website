// backend/models/Achievement.js
import mongoose from 'mongoose';

/**
 * Schema for a basic record entry inside an event.
 */
const recordSchema = new mongoose.Schema({
  rank: { type: Number, required: true },
  name: { type: String, required: true },
  result: { type: String, required: true },  // e.g., "10.8s" or "7.2m"
  remarks: { type: String }
}, { _id: false });

/**
 * Schema for achievements tied to a specific event and gender.
 */
const achievementRecordSchema = new mongoose.Schema({
  event: { type: String, required: true },
  gender: { type: String, enum: ['Boys', 'Girls'], required: true },
  records: { type: [recordSchema], default: [] }
});

/**
 * Schema for a simple item in an achievement category card.
 */
const achievementItemSchema = new mongoose.Schema({
  description: { type: String, required: true }
}, { _id: false });

/**
 * Main schema for achievement categories (UI display purposes).
 */
const achievementCategorySchema = new mongoose.Schema({
  icon: { type: String },                         // e.g., "fas fa-trophy"
  title: { type: String, required: true },
  description: { type: String },                  // short description of category
  items: { type: [achievementItemSchema], default: [] },
  gradient: { type: String }                      // e.g., "from-blue-600 to-blue-800"
}, { timestamps: true });

// If you ever want to store competition-specific achievement records separately
export const AchievementRecord = mongoose.model('AchievementRecord', achievementRecordSchema);

// Default export for category-based achievements (UI cards)
export default mongoose.model('Achievement', achievementCategorySchema);
