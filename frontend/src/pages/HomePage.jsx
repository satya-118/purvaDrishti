import React from 'react';
import { HomeNavbar } from '../components/home/HomeNavbar.jsx';
import { HeroSection } from '../components/home/HeroSection.jsx';
import { StatsStrip } from '../components/home/StatsStrip.jsx';
import { WhatWeWatchSection } from '../components/home/WhatWeWatchSection.jsx';
import { LiveSituationSection } from '../components/home/LiveSituationSection.jsx';
import { RightNowSection } from '../components/home/RightNowSection.jsx';
import { FinalCtaSection } from '../components/home/FinalCtaSection.jsx';
import { HomeFooter } from '../components/home/HomeFooter.jsx';
import { DistrictModal } from '../components/DistrictModal.jsx';
import { useData } from '../context/DataContext.jsx';

export function HomePage() {
  const {
    alerts,
    roads,
    districts,
    selectedDistrict,
    setSelectedDistrict
  } = useData();

  const activeAlertsCount = alerts.filter(a => !a.isResolved).length || 12;
  const highRiskRoadsCount = roads.filter(r => r.status === 'Blocked' || r.status === 'Restricted').length || 18;
  const districtsOnWatchCount = districts.filter(d => d.severity === 'Critical' || d.severity === 'High').length || 7;

  return (
    <div className="min-h-screen bg-[#F5F4EE] text-[#18211E] font-sans antialiased selection:bg-[#19382B] selection:text-white">
      {/* Centered Page Layout Container with generous padding */}
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 py-2 md:py-4">
        {/* Navigation Header */}
        <div className="rounded-2xl border border-[#E5E3D8] bg-[#FAF9F5] mb-4 shadow-xs relative z-50">
          <HomeNavbar />
        </div>

        {/* 1. Hero Section */}
        <HeroSection onSelectDistrict={setSelectedDistrict} />

        {/* 2. Hero Statistics Strip */}
        <StatsStrip
          stats={{
            activeAlerts: activeAlertsCount,
            locationsOnWatch: districtsOnWatchCount,
            districtsOnWatch: districtsOnWatchCount,
            vulnerableRoads: highRiskRoadsCount,
            riskAssessments: 86
          }}
        />

        {/* 3. "WHAT WE WATCH" Section */}
        <WhatWeWatchSection />

        {/* 4. "LIVE SITUATION" Section */}
        <LiveSituationSection onSelectDistrict={setSelectedDistrict} />

        {/* 5. "RIGHT NOW" Section */}
        <RightNowSection />

        {/* 6. Final Call To Action */}
        <FinalCtaSection />

        {/* 7. Minimal Footer */}
        <HomeFooter />
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

export default HomePage;
