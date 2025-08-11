// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGO_URI } from './config.js'; // MONGO_URI from config
import authRoutes from './routes/auth.js';
import competitionRoutes from './routes/competition.js';
import achievementRoutes from './routes/achievement.js';
import athleteRoutes from './routes/athletes.js';
import recordsRoutes from './routes/records.js';

const app = express();

// Middleware
app.use(express.json());

// ✅ Fixed CORS (removed trailing slash) + allow preflight
app.use(cors({
  origin: [
    "https://athletics-website.vercel.app", // no trailing slash
    "http://localhost:3000"
  ],
  credentials: true
}));
app.options('/*', cors()); // handle OPTIONS requests globally

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/athletes', athleteRoutes);
app.use('/api/records', recordsRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend for IIT Indore Athletics Club is running');
});

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  // These options are now optional, but won't hurt if you remove them
})
.then(() => {
  console.log('MongoDB connected successfully');

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});
