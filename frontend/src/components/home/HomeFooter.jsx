import React from 'react';
import { Link } from 'react-router-dom';

export function HomeFooter() {
  return (
    <footer id="about-section" className="w-full pt-8 pb-12 border-t border-[#E5E3D8] text-xs text-[#6E756F] select-none">
      <div className="max-w-[1540px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-2">
        {/* Brand Left with Logo Mark */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-white border border-[#DCD9CC] shadow-xs flex items-center justify-center p-1.5 shrink-0">
            <svg width="26" height="22" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 4L2 19.5H19L10.5 4Z" stroke="#19382B" strokeWidth="2.4" strokeLinejoin="round" fill="#19382B" fillOpacity="0.1"/>
              <path d="M18.5 9.5L13 19.5H24L18.5 9.5Z" stroke="#789177" strokeWidth="2.2" strokeLinejoin="round" fill="#789177" fillOpacity="0.15"/>
              <path d="M6 16.5L10.5 8.5L15 16.5" stroke="#D8A32A" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="font-sans font-extrabold text-[#18211E] text-[15px] leading-tight">
              PurvaDrishti
            </div>
            <div className="text-[11px] text-[#6E756F] font-medium">
              Disaster Intelligence for a Safer Northeast
            </div>
          </div>
        </div>

        {/* Center Navigation Links */}
        <div className="flex items-center gap-6 text-[13px] font-medium text-[#444E47]">
          <Link to="/" className="hover:text-[#19382B] transition-colors">About</Link>
          <Link to="/alerts" className="hover:text-[#19382B] transition-colors">Partners</Link>
          <Link to="/history" className="hover:text-[#19382B] transition-colors">Resources</Link>
          <Link to="/simulation" className="hover:text-[#19382B] transition-colors">Contact</Link>
        </div>

        {/* Tagline and Hindi Script on Right */}
        <div className="text-center md:text-right">
          <div className="text-[13px] font-semibold text-[#18211E] tracking-tight">
            For People. For the Hills. For Tomorrow.
          </div>
          <div className="text-[11.5px] text-[#7A837C] font-medium mt-0.5">
            पूर्वादृष्टि &nbsp;|&nbsp; एक सुरक्षित पूर्वोत्तर
          </div>
        </div>
      </div>

      {/* Bottom Sub-strip */}
      <div className="max-w-[1540px] mx-auto mt-6 pt-4 border-t border-[#ECEAE2] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8E958F] px-2">
        <div>
          © 2026 PurvaDrishti Regional Disaster Intelligence Platform. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-[#19382B] transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-[#19382B] transition-colors">Terms of Service</a>
          <a href="#compliance" className="hover:text-[#19382B] transition-colors">Public Safety Standard</a>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
