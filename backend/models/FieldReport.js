import mongoose from 'mongoose';

const fieldReportSchema = new mongoose.Schema({
  reporterId: { type: String, default: 'anonymous' },
  reporterRole: { type: String, enum: ['Citizen', 'Field Officer', 'NDRF Personnel'], default: 'Citizen' },
  category: { 
    type: String, 
    enum: ['Crack Observation', 'Slope Movement', 'Blocked Road', 'Waterlogging', 'Other'],
    required: true 
  },
  severity: { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'], default: 'Moderate' },
  description: { type: String, required: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  district: { type: String, required: true },
  mediaUrl: { type: String, default: '' }, // Path or base64 placeholder for geo-tagged photo/video
  syncedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Verified', 'Resolved'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('FieldReport', fieldReportSchema);

