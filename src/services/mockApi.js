/**
 * Mock API services for ORCA Marine Ecosystem & Fisherman Assistance System
 * Ready to be replaced by actual REST/GraphQL endpoints:
 * /api/regions, /api/chlorophyll, /api/anomaly, /api/prediction, /api/future-trend, /api/hotspots, /api/alerts
 */

export const mockRegions = [
  {
    id: "region-b",
    name: "Region B - Konkan Coast (Ratnagiri Offshore)",
    shortName: "Region B",
    coordinates: "16.9902° N, 73.3120° E",
    depth: "45 - 80 meters",
    distanceFromPort: "14 Nautical Miles",
    fishActivity: "High",
    fishProbability: 88,
    seaCondition: "Good",
    riskLevel: "Low",
    surfaceTemp: "28.4 °C",
    chlorophyllLevel: "High (4.8 mg/m³)",
    currentSpeed: "1.2 knots (Calm)",
    waveHeight: "0.8 - 1.1 m",
    recommendedSpecies: ["Mackerel (Bangda)", "Kingfish (Surmai)", "Pomfret (Paplet)", "Sardines"],
    statusColor: "emerald",
    safetyVerdict: "SAFE",
    aiConfidence: "High (94.2%)"
  },
  {
    id: "region-a",
    name: "Region A - Mumbai South Banks",
    shortName: "Region A",
    coordinates: "18.9220° N, 72.8347° E",
    depth: "30 - 55 meters",
    distanceFromPort: "8 Nautical Miles",
    fishActivity: "Moderate",
    fishProbability: 64,
    seaCondition: "Good",
    riskLevel: "Low",
    surfaceTemp: "29.1 °C",
    chlorophyllLevel: "Medium (2.7 mg/m³)",
    currentSpeed: "1.8 knots",
    waveHeight: "1.2 - 1.4 m",
    recommendedSpecies: ["Bombay Duck (Bombil)", "Prawns (Jhinga)", "Croaker"],
    statusColor: "emerald",
    safetyVerdict: "SAFE",
    aiConfidence: "High (89.5%)"
  },
  {
    id: "region-c",
    name: "Region C - Malvan Deep Waters",
    shortName: "Region C",
    coordinates: "16.0588° N, 73.4682° E",
    depth: "60 - 110 meters",
    distanceFromPort: "22 Nautical Miles",
    fishActivity: "High",
    fishProbability: 82,
    seaCondition: "Moderate",
    riskLevel: "Low",
    surfaceTemp: "28.0 °C",
    chlorophyllLevel: "High (4.2 mg/m³)",
    currentSpeed: "2.1 knots",
    waveHeight: "1.5 - 1.8 m",
    recommendedSpecies: ["Tuna (Kuppa)", "Seer Fish", "Squid"],
    statusColor: "amber",
    safetyVerdict: "SAFE",
    aiConfidence: "Moderate (84.1%)"
  },
  {
    id: "region-d",
    name: "Region D - Outer Shelf Trench",
    shortName: "Region D",
    coordinates: "17.4500° N, 72.1200° E",
    depth: "200+ meters",
    distanceFromPort: "38 Nautical Miles",
    fishActivity: "Moderate",
    fishProbability: 45,
    seaCondition: "Rough",
    riskLevel: "High",
    surfaceTemp: "26.9 °C",
    chlorophyllLevel: "Low (0.9 mg/m³)",
    currentSpeed: "3.6 knots (Strong Undercurrent)",
    waveHeight: "2.8 - 3.4 m",
    recommendedSpecies: ["Deep Sea Pelagic"],
    statusColor: "rose",
    safetyVerdict: "RISK",
    aiConfidence: "High (91.0%)"
  }
];

export const mockApi = {
  getRegions: async () => {
    return mockRegions;
  },

  getChlorophyllData: async (regionId, date) => {
    const region = mockRegions.find(r => r.id === regionId) || mockRegions[0];
    return {
      regionId: region.id,
      date: date || "2026-08-26",
      density: region.chlorophyllLevel,
      planktonZone: "High Phytoplankton Bloom Zone",
      productivityIndex: 9.2,
      thermalFrontMatch: "92% Overlap with cold upwelling current",
      satelliteSource: "MODIS-Aqua & Oceansat-3 OCM",
      recommendationSummary: "High marine activity detected. Plankton bloom is attracting pelagic fish schools."
    };
  },

  getAnomalyData: async (regionId, date) => {
    const region = mockRegions.find(r => r.id === regionId) || mockRegions[0];
    return {
      regionId: region.id,
      date: date || "2026-08-26",
      sstAnomaly: "+0.3 °C (Within safe seasonal threshold)",
      currentDisturbance: "Mild cyclonic eddy (Non-hazardous)",
      underwaterRisk: region.riskLevel === "High" ? "High Current Turbulence" : "Low / Safe",
      status: region.riskLevel === "High" ? "Major Change" : "Normal",
      conditionSummary: "Unusual marine activity detected. Currents are safe for standard trawlers."
    };
  },

  getAIPrediction: async (regionId, date) => {
    const region = mockRegions.find(r => r.id === regionId) || mockRegions[0];
    return {
      regionId: region.id,
      date: date || "2026-08-26",
      agents: [
        { name: "Ocean Agent", icon: "🌊", metric: "Sea Temp: " + region.surfaceTemp, status: "Optimal" },
        { name: "Fish Agent", icon: "🐟", metric: "Catch Probability: " + region.fishProbability + "%", status: "High Activity" },
        { name: "Orca Agent", icon: "🐋", metric: "Apex Ecological Balance: Healthy", status: "Balanced" },
        { name: "Weather Agent", icon: "🌦️", metric: "Wind: 11 kts | Wave: " + region.waveHeight, status: "Calm" },
        { name: "Pollution Agent", icon: "🛢️", metric: "Water Clarity: 98.4% (Clean)", status: "Clean" }
      ],
      fishProbability: region.fishProbability,
      seaCondition: region.seaCondition,
      riskLevel: region.riskLevel,
      aiConfidence: region.aiConfidence,
      finalRecommendation: `${region.shortName} is highly recommended for fishing.`
    };
  },

  getFutureTrend: async (regionId) => {
    return [
      { day: "Today", fishActivity: 88, seaCondition: "Good", waveHeight: 0.9, risk: "Low" },
      { day: "Tomorrow", fishActivity: 92, seaCondition: "Good", waveHeight: 0.8, risk: "Low" },
      { day: "+2 Days", fishActivity: 85, seaCondition: "Good", waveHeight: 1.0, risk: "Low" },
      { day: "+3 Days", fishActivity: 78, seaCondition: "Moderate", waveHeight: 1.3, risk: "Low" },
      { day: "+4 Days", fishActivity: 62, seaCondition: "Moderate", waveHeight: 1.6, risk: "Moderate" }
    ];
  },

  getHotspots: async (regionId) => {
    const region = mockRegions.find(r => r.id === regionId) || mockRegions[0];
    return [
      {
        id: "hotspot-01",
        title: "HOTSPOT 01",
        region: region.shortName,
        lat: 16.985,
        lng: 73.280,
        coordinates: "16.9850° N, 73.2800° E",
        fishProbability: "High (" + region.fishProbability + "%)",
        seaCondition: region.seaCondition,
        risk: region.riskLevel,
        aiConfidence: region.aiConfidence,
        recommendation: `${region.shortName} is recommended for fishing. Maximum concentration of commercial species.`,
        fuelSavingsEstimate: "~18 Liters (Direct Route)",
        bestCatchTime: "04:30 AM - 08:30 AM & 05:00 PM - 08:00 PM"
      }
    ];
  },

  getAlertsAndReports: async (regionId, date) => {
    const region = mockRegions.find(r => r.id === regionId) || mockRegions[0];
    return {
      safetyVerdict: region.riskLevel === "High" ? "HIGH RISK" : (region.riskLevel === "Moderate" ? "CAUTION" : "SAFE"),
      statusColor: region.statusColor,
      date: date || "2026-08-26",
      regionName: region.name,
      shortName: region.shortName,
      fishProbability: region.fishProbability,
      seaCondition: region.seaCondition,
      riskLevel: region.riskLevel,
      chlorophyllStatus: "High (Optimal)",
      anomalyStatus: "Normal / Safe",
      aiRecommendation: `This area is recommended for fishing.`
    };
  }
};

