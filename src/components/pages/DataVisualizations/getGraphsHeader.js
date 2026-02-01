import { mapTypes } from './getMapView.jsx';

export const getGraphsHeader = mapView => {
  let header = 'Showing: ';

  switch (mapView) {
    case mapTypes.ScatterPlot: {
      header += 'Times series data for all USCIS Asylum Offices';
      break;
    }
    case mapTypes.HeatMap: {
      header += "Rates of 'granted' case decisions by asylum office, by year";
      break;
    }
    case mapTypes.ChoroplethMap: {
      header += "Rates of 'granted' case decisions by nationality of origin, for all offices";
      break;
    }
    default: {
      throw new Error(`Unhandled map type: mapView: ${mapView}`);
    }
  }

  return header;
};
