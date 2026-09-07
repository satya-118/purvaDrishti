import React from 'react';
import { AlertTriangle, Mountain, CloudRain, Flame, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function WhatNeedsAttention({ alerts = [] }) {
  const navigate = useNavigate();

  // Regional alerts default list matching Northeast India risk corridors
  const defaultAlerts = [
    {
      id: 'alert-1',
      severity: 'CRITICAL',
      severityType: 'critical',
      icon: AlertTriangle,
      iconColor: 'text-[#DC2626]',
      iconBg: 'bg-[#FEE2E2]',
      title: 'Flash-flood / landslide warning',
      district: 'Dima Hasao Corridor',
      detail: 'Updated 4 min ago',
      cardBg: 'bg-[#FEF7F6]',
      borderColor: 'border-[#FDD8D5]'
    },
    {
      id: 'alert-2',
      severity: 'HIGH',
      severityType: 'high',
      icon: Mountain,
      iconColor: 'text-[#E36B25]',
      iconBg: 'bg-[#FFEDD5]',
      title: 'Landslide Risk',
      district: 'East Khasi Hills',
      detail: 'Risk score 82/100',
      cardBg: 'bg-[#FFF8F2]',
      borderColor: 'border-[#FEE9D6]'
    },
    {
      id: 'alert-3',
      severity: 'HIGH',
      severityType: 'high',
      icon: CloudRain,
      iconColor: 'text-[#E36B25]',
      iconBg: 'bg-[#FFEDD5]',
      title: 'Heavy Rainfall',
      district: 'Cherrapunji AWS',
      detail: '148 mm recorded in 3 hr',
      cardBg: 'bg-[#FFF8F2]',
      borderColor: 'border-[#FEE9D6]'
    },
    {
      id: 'alert-4',
      severity: 'MODERATE',
      severityType: 'moderate',
      icon: Flame,
      iconColor: 'text-[#D8A32A]',
      iconBg: 'bg-[#FEF3C7]',
      title: 'Slope Fissure Alert',
      district: 'Papum Pare',
      detail: 'Elevated • Unstable strata',
      cardBg: 'bg-[#FFFDF5]',
      borderColor: 'border-[#FDF0D5]'
    }
  ];

  // If live alerts are present, map up to 4 or fallback to default
  const displayItems = alerts.length >= 4 
    ? alerts.slice(0, 4).map((a, idx) => {
        const sev = (a.severity || 'Moderate').toUpperCase();
        let Icon = AlertTriangle;
        let iconBg = 'bg-[#FEF3C7]';
        let iconColor = 'text-[#D8A32A]';
        let cardBg = 'bg-[#FFFDF5]';
        let borderColor = 'border-[#FDF0D5]';

        if (sev === 'CRITICAL') {
          Icon = AlertTriangle;
          iconBg = 'bg-[#FEE2E2]';
          iconColor = 'text-[#DC2626]';
          cardBg = 'bg-[#FEF7F6]';
          borderColor = 'border-[#FDD8D5]';
        } else if (sev === 'HIGH') {
          Icon = a.hazardType === 'Rainfall' ? CloudRain : Mountain;
          iconBg = 'bg-[#FFEDD5]';
          iconColor = 'text-[#E36B25]';
          cardBg = 'bg-[#FFF8F2]';
          borderColor = 'border-[#FEE9D6]';
        }

        return {
          id: a._id || `live-${idx}`,
          severity: sev,
          icon: Icon,
          iconColor,
          iconBg,
          title: a.title || 'Disaster Warning',
          district: a.district || 'Statewide',
          detail: a.location ? `${a.location}` : 'Active anomaly monitored',
          cardBg,
          borderColor
        };
      })
    : defaultAlerts;

  return (
    <div className="bg-white border border-[#EAE8E1] rounded-[20px] p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col h-full select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#F0EFEA]">
        <h2 className="text-[13px] sm:text-[13.5px] font-bold text-[#18211E] tracking-wider uppercase">
          WHAT NEEDS ATTENTION
        </h2>
        <button
          onClick={() => navigate('/alerts')}
          className="text-[12px] font-semibold text-[#1E4D38] hover:text-[#234E3B] flex items-center gap-1 hover:underline cursor-pointer"
        >
          <span>View All Alerts</span>
          <span>→</span>
        </button>
      </div>

      {/* 4 Compact Alert Rows */}
      <div className="flex flex-col gap-2.5 flex-1 justify-between">
        {displayItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => navigate('/alerts')}
              className={`${item.cardBg} border ${item.borderColor} rounded-[14px] p-3 sm:p-3.5 flex items-center justify-between cursor-pointer transition-all duration-150 hover:shadow-xs hover:scale-[1.01]`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Severity Icon */}
                <div className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
                  <Icon size={17} strokeWidth={2.2} />
                </div>

                {/* Info */}
                <div className="flex flex-col min-w-0">
                  <span className={`text-[10px] font-extrabold tracking-wider ${
                    item.severity === 'CRITICAL' 
                      ? 'text-[#DC2626]' 
                      : (item.severity === 'HIGH' ? 'text-[#E36B25]' : 'text-[#D8A32A]')
                  }`}>
                    {item.severity}
                  </span>
                  <div className="text-[13px] font-bold text-[#18211E] truncate leading-tight mt-0.5">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-[#6E756F] font-medium truncate mt-0.5">
                    <span className="font-semibold text-[#4A534D]">{item.district}</span>
                    <span className="mx-1.5 opacity-60">•</span>
                    <span>{item.detail}</span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight size={16} className="text-[#A5ACA6] shrink-0 ml-2" />
            </div>
          );
        })}
      </div>

    </div>
  );
}

