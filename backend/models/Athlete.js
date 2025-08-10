import mongoose from 'mongoose';

const AthleteSchema = new mongoose.Schema({
  category: { 
    type: String, 
    enum: ['student', 'coach', 'alumni'], 
    required: true 
  },
  image: { type: String },         // image URL
  name: { type: String, required: true },
  branch: String,                  // for students/alumni
  roll: String,                    // for students
  batch: String,                    // for alumni
  role: String,                     // for coaches
  spec: String,                     // specialization for coaches
  events: [String],                 // e.g. ["100m Dash", "Long Jump"]
  achv: [String],                   // list of achievements
  phone: String,
  email: String,
  contact: String                   // external link like LinkedIn
}, { timestamps: true });

export default mongoose.model('Athlete', AthleteSchema);