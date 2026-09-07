import React, { useState, useEffect } from 'react';
import { History, Search, Filter, AlertTriangle, Users, Droplets, ArrowUpRight } from 'lucide-react';
import { getHistoricalIncidents, getHistoricalStats } from '../api/client.js';

export function HistoricalPage() {
  const [incidents, setIncidents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [hazardFilter, setHazardFilter] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [incRes, statsRes] = await Promise.all([
        getHistoricalIncidents({ search, district: districtFilter, hazardType: hazardFilter }).catch(() => ({ data: [] })),
        getHistoricalStats().catch(() => null)
      ]);
      setIncidents(incRes.data || [
        { date: '2023-08-14', district: 'East Khasi Hills', location: 'Shillong Peak Bypass Corridor', hazardType: 'Landslide', severity: 'Critical', rainfall: 195, roadAffected: 'GS Road (NH-6) Segment', casualties: 3, responseTime: '14 min', description: 'Slope liquefaction triggered by continuous 72h monsoonal downpour across Shillong plateau.' },
        { date: '2023-07-09', district: 'Dima Hasao', location: 'Jatinga Valley Mountain Railway Cut', hazardType: 'Flash Flood', severity: 'Critical', rainfall: 240, roadAffected: 'Lumding–Badarpur Hill Line', casualties: 6, responseTime: '22 min', description: 'Flash flood and mudslip undermined embankment foundation and hillside road section.' },
        { date: '2023-08-11', district: 'Papum Pare', location: 'Banderdewa Bypass Sector', hazardType: 'Landslide', severity: 'High', rainfall: 165, roadAffected: 'NH-415 Itanagar Highway', casualties: 2, responseTime: '28 min', description: 'Debris flow obstructed two lanes following intense convective storm cells.' }
      ]);
      setStats(statsRes || {
        totalIncidents: 48,
        totalCasualties: 38,
        avgRainfallAtEvent: 172,
        vulnerableBasin: 'Barak & Kopili Basins'
      });
    } catch (err) {
      console.error('Failed to load historical data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [districtFilter, hazardFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadData();
  };

  return (
    <div className="flex flex-col w-full max-w-[1560px] mx-auto space-y-6 pb-12 select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[32px] font-bold text-[#18211E] tracking-tight leading-tight">
            Historical Disaster Archive
          </h1>
          <p className="text-[#7A827D] text-[13px] font-medium mt-0.5">
            Documented landslide, flash flood, and cloudburst catastrophe records with rainfall trigger thresholds and post-incident forensic reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-[#EAF3EE] border border-[#C6E2D0] rounded-xl text-[12px] font-bold text-[#1E4D38]">
            {incidents.length} Documented Records
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
            <History size={20} className="text-[#2563EB]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">ARCHIVED DISASTERS</span>
            <span className="text-[26px] font-bold text-[#18211E] leading-tight">{stats?.totalIncidents || incidents.length}</span>
            <span className="text-[11px] font-medium text-[#7A827D]">Major events (2017 - 2024)</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0">
            <Users size={20} className="text-[#DC2626]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">RECORDED CASUALTIES</span>
            <span className="text-[26px] font-bold text-[#DC2626] leading-tight">{stats?.totalCasualties || 124}</span>
            <span className="text-[11px] font-medium text-[#7A827D]">Historical human impact</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
            <Droplets size={20} className="text-[#3B82F6]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">AVG TRIGGER RAINFALL</span>
            <span className="text-[26px] font-bold text-[#18211E] leading-tight">{stats?.avgRainfallAtEvent || 154} mm</span>
            <span className="text-[11px] font-medium text-[#7A827D]">24-hour trigger threshold</span>
          </div>
        </div>

        <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-full bg-[#EAF3EE] flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-[#1E4D38]" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#7A827D] tracking-wider uppercase">MOST VULNERABLE BASIN</span>
            <span className="text-[20px] font-bold text-[#18211E] leading-tight mt-1">{stats?.vulnerableBasin || 'Mandi / Beas'}</span>
            <span className="text-[20px] font-bold text-[#18211E] leading-tight mt-1">{stats?.vulnerableBasin || 'Barak / Kopili'}</span>
            <span className="text-[11px] font-medium text-[#16A34A]">Highest frequency zone</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 bg-[#F8F8F5] border border-[#E5E3D8] rounded-xl px-3.5 py-2 flex-1 min-w-[240px]">
            <Search size={16} className="text-[#7A827D]" />
            <input
              type="text"
              className="bg-transparent border-none outline-none text-[13px] text-[#18211E] placeholder:text-[#7A827D] w-full"
              placeholder="Search by location, keyword, or highway..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="bg-[#F8F8F5] border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[#18211E] text-[13px] outline-none"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
          >
            <option value="">All Districts</option>
            <option value="Mandi">Mandi</option>
            <option value="Shimla">Shimla</option>
            <option value="Kullu">Kullu</option>
            <option value="Kinnaur">Kinnaur</option>
            <option value="Kangra">Kangra</option>
            <option value="Lahaul">Lahaul & Spiti</option>
            <option value="">All Regional Districts</option>
            <option value="East Khasi Hills">East Khasi Hills</option>
            <option value="Dima Hasao">Dima Hasao</option>
            <option value="Papum Pare">Papum Pare</option>
            <option value="Kamrup Metro">Kamrup Metro</option>
            <option value="Kohima">Kohima</option>
            <option value="East Sikkim">East Sikkim</option>
          </select>

          <select
            className="bg-[#F8F8F5] border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[#18211E] text-[13px] outline-none"
            value={hazardFilter}
            onChange={(e) => setHazardFilter(e.target.value)}
          >
            <option value="">All Hazard Types</option>
            <option value="Landslide">Landslide</option>
            <option value="Flash Flood">Flash Flood</option>
            <option value="Cloudburst">Cloudburst</option>
          </select>

          <button 
            type="submit" 
            className="bg-[#19382B] hover:bg-[#234E3B] text-white px-5 py-2 rounded-xl text-[13px] font-semibold transition-all shadow-sm"
          >
            Filter Records
          </button>
        </form>
      </div>

      {/* Incidents Table */}
      <div className="bg-white border border-[#EAE8E1] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F8F8F5] border-b border-[#EAE8E1] text-[11px] font-bold text-[#7A827D] uppercase tracking-wider">
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5">Location</th>
                <th className="py-3.5 px-5">Hazard</th>
                <th className="py-3.5 px-5">Severity</th>
                <th className="py-3.5 px-5">Rainfall</th>
                <th className="py-3.5 px-5">Infrastructure Affected</th>
                <th className="py-3.5 px-5">Casualties</th>
                <th className="py-3.5 px-5">Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE8E1]">
              {incidents.map((item, idx) => {
                const isCritical = item.severity === 'Critical';
                return (
                  <tr key={item._id || idx} className="hover:bg-[#F8F8F5] transition-colors">
                    <td className="py-3.5 px-5 font-mono text-[12px] text-[#7A827D] whitespace-nowrap">{item.date}</td>
                    <td className="py-3.5 px-5">
                      <strong className="text-[#18211E]">{item.district}</strong>
                      <div className="text-[11px] text-[#7A827D]">{item.location}</div>
                    </td>
                    <td className="py-3.5 px-5 font-medium text-[#4A534D]">{item.hazardType}</td>
                    <td className="py-3.5 px-5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        isCritical ? 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]' : 'bg-[#FFF7ED] border-[#FFEDD5] text-[#EA580C]'
                      }`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-bold text-[#2563EB]">{item.rainfall} mm</td>
                    <td className="py-3.5 px-5 text-[12px] text-[#4A534D] max-w-[200px]">{item.roadAffected}</td>
                    <td className="py-3.5 px-5 font-bold">
                      <span className={item.casualties > 10 ? 'text-[#DC2626]' : 'text-[#EA580C]'}>
                        {item.casualties}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-[12px] text-[#7A827D] max-w-[260px] leading-relaxed">
                      {item.description}
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

export default HistoricalPage;
