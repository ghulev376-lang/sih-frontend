import React from 'react';
import { useFlow } from '../context/FlowContext';
import { useLanguage } from '../context/LanguageContext';
import { Check, Calendar, MapPin, Waves, AlertTriangle, Cpu, TrendingUp, Flame, ShieldAlert, ArrowRight, GitFork } from 'lucide-react';

const FlowStepper = () => {
  const { currentStep, setCurrentStep, completedSteps } = useFlow();
  const { t } = useLanguage();

  const steps = [
    { num: 1, name: t('step1Name'), icon: Calendar, branch: 'common' },
    { num: 2, name: t('step2Name'), icon: MapPin, branch: 'common' },
    { num: 3, name: t('step3Name'), icon: Waves, branch: 'left' },
    { num: 4, name: t('step4Name'), icon: AlertTriangle, branch: 'left' },
    { num: 5, name: t('step5Name'), icon: Cpu, branch: 'right' },
    { num: 6, name: t('step6Name'), icon: TrendingUp, branch: 'right' },
    { num: 7, name: t('step7Name'), icon: Flame, branch: 'merge' },
    { num: 8, name: t('step8Name'), icon: ShieldAlert, branch: 'final' },
  ];

  const isCompleted = (num) => completedSteps.includes(num);
  const isCurrent = (num) => currentStep === num;
  const isAccessible = (num) => isCompleted(num) || isCurrent(num) || num <= Math.max(...completedSteps, 1) + 1;

  return (
    <div className="w-full bg-ocean-900/90 border-b border-cyan-500/20 py-4 px-3 sm:px-6 sticky top-0 z-40 backdrop-blur-xl shadow-lg shadow-ocean-950/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Desktop Branching Stepper (> 1024px) */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between gap-2">
            
            {/* Step 1: Select Date */}
            <StepPill
              step={steps[0]}
              isCurrent={isCurrent(1)}
              isCompleted={isCompleted(1)}
              isAccessible={isAccessible(1)}
              onClick={() => isAccessible(1) && setCurrentStep(1)}
            />

            <Connector active={isCompleted(1)} />

            {/* Step 2: Select Region */}
            <StepPill
              step={steps[1]}
              isCurrent={isCurrent(2)}
              isCompleted={isCompleted(2)}
              isAccessible={isAccessible(2)}
              onClick={() => isAccessible(2) && setCurrentStep(2)}
            />

            {/* Branching Divider Visual */}
            <div className="flex flex-col items-center px-1 text-cyan-400">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300/80 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                Split
              </span>
              <div className="h-4 w-px bg-cyan-500/40 my-0.5"></div>
            </div>

            {/* Parallel Analysis Container (Left & Right Branches) */}
            <div className="flex-1 p-2 rounded-2xl bg-ocean-950/70 border border-cyan-500/25 flex flex-col gap-2 relative">
              {/* Branch 1 (Left - Chlorophyll & Anomaly) */}
              <div className="flex items-center justify-between gap-1.5 bg-cyan-950/40 px-2.5 py-1.5 rounded-xl border border-cyan-500/15">
                <span className="text-[11px] font-bold text-cyan-300 shrink-0 w-20 flex items-center gap-1">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" /> Ocean:
                </span>
                <StepPill
                  step={steps[2]}
                  isCurrent={isCurrent(3)}
                  isCompleted={isCompleted(3)}
                  isAccessible={isAccessible(3)}
                  onClick={() => isAccessible(3) && setCurrentStep(3)}
                  compact
                />
                <Connector active={isCompleted(3)} small />
                <StepPill
                  step={steps[3]}
                  isCurrent={isCurrent(4)}
                  isCompleted={isCompleted(4)}
                  isAccessible={isAccessible(4)}
                  onClick={() => isAccessible(4) && setCurrentStep(4)}
                  compact
                />
              </div>

              {/* Branch 2 (Right - AI Prediction & Future Trend) */}
              <div className="flex items-center justify-between gap-1.5 bg-blue-950/40 px-2.5 py-1.5 rounded-xl border border-blue-500/15">
                <span className="text-[11px] font-bold text-sky-300 shrink-0 w-20 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" /> AI Agent:
                </span>
                <StepPill
                  step={steps[4]}
                  isCurrent={isCurrent(5)}
                  isCompleted={isCompleted(5)}
                  isAccessible={isAccessible(5)}
                  onClick={() => isAccessible(5) && setCurrentStep(5)}
                  compact
                />
                <Connector active={isCompleted(5)} small />
                <StepPill
                  step={steps[5]}
                  isCurrent={isCurrent(6)}
                  isCompleted={isCompleted(6)}
                  isAccessible={isAccessible(6)}
                  onClick={() => isAccessible(6) && setCurrentStep(6)}
                  compact
                />
              </div>
            </div>

            {/* Merge Divider Visual */}
            <div className="flex flex-col items-center px-1 text-cyan-400">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                Merge
              </span>
              <div className="h-4 w-px bg-amber-500/40 my-0.5"></div>
            </div>

            {/* Step 7: Hotspots */}
            <StepPill
              step={steps[6]}
              isCurrent={isCurrent(7)}
              isCompleted={isCompleted(7)}
              isAccessible={isAccessible(7)}
              onClick={() => isAccessible(7) && setCurrentStep(7)}
              highlight="amber"
            />

            <Connector active={isCompleted(7)} />

            {/* Step 8: Alert / Report */}
            <StepPill
              step={steps[7]}
              isCurrent={isCurrent(8)}
              isCompleted={isCompleted(8)}
              isAccessible={isAccessible(8)}
              onClick={() => isAccessible(8) && setCurrentStep(8)}
              highlight="emerald"
            />
          </div>
        </div>

        {/* Mobile & Tablet Stepper (< 1024px) */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-extrabold text-sm border border-cyan-400/40">
                {currentStep}
              </span>
              <div>
                <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                  Step {currentStep} of 8
                </div>
                <div className="text-sm font-extrabold text-white">
                  {steps[currentStep - 1]?.name}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              {Math.round((completedSteps.length / 8) * 100)}% Complete
            </div>
          </div>

          {/* Horizontal Scrollable Step Dots */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {steps.map((step) => {
              const active = isCurrent(step.num);
              const done = isCompleted(step.num);
              const accessible = isAccessible(step.num);
              const Icon = step.icon;

              return (
                <button
                  key={step.num}
                  type="button"
                  disabled={!accessible}
                  onClick={() => accessible && setCurrentStep(step.num)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all border ${
                    active
                      ? 'bg-cyan-500 text-ocean-950 border-cyan-300 shadow-md shadow-cyan-500/30 ring-2 ring-cyan-400/40'
                      : done
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40 hover:bg-ocean-800'
                      : 'bg-ocean-900 text-slate-500 border-ocean-800 opacity-60'
                  }`}
                >
                  {done ? (
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                  <span>{step.num}. {step.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

const StepPill = ({ step, isCurrent, isCompleted, isAccessible, onClick, compact = false, highlight = null }) => {
  const Icon = step.icon;

  let bgClass = "bg-ocean-900/90 text-slate-400 border-ocean-700/50 hover:bg-ocean-850";
  if (isCurrent) {
    bgClass = highlight === 'amber'
      ? "bg-amber-500 text-ocean-950 border-amber-300 shadow-lg shadow-amber-500/30 scale-105 font-extrabold ring-2 ring-amber-400/40"
      : highlight === 'emerald'
      ? "bg-emerald-500 text-ocean-950 border-emerald-300 shadow-lg shadow-emerald-500/30 scale-105 font-extrabold ring-2 ring-emerald-400/40"
      : "bg-cyan-400 text-ocean-950 border-cyan-200 shadow-lg shadow-cyan-500/30 scale-105 font-extrabold ring-2 ring-cyan-300/40";
  } else if (isCompleted) {
    bgClass = "bg-cyan-950 text-cyan-200 border-cyan-500/40 hover:border-cyan-400 hover:bg-ocean-850 font-semibold";
  }

  return (
    <button
      type="button"
      disabled={!isAccessible}
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl transition-all border text-left cursor-pointer ${
        compact ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-2 text-xs xl:text-sm'
      } ${bgClass} ${!isAccessible ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      <div
        className={`flex items-center justify-center rounded-lg ${
          compact ? 'w-5 h-5 text-xs' : 'w-6 h-6 text-sm'
        } ${
          isCurrent
            ? 'bg-ocean-950/20 text-ocean-950'
            : isCompleted
            ? 'bg-cyan-500/20 text-cyan-300'
            : 'bg-ocean-800 text-slate-400'
        }`}
      >
        {isCompleted ? <Check className="w-3.5 h-3.5 font-bold" /> : step.num}
      </div>
      <div className="font-bold truncate max-w-[110px] xl:max-w-none">{step.name}</div>
    </button>
  );
};

const Connector = ({ active = false, small = false }) => {
  return (
    <div
      className={`shrink-0 transition-colors ${
        small ? 'w-3 h-0.5' : 'w-5 xl:w-7 h-0.5'
      } ${active ? 'bg-cyan-400 shadow-sm shadow-cyan-400' : 'bg-ocean-700/60'}`}
    />
  );
};

export default FlowStepper;

