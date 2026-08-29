import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { useLanguage } from '../../context/LanguageContext';
import FinalRecommendationCard from '../../components/FinalRecommendationCard';
import VoiceSpeaker from '../../components/VoiceSpeaker';
import { ShieldCheck, AlertCircle, Share2, Download, MapPin, Calendar, FileText, CheckCircle2, RotateCcw, ArrowLeft, Waves } from 'lucide-react';

const Step8AlertReport = () => {
  const { selectedRegion, selectedDate, chlorophyllData, anomalyData, aiPredictionData, hotspotData, resetFlow, prevStep, setCurrentStep } = useFlow();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showTechnicalReport, setShowTechnicalReport] = useState(false);

  const isSafe = selectedRegion?.riskLevel === 'Low';
  const isCaution = selectedRegion?.riskLevel === 'Moderate';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-2">
      {/* Final Step Badge */}
      <div className="flex items-center justify-between gap-2 mb-4 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/30">
        <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>FINAL INTELLIGENCE SYNTHESIS & SAFETY REPORT</span>
        </div>
        <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
          Step 8 of 8 &bull; Completed
        </span>
      </div>

      {/* Main Giant Fisherman-Friendly Recommendation Card */}
      <div className="mb-10">
        <FinalRecommendationCard />
      </div>

      {/* Report Summary Dashboard Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-ocean-950/90 border border-cyan-500/30 shadow-2xl mb-8">
        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20 mb-6">
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              {t('reportSummaryHeader')}
            </div>
            <h3 className="text-xl font-extrabold text-white mt-0.5">
              Mission Flight & Voyage Summary
            </h3>
          </div>

          {/* Share & Download Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-ocean-900 hover:bg-ocean-850 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? "Copied!" : t('shareReport')}</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-ocean-900 hover:bg-ocean-850 text-slate-200 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{t('downloadReport')}</span>
            </button>
          </div>
        </div>

        {/* 8-Point Synthesized Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          
          <div className="p-3.5 rounded-2xl bg-ocean-900/80 border border-cyan-500/20">
            <div className="text-xs text-slate-400 font-bold">1. Selected Date</div>
            <div className="text-sm font-extrabold text-white mt-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{selectedDate}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-ocean-900/80 border border-cyan-500/20">
            <div className="text-xs text-slate-400 font-bold">2. Marine Zone</div>
            <div className="text-sm font-extrabold text-white mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="truncate">{selectedRegion?.shortName}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-ocean-900/80 border border-cyan-500/20">
            <div className="text-xs text-slate-400 font-bold">3. Chlorophyll Status</div>
            <div className="text-sm font-extrabold text-emerald-400 mt-1">
              🟢 {chlorophyllData?.density || "High (Optimal)"}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-ocean-900/80 border border-cyan-500/20">
            <div className="text-xs text-slate-400 font-bold">4. Ocean Anomaly</div>
            <div className="text-sm font-extrabold text-emerald-400 mt-1">
              🟢 {anomalyData?.status || "Normal Currents"}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-ocean-900/80 border border-cyan-500/20">
            <div className="text-xs text-slate-400 font-bold">5. AI Prediction</div>
            <div className="text-sm font-extrabold text-cyan-300 mt-1">
              🤖 {selectedRegion?.fishProbability || 88}% Fish Yield
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-ocean-900/80 border border-cyan-500/20">
            <div className="text-xs text-slate-400 font-bold">6. Future 3-Day Trend</div>
            <div className="text-sm font-extrabold text-cyan-300 mt-1">
              📈 Favorable & Calm
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-ocean-900/80 border border-cyan-500/20">
            <div className="text-xs text-slate-400 font-bold">7. Detected Hotspot</div>
            <div className="text-sm font-extrabold text-amber-400 mt-1">
              🔥 Hotspot 01 ({selectedRegion?.shortName})
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-ocean-900/80 border border-cyan-500/20">
            <div className="text-xs text-slate-400 font-bold">8. Safety Verdict</div>
            <div className="text-sm font-extrabold text-emerald-400 mt-1">
              🛡️ {isSafe ? t('statusSafe') : t('statusCaution')}
            </div>
          </div>

        </div>

        {/* Quick Map Jump & Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-cyan-500/20">
          <button
            type="button"
            onClick={prevStep}
            className="px-5 py-3 rounded-xl font-bold text-slate-300 hover:text-white bg-ocean-900 border border-ocean-700/80 hover:bg-ocean-800 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('back')}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(7)}
              className="px-5 py-3 rounded-xl font-bold text-cyan-300 bg-cyan-950 border border-cyan-500/40 hover:bg-ocean-900 transition-all flex items-center gap-1.5"
            >
              <span>🗺️ View Hotspot on Map</span>
            </button>

            <button
              type="button"
              onClick={resetFlow}
              className="px-6 py-3 rounded-xl font-extrabold text-ocean-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/30"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('resetFlow')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Step8AlertReport;

