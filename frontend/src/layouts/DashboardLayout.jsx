import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header.jsx';
import { Sidebar } from '../components/Sidebar.jsx';
import { DistrictModal } from '../components/DistrictModal.jsx';
import { useData } from '../context/DataContext.jsx';

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    loading,
    isRefreshing,
    refreshData,
    criticalAlertsCount,
    blockedRoadsCount,
    activeDronesCount,
    selectedDistrict,
    setSelectedDistrict,
    districts,
    roads,
    drones,
    fireRisks,
    alerts,
    weatherData
  } = useData();

  // Extract current tab id from pathname (e.g. /dashboard -> 'overview', /map -> 'map')
  const getCurrentTab = () => {
    const path = location.pathname.replace('/', '');
    if (!path || path === 'dashboard') return 'overview';
    return path;
  };

  const handleSelectTab = (tabId) => {
    if (tabId === 'home') {
      navigate('/');
    } else if (tabId === 'overview') {
      navigate('/dashboard');
    } else {
      navigate(`/${tabId}`);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#F7F6F1] overflow-hidden select-none">
      {/* Navigation Sidebar (Left full height, 240px wide) */}
      <Sidebar
        activeTab={getCurrentTab()}
        onSelectTab={handleSelectTab}
        counts={{
          blockedRoads: blockedRoadsCount,
          activeDrones: activeDronesCount,
          criticalAlerts: criticalAlertsCount || 2
        }}
      />

      {/* Main Right Column (Top Toolbar + Content Area) */}
      <div className="flex flex-col flex-1 h-screen min-w-0 overflow-hidden">
        <Header
          onRefresh={refreshData}
          isRefreshing={isRefreshing}
          criticalAlertCount={criticalAlertsCount}
          onNavigateHome={() => navigate('/')}
        />

        <main className="flex-1 overflow-y-auto bg-[#F7F6F1] px-6 py-6 lg:px-8 lg:py-7">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#19382B] border-t-transparent animate-spin"></div>
              <p className="text-sm font-medium text-[#7A827D]">Initializing PurvaDrishti Disaster Intelligence Radar...</p>
            </div>
          ) : (
            <Outlet context={{
              districts,
              roads,
              drones,
              fireRisks,
              alerts,
              weatherData,
              onRefresh: refreshData,
              isRefreshing,
              onSelectDistrict: setSelectedDistrict
            }} />
          )}
        </main>
      </div>

      {/* District Detail Modal */}
      {selectedDistrict && (
        <DistrictModal
          district={selectedDistrict}
          onClose={() => setSelectedDistrict(null)}
        />
      )}
    </div>
  );
}
