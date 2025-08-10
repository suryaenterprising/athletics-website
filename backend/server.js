// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGO_URI } from './config.js'; // Don't import PORT from config, use process.env.PORT
import authRoutes from './routes/auth.js';
import competitionRoutes from './routes/competition.js';
import achievementRoutes from './routes/achievement.js';
import athleteRoutes from './routes/athletes.js';

const app = express();

// Middleware
app.use(express.json());

// Allow only your Vercel frontend
app.use(cors({
  origin: ["https://athletics-website.vercel.app/", "http://localhost:3000"],
  credentials: true
}));


// Routes
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

  // Use Render's PORT
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});
