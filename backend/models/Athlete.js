// backend/models/athleteModel.js
const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema({
name: { type: String, required: true },
photo: { type: String },
events: [{ type: String }],
achievements: { type: String },
year: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Athlete", athleteSchema);