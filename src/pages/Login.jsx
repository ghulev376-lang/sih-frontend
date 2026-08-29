import React from 'react';
import LoginForm from '../components/LoginForm';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { Waves, Sparkles, Shield, Cpu, Compass, Fish, Radio } from 'lucide-react';

const Login = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030814] via-[#061325] to-[#040e1d] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-cyan-400 selection:text-ocean-950">
      
      {/* Dynamic Background Effects: Ambient Ocean Glow & Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Ocean radial light orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />

        {/* Marine Deep Grid */}
        <div
          className="w-full h-full opacity-15"
          style={{
            backgroundImage: `radial-gradient(rgba(34, 211, 238, 0.25) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Subtle Floating Marine Bio-luminescent Particles */}
        <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-cyan-400/60 blur-[1px] animate-particle-1" />
        <div className="absolute top-[65%] left-[35%] w-3 h-3 rounded-full bg-emerald-400/50 blur-[1px] animate-particle-2" />
        <div className="absolute top-[30%] right-[25%] w-2.5 h-2.5 rounded-full bg-sky-300/60 blur-[1px] animate-particle-3" />
        <div className="absolute top-[80%] right-[15%] w-2 h-2 rounded-full bg-cyan-300/40 blur-[1px] animate-particle-4" />
      </div>

      {/* Top Navigation Bar: Minimal Header with Language Selector */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between border-b border-cyan-500/10 backdrop-blur-sm">
        {/* Brand Small Logo Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-300/40">
            <span className="text-xl">🐋</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-wider text-white">ORCA</span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Marine AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Ministry of Fisheries &bull; SIH 2026</p>
          </div>
        </div>

        {/* Right Corner: Language Selector */}
        <div className="flex items-center gap-3">
          <LanguageSelector />
        </div>
      </header>

      {/* Main Content Area: Desktop 2-Column & Mobile Stacked Layout */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE: Marine Visual, Orca Artwork & Project Branding (Desktop 7 cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
            
            {/* Marine Ecosystem Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-bold w-fit shadow-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>SIH National Prototype &bull; Smart Marine Ecosystem</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-100 to-white">
                  ORCA
                </span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-cyan-400 block mt-1">
                  {t('appSubTitle')}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-medium max-w-lg">
                {t('appTagline')}
              </p>
            </div>

            {/* Visual Hero Graphic: Stylized Deep-Ocean & Orca Illustration */}
            <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-ocean-900/90 via-ocean-850/80 to-ocean-950/90 border border-cyan-500/30 p-6 shadow-2xl shadow-ocean-950/80 group">
              
              {/* Animated Wave Background SVG */}
              <div className="absolute inset-0 opacity-25 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <path
                    d="M0,100 C150,160 350,40 500,100 L500,200 L0,200 Z"
                    fill="url(#waveGrad)"
                  />
                  <defs>
                    <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Orca & Marine AI Artwork Centerpiece */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                
                {/* Stylized Orca Icon Disc */}
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-cyan-500 via-sky-600 to-blue-700 p-1 shadow-xl shadow-cyan-500/30 animate-float">
                    <div className="w-full h-full rounded-[22px] bg-ocean-950 flex flex-col items-center justify-center p-3 text-center border border-cyan-300/30">
                      <span className="text-5xl filter drop-shadow-lg">🐋</span>
                      <span className="text-[10px] font-black tracking-widest text-cyan-300 uppercase mt-1">
                        ORCA AI
                      </span>
                    </div>
                  </div>
                  {/* Pulsing Sonar Ring */}
                  <div className="absolute -inset-2 rounded-3xl border border-cyan-400/40 animate-ping pointer-events-none opacity-40" />
                </div>

                {/* 4 Pillars of ORCA System */}
                <div className="grid grid-cols-2 gap-2.5 w-full">
                  <div className="p-2.5 rounded-xl bg-ocean-950/80 border border-cyan-500/20 flex items-center gap-2">
                    <span className="text-lg">🌊</span>
                    <span className="text-xs font-bold text-slate-200">Ocean Maps</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-ocean-950/80 border border-cyan-500/20 flex items-center gap-2">
                    <span className="text-lg">🤖</span>
                    <span className="text-xs font-bold text-slate-200">AI Predictor</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-ocean-950/80 border border-cyan-500/20 flex items-center gap-2">
                    <span className="text-lg">🎣</span>
                    <span className="text-xs font-bold text-slate-200">Fisherman UX</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-ocean-950/80 border border-cyan-500/20 flex items-center gap-2">
                    <span className="text-lg">🔊</span>
                    <span className="text-xs font-bold text-slate-200">Voice Safety</span>
                  </div>
                </div>

              </div>

              {/* Bottom Feature Pill */}
              <div className="mt-4 pt-3 border-t border-cyan-500/15 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  Live Satellite Telemetry Connected
                </span>
                <span className="text-slate-400 font-medium">Arabian Sea &bull; West Coast</span>
              </div>
            </div>

            {/* Quick Benefits Ticker for Fishermen */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Zero Technical Jargon</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>High-Catch Hotspots</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Sub-surface Anomaly Safety</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: Modern Fisherman-Friendly Glassmorphism Login Card (5 cols)   */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel shadow-2xl shadow-ocean-950/90 relative">
              
              {/* Corner decorative light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

              <LoginForm />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-slate-400 border-t border-cyan-500/10">
        <p>
          ORCA Marine System &bull; Smart India Hackathon &bull; Fisherman Assistance Initiative
        </p>
      </footer>
    </div>
  );
};

export default Login;

