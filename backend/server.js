// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import competitionRoutes from "./routes/competition.js";
import achievementRoutes from "./routes/achievement.js";
import athleteRoutes from "./routes/athletes.js";
import recordsRoutes from "./routes/records.js";

// Load env variables
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const app = express();

// Middleware
app.use(express.json());

// ✅ Proper CORS setup — use "*" or specific domains without wild regex
const allowedOrigins = [
  "https://athletics-website.vercel.app",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Handle preflight for all routes
app.options("*", cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/athletes", athleteRoutes);
app.use("/api/records", recordsRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Backend for IIT Indore Athletics Club is running ✅");
});

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });
