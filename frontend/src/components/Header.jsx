import React, { useState, useEffect } from 'react';
import { Search, Bell, RefreshCw, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Header({ onRefresh, isRefreshing, criticalAlertCount = 0, onNavigateHome }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-[68px] bg-white border-b border-[#EAE8E1] flex items-center justify-between px-7 shrink-0 select-none z-10">
      
      {/* Left: Search Bar with ⌘K */}
      <div className="relative flex items-center">
        <div className="flex items-center gap-3 bg-[#FAF9F5] border border-[#E5E3D8] rounded-xl px-3.5 py-2 w-[340px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus-within:bg-white focus-within:border-[#789177] transition-all">
          <Search size={15} className="text-[#8E958F] shrink-0" />
          <input 
            type="text" 
            placeholder="Search region, station, alert..." 
            className="bg-transparent border-none outline-none text-[13px] text-[#18211E] placeholder:text-[#8E958F] w-full"
          />
          <kbd className="text-[10px] font-mono text-[#8E958F] bg-white border border-[#E5E3D8] px-1.5 py-0.5 rounded shadow-xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Notification, Status, Time, Refresh, User Profile */}
      <div className="flex items-center gap-5">
        
        {/* Notification Bell */}
        <button className="relative text-[#4A534D] hover:text-[#18211E] transition-colors p-1.5 rounded-lg hover:bg-[#F7F6F1]">
          <Bell size={18} strokeWidth={1.8} />
          {criticalAlertCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#D94A3A] rounded-full"></span>
          )}
        </button>

        {/* SYSTEM LIVE status indicator */}
        <div className="flex items-center gap-1.5 bg-[#EAF3EE] px-2.5 py-1 rounded-full border border-[#C6E2D0]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
          <span className="text-[11px] font-bold text-[#1E4D38] tracking-wider uppercase">
            SYSTEM LIVE
          </span>
        </div>

        {/* Language Selector */}
        <select 
          className="bg-white border border-[#E5E3D8] text-[#18211E] text-xs px-2 py-1.5 rounded-lg outline-none focus:border-[#234E3B]"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">ENG</option>
          <option value="hi">HIN</option>
          <option value="as">ASM</option>
        </select>

        {/* Live IST Time */}
        <div className="text-[12px] font-medium text-[#4A534D] min-w-[105px]">
          {time} IST
        </div>

        {/* Refresh Button */}
        <button 
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-white border border-[#E5E3D8] hover:bg-[#F7F6F1] text-[#18211E] px-3.5 py-1.5 rounded-xl text-[12px] font-semibold transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] active:scale-95 disabled:opacity-60"
        >
          <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-[#1E4D38]' : 'text-[#6E756F]'} />
          <span>Refresh</span>
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-1.5 cursor-pointer pl-1 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-[#19382B] text-white border border-[#234E3B] flex items-center justify-center text-[11px] font-bold">
            PD
          </div>
          <ChevronDown size={14} className="text-[#8E958F]" />
        </div>

      </div>
    </header>
  );
}
