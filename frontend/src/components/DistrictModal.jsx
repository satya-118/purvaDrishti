import React from 'react';
import { X, ShieldAlert, CloudRain, Mountain, Droplets, Waves, Plane, History } from 'lucide-react';
import { formatRainfall, formatNumber } from '../utils/formatters.js';

export function DistrictModal({ district, onClose }) {
  if (!district) return null;

  const breakdown = district.breakdown || {
    rainfallContribution: 25,
    slopeContribution: 16,
    elevationContribution: 10,
    historyContribution: 8,
    soilContribution: 8,
    riverContribution: 6,
    droneContribution: 5
  };

  const getSeverityStyle = (severity) => {
    switch(severity) {
      case 'Critical': return { bg: '#FEF2F2', border: '#FCA5A5', text: '#D94A3A' };
      case 'High': return { bg: '#FFF7ED', border: '#FDBA74', text: '#E36B25' };
      case 'Moderate': return { bg: '#FEFCE8', border: '#FDE047', text: '#D8A32A' };
      default: return { bg: '#ECFDF5', border: '#A7F3D0', text: '#10b981' };
    }
  };

  const sevStyle = getSeverityStyle(district.severity);

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-[#18211E]/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-[24px] w-full max-w-[600px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-start p-6 border-b border-[#E5E3D8] bg-[#F5F4EE]">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-[24px] font-serif font-bold text-[#18211E] m-0">{district.name} District</h2>
              <span 
                className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase border"
                style={{ backgroundColor: sevStyle.bg, borderColor: sevStyle.border, color: sevStyle.text }}
              >
                {district.severity} Risk ({district.riskScore}/100)
              </span>
            </div>
            <div className="text-[13px] text-[#6E756F]">
              Headquarters: <strong className="text-[#18211E]">{district.headquarters}</strong> | Coordinates: {district.coordinates?.latitude?.toFixed(2)}°N, {district.coordinates?.longitude?.toFixed(2)}°E
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E5E3D8] text-[#6E756F] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* Action Callout */}
          <div 
            className="p-4 rounded-xl mb-6 border"
            style={{ backgroundColor: sevStyle.bg, borderColor: sevStyle.border }}
          >
            <strong className="text-[13px] uppercase tracking-wider block mb-1" style={{ color: sevStyle.text }}>
              Recommended Emergency Protocol:
            </strong>
            <div className="text-[14px] text-[#18211E] font-medium">
              {district.recommendedAction}
            </div>
          </div>

          {/* Geological & Environmental Metrics Grid */}
          <h4 className="text-[11px] font-bold text-[#6E756F] uppercase tracking-wider mb-3">
            Key Risk Factors
          </h4>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[#F5F4EE] p-4 rounded-xl border border-[#E5E3D8]">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-[#6E756F] mb-1">
                <CloudRain size={16} className="text-[#4C89C7]" /> 24h Precipitation
              </div>
              <div className="text-[24px] font-bold text-[#18211E]">
                {formatRainfall(district.rainfall24h)}
              </div>
              <div className="text-[11px] text-[#6E756F]">Current: {district.currentRainfall || 0} mm/h</div>
            </div>

            <div className="bg-[#F5F4EE] p-4 rounded-xl border border-[#E5E3D8]">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-[#6E756F] mb-1">
                <Mountain size={16} className="text-[#E36B25]" /> Slope & Elevation
              </div>
              <div className="text-[24px] font-bold text-[#18211E]">
                {district.slope}° / {district.elevation}m
              </div>
              <div className="text-[11px] text-[#6E756F]">Terrain: {district.slope > 55 ? 'High gradient' : 'Moderate'}</div>
            </div>

            <div className="bg-[#F5F4EE] p-4 rounded-xl border border-[#E5E3D8]">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-[#6E756F] mb-1">
                <Droplets size={16} className="text-[#4C89C7]" /> Soil Saturation
              </div>
              <div className="text-[24px] font-bold text-[#18211E]">
                {district.soilSaturation}%
              </div>
              <div className="text-[11px] text-[#6E756F]">Hydraulic pore pressure index</div>
            </div>

            <div className="bg-[#F5F4EE] p-4 rounded-xl border border-[#E5E3D8]">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-[#6E756F] mb-1">
                <Waves size={16} className="text-[#4C89C7]" /> River Gorge Proximity
              </div>
              <div className="text-[24px] font-bold text-[#18211E]">
                {district.riverProximity}% Risk
              </div>
              <div className="text-[11px] text-[#6E756F]">Toe erosion vulnerability</div>
            </div>
          </div>

          {/* Formula Contribution Breakdown */}
          <h4 className="text-[11px] font-bold text-[#6E756F] uppercase tracking-wider mb-4">
            Explainable Formula Contributions (Total: {district.riskScore}/100)
          </h4>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between mb-1.5 text-[13px]">
                <span className="text-[#4A554E] font-medium">Rainfall Trigger (28% wt)</span>
                <strong className="text-[#18211E]">+{breakdown.rainfallContribution} pts</strong>
              </div>
              <div className="w-full h-2 bg-[#E5E3D8] rounded-full overflow-hidden">
                <div className="h-full bg-[#4C89C7] rounded-full" style={{ width: `${(breakdown.rainfallContribution / 28) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-[13px]">
                <span className="text-[#4A554E] font-medium">Slope Gradient (20% wt)</span>
                <strong className="text-[#18211E]">+{breakdown.slopeContribution} pts</strong>
              </div>
              <div className="w-full h-2 bg-[#E5E3D8] rounded-full overflow-hidden">
                <div className="h-full bg-[#E36B25] rounded-full" style={{ width: `${(breakdown.slopeContribution / 20) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-[13px]">
                <span className="text-[#4A554E] font-medium">Elevation & Geology (14% wt)</span>
                <strong className="text-[#18211E]">+{breakdown.elevationContribution} pts</strong>
              </div>
              <div className="w-full h-2 bg-[#E5E3D8] rounded-full overflow-hidden">
                <div className="h-full bg-[#789177] rounded-full" style={{ width: `${(breakdown.elevationContribution / 14) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#E5E3D8] bg-[#F5F4EE] flex justify-end">
          <button 
            className="px-5 py-2.5 bg-white border border-[#E5E3D8] text-[#18211E] hover:bg-[#E5E3D8] rounded-xl font-semibold text-[13px] transition-colors shadow-sm"
            onClick={onClose}
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
