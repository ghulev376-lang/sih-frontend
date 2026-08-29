import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { useLanguage } from '../../context/LanguageContext';
import InteractiveMarineMap from '../../components/InteractiveMarineMap';
import { MapPin, Navigation, Search, ArrowRight, ArrowLeft, CheckCircle2, Waves, AlertTriangle, ShieldCheck } from 'lucide-react';

const Step2SelectRegion = () => {
  const { selectedRegion, setSelectedRegion, regions, nextStep, prevStep, selectedDate } = useFlow();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [locating, setLocating] = useState(false);

  const filteredRegions = regions.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUseCurrentLocation = () => {
    setLocating(true);
    setTimeout(() => {
      // Pinpoint user to Region B (Offshore Konkan/Ratnagiri)
      setSelectedRegion(regions[0]);
      setLocating(false);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto py-2">
      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-extrabold uppercase tracking-wider mb-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span>Step 2 &bull; {t('step2Name')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {t('step2Title')}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-lg mx-auto">
          {t('step2Desc')}
        </p>
      </div>

      {/* Controls Bar: Search + GPS Button */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {/* Search Input */}
        <div className="sm:col-span-2 relative">
          <Search className="w-5 h-5 text-cyan-400/80 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchRegionPlaceholder')}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-ocean-900/90 text-white placeholder-slate-400 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
          />
        </div>

        {/* GPS Button */}
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={locating}
          className="px-4 py-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <Navigation className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
          <span>{locating ? "Locating Boat GPS..." : t('useCurrentLocation')}</span>
        </button>
      </div>

      {/* Large Interactive Marine Ocean Map */}
      <div className="mb-6">
        <InteractiveMarineMap />
      </div>

      {/* Quick Region Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {filteredRegions.map((reg) => {
          const isSelected = selectedRegion?.id === reg.id;
          return (
            <button
              key={reg.id}
              type="button"
              onClick={() => setSelectedRegion(reg)}
              className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-cyan-950 border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20'
                  : 'bg-ocean-900/80 border-ocean-700/60 hover:bg-ocean-850'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-300">{reg.shortName}</span>
                <span className="text-sm">
                  {reg.riskLevel === 'Low' ? '🟢' : reg.riskLevel === 'Moderate' ? '🟡' : '🔴'}
                </span>
              </div>
              <div className="text-sm font-extrabold text-white truncate">{reg.name.split(' - ')[1] || reg.name}</div>
            </button>
          );
        })}
      </div>

      {/* Bottom Region Information Card */}
      {selectedRegion && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-ocean-900 via-ocean-850 to-ocean-900 border-2 border-cyan-400/60 shadow-xl shadow-cyan-500/10 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20 mb-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                Selected Coastal Fishing Zone
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-0.5">
                <MapPin className="w-6 h-6 text-cyan-400 shrink-0" />
                {selectedRegion.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                GPS: {selectedRegion.coordinates} &bull; Depth: {selectedRegion.depth} &bull; Distance: {selectedRegion.distanceFromPort}
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs sm:text-sm font-extrabold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Target Locked for {selectedDate}</span>
            </div>
          </div>

          {/* Fisherman-friendly Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-ocean-950/80 border border-cyan-500/20 flex items-center gap-3">
              <div className="text-2xl">🐟</div>
              <div>
                <div className="text-xs text-slate-400 font-bold">{t('fishActivity')}</div>
                <div className="text-base font-extrabold text-cyan-300">{selectedRegion.fishActivity} ({selectedRegion.fishProbability}%)</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-ocean-950/80 border border-cyan-500/20 flex items-center gap-3">
              <div className="text-2xl">🌊</div>
              <div>
                <div className="text-xs text-slate-400 font-bold">{t('seaCondition')}</div>
                <div className="text-base font-extrabold text-emerald-300">{selectedRegion.seaCondition} (Calm Waves)</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-ocean-950/80 border border-cyan-500/20 flex items-center gap-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <div className="text-xs text-slate-400 font-bold">{t('riskLevel')}</div>
                <div className="text-base font-extrabold text-emerald-400">{selectedRegion.riskLevel} Risk (Safe)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons (Back & Continue to Parallel Branch) */}
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
          <span>{t('continue')} (Start Branch Analysis)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Step2SelectRegion;

