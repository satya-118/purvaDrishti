import React, { useState, useEffect } from 'react';
import { Activity, ArrowRight, ShieldAlert, CloudRain, AlertTriangle, Route, ShieldCheck, RefreshCw } from 'lucide-react';
import { runSimulation } from '../api/client.js';
import { formatRainfall } from '../utils/formatters.js';
import { useData } from '../context/DataContext.jsx';

export function SimulationPage() {
  const { districts } = useData();

  const [extraMm, setExtraMm] = useState(50);
  const [targetDistrict, setTargetDistrict] = useState('all');
  const [loading, setLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  // Run simulation on load or parameter change
  const executeSimulation = async (mmValue, districtValue) => {
    try {
      setLoading(true);
      const res = await runSimulation(mmValue, districtValue);
      setSimulationResult(res);
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeSimulation(extraMm, targetDistrict);
  }, []);

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setExtraMm(val);
    executeSimulation(val, targetDistrict);
  };

  const handlePreset = (val) => {
    setExtraMm(val);
    executeSimulation(val, targetDistrict);
  };

  const handleDistrictChange = (e) => {
    const val = e.target.value;
    setTargetDistrict(val);
    executeSimulation(extraMm, val);
  };

  const summary = simulationResult?.summary || {
    criticalDistrictsBefore: 3,
    criticalDistrictsAfter: 7,
    blockedRoadsBefore: 2,
    blockedRoadsAfter: 5,
    newTriggeredAlertsCount: 4,
    averageRiskIncrease: 16
  };

  const presets = [
    { label: 'Baseline Normal (+0 mm)', value: 0 },
    { label: 'Moderate Rain (+30 mm)', value: 30 },
    { label: 'Heavy Downpour (+60 mm)', value: 60 },
    { label: 'Flash Cloudburst (+100 mm)', value: 100 },
    { label: 'Extreme Catastrophe (+150 mm)', value: 150 }
  ];

  return (
    <div className="flex flex-col w-full max-w-[1560px] mx-auto space-y-6 pb-12 select-none">
      
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[32px] sm:text-[36px] font-bold text-[#18211E] tracking-tight leading-tight flex items-center gap-3">
            <span>Emergency Rainfall Surge & Simulation</span>
          </h1>
          <p className="text-[#6E756F] text-[13.5px] font-medium mt-0.5 max-w-3xl">
            Simulate cloudburst events and extreme precipitation scenarios to visualize instant risk escalation across vulnerable mountain districts and highway corridors.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 bg-[#EAF3EE] border border-[#C6E2D0] px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1E4D38] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span>Simulation Engine Live</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Simulation Control Console */}
      <div className="bg-white border border-[#EAE8E1] rounded-[22px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col space-y-5">
        
        {/* Console Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0EFEA]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EAF3EE] text-[#1E4D38] flex items-center justify-center">
              <CloudRain size={18} strokeWidth={2.2} />
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#18211E]">
                Excess Rainfall Parameter (<code className="text-[#1E4D38] font-mono text-[13px]">extraMm</code>)
              </div>
              <div className="text-[11.5px] text-[#6E756F] font-medium">
                Adjust precipitation volume to evaluate cascade triggers
              </div>
            </div>
          </div>

          {/* Scope Selector */}
          <div className="flex items-center gap-2.5">
            <span className="text-[12px] font-semibold text-[#6E756F]">Target Scope:</span>
            <select
              className="bg-[#FAF9F5] border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[13px] font-semibold text-[#18211E] outline-none focus:border-[#234E3B] transition-colors"
              value={targetDistrict}
              onChange={handleDistrictChange}
            >
              <option value="all">All Regional Sectors (Northeast Drill)</option>
              {districts.map(d => (
                <option key={d.name} value={d.name}>{d.name} District</option>
              ))}
            </select>
          </div>
        </div>

        {/* Range Slider & Value Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-1">
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="180"
              step="5"
              value={extraMm}
              onChange={handleSliderChange}
              className="w-full h-2.5 bg-[#EFEEE7] rounded-lg appearance-none cursor-pointer accent-[#234E3B]"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#8E958F] mt-1.5">
              <span>0 mm (Normal)</span>
              <span>+60 mm (Downpour)</span>
              <span>+120 mm (Cloudburst)</span>
              <span>+180 mm (Extreme)</span>
            </div>
          </div>

          <div className="flex items-center justify-center shrink-0">
            <div className="px-5 py-2.5 rounded-2xl bg-[#EAF3EE] border border-[#C6E2D0] text-[#1E4D38] font-extrabold text-[20px] font-mono shadow-xs">
              +{extraMm} mm
            </div>
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F0EFEA]">
          <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#8E958F] mr-1">
            Presets:
          </span>
          {presets.map((p) => {
            const isActive = extraMm === p.value;
            return (
              <button
                key={p.value}
                onClick={() => handlePreset(p.value)}
                className={`px-3.5 py-1.5 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1E4D38] text-white shadow-xs'
                    : 'bg-[#FAF9F5] border border-[#E5E3D8] text-[#4A534D] hover:bg-[#EAF3EE] hover:text-[#1E4D38]'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* 3. Before vs After Impact KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Critical Districts */}
        <div className="bg-white border border-[#EAE8E1] rounded-[18px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center shrink-0">
            <AlertTriangle size={22} strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10.5px] font-bold text-[#6E756F] uppercase tracking-wider">
              Critical Districts (Score &gt; 80)
            </span>
            <div className="text-[24px] font-extrabold text-[#DC2626] leading-tight my-0.5 flex items-center gap-2">
              <span>{summary.criticalDistrictsBefore}</span>
              <ArrowRight size={18} className="text-[#8E958F]" />
              <span>{summary.criticalDistrictsAfter}</span>
            </div>
            <span className="text-[11.5px] font-semibold text-[#DC2626]">
              +{summary.criticalDistrictsAfter - summary.criticalDistrictsBefore} escalated to Red
            </span>
          </div>
        </div>

        {/* KPI 2: Blocked Highways */}
        <div className="bg-white border border-[#EAE8E1] rounded-[18px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF8F2] text-[#E36B25] flex items-center justify-center shrink-0">
            <Route size={22} strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10.5px] font-bold text-[#6E756F] uppercase tracking-wider">
              Blocked Highways
            </span>
            <div className="text-[24px] font-extrabold text-[#E36B25] leading-tight my-0.5 flex items-center gap-2">
              <span>{summary.blockedRoadsBefore}</span>
              <ArrowRight size={18} className="text-[#8E958F]" />
              <span>{summary.blockedRoadsAfter}</span>
            </div>
            <span className="text-[11.5px] font-medium text-[#6E756F]">
              Corridors closed by debris
            </span>
          </div>
        </div>

        {/* KPI 3: Triggered Early Warnings */}
        <div className="bg-white border border-[#EAE8E1] rounded-[18px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
            <Activity size={22} strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10.5px] font-bold text-[#6E756F] uppercase tracking-wider">
              Triggered Warnings
            </span>
            <div className="text-[24px] font-extrabold text-[#2563EB] leading-tight my-0.5">
              +{summary.newTriggeredAlertsCount}
            </div>
            <span className="text-[11.5px] font-medium text-[#6E756F]">
              Automatic siren triggers
            </span>
          </div>
        </div>

        {/* KPI 4: Risk Score Surge */}
        <div className="bg-white border border-[#EAE8E1] rounded-[18px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#1E4D38] flex items-center justify-center shrink-0">
            <ShieldCheck size={22} strokeWidth={2.2} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10.5px] font-bold text-[#6E756F] uppercase tracking-wider">
              Average Risk Surge
            </span>
            <div className="text-[24px] font-extrabold text-[#1E4D38] leading-tight my-0.5">
              +{summary.averageRiskIncrease} pts
            </div>
            <span className="text-[11.5px] font-medium text-[#6E756F]">
              Statewide geological shift
            </span>
          </div>
        </div>

      </div>

      {/* 4. Executive Narrative Summary */}
      {simulationResult?.narrative && (
        <div className="bg-[#F4F9F6] border border-[#C6E2D0] rounded-[20px] p-5 sm:p-6 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3EE] text-[#1E4D38] flex items-center justify-center shrink-0 mt-0.5">
            <ShieldAlert size={20} strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <div className="text-[14px] font-bold text-[#1E4D38] mb-1">
              Executive Simulation Assessment
            </div>
            <div className="text-[13.5px] text-[#2C3E35] leading-relaxed font-medium">
              {simulationResult.narrative}
            </div>
          </div>
        </div>
      )}

      {/* 5. Triggered Emergency Alerts (if any) */}
      {simulationResult?.triggeredAlerts && simulationResult.triggeredAlerts.length > 0 && (
        <div className="bg-white border border-[#EAE8E1] rounded-[22px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0EFEA]">
            <div className="flex items-center gap-2 text-[#DC2626] font-bold text-[15px]">
              <AlertTriangle size={18} strokeWidth={2.2} />
              <span>Automatically Triggered Emergency Alerts ({simulationResult.triggeredAlerts.length})</span>
            </div>
            <span className="text-[12px] text-[#6E756F]">Dynamic advisories generated by simulated cloudburst</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {simulationResult.triggeredAlerts.map((alert, idx) => (
              <div
                key={idx}
                className="bg-[#FEF7F6] border border-[#FDD8D5] rounded-[16px] p-4 flex flex-col justify-between space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-[#18211E] text-[13.5px]">
                    {alert.title}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#DC2626] text-white">
                    Risk {alert.riskScore}
                  </span>
                </div>
                <div className="text-[12px] text-[#6E756F]">
                  <strong className="text-[#4A534D]">Cause:</strong> {alert.cause}
                </div>
                <div className="text-[11.5px] text-[#1E4D38] font-semibold pt-1 border-t border-[#FDD8D5]/60">
                  <strong>Protocol:</strong> {alert.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Side-by-Side 12 Districts Impact Comparison Table */}
      <div className="bg-white border border-[#EAE8E1] rounded-[22px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0EFEA]">
          <div>
            <h3 className="font-serif text-[19px] sm:text-[21px] font-bold text-[#18211E]">
              Regional Sectors Before vs After Simulation Telemetry
            </h3>
            <p className="text-[12px] text-[#6E756F] font-medium">
              Instant recalculation across all topographical, geological, and precipitation risk factors
            </p>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-[12px] font-semibold text-[#1E4D38]">
              <RefreshCw size={14} className="animate-spin" />
              <span>Simulating...</span>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-[#EAE8E1] text-[11px] font-bold uppercase tracking-wider text-[#6E756F] bg-[#FAF9F5]">
                <th className="py-3 px-3.5 rounded-l-xl">District</th>
                <th className="py-3 px-3.5">Base Rain</th>
                <th className="py-3 px-3.5">Simulated Rain</th>
                <th className="py-3 px-3.5">Original Risk</th>
                <th className="py-3 px-3.5">Simulated Risk</th>
                <th className="py-3 px-3.5">Risk Shift</th>
                <th className="py-3 px-3.5">Severity Transition</th>
                <th className="py-3 px-3.5 rounded-r-xl">Action Directive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EFEA]">
              {(simulationResult?.simulatedDistricts || []).map((d) => {
                const isCritical = d.simulatedSeverity === 'Critical';
                const hasChanged = d.originalSeverity !== d.simulatedSeverity;

                return (
                  <tr 
                    key={d.name} 
                    className={`transition-colors hover:bg-[#FAF9F5] ${
                      isCritical ? 'bg-[#FEF7F6]/50' : ''
                    }`}
                  >
                    <td className="py-3 px-3.5 font-bold text-[#18211E]">
                      {d.name}
                    </td>
                    <td className="py-3 px-3.5 text-[#6E756F]">
                      {formatRainfall(d.originalRainfall24h)}
                    </td>
                    <td className="py-3 px-3.5 font-bold text-[#2563EB]">
                      {formatRainfall(d.simulatedRainfall24h)}
                    </td>
                    <td className="py-3 px-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold uppercase border ${
                        d.originalSeverity === 'Critical' ? 'bg-[#FEF2F2] border-[#FCA5A5] text-[#DC2626]' : (d.originalSeverity === 'High' ? 'bg-[#FFF7ED] border-[#FDBA74] text-[#E36B25]' : 'bg-[#EAF3EE] border-[#C6E2D0] text-[#1E4D38]')
                      }`}>
                        {d.originalRiskScore} ({d.originalSeverity})
                      </span>
                    </td>
                    <td className="py-3 px-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase border ${
                        d.simulatedSeverity === 'Critical' ? 'bg-[#FEF2F2] border-[#FCA5A5] text-[#DC2626]' : (d.simulatedSeverity === 'High' ? 'bg-[#FFF7ED] border-[#FDBA74] text-[#E36B25]' : 'bg-[#EAF3EE] border-[#C6E2D0] text-[#1E4D38]')
                      }`}>
                        {d.simulatedRiskScore} ({d.simulatedSeverity})
                      </span>
                    </td>
                    <td className="py-3 px-3.5 font-extrabold">
                      <span className={d.scoreDelta > 15 ? 'text-[#DC2626]' : (d.scoreDelta > 0 ? 'text-[#E36B25]' : 'text-[#22C55E]')}>
                        +{d.scoreDelta} pts
                      </span>
                    </td>
                    <td className="py-3 px-3.5">
                      {hasChanged ? (
                        <div className="flex items-center gap-1.5 font-bold text-[11.5px] text-[#DC2626]">
                          <span>{d.originalSeverity}</span>
                          <ArrowRight size={12} />
                          <span>{d.simulatedSeverity}</span>
                        </div>
                      ) : (
                        <span className="text-[#8E958F] text-[11.5px] font-medium">Unchanged</span>
                      )}
                    </td>
                    <td className="py-3 px-3.5 text-[12px] text-[#4A534D] max-w-[260px] leading-snug">
                      {d.recommendedAction}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default SimulationPage;
