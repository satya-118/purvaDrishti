import express from 'express';
import FieldReport from '../models/FieldReport.js';
import mongoose from 'mongoose';

const router = express.Router();

// Fallback array when no real DB connection exists
let inMemoryReports = [];

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: inMemoryReports });
    }
    const reports = await FieldReport.find().sort({ createdAt: -1 });
    res.json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch field reports', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newReportData = req.body;
    if (mongoose.connection.readyState !== 1) {
      const newReport = { _id: 'report_' + Date.now(), createdAt: new Date(), ...newReportData };
      inMemoryReports.unshift(newReport);
      return res.status(201).json({ success: true, data: newReport });
    }
    const newReport = await FieldReport.create(newReportData);
    res.status(201).json({ success: true, data: newReport });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit field report', error: error.message });
  }
});

export default router;

