import { useState } from 'react';
import { getMapView, mapTypes } from './getMapView.jsx';
import { GraphButtons } from '../../common/GraphButtons.jsx';
import { Loading } from '../../common/Loading.jsx';
import { getGraphsHeader } from './getGraphsHeader.js';

export const GraphsPage = () => {
  const [mapView, setMapView] = useState(mapTypes.ScatterPlot);

  return (
    <div className='secondary-c'>
      <div className='plot-main flex w-[70%] gap-10 mx-auto justify-end'>
        <div className='plot-main flex-c'>
          <h1 className='py-5'>{getGraphsHeader(mapView)}</h1>
          <section className='maps'>{getMapView(mapView)}</section>
        </div>
        <GraphButtons mapView={mapView} setMapView={setMapView} />
      </div>
      <Loading />
    </div>
  );
};
