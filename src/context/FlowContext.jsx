import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockRegions, mockApi } from '../services/mockApi';

const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  // Step 1 state: Date
  const [selectedDate, setSelectedDate] = useState("26 August 2026");
  const [dateType, setDateType] = useState("today"); // "today" | "tomorrow" | "custom"

  // Step 2 state: Region
  const [regions, setRegions] = useState(mockRegions);
  const [selectedRegion, setSelectedRegion] = useState(mockRegions[0]); // Region B default

  // Stepper State: 1 to 8
  // 1: Date, 2: Region, 3: Chlorophyll, 4: Anomaly, 5: AI Prediction, 6: Future Trend, 7: Hotspot, 8: Alert/Report
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]); // step 1 starts ready

  // Data layers for active region
  const [chlorophyllData, setChlorophyllData] = useState(null);
  const [anomalyData, setAnomalyData] = useState(null);
  const [aiPredictionData, setAiPredictionData] = useState(null);
  const [futureTrendData, setFutureTrendData] = useState(null);
  const [hotspotData, setHotspotData] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  // Load mock data whenever selectedRegion or selectedDate changes
  useEffect(() => {
    const loadAnalysis = async () => {
      if (!selectedRegion) return;
      setIsLoadingAnalysis(true);
      try {
        const [chloro, anom, pred, trend, hot, alert] = await Promise.all([
          mockApi.getChlorophyllData(selectedRegion.id, selectedDate),
          mockApi.getAnomalyData(selectedRegion.id, selectedDate),
          mockApi.getAIPrediction(selectedRegion.id, selectedDate),
          mockApi.getFutureTrend(selectedRegion.id),
          mockApi.getHotspots(selectedRegion.id),
          mockApi.getAlertsAndReports(selectedRegion.id, selectedDate)
        ]);
        setChlorophyllData(chloro);
        setAnomalyData(anom);
        setAiPredictionData(pred);
        setFutureTrendData(trend);
        setHotspotData(hot);
        setAlertData(alert);
      } catch (err) {
        console.error("Error loading mock analysis:", err);
      } finally {
        setIsLoadingAnalysis(false);
      }
    };
    loadAnalysis();
  }, [selectedRegion, selectedDate]);

  const goToStep = (stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= 8) {
      setCurrentStep(stepNumber);
      setCompletedSteps((prev) => Array.from(new Set([...prev, stepNumber - 1])));
    }
  };

  const nextStep = () => {
    if (currentStep < 8) {
      const next = currentStep + 1;
      setCompletedSteps((prev) => Array.from(new Set([...prev, currentStep])));
      setCurrentStep(next);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setCompletedSteps([1]);
    setSelectedRegion(mockRegions[0]);
    setSelectedDate("26 August 2026");
    setDateType("today");
  };

  return (
    <FlowContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        dateType,
        setDateType,
        regions,
        selectedRegion,
        setSelectedRegion,
        currentStep,
        setCurrentStep: goToStep,
        nextStep,
        prevStep,
        completedSteps,
        resetFlow,
        chlorophyllData,
        anomalyData,
        aiPredictionData,
        futureTrendData,
        hotspotData,
        alertData,
        isLoadingAnalysis
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => useContext(FlowContext);

