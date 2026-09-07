import dotenv from 'dotenv';
import mongoose from 'mongoose';
import District from './models/District.js';
import Road from './models/Road.js';
import Alert from './models/Alert.js';
import Drone from './models/Drone.js';
import FireRisk from './models/FireRisk.js';
import HistoricalIncident from './models/HistoricalIncident.js';
import {
  seedDistricts,
  seedRoads,
  seedAlerts,
  seedDrones,
  seedFireRisks,
  seedHistoricalIncidents
} from './data/seedData.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/him_guard';

async function seedDatabase() {
  console.log('========================================================');
  console.log('       PurvaDrishti Database Seeder - NER Region        ');
  console.log('========================================================');

  try {
    console.log(`Connecting to MongoDB at: ${MONGODB_URI}...`);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully.\n');

    // 1. Seed Districts
    await District.deleteMany({});
    const insertedDistricts = await District.insertMany(seedDistricts);
    console.log(`[✓] Seeded ${insertedDistricts.length} NER Districts`);

    // 2. Seed Roads
    await Road.deleteMany({});
    const insertedRoads = await Road.insertMany(seedRoads);
    console.log(`[✓] Seeded ${insertedRoads.length} High-Risk Highway Corridors`);

    // 3. Seed Alerts
    await Alert.deleteMany({});
    const insertedAlerts = await Alert.insertMany(seedAlerts);
    console.log(`[✓] Seeded ${insertedAlerts.length} Disaster Alerts`);

    // 4. Seed Drones
    await Drone.deleteMany({});
    const insertedDrones = await Drone.insertMany(seedDrones);
    console.log(`[✓] Seeded ${insertedDrones.length} Aerial Surveillance Drones`);

    // 5. Seed Fire Risks
    await FireRisk.deleteMany({});
    const insertedFire = await FireRisk.insertMany(seedFireRisks);
    console.log(`[✓] Seeded ${insertedFire.length} Forest Fire Vulnerability Zones`);

    // 6. Seed Historical Incidents
    await HistoricalIncident.deleteMany({});
    const insertedHistory = await HistoricalIncident.insertMany(seedHistoricalIncidents);
    console.log(`[✓] Seeded ${insertedHistory.length} Historical Disaster Records`);

    console.log('\n[SUCCESS] Database populated with full NER disaster monitoring dataset!');
    process.exit(0);
  } catch (error) {
    console.error('\n[ERROR] Seeding failed:', error.message);
    console.log('Note: If MongoDB server is not running locally, the PurvaDrishti backend will automatically use its built-in in-memory demo dataset.');
    process.exit(1);
  }
}

seedDatabase();
