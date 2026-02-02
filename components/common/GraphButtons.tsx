"use client"

import { useAppContext } from "@/context/AppContext"
import { mapTypes, MapType } from "@/app/graphs/page"

interface GraphButtonsProps {
  mapView: MapType
  setMapView: (view: MapType) => void
}

const { ScatterPlot, ChoroplethMap, HeatMap } = mapTypes

export const GraphButtons = ({ mapView, setMapView }: GraphButtonsProps) => {
  const { updateQuery, clearQuery } = useAppContext()

  return (
    <section className="data-buttons flex-c justify-center gap-6">
      <section className="plot-buttons flex-c gap-1">
        <button
          className="scatter-plot bg-white p-2 text-black border-2 disabled:opacity-50"
          disabled={mapView === ScatterPlot}
          onClick={() => setMapView(ScatterPlot)}
        >
          Time Series
        </button>
        <button
          className="heat-map bg-white p-2 text-black border-2 disabled:opacity-50"
          disabled={mapView === HeatMap}
          onClick={() => setMapView(HeatMap)}
        >
          USCIS Asylum Offices Heat Map
        </button>
        <button
          className="choropleth-map bg-white p-2 text-black border-2 disabled:opacity-50"
          disabled={mapView === ChoroplethMap}
          onClick={() => setMapView(ChoroplethMap)}
        >
          Citizenship of Asylum Seeker
        </button>
      </section>

      <section className="query-buttons flex-c gap-1">
        <button
          className="update-query primary-c text-amber-50 p-2"
          onClick={updateQuery}
        >
          Update Query
        </button>
        <button
          className="clear-query primary-c text-amber-50 p-2"
          onClick={clearQuery}
        >
          Clear Query
        </button>
      </section>
    </section>
  )
}
