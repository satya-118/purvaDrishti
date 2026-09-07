import React from 'react';
import { Flame, Thermometer, Droplets, AlertTriangle, Wind } from 'lucide-react';
import { useData } from '../context/DataContext.jsx';

export function FireRiskPage() {
  const { fireRisks } = useData();

  const activeSmokeCount = fireRisks.filter(f => f.smokeDetected).length;
  const peakTemp = fireRisks.length > 0 ? Math.max(...fireRisks.map(f => f.temperatureC || 25)) : 34;
  const avgDryness = fireRisks.length > 0 
    ? Math.round(fireRisks.reduce((sum, f) => sum + (f.vegetationDrynessIndex || 0), 0) / fireRisks.length) 
    : 72;

  return (
    <div className="flex flex-col w-full max-w-[1560px] mx-auto space-y-6 pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[32px] font-bold text-[#18211E] tracking-tight leading-tight">
            Forest Fire & Thermal Hotspots
          </h1>
          <p className="text-[#7A827D] text-[13px] font-medium mt-0.5">
            Real-time forest floor flammability assessment based on needle dryness, ambient heat, wind velocity, and infrared telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl text-[12px] font-bold text-[#DC2626] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse"></span>
            <span>{activeSmokeCount} Active Smoke Anomalies</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0">
            <Flame size={20} className="text-[#EF4444]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">MONITORED PINE BELTS</span>
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">MONITORED FOREST BELTS</span>
            <span className="text-[26px] font-bold text-[#18211E] leading-tight">{fireRisks.length || 8}</span>
            <span className="text-[11px] font-medium text-[#7A827D]">Solan, Bilaspur, Mandi</span>
            <span className="text-[11px] font-medium text-[#7A827D]">Karbi Anglong, Dampa, Garo Hills</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-[#DC2626]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">THERMAL HOTSPOTS</span>
            <span className={`text-[26px] font-bold leading-tight ${activeSmokeCount > 0 ? 'text-[#DC2626]' : 'text-[#16A34A]'}`}>
              {activeSmokeCount}
            </span>
            <span className="text-[11px] font-medium text-[#7A827D]">FLIR infrared confirmed</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-full bg-[#FFF7ED] flex items-center justify-center shrink-0">
            <Thermometer size={20} className="text-[#EA580C]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">PEAK AMBIENT TEMP</span>
            <span className="text-[26px] font-bold text-[#18211E] leading-tight">{peakTemp}°C</span>
            <span className="text-[11px] font-medium text-[#7A827D]">Bilaspur scrub basin</span>
            <span className="text-[11px] font-medium text-[#7A827D]">Garo Hills Valley Basin</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-full bg-[#FEFCE8] flex items-center justify-center shrink-0">
            <Droplets size={20} className="text-[#D97706]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">AVG NEEDLE DRYNESS</span>
            <span className="text-[26px] font-bold text-[#18211E] leading-tight">{avgDryness}%</span>
            <span className="text-[11px] font-medium text-[#EA580C]">Fuel moisture deficit</span>
          </div>
        </div>
      </div>

      {/* Fire Risk Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {fireRisks.map((zone, idx) => {
          const isCritical = zone.severity === 'Critical';
          const isHigh = zone.severity === 'High';

          return (
            <div
              key={idx}
              className={`bg-white border rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all ${
                zone.smokeDetected ? 'border-[#DC2626] ring-1 ring-[#DC2626]/20' : 'border-[#EAE8E1] hover:border-[#2A5A44]'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-[15px] font-bold text-[#18211E]">{zone.zoneName}</h3>
                    <p className="text-[11px] text-[#7A827D] mt-0.5">District: <strong className="text-[#18211E]">{zone.district}</strong></p>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    isCritical 
                      ? 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]' 
                      : (isHigh ? 'bg-[#FFF7ED] border-[#FFEDD5] text-[#EA580C]' : 'bg-[#FEFCE8] border-[#FEF9C3] text-[#D97706]')
                  }`}>
                    {zone.riskScore}/100 ({zone.severity})
                  </span>
                </div>

                {/* Environmental Factors Grid */}
                <div className="grid grid-cols-2 gap-2 bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl mb-4 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A827D] flex items-center gap-1">
                      <Thermometer size={12} className="text-[#DC2626]" />
                      <span>Temp:</span>
                    </span>
                    <strong className="text-[#18211E]">{zone.temperatureC}°C</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A827D] flex items-center gap-1">
                      <Wind size={12} className="text-[#2563EB]" />
                      <span>Wind:</span>
                    </span>
                    <strong className="text-[#18211E]">{zone.windSpeedKmh} km/h</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A827D] flex items-center gap-1">
                      <Droplets size={12} className="text-[#2563EB]" />
                      <span>Humidity:</span>
                    </span>
                    <strong className="text-[#18211E]">{zone.humidityPct}%</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A827D] flex items-center gap-1">
                      <Flame size={12} className="text-[#E36B25]" />
                      <span>Dryness:</span>
                    </span>
                    <strong className="text-[#18211E]">{zone.vegetationDrynessIndex}%</strong>
                  </div>
                </div>

                {/* Status & Response */}
                <div className="space-y-2 text-[12px] mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#7A827D]">Smoke Signature:</span>
                    <span className={`font-bold flex items-center gap-1 ${zone.smokeDetected ? 'text-[#DC2626]' : 'text-[#16A34A]'}`}>
                      <span>{zone.smokeDetected ? 'YES - DETECTED' : 'None detected'}</span>
                      {zone.smokeDetected && <AlertTriangle size={13} className="text-[#DC2626]" />}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#7A827D]">Response Unit:</span>
                    <span className="text-[#18211E] font-medium">{zone.nearestResponseUnit}</span>
                  </div>

                  {/* Protocol */}
                  <div className="mt-2.5 bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl">
                    <div className="text-[10px] font-bold text-[#EA580C] uppercase tracking-wider mb-1">
                      Recommended Protocol:
                    </div>
                    <p className="text-[11px] text-[#4A534D] leading-relaxed">
                      {zone.recommendedAction}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FireRiskPage;
