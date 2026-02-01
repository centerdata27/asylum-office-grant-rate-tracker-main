import { ScatterPlot } from '../../common/ScatterPlotMap.jsx';
import { HeatMap } from '../../common/HeatMap.jsx';
import { ChoroplethMap } from '../../common/ChoroplethMap.jsx';

export const mapTypes = {
  ScatterPlot: 'SCATTER-PLOT',
  HeatMap: 'HEAT-MAP',
  ChoroplethMap: 'CHOROPLETH-MAP',
};

export const getMapView = mapView => {
  switch (mapView) {
    case mapTypes.ScatterPlot: {
      return <ScatterPlot />;
    }
    case mapTypes.HeatMap: {
      return <HeatMap />;
    }
    case mapTypes.ChoroplethMap: {
      return <ChoroplethMap />;
    }
    default: {
      throw new Error(`Unhandled map type: mapView: ${mapView}`);
    }
  }
};
