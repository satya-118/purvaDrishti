import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Crosshair, Plus, Minus, CloudRain, Flame, AlertTriangle, Route } from 'lucide-react';
import { formatRainfall } from '../utils/formatters.js';

// Custom icons generator matching reference image
const createMapIcon = (htmlContent, size = 26) => {
  return L.divIcon({
    className: 'custom-map-icon',
    html: htmlContent,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

// Markers matching reference image
const icons = {
  criticalTriangle: createMapIcon(`
    <div style="width:28px;height:28px;border-radius:50%;background:#DC2626;border:2px solid #FFFFFF;box-shadow:0 2px 8px rgba(220,38,38,0.4);display:flex;align-items:center;justify-content:center;color:white;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    </div>
  `, 28),
  highTriangle: createMapIcon(`
    <div style="width:24px;height:24px;border-radius:50%;background:#EA580C;border:2px solid #FFFFFF;box-shadow:0 2px 6px rgba(234,88,12,0.4);display:flex;align-items:center;justify-content:center;color:white;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    </div>
  `, 24),
  rainStation: createMapIcon(`
    <div style="width:24px;height:24px;border-radius:50%;background:#2563EB;border:2px solid #FFFFFF;box-shadow:0 2px 6px rgba(37,99,235,0.4);display:flex;align-items:center;justify-content:center;color:white;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>
    </div>
  `, 24),
  fireRisk: createMapIcon(`
    <div style="width:24px;height:24px;border-radius:50%;background:#E11D48;border:2px solid #FFFFFF;box-shadow:0 2px 6px rgba(225,29,72,0.4);display:flex;align-items:center;justify-content:center;color:white;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
    </div>
  `, 24),
  roadIncident: createMapIcon(`
    <div style="width:24px;height:24px;border-radius:50%;background:#D97706;border:2px solid #FFFFFF;box-shadow:0 2px 6px rgba(217,119,6,0.4);display:flex;align-items:center;justify-content:center;color:white;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
    </div>
  `, 24)
};

function MapController() {
  const map = useMap();
  useEffect(() => {
    map.setView([26.2006, 92.9376], 7.5);
  }, [map]);
  return null;
}

export function MapView({ 
  districts = [], 
  roads = [], 
  drones = [], 
  fireRisks = [], 
  alerts = [], 
  onSelectDistrict = () => {}, 
  height = '480px' 
}) {
  const mapRef = useRef(null);

  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut();
  };

  const handleResetCenter = () => {
    if (mapRef.current) mapRef.current.setView([26.2006, 92.9376], 7.5);
  };

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-xl overflow-hidden select-none">
      
      {/* Leaflet Map */}
      <MapContainer
        center={[26.2006, 92.9376]}
        zoom={7.5} 
        ref={mapRef}
        style={{ height: '100%', width: '100%', minHeight: '460px' }}
        zoomControl={false}
      >
        <MapController />
        
        {/* Light geographic terrain tiles */}
        <TileLayer
          url="https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=cb1_2kyh_1_04ce1902ad036349dac0a0ac"
          attribution='&copy; PurvaDrishti'
        />

        {/* Concentric Heat Rings around Meghalaya / Cherrapunji (Critical Area) */}
        <CircleMarker
          center={[25.2986, 91.7314]}
          radius={55}
          pathOptions={{
            color: '#DC2626',
            fillColor: '#EF4444',
            fillOpacity: 0.15,
            weight: 1,
            dashArray: '4, 4'
          }}
        />
        <CircleMarker
          center={[25.2986, 91.7314]}
          radius={38}
          pathOptions={{
            color: '#DC2626',
            fillColor: '#DC2626',
            fillOpacity: 0.25,
            weight: 1.5
          }}
        />
        <CircleMarker
          center={[25.2986, 91.7314]}
          radius={22}
          pathOptions={{
            color: '#991B1B',
            fillColor: '#B91C1C',
            fillOpacity: 0.45,
            weight: 2
          }}
        />

        {/* Meghalaya Core Warning Marker */}
        <Marker position={[25.2986, 91.7314]} icon={icons.criticalTriangle}>
          <Popup>
            <div className="p-1 font-sans">
              <div className="font-bold text-[14px] text-[#DC2626] mb-1">East Khasi Hills: CRITICAL WARNING</div>
              <div className="text-[12px] text-[#4A534D]">Active flash-flood & high-velocity landslide vulnerability</div>
            </div>
          </Popup>
        </Marker>

        {/* Northeast Regional Risk & Landmark Markers */}
        <Marker position={[27.0844, 93.6053]} icon={icons.highTriangle} />
        <Marker position={[25.2750, 91.5822]} icon={icons.rainStation} />
        <Marker position={[26.1445, 91.7362]} icon={icons.rainStation} />
        <Marker position={[27.3389, 88.6065]} icon={icons.highTriangle} />
        <Marker position={[25.6751, 94.1086]} icon={icons.highTriangle} />
        <Marker position={[25.1833, 93.0167]} icon={icons.highTriangle} />
        <Marker position={[23.7271, 92.7176]} icon={icons.rainStation} />
        <Marker position={[23.8315, 91.2868]} icon={icons.fireRisk} />

      </MapContainer>

      {/* Top-Right Map Controls */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
        <button 
          onClick={handleResetCenter}
          title="Center Northeast Region"
          className="w-8 h-8 bg-white border border-[#E5E3D8] hover:bg-[#F5F4EE] rounded-lg shadow-sm flex items-center justify-center text-[#4A534D] transition-colors"
        >
          <Crosshair size={16} />
        </button>

        <div className="flex flex-col bg-white border border-[#E5E3D8] rounded-lg shadow-sm overflow-hidden">
          <button 
            onClick={handleZoomIn}
            title="Zoom in"
            className="w-8 h-8 flex items-center justify-center text-[#4A534D] hover:bg-[#F5F4EE] border-b border-[#E5E3D8] transition-colors"
          >
            <Plus size={16} />
          </button>
          <button 
            onClick={handleZoomOut}
            title="Zoom out"
            className="w-8 h-8 flex items-center justify-center text-[#4A534D] hover:bg-[#F5F4EE] transition-colors"
          >
            <Minus size={16} />
          </button>
        </div>
      </div>

      {/* Floating Bottom-Left Legend Card (Exact match to reference image) */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-sm border border-[#E5E3D8] rounded-xl p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-[11px] font-medium text-[#18211E] min-w-[150px]">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
            <span>Low Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]"></span>
            <span>Moderate Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]"></span>
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span>
            <span>Critical Risk</span>
          </div>
          <div className="border-t border-[#EAE8E1] my-0.5"></div>
          <div className="flex items-center gap-2">
            <CloudRain size={13} className="text-[#2563EB] shrink-0" />
            <span>Rainfall Station</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle size={12} className="text-[#DC2626] shrink-0" />
            <span>Landslide Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <Route size={12} className="text-[#D97706] shrink-0" />
            <span>Road Incident</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame size={12} className="text-[#E11D48] shrink-0" />
            <span>Fire Risk</span>
          </div>
        </div>
      </div>

      {/* Bottom-Right Scale Bar */}
      <div className="absolute bottom-4 right-4 z-[400] bg-white/90 backdrop-blur-sm px-2.5 py-1 border border-[#E5E3D8] rounded-lg shadow-sm flex flex-col items-center">
        <div className="w-20 h-1.5 border-b-2 border-l-2 border-r-2 border-[#18211E]"></div>
        <div className="flex justify-between w-20 text-[9px] text-[#4A534D] font-mono mt-0.5">
          <span>0</span>
          <span>25</span>
          <span>50 km</span>
        </div>
      </div>

    </div>
  );
}
