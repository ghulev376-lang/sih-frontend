import React, { useState } from 'react';
import { useFlow } from '../context/FlowContext';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Navigation, Eye, Layers, Compass, Flame, ShieldAlert, Sparkles, Waves } from 'lucide-react';

const InteractiveMarineMap = ({ mode = "region", onSelectRegion = null, showHotspotDetails = true }) => {
  const { regions, selectedRegion, setSelectedRegion, chlorophyllData, anomalyData, hotspotData } = useFlow();
  const { t } = useLanguage();
  const [activeLayer, setActiveLayer] = useState("all"); // 'all' | 'chlorophyll' | 'anomaly' | 'hotspots'

  const mapRegions = [
    {
      id: "region-a",
      name: "Region A (Mumbai South)",
      cx: 190,
      cy: 140,
      r: 45,
      poly: "150,110 230,120 220,180 140,165",
      color: "#10b981", // Good
      chlorophyllVal: "Medium (2.7 mg/m³)",
      anomalyVal: "Normal",
      depth: "40m",
      fishProb: 64
    },
    {
      id: "region-b",
      name: "Region B (Konkan - Ratnagiri Offshore)",
      cx: 310,
      cy: 270,
      r: 65,
      poly: "240,210 380,225 360,330 220,310",
      color: "#10b981", // Good
      chlorophyllVal: "High (4.8 mg/m³ - Optimal)",
      anomalyVal: "Mild safe eddy",
      depth: "65m",
      fishProb: 88,
      isHotspot: true
    },
    {
      id: "region-c",
      name: "Region C (Malvan Deep)",
      cx: 410,
      cy: 390,
      r: 50,
      poly: "340,340 470,360 450,450 330,430",
      color: "#f59e0b", // Moderate
      chlorophyllVal: "High (4.2 mg/m³)",
      anomalyVal: "Normal",
      depth: "90m",
      fishProb: 82
    },
    {
      id: "region-d",
      name: "Region D (Outer Trench)",
      cx: 140,
      cy: 340,
      r: 40,
      poly: "80,300 190,310 180,390 70,370",
      color: "#ef4444", // High Risk
      chlorophyllVal: "Low (0.9 mg/m³)",
      anomalyVal: "Strong Undercurrent",
      depth: "200m+",
      fishProb: 45
    }
  ];

  const handleRegionClick = (reg) => {
    const matched = regions.find((r) => r.id === reg.id) || regions[0];
    setSelectedRegion(matched);
    if (onSelectRegion) onSelectRegion(matched);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-ocean-950 border border-cyan-500/30 shadow-2xl shadow-ocean-950">
      
      {/* Map Header / Layer Bar */}
      <div className="px-4 py-3 bg-ocean-900/90 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs sm:text-sm font-extrabold text-cyan-200 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-cyan-400" />
            Coastal Ocean Radar &bull; Arabian Sea (16°N - 19°N)
          </span>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center gap-1.5 bg-ocean-950/80 p-1 rounded-xl border border-cyan-500/20 text-xs">
          <button
            type="button"
            onClick={() => setActiveLayer("all")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              activeLayer === "all" ? "bg-cyan-500 text-ocean-950 shadow" : "text-slate-300 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer("chlorophyll")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              activeLayer === "chlorophyll" ? "bg-emerald-500 text-ocean-950 shadow" : "text-slate-300 hover:text-white"
            }`}
          >
            Chlorophyll
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer("anomaly")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              activeLayer === "anomaly" ? "bg-amber-500 text-ocean-950 shadow" : "text-slate-300 hover:text-white"
            }`}
          >
            Anomaly
          </button>
        </div>
      </div>

      {/* SVG Interactive Ocean Canvas */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[340px] max-h-[500px] bg-gradient-to-br from-ocean-950 via-[#061935] to-[#041228] overflow-hidden select-none">
        
        {/* Animated Radar Sweep Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[500px] h-[500px] rounded-full border border-cyan-400/30 animate-pulse-slow"></div>
            <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-400/20"></div>
            <div className="absolute w-[120px] h-[120px] rounded-full border border-cyan-400/20"></div>
          </div>
        </div>

        <svg
          viewBox="0 0 600 480"
          className="w-full h-full object-cover"
          style={{ filter: "drop-shadow(0 0 10px rgba(6,182,212,0.15))" }}
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="marine-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="0.8" />
            </pattern>

            {/* Chlorophyll High Gradient */}
            <radialGradient id="chlorophyll-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>

            {/* Anomaly Gradient */}
            <radialGradient id="anomaly-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>

            {/* Risk Gradient */}
            <radialGradient id="risk-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#ef4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Grid */}
          <rect width="600" height="480" fill="url(#marine-grid)" />

          {/* Coastline Graphic (West Coast of India) */}
          <path
            d="M 540,0 Q 510,80 500,160 T 485,280 T 470,380 T 460,480 L 600,480 L 600,0 Z"
            fill="#091f38"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeOpacity="0.6"
          />

          {/* Coastline Land Label */}
          <text x="525" y="60" fill="#67aef3" fontSize="11" fontWeight="bold" opacity="0.6" transform="rotate(75, 525, 60)">
            INDIA WEST COAST
          </text>
          <text x="500" y="240" fill="#388fe5" fontSize="10" fontWeight="bold" opacity="0.7">
            Ratnagiri Port
          </text>
          <circle cx="488" cy="245" r="4" fill="#388fe5" />

          {/* Depth Contours */}
          <path d="M 420,0 Q 390,120 370,260 T 350,480" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeDasharray="4 4" />
          <text x="360" y="470" fill="rgba(34, 211, 238, 0.4)" fontSize="9">50m isobath</text>

          <path d="M 280,0 Q 250,140 230,280 T 210,480" fill="none" stroke="rgba(34, 211, 238, 0.1)" strokeDasharray="6 6" />
          <text x="215" y="470" fill="rgba(34, 211, 238, 0.3)" fontSize="9">100m isobath</text>

          {/* Render Chlorophyll / Anomaly Heat Blobs */}
          {(activeLayer === "all" || activeLayer === "chlorophyll") && (
            <>
              {/* High bloom around Region B */}
              <circle cx="310" cy="270" r="85" fill="url(#chlorophyll-glow)" className="animate-pulse-slow" />
              {/* Moderate bloom around Region A */}
              <circle cx="190" cy="140" r="55" fill="url(#chlorophyll-glow)" opacity="0.6" />
            </>
          )}

          {(activeLayer === "all" || activeLayer === "anomaly") && (
            <>
              {/* Deep trench risk blob */}
              <circle cx="140" cy="340" r="50" fill="url(#risk-glow)" />
              {/* Malvan mild thermal shift */}
              <circle cx="410" cy="390" r="45" fill="url(#anomaly-glow)" />
            </>
          )}

          {/* Interactive Marine Region Polygons / Markers */}
          {mapRegions.map((reg) => {
            const isSelected = selectedRegion?.id === reg.id;
            return (
              <g
                key={reg.id}
                onClick={() => handleRegionClick(reg)}
                className="cursor-pointer group"
              >
                {/* Zone Boundary */}
                <polygon
                  points={reg.poly}
                  fill={isSelected ? "rgba(6, 182, 212, 0.25)" : "rgba(11, 40, 75, 0.4)"}
                  stroke={isSelected ? "#22d3ee" : reg.color}
                  strokeWidth={isSelected ? "3" : "1.8"}
                  strokeDasharray={isSelected ? "none" : "4 2"}
                  className="transition-all duration-300 group-hover:fill-cyan-500/20"
                />

                {/* Hotspot Pulsing Ring if Hotspot */}
                {reg.isHotspot && (
                  <g transform={`translate(${reg.cx}, ${reg.cy})`}>
                    <circle r="28" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.7" className="animate-ping" />
                    <circle r="18" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.9" />
                  </g>
                )}

                {/* Region Center Pin */}
                <g transform={`translate(${reg.cx}, ${reg.cy})`}>
                  <circle
                    r={isSelected ? "14" : "10"}
                    fill={reg.color}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="shadow-lg transition-transform group-hover:scale-125"
                  />
                  {isSelected && (
                    <circle r="22" fill="none" stroke="#22d3ee" strokeWidth="2" opacity="0.8" className="animate-pulse" />
                  )}
                </g>

                {/* Region Text Badge */}
                <g transform={`translate(${reg.cx - 50}, ${reg.cy + 22})`}>
                  <rect
                    width="100"
                    height="24"
                    rx="6"
                    fill={isSelected ? "#0c274c" : "#061325"}
                    stroke={isSelected ? "#22d3ee" : "rgba(34,211,238,0.3)"}
                    strokeWidth="1.2"
                  />
                  <text
                    x="50"
                    y="16"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {reg.id === "region-b" ? "Region B ★" : reg.name.split(" ")[0] + " " + reg.name.split(" ")[1]}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Quick Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-ocean-950/90 border border-cyan-500/30 rounded-xl p-2.5 backdrop-blur-md text-xs space-y-1.5 shadow-lg">
          <div className="font-extrabold text-cyan-300 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> Map Legend
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>🟢 Good for Fishing (Safe)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>🟡 Moderate (Caution)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>🔴 Risk / Strong Currents</span>
          </div>
        </div>

        {/* Selected Zone Quick Tooltip (Top-Right of Map) */}
        {selectedRegion && (
          <div className="absolute top-3 right-3 bg-ocean-900/95 border border-cyan-400/50 rounded-xl p-3 backdrop-blur-md shadow-xl max-w-[200px] sm:max-w-xs">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-xs font-bold text-cyan-300">{selectedRegion.shortName}</span>
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {selectedRegion.fishActivity} Fish Yield
              </span>
            </div>
            <div className="text-xs text-slate-300">
              Wave: <span className="text-white font-semibold">{selectedRegion.waveHeight}</span> &bull; Current: <span className="text-white font-semibold">{selectedRegion.currentSpeed}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default InteractiveMarineMap;

