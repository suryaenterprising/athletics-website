import mongoose from 'mongoose';

const EventResultSchema = new mongoose.Schema({
  position: { type: String, trim: true },
  athlete: { type: String, trim: true },
  result: { type: String, trim: true },
  points: { type: Number, min: 0 }
}, { _id: false });

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  results: { type: [EventResultSchema], default: [] }
});

const EventTypeSchema = new mongoose.Schema({
  typeName: { type: String, required: true, trim: true },
  events: { type: [EventSchema], default: [] }
});

const CompetitionYearSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  eventTypes: { type: [EventTypeSchema], default: [] }
});

const UpcomingEventDetailsSchema = new mongoose.Schema({
  date: { type: String, trim: true },
  venue: { type: String, trim: true },
  description: { type: String, trim: true },
  eligibility: { type: [String], default: [] }, // added eligibility
  tags: { type: [String], default: [] }
}, { _id: false });

const CompetitionSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true, lowercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  gradient: { type: String, trim: true },
  years: { type: [CompetitionYearSchema], default: [] },
  upcomingEventDetails: { type: UpcomingEventDetailsSchema, default: {} },
  status: { type: String, enum: ['upcoming', 'present', 'past'], default: 'upcoming' } // competition status
},{ timestamps: true });

export default mongoose.model('Competition', CompetitionSchema);
