import mongoose from 'mongoose';

const AthleteSchema = new mongoose.Schema(
  {
    category: { 
      type: String, 
      enum: ['student', 'coach', 'alumni'], 
      required: true,
      trim: true
    },
    image: { type: String, trim: true },  // image URL (relative or absolute)
    name: { type: String, required: true, trim: true },

    // For students/alumni
    branch: { type: String, trim: true },
    roll: { type: String, trim: true },   // students only
    batch: { type: String, trim: true },  // alumni only

    // For coaches
    role: { type: String, trim: true },
    spec: { type: String, trim: true },   // specialization

    // Arrays
    events: { 
      type: [String], 
      default: [],
      set: arr => arr.map(e => e.trim()) 
    }, // e.g. ["100m Dash", "Long Jump"]

    achv: { 
      type: [String], 
      default: [],
      set: arr => arr.map(a => a.trim()) 
    }, // list of achievements

    // Contact details
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    contact: { type: String, trim: true } // external link like LinkedIn
  },
  { timestamps: true }
);

export default mongoose.models.Athlete || mongoose.model('Athlete', AthleteSchema);