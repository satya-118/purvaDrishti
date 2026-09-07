import React, { useState } from 'react';
import { Route, Edit2, Search, AlertTriangle, CheckCircle2, X, Plane } from 'lucide-react';
import { updateRoadStatus } from '../api/client.js';
import { useData } from '../context/DataContext.jsx';

export function RoadSafetyPage(props) {
  const contextData = useData();
  const roads = props.roads?.length ? props.roads : (contextData?.roads || []);
  const onRoadUpdated = props.onRoadUpdated || contextData?.refreshData;
  const [selectedRoad, setSelectedRoad] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [statusInput, setStatusInput] = useState('Blocked');
  const [actionInput, setActionInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const filteredRoads = roads.filter((r) => {
    const matchesStatus = filterStatus === 'All' || r.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = 
      r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenModal = (road) => {
    setSelectedRoad(road);
    setStatusInput(road.status);
    setActionInput(road.action || '');
    setModalOpen(true);
  };

  const handleSaveStatus = async () => {
    if (!selectedRoad) return;
    try {
      setSubmitting(true);
      await updateRoadStatus(selectedRoad.name, {
        status: statusInput,
        action: actionInput
      });
      setModalOpen(false);
      if (onRoadUpdated) onRoadUpdated();
    } catch (err) {
      alert('Failed to update road: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const blockedCount = roads.filter(r => r.status === 'Blocked').length;
  const restrictedCount = roads.filter(r => r.status === 'Restricted').length;

  return (
    <div className="flex flex-col w-full max-w-[1560px] mx-auto space-y-6 pb-12 select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[32px] font-bold text-[#18211E] tracking-tight leading-tight">
            Highway & Mountain Road Vulnerability
          </h1>
          <p className="text-[#7A827D] text-[13px] font-medium mt-0.5">
            Tracking rockfall hazards, mudflow blockages, drone verification feeds, and traffic advisories across Northeast mountain corridors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl text-[12px] font-bold text-[#DC2626] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse"></span>
            <span>{blockedCount} Blocked Highways</span>
          </div>
          <div className="px-3.5 py-1.5 bg-[#FFF7ED] border border-[#FFEDD5] rounded-xl text-[12px] font-bold text-[#EA580C]">
            {restrictedCount} Restricted Corridors
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2.5 bg-[#F8F8F5] border border-[#E5E3D8] rounded-xl px-3.5 py-2 flex-1 min-w-[240px]">
          <Search size={16} className="text-[#7A827D]" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-[13px] text-[#18211E] placeholder:text-[#7A827D] w-full"
            placeholder="Search by road name, highway code, or mountain pass..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-[#7A827D]">Status:</span>
          {['All', 'Blocked', 'Restricted', 'Caution', 'Open'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-colors ${
                filterStatus === status 
                  ? 'bg-[#19382B] text-white shadow-sm' 
                  : 'bg-[#F8F8F5] border border-[#E5E3D8] text-[#18211E] hover:bg-[#EAE8E1]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Roads Table */}
      <div className="bg-white border border-[#EAE8E1] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F8F8F5] border-b border-[#EAE8E1] text-[11px] font-bold text-[#7A827D] uppercase tracking-wider">
                <th className="py-3.5 px-5">Corridor / Highway</th>
                <th className="py-3.5 px-5">District & Pass</th>
                <th className="py-3.5 px-5">Risk Index</th>
                <th className="py-3.5 px-5">Primary Hazard</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Drone Inspection</th>
                <th className="py-3.5 px-5">Advisory</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE8E1]">
              {filteredRoads.map((road) => (
                <tr key={road.name} className="hover:bg-[#F8F8F5] transition-colors">
                  <td className="py-3.5 px-5">
                    <strong className="text-[#18211E] text-[14px]">{road.name}</strong>
                    <div className="text-[11px] text-[#7A827D]">Length: {road.lengthKm || 40} km</div>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-[#18211E]">{road.district}</div>
                    <div className="text-[11px] text-[#7A827D]">{road.location}</div>
                  </td>
                  <td className="py-3.5 px-5 font-bold font-mono">
                    <span className={road.riskScore > 75 ? 'text-[#DC2626]' : 'text-[#EA580C]'}>
                      {road.riskScore}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-[#4A534D] font-medium">{road.hazard}</td>
                  <td className="py-3.5 px-5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      road.status === 'Blocked' 
                        ? 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]' 
                        : (road.status === 'Restricted' ? 'bg-[#FFF7ED] border-[#FFEDD5] text-[#EA580C]' : 'bg-[#EAF3EE] border-[#C6E2D0] text-[#1E4D38]')
                    }`}>
                      {road.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="text-[12px] font-semibold text-[#1E4D38] flex items-center gap-1.5">
                      <Plane size={13} className="text-[#1E4D38]" />
                      <span>{road.droneInspectionStatus || 'Verified'}</span>
                    </div>
                    <div className="text-[10px] text-[#7A827D] mt-0.5">Checked: {road.lastInspection || 'Recent'}</div>
                  </td>
                  <td className="py-3.5 px-5 text-[12px] text-[#4A534D] max-w-[240px] leading-relaxed">
                    {road.action}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => handleOpenModal(road)}
                      className="px-3 py-1.5 bg-[#F8F8F5] hover:bg-[#EAE8E1] border border-[#E5E3D8] text-[#18211E] rounded-xl text-[11px] font-semibold transition-colors inline-flex items-center gap-1.5"
                    >
                      <Edit2 size={12} />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      {modalOpen && selectedRoad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18211E]/40 backdrop-blur-sm p-4" onClick={() => setModalOpen(false)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-[500px] overflow-hidden shadow-2xl flex flex-col border border-[#EAE8E1]" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-[#EAE8E1] bg-[#F8F8F5]">
              <div>
                <h3 className="text-[16px] font-serif font-bold text-[#18211E]">Update Corridor Advisory</h3>
                <p className="text-[11px] text-[#7A827D]">{selectedRoad.name}</p>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#EAE8E1] text-[#7A827D] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-[13px]">
              <div>
                <label className="block text-[11px] font-bold text-[#7A827D] uppercase tracking-wider mb-1.5">Traffic Condition</label>
                <select
                  className="w-full bg-white border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[#18211E] text-[13px] outline-none"
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                >
                  <option value="Open">Open - Normal Traffic</option>
                  <option value="Caution">Caution - Slow Moving / High Headlights</option>
                  <option value="Restricted">Restricted - Single Lane / Convoy Only</option>
                  <option value="Blocked">Blocked - Total Closure / Debris Clearance</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#7A827D] uppercase tracking-wider mb-1.5">Official Advisory Text</label>
                <textarea
                  className="w-full bg-white border border-[#E5E3D8] rounded-xl p-3 text-[#18211E] text-[13px] outline-none"
                  rows={3}
                  value={actionInput}
                  onChange={(e) => setActionInput(e.target.value)}
                />
              </div>
            </div>

            <div className="p-4 border-t border-[#EAE8E1] bg-[#F8F8F5] flex justify-end gap-3">
              <button 
                className="px-4 py-2 bg-white border border-[#E5E3D8] text-[#18211E] hover:bg-[#EAE8E1] rounded-xl font-semibold text-[12px] transition-colors"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                disabled={submitting}
                className="px-4 py-2 bg-[#19382B] hover:bg-[#234E3B] text-white rounded-xl font-semibold text-[12px] transition-colors shadow-sm disabled:opacity-60"
                onClick={handleSaveStatus}
              >
                {submitting ? 'Saving...' : 'Save Advisory'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default RoadSafetyPage;
