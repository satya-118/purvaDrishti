import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function FinalCtaSection() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full rounded-3xl md:rounded-[28px] overflow-hidden border border-[#E5E3D8] bg-[#EAE8DE] shadow-subtle mb-12 select-none">
      {/* Background Northeast Mountain River Landscape on Right */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-right md:bg-center opacity-85 mix-blend-multiply"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />

      {/* Soft gradient fade from left ivory to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F5]/95 via-[#FAF9F5]/75 to-transparent md:to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-14 lg:p-16 max-w-[640px]">
        <h2 className="font-serif text-[38px] sm:text-[44px] md:text-[50px] leading-[1.08] text-[#18211E] font-normal mb-4">
          From information to action.
        </h2>

        <p className="text-[14px] md:text-[15.5px] text-[#4A554E] leading-relaxed mb-8 max-w-[490px]">
          PurvaDrishti helps teams turn scattered environmental signals into a clearer understanding of landslide risk.
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#19382B] hover:bg-[#234E3B] text-white text-[14px] font-semibold shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.01] cursor-pointer"
        >
          <span>Enter PurvaDrishti Intelligence</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Script Watermark on bottom right */}
      <div className="hidden md:block absolute bottom-6 right-8 text-right pointer-events-none opacity-80">
        <div className="font-script text-[24px] text-[#19382B] leading-none drop-shadow-sm">
          Safer People
        </div>
        <div className="font-script text-[20px] text-[#2C3531]">
          Stronger Northeast
        </div>
      </div>
    </div>
  );
}

export default FinalCtaSection;
