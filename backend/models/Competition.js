const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema({
title: { type: String, required: true },
date: { type: Date },
description: { type: String },
image: { type: String }, // optional image field
results: [
{
event: String,
winner: String,
time: String
}
]
}, { timestamps: true });

module.exports = mongoose.model("Competition", competitionSchema);