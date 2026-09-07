import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Settings, Plus, Minus, Crosshair, CloudRain, AlertTriangle, Route, Flame } from 'lucide-react';

// Custom HTML Markers matching the PurvaDrishti design system
const createMapIcon = (htmlContent, size = 26) => {
  return L.divIcon({
    className: 'pd-leaflet-marker',
    html: htmlContent,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

// Markers matching design language
const mapIcons = {
  criticalTriangle: createMapIcon(`
    <div style="width:28px;height:28px;border-radius:50%;background:#DC2626;border:2.5px solid #FFFFFF;box-shadow:0 2px 8px rgba(220,38,38,0.45);display:flex;align-items:center;justify-content:center;color:white;cursor:pointer;animation:pulse-marker 2s infinite;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    </div>
  `, 28),

  highTriangle: createMapIcon(`
    <div style="width:24px;height:24px;border-radius:50%;background:#EA580C;border:2px solid #FFFFFF;box-shadow:0 2px 6px rgba(234,88,12,0.4);display:flex;align-items:center;justify-content:center;color:white;cursor:pointer;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    </div>
  `, 24),

  rainStation: createMapIcon(`
    <div style="width:24px;height:24px;border-radius:50%;background:#2563EB;border:2px solid #FFFFFF;box-shadow:0 2px 6px rgba(37,99,235,0.4);display:flex;align-items:center;justify-content:center;color:white;cursor:pointer;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>
    </div>
  `, 24),

  fireRisk: createMapIcon(`
    <div style="width:24px;height:24px;border-radius:50%;background:#E11D48;border:2px solid #FFFFFF;box-shadow:0 2px 6px rgba(225,29,72,0.4);display:flex;align-items:center;justify-content:center;color:white;cursor:pointer;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
    </div>
  `, 24),

  roadIncident: createMapIcon(`
    <div style="width:24px;height:24px;border-radius:50%;background:#18211E;border:2px solid #FFFFFF;box-shadow:0 2px 6px rgba(24,33,30,0.35);display:flex;align-items:center;justify-content:center;color:#D97706;cursor:pointer;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19 8.5 5h7L20 19"/><path d="M12 8v2"/><path d="M12 14v2"/></svg>
    </div>
  `, 24)
};

// Map controller centered on Northeast India
function MapController() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    map.setView([26.2006, 92.9376], 7.5);
  }, [map]);
  return null;
}

export function LiveSituationMap({ onSelectDistrict }) {
  const mapRef = useRef(null);
  const [activeLayers, setActiveLayers] = useState({
    rainfall: true,
    landslide: true,
    road: true,
    fire: true
  });
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Real geographical places across Northeast India
  const realPlaceMarkers = [
    {
      id: 'shillong-escarpment',
      name: 'Shillong Ridge & Mawsynram Escarpment',
      district: 'East Khasi Hills',
      coords: [25.2986, 91.7314],
      type: 'criticalTriangle',
      category: 'landslide',
      risk: 'Critical Warning (84/100)',
      info: 'Active slope fissures and rapid saturated runoff along the southern plateau cliffs',
      severity: 'Critical'
    },
    {
      id: 'cherrapunji-met-station',
      name: 'Cherrapunji High-Altitude Met Gauge',
      district: 'East Khasi Hills',
      coords: [25.2750, 91.5822],
      type: 'rainStation',
      category: 'rainfall',
      risk: '148 mm / 3hr',
      info: 'Heavy precipitation event; soil shear threshold exceeded',
      severity: 'High'
    },
    {
      id: 'itanagar-pass-corridor',
      name: 'Itanagar–Banderdewa Highway (NH-415)',
      district: 'Papum Pare',
      coords: [27.0844, 93.6053],
      type: 'highTriangle',
      category: 'landslide',
      risk: 'High Landslide Risk',
      info: 'Continuous slope creep and roadside boulder movements flagged by radar',
      severity: 'High'
    },
    {
      id: 'guwahati-kamrup-station',
      name: 'Kamrup Escarpment Station',
      district: 'Kamrup Metro',
      coords: [26.1445, 91.7362],
      type: 'highTriangle',
      category: 'landslide',
      risk: 'Moderate Watch',
      info: 'Brahmaputra hill slope stability sensors monitoring alluvial bedrock',
      severity: 'High'
    },
    {
      id: 'dima-hasao-nh27',
      name: 'Dima Hasao Mountain Corridor (NH-27)',
      district: 'Dima Hasao',
      coords: [25.1833, 93.0167],
      type: 'roadIncident',
      category: 'road',
      risk: 'Restricted Transit',
      info: 'Single lane operational after mudflow clearance; emergency repair crews on site',
      severity: 'Critical'
    },
    {
      id: 'gangtok-nathula-section',
      name: 'Gangtok–Nathula Corridor (JLN Marg)',
      district: 'East Sikkim',
      coords: [27.3389, 88.6065],
      type: 'highTriangle',
      category: 'landslide',
      risk: 'High Altitude Slip Watch',
      info: 'Telemetry sensors tracking soil saturation in steep mountain pass',
      severity: 'High'
    },
    {
      id: 'kohima-bypass-ridge',
      name: 'Kohima Mountain Ridge Node',
      district: 'Kohima',
      coords: [25.6751, 94.1086],
      type: 'highTriangle',
      category: 'landslide',
      risk: 'Moderate Risk',
      info: 'Active inclinometers monitoring retaining wall displacement on NH-29',
      severity: 'Moderate'
    },
    {
      id: 'aizawl-ridge-station',
      name: 'Aizawl Ridge Doppler Station',
      district: 'Aizawl',
      coords: [23.7271, 92.7176],
      type: 'rainStation',
      category: 'rainfall',
      risk: 'Normal Rain (22 mm)',
      info: 'Precipitation within standard seasonal baseline',
      severity: 'Low'
    },
    {
      id: 'imphal-valley-station',
      name: 'Imphal Valley Telemetry Station',
      district: 'Imphal West',
      coords: [24.8170, 93.9368],
      type: 'rainStation',
      category: 'rainfall',
      risk: 'Normal Hydrology',
      info: 'River basin telemetry stable across all monitoring channels',
      severity: 'Low'
    },
    {
      id: 'agartala-foothills-node',
      name: 'West Tripura Sensor Node',
      district: 'West Tripura',
      coords: [23.8315, 91.2868],
      type: 'fireRisk',
      category: 'fire',
      risk: 'Normal Biomass',
      info: 'Thermal index low; moderate relative humidity',
      severity: 'Low'
    }
  ];

  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut();
  };

  const handleCenterNE = () => {
    if (mapRef.current) mapRef.current.setView([26.2006, 92.9376], 7.5);
  };

  return (
    <div className="bg-white border border-[#EAE8E1] rounded-[20px] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col h-full select-none relative">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[#F0EFEA]">
        <div>
          <h2 className="font-serif text-[19px] sm:text-[21px] font-bold text-[#18211E] tracking-tight">
            Live Situation Map
          </h2>
          <p className="text-[12px] sm:text-[12.5px] text-[#6E756F] font-medium">
            Current risk conditions across Northeast India
          </p>
        </div>

        {/* Top-Right Map Controls */}
        <div className="flex items-center gap-2">
          {/* Layer Filter Menu */}
          <div className="relative">
            <button
              onClick={() => setShowLayerMenu(prev => !prev)}
              className="w-8 h-8 rounded-xl bg-white border border-[#E5E3D8] hover:bg-[#FAF9F5] text-[#4A534D] flex items-center justify-center shadow-xs transition-colors"
              title="Toggle Map Layers"
            >
              <Settings size={15} />
            </button>

            {showLayerMenu && (
              <div className="absolute right-0 top-10 w-44 bg-white border border-[#EAE8E1] rounded-xl shadow-lg p-2.5 z-[1000] text-[11px] font-medium text-[#18211E] space-y-1.5 animate-in fade-in">
                <div className="font-bold text-[10px] uppercase tracking-wider text-[#8E958F] pb-1 border-b border-[#F0EFEA]">
                  Filter Telemetry Layers
                </div>
                <label className="flex items-center gap-2 cursor-pointer py-0.5">
                  <input
                    type="checkbox"
                    checked={activeLayers.rainfall}
                    onChange={(e) => setActiveLayers(l => ({ ...l, rainfall: e.target.checked }))}
                    className="rounded text-[#234E3B] focus:ring-0"
                  />
                  <span>Rainfall Stations</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer py-0.5">
                  <input
                    type="checkbox"
                    checked={activeLayers.landslide}
                    onChange={(e) => setActiveLayers(l => ({ ...l, landslide: e.target.checked }))}
                    className="rounded text-[#234E3B] focus:ring-0"
                  />
                  <span>Landslide Warnings</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer py-0.5">
                  <input
                    type="checkbox"
                    checked={activeLayers.road}
                    onChange={(e) => setActiveLayers(l => ({ ...l, road: e.target.checked }))}
                    className="rounded text-[#234E3B] focus:ring-0"
                  />
                  <span>Road Incidents</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer py-0.5">
                  <input
                    type="checkbox"
                    checked={activeLayers.fire}
                    onChange={(e) => setActiveLayers(l => ({ ...l, fire: e.target.checked }))}
                    className="rounded text-[#234E3B] focus:ring-0"
                  />
                  <span>Fire Risk Zones</span>
                </label>
              </div>
            )}
          </div>

          {/* Reset / Locate Northeast Center */}
          <button
            onClick={handleCenterNE}
            className="w-8 h-8 rounded-xl bg-white border border-[#E5E3D8] hover:bg-[#FAF9F5] text-[#4A534D] flex items-center justify-center shadow-xs transition-colors"
            title="Center Northeast Region"
          >
            <Crosshair size={15} />
          </button>

          {/* Zoom In & Out Controls */}
          <div className="flex items-center bg-white border border-[#E5E3D8] rounded-xl shadow-xs overflow-hidden">
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 flex items-center justify-center text-[#4A534D] hover:bg-[#FAF9F5] border-r border-[#E5E3D8] transition-colors"
              title="Zoom In"
            >
              <Plus size={14} />
            </button>
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 flex items-center justify-center text-[#4A534D] hover:bg-[#FAF9F5] transition-colors"
              title="Zoom Out"
            >
              <Minus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Leaflet Map Container */}
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[490px] rounded-2xl border border-[#E2DED2] overflow-hidden">
        <MapContainer
          center={[26.2006, 92.9376]}
          zoom={7.5}
          minZoom={6}
          maxZoom={14}
          ref={mapRef}
          zoomControl={false}
          className="w-full h-full"
          style={{ width: '100%', height: '100%', background: '#F2EFE8' }}
        >
          <MapController />

          {/* Clean, light CartoDB Voyager raster tiles */}
          <TileLayer
            url="https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=cb1_2kyh_1_04ce1902ad036349dac0a0ac"
          />

          {/* Concentric Heat Halo over Meghalaya (Critical Risk Area) */}
          <CircleMarker
            center={[25.2986, 91.7314]}
            radius={65}
            pathOptions={{
              color: '#DC2626',
              fillColor: '#E36B25',
              fillOpacity: 0.14,
              weight: 1,
              dashArray: '4, 4'
            }}
          />
          <CircleMarker
            center={[25.2986, 91.7314]}
            radius={42}
            pathOptions={{
              color: '#DC2626',
              fillColor: '#EA580C',
              fillOpacity: 0.25,
              weight: 1.5
            }}
          />
          <CircleMarker
            center={[25.2986, 91.7314]}
            radius={22}
            pathOptions={{
              color: '#991B1B',
              fillColor: '#DC2626',
              fillOpacity: 0.45,
              weight: 2
            }}
          />

          {/* Amber Heat Aura over Itanagar / Arunachal Ridge */}
          <CircleMarker
            center={[27.0844, 93.6053]}
            radius={38}
            pathOptions={{
              color: '#D8A32A',
              fillColor: '#D8A32A',
              fillOpacity: 0.2,
              weight: 1.2
            }}
          />

          {/* Real Place Interactive Markers */}
          {realPlaceMarkers
            .filter(m => activeLayers[m.category])
            .map(marker => (
              <Marker
                key={marker.id}
                position={marker.coords}
                icon={mapIcons[marker.type]}
                eventHandlers={{
                  click: () => onSelectDistrict && onSelectDistrict({ name: marker.district })
                }}
              >
                <Popup className="pd-leaflet-popup">
                  <div className="p-1 font-sans select-none min-w-[190px]">
                    <div className="flex items-center justify-between gap-2 pb-1 mb-1 border-b border-[#EAE8E1]">
                      <strong className="text-[13px] text-[#18211E]">{marker.name}</strong>
                      <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold uppercase ${
                        marker.severity === 'Critical' ? 'bg-[#FEF2F2] text-[#DC2626]' : (marker.severity === 'High' ? 'bg-[#FFF7ED] text-[#E36B25]' : 'bg-[#EAF3EE] text-[#1E4D38]')
                      }`}>
                        {marker.risk}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#6E756F] leading-snug">
                      {marker.info}
                    </div>
                    <div className="mt-1.5 pt-1 border-t border-[#F0EFEA] text-[10px] text-[#1E4D38] font-semibold flex items-center justify-between">
                      <span>District: {marker.district}</span>
                      <span className="cursor-pointer hover:underline">Inspect Details →</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>

        {/* Floating Legend Card (Bottom-Left) matching design */}
        <div className="absolute bottom-3.5 left-3.5 z-[400] bg-white/95 backdrop-blur-sm border border-[#E5E3D8] rounded-xl p-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-[11px] font-medium text-[#18211E] min-w-[145px]">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
              <span>Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D8A32A]"></span>
              <span>Moderate Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E36B25]"></span>
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D94A3A]"></span>
              <span>Critical Risk</span>
            </div>
            <div className="border-t border-[#EAE8E1] my-0.5"></div>
            <div className="flex items-center gap-2 text-[#4A534D]">
              <CloudRain size={13} className="text-[#2563EB] shrink-0" />
              <span className="text-[10.5px]">Rainfall Station</span>
            </div>
            <div className="flex items-center gap-2 text-[#4A534D]">
              <AlertTriangle size={12} className="text-[#DC2626] shrink-0" />
              <span className="text-[10.5px]">Landslide Risk</span>
            </div>
            <div className="flex items-center gap-2 text-[#4A534D]">
              <Route size={12} className="text-[#18211E] shrink-0" />
              <span className="text-[10.5px]">Road Incident</span>
            </div>
            <div className="flex items-center gap-2 text-[#4A534D]">
              <Flame size={12} className="text-[#E11D48] shrink-0" />
              <span className="text-[10.5px]">Fire Risk</span>
            </div>
          </div>
        </div>

        {/* Distance Scale Bar (Bottom-Right) */}
        <div className="absolute bottom-3.5 right-3.5 z-[400] bg-white/90 backdrop-blur-sm px-2.5 py-1 border border-[#E5E3D8] rounded-lg shadow-xs flex flex-col items-center">
          <div className="w-20 h-1.5 border-b-2 border-l-2 border-r-2 border-[#18211E]"></div>
          <div className="flex justify-between w-20 text-[9px] text-[#4A534D] font-mono mt-0.5">
            <span>0</span>
            <span>50</span>
            <span>100 km</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LiveSituationMap;
