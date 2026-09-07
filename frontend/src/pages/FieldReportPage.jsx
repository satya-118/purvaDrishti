import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Send, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { NORTHEAST_STATES } from '../utils/constants';

export default function FieldReportPage() {
  const [reports, setReports] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  const [formData, setFormData] = useState({
    category: 'Crack Observation',
    severity: 'Moderate',
    district: NORTHEAST_STATES[0].name,
    description: '',
    latitude: '',
    longitude: ''
  });

  useEffect(() => {
    fetchReports();
    
    const handleOnline = () => {
      setIsOffline(false);
      syncOfflineReports();
    };
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports');
      const json = await response.json();
      if (json.success) setReports(json.data);
    } catch (e) {
      console.error('Failed to fetch reports:', e);
    }
  };

  const syncOfflineReports = async () => {
    const offlineReports = JSON.parse(localStorage.getItem('offlineReports') || '[]');
    if (offlineReports.length === 0) return;
    
    let synced = 0;
    for (const report of offlineReports) {
      try {
        await fetch('http://localhost:5000/api/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(report)
        });
        synced++;
      } catch (e) {
        console.error('Failed to sync offline report', e);
      }
    }
    
    if (synced > 0) {
      const remaining = offlineReports.slice(synced);
      localStorage.setItem('offlineReports', JSON.stringify(remaining));
      fetchReports();
    }
  };

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData(prev => ({
            ...prev,
            latitude: pos.coords.latitude.toFixed(6),
            longitude: pos.coords.longitude.toFixed(6)
          }));
        },
        (err) => alert('Geolocation failed. Please enter coordinates manually.')
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const reportPayload = {
      ...formData,
      reporterRole: 'Citizen',
      coordinates: {
        latitude: parseFloat(formData.latitude) || 0,
        longitude: parseFloat(formData.longitude) || 0
      }
    };
    
    if (isOffline) {
      const offlineReports = JSON.parse(localStorage.getItem('offlineReports') || '[]');
      offlineReports.push({ ...reportPayload, status: 'Pending Sync', createdAt: new Date() });
      localStorage.setItem('offlineReports', JSON.stringify(offlineReports));
      setReports(prev => [{ ...reportPayload, status: 'Pending Sync (Offline)', createdAt: new Date() }, ...prev]);
      alert('You are offline. Report saved locally and will sync when connection returns.');
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reportPayload)
        });
        if (response.ok) {
          fetchReports();
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('Server unreachable. Could not submit report.');
      }
    }
    
    setIsSubmitting(false);
    setFormData({ ...formData, description: '', latitude: '', longitude: '' });
  };

  return (
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white border border-[#EAE8E1] rounded-[20px] p-6 shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#18211E]">Field Observations</h1>
            <p className="text-[#6E756F] text-sm mt-1">Submit citizen reports & geo-tagged intelligence</p>
          </div>
          {isOffline && (
            <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium border border-amber-200">
              <AlertTriangle size={16} /> Working Offline - Reports will sync automatically
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Submission Form */}
          <div className="lg:col-span-5 bg-white border border-[#EAE8E1] rounded-[20px] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#18211E] mb-5 pb-3 border-b border-[#F0EFEA] flex items-center gap-2">
              <Camera size={18} className="text-[#234E3B]" /> New Report
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#4A534D] mb-1.5 uppercase tracking-wider">Category</label>
                <select 
                  className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#234E3B]"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>Crack Observation</option>
                  <option>Slope Movement</option>
                  <option>Blocked Road</option>
                  <option>Waterlogging</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A534D] mb-1.5 uppercase tracking-wider">Severity</label>
                  <select 
                    className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#234E3B]"
                    value={formData.severity}
                    onChange={e => setFormData({...formData, severity: e.target.value})}
                  >
                    <option>Low</option>
                    <option>Moderate</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4A534D] mb-1.5 uppercase tracking-wider">Region</label>
                  <select 
                    className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#234E3B]"
                    value={formData.district}
                    onChange={e => setFormData({...formData, district: e.target.value})}
                  >
                    {NORTHEAST_STATES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A534D] mb-1.5 uppercase tracking-wider flex justify-between">
                  Coordinates
                  <button type="button" onClick={getGeoLocation} className="text-[#2563EB] flex items-center gap-1 hover:underline">
                    <MapPin size={12} /> Get GPS
                  </button>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Lat" className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-xl px-4 py-2 text-sm" value={formData.latitude} onChange={e => setFormData({...formData, latitude: e.target.value})} required />
                  <input type="text" placeholder="Lng" className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-xl px-4 py-2 text-sm" value={formData.longitude} onChange={e => setFormData({...formData, longitude: e.target.value})} required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A534D] mb-1.5 uppercase tracking-wider">Media Upload</label>
                <div className="w-full border-2 border-dashed border-[#DCD8CA] rounded-xl p-4 text-center cursor-pointer hover:bg-[#FAF9F5] transition-colors">
                  <Camera size={24} className="mx-auto text-[#8A958E] mb-2" />
                  <span className="text-xs text-[#6E756F]">Tap to capture photo or video</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A534D] mb-1.5 uppercase tracking-wider">Description</label>
                <textarea 
                  rows="3"
                  className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#234E3B]"
                  placeholder="Describe the observation in detail..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#18211E] text-white rounded-xl py-3.5 font-medium flex items-center justify-center gap-2 hover:bg-[#2C3531] transition-colors disabled:opacity-70"
              >
                <Send size={18} /> {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>
          </div>

          {/* Recent Reports List */}
          <div className="lg:col-span-7 bg-white border border-[#EAE8E1] rounded-[20px] p-6 shadow-sm overflow-hidden flex flex-col h-[650px]">
            <h2 className="text-lg font-bold text-[#18211E] mb-5 pb-3 border-b border-[#F0EFEA]">
              Recent Field Intelligence
            </h2>
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {reports.length === 0 ? (
                <div className="text-center py-10 text-[#8A958E]">
                  <AlertCircle size={32} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No recent reports logged in the system.</p>
                </div>
              ) : (
                reports.map((report, idx) => (
                  <div key={idx} className="bg-[#FAF9F5] border border-[#E5E3D8] rounded-xl p-4 flex gap-4">
                    <div className="mt-1">
                      {report.severity === 'Critical' || report.severity === 'High' ? (
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                          <AlertTriangle size={16} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <CheckCircle size={16} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-[#18211E] text-sm">{report.category}</h4>
                        <span className="text-[10px] bg-white border border-[#E5E3D8] px-2 py-0.5 rounded text-[#6E756F]">
                          {new Date(report.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#8A958E] mb-2">{report.district} &bull; {report.reporterRole}</p>
                      <p className="text-sm text-[#4A534D] bg-white border border-[#E5E3D8] p-3 rounded-lg leading-relaxed">
                        {report.description}
                      </p>
                      {report.status && report.status.includes('Offline') && (
                        <p className="text-xs text-amber-600 mt-2 flex items-center gap-1 font-medium">
                          <AlertTriangle size={12} /> Pending Sync
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
