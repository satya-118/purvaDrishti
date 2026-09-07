import express from 'express';
import mongoose from 'mongoose';
import Road from '../models/Road.js';
import { inMemoryStore } from '../data/store.js';

const router = express.Router();

// GET /api/roads - Get all vulnerable road segments in NER
router.get('/', async (req, res) => {
  try {
    let roads;

    if (mongoose.connection.readyState === 1) {
      roads = await Road.find().sort({ riskScore: -1 }).lean();
      if (!roads || roads.length === 0) {
        roads = inMemoryStore.getRoads();
      }
    } else {
      roads = inMemoryStore.getRoads();
    }

    // Summary counts
    const blockedCount = roads.filter(r => r.status === 'Blocked').length;
    const restrictedCount = roads.filter(r => r.status === 'Restricted').length;
    const cautionCount = roads.filter(r => r.status === 'Caution').length;
    const openCount = roads.filter(r => r.status === 'Open').length;

    res.json({
      success: true,
      summary: {
        totalVulnerableRoads: roads.length,
        blocked: blockedCount,
        restricted: restrictedCount,
        caution: cautionCount,
        open: openCount
      },
      data: roads
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch roads', error: error.message });
  }
});

// PUT /api/roads/:name/status - Update road status (Open, Restricted, Blocked, Caution)
router.put('/:name/status', async (req, res) => {
  try {
    const { name } = req.params;
    const { status, action, inspection } = req.body;

    const updates = {};
    if (status) updates.status = status;
    if (action) updates.action = action;
    if (inspection) updates.inspection = inspection;
    updates.lastInspection = 'Just now (Authority Override)';

    let updatedRoad;

    if (mongoose.connection.readyState === 1) {
      updatedRoad = await Road.findOneAndUpdate(
        { name: new RegExp(`^${name}$`, 'i') },
        { $set: updates },
        { new: true }
      );
    }

    // Also update in-memory store
    const storeRoad = inMemoryStore.updateRoadStatus(name, updates);
    if (!updatedRoad) updatedRoad = storeRoad;

    if (!updatedRoad) {
      return res.status(404).json({ success: false, message: `Road '${name}' not found` });
    }

    res.json({
      success: true,
      message: `Road '${name}' status updated to ${status || updatedRoad.status}`,
      data: updatedRoad
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update road status', error: error.message });
  }
});

export default router;
