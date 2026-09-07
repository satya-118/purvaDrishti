import React, { useState } from 'react';
import { MountainSnow, Calculator, Sliders, ShieldCheck, ChevronRight, AlertTriangle, CloudRain, Mountain, History, Droplets, Waves, Plane } from 'lucide-react';
import { calculateCustomRisk } from '../api/client.js';
import { formatRainfall } from '../utils/formatters.js';
import { useData } from '../context/DataContext.jsx';

export function LandslidePage(props) {
  const contextData = useData();
  const districts = props.districts?.length ? props.districts : (contextData?.districts || []);
  const onSelectDistrict = props.onSelectDistrict || contextData?.setSelectedDistrict;
  // Interactive Sandbox Form State
  const [calcInputs, setCalcInputs] = useState({
    rainfall24h: 85,
    slope: 55,
    elevation: 1800,
    historicalCount: 15,
    soilSaturation: 75,
    riverProximity: 80,
    droneEvidence: 50
  });

  const [calcResult, setCalcResult] = useState({
    riskScore: 71,
    severity: 'High',
    recommendedAction: 'Deploy drone inspection, inspect slope retaining walls, and place SDRF emergency squads on standby.',
    breakdown: {
      rainfallContribution: 16,
      slopeContribution: 15,
      elevationContribution: 7,
      historyContribution: 7,
      soilContribution: 8,
      riverContribution: 6,
      droneContribution: 4
    }
  });

  const handleInputChange = async (field, value) => {
    const newInputs = { ...calcInputs, [field]: Number(value) };
    setCalcInputs(newInputs);

    try {
      const result = await calculateCustomRisk(newInputs);
      if (result) setCalcResult(result);
    } catch (err) {
      console.error('Calculation error:', err);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[1560px] mx-auto space-y-6 pb-12 select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[32px] font-bold text-[#18211E] tracking-tight leading-tight">
            Landslide Risk Calculation Engine
          </h1>
          <p className="text-[#7A827D] text-[13px] font-medium mt-0.5">
            Multi-factor explainable scoring engine combining hydro-meteorological, geological slope gradient, and real-time sensor inputs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-[#EAF3EE] border border-[#C6E2D0] rounded-xl text-[12px] font-bold text-[#1E4D38]">
            Explainable Decision Model
          </div>
        </div>
      </div>

      {/* Formula Explanation Card */}
      <div className="bg-white border border-[#EAE8E1] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EAF3EE] text-[#1E4D38] flex items-center justify-center">
              <Calculator size={16} />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#18211E]">Transparent Mathematical Formula (0 - 100 Scale)</h3>
              <p className="text-[11px] text-[#7A827D]">Normalized multi-criteria weighted hazard equation</p>
            </div>
          </div>
        </div>

        <div className="bg-[#F8F8F5] border border-[#EAE8E1] p-3.5 rounded-xl font-mono text-[12px] text-[#1E4D38] overflow-x-auto mb-4 font-bold">
          RiskScore = (0.28 × Rainfall) + (0.20 × Slope) + (0.14 × Elevation) + (0.12 × History) + (0.10 × Soil) + (0.08 × River) + (0.08 × Drone)
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          <div className="bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl">
            <div className="text-[11px] font-bold text-[#18211E] flex items-center gap-1">
              <CloudRain size={13} className="text-[#2563EB]" />
              <span>Rainfall (28%)</span>
            </div>
            <div className="text-[10px] text-[#7A827D] mt-0.5">0 - 150+ mm trigger</div>
          </div>
          <div className="bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl">
            <div className="text-[11px] font-bold text-[#18211E] flex items-center gap-1">
              <Mountain size={13} className="text-[#234E3B]" />
              <span>Slope (20%)</span>
            </div>
            <div className="text-[10px] text-[#7A827D] mt-0.5">0 - 75° gradient</div>
          </div>
          <div className="bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl">
            <div className="text-[11px] font-bold text-[#18211E] flex items-center gap-1">
              <MountainSnow size={13} className="text-[#789177]" />
              <span>Elevation (14%)</span>
            </div>
            <div className="text-[10px] text-[#7A827D] mt-0.5">0 - 3500m fragility</div>
          </div>
          <div className="bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl">
            <div className="text-[11px] font-bold text-[#18211E] flex items-center gap-1">
              <History size={13} className="text-[#D8A32A]" />
              <span>History (12%)</span>
            </div>
            <div className="text-[10px] text-[#7A827D] mt-0.5">Slip recurrence index</div>
          </div>
          <div className="bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl">
            <div className="text-[11px] font-bold text-[#18211E] flex items-center gap-1">
              <Droplets size={13} className="text-[#2563EB]" />
              <span>Soil Saturation (10%)</span>
            </div>
            <div className="text-[10px] text-[#7A827D] mt-0.5">0 - 100% moisture</div>
          </div>
          <div className="bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl">
            <div className="text-[11px] font-bold text-[#18211E] flex items-center gap-1">
              <Waves size={13} className="text-[#0284C7]" />
              <span>River Basin (8%)</span>
            </div>
            <div className="text-[10px] text-[#7A827D] mt-0.5">Toe erosion factor</div>
          </div>
          <div className="bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl">
            <div className="text-[11px] font-bold text-[#18211E] flex items-center gap-1">
              <Plane size={13} className="text-[#1E4D38]" />
              <span>Drone Scan (8%)</span>
            </div>
            <div className="text-[10px] text-[#7A827D] mt-0.5">Crack dilation factor</div>
          </div>
        </div>
      </div>

      {/* Simulator & Rankings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Simulator Sandbox */}
        <div className="lg:col-span-7 bg-white border border-[#EAE8E1] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-[15px] font-bold text-[#18211E]">Interactive Risk Simulator</h3>
            <p className="text-[11px] text-[#7A827D]">Adjust parameters dynamically to observe formula response</p>
          </div>

          <div className="space-y-4 text-[13px]">
            <div>
              <div className="flex justify-between text-[12px] mb-1.5">
                <span className="text-[#7A827D]">24-Hour Precipitation:</span>
                <strong className="text-[#18211E]">{calcInputs.rainfall24h} mm</strong>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={calcInputs.rainfall24h}
                onChange={(e) => handleInputChange('rainfall24h', e.target.value)}
                className="w-full accent-[#19382B] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[12px] mb-1.5">
                <span className="text-[#7A827D]">Slope Gradient:</span>
                <strong className="text-[#18211E]">{calcInputs.slope}°</strong>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={calcInputs.slope}
                onChange={(e) => handleInputChange('slope', e.target.value)}
                className="w-full accent-[#19382B] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[12px] mb-1.5">
                <span className="text-[#7A827D]">Soil Saturation Level:</span>
                <strong className="text-[#18211E]">{calcInputs.soilSaturation}%</strong>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={calcInputs.soilSaturation}
                onChange={(e) => handleInputChange('soilSaturation', e.target.value)}
                className="w-full accent-[#19382B] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[12px] mb-1.5">
                <span className="text-[#7A827D]">River Gorge Proximity Risk:</span>
                <strong className="text-[#18211E]">{calcInputs.riverProximity}%</strong>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={calcInputs.riverProximity}
                onChange={(e) => handleInputChange('riverProximity', e.target.value)}
                className="w-full accent-[#19382B] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[12px] mb-1.5">
                <span className="text-[#7A827D]">Drone Detected Fissure Activity:</span>
                <strong className="text-[#18211E]">{calcInputs.droneEvidence}%</strong>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={calcInputs.droneEvidence}
                onChange={(e) => handleInputChange('droneEvidence', e.target.value)}
                className="w-full accent-[#19382B] cursor-pointer"
              />
            </div>

            {/* Calculated Output Card */}
            <div className={`p-4 rounded-xl border mt-3 ${
              calcResult.severity === 'Critical' 
                ? 'bg-[#FEF2F2] border-[#FEE2E2]' 
                : (calcResult.severity === 'High' ? 'bg-[#FFF7ED] border-[#FFEDD5]' : 'bg-[#EAF3EE] border-[#C6E2D0]')
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#7A827D] uppercase tracking-wider">Calculated Risk Index</span>
                  <div className="text-[28px] font-bold text-[#18211E] leading-none mt-1">
                    {calcResult.riskScore} <span className="text-[14px] text-[#7A827D] font-normal">/ 100</span>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                  calcResult.severity === 'Critical' 
                    ? 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]' 
                    : (calcResult.severity === 'High' ? 'bg-[#FFF7ED] border-[#FFEDD5] text-[#EA580C]' : 'bg-[#EAF3EE] border-[#C6E2D0] text-[#1E4D38]')
                }`}>
                  {calcResult.severity}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-black/5 text-[12px] text-[#18211E]">
                <strong className="text-[#1E4D38]">Automated Protocol: </strong>
                {calcResult.recommendedAction}
              </div>
            </div>
          </div>
        </div>

        {/* Right: District Rankings List */}
        <div className="lg:col-span-5 bg-white border border-[#EAE8E1] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="mb-3">
            <h3 className="text-[15px] font-bold text-[#18211E]">District Vulnerability Rankings</h3>
            <p className="text-[11px] text-[#7A827D]">Regional mountain sectors evaluated in real time</p>
          </div>

          <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] pr-1">
            {[...districts].sort((a, b) => b.riskScore - a.riskScore).map((d, idx) => (
              <div
                key={d.name}
                onClick={() => onSelectDistrict(d)}
                className="p-3 bg-[#F8F8F5] hover:bg-[#EAE8E1] border border-[#EAE8E1] rounded-xl cursor-pointer transition-colors flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#7A827D]">#{idx + 1}</span>
                    <strong className="text-[13px] text-[#18211E]">{d.name}</strong>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                    d.severity === 'Critical' 
                      ? 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]' 
                      : (d.severity === 'High' ? 'bg-[#FFF7ED] border-[#FFEDD5] text-[#EA580C]' : 'bg-[#EAF3EE] border-[#C6E2D0] text-[#1E4D38]')
                  }`}>
                    {d.riskScore} ({d.severity})
                  </span>
                </div>

                <div className="flex justify-between text-[11px] text-[#7A827D]">
                  <span>Rain: {formatRainfall(d.rainfall24h)}</span>
                  <span>Slope: {d.slope}°</span>
                  <span>Saturation: {d.soilSaturation}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-[#E5E3D8] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      d.severity === 'Critical' ? 'bg-[#DC2626]' : (d.severity === 'High' ? 'bg-[#EA580C]' : 'bg-[#16A34A]')
                    }`}
                    style={{ width: `${d.riskScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
export default LandslidePage;
