import mongoose from 'mongoose';

// District Model: Stores geographic and disaster risk parameters for each of the NER districts
const districtSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  headquarters: { type: String, default: '' },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  // Rainfall metrics (in millimeters)
  currentRainfall: { type: Number, default: 0 },
  rainfall1h: { type: Number, default: 0 },
  rainfall6h: { type: Number, default: 0 },
  rainfall24h: { type: Number, default: 0 },
  rainfallAnomaly: { type: Number, default: 0 }, // Percentage difference from seasonal normal
  
  // Geological & Environmental Risk Factors (0 - 100 scale)
  slope: { type: Number, default: 45 },              // Slope steepness in degrees / index
  elevation: { type: Number, default: 1500 },        // Elevation in meters
  soilSaturation: { type: Number, default: 50 },     // Soil moisture saturation %
  riverProximity: { type: Number, default: 50 },     // Proximity to river basin risk (0-100)
  droneEvidence: { type: Number, default: 20 },      // Drone visual movement detection (0-100)
  historicalIncidentCount: { type: Number, default: 5 },
  
  // Calculated Risk Output
  riskScore: { type: Number, default: 25 },
  severity: { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'], default: 'Low' },
  recommendedAction: { type: String, default: 'Continue standard weather monitoring.' },
  
  // Demographics
  populationAtRisk: { type: Number, default: 50000 }
}, { timestamps: true });

export default mongoose.model('District', districtSchema);
