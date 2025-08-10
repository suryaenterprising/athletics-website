// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const authRoutes = require("./routes/authRoutes");
// const achievementRoutes = require("./routes/achievementRoutes");
// const competitionRoutes = require("./routes/competitionRoutes");
// const athleteRoutes = require("./routes/athleteRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/achievements", achievementRoutes);
// app.use("/api/competitions", competitionRoutes);
// app.use("/api/athletes", athleteRoutes);

// // ✅ Connect to MongoDB using simplified syntax (Mongoose 7+)
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT || 5000, () =>
//       console.log(`✅ Server running on port ${process.env.PORT || 5000}`)
//     );
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

//   app.use("/uploads", express.static("uploads")); // Serve images
// app.use("/api/athletes", require("./routes/athletes"));

// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGO_URI, PORT } from './config.js';
import authRoutes  from './routes/auth.js';
import competitionRoutes  from './routes/competition.js';
import achievementRoutes  from './routes/achievement.js';
import athleteRoutes  from './routes/athletes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // Adjust cors options if needed
app.use('/api/auth', authRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/athletes', athleteRoutes);
// Test route
app.get('/', (req, res) => {
  res.send('Backend for IIT Indore Athletics Club is running');
});

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
  // Start server after DB connects
  app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});