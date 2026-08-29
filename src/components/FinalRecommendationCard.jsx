import React from 'react';
import { useFlow } from '../context/FlowContext';
import { useLanguage } from '../context/LanguageContext';
import VoiceSpeaker from './VoiceSpeaker';
import { CheckCircle, MapPin, Fish, Waves, ShieldAlert, Sparkles, Navigation, RotateCcw, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const FinalRecommendationCard = () => {
  const { selectedRegion, selectedDate, resetFlow } = useFlow();
  const { t } = useLanguage();

  const handleCelebrate = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  React.useEffect(() => {
    handleCelebrate();
  }, []);

  const voiceNarrative = t('finalVoiceText');

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Giant Fisherman Card */}
      <div className="rounded-3xl bg-gradient-to-b from-ocean-900 via-ocean-950 to-black border-2 border-emerald-400/80 p-6 sm:p-10 shadow-2xl shadow-emerald-500/20 text-center relative overflow-hidden">
        
        {/* Glow ambient background */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{t('finalCardTitle')}</span>
        </div>

        {/* Main Big Status Verdict */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-emerald-500 text-ocean-950 font-black text-2xl sm:text-4xl shadow-xl shadow-emerald-500/30 ring-4 ring-emerald-300/40">
            <span className="text-3xl">🟢</span>
            <span>{t('finalCardVerdict')}</span>
          </div>
        </div>

        {/* Selected Location Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-ocean-900 border border-cyan-500/30 text-white font-bold text-lg sm:text-xl mb-8">
          <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>{selectedRegion?.shortName || "Region B"}</span>
          <span className="text-sm font-normal text-slate-400 ml-1">({selectedDate})</span>
        </div>

        {/* Big 3 Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8 text-left">
          
          <div className="p-4 rounded-2xl bg-ocean-900/90 border border-cyan-500/30 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-2xl shrink-0">
              🐟
            </div>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">{t('fishActivity')}</div>
              <div className="text-lg font-black text-cyan-300">{t('high')} ({selectedRegion?.fishProbability || 88}%)</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-ocean-900/90 border border-cyan-500/30 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-2xl shrink-0">
              🌊
            </div>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">{t('seaCondition')}</div>
              <div className="text-lg font-black text-emerald-300">{t('good')} (Calm)</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-ocean-900/90 border border-cyan-500/30 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-2xl shrink-0">
              ⚠️
            </div>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">{t('riskLevel')}</div>
              <div className="text-lg font-black text-emerald-400">{t('low')} (Safe)</div>
            </div>
          </div>

        </div>

        {/* Large Simple Explanation Text */}
        <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 mb-8">
          <p className="text-lg sm:text-xl font-bold text-emerald-100 leading-relaxed">
            "{t('finalCardAction')}"
          </p>
          <p className="text-xs sm:text-sm text-emerald-300/80 mt-1">
            Plankton bloom is optimal &bull; Low wind waves &bull; Zero severe weather disturbance.
          </p>
        </div>

        {/* Large Voice Speaker Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <VoiceSpeaker
            text={voiceNarrative}
            label={`🔊 ${t('listen')} (Voice Audio)`}
            size="large"
            className="w-full sm:w-auto text-lg px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-ocean-950 border-emerald-300 font-black shadow-lg shadow-emerald-500/40"
          />

          <button
            type="button"
            onClick={resetFlow}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base bg-ocean-900 hover:bg-ocean-800 text-cyan-300 border border-cyan-500/30 transition-all min-h-[52px]"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{t('resetFlow')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default FinalRecommendationCard;

