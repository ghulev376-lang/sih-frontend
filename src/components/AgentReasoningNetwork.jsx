import React, { useState, useEffect } from 'react';
import { Brain, Waves, Fish, CloudRain, ShieldCheck, Sparkles, Activity, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AgentReasoningNetwork = ({ regionName = "Region B", fishProbability = 88, aiConfidence = "High (94.2%)" }) => {
  const { t } = useLanguage();
  const [analyzingProgress, setAnalyzingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyzingProgress((prev) => (prev < 100 ? prev + 25 : 100));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const agents = [
    {
      id: "ocean",
      name: t('agentOcean'),
      icon: "🌊",
      label: "Ocean Dynamics",
      data: "SST 28.4°C | Upwelling detected",
      status: "Optimal",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: "fish",
      name: t('agentFish'),
      icon: "🐟",
      label: "Fish Biology & Catch",
      data: "Mackerel & Pomfret schools active",
      status: "High Density",
      color: "from-emerald-400 to-teal-600"
    },
    {
      id: "orca",
      name: t('agentOrca'),
      icon: "🐋",
      label: "Apex Ecosystem",
      data: "Food chain stability 98%",
      status: "Thriving",
      color: "from-sky-400 to-indigo-600"
    },
    {
      id: "weather",
      name: t('agentWeather'),
      icon: "🌦️",
      label: "Marine Meteorology",
      data: "Wind 11 kts | Wave 0.9m",
      status: "Calm Sea",
      color: "from-amber-400 to-orange-500"
    },
    {
      id: "pollution",
      name: t('agentPollution'),
      icon: "🛢️",
      label: "Water Purity & Hazard",
      data: "Turbidity 0.4 NTU | 0 Oil Slicks",
      status: "Pristine",
      color: "from-teal-400 to-emerald-600"
    }
  ];

  return (
    <div className="w-full rounded-2xl bg-ocean-950/90 border border-cyan-500/30 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Network Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            Autonomous Multi-Agent Swarm Reasoning
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
            ORCA AI Neural Marine Network
          </h3>
        </div>

        {/* Live Processing Indicator */}
        <div className="flex items-center gap-2 bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-400/30">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold text-cyan-200">
            {analyzingProgress < 100 ? `${t('analyzingAgents')} (${analyzingProgress}%)` : "All Agents Synchronized"}
          </span>
        </div>
      </div>

      {/* Visual Collaborative Node Network */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Left Column: Peripheral Specialized Agents */}
        <div className="space-y-3">
          {agents.slice(0, 3).map((agent) => (
            <div
              key={agent.id}
              className="p-3.5 rounded-xl bg-ocean-900/80 border border-cyan-500/20 hover:border-cyan-400/40 transition-all flex items-center gap-3 relative group"
            >
              <div className="w-10 h-10 rounded-xl bg-ocean-950 border border-cyan-500/30 flex items-center justify-center text-xl shrink-0 shadow">
                {agent.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 truncate">{agent.name}</span>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {agent.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300 truncate mt-0.5">{agent.data}</div>
              </div>
              {/* Connector line dot */}
              <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-ocean-950" />
            </div>
          ))}
        </div>

        {/* Center: Reasoning Coordinator Brain Node */}
        <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-gradient-to-b from-ocean-900 to-ocean-950 border-2 border-cyan-400/60 shadow-xl shadow-cyan-500/20 relative">
          
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/40 ring-4 ring-cyan-300/30 animate-pulse-slow">
              <Brain className="w-10 h-10 text-ocean-950" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-ocean-950 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="text-xs font-extrabold uppercase tracking-wider text-cyan-300 mb-0.5">
            {t('agentBrain')}
          </div>
          <div className="text-base font-extrabold text-white mb-2">
            Fused Consensus Engine
          </div>

          <div className="w-full bg-ocean-950/80 rounded-xl p-3 border border-cyan-500/20 space-y-1 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>{t('fishProbability')}:</span>
              <span className="font-extrabold text-emerald-400 text-sm">{fishProbability}%</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>{t('aiConfidence')}:</span>
              <span className="font-extrabold text-cyan-300">{aiConfidence}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Remaining Specialized Agents */}
        <div className="space-y-3">
          {agents.slice(3, 5).map((agent) => (
            <div
              key={agent.id}
              className="p-3.5 rounded-xl bg-ocean-900/80 border border-cyan-500/20 hover:border-cyan-400/40 transition-all flex items-center gap-3 relative group"
            >
              {/* Connector line dot */}
              <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-ocean-950" />
              <div className="w-10 h-10 rounded-xl bg-ocean-950 border border-cyan-500/30 flex items-center justify-center text-xl shrink-0 shadow">
                {agent.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 truncate">{agent.name}</span>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {agent.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300 truncate mt-0.5">{agent.data}</div>
              </div>
            </div>
          ))}

          {/* AI Consensus Summary Box */}
          <div className="p-3.5 rounded-xl bg-cyan-950/70 border border-cyan-400/30 flex items-center gap-2.5 text-xs text-cyan-200">
            <Sparkles className="w-5 h-5 text-cyan-300 shrink-0" />
            <span>
              All 5 agents agree: <strong>{regionName}</strong> has peak upwelling & zero storm risk.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgentReasoningNetwork;

