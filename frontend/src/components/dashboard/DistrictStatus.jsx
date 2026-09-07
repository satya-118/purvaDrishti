import React from 'react';
import { ShieldCheck, ChevronRight, ArrowUpRight, ArrowRight, ArrowDownRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DistrictStatus({ districts = [], onSelectDistrict }) {
  const navigate = useNavigate();

  // Northeast mountain district status rows matching regional risk profile
  const statusRows = [
    {
      name: 'East Khasi Hills',
      level: 'HIGH',
      color: 'text-[#DC2626]',
      trend: '↑',
      trendColor: 'text-[#DC2626]'
    },
    {
      name: 'Papum Pare',
      level: 'HIGH',
      color: 'text-[#DC2626]',
      trend: '↑',
      trendColor: 'text-[#DC2626]'
    },
    {
      name: 'Kamrup Metro',
      level: 'ELEVATED',
      color: 'text-[#E36B25]',
      trend: '→',
      trendColor: 'text-[#E36B25]'
    },
    {
      name: 'Kohima',
      level: 'ELEVATED',
      color: 'text-[#E36B25]',
      trend: '→',
      trendColor: 'text-[#E36B25]'
    },
    {
      name: 'East Sikkim',
      level: 'MODERATE',
      color: 'text-[#D8A32A]',
      trend: '↓',
      trendColor: 'text-[#22C55E]'
    }
  ];

  const handleRowClick = (districtName) => {
    const found = districts.find(d => d.name.toLowerCase() === districtName.toLowerCase());
    if (found && onSelectDistrict) {
      onSelectDistrict(found);
    } else {
      navigate('/landslides');
    }
  };

  return (
    <div className="bg-white border border-[#EAE8E1] rounded-[20px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full select-none">
      
      {/* Header */}
      <div className="pb-2 border-b border-[#F0EFEA]">
        <h3 className="font-serif text-[17px] font-bold text-[#18211E] tracking-tight">
          District Status
        </h3>
        <p className="text-[11.5px] text-[#6E756F] font-medium">
          Current risk level
        </p>
      </div>

      {/* 5 Compact Rows */}
      <div className="flex flex-col gap-1.5 flex-1 justify-center py-1">
        {statusRows.map((row) => (
          <div
            key={row.name}
            onClick={() => handleRowClick(row.name)}
            className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-[#FAF9F5] cursor-pointer transition-colors"
          >
            {/* Left: Shield Icon + District Name */}
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={16} className="text-[#234E3B] shrink-0" strokeWidth={2.2} />
              <span className="text-[13px] font-bold text-[#18211E]">
                {row.name}
              </span>
            </div>

            {/* Right: Severity + Trend Arrow + Chevron */}
            <div className="flex items-center gap-2.5">
              <span className={`text-[10.5px] font-extrabold tracking-wider ${row.color}`}>
                {row.level}
              </span>
              <span className={`text-[12px] font-extrabold ${row.trendColor}`}>
                {row.trend}
              </span>
              <ChevronRight size={14} className="text-[#B5BCB7]" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

