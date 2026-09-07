import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ShieldCheck, Radio, FileText } from 'lucide-react';

export function StatsStrip({ stats = {} }) {
  const navigate = useNavigate();

  const statItems = [
    {
      id: 'alerts',
      icon: Bell,
      iconBg: 'bg-[#FEE2E2]',
      iconColor: 'text-[#DC2626]',
      value: stats.activeAlerts || '12',
      label: 'Active Alerts',
      desc: 'Areas requiring immediate attention',
      route: '/alerts'
    },
    {
      id: 'locations',
      icon: ShieldCheck,
      iconBg: 'bg-[#ECFDF5]',
      iconColor: 'text-[#059669]',
      value: stats.locationsOnWatch || stats.districtsOnWatch || '18',
      label: 'Locations on Watch',
      desc: 'Monitoring changing slope conditions',
      route: '/landslides'
    },
    {
      id: 'monitoring',
      icon: Radio,
      iconBg: 'bg-[#E0F2FE]',
      iconColor: 'text-[#0284C7]',
      value: '24/7',
      label: 'Continuous Monitoring',
      desc: 'Real-time telemetry and analysis',
      route: '/drones'
    },
    {
      id: 'assessments',
      icon: FileText,
      iconBg: 'bg-[#FEF3C7]',
      iconColor: 'text-[#D97706]',
      value: stats.riskAssessments || '86',
      label: 'Risk Assessments',
      desc: 'Multi-source environmental models',
      route: '/simulation'
    }
  ];

  return (
    <div className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-2xl md:rounded-[22px] p-5 md:p-6 mb-8 shadow-subtle select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#E5E3D8]">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => navigate(item.route)}
              className={`flex items-center gap-4 cursor-pointer group transition-all duration-150 hover:translate-y-[-1px] ${
                idx !== 0 ? 'lg:pl-8' : ''
              } ${idx % 2 !== 0 ? 'sm:pl-6 lg:pl-8' : ''} ${idx >= 2 ? 'pt-4 sm:pt-0' : ''}`}
            >
              {/* Circular Icon Container */}
              <div className={`w-12 h-12 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 shadow-xs`}>
                <Icon size={22} strokeWidth={2} />
              </div>

              {/* Metric Number, Title, and Explanatory Subtitle */}
              <div>
                <div className="font-serif text-[30px] md:text-[34px] font-bold text-[#18211E] leading-none mb-1">
                  {item.value}
                </div>
                <div className="text-[13px] md:text-[14px] text-[#18211E] font-semibold leading-tight">
                  {item.label}
                </div>
                <div className="text-[11.5px] text-[#6E756F] font-medium mt-0.5">
                  {item.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatsStrip;
