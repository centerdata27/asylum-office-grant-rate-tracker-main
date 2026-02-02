"use client"

import { useState } from "react"
import PageWrapper from "@/components/layout/PageWrapper"
import { GraphButtons } from "@/components/common/GraphButtons"
import { Loading } from "@/components/common/Loading"
import { ScatterPlot } from "@/components/charts/ScatterPlot"
import { HeatMap } from "@/components/charts/HeatMap"
import { ChoroplethMap } from "@/components/charts/ChoroplethMap"

export const mapTypes = {
  ScatterPlot: "SCATTER-PLOT",
  HeatMap: "HEAT-MAP",
  ChoroplethMap: "CHOROPLETH-MAP",
} as const

export type MapType = (typeof mapTypes)[keyof typeof mapTypes]

const getGraphsHeader = (mapView: MapType) => {
  let header = "Showing: "

  switch (mapView) {
    case mapTypes.ScatterPlot:
      header += "Times series data for all USCIS Asylum Offices"
      break
    case mapTypes.HeatMap:
      header += "Rates of 'granted' case decisions by asylum office, by year"
      break
    case mapTypes.ChoroplethMap:
      header +=
        "Rates of 'granted' case decisions by nationality of origin, for all offices"
      break
    default:
      throw new Error(`Unhandled map type: mapView: ${mapView}`)
  }

  return header
}

const getMapView = (mapView: MapType) => {
  switch (mapView) {
    case mapTypes.ScatterPlot:
      return <ScatterPlot />
    case mapTypes.HeatMap:
      return <HeatMap />
    case mapTypes.ChoroplethMap:
      return <ChoroplethMap />
    default:
      throw new Error(`Unhandled map type: mapView: ${mapView}`)
  }
}

export default function GraphsPage() {
  const [mapView, setMapView] = useState<MapType>(mapTypes.ScatterPlot)

  return (
    <PageWrapper>
      <div className="secondary-c py-8">
        <div className="plot-main flex w-[90%] max-w-[1200px] gap-10 mx-auto justify-center flex-wrap">
          <div className="plot-main flex-c flex-1 min-w-[700px]">
            <h1 className="py-5 text-xl">{getGraphsHeader(mapView)}</h1>
            <section className="maps">{getMapView(mapView)}</section>
          </div>
          <GraphButtons mapView={mapView} setMapView={setMapView} />
        </div>
        <Loading />
      </div>
    </PageWrapper>
  )
}
