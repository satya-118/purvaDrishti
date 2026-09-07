import React, { useState } from 'react';
import { CloudRain, RefreshCw, BarChart2, Droplets, Wind, Thermometer, AlertTriangle } from 'lucide-react';
import { RainfallChart } from '../components/RainfallChart.jsx';
import { formatRainfall } from '../utils/formatters.js';
import { useData } from '../context/DataContext.jsx';

export function RainfallPage(props) {
  const contextData = useData();
  const weatherData = props.weatherData || contextData?.weatherData;
  const districts = props.districts?.length ? props.districts : (contextData?.districts || []);
  const onRefresh = props.onRefresh || contextData?.refreshData;
  const isRefreshing = props.isRefreshing ?? (contextData?.isRefreshing || false);

  const [selectedDistrictName, setSelectedDistrictName] = useState('East Khasi Hills');

  const activeDistrictWeather = (weatherData?.data || []).find(
    d => d.name?.toLowerCase() === selectedDistrictName.toLowerCase()
  ) || weatherData?.data?.[0] || {
    name: 'East Khasi Hills',
    severity: 'High',
    currentRainfall: 16.4,
    rainfall24h: 148,
    rainfall1h: 22.4,
    rainfall6h: 88.5,
    rainfallAnomaly: 42,
    temperatureC: 19,
    humidityPct: 92,
    windSpeedKmh: 16
  };

  const summary = weatherData?.summary || {
    averageRainfall24h: 74,
    highestRainfallDistrict: 'East Khasi Hills',
    highestRainfallMm: 148,
    activeRainDistrictsCount: 8,
    extremeWarningCount: 2
  };

  return (
    <div className="flex flex-col w-full max-w-[1560px] mx-auto space-y-6 pb-12 select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[32px] font-bold text-[#18211E] tracking-tight leading-tight">
            Precipitation & Meteorological Monitoring
          </h1>
          <p className="text-[#7A827D] text-[13px] font-medium mt-0.5">
            Real-time precipitation telemetry powered by Open-Meteo API integration with 10-minute automated caching.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onRefresh} 
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-white border border-[#EAE8E1] hover:bg-[#F8F8F5] text-[#18211E] px-4 py-2 rounded-xl text-[13px] font-semibold transition-all shadow-sm disabled:opacity-60"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            <span>{isRefreshing ? 'Syncing Radar...' : 'Sync Radar'}</span>
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
            <CloudRain size={20} className="text-[#3B82F6]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">24H STATE AVERAGE</span>
            <span className="text-[26px] font-bold text-[#18211E] leading-tight">{summary.averageRainfall24h} mm</span>
            <span className="text-[11px] font-medium text-[#7A827D]">Across 12 HP districts</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-[#DC2626]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">HIGHEST DOWNPOUR</span>
            <span className="text-[26px] font-bold text-[#DC2626] leading-tight">{summary.highestRainfallMm} mm</span>
            <span className="text-[11px] font-medium text-[#7A827D]">District: {summary.highestRainfallDistrict}</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-full bg-[#FFF7ED] flex items-center justify-center shrink-0">
            <Droplets size={20} className="text-[#EA580C]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">ACTIVE RAIN ZONES</span>
            <span className="text-[26px] font-bold text-[#18211E] leading-tight">{summary.activeRainDistrictsCount}/12</span>
            <span className="text-[26px] font-bold text-[#18211E] leading-tight">{summary.activeRainDistrictsCount || 8} Active</span>
            <span className="text-[11px] font-medium text-[#7A827D]">Precipitation &gt; 10 mm</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0">
            <CloudRain size={20} className="text-[#DC2626]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">EXTREME WARNINGS</span>
            <span className="text-[26px] font-bold text-[#DC2626] leading-tight">{summary.extremeWarningCount}</span>
            <span className="text-[11px] font-medium text-[#DC2626]">Mandi & Kullu corridors</span>
            <span className="text-[11px] font-medium text-[#DC2626]">East Khasi Hills & Dima Hasao corridors</span>
          </div>
        </div>
      </div>

      {/* Chart & Telemetry Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Precipitation Forecast Chart */}
        <div className="lg:col-span-8 bg-white border border-[#EAE8E1] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-[15px] font-bold text-[#18211E]">{activeDistrictWeather.name || 'Regional'} Precipitation Timeline</h3>
              <p className="text-[11px] text-[#7A827D]">Hourly rainfall gradient and peak measurement</p>
            </div>

            <select
              className="bg-[#F8F8F5] border border-[#E5E3D8] rounded-xl px-3 py-1.5 text-[#18211E] text-[12px] font-semibold outline-none"
              value={selectedDistrictName}
              onChange={(e) => setSelectedDistrictName(e.target.value)}
            >
              {districts.map(d => (
                <option key={d.name} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-h-[280px]">
            <RainfallChart minimal={false} />
          </div>
        </div>

        {/* Selected District Telemetry Card */}
        <div className="lg:col-span-4 bg-white border border-[#EAE8E1] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-[#EAE8E1] mb-4">
              <div>
                <h3 className="text-[16px] font-bold text-[#18211E]">Weather Station: {activeDistrictWeather.name}</h3>
                <p className="text-[11px] text-[#7A827D]">Telemetry station live readings</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                activeDistrictWeather.severity === 'Critical' 
                  ? 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]' 
                  : (activeDistrictWeather.severity === 'High' ? 'bg-[#FFF7ED] border-[#FFEDD5] text-[#EA580C]' : 'bg-[#EAF3EE] border-[#C6E2D0] text-[#1E4D38]')
              }`}>
                {activeDistrictWeather.severity || 'Moderate'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div className="bg-[#F8F8F5] p-3 rounded-xl border border-[#EAE8E1]">
                <div className="text-[10px] text-[#7A827D] font-medium">Current Rain Rate</div>
                <div className="text-[20px] font-bold text-[#2563EB] mt-0.5">{activeDistrictWeather.currentRainfall || 0} mm/h</div>
              </div>
              <div className="bg-[#F8F8F5] p-3 rounded-xl border border-[#EAE8E1]">
                <div className="text-[10px] text-[#7A827D] font-medium">Accumulated 24h</div>
                <div className="text-[20px] font-bold text-[#EA580C] mt-0.5">{activeDistrictWeather.rainfall24h || 0} mm</div>
              </div>
              <div className="bg-[#F8F8F5] p-3 rounded-xl border border-[#EAE8E1]">
                <div className="text-[10px] text-[#7A827D] font-medium">Past 1 Hour</div>
                <div className="text-[16px] font-bold text-[#18211E] mt-0.5">{activeDistrictWeather.rainfall1h || 0} mm</div>
              </div>
              <div className="bg-[#F8F8F5] p-3 rounded-xl border border-[#EAE8E1]">
                <div className="text-[10px] text-[#7A827D] font-medium">Past 6 Hours</div>
                <div className="text-[16px] font-bold text-[#18211E] mt-0.5">{activeDistrictWeather.rainfall6h || 0} mm</div>
              </div>
            </div>

            <div className="bg-[#F8F8F5] border border-[#EAE8E1] p-3.5 rounded-xl space-y-2 text-[12px]">
              <div className="flex justify-between">
                <span className="text-[#7A827D]">Seasonal Anomaly:</span>
                <strong className={(activeDistrictWeather.rainfallAnomaly || 0) > 20 ? 'text-[#DC2626]' : 'text-[#16A34A]'}>
                  {(activeDistrictWeather.rainfallAnomaly || 0) > 0 ? `+${activeDistrictWeather.rainfallAnomaly}%` : `${activeDistrictWeather.rainfallAnomaly}%`} vs Normal
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A827D]">Ambient Temperature:</span>
                <strong className="text-[#18211E]">{activeDistrictWeather.temperatureC || 22}°C</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A827D]">Relative Humidity:</span>
                <strong className="text-[#18211E]">{activeDistrictWeather.humidityPct || 75}%</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A827D]">Wind Velocity:</span>
                <strong className="text-[#18211E]">{activeDistrictWeather.windSpeedKmh || 12} km/h</strong>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 12 District Table */}
      <div className="bg-white border border-[#EAE8E1] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-4 border-b border-[#EAE8E1] flex justify-between items-center">
          <div>
            <h3 className="text-[15px] font-bold text-[#18211E]">12-District Precipitation Comparison</h3>
            <h3 className="text-[15px] font-bold text-[#18211E]">Regional Precipitation Comparison</h3>
            <p className="text-[11px] text-[#7A827D]">Ranked by 24h accumulated rainfall</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F8F8F5] border-b border-[#EAE8E1] text-[11px] font-bold text-[#7A827D] uppercase tracking-wider">
                <th className="py-3 px-5">District</th>
                <th className="py-3 px-5">Headquarters</th>
                <th className="py-3 px-5">Current (mm/h)</th>
                <th className="py-3 px-5">1-Hour</th>
                <th className="py-3 px-5">6-Hour</th>
                <th className="py-3 px-5">24-Hour</th>
                <th className="py-3 px-5">Anomaly</th>
                <th className="py-3 px-5">Risk Level</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE8E1]">
              {[...districts].sort((a, b) => (b.rainfall24h || 0) - (a.rainfall24h || 0)).map((d) => (
                <tr 
                  key={d.name} 
                  onClick={() => setSelectedDistrictName(d.name)}
                  className="hover:bg-[#F8F8F5] transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-5 font-bold text-[#18211E]">{d.name}</td>
                  <td className="py-3.5 px-5 text-[#7A827D]">{d.headquarters}</td>
                  <td className="py-3.5 px-5 font-semibold text-[#2563EB]">{d.currentRainfall || 0} mm</td>
                  <td className="py-3.5 px-5 text-[#4A534D]">{d.rainfall1h || 0} mm</td>
                  <td className="py-3.5 px-5 text-[#4A534D]">{d.rainfall6h || 0} mm</td>
                  <td className="py-3.5 px-5 font-bold text-[#18211E]">{formatRainfall(d.rainfall24h)}</td>
                  <td className="py-3.5 px-5 font-semibold">
                    <span className={(d.rainfallAnomaly || 0) > 20 ? 'text-[#DC2626]' : 'text-[#16A34A]'}>
                      {(d.rainfallAnomaly || 0) > 0 ? `+${d.rainfallAnomaly}%` : `${d.rainfallAnomaly}%`}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      d.severity === 'Critical' 
                        ? 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]' 
                        : (d.severity === 'High' ? 'bg-[#FFF7ED] border-[#FFEDD5] text-[#EA580C]' : 'bg-[#EAF3EE] border-[#C6E2D0] text-[#1E4D38]')
                    }`}>
                      {d.severity}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button 
                      className="px-3 py-1 bg-[#F8F8F5] hover:bg-[#EAE8E1] border border-[#E5E3D8] rounded-lg text-[11px] font-semibold text-[#18211E] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDistrictName(d.name);
                      }}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default RainfallPage;
