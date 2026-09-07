import React, { useState } from 'react';
import { AlertTriangle, Plus, CheckCircle2, Check, Trash2, X, Bell } from 'lucide-react';
import { createAlert, updateAlertStatus, deleteAlert } from '../api/client.js';
import { useData } from '../context/DataContext.jsx';

export function AlertsPage(props) {
  const contextData = useData();
  const alerts = props.alerts?.length ? props.alerts : (contextData?.alerts || []);
  const districts = props.districts?.length ? props.districts : (contextData?.districts || []);
  const onAlertsChanged = props.onAlertsChanged || contextData?.refreshData;
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterResolved, setFilterResolved] = useState('Active');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [hazardType, setHazardType] = useState('Landslide');
  const [severity, setSeverity] = useState('High');
  const [riskScore, setRiskScore] = useState(75);
  const [district, setDistrict] = useState('East Khasi Hills');
  const [location, setLocation] = useState('Shillong Peak Bypass Corridor');
  const [cause, setCause] = useState('Sudden monsoonal downpour triggered active mudslide');
  const [action, setAction] = useState('Deploy SDRF team and advise travelers to take alternate bypass');
  const [submitting, setSubmitting] = useState(false);

  const filteredAlerts = alerts.filter((a) => {
    const matchesSev = filterSeverity === 'All' || a.severity?.toLowerCase() === filterSeverity.toLowerCase();
    const matchesRes = filterResolved === 'All' 
      ? true 
      : (filterResolved === 'Active' ? !a.isResolved : a.isResolved);
    return matchesSev && matchesRes;
  });

  const handleResolve = async (alertId) => {
    try {
      await updateAlertStatus(alertId, { isResolved: true });
      if (onAlertsChanged) onAlertsChanged();
    } catch (err) {
      alert('Error updating alert: ' + err.message);
    }
  };

  const handleDelete = async (alertId) => {
    if (!window.confirm('Delete this alert?')) return;
    try {
      await deleteAlert(alertId);
      if (onAlertsChanged) onAlertsChanged();
    } catch (err) {
      alert('Error deleting alert: ' + err.message);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert('Please enter an alert title.');
      return;
    }

    try {
      setSubmitting(true);
      await createAlert({
        title,
        hazardType,
        severity,
        riskScore: Number(riskScore),
        district,
        location,
        cause,
        action
      });
      setCreateModalOpen(false);
      setTitle('');
      if (onAlertsChanged) onAlertsChanged();
    } catch (err) {
      alert('Failed to broadcast alert: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[1560px] mx-auto space-y-6 pb-12 select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[32px] font-bold text-[#18211E] tracking-tight leading-tight">
            Disaster Early-Warning Alert Center
          </h1>
          <p className="text-[#7A827D] text-[13px] font-medium mt-0.5">
            Broadcast and manage high-priority landslide, flash flood, and environmental risk advisories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-4 py-2 rounded-xl text-[13px] font-semibold transition-all shadow-sm"
          >
            <Plus size={16} />
            <span>Broadcast Emergency Alert</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-[#EAE8E1] rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-[#7A827D]">Severity:</span>
          {['All', 'Critical', 'High', 'Moderate', 'Low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-colors ${
                filterSeverity === sev 
                  ? 'bg-[#19382B] text-white shadow-sm' 
                  : 'bg-[#F8F8F5] border border-[#E5E3D8] text-[#18211E] hover:bg-[#EAE8E1]'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-[#7A827D]">Status:</span>
          {['Active', 'Resolved', 'All'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterResolved(st)}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-colors ${
                filterResolved === st 
                  ? 'bg-[#19382B] text-white shadow-sm' 
                  : 'bg-[#F8F8F5] border border-[#E5E3D8] text-[#18211E] hover:bg-[#EAE8E1]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white border border-[#EAE8E1] rounded-2xl p-12 text-center text-[#7A827D] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center">
            <CheckCircle2 size={36} className="text-[#16A34A] mb-2" />
            <p className="font-semibold text-[#18211E]">No active alerts matching the selected filters.</p>
            <span className="text-[12px] text-[#7A827D] mt-1">All monitored corridors are currently normal.</span>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCrit = alert.severity === 'Critical';
            const isHigh = alert.severity === 'High';

            return (
              <div
                key={alert._id || alert.title}
                className={`bg-white border rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all ${
                  isCrit ? 'border-[#FEE2E2] bg-[#FEF2F2]/20' : 'border-[#EAE8E1]'
                } ${alert.isResolved ? 'opacity-60' : ''}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <h3 className="text-[16px] font-bold text-[#18211E]">{alert.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        isCrit 
                          ? 'bg-[#FEF2F2] border-[#FEE2E2] text-[#DC2626]' 
                          : (isHigh ? 'bg-[#FFF7ED] border-[#FFEDD5] text-[#EA580C]' : 'bg-[#EAF3EE] border-[#C6E2D0] text-[#1E4D38]')
                      }`}>
                        {alert.severity} ({alert.riskScore})
                      </span>
                      {alert.isResolved && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border bg-[#EAF3EE] border-[#C6E2D0] text-[#16A34A] inline-flex items-center gap-1">
                          <Check size={11} strokeWidth={2.5} />
                          <span>Resolved</span>
                        </span>
                      )}
                    </div>
                    <div className="text-[12px] text-[#7A827D]">
                      <strong>Hazard:</strong> {alert.hazardType} | <strong>District:</strong> {alert.district} ({alert.location}) | <strong>Time:</strong> {alert.createdAtLabel || 'Live'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!alert.isResolved && (
                      <button
                        onClick={() => handleResolve(alert._id || alert.title)}
                        className="px-3 py-1.5 bg-[#EAF3EE] hover:bg-[#D5EADF] border border-[#C6E2D0] text-[#1E4D38] rounded-xl text-[12px] font-semibold transition-colors flex items-center gap-1"
                      >
                        <Check size={14} />
                        <span>Resolve</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(alert._id || alert.title)}
                      className="p-1.5 rounded-xl hover:bg-[#FEF2F2] text-[#DC2626] border border-transparent hover:border-[#FEE2E2] transition-colors"
                      title="Delete Alert"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="text-[13px] text-[#4A534D] mb-3">
                  <strong>Trigger Cause: </strong>
                  <span>{alert.cause}</span>
                </div>

                <div className="bg-[#F8F8F5] border border-[#EAE8E1] p-3 rounded-xl text-[12px]">
                  <strong className="text-[#1E4D38]">Response Directive: </strong>
                  <span className="text-[#18211E]">{alert.action}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Broadcast Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#18211E]/40 backdrop-blur-sm p-4" onClick={() => setCreateModalOpen(false)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-[540px] overflow-hidden shadow-2xl flex flex-col border border-[#EAE8E1]" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-5 border-b border-[#EAE8E1] bg-[#F8F8F5]">
              <div>
                <h3 className="text-[16px] font-serif font-bold text-[#18211E]">Broadcast Emergency Advisory</h3>
                <p className="text-[11px] text-[#7A827D]">Issue official disaster early-warning bulletins</p>
              </div>
              <button 
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#EAE8E1] text-[#7A827D] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-4 text-[13px]">
              <div>
                <label className="block text-[11px] font-bold text-[#7A827D] uppercase tracking-wider mb-1.5">Alert Title</label>
                <input
                  type="text"
                  className="w-full bg-white border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[#18211E] text-[13px] outline-none"
                  placeholder="e.g. FLASH FLOOD WARNING: Barak / Kopili River Basin"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#7A827D] uppercase tracking-wider mb-1.5">Hazard Type</label>
                  <select className="w-full bg-white border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[#18211E] text-[13px] outline-none" value={hazardType} onChange={(e) => setHazardType(e.target.value)}>
                    <option value="Landslide">Landslide</option>
                    <option value="Flash Flood">Flash Flood</option>
                    <option value="Cloudburst">Cloudburst</option>
                    <option value="Road Block">Road Block</option>
                    <option value="Forest Fire">Forest Fire</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#7A827D] uppercase tracking-wider mb-1.5">Severity Level</label>
                  <select className="w-full bg-white border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[#18211E] text-[13px] outline-none" value={severity} onChange={(e) => setSeverity(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#7A827D] uppercase tracking-wider mb-1.5">District</label>
                  <select className="w-full bg-white border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[#18211E] text-[13px] outline-none" value={district} onChange={(e) => setDistrict(e.target.value)}>
                    {districts.map(d => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#7A827D] uppercase tracking-wider mb-1.5">Location / Corridor</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[#18211E] text-[13px] outline-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#7A827D] uppercase tracking-wider mb-1.5">Trigger Cause</label>
                <input
                  type="text"
                  className="w-full bg-white border border-[#E5E3D8] rounded-xl px-3.5 py-2 text-[#18211E] text-[13px] outline-none"
                  value={cause}
                  onChange={(e) => setCause(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#7A827D] uppercase tracking-wider mb-1.5">Recommended Directive / Protocol</label>
                <textarea
                  className="w-full bg-white border border-[#E5E3D8] rounded-xl p-3 text-[#18211E] text-[13px] outline-none"
                  rows={2}
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                />
              </div>

              <div className="pt-2 border-t border-[#EAE8E1] flex justify-end gap-3">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-white border border-[#E5E3D8] text-[#18211E] hover:bg-[#EAE8E1] rounded-xl font-semibold text-[12px] transition-colors"
                  onClick={() => setCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="px-4 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-xl font-semibold text-[12px] transition-colors shadow-sm disabled:opacity-60"
                >
                  {submitting ? 'Broadcasting...' : 'Broadcast Alert'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AlertsPage;
