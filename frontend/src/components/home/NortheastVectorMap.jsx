import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export function NortheastVectorMap({ onSelectDistrict }) {
  // Plotted locations across Northeast India with approximate coordinates
  const mapPoints = [
    {
      id: 'cherrapunji-station',
      name: 'Cherrapunji Meteorological Observatory',
      region: 'Meghalaya',
      type: 'rainfall-station',
      lat: 25.2702,
      lng: 91.7323,
      risk: 'Above Threshold (142 mm / 24h)',
      info: 'Extreme monsoonal downpour saturated upper soil mantle',
      severity: 'Critical'
    },
    {
      id: 'shillong-slide',
      name: 'Shillong Peak & Bypass Ridge',
      region: 'Meghalaya',
      type: 'landslide-location',
      lat: 25.5788,
      lng: 91.8933,
      risk: 'High (78/100)',
      info: 'Fissures reported on vulnerable road escarpment',
      severity: 'High'
    },
    {
      id: 'guwahati-basin',
      name: 'Guwahati Brahmaputra Gauging Station',
      region: 'Assam',
      type: 'rainfall-station',
      lat: 26.1445,
      lng: 91.7362,
      risk: 'High Runoff',
      info: 'River level 0.8m above danger mark; embankment watch active',
      severity: 'High'
    },
    {
      id: 'itanagar-slope',
      name: 'Itanagar Papum Pare Corridor',
      region: 'Arunachal Pradesh',
      type: 'landslide-location',
      lat: 27.0844,
      lng: 93.6053,
      risk: 'Elevated Risk',
      info: 'Slope debris movement reported on Trans-Arunachal Highway',
      severity: 'Moderate'
    },
    {
      id: 'kohima-warning',
      name: 'Kohima Bypass Slip Zone',
      region: 'Nagaland',
      type: 'warning-alert',
      lat: 25.6751,
      lng: 94.1086,
      risk: 'Active Warning',
      info: 'Continuous telemetry displacement detected by geophones',
      severity: 'Critical'
    },
    {
      id: 'imphal-slide',
      name: 'NH-37 Imphal–Jiribam Lifeline',
      region: 'Manipur',
      type: 'landslide-location',
      lat: 24.8170,
      lng: 93.9368,
      risk: 'High Watch',
      info: 'Mudflow cleared; single lane operational with caution',
      severity: 'High'
    },
    {
      id: 'aizawl-warning',
      name: 'Aizawl Hunthar Slip Zone',
      region: 'Mizoram',
      type: 'warning-alert',
      lat: 23.7271,
      lng: 92.7176,
      risk: 'Elevated Warning',
      info: 'Hillside subsidence monitored across urban slope zones',
      severity: 'High'
    },
    {
      id: 'agartala-station',
      name: 'Howrah River Met Basin',
      region: 'Tripura',
      type: 'rainfall-station',
      lat: 23.8315,
      lng: 91.2868,
      risk: 'Moderate',
      info: 'Precipitation 48 mm; surface drainage stable',
      severity: 'Moderate'
    },
    {
      id: 'gangtok-slide',
      name: 'NH-10 Sevoke–Gangtok Corridor',
      region: 'Sikkim',
      type: 'landslide-location',
      lat: 27.3314,
      lng: 88.6138,
      risk: 'Moderate Watch',
      info: 'Shooting stone warnings flagged along Teesta river cuts',
      severity: 'Moderate'
    }
  ];

  // Helper to determine circle color based on type
  const getColor = (type) => {
    switch (type) {
      case 'rainfall-station':
        return '#2563EB'; // Blue
      case 'landslide-location':
        return '#EA580C'; // Orange
      case 'warning-alert':
        return '#DC2626'; // Red
      default:
        return '#10B981'; // Green
    }
  };

  return (
    <div className="relative w-full h-[470px] md:h-[530px] rounded-2xl md:rounded-3xl border border-[#DCD8CA] overflow-hidden shadow-xs z-0">
      <MapContainer 
        center={[25.5, 92.5]} 
        zoom={6} 
        scrollWheelZoom={false} 
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {mapPoints.map((pt) => (
          <CircleMarker
            key={pt.id}
            center={[pt.lat, pt.lng]}
            radius={8}
            pathOptions={{ 
              fillColor: getColor(pt.type), 
              color: '#fff', 
              weight: 1.5,
              fillOpacity: 0.8
            }}
            eventHandlers={{
              click: () => onSelectDistrict && onSelectDistrict({ name: pt.region })
            }}
          >
            <Popup className="rounded-xl">
              <div className="font-bold flex flex-col gap-1 pb-1 mb-1">
                <span className="text-sm">{pt.name}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold text-white inline-block w-fit ${pt.severity === 'Critical' ? 'bg-red-600' : 'bg-amber-600'}`}>
                  {pt.region}
                </span>
              </div>
              <div className="text-[12px] leading-relaxed mt-2 text-gray-700">
                {pt.info}
              </div>
              <div className="text-[11px] font-medium text-gray-500 mt-1">
                Risk: {pt.risk}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default NortheastVectorMap;
