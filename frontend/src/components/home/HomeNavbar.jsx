import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronDown, 
  Mountain, 
  CloudRain, 
  Flame, 
  Map, 
  Route, 
  Radio,
  Menu,
  X,
  ShieldAlert
} from 'lucide-react';

export function HomeNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [intelOpen, setIntelOpen] = useState(false);
  const [monitorOpen, setMonitorOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location.pathname === '/';

  return (
    <header className="w-full bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E5E3D8] sticky top-0 z-50 transition-all">
      

      <div className="max-w-[1540px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3.5">
        {/* Brand Left */}
        <Link 
          to="/"
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          {/* Stylized Multi-Peak Mountain Logo (Matches reference design) */}
          <div className="w-10 h-10 rounded-xl bg-white border border-[#DCD9CC] shadow-xs flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 4L2 19.5H19L10.5 4Z" stroke="#19382B" strokeWidth="2.4" strokeLinejoin="round" fill="#19382B" fillOpacity="0.1"/>
              <path d="M18.5 9.5L13 19.5H24L18.5 9.5Z" stroke="#789177" strokeWidth="2.2" strokeLinejoin="round" fill="#789177" fillOpacity="0.15"/>
              <path d="M6 16.5L10.5 8.5L15 16.5" stroke="#D8A32A" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="font-sans font-extrabold text-[1.2rem] text-[#18211E] tracking-tight leading-none">
              PurvaDrishti
            </div>
            <div className="hidden sm:block text-[10.5px] text-[#6E756F] font-medium tracking-wide mt-0.5">
              Safer Communities. A More Resilient Northeast.
            </div>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-[#444E47]">
          <Link
            to="/"
            className={`transition-colors relative py-1 ${isHome ? 'text-[#19382B] font-bold' : 'hover:text-[#19382B]'}`}
          >
            Home
            {isHome && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#19382B] rounded-full"></span>
            )}
          </Link>

          {/* Intelligence Dropdown */}
          <div className="relative" onMouseLeave={() => setIntelOpen(false)}>
            <button
              onClick={() => setIntelOpen(!intelOpen)}
              onMouseEnter={() => setIntelOpen(true)}
              className="flex items-center gap-1 hover:text-[#19382B] transition-colors py-1"
            >
              <span>Intelligence</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${intelOpen ? 'rotate-180' : ''}`} />
            </button>

            {intelOpen && (
              <div 
                className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-lg border border-[#E5E3D8] py-2 z-50 animate-fadeIn"
                onMouseEnter={() => setIntelOpen(true)}
              >
                <Link
                  to="/landslides"
                  onClick={() => setIntelOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF9F5] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <Mountain size={14} className="text-[#19382B]" />
                  <span>Landslide Risk Engine</span>
                </Link>
                <Link
                  to="/rainfall"
                  onClick={() => setIntelOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF9F5] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <CloudRain size={14} className="text-[#2563EB]" />
                  <span>Rainfall & Meteorology</span>
                </Link>
                <Link
                  to="/fire"
                  onClick={() => setIntelOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF9F5] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <Flame size={14} className="text-[#E36B25]" />
                  <span>Forest & Terrain Risk</span>
                </Link>
                <Link
                  to="/map"
                  onClick={() => setIntelOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF9F5] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <Map size={14} className="text-[#19382B]" />
                  <span>Geospatial Radar</span>
                </Link>
              </div>
            )}
          </div>

          {/* Monitoring Dropdown */}
          <div className="relative" onMouseLeave={() => setMonitorOpen(false)}>
            <button
              onClick={() => setMonitorOpen(!monitorOpen)}
              onMouseEnter={() => setMonitorOpen(true)}
              className="flex items-center gap-1 hover:text-[#19382B] transition-colors py-1"
            >
              <span>Monitoring</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${monitorOpen ? 'rotate-180' : ''}`} />
            </button>

            {monitorOpen && (
              <div 
                className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-lg border border-[#E5E3D8] py-2 z-50 animate-fadeIn"
                onMouseEnter={() => setMonitorOpen(true)}
              >
                <Link
                  to="/roads"
                  onClick={() => setMonitorOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF9F5] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <Route size={14} className="text-[#D8A32A]" />
                  <span>Highways & Mountain Passes</span>
                </Link>
                <Link
                  to="/drones"
                  onClick={() => setMonitorOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF9F5] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <Radio size={14} className="text-[#19382B]" />
                  <span>Autonomous Surveillance Fleet</span>
                </Link>
                <Link
                  to="/alerts"
                  onClick={() => setMonitorOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF9F5] text-xs font-medium text-[#2C3531] transition-colors"
                >
                  <ShieldAlert size={14} className="text-[#DC2626]" />
                  <span>Active Warning Broadcasts</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/alerts"
            className="hover:text-[#19382B] transition-colors py-1"
          >
            Alerts
          </Link>

          <Link
            to="/history"
            className="hover:text-[#19382B] transition-colors py-1"
          >
            Resources
          </Link>

          <a
            href="#about-section"
            className="hover:text-[#19382B] transition-colors py-1 cursor-pointer"
          >
            About
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Live indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0E9] border border-[#D5E0D4] text-[#19382B] text-[11.5px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span>LIVE</span>
          </div>

          {/* Open Dashboard Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#19382B] hover:bg-[#234E3B] text-white text-[13px] font-semibold shadow-xs transition-all duration-200 hover:shadow"
          >
            <span>Open Dashboard</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#2C3531] hover:text-[#19382B] rounded-lg hover:bg-[#EAE7DC]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full border-t border-[#E5E3D8] bg-[#FAF9F5] px-5 py-4 space-y-3 shadow-lg animate-fadeIn z-50">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm font-semibold text-[#19382B]"
          >
            Home
          </Link>
          <Link
            to="/landslides"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-[#444E47] hover:text-[#19382B]"
          >
            Landslide Risk Engine
          </Link>
          <Link
            to="/rainfall"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-[#444E47] hover:text-[#19382B]"
          >
            Rainfall & Meteorology
          </Link>
          <Link
            to="/map"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-[#444E47] hover:text-[#19382B]"
          >
            Regional Situation Map
          </Link>
          <Link
            to="/roads"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-[#444E47] hover:text-[#19382B]"
          >
            Highway & Route Safety
          </Link>
          <Link
            to="/alerts"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-[#444E47] hover:text-[#19382B]"
          >
            Active Alerts
          </Link>
          <Link
            to="/simulation"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-[#444E47] hover:text-[#19382B]"
          >
            Emergency Simulation Sandbox
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/dashboard');
            }}
            className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-2.5 rounded-xl bg-[#19382B] text-white text-sm font-semibold shadow-sm"
          >
            <span>Open Dashboard</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </header>
  );
}

export default HomeNavbar;
