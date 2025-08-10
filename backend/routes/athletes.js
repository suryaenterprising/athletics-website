const express = require("express");
const multer = require("multer");
const path = require("path");
const Athlete = require("../models/Athlete");

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/athletes");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Add athlete
router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    const { name, sport, achievements } = req.body;
    const newAthlete = new Athlete({
      name,
      sport,
      achievements,
      photo: req.file ? `/uploads/athletes/${req.file.filename}` : null
    });
    await newAthlete.save();
    res.json({ success: true, athlete: newAthlete });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Edit athlete
router.put("/edit/:id", upload.single("photo"), async (req, res) => {
  try {
    const { name, sport, achievements } = req.body;
    const updateData = { name, sport, achievements };
    if (req.file) updateData.photo = `/uploads/athletes/${req.file.filename}`;
    const athlete = await Athlete.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, athlete });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all athletes
router.get("/", async (req, res) => {
  const athletes = await Athlete.find();
  res.json(athletes);
});

module.exports = router;
