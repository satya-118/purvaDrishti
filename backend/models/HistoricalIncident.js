import mongoose from 'mongoose';

// HistoricalIncident Model: Archive of past disaster events in NER
const historicalIncidentSchema = new mongoose.Schema({
  date: { type: String, required: true },               // e.g. "2023-08-14"
  year: { type: Number, default: 2023 },
  district: { type: String, required: true },           // e.g. "Shimla"
  location: { type: String, required: true },           // e.g. "Summer Hill / Shiv Mandir"
  hazardType: { type: String, required: true },         // e.g. "Landslide & Flash Flood"
  severity: { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'], default: 'Critical' },
  rainfall: { type: Number, default: 165 },             // Rainfall in mm at time of event
  roadAffected: { type: String, default: 'Shimla-Kalka Rail & Highway link' },
  damage: { type: String, default: 'Extensive structural damage, major road blockage' },
  casualties: { type: Number, default: 12 },
  responseTime: { type: String, default: '45 mins (NDRF / SDRF)' },
  description: { type: String, default: 'Massive debris flow triggered by 48h cloudburst downpour.' }
}, { timestamps: true });

export default mongoose.model('HistoricalIncident', historicalIncidentSchema);
