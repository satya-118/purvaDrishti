// PurvaDrishti API Client
// Handles all HTTP requests to Express Backend with error handling and fallback support.

const API_BASE = '/api';

// Generic Fetch Wrapper
async function request(endpoint, options = {}) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    const response = await fetch(`${API_BASE}${endpoint}`, config);
    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.message || `HTTP ${response.status}: Request failed`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`[API Client] Error on ${endpoint}:`, error.message);
    throw error;
  }
}

// 1. Districts
export async function getDistricts() {
  const res = await request('/districts');
  return res.data || [];
}

export async function getDistrictByName(name) {
  const res = await request(`/districts/${name}`);
  return res.data;
}

// 2. Rainfall & Weather
export async function getRainfallSummary() {
  const res = await request('/rainfall');
  return res;
}

export async function getDistrictRainfall(districtName) {
  const res = await request(`/rainfall/${districtName}`);
  return res.data;
}

// 3. Landslide Risk
export async function getLandslides() {
  const res = await request('/landslides');
  return res;
}

export async function calculateCustomRisk(factors) {
  const res = await request('/landslides/custom-calculate', {
    method: 'POST',
    body: JSON.stringify(factors)
  });
  return res.data;
}

// 4. Roads
export async function getRoads() {
  const res = await request('/roads');
  return res;
}

export async function updateRoadStatus(roadName, updates) {
  const res = await request(`/roads/${encodeURIComponent(roadName)}/status`, {
    method: 'PUT',
    body: JSON.stringify(updates)
  });
  return res.data;
}

// 5. Drones
export async function getDrones() {
  const res = await request('/drones');
  return res;
}

export async function dispatchDrone(droneId, missionData) {
  const res = await request(`/drones/${droneId}/dispatch`, {
    method: 'POST',
    body: JSON.stringify(missionData)
  });
  return res.data;
}

// 6. Fire Risk
export async function getFireRisks() {
  const res = await request('/fire');
  return res;
}

// 7. Alerts
export async function getAlerts(params = {}) {
  const query = new URLSearchParams();
  if (params.severity) query.append('severity', params.severity);
  if (params.isResolved !== undefined) query.append('isResolved', params.isResolved);
  
  const endpoint = `/alerts${query.toString() ? `?${query.toString()}` : ''}`;
  const res = await request(endpoint);
  return res;
}

export async function createAlert(alertData) {
  const res = await request('/alerts', {
    method: 'POST',
    body: JSON.stringify(alertData)
  });
  return res.data;
}

export async function updateAlertStatus(alertId, updates) {
  const res = await request(`/alerts/${alertId}`, {
    method: 'PUT',
    body: JSON.stringify(updates)
  });
  return res.data;
}

export async function deleteAlert(alertId) {
  const res = await request(`/alerts/${alertId}`, {
    method: 'DELETE'
  });
  return res;
}

// 8. Historical Incidents
export async function getHistoricalIncidents(params = {}) {
  const query = new URLSearchParams();
  if (params.district) query.append('district', params.district);
  if (params.hazardType) query.append('hazardType', params.hazardType);
  if (params.year) query.append('year', params.year);
  if (params.search) query.append('search', params.search);

  const endpoint = `/historical-incidents${query.toString() ? `?${query.toString()}` : ''}`;
  const res = await request(endpoint);
  return res;
}

export async function getHistoricalStats() {
  const res = await request('/historical-incidents/stats');
  return res.data;
}

// 9. Simulation
export async function runSimulation(extraMm = 50, targetDistrict = 'all') {
  const res = await request('/simulation', {
    method: 'POST',
    body: JSON.stringify({ extraMm, targetDistrict })
  });
  return res.data;
}
