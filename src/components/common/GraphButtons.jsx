import { useAppContext } from '../../context/AppContext.jsx';
import { mapTypes } from '../pages/DataVisualizations/getMapView.jsx';

const { ScatterPlot, ChoroplethMap, HeatMap } = mapTypes;

export const GraphButtons = ({ mapView, setMapView }) => {
  const { updateQuery, clearQuery } = useAppContext();

  return (
    <section className='data-buttons flex-c justify-center gap-6'>
      <section className='plot-buttons flex-c gap-1'>
        <button className='scatter-plot bg-white p-1 text-black border-2' disabled={mapView === ScatterPlot} onClick={() => setMapView(ScatterPlot)}>
          Time Series
        </button>
        <button className='heat-map bg-white p-1 text-black border-2' disabled={mapView === HeatMap} onClick={() => setMapView(HeatMap)}>
          USCIS Asylum Offices Heat Map
        </button>
        <button className='choropleth-map bg-white p-1 text-black border-2' disabled={mapView === ChoroplethMap} onClick={() => setMapView(ChoroplethMap)}>
          Citizenship of Asylum Seeker
        </button>
      </section>

      <section className='query-buttons flex-c gap-1'>
        <button className='update-query primary-c text-amber-50' onClick={updateQuery}>
          Update Query
        </button>
        <button className='clear-query primary-c text-amber-50' onClick={clearQuery}>
          Clear Query
        </button>
      </section>
    </section>
  );
};
