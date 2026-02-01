import { useEffect } from 'react';

export const useLocalStorage = ({ graphData, setGraphData }) => {
  useEffect(() => {
    // Retrieve state from local storage on mount
    const storedState = localStorage.getItem('myAppState');
    if (storedState) {
      setGraphData(JSON.parse(storedState));
    }
  }, []);

  useEffect(() => {
    // Store state in local storage on every state change
    localStorage.setItem('myAppState', JSON.stringify(graphData));
  }, [graphData]);
};
