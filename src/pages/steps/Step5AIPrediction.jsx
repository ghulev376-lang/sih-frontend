import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { useLanguage } from '../../context/LanguageContext';
import AgentReasoningNetwork from '../../components/AgentReasoningNetwork';
import VoiceSpeaker from '../../components/VoiceSpeaker';
import { Cpu, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

const Step5AIPrediction = () => {
  const { selectedRegion, selectedDate, aiPredictionData, nextStep, prevStep } = useFlow();
  const { t } = useLanguage();

  const voiceNarrative = t('aiVoice');

  return (
    <div className="max-w-5xl mx-auto py-2">
      {/* Branch Indicator Header */}
      <div className="flex items-center justify-between gap-2 mb-4 bg-blue-950/60 p-2.5 rounded-xl border border-blue-500/20">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
          <Cpu className="w-4 h-4 text-sky-400" />
          <span>BRANCH B: MULTI-AGENT AI INTELLIGENCE</span>
        </div>
        <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 border border-sky-400/30">
          Step 5 of 8
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {t('step5Title')}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-xl mx-auto">
          {t('step5Desc')}
        </p>
      </div>

      {/* Visual Multi-Agent Neural Collaboration Network */}
      <div className="mb-6">
        <AgentReasoningNetwork
          regionName={selectedRegion?.shortName || "Region B"}
          fishProbability={selectedRegion?.fishProbability || 88}
          aiConfidence={selectedRegion?.aiConfidence || "High (94.2%)"}
        />
      </div>

      {/* AI Consensus Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-ocean-900 via-ocean-850 to-ocean-900 border border-cyan-400/50 shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-extrabold uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                AI Verified
              </span>
              <span className="text-xs text-slate-400">Fused Neural Consensus for {selectedDate}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              "{selectedRegion?.shortName || 'Region B'} {t('aiRecommendationText')}"
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-1">
              <span>🐟 {t('fishProbability')}: <strong className="text-emerald-400 font-black">{selectedRegion?.fishProbability || 88}%</strong></span>
              <span>🌊 {t('seaCondition')}: <strong className="text-cyan-300 font-bold">{selectedRegion?.seaCondition || 'Good'}</strong></span>
              <span>⚠️ {t('riskLevel')}: <strong className="text-emerald-400 font-bold">{selectedRegion?.riskLevel || 'Low'}</strong></span>
              <span>🤖 {t('aiConfidence')}: <strong className="text-cyan-300 font-bold">{selectedRegion?.aiConfidence || 'High'}</strong></span>
            </div>
          </div>

          <VoiceSpeaker text={voiceNarrative} />
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
          className="px-8 py-4 rounded-xl font-extrabold text-base sm:text-lg text-ocean-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 min-h-[52px] cursor-pointer"
        >
          <span>Continue to Future Trend →</span>
        </button>
      </div>
    </div>
  );
};

export default Step5AIPrediction;

