// HIM-Guard Emergency Simulation Engine
// Simulates the impact of sudden excess rainfall (e.g. Cloudburst drill, +50mm, +100mm)
// across NER districts, roads, and active alerts.

import { seedDistricts, seedRoads } from '../data/seedData.js';
import { calculateLandslideRisk, getSeverityAndAction } from './riskEngine.js';

/**
 * Runs a multi-district rainfall disaster simulation.
 * 
 * @param {number} extraMm - Added rainfall in millimeters (e.g., 25, 50, 100, 150)
 * @param {string} targetDistrict - 'all' or specific district name
 * @param {Array} currentDistricts - Optional current district dataset
 * @param {Array} currentRoads - Optional current road dataset
 * @returns {object} Simulation report with before/after comparisons and triggered alerts
 */
export function runRainfallSimulation(extraMm = 50, targetDistrict = 'all', currentDistricts = null, currentRoads = null) {
  const inputExtraMm = Math.max(0, Number(extraMm) || 0);
  const districts = currentDistricts && currentDistricts.length ? currentDistricts : seedDistricts;
  const roads = currentRoads && currentRoads.length ? currentRoads : seedRoads;

  const isAll = !targetDistrict || targetDistrict.toLowerCase() === 'all';
  const targetLower = targetDistrict ? targetDistrict.toLowerCase() : 'all';

  // 1. Recalculate Districts
  const simulatedDistricts = districts.map((district) => {
    const isTarget = isAll || district.name.toLowerCase() === targetLower;
    const addedRain = isTarget ? inputExtraMm : 0;
    const simulated24h = Math.round((district.rainfall24h || 0) + addedRain);

    // Soil saturation increases with additional rainfall
    const addedSaturation = Math.round(addedRain * 0.3);
    const simulatedSaturation = Math.min(100, (district.soilSaturation || 50) + addedSaturation);

    // Drone evidence factor increases if rainfall is high
    const simulatedDroneEvidence = Math.min(100, (district.droneEvidence || 20) + (addedRain > 40 ? 25 : 10));

    // Calculate new risk using explainable formula
    const riskResult = calculateLandslideRisk({
      rainfall24h: simulated24h,
      slope: district.slope,
      elevation: district.elevation,
      historicalCount: district.historicalIncidentCount,
      soilSaturation: simulatedSaturation,
      riverProximity: district.riverProximity,
      droneEvidence: simulatedDroneEvidence
    });

    return {
      name: district.name,
      headquarters: district.headquarters,
      coordinates: district.coordinates,
      originalRainfall24h: district.rainfall24h,
      simulatedRainfall24h: simulated24h,
      addedRainfallMm: addedRain,
      originalRiskScore: district.riskScore,
      simulatedRiskScore: riskResult.riskScore,
      scoreDelta: riskResult.riskScore - district.riskScore,
      originalSeverity: district.severity,
      simulatedSeverity: riskResult.severity,
      recommendedAction: riskResult.recommendedAction,
      soilSaturation: simulatedSaturation,
      riskBreakdown: riskResult.breakdown
    };
  });

  // 2. Recalculate Roads
  const simulatedRoads = roads.map((road) => {
    const matchingDistrict = simulatedDistricts.find(d => d.name.toLowerCase() === road.district.toLowerCase());
    const districtDelta = matchingDistrict ? matchingDistrict.scoreDelta : 0;
    
    const simulatedRoadRisk = Math.min(100, Math.max(0, Math.round(road.riskScore + (districtDelta * 0.7))));
    let simulatedStatus = road.status;
    let simulatedAction = road.action;

    if (simulatedRoadRisk >= 85) {
      simulatedStatus = 'Blocked';
      simulatedAction = 'CRITICAL: Total road closure due to active debris flow & mudslide threat.';
    } else if (simulatedRoadRisk >= 65) {
      simulatedStatus = 'Restricted';
      simulatedAction = 'CAUTION: Single lane operation with pilot convoy only.';
    } else if (simulatedRoadRisk >= 45) {
      simulatedStatus = 'Caution';
      simulatedAction = 'Proceed with headlights and 20 km/h speed limit.';
    } else {
      simulatedStatus = 'Open';
    }

    return {
      name: road.name,
      district: road.district,
      location: road.location,
      coordinates: road.coordinates,
      originalRiskScore: road.riskScore,
      simulatedRiskScore: simulatedRoadRisk,
      originalStatus: road.status,
      simulatedStatus,
      simulatedAction,
      hazard: road.hazard
    };
  });

  // 3. Generate Simulated Triggered Alerts
  const triggeredAlerts = [];
  simulatedDistricts.forEach((d) => {
    if (d.simulatedSeverity === 'Critical' && d.originalSeverity !== 'Critical') {
      triggeredAlerts.push({
        title: `CRITICAL SIMULATION ALERT: Cloudburst Warning in ${d.name}`,
        hazardType: 'Flash Flood',
        severity: 'Critical',
        riskScore: d.simulatedRiskScore,
        district: d.name,
        location: `${d.name} Catchment & Valley Slopes`,
        cause: `Simulated surge: 24h rainfall escalated to ${d.simulatedRainfall24h} mm (+${d.addedRainfallMm} mm)`,
        action: `Sound village sirens, initiate immediate hillside evacuation, halt highway transport.`
      });
    } else if (d.simulatedSeverity === 'High' && d.originalSeverity === 'Moderate') {
      triggeredAlerts.push({
        title: `HIGH SIMULATION ADVISORY: Landslide Escalation in ${d.name}`,
        hazardType: 'Landslide',
        severity: 'High',
        riskScore: d.simulatedRiskScore,
        district: d.name,
        location: `${d.name} Mountain Corridor`,
        cause: `Soil saturation reached ${d.soilSaturation}% under +${d.addedRainfallMm} mm excess precipitation`,
        action: `Mobilize quick response teams and pre-position earthmovers.`
      });
    }
  });

  // 4. Before & After Summary Statistics
  const originalCriticalCount = districts.filter(d => d.severity === 'Critical').length;
  const simulatedCriticalCount = simulatedDistricts.filter(d => d.simulatedSeverity === 'Critical').length;
  const originalHighCount = districts.filter(d => d.severity === 'High').length;
  const simulatedHighCount = simulatedDistricts.filter(d => d.simulatedSeverity === 'High').length;
  
  const originalBlockedRoads = roads.filter(r => r.status === 'Blocked').length;
  const simulatedBlockedRoads = simulatedRoads.filter(r => r.simulatedStatus === 'Blocked').length;

  return {
    extraMm: inputExtraMm,
    targetDistrict: isAll ? 'All NER' : targetDistrict,
    summary: {
      criticalDistrictsBefore: originalCriticalCount,
      criticalDistrictsAfter: simulatedCriticalCount,
      highDistrictsBefore: originalHighCount,
      highDistrictsAfter: simulatedHighCount,
      blockedRoadsBefore: originalBlockedRoads,
      blockedRoadsAfter: simulatedBlockedRoads,
      newTriggeredAlertsCount: triggeredAlerts.length,
      averageRiskIncrease: Math.round(
        simulatedDistricts.reduce((acc, d) => acc + d.scoreDelta, 0) / simulatedDistricts.length
      )
    },
    simulatedDistricts,
    simulatedRoads,
    triggeredAlerts,
    narrative: `Under an emergency scenario with +${inputExtraMm}mm additional rainfall, ${simulatedCriticalCount} districts reach Critical status (up from ${originalCriticalCount}). An estimated ${simulatedBlockedRoads} major highway corridors will face complete blockage, requiring immediate mobilization of NDRF and SDRF rescue battalions.`
  };
}
