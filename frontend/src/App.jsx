import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { DashboardLayout } from './layouts/DashboardLayout.jsx';

// Pages
import { HomePage } from './pages/HomePage.jsx';
import { DashboardOverview } from './pages/DashboardOverview.jsx';
import { MapPage } from './pages/MapPage.jsx';
import { RainfallPage } from './pages/RainfallPage.jsx';
import { LandslidePage } from './pages/LandslidePage.jsx';
import { RoadSafetyPage } from './pages/RoadSafetyPage.jsx';
import { DronePage } from './pages/DronePage.jsx';
import { FireRiskPage } from './pages/FireRiskPage.jsx';
import { AlertsPage } from './pages/AlertsPage.jsx';
import { HistoricalPage } from './pages/HistoricalPage.jsx';
import { SimulationPage } from './pages/SimulationPage.jsx';
import FieldReportPage from './pages/FieldReportPage.jsx';

export function App() {
  return (
    <LanguageProvider>
      <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Intelligence Presentation Page */}
          <Route path="/" element={<HomePage />} />

          {/* Operational Command Center (Future Auth protected wrapper) */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/rainfall" element={<RainfallPage />} />
            <Route path="/landslides" element={<LandslidePage />} />
            <Route path="/roads" element={<RoadSafetyPage />} />
            <Route path="/drones" element={<DronePage />} />
            <Route path="/fire" element={<FireRiskPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/history" element={<HistoricalPage />} />
            <Route path="/historical" element={<Navigate to="/history" replace />} />
            <Route path="/simulation" element={<SimulationPage />} />
            <Route path="/reports" element={<FieldReportPage />} />
          </Route>

          {/* Fallback wildcard redirect to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
    </LanguageProvider>
  );
}

export default App;
