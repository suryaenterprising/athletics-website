const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  department: { type: String },
  events: [String],
  achievements: [String],
  category: { 
    type: String, 
    enum: ["student", "alumni", "coach"], 
    required: true 
  },
  year: String, // optional
});

module.exports = mongoose.model("Athlete", athleteSchema);
