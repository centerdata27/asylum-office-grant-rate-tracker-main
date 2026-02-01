import React from 'react';
import { useAppContext } from '../context/AppContext.jsx';

export const useDownloadData = () => {
  const { graphData } = useAppContext();

  const filename = 'asylum_data.csv';

  function downloadJson() {
    const dataStr = JSON.stringify(graphData, null, 2); // Convert to string, formatted
    const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  }

  const flattenObject = (obj, prefix = '') => {
    if (obj) {
      return Object.keys(obj).reduce((acc, key) => {
        const pre = prefix.length ? `${prefix}.` : '';

        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          Object.assign(acc, flattenObject(obj[key], `${pre}${key}`));
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((item, index) => {
            Object.assign(acc, flattenObject(item, `${pre}${key}[${index}]`));
          });
        } else {
          acc[`${pre}${key}`] = obj[key];
        }

        return acc;
      }, {});
    }
  };

  function downloadCSV() {
    const flattenData = flattenObject(graphData);
    const csvRows = [];
    const headers = Object.keys(flattenData);
    csvRows.push(headers.join(',')); // Add headers

    const row = headers.map(header => JSON.stringify(flattenData[header], (key, value) => (value === null ? '' : value))).join(',');
    csvRows.push(row); // Add the data row

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return { downloadCSV };
};
