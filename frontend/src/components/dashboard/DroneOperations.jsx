import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuadcopterIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="2.5" />
    <path d="m10.2 10.2-3.5-3.5" />
    <path d="m13.8 10.2 3.5-3.5" />
    <path d="m10.2 13.8-3.5 3.5" />
    <path d="m13.8 13.8 3.5 3.5" />
    <circle cx="5.5" cy="5.5" r="2" />
    <circle cx="18.5" cy="5.5" r="2" />
    <circle cx="5.5" cy="18.5" r="2" />
    <circle cx="18.5" cy="18.5" r="2" />
  </svg>
);

export function DroneOperations({ drones = [] }) {
  const navigate = useNavigate();

  const missions = [
    {
      id: 'drone-1',
      district: 'Shillong Valley',
      mission: 'Landslide corridor LiDAR monitoring',
      status: 'LIVE',
      statusColor: 'text-[#1E4D38] bg-[#EAF3EE] border-[#C6E2D0]',
      iconColor: 'text-[#234E3B]'
    },
    {
      id: 'drone-2',
      district: 'Siang Gorge',
      mission: 'Slope inspection & telemetry',
      status: 'LIVE',
      statusColor: 'text-[#1E4D38] bg-[#EAF3EE] border-[#C6E2D0]',
      iconColor: 'text-[#4A534D]'
    },
    {
      id: 'drone-3',
      district: 'Kohima Pass',
      mission: 'Mountain route reconnaissance',
      status: 'STANDBY',
      statusColor: 'text-[#6E756F] bg-[#FAF9F5] border-[#E5E3D8]',
      iconColor: 'text-[#234E3B]'
    },
    {
      id: 'drone-4',
      district: 'Dima Hasao',
      mission: 'Hillside & railway cut monitoring',
      status: 'IN FLIGHT',
      statusColor: 'text-[#2563EB] bg-[#EFF6FF] border-[#BFDBFE]',
      iconColor: 'text-[#4A534D]'
    }
  ];

  return (
    <div 
      onClick={() => navigate('/drones')}
      className="bg-white border border-[#EAE8E1] rounded-[20px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full cursor-pointer hover:shadow-xs transition-all select-none"
    >
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0EFEA]">
        <div>
          <h3 className="font-serif text-[17px] font-bold text-[#18211E] tracking-tight">
            Drone Operations
          </h3>
          <p className="text-[11.5px] text-[#6E756F] font-medium">
            3 Active Missions
          </p>
        </div>

        <ChevronRight size={16} className="text-[#8E958F]" />
      </div>

      {/* Grid of Drone Missions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 items-center">
        {missions.map((m) => (
          <div 
            key={m.id}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF9F5] transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <QuadcopterIcon size={18} className={m.iconColor} />
              <div className="flex flex-col min-w-0">
                <span className="text-[12.5px] font-bold text-[#18211E] truncate leading-tight">
                  {m.district}
                </span>
                <span className="text-[10.5px] text-[#6E756F] font-medium truncate mt-0.5">
                  {m.mission}
                </span>
              </div>
            </div>

            {m.status && (
              <span className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-md border shrink-0 uppercase tracking-wider ml-1.5 ${m.statusColor}`}>
                {m.status}
              </span>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

