import React from 'react';
import { BookOpen, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DashboardHeader({ onGenerateReport }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 select-none">
      <div>
        <h1 className="font-serif text-[34px] sm:text-[38px] font-bold text-[#18211E] tracking-tight leading-tight">
          Dashboard
        </h1>
        <p className="text-[13.5px] sm:text-[14px] text-[#6E756F] font-medium mt-0.5">
          Real-time environmental and landslide risk intelligence across Northeast India.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/map')}
          className="flex items-center gap-2 bg-white border border-[#234E3B] hover:bg-[#F4F8F5] text-[#234E3B] px-4 py-2 rounded-xl text-[13px] font-semibold transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] active:scale-98"
        >
          <span>View Live Map</span>
          <BookOpen size={15} strokeWidth={2} />
        </button>

        <button
          onClick={onGenerateReport || (() => window.print())}
          className="flex items-center gap-2 bg-[#234E3B] hover:bg-[#19382B] text-white px-4 py-2 rounded-xl text-[13px] font-semibold transition-all shadow-[0_2px_6px_rgba(35,78,59,0.2)] active:scale-98"
        >
          <span>Generate Report</span>
          <Download size={15} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

