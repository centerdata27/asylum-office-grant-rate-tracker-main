import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import testData from '../data/test_data.json';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

const url = 'https://hrf-asylum-be-b.herokuapp.com/cases'

/**
 * Ticket 2 - API integration (class notes)
 *
 * What this file does:
 * - Acts as the global data provider for the app (React Context).
 * - Uses `axios` to fetch two endpoints from the backend API:
 *     GET /fiscalSummary        --> fiscal year results used for time series and heatmap
 *     GET /citizenshipSummary   --> citizenship results used for choropleth map
 * - Merges the responses into a `graphData` object and exposes it to components.
 * - Exposed helpers:
 *     - `updateQuery()` triggers a reload of API data (used by the Update Query button)
 *     - `clearQuery()` clears results
 *     - `getYears()` returns the array of fiscal years for plotting x-axis values
 *
 * Talking points for class:
 * - Explain Context: central place to keep app data and helper functions.
 * - Show how components read `graphData` (Choropleth, HeatMap, ScatterPlot).
 * - Demonstrate how the app falls back to `test_data.json` when API is not available.
 */
const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState(testData);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useLocalStorage({ graphData, setGraphData });

  const getFiscalData = async () => {
    try {
        // Ticket 2: API call for fiscal year summary
        // This endpoint returns yearResults used by the time-series and heatmap.
        const res = await axios.get(`${url}/fiscalSummary`);
        console.log('FiscalData... ', res);
        return res.data;
    } catch (err) {
      console.error('Error fetching fiscal data:', err);
      throw err;
    }
  };
  
  const getCitizenshipResults = async () => {
    try {
        // Ticket 2: API call for citizenship summary
        // This endpoint returns citizenshipResults used by the choropleth map.
        const res = await axios.get(`${url}/citizenshipSummary`);
        console.log('CitizenshipResults.... ', res);
        return res.data;
    } catch (err) {
      console.error('Error fetching citizenship data:', err);
      throw err;
    }
  };

  const updateQuery = async () => {
    setIsDataLoading(true);
  };

  const fetchData = async () => {
    // Ticket 2: Orchestrator that fetches both API endpoints and sets global graphData
    setIsDataLoading(true);
    try {
      const fiscalData = await getFiscalData();
      const citizenshipData = await getCitizenshipResults();
      console.log('this should happen after')
      const fullData = { ...fiscalData, citizenshipResults: citizenshipData };
      setGraphData(fullData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  // Automatically fetch data on mount so the graphs populate without manual update
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ticket 2: getYears helper — used by charts to render x-axis values

  const clearQuery = () => {
    setGraphData({});
  };

  const getYears = () => graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  useEffect(() => {
    if (isDataLoading) {
      fetchData();
    }
  }, [isDataLoading]);

  return {
    graphData,
    setGraphData,
    isDataLoading,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
