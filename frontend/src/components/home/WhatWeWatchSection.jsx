import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudRain, Mountain, Radio, ArrowRight, ArrowUpRight } from 'lucide-react';

export function WhatWeWatchSection() {
  const navigate = useNavigate();

  const watchCards = [
    {
      id: 'rainfall',
      title: 'Rainfall & Weather',
      description: 'Monitor changing rainfall patterns and weather conditions.',
      icon: CloudRain,
      route: '/rainfall',
      image: 'https://images.unsplash.com/photo-1514632595-4944383f2737?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'landslide',
      title: 'Terrain & Landslide Risk',
      description: 'Detect vulnerable slopes and changing terrain conditions.',
      icon: Mountain,
      route: '/landslides',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'early-warning',
      title: 'Early Warning Intelligence',
      description: 'Connect environmental signals to faster preparedness decisions.',
      icon: Radio,
      route: '/alerts',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="w-full bg-[#FAF9F5] border border-[#E5E3D8] rounded-3xl md:rounded-[28px] p-6 md:p-10 lg:p-12 mb-8 shadow-subtle select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading & Context */}
        <div className="lg:col-span-4 max-w-[380px]">
          <div className="text-[11.5px] font-bold tracking-[0.2em] text-[#6E756F] uppercase mb-3">
            What We Watch
          </div>

          <h2 className="font-serif text-[36px] md:text-[44px] leading-[1.08] text-[#18211E] font-normal mb-5 uppercase tracking-tight">
            ONE LANDSCAPE.<br />
            MANY SIGNALS.
          </h2>

          <p className="text-[14px] text-[#4F5B53] leading-relaxed mb-6">
            Landslide risk is shaped by rainfall, terrain, vegetation and human activity. PurvaDrishti brings these signals together so teams can understand what is changing, and where attention is needed most.
          </p>

          <button
            onClick={() => navigate('/simulation')}
            className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[#19382B] hover:text-[#234E3B] group transition-colors cursor-pointer"
          >
            <span className="border-b-2 border-[#19382B] pb-0.5">Explore Our Approach</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right Column: 3 Vertical Image Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {watchCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => navigate(card.route)}
                className="relative h-[380px] md:h-[420px] rounded-2xl overflow-hidden border border-[#DCD9CC] shadow-xs cursor-pointer group transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
              >
                {/* Background Photography */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                {/* Card Content at Bottom */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  {/* Icon Circle */}
                  <div className="w-10 h-10 rounded-full border border-white/35 bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 transition-colors group-hover:bg-white group-hover:text-[#19382B]">
                    <Icon size={18} />
                  </div>

                  <h3 className="font-sans font-bold text-[18px] text-white leading-tight mb-2">
                    {card.title}
                  </h3>

                  <p className="text-[12.5px] text-white/80 leading-relaxed mb-4">
                    {card.description}
                  </p>

                  {/* Circular Arrow Button at bottom right */}
                  <div className="self-end w-8 h-8 rounded-full border border-white/40 bg-white/15 backdrop-blur-md flex items-center justify-center text-white transition-all group-hover:bg-white group-hover:text-[#19382B] group-hover:scale-110">
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WhatWeWatchSection;
