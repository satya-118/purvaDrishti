import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';

// Route imports
import districtRoutes from './routes/districtRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import landslideRoutes from './routes/landslideRoutes.js';
import roadRoutes from './routes/roadRoutes.js';
import droneRoutes from './routes/droneRoutes.js';
import fireRoutes from './routes/fireRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import historicalRoutes from './routes/historicalRoutes.js';
import simulationRoutes from './routes/simulationRoutes.js';
import fieldReportRoutes from './routes/fieldReportRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Status & Welcome Route
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    system: 'PurvaDrishti Disaster Monitoring & Early-Warning API (NER)',
    version: '1.0.0',
    endpoints: {
      districts: '/api/districts',
      rainfall: '/api/rainfall',
      landslides: '/api/landslides',
      roads: '/api/roads',
      drones: '/api/drones',
      fire: '/api/fire',
      alerts: '/api/alerts',
      historicalIncidents: '/api/historical-incidents',
      simulation: '/api/simulation'
    }
  });
});

// Mount Routes
app.use('/api/districts', districtRoutes);
app.use('/api/rainfall', weatherRoutes);
app.use('/api/landslides', landslideRoutes);
app.use('/api/risk', landslideRoutes);
app.use('/api/roads', roadRoutes);
app.use('/api/drones', droneRoutes);
app.use('/api/fire', fireRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/historical-incidents', historicalRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/reports', fieldReportRoutes);

// 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route '${req.originalUrl}' not found.`
  });
});

// Serve frontend in production
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('PurvaDrishti API is running...');
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack || err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log('====================================================');
    console.log(`  PurvaDrishti Backend Server running on port ${PORT}`);
    console.log(`  Healthcheck: http://localhost:${PORT}/api`);
    console.log('====================================================');
  });
}

startServer();
