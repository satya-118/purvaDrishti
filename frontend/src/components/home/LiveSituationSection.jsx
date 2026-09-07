import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, AlertTriangle, AlertCircle } from 'lucide-react';
import { NortheastVectorMap } from './NortheastVectorMap.jsx';

export function LiveSituationSection({ onSelectDistrict }) {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-3xl md:rounded-[28px] p-6 md:p-10 lg:p-12 mb-8 shadow-subtle select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading, Paragraph & Compact Map Legend */}
        <div className="lg:col-span-5 max-w-[420px]">
          <div className="text-[11.5px] font-bold tracking-[0.2em] text-[#6E756F] uppercase mb-3">
            LIVE REGIONAL SITUATION
          </div>

          <h2 className="font-serif text-[38px] md:text-[46px] leading-[1.1] text-[#18211E] font-normal mb-4">
            See what is changing<br />
            across the region.
          </h2>

          <p className="text-[14px] text-[#4F5B53] leading-relaxed mb-8">
            Real-time view of rainfall, landslide activity and risk conditions across Northeast India.
          </p>

          {/* Compact Two-Column Legend Box matching reference image */}
          <div className="bg-[#EBE9DE]/70 border border-[#D8D5C6] rounded-2xl p-4.5 max-w-[340px] shadow-xs">
            <div className="grid grid-cols-2 gap-4 text-[12px] text-[#2C3531]">
              {/* Left Column: Severity Levels */}
              <div className="flex flex-col gap-2.5 font-medium">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                  <span>Low Risk</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                  <span>Moderate Risk</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></span>
                  <span>High Risk</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span>
                  <span>Critical Risk</span>
                </div>
              </div>

              {/* Right Column: Signal & Station Types */}
              <div className="flex flex-col gap-2.5 font-medium">
                <div className="flex items-center gap-2.5">
                  <Droplets size={14} className="text-[#2563EB] shrink-0" />
                  <span>Rainfall Station</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <AlertTriangle size={13} className="text-[#EA580C] shrink-0" />
                  <span>Landslide Location</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <AlertCircle size={14} className="text-[#DC2626] shrink-0" />
                  <span>Warning Alert</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mottos & Quote below legend */}
          <div className="mt-8 pt-4 border-t border-[#E2E0D4] max-w-[340px]">
            <p className="font-serif italic text-[14px] text-[#55635B]">
              “Action today for safer communities tomorrow.”
            </p>
          </div>
        </div>

        {/* Right Column: Northeast Regional Situation Map */}
        <div className="lg:col-span-7">
          <NortheastVectorMap onSelectDistrict={onSelectDistrict} />
        </div>
      </div>
    </div>
  );
}

export default LiveSituationSection;
