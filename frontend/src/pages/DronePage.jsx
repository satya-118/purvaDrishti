import React, { useState } from 'react';
import { Battery, Radio, Compass, Send, Eye, X, Navigation } from 'lucide-react';
import { dispatchDrone } from '../api/client.js';
import { useData } from '../context/DataContext.jsx';

export function DronePage() {
  const { drones, districts, refreshData } = useData();

  const [selectedDrone, setSelectedDrone] = useState(null);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [targetDistrict, setTargetDistrict] = useState('East Khasi Hills');
  const [missionInput, setMissionInput] = useState('Urgent Landslide Slope Fissure Reconnaissance');
  const [priorityInput, setPriorityInput] = useState('High');
  const [submitting, setSubmitting] = useState(false);

  const handleOpenDispatch = (drone) => {
    setSelectedDrone(drone);
    setTargetDistrict(drone.assignedDistrict || 'East Khasi Hills');
    setDispatchModalOpen(true);
  };

  const handleSendDispatch = async () => {
    if (!selectedDrone) return;
    try {
      setSubmitting(true);
      await dispatchDrone(selectedDrone.droneId, {
        district: targetDistrict,
        mission: missionInput,
        missionPriority: priorityInput,
        reason: 'Manual priority tasking by PurvaDrishti Emergency Operations Center'
      });
      setDispatchModalOpen(false);
      refreshData();
    } catch (err) {
      alert('Dispatch error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const activeMissionsCount = drones.filter(d => d.status === 'On Mission').length;

  return (
    <div className="flex flex-col w-full max-w-[1560px] mx-auto space-y-6 pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[32px] font-bold text-[#18211E] tracking-tight leading-tight">
            Drone Fleet & Aerial Telemetry
          </h1>
          <p className="text-[#7A827D] text-[13px] font-medium mt-0.5">
            Autonomous UAV fleet deployed across steep mountain valleys with optical LiDAR & FLIR thermal payloads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-[#EAF3EE] border border-[#C6E2D0] rounded-xl text-[12px] font-bold text-[#1E4D38] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span>{activeMissionsCount} Active Missions</span>
          </div>
        </div>
      </div>

      {/* Drone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {drones.map((drone) => {
          const isMission = drone.status === 'On Mission';
          const isLowBatt = drone.battery < 30;

          return (
            <div
              key={drone.droneId}
              className="bg-white border border-[#EAE8E1] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-[#2A5A44] transition-all"
            >
              {/* Card Top */}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF3EE] text-[#1E4D38] flex items-center justify-center shrink-0">
                      <Navigation size={18} className="rotate-45" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-bold text-[#18211E]">{drone.name}</h3>
                        <span className="text-[10px] font-mono text-[#7A827D] bg-[#F8F8F5] border border-[#E5E3D8] px-1.5 py-0.5 rounded">
                          {drone.droneId}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A827D] mt-0.5">{drone.model}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    isMission 
                      ? 'bg-[#EAF3EE] border-[#C6E2D0] text-[#1E4D38]' 
                      : (drone.status === 'Available' ? 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]' : 'bg-[#FEFCE8] border-[#FEF9C3] text-[#D97706]')
                  }`}>
                    {drone.status}
                  </span>
                </div>

                {/* Telemetry Strip */}
                <div className="grid grid-cols-3 gap-2 bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl mb-4 text-center">
                  <div>
                    <div className="text-[10px] text-[#7A827D] font-semibold flex items-center justify-center gap-1">
                      <Battery size={12} className={isLowBatt ? 'text-[#DC2626]' : 'text-[#16A34A]'} /> Battery
                    </div>
                    <div className={`text-[13px] font-bold mt-0.5 ${isLowBatt ? 'text-[#DC2626]' : 'text-[#18211E]'}`}>
                      {drone.battery}%
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#7A827D] font-semibold flex items-center justify-center gap-1">
                      <Radio size={12} className="text-[#2563EB]" /> Signal
                    </div>
                    <div className="text-[13px] font-bold text-[#18211E] mt-0.5">
                      {drone.signalStrength?.split(' ')?.[0] || 'Strong'}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#7A827D] font-semibold flex items-center justify-center gap-1">
                      <Compass size={12} className="text-[#D97706]" /> Altitude
                    </div>
                    <div className="text-[13px] font-bold text-[#18211E] mt-0.5">
                      {drone.altitudeMeters}m
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-[12px] mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#7A827D]">Assigned Corridor:</span>
                    <strong className="text-[#1E4D38]">{drone.assignedDistrict}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A827D]">Mission:</span>
                    <span className="text-[#18211E] font-medium text-right max-w-[200px] truncate">{drone.mission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A827D]">Status:</span>
                    <span className="text-[#18211E] font-medium">{drone.inspectionStatus}</span>
                  </div>

                  {/* Sensor Detection */}
                  <div className="mt-2.5 bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl">
                    <div className="text-[10px] font-bold text-[#7A827D] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Eye size={12} className="text-[#1E4D38]" /> Sensor Evidence
                    </div>
                    <p className="text-[11px] text-[#4A534D] leading-relaxed">
                      {drone.detectionEvidence || 'Normal optical LiDAR scan in progress. No critical thermal variance detected.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Action */}
              <button
                onClick={() => handleOpenDispatch(drone)}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-[#19382B] hover:bg-[#234E3B] text-white px-4 py-2 rounded-xl text-[12px] font-semibold transition-all shadow-[0_1px_3px_rgba(25,56,43,0.2)] cursor-pointer"
              >
                <Send size={13} />
                <span>Re-task / Dispatch Mission</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Dispatch Modal */}
      {dispatchModalOpen && selectedDrone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18211E]/40 backdrop-blur-sm p-4" onClick={() => setDispatchModalOpen(false)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-[500px] overflow-hidden shadow-2xl flex flex-col border border-[#EAE8E1]" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-[#EAE8E1] bg-[#F8F8F5]">
              <div>
                <h3 className="text-[16px] font-serif font-bold text-[#18211E]">Dispatch UAV: {selectedDrone.name}</h3>
                <p className="text-[11px] text-[#7A827D]">Assign flight parameters and operational corridor</p>
              </div>
              <button 
                onClick={() => setDispatchModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#EAE8E1] text-[#7A827D] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-[13px]">
              <div>
                <label className="block text-[11px] font-bold text-[#7A827D] uppercase tracking-wider mb-1.5">
                  Target District Corridor
                </label>
                <select
                  className="w-full bg-white border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[#18211E] text-[13px] outline-none focus:border-[#19382B]"
                  value={targetDistrict}
                  onChange={(e) => setTargetDistrict(e.target.value)}
                >
                  {districts.map(d => (
                    <option key={d.name} value={d.name}>{d.name} ({d.severity} Risk)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#7A827D] uppercase tracking-wider mb-1.5">
                  Mission Objective
                </label>
                <input
                  type="text"
                  className="w-full bg-white border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[#18211E] text-[13px] outline-none focus:border-[#19382B]"
                  value={missionInput}
                  onChange={(e) => setMissionInput(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#7A827D] uppercase tracking-wider mb-1.5">
                  Priority Level
                </label>
                <select
                  className="w-full bg-white border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[#18211E] text-[13px] outline-none focus:border-[#19382B]"
                  value={priorityInput}
                  onChange={(e) => setPriorityInput(e.target.value)}
                >
                  <option value="Low">Low - Routine Mapping</option>
                  <option value="Medium">Medium - Regular Patrol</option>
                  <option value="High">High - Post-Rain Inspection</option>
                  <option value="Critical">Critical - Active Rockfall / Flood Warning</option>
                </select>
              </div>
            </div>

            <div className="p-4 border-t border-[#EAE8E1] bg-[#F8F8F5] flex justify-end gap-3">
              <button 
                className="px-4 py-2 bg-white border border-[#E5E3D8] text-[#18211E] hover:bg-[#EAE8E1] rounded-xl font-semibold text-[12px] transition-colors"
                onClick={() => setDispatchModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                disabled={submitting}
                className="px-4 py-2 bg-[#19382B] hover:bg-[#234E3B] text-white rounded-xl font-semibold text-[12px] transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
                onClick={handleSendDispatch}
              >
                {submitting ? 'Dispatching...' : 'Confirm Dispatch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DronePage;
