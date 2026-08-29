import React from 'react';
import { useFlow } from '../../context/FlowContext';
import { useLanguage } from '../../context/LanguageContext';
import VoiceSpeaker from '../../components/VoiceSpeaker';
import { TrendingUp, ArrowRight, ArrowLeft, Calendar, ShieldCheck, Waves } from 'lucide-react';

const Step6FutureTrend = () => {
  const { selectedRegion, futureTrendData, nextStep, prevStep } = useFlow();
  const { t } = useLanguage();

  const trendData = futureTrendData || [
    { day: "Today", fishActivity: 88, seaCondition: "Good", waveHeight: 0.9, risk: "Low" },
    { day: "Tomorrow", fishActivity: 92, seaCondition: "Good", waveHeight: 0.8, risk: "Low" },
    { day: "+2 Days", fishActivity: 85, seaCondition: "Good", waveHeight: 1.0, risk: "Low" },
    { day: "+3 Days", fishActivity: 78, seaCondition: "Moderate", waveHeight: 1.3, risk: "Low" },
    { day: "+4 Days", fishActivity: 62, seaCondition: "Moderate", waveHeight: 1.6, risk: "Moderate" }
  ];

  const voiceNarrative = t('trendVoice');

  return (
    <div className="max-w-5xl mx-auto py-2">
      {/* Branch Indicator Header */}
      <div className="flex items-center justify-between gap-2 mb-4 bg-blue-950/60 p-2.5 rounded-xl border border-blue-500/20">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
          <TrendingUp className="w-4 h-4 text-sky-400" />
          <span>BRANCH B: 5-DAY PREDICTIVE TREND (COMPLETING RIGHT BRANCH)</span>
        </div>
        <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 border border-sky-400/30">
          Step 6 of 8
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {t('step6Title')}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-xl mx-auto">
          {t('step6Desc')}
        </p>
      </div>

      {/* 5-Day Visual Trend Forecast Cards & Bar Chart */}
      <div className="p-6 rounded-3xl bg-ocean-950/90 border border-cyan-500/30 shadow-2xl mb-6">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-cyan-500/20">
          <div className="text-sm font-extrabold text-cyan-300 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>5-Day Migration & Catch Horizon for {selectedRegion?.shortName || "Region B"}</span>
          </div>
          <span className="text-xs text-slate-400">Confidence: 91%</span>
        </div>

        {/* Visual Forecast Bars */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {trendData.map((item, index) => {
            const isTop = item.fishActivity >= 85;
            return (
              <div
                key={item.day}
                className={`p-4 rounded-2xl border text-center transition-all relative ${
                  isTop
                    ? 'bg-cyan-950/80 border-cyan-400/60 ring-2 ring-cyan-400/20'
                    : 'bg-ocean-900/80 border-ocean-700/60'
                }`}
              >
                {index === 1 && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] font-black uppercase rounded-full bg-emerald-500 text-ocean-950">
                    Peak Catch
                  </span>
                )}
                
                <div className="text-xs font-extrabold text-slate-300 uppercase mb-2">{item.day}</div>
                
                {/* Bar Level Visual */}
                <div className="h-28 bg-ocean-950 rounded-xl p-1.5 flex flex-col justify-end mb-3 border border-cyan-500/10">
                  <div
                    className={`w-full rounded-lg transition-all duration-500 flex items-center justify-center text-[11px] font-black text-ocean-950 ${
                      item.fishActivity >= 85
                        ? 'bg-gradient-to-t from-emerald-500 to-cyan-300 shadow-md shadow-cyan-500/30'
                        : item.fishActivity >= 70
                        ? 'bg-gradient-to-t from-cyan-500 to-sky-400'
                        : 'bg-gradient-to-t from-amber-500 to-yellow-300'
                    }`}
                    style={{ height: `${item.fishActivity}%` }}
                  >
                    {item.fishActivity}%
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-white flex items-center justify-center gap-1">
                    <span>🐟</span> {item.fishActivity >= 80 ? "High" : "Mod"}
                  </div>
                  <div className="text-slate-400 text-[11px]">Wave: {item.waveHeight}m</div>
                  <div className="text-[11px] font-bold text-emerald-400">Risk: {item.risk}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fisherman Summary Banner */}
        <div className="p-4 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📈</span>
            <div>
              <div className="text-sm font-extrabold text-white">{t('trendSummary')}</div>
              <div className="text-xs text-slate-300">Calm swell and optimal water temperature window will persist through the weekend.</div>
            </div>
          </div>
          <VoiceSpeaker text={voiceNarrative} />
        </div>
      </div>

      {/* Navigation Buttons (Merges Both Branches into Hotspot Detection) */}
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
          className="px-8 py-4 rounded-xl font-extrabold text-base sm:text-lg text-ocean-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2 min-h-[52px] cursor-pointer"
        >
          <span>Merge Branches & Detect Hotspots →</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Step6FutureTrend;

