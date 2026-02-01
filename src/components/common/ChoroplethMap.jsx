import React from 'react';
import Plot from 'react-plotly.js';
import capitalizr from 'capitalizr';
import { useAppContext } from '../../context/AppContext.jsx';

export const ChoroplethMap = () => {
  const { graphData } = useAppContext();

  const citizenshipResults = graphData?.citizenshipResults ?? [];
  const locations = citizenshipResults.map(({ citizenship }) => citizenship);
  const z = citizenshipResults.map(({ granted }) => granted?.toFixed(2) ?? 0);
  const text = locations.map(l => l.toLowerCase()).map(l => l.split(' ').map(capitalizr).join(' '));

  return (
    <div className='flex-c align-middle'>
      <Plot
        data={[
          {
            type: 'choropleth',
            locationmode: 'country names',
            locations: locations,
            z: z,
            text: text,
            colorscale: [
              ['0.0', 'rgb(49,54,149)'],
              ['0.111111111111', 'rgb(69,117,180)'],
              ['0.222222222222', 'rgb(116,173,209)'],
              ['0.333333333333', 'rgb(171,217,233)'],
              ['0.444444444444', 'rgb(224,243,248)'],
              ['0.555555555556', 'rgb(254,224,144)'],
              ['0.666666666667', 'rgb(253,174,97)'],
              ['0.777777777778', 'rgb(244,109,67)'],
              ['0.888888888889', 'rgb(215,48,39)'],
              ['1.0', 'rgb(165,0,38)'],
            ],
            colorbar: {
              title: 'Grant %',
            },
          },
        ]}
        layout={{
          title: 'USCIS Asylum Office Grant Rates by Citizenship of Asylum Seeker',
          geo: {
            showlakes: true,
            lakecolor: 'rgb(127,205,225)',
          },
          height: 500,
          width: 700,
          text: 'capitalize',
          paper_bgcolor: '#f9f9f9',
        }}
      />
    </div>
  );
};
