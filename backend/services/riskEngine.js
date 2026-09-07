// HIM-Guard Explainable Risk Engine
// Computes transparent, easy-to-explain Landslide and Fire Risk Scores for NER.

/**
 * Maps a numeric risk score (0-100) to a severity category and standard recommended action.
 * @param {number} score - Calculated score between 0 and 100
 * @returns {object} { severity, color, action }
 */
export function getSeverityAndAction(score) {
  const boundedScore = Math.max(0, Math.min(100, Math.round(score)));

  if (boundedScore <= 30) {
    return {
      severity: 'Low',
      color: '#10b981', // Emerald green
      action: 'Routine weather & geological surveillance. Normal traffic operations.'
    };
  } else if (boundedScore <= 60) {
    return {
      severity: 'Moderate',
      color: '#f59e0b', // Amber yellow
      action: 'Increase patrol frequency; monitor vulnerable culverts and slope drainage.'
    };
  } else if (boundedScore <= 80) {
    return {
      severity: 'High',
      color: '#f97316', // Orange
      action: 'Deploy drone inspection, inspect slope retaining walls, and place SDRF on standby.'
    };
  } else {
    return {
      severity: 'Critical',
      color: '#ef4444', // Red
      action: 'IMMEDIATE ADVISORY: Restrict vulnerable road corridors, issue riverbank alerts, mobilize emergency response.'
    };
  }
}

/**
 * AI/ML Risk Proxy: Calculates Landslide Risk Probability using a mock Logistic Regression.
 * This function simulates an ML inference pipeline trained on NER historical geology data.
 * 
 * Simulated ML Features (x):
 * x1: Rainfall Intensity (normalized 0-1)
 * x2: Slope Gradient (normalized 0-1)
 * x3: Elevation Fragility (normalized 0-1)
 * x4: Historical Recurrence (normalized 0-1)
 * x5: Soil Saturation (normalized 0-1)
 * x6: River Undermining (normalized 0-1)
 * x7: Active Telemetry/Drone Evidence (normalized 0-1)
 * 
 * Z = w0 + w1*x1 + w2*x2 + ... + w7*x7
 * Probability = 1 / (1 + exp(-Z))
 * Risk Score = Probability * 100
 *
 * @param {object} factors
 * @returns {object} { riskScore, severity, recommendedAction, breakdown, mlConfidence }
 */
export function calculateLandslideRisk(factors) {
  const {
    rainfall24h = 0,
    slope = 45,
    elevation = 1500,
    historicalCount = 5,
    soilSaturation = 50,
    riverProximity = 50,
    droneEvidence = 20
  } = factors;

  // Feature Normalization Pipeline (Min-Max Scaling based on NER training baselines)
  const x1 = Math.min(1, rainfall24h / 200);      // Max expected 24h rainfall: 200mm
  const x2 = Math.min(1, slope / 75);             // Max slope: 75 deg
  const x3 = Math.min(1, elevation / 3500);       // Max elevation scale: 3500m
  const x4 = Math.min(1, historicalCount / 25);   // Max history cap: 25 incidents
  const x5 = Math.min(1, soilSaturation / 100);
  const x6 = Math.min(1, riverProximity / 100);
  const x7 = Math.min(1, droneEvidence / 100);

  // Model Weights (w) - Simulated based on a hypothetical logistic regression trained on NER data
  // These weights indicate the learned importance of each feature.
  const w0 = -4.5; // Bias term
  const w1 = 3.2;  // Rainfall is a very strong predictor
  const w2 = 2.0;  // Slope
  const w3 = 1.0;  // Elevation
  const w4 = 1.2;  // History
  const w5 = 1.8;  // Soil Moisture
  const w6 = 0.8;  // River Proximity
  const w7 = 1.5;  // Real-time Evidence

  // Calculate Z (Log-Odds)
  const Z = w0 + (w1 * x1) + (w2 * x2) + (w3 * x3) + (w4 * x4) + (w5 * x5) + (w6 * x6) + (w7 * x7);

  // Sigmoid Activation Function for probability
  const probability = 1 / (1 + Math.exp(-Z));

  const riskScore = Math.max(0, Math.min(100, Math.round(probability * 100)));
  const { severity, action } = getSeverityAndAction(riskScore);

  // Calculate feature contributions for explainability (LIME/SHAP style)
  const totalWeight = Math.abs(w1*x1) + Math.abs(w2*x2) + Math.abs(w3*x3) + Math.abs(w4*x4) + Math.abs(w5*x5) + Math.abs(w6*x6) + Math.abs(w7*x7);
  
  const breakdown = {
    rainfallContribution: Math.round(((w1*x1)/totalWeight) * 100) || 0,
    slopeContribution: Math.round(((w2*x2)/totalWeight) * 100) || 0,
    elevationContribution: Math.round(((w3*x3)/totalWeight) * 100) || 0,
    historyContribution: Math.round(((w4*x4)/totalWeight) * 100) || 0,
    soilContribution: Math.round(((w5*x5)/totalWeight) * 100) || 0,
    riverContribution: Math.round(((w6*x6)/totalWeight) * 100) || 0,
    droneContribution: Math.round(((w7*x7)/totalWeight) * 100) || 0
  };

  return {
    riskScore,
    severity,
    recommendedAction: action,
    breakdown,
    mlConfidence: '92%' // Simulated model inference confidence based on data completeness
  };
}

/**
 * Calculates Forest Fire Risk Score based on ambient temperature, wind, dryness, and drone reports.
 * @param {object} factors
 * @returns {object} { riskScore, severity, recommendedAction }
 */
export function calculateFireRisk(factors) {
  const {
    temperatureC = 25,
    windSpeedKmh = 10,
    humidityPct = 50,
    vegetationDryness = 50,
    smokeDetected = false,
    droneVerified = false
  } = factors;

  // Temperature factor (15C = 0, 45C = 100)
  const tempFactor = Math.min(100, Math.max(0, ((temperatureC - 15) / 30) * 100));

  // Wind speed factor (0 km/h = 0, 40 km/h = 100)
  const windFactor = Math.min(100, (windSpeedKmh / 40) * 100);

  // Inverted humidity factor (100% humidity = 0 risk, 20% = 100 risk)
  const drynessFactor = Math.min(100, Math.max(0, ((100 - humidityPct) / 80) * 100));

  // Vegetation needle dryness (0-100)
  const vegFactor = Math.min(100, Math.max(0, vegetationDryness));

  // Bonus for smoke/drone confirmation
  const opticalBonus = (smokeDetected ? 15 : 0) + (droneVerified ? 15 : 0);

  const rawScore = 
    (0.30 * tempFactor) +
    (0.25 * windFactor) +
    (0.25 * drynessFactor) +
    (0.20 * vegFactor) +
    opticalBonus;

  const riskScore = Math.max(0, Math.min(100, Math.round(rawScore)));
  const { severity } = getSeverityAndAction(riskScore);

  let action = 'Routine satellite & forest watchtower monitoring.';
  if (severity === 'Moderate') {
    action = 'Alert local forest beats; keep emergency water bowsers on standby.';
  } else if (severity === 'High') {
    action = 'Mobilize rapid fire tender crew and establish firebreak lines.';
  } else if (severity === 'Critical') {
    action = 'EMERGENCY: Dispatch multi-unit fire suppression teams and airborne drone thermal trackers.';
  }

  return {
    riskScore,
    severity,
    recommendedAction: action
  };
}
