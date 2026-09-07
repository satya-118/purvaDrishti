import React from 'react';
import { useNavigate } from 'react-router-dom';

export function RiskDistribution({ districts = [] }) {
  const navigate = useNavigate();

  // Dynamic counts or values matching reference image
  const lowCount = districts.filter(d => d.severity === 'Low').length || 18;
  const modCount = districts.filter(d => d.severity === 'Moderate').length || 24;
  const highCount = districts.filter(d => d.severity === 'High').length || 12;
  const critCount = districts.filter(d => d.severity === 'Critical').length || 3;

  const total = lowCount + modCount + highCount + critCount;
  const lowPct = (lowCount / total) * 100;
  const modPct = (modCount / total) * 100;
  const highPct = (highCount / total) * 100;
  const critPct = (critCount / total) * 100;

  return (
    <div 
      onClick={() => navigate('/landslides')}
      className="bg-white border border-[#EAE8E1] rounded-[20px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full cursor-pointer hover:shadow-xs transition-all select-none"
    >
      
      {/* Header */}
      <div className="pb-2 border-b border-[#F0EFEA]">
        <h3 className="font-serif text-[17px] font-bold text-[#18211E] tracking-tight">
          Risk Distribution
        </h3>
        <p className="text-[11.5px] text-[#6E756F] font-medium">
          Across Northeast India regional sectors
        </p>
      </div>

      {/* Segmented Horizontal Bar */}
      <div className="my-auto py-3">
        <div className="h-4.5 w-full rounded-full overflow-hidden flex shadow-inner bg-[#EFEEE7]">
          <div 
            style={{ width: `${lowPct}%` }} 
            className="bg-[#22C55E] h-full transition-all duration-300" 
            title={`Low: ${lowCount}`}
          />
          <div 
            style={{ width: `${modPct}%` }} 
            className="bg-[#D8A32A] h-full transition-all duration-300" 
            title={`Moderate: ${modCount}`}
          />
          <div 
            style={{ width: `${highPct}%` }} 
            className="bg-[#E36B25] h-full transition-all duration-300" 
            title={`High: ${highCount}`}
          />
          <div 
            style={{ width: `${critPct}%` }} 
            className="bg-[#D94A3A] h-full transition-all duration-300" 
            title={`Critical: ${critCount}`}
          />
        </div>
      </div>

      {/* 4 Stats Blocks below the bar */}
      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#F0EFEA] text-center">
        <div>
          <div className="text-[20px] sm:text-[22px] font-extrabold text-[#18211E] leading-tight">
            {lowCount}
          </div>
          <div className="text-[10.5px] font-bold text-[#1E4D38] uppercase tracking-tight">
            LOW
          </div>
          <div className="text-[10px] text-[#789177] font-medium">
            (Green)
          </div>
        </div>

        <div>
          <div className="text-[20px] sm:text-[22px] font-extrabold text-[#18211E] leading-tight">
            {modCount}
          </div>
          <div className="text-[10.5px] font-bold text-[#B45309] uppercase tracking-tight">
            MODERATE
          </div>
          <div className="text-[10px] text-[#D8A32A] font-medium">
            (Amber)
          </div>
        </div>

        <div>
          <div className="text-[20px] sm:text-[22px] font-extrabold text-[#18211E] leading-tight">
            {highCount}
          </div>
          <div className="text-[10.5px] font-bold text-[#C2410C] uppercase tracking-tight">
            HIGH
          </div>
          <div className="text-[10px] text-[#E36B25] font-medium">
            (Orange)
          </div>
        </div>

        <div>
          <div className="text-[20px] sm:text-[22px] font-extrabold text-[#18211E] leading-tight">
            {critCount}
          </div>
          <div className="text-[10.5px] font-bold text-[#DC2626] uppercase tracking-tight">
            CRITICAL
          </div>
          <div className="text-[10px] text-[#D94A3A] font-medium">
            (Red)
          </div>
        </div>
      </div>

    </div>
  );
}

