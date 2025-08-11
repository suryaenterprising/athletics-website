// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());

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

app.options(/^.*$/, cors());

/**
 * Debug loader: dynamically import & mount route modules so we can find the bad one.
 */
async function loadRoutesSafely(app) {
  const routesToLoad = [
    { path: '/api/auth', file: './routes/auth.js' },
    { path: '/api/competitions', file: './routes/competition.js' },
    { path: '/api/achievements', file: './routes/achievement.js' },
    { path: '/api/athletes', file: './routes/athletes.js' },
    { path: '/api/records', file: './routes/records.js' }
  ];

  for (const r of routesToLoad) {
    try {
      console.log(`Importing ${r.file} ...`);
      const mod = await import(r.file);
      console.log(` → Imported ${r.file}`);
      if (!mod || !mod.default) {
        console.log(` → No default export in ${r.file}, skipping mount.`);
        continue;
      }
      console.log(`Mounting ${r.path} from ${r.file} ...`);
      app.use(r.path, mod.default);
      console.log(` ✓ Mounted ${r.path}`);
    } catch (err) {
      console.error(`\n*** Error importing or mounting ${r.file} (for ${r.path}) ***`);
      console.error(err && err.stack ? err.stack : err);
      process.exit(1);
    }
  }
}

app.get("/", (req, res) => {
  res.send("Backend for IIT Indore Athletics Club is running ✅");
});

(async () => {
  await loadRoutesSafely(app);

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
