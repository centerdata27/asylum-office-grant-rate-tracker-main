import Plot from 'react-plotly.js';
import { useAppContext } from '../../context/AppContext.jsx';

export const ScatterPlot = () => {
  const { graphData, getYears } = useAppContext();

  const grantRates = graphData?.yearResults?.map(({ granted }) => granted) ?? [];

  return (
    <div className='flex-c align-middle min-h-[400px]'>
      <Plot
        data={[
          {
            x: getYears(),
            y: grantRates,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
          },
        ]}
        layout={{
          title: 'Asylum Grant Rate for All USCIS Asylum Offices Over Time',
          xaxis: { title: 'Fiscal Year' },
          yaxis: { title: 'Grant Rate (%)', range: [0, 100] },
          height: 500,
          width: 700,
          paper_bgcolor: '#f9f9f9',
        }}
      />
    </div>
  );
};
