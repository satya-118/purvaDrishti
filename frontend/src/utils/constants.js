// Constants for PurvaDrishti (Northeast India Regional Intelligence)

export const NORTHEAST_CENTER = [26.2006, 92.9376];
export const REGIONAL_CENTER = [26.2006, 92.9376];
export const DEFAULT_MAP_ZOOM = 7.5;

export const NORTHEAST_STATES = [
  { name: 'Assam', lat: 26.2006, lng: 92.9376, capital: 'Dispur' },
  { name: 'Meghalaya', lat: 25.5788, lng: 91.8933, capital: 'Shillong' },
  { name: 'Arunachal Pradesh', lat: 27.0844, lng: 93.6053, capital: 'Itanagar' },
  { name: 'Sikkim', lat: 27.3389, lng: 88.6065, capital: 'Gangtok' },
  { name: 'Nagaland', lat: 25.6751, lng: 94.1086, capital: 'Kohima' },
  { name: 'Manipur', lat: 24.8170, lng: 93.9368, capital: 'Imphal' },
  { name: 'Mizoram', lat: 23.7271, lng: 92.7176, capital: 'Aizawl' },
  { name: 'Tripura', lat: 23.8315, lng: 91.2868, capital: 'Agartala' }
];

export const SEVERITY_COLORS = {
  Low: '#10b981',       // Emerald Green
  Moderate: '#f59e0b',  // Amber Yellow
  High: '#f97316',      // Orange
  Critical: '#ef4444'   // Crimson Red
};

export const SEVERITY_BG = {
  Low: 'rgba(16, 185, 129, 0.15)',
  Moderate: 'rgba(245, 158, 11, 0.15)',
  High: 'rgba(249, 115, 22, 0.15)',
  Critical: 'rgba(239, 68, 68, 0.2)'
};

export const ROAD_STATUS_COLORS = {
  Open: '#10b981',
  Caution: '#f59e0b',
  Restricted: '#f97316',
  Blocked: '#ef4444'
};
