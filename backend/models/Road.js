import mongoose from 'mongoose';

// Road Model: Tracks vulnerable highway corridors and mountain passes in NER
const roadSchema = new mongoose.Schema({
  name: { type: String, required: true },           // e.g. "NH-05 Hindustan-Tibet Highway"
  district: { type: String, required: true },       // e.g. "Kinnaur"
  location: { type: String, required: true },       // e.g. "Nigulsari Slide Zone"
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  riskScore: { type: Number, default: 40 },         // 0 - 100
  hazard: { type: String, default: 'Landslide & Shooting Stones' },
  status: { 
    type: String, 
    enum: ['Open', 'Restricted', 'Blocked', 'Caution'], 
    default: 'Open' 
  },
  inspection: { 
    type: String, 
    enum: ['Completed', 'Pending', 'In Progress', 'Scheduled'], 
    default: 'Pending' 
  },
  droneInspectionStatus: { type: String, default: 'Drone patrol scheduled' },
  lastInspection: { type: String, default: 'Today, 08:30 AM' },
  action: { type: String, default: 'Maintain one-lane regulated traffic.' },
  lengthKm: { type: Number, default: 45 }
}, { timestamps: true });

export default mongoose.model('Road', roadSchema);
