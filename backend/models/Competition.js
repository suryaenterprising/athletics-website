// backend/models/Competition.js
import mongoose from 'mongoose';

/**
 * Schema for individual athlete results in an event
 */
const EventResultSchema = new mongoose.Schema(
  {
    position: { type: String, trim: true }, // e.g., "1st", "2nd", "Finalist"
    athlete: { type: String, trim: true },
    result: { type: String, trim: true }, // e.g., "10.5s", "6.2m"
    points: { type: Number, min: 0 }
  },
  { _id: false }
);

/**
 * Schema for a single event under an event type
 */
const EventSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  results: [EventResultSchema]
});

/**
 * Schema for a category of events (e.g., "Track", "Field") within a year
 */
const EventTypeSchema = new mongoose.Schema({
  typeName: { type: String, required: true, trim: true },
  events: [EventSchema]
});

/**
 * Schema for a competition year containing multiple event types
 */
const CompetitionYearSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  eventTypes: [EventTypeSchema]
});

/**
 * Schema for upcoming event details
 */
const UpcomingEventDetailsSchema = new mongoose.Schema(
  {
    date: { type: String, trim: true },
    venue: { type: String, trim: true },
    description: { type: String, trim: true },
    tags: [{ type: String, trim: true }]
  },
  { _id: false }
);

/**
 * Main Competition schema
 */
const CompetitionSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, required: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    gradient: { type: String, trim: true }, // Tailwind gradient classes for UI
    years: [CompetitionYearSchema],
    upcomingEventDetails: UpcomingEventDetailsSchema
  },
  { timestamps: true }
);

export default mongoose.model('Competition', CompetitionSchema);
