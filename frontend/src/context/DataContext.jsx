import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getDistricts,
  getRoads,
  getDrones,
  getFireRisks,
  getAlerts,
  getRainfallSummary
} from '../api/client.js';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Core telemetry states
  const [districts, setDistricts] = useState([]);
  const [roads, setRoads] = useState([]);
  const [drones, setDrones] = useState([]);
  const [fireRisks, setFireRisks] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const loadAllData = async (isManual = false) => {
    try {
      if (isManual) setIsRefreshing(true);
      else setLoading(true);

      const [distRes, roadsRes, dronesRes, fireRes, alertsRes, weatherRes] = await Promise.all([
        getDistricts().catch(() => []),
        getRoads().catch(() => ({ data: [] })),
        getDrones().catch(() => ({ data: [] })),
        getFireRisks().catch(() => ({ data: [] })),
        getAlerts().catch(() => ({ data: [] })),
        getRainfallSummary().catch(() => null)
      ]);

      setDistricts((Array.isArray(distRes) ? distRes : distRes?.data) || []);
      setRoads((Array.isArray(roadsRes) ? roadsRes : roadsRes?.data) || []);
      setDrones((Array.isArray(dronesRes) ? dronesRes : dronesRes?.data) || []);
      setFireRisks((Array.isArray(fireRes) ? fireRes : fireRes?.data) || []);
      setAlerts((Array.isArray(alertsRes) ? alertsRes : alertsRes?.data) || []);
      setWeatherData(weatherRes?.data || weatherRes || null);

    } catch (error) {
      console.error('[DataContext] Error loading system data:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllData();
    const interval = setInterval(() => loadAllData(false), 60000); // 60s background refresh
    return () => clearInterval(interval);
  }, []);

  const criticalAlertsCount = alerts.filter(a => a.severity === 'Critical' && !a.isResolved).length;
  const blockedRoadsCount = roads.filter(r => r.status === 'Blocked').length;
  const activeDronesCount = drones.filter(d => d.status === 'On Mission').length;
  const highRiskDistrictsCount = districts.filter(d => d.severity === 'Critical' || d.severity === 'High').length;

  return (
    <DataContext.Provider
      value={{
        loading,
        isRefreshing,
        selectedDistrict,
        setSelectedDistrict,
        districts,
        roads,
        drones,
        fireRisks,
        alerts,
        weatherData,
        criticalAlertsCount,
        blockedRoadsCount,
        activeDronesCount,
        highRiskDistrictsCount,
        refreshData: () => loadAllData(true),
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
