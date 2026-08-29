import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { useLanguage } from '../../context/LanguageContext';
import InteractiveMarineMap from '../../components/InteractiveMarineMap';
import VoiceSpeaker from '../../components/VoiceSpeaker';
import { Waves, ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Sparkles, Info, Eye } from 'lucide-react';

const Step3ChlorophyllMap = () => {
  const { selectedRegion, selectedDate, chlorophyllData, nextStep, prevStep } = useFlow();
  const { t } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  const voiceNarrative = t('chlorophyllVoice');

  return (
    <div className="max-w-5xl mx-auto py-2">
      {/* Branch Indicator Header */}
      <div className="flex items-center justify-between gap-2 mb-4 bg-cyan-950/60 p-2.5 rounded-xl border border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
          <Waves className="w-4 h-4 text-cyan-400" />
          <span>BRANCH A: OCEAN & CHLOROPHYLL ANALYSIS</span>
        </div>
        <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
          Step 3 of 8
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {t('step3Title')}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-xl mx-auto">
          {t('step3Desc')}
        </p>
      </div>

      {/* Ocean Map with Chlorophyll Layer Highlight */}
      <div className="mb-6">
        <InteractiveMarineMap mode="chlorophyll" />
      </div>

      {/* Fisherman Simple Highlight Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-ocean-900 via-ocean-850 to-ocean-900 border border-emerald-500/40 shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase">
                🟢 {t('legendHigh')}
              </span>
              <span className="text-xs text-slate-400">{selectedRegion?.shortName} ({selectedDate})</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {t('chlorophyllSummary')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Phytoplankton and zooplankton feeding grounds are dense in this zone.
            </p>
          </div>

          {/* Action Buttons: Voice Speaker & Details Toggle */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <VoiceSpeaker text={voiceNarrative} />
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 rounded-2xl bg-ocean-800 hover:bg-ocean-700 text-slate-200 border border-cyan-500/20 text-sm font-semibold flex items-center gap-1.5 transition-all min-h-[42px]"
            >
              <span>{showDetails ? t('hideDetails') : t('viewDetails')}</span>
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Collapsible Scientific / Technical Details */}
        {showDetails && (
          <div className="mt-5 pt-4 border-t border-cyan-500/20 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in zoom-in-95">
            <div className="p-3 rounded-xl bg-ocean-950/80 border border-cyan-500/20">
              <div className="text-xs text-slate-400 font-semibold">Chlorophyll-a Density</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">{chlorophyllData?.density || "4.8 mg/m³"}</div>
            </div>
            <div className="p-3 rounded-xl bg-ocean-950/80 border border-cyan-500/20">
              <div className="text-xs text-slate-400 font-semibold">Thermal Front Match</div>
              <div className="text-sm font-bold text-cyan-300 mt-0.5">{chlorophyllData?.thermalFrontMatch || "92% Upwelling Match"}</div>
            </div>
            <div className="p-3 rounded-xl bg-ocean-950/80 border border-cyan-500/20">
              <div className="text-xs text-slate-400 font-semibold">Satellite Telemetry</div>
              <div className="text-sm font-bold text-slate-200 mt-0.5">{chlorophyllData?.satelliteSource || "ISRO Oceansat-3 OCM"}</div>
            </div>
          </div>
        )}
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
          className="px-8 py-4 rounded-xl font-extrabold text-base sm:text-lg text-ocean-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 min-h-[52px] cursor-pointer"
        >
          <span>Continue to Anomaly Map →</span>
        </button>
      </div>
    </div>
  );
};

export default Step3ChlorophyllMap;

