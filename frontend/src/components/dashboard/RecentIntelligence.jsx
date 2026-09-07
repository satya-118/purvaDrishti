import React from 'react';
import { AlertTriangle, CloudRain, Flame, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoadItemIcon = ({ size = 15, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19 8.5 5h7L20 19" />
    <path d="M12 8v2" />
    <path d="M12 14v2" />
  </svg>
);

export function RecentIntelligence({ alerts = [], historical = [] }) {
  const navigate = useNavigate();

    // 4 Timeline items matching Northeast regional intelligence
  const feedItemsCol1 = [
    {
      id: 'intel-1',
      time: '14:32',
      icon: AlertTriangle,
      iconColor: 'text-[#DC2626]',
      iconBg: 'bg-[#FEE2E2]',
      title: 'Landslide report received',
      location: 'Shillong Peak Bypass, Meghalaya'
    },
    {
      id: 'intel-2',
      time: '14:18',
      icon: CloudRain,
      iconColor: 'text-[#2563EB]',
      iconBg: 'bg-[#EFF6FF]',
      title: 'Rainfall threshold exceeded',
      location: 'Cherrapunji AWS, Meghalaya'
    }
  ];

  const feedItemsCol2 = [
    {
      id: 'intel-3',
      time: '13:54',
      icon: RoadItemIcon,
      iconColor: 'text-[#18211E]',
      iconBg: 'bg-[#EFEEE7]',
      title: 'Road risk elevated',
      location: 'Banderdewa Corridor, Arunachal'
    },
    {
      id: 'intel-4',
      time: '13:21',
      icon: Flame,
      iconColor: 'text-[#E36B25]',
      iconBg: 'bg-[#FFEDD5]',
      title: 'Hill slope fissure alert',
      location: 'Kohima Ridge, Nagaland'
    }
  ];

  return (
    <div className="bg-white border border-[#EAE8E1] rounded-[20px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0EFEA]">
        <div>
          <h3 className="font-serif text-[17px] font-bold text-[#18211E] tracking-tight">
            Recent Intelligence
          </h3>
          <p className="text-[11.5px] text-[#6E756F] font-medium">
            Latest updates from across the Northeast region
          </p>
        </div>

        <button
          onClick={() => navigate('/alerts')}
          className="text-[11.5px] font-semibold text-[#1E4D38] hover:text-[#234E3B] flex items-center gap-1 hover:underline cursor-pointer"
        >
          <span>View All</span>
          <span>→</span>
        </button>
      </div>

      {/* 2-Column Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {/* Column 1 */}
        <div className="flex flex-col gap-3 justify-center">
          {feedItemsCol1.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                onClick={() => navigate('/alerts')}
                className="flex items-start gap-3.5 p-1.5 rounded-xl hover:bg-[#FAF9F5] cursor-pointer transition-colors"
              >
                <div className="text-[12px] font-bold text-[#18211E] font-mono min-w-[40px] pt-1">
                  {item.time}
                </div>
                <div className={`w-8 h-8 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
                  <Icon size={15} strokeWidth={2.2} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#18211E] leading-tight truncate">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-[#6E756F] font-medium truncate mt-0.5">
                    {item.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3 justify-center">
          {feedItemsCol2.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                onClick={() => navigate('/alerts')}
                className="flex items-start gap-3.5 p-1.5 rounded-xl hover:bg-[#FAF9F5] cursor-pointer transition-colors"
              >
                <div className="text-[12px] font-bold text-[#18211E] font-mono min-w-[40px] pt-1">
                  {item.time}
                </div>
                <div className={`w-8 h-8 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}>
                  <Icon size={15} strokeWidth={2.2} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#18211E] leading-tight truncate">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-[#6E756F] font-medium truncate mt-0.5">
                    {item.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

