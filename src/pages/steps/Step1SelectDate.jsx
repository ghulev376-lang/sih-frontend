import React, { useState } from 'react';
import { useFlow } from '../../context/FlowContext';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, ArrowRight, Sun, Sparkles, CheckCircle2 } from 'lucide-react';

const Step1SelectDate = () => {
  const { selectedDate, setSelectedDate, dateType, setDateType, nextStep } = useFlow();
  const { t } = useLanguage();
  const [customInputDate, setCustomInputDate] = useState('2026-08-28');

  const todayStr = "26 August 2026";
  const tomorrowStr = "27 August 2026";

  const handleSelectOption = (type) => {
    setDateType(type);
    if (type === 'today') {
      setSelectedDate(todayStr);
    } else if (type === 'tomorrow') {
      setSelectedDate(tomorrowStr);
    } else {
      setSelectedDate("28 August 2026");
    }
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomInputDate(val);
    if (val) {
      const dateObj = new Date(val);
      const formatted = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      setSelectedDate(formatted);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-extrabold uppercase tracking-wider mb-3">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>Step 1 &bull; {t('step1Name')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {t('step1Title')}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-md mx-auto">
          {t('step1Desc')}
        </p>
      </div>

      {/* Date Options Container */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        
        {/* Option 1: Today */}
        <button
          type="button"
          onClick={() => handleSelectOption('today')}
          className={`p-5 rounded-2xl border text-left transition-all relative cursor-pointer min-h-[120px] flex flex-col justify-between ${
            dateType === 'today'
              ? 'bg-cyan-500/20 border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/40'
              : 'bg-ocean-900/80 border-ocean-700/60 hover:border-cyan-500/40 hover:bg-ocean-850'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">☀️</span>
            {dateType === 'today' && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
          </div>
          <div>
            <div className="text-lg font-black text-white">{t('today')}</div>
            <div className="text-xs text-cyan-300 font-semibold mt-0.5">{todayStr}</div>
          </div>
        </button>

        {/* Option 2: Tomorrow */}
        <button
          type="button"
          onClick={() => handleSelectOption('tomorrow')}
          className={`p-5 rounded-2xl border text-left transition-all relative cursor-pointer min-h-[120px] flex flex-col justify-between ${
            dateType === 'tomorrow'
              ? 'bg-cyan-500/20 border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/40'
              : 'bg-ocean-900/80 border-ocean-700/60 hover:border-cyan-500/40 hover:bg-ocean-850'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🌅</span>
            {dateType === 'tomorrow' && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
          </div>
          <div>
            <div className="text-lg font-black text-white">{t('tomorrow')}</div>
            <div className="text-xs text-cyan-300 font-semibold mt-0.5">{tomorrowStr}</div>
          </div>
        </button>

        {/* Option 3: Custom Date */}
        <button
          type="button"
          onClick={() => handleSelectOption('custom')}
          className={`p-5 rounded-2xl border text-left transition-all relative cursor-pointer min-h-[120px] flex flex-col justify-between ${
            dateType === 'custom'
              ? 'bg-cyan-500/20 border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/40'
              : 'bg-ocean-900/80 border-ocean-700/60 hover:border-cyan-500/40 hover:bg-ocean-850'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🗓️</span>
            {dateType === 'custom' && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
          </div>
          <div>
            <div className="text-lg font-black text-white">{t('customDate')}</div>
            <div className="text-xs text-cyan-300 font-semibold mt-0.5">Select from calendar</div>
          </div>
        </button>

      </div>

      {/* Custom Date Input Picker if custom is active */}
      {dateType === 'custom' && (
        <div className="mb-8 p-4 rounded-2xl bg-ocean-900/90 border border-cyan-500/30 animate-in fade-in zoom-in-95">
          <label className="block text-sm font-bold text-cyan-300 mb-2">
            Choose Custom Date for Ocean Scan:
          </label>
          <input
            type="date"
            value={customInputDate}
            onChange={handleCustomChange}
            className="w-full px-4 py-3 rounded-xl bg-ocean-950 text-white border border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base"
          />
        </div>
      )}

      {/* Selected Date Confirmation Banner */}
      <div className="p-4 rounded-2xl bg-ocean-900/90 border border-cyan-500/30 flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
            📅
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{t('selectedDatePrefix')}</div>
            <div className="text-lg sm:text-xl font-extrabold text-cyan-200">{selectedDate}</div>
          </div>
        </div>
        <span className="px-3 py-1 text-xs font-extrabold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
          Ready
        </span>
      </div>

      {/* Navigation Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          disabled={!selectedDate}
          className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-base sm:text-lg text-ocean-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[52px]"
        >
          <span>{t('continue')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Step1SelectDate;

