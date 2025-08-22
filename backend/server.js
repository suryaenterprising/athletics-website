import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://athletics-website-nu.vercel.app",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
import authRoutes from "./routes/auth.js";
import competitionRoutes from "./routes/competition.js";
import achievementRoutes from "./routes/achievement.js";
import athleteRoutes from "./routes/athletes.js";
import recordRoutes from "./routes/records.js";

app.use("/api/auth", authRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/athletes", athleteRoutes);
app.use("/api/records", recordRoutes);

app.get("/", (req, res) => {
  res.send("Backend for IIT Indore Athletics Club is running ✅");
});

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Startup error:", error);
    process.exit(1);
  }
})();
