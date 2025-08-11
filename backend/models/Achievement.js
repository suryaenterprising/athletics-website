import mongoose from 'mongoose';

/**
 * Optional: detailed record schema for event-specific achievements
 * (currently unused by UI but may be useful for competition results storage)
 */
const recordSchema = new mongoose.Schema({
  rank: { type: Number, required: true },
  name: { type: String, required: true, trim: true },
  result: { type: String, required: true, trim: true },  // e.g., "10.8s" or "7.2m"
  remarks: { type: String, trim: true }
}, { _id: false });

const achievementRecordSchema = new mongoose.Schema({
  event: { type: String, required: true, trim: true },
  gender: { type: String, enum: ['Boys', 'Girls'], required: true },
  records: { type: [recordSchema], default: [] }
});

/**
 * Main schema for achievement categories (inline-edit UI cards).
 * items is an array of strings to match current frontend implementation.
 */
const achievementCategorySchema = new mongoose.Schema({
  icon: { type: String, trim: true },         // e.g., "fas fa-trophy"
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },  // short description of category
  items: { type: [String], default: [] },     // list of achievement strings for UI
  gradient: { type: String, trim: true }      // e.g., "from-blue-600 to-blue-800"
}, { timestamps: true });

// Export for potential future use (detailed event-based achievements)
export const AchievementRecord = mongoose.models.AchievementRecord || mongoose.model('AchievementRecord', achievementRecordSchema);

// Export for category-based achievements (current UI cards)
const Achievement = mongoose.models.Achievement || mongoose.model('Achievement', achievementCategorySchema);
export default Achievement;