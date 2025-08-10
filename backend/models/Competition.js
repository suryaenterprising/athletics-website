import mongoose from 'mongoose';

// Define the schema for the event results inside an event
const EventResultSchema = new mongoose.Schema({
  position: String,
  athlete: String,
  result: String,
  points: Number,
}, { _id: false });

// Define the schema for events inside an event type
const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  results: [EventResultSchema]
});

// Define the schema for event types inside a year
const EventTypeSchema = new mongoose.Schema({
  typeName: { type: String, required: true }, // e.g. "track", "field", or custom
  events: [EventSchema]
});

// Define the schema for a competition year
const CompetitionYearSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  eventTypes: [EventTypeSchema]
});

// Define schema for upcoming event details card
const UpcomingEventDetailsSchema = new mongoose.Schema({
  date: String,
  venue: String,
  description: String,
  tags: [String]
}, { _id: false });

const CompetitionSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },  // unique key like 'tvm', 'interiit'
  title: { type: String, required: true },
  description: String,
  gradient: String, // for UI gradient classes
  years: [CompetitionYearSchema],
  upcomingEventDetails: UpcomingEventDetailsSchema
}, { timestamps: true });

export default mongoose.model('Competition', CompetitionSchema);