import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mountain, CloudRain, AlertTriangle, BarChart3 } from 'lucide-react';

export function RightNowSection() {
  const navigate = useNavigate();

  const attentionItems = [
    {
      id: 'meghalaya-landslide',
      icon: Mountain,
      iconBg: 'bg-[#DC2626]',
      title: 'High Landslide Risk',
      location: 'Meghalaya',
      note: 'Increased activity after heavy rainfall',
      route: '/landslides'
    },
    {
      id: 'assam-rainfall',
      icon: CloudRain,
      iconBg: 'bg-[#2563EB]',
      title: 'Heavy Rainfall',
      location: 'Assam',
      note: 'Above normal levels recorded',
      route: '/rainfall'
    },
    {
      id: 'arunachal-terrain',
      icon: AlertTriangle,
      iconBg: 'bg-[#EA580C]',
      title: 'Terrain Vulnerability',
      location: 'Arunachal Pradesh',
      note: 'Unstable slopes in several corridors',
      route: '/landslides'
    },
    {
      id: 'mizoram-elevated',
      icon: BarChart3,
      iconBg: 'bg-[#D97706]',
      title: 'Elevated Conditions',
      location: 'Mizoram',
      note: 'Heightened monitoring advised',
      route: '/alerts'
    }
  ];

  return (
    <div className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-2xl md:rounded-[24px] p-6 md:p-8 mb-8 shadow-subtle select-none">
      {/* Eyebrow */}
      <div className="text-[11px] font-bold tracking-[0.2em] text-[#6E756F] uppercase mb-5">
        WHAT DESERVES ATTENTION
      </div>

      {/* 4 Clean Actionable Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {attentionItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => navigate(item.route)}
              className="bg-white border border-[#E5E3D8] rounded-2xl p-4 sm:p-5 flex items-start gap-4 cursor-pointer group transition-all duration-200 hover:shadow-md hover:border-[#CCD4CB] hover:translate-y-[-2px]"
            >
              {/* Circular Severity Icon Badge */}
              <div className={`w-11 h-11 rounded-full ${item.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                <Icon size={20} />
              </div>

              {/* Card Details */}
              <div className="min-w-0 flex-1">
                <h4 className="text-[14px] font-bold text-[#18211E] leading-tight group-hover:text-[#19382B] transition-colors">
                  {item.title}
                </h4>
                <div className="text-[12.5px] font-semibold text-[#2C3531] mt-0.5">
                  {item.location}
                </div>
                <div className="text-[11.5px] text-[#6E756F] leading-snug mt-1 font-medium">
                  {item.note}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RightNowSection;
