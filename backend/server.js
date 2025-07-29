const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoutes = require("./routes/authRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const competitionRoutes = require("./routes/competitionRoutes");
const athleteRoutes = require("./routes/athleteRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/athletes", athleteRoutes);

// ✅ Connect to MongoDB using simplified syntax (Mongoose 7+)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
