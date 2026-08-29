import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { useLanguage } from '../../context/LanguageContext';
import InteractiveMarineMap from '../../components/InteractiveMarineMap';
import VoiceSpeaker from '../../components/VoiceSpeaker';
import { Flame, ArrowRight, ArrowLeft, Navigation, Fuel, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

const Step7HotspotDetection = () => {
  const { selectedRegion, selectedDate, hotspotData, nextStep, prevStep } = useFlow();
  const { t } = useLanguage();

  const hotspot = hotspotData?.[0] || {
    id: "hotspot-01",
    title: t('hotspotTag'),
    region: selectedRegion?.shortName || "Region B",
    coordinates: selectedRegion?.coordinates || "16.9850° N, 73.2800° E",
    fishProbability: `High (${selectedRegion?.fishProbability || 88}%)`,
    seaCondition: selectedRegion?.seaCondition || "Good",
    risk: selectedRegion?.riskLevel || "Low",
    aiConfidence: selectedRegion?.aiConfidence || "High (94.2%)",
    recommendation: `${selectedRegion?.shortName || "Region B"} is recommended for fishing. Maximum concentration of commercial species.`,
    fuelSavingsEstimate: "~18 Liters (Direct Route)",
    bestCatchTime: "04:30 AM - 08:30 AM & 05:00 PM - 08:00 PM"
  };

  const voiceNarrative = t('hotspotVoice');

  return (
    <div className="max-w-5xl mx-auto py-2">
      {/* Merged Branch Indicator Header */}
      <div className="flex items-center justify-between gap-2 mb-4 bg-amber-950/60 p-2.5 rounded-xl border border-amber-500/30">
        <div className="flex items-center gap-2 text-xs font-extrabold text-amber-300">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>BRANCH MERGE: UNIFIED HOTSPOT DETECTION RADAR</span>
        </div>
        <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40">
          Step 7 of 8
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {t('step7Title')}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-xl mx-auto">
          {t('step7Desc')}
        </p>
      </div>

      {/* Map with Hotspot Highlight */}
      <div className="mb-6">
        <InteractiveMarineMap mode="hotspots" />
      </div>

      {/* Main Hotspot 01 Featured Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-ocean-900 via-ocean-850 to-ocean-900 border-2 border-amber-400/70 shadow-2xl shadow-amber-500/10 mb-6 relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-amber-500/20 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-ocean-950 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/30 ring-2 ring-amber-300">
              🔥
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-400">{hotspot.title}</div>
              <h3 className="text-xl sm:text-2xl font-black text-white">{hotspot.region}</h3>
            </div>
          </div>

          <VoiceSpeaker text={voiceNarrative} />
        </div>

        {/* 4 Big Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="p-3.5 rounded-2xl bg-ocean-950/80 border border-amber-500/20">
            <div className="text-xs text-slate-400 font-bold">{t('fishProbability')}</div>
            <div className="text-base font-extrabold text-emerald-400 mt-0.5">{hotspot.fishProbability}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-ocean-950/80 border border-amber-500/20">
            <div className="text-xs text-slate-400 font-bold">{t('seaCondition')}</div>
            <div className="text-base font-extrabold text-cyan-300 mt-0.5">{hotspot.seaCondition} (Calm)</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-ocean-950/80 border border-amber-500/20">
            <div className="text-xs text-slate-400 font-bold">{t('riskLevel')}</div>
            <div className="text-base font-extrabold text-emerald-400 mt-0.5">{hotspot.risk} (Safe)</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-ocean-950/80 border border-amber-500/20">
            <div className="text-xs text-slate-400 font-bold">{t('aiConfidence')}</div>
            <div className="text-base font-extrabold text-cyan-300 mt-0.5">{hotspot.aiConfidence}</div>
          </div>
        </div>

        {/* Practical Fisherman Tips: GPS + Time + Fuel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Navigation className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>GPS: <strong className="text-white">{hotspot.coordinates}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Prime Catch Time: <strong className="text-white">{hotspot.bestCatchTime}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Fuel className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Est. Fuel Saving: <strong className="text-emerald-300">{hotspot.fuelSavingsEstimate}</strong></span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3.5 rounded-xl font-bold text-slate-300 hover:text-white bg-ocean-900 border border-ocean-700/80 hover:bg-ocean-800 transition-all flex items-center gap-2 min-h-[50px]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>

        <button
          type="button"
          onClick={nextStep}
          className="px-8 py-4 rounded-xl font-extrabold text-base sm:text-lg text-ocean-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 min-h-[52px] cursor-pointer"
        >
          <span>Generate Final Alert & Recommendation →</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Step7HotspotDetection;

