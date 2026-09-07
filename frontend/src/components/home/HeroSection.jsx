import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CloudRain, Mountain, AlertTriangle, Radio, Play } from 'lucide-react';

export function HeroSection({ onSelectDistrict }) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full rounded-3xl md:rounded-[32px] overflow-hidden border border-[#E2E0D4] bg-[#EAE7DC] shadow-sm mb-6 select-none">
      {/* Background Northeast Mountain Valley Panorama */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop')`,
          filter: 'brightness(0.92) contrast(1.05)'
        }}
      />

      {/* Atmospheric Mist & Gradient Fade for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F5]/90 via-[#FAF9F5]/65 to-transparent md:via-[#FAF9F5]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Custom Hero Image Placeholder (replaces the SVG map) */}
      <img
        src="/NER-outline.png"
        alt="Northeast Risk Map"
        className="absolute right-0 top-0 w-full md:w-1/2 h-full object-cover object-center md:object-left opacity-70 pointer-events-none"
      />

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-[1540px] mx-auto p-6 sm:p-10 lg:p-14 min-h-[580px] md:min-h-[640px] flex flex-col justify-between">
        {/* Left Editorial Text Area */}
        <div className="max-w-[620px] backdrop-blur-[10px] bg-[#FAF9F5]/90 p-7 sm:p-10 rounded-2xl md:rounded-3xl border border-[#E2E0D4]/80 shadow-subtle">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-[0.2em] text-[#2C3531] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#19382B] animate-pulse"></span>
            <span>NORTHEAST INDIA · LIVE LANDSLIDE RISK INTELLIGENCE</span>
          </div>

          {/* Large Editorial Display Heading */}
          <h1 className="font-serif text-[42px] sm:text-[54px] md:text-[62px] lg:text-[68px] leading-[1.04] text-[#18211E] tracking-tight font-normal mb-5">
            Know the risk.<br />
            Act before it escalates.
          </h1>

          {/* Supporting Text */}
          <p className="text-[14px] sm:text-[15.5px] text-[#424E46] leading-relaxed mb-8 max-w-[520px]">
            One intelligent view of rainfall, terrain and environmental conditions shaping landslide risk across Northeast India.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#19382B] hover:bg-[#234E3B] text-white text-[14px] font-semibold shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.01] cursor-pointer"
            >
              <span>Enter PurvaDrishti</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => navigate('/simulation')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/95 hover:bg-white text-[#18211E] border border-[#D5D3C8] text-[14px] font-semibold shadow-xs transition-all duration-200 hover:scale-[1.01] cursor-pointer"
            >
              <Play size={13} className="text-[#19382B] fill-[#19382B]" />
              <span>How It Works</span>
            </button>
          </div>

          {/* Bottom Left Subtle Tag */}
          <div className="mt-8 pt-5 border-t border-[#EAE8DE] text-[10.5px] font-bold tracking-[0.18em] text-[#6E756F] uppercase">
            PEOPLE &nbsp;|&nbsp; PLACES &nbsp;|&nbsp; PLANET &nbsp;·&nbsp; STRONGER NORTHEAST
          </div>
        </div>

        {/* 4 Floating Intelligence Cards Overlaying Map (Desktop) */}
        <div className="hidden lg:block pointer-events-auto">
          {/* Card 1: Terrain Risk (Top-Right over Arunachal Pradesh) */}
          <div 
            onClick={() => navigate('/landslides')}
            className="absolute top-12 right-[8%] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-hero-card border border-[#E0DED4] cursor-pointer hover:scale-105 transition-all duration-200 min-w-[195px]"
          >
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-[#EA580C] uppercase mb-1">
              <div className="w-5 h-5 rounded-full bg-[#FFF7ED] flex items-center justify-center text-[#EA580C]">
                <AlertTriangle size={12} />
              </div>
              <span>TERRAIN RISK</span>
            </div>
            <div className="text-[14.5px] font-bold text-[#18211E] pl-7">Arunachal Pradesh</div>
            <div className="text-[11.5px] font-extrabold text-[#EA580C] pl-7 mt-0.5">
              Elevated
            </div>
          </div>

          {/* Card 2: Rainfall (Mid-Left over Cherrapunji/Assam) */}
          <div 
            onClick={() => navigate('/rainfall')}
            className="absolute top-[26%] right-[34%] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-hero-card border border-[#E0DED4] cursor-pointer hover:scale-105 transition-all duration-200 min-w-[195px]"
          >
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-[#2563EB] uppercase mb-1">
              <div className="w-5 h-5 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                <CloudRain size={12} />
              </div>
              <span>RAINFALL</span>
            </div>
            <div className="text-[14.5px] font-bold text-[#18211E] pl-7">Cherrapunji region</div>
            <div className="text-[11.5px] text-[#4A554E] font-medium pl-7 mt-0.5">
              Above threshold
            </div>
          </div>

          {/* Card 3: Landslide Risk (Center over Meghalaya) */}
          <div 
            onClick={() => navigate('/landslides')}
            className="absolute top-[48%] right-[32%] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-hero-card border border-[#E0DED4] cursor-pointer hover:scale-105 transition-all duration-200 min-w-[195px]"
          >
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-[#DC2626] uppercase mb-1">
              <div className="w-5 h-5 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#DC2626]">
                <Mountain size={12} />
              </div>
              <span>LANDSLIDE RISK</span>
            </div>
            <div className="text-[14.5px] font-bold text-[#18211E] pl-7">Meghalaya</div>
            <div className="text-[11.5px] font-extrabold text-[#DC2626] pl-7 mt-0.5">
              HIGH · 78/100
            </div>
          </div>

          {/* Card 4: Early Warning (Mid-Right over Nagaland) */}
          <div 
            onClick={() => navigate('/alerts')}
            className="absolute top-[32%] right-[5%] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-hero-card border border-[#E0DED4] cursor-pointer hover:scale-105 transition-all duration-200 min-w-[175px]"
          >
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-[#0284C7] uppercase mb-1">
              <div className="w-5 h-5 rounded-full bg-[#F0F9FF] flex items-center justify-center text-[#0284C7]">
                <Radio size={12} />
              </div>
              <span>EARLY WARNING</span>
            </div>
            <div className="text-[14.5px] font-bold text-[#18211E] pl-7">Nagaland</div>
            <div className="text-[11.5px] text-[#4A554E] font-medium pl-7 mt-0.5">
              Monitoring
            </div>
          </div>

          {/* Subtle Script Accents in Map Area */}
          <div className="absolute bottom-16 right-8 text-right pointer-events-none opacity-85">
            <div className="font-script text-white text-2xl tracking-wide drop-shadow-md">
              Mountains · Communities · Resilience
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase mt-1 drop-shadow-sm">
              NORTHEAST INDIA · OUR HOMES. OUR HILLS. OUR TOMORROW.
            </div>
          </div>
        </div>

        {/* Mobile Floating Cards Grid */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mt-6">
          <div 
            onClick={() => navigate('/landslides')}
            className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xs border border-[#E0DED4] cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-[#DC2626] uppercase mb-0.5">
              <Mountain size={11} />
              <span>Landslide Risk</span>
            </div>
            <div className="text-[13.5px] font-bold text-[#18211E]">Meghalaya</div>
            <div className="text-[11px] font-extrabold text-[#DC2626]">HIGH · 78/100</div>
          </div>

          <div 
            onClick={() => navigate('/rainfall')}
            className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xs border border-[#E0DED4] cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-[#2563EB] uppercase mb-0.5">
              <CloudRain size={11} />
              <span>Rainfall</span>
            </div>
            <div className="text-[13.5px] font-bold text-[#18211E]">Cherrapunji</div>
            <div className="text-[11px] text-[#4A554E]">Above threshold</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
