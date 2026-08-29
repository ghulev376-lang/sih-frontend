import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { useLanguage } from '../../context/LanguageContext';
import InteractiveMarineMap from '../../components/InteractiveMarineMap';
import VoiceSpeaker from '../../components/VoiceSpeaker';
import { AlertTriangle, ArrowRight, ArrowLeft, CheckCircle, ShieldCheck, Waves } from 'lucide-react';

const Step4AnomalyMap = () => {
  const { selectedRegion, selectedDate, anomalyData, nextStep, prevStep } = useFlow();
  const { t } = useLanguage();

  const voiceNarrative = t('anomalyVoice');

  return (
    <div className="max-w-5xl mx-auto py-2">
      {/* Branch Indicator Header */}
      <div className="flex items-center justify-between gap-2 mb-4 bg-cyan-950/60 p-2.5 rounded-xl border border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>BRANCH A: ANOMALY SCAN (COMPLETING LEFT BRANCH)</span>
        </div>
        <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
          Step 4 of 8
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {t('step4Title')}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-xl mx-auto">
          {t('step4Desc')}
        </p>
      </div>

      {/* Marine Anomaly Map */}
      <div className="mb-6">
        <InteractiveMarineMap mode="anomaly" />
      </div>

      {/* Anomaly Legend & Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3.5 rounded-2xl bg-ocean-900/80 border border-emerald-500/30 flex items-center gap-3">
          <span className="text-2xl">🟢</span>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Zone Status</div>
            <div className="text-sm font-extrabold text-emerald-300">{t('anomalyStatusNormal')}</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-ocean-900/80 border border-cyan-500/30 flex items-center gap-3">
          <span className="text-2xl">🌊</span>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Sea Surface Temp</div>
            <div className="text-sm font-extrabold text-cyan-300">{anomalyData?.sstAnomaly || "+0.3 °C Normal"}</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-ocean-900/80 border border-cyan-500/30 flex items-center gap-3">
          <span className="text-2xl">🛡️</span>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Trawler Safety</div>
            <div className="text-sm font-extrabold text-emerald-400">{anomalyData?.underwaterRisk || "Safe for Fishing"}</div>
          </div>
        </div>
      </div>

      {/* Fisherman Simple Highlight Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-ocean-900 via-ocean-850 to-ocean-900 border border-cyan-500/40 shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
                Area: {selectedRegion?.shortName || "Region B"}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold rounded bg-emerald-500/20 text-emerald-300">
                Risk: {selectedRegion?.riskLevel || "Low"}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {t('anomalySummary')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mild cyclonic eddy detected at 65m depth. No hazardous sub-surface rip tides.
            </p>
          </div>

          <VoiceSpeaker text={voiceNarrative} />
        </div>
      </div>

      {/* Navigation Buttons (Switches to Branch B - AI Multi-Agent Prediction) */}
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
          <span>Continue to AI Prediction (Branch B) →</span>
        </button>
      </div>
    </div>
  );
};

export default Step4AnomalyMap;

