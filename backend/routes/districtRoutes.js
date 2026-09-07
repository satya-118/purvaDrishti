import express from 'express';
import mongoose from 'mongoose';
import District from '../models/District.js';
import { inMemoryStore } from '../data/store.js';
import { calculateLandslideRisk } from '../services/riskEngine.js';

const router = express.Router();

// GET /api/districts - List all NER districts with live risk calculations
router.get('/', async (req, res) => {
  try {
    let districts;

    if (mongoose.connection.readyState === 1) {
      districts = await District.find().lean();
      if (!districts || districts.length === 0) {
        districts = inMemoryStore.getDistricts();
      }
    } else {
      districts = inMemoryStore.getDistricts();
    }

    // Ensure up-to-date risk score calculations
    const updatedDistricts = districts.map((district) => {
      const risk = calculateLandslideRisk({
        rainfall24h: district.rainfall24h,
        slope: district.slope,
        elevation: district.elevation,
        historicalCount: district.historicalIncidentCount,
        soilSaturation: district.soilSaturation,
        riverProximity: district.riverProximity,
        droneEvidence: district.droneEvidence
      });

      return {
        ...district,
        riskScore: risk.riskScore,
        severity: risk.severity,
        recommendedAction: district.recommendedAction || risk.recommendedAction,
        breakdown: risk.breakdown
      };
    });

    res.json({
      success: true,
      count: updatedDistricts.length,
      data: updatedDistricts
    });
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch districts', error: error.message });
  }
});

// GET /api/districts/:name - Get a single district by name
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    let district;

    if (mongoose.connection.readyState === 1) {
      district = await District.findOne({ name: new RegExp(`^${name}$`, 'i') }).lean();
      if (!district) {
        district = inMemoryStore.getDistrictByName(name);
      }
    } else {
      district = inMemoryStore.getDistrictByName(name);
    }

    if (!district) {
      return res.status(404).json({ success: false, message: `District '${name}' not found` });
    }

    const risk = calculateLandslideRisk({
      rainfall24h: district.rainfall24h,
      slope: district.slope,
      elevation: district.elevation,
      historicalCount: district.historicalIncidentCount,
      soilSaturation: district.soilSaturation,
      riverProximity: district.riverProximity,
      droneEvidence: district.droneEvidence
    });

    res.json({
      success: true,
      data: {
        ...district,
        riskScore: risk.riskScore,
        severity: risk.severity,
        breakdown: risk.breakdown
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch district', error: error.message });
  }
});

export default router;
