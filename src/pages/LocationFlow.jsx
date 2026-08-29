import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlow } from '../context/FlowContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import FlowStepper from '../components/FlowStepper';
import LanguageSelector from '../components/LanguageSelector';

import Step1SelectDate from './steps/Step1SelectDate';
import Step2SelectRegion from './steps/Step2SelectRegion';
import Step3ChlorophyllMap from './steps/Step3ChlorophyllMap';
import Step4AnomalyMap from './steps/Step4AnomalyMap';
import Step5AIPrediction from './steps/Step5AIPrediction';
import Step6FutureTrend from './steps/Step6FutureTrend';
import Step7HotspotDetection from './steps/Step7HotspotDetection';
import Step8AlertReport from './steps/Step8AlertReport';

import { LogOut, User, Compass, Sparkles, Waves } from 'lucide-react';

const LocationFlow = () => {
  const { currentStep } = useFlow();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1SelectDate />;
      case 2:
        return <Step2SelectRegion />;
      case 3:
        return <Step3ChlorophyllMap />;
      case 4:
        return <Step4AnomalyMap />;
      case 5:
        return <Step5AIPrediction />;
      case 6:
        return <Step6FutureTrend />;
      case 7:
        return <Step7HotspotDetection />;
      case 8:
        return <Step8AlertReport />;
      default:
        return <Step1SelectDate />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030814] via-[#051329] to-[#030917] text-slate-100 flex flex-col relative selection:bg-cyan-400 selection:text-ocean-950">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[160px]" />
      </div>

      {/* Main App Navigation Header */}
      <header className="relative z-50 w-full px-4 sm:px-8 py-3.5 bg-ocean-950/90 border-b border-cyan-500/20 backdrop-blur-xl flex items-center justify-between shadow-md">
        
        {/* Left Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 ring-1 ring-cyan-300/40">
            <span className="text-xl">🐋</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-wider text-white">ORCA</span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Live Assistant
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">AI Marine Navigation & Ecosystem Intelligence</p>
          </div>
        </div>

        {/* Right Tools: User Profile & Language & Logout */}
        <div className="flex items-center gap-3">
          {/* User Profile Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-ocean-900 border border-cyan-500/20 text-xs">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
              ⚓
            </div>
            <span className="font-bold text-white max-w-[130px] truncate">
              {user?.name || "Captain Ramesh"}
            </span>
          </div>

          {/* Language Selector */}
          <LanguageSelector />

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-400/30 transition-all"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Persistent Flow Stepper with Parallel Branch Layout */}
      <FlowStepper />

      {/* Active Step Content Body */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        {renderCurrentStep()}
      </main>

      {/* Global Fisherman Assistant Footer */}
      <footer className="relative z-10 w-full py-4 px-4 bg-ocean-950/80 border-t border-cyan-500/10 text-center text-xs text-slate-400">
        <p>
          ORCA SIH 2026 &bull; AI-Powered Marine Ecosystem & Fisherman Assistance System
        </p>
      </footer>

    </div>
  );
};

export default LocationFlow;

