"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import testData from "@/data/test_data.json"

interface YearData {
  office: string
  granted: number
  adminClosed: number
  denied: number
  closedNacaraGrant: number
  asylumTerminated: number
  totalCases: number
}

interface YearResult {
  fiscal_year: string
  granted: number
  adminClosed: number
  denied: number
  closedNacaraGrant: number
  asylumTerminated: number
  totalCases: number
  yearData: YearData[]
}

interface CitizenshipResult {
  citizenship: string
  granted: number
  adminClosed: number
  denied: number
  closedNacaraGrant: number
  asylumTerminated: number
  totalCases: number
}

interface GraphData {
  granted?: number
  adminClosed?: number
  denied?: number
  closedNacaraGrant?: number
  asylumTerminated?: number
  totalCases?: number
  yearResults?: YearResult[]
  citizenshipResults?: CitizenshipResult[]
}

interface AppContextType {
  graphData: GraphData
  setGraphData: (data: GraphData) => void
  isDataLoading: boolean
  updateQuery: () => void
  clearQuery: () => void
  getYears: () => number[]
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const url = "https://hrf-asylum-be-b.herokuapp.com/cases"

export function AppProvider({ children }: { children: ReactNode }) {
  const [graphData, setGraphData] = useState<GraphData>(testData)
  const [isDataLoading, setIsDataLoading] = useState(false)

  const getFiscalData = async () => {
    try {
      const res = await fetch(`${url}/fiscalSummary`)
      const data = await res.json()
      return data
    } catch (err) {
      console.error("Error fetching fiscal data:", err)
      throw err
    }
  }

  const getCitizenshipResults = async () => {
    try {
      const res = await fetch(`${url}/citizenshipSummary`)
      const data = await res.json()
      return data
    } catch (err) {
      console.error("Error fetching citizenship data:", err)
      throw err
    }
  }

  const updateQuery = () => {
    setIsDataLoading(true)
  }

  const fetchData = async () => {
    setIsDataLoading(true)
    try {
      const fiscalData = await getFiscalData()
      const citizenshipData = await getCitizenshipResults()
      const fullData = { ...fiscalData, citizenshipResults: citizenshipData }
      setGraphData(fullData)
      if (typeof window !== "undefined") {
        localStorage.setItem("myAppState", JSON.stringify(fullData))
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsDataLoading(false)
    }
  }

  const clearQuery = () => {
    setGraphData({})
  }

  const getYears = () =>
    graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? []

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("myAppState")
      if (storedState) {
        setGraphData(JSON.parse(storedState))
      }
    }
  }, [])

  useEffect(() => {
    if (isDataLoading) {
      fetchData()
    }
  }, [isDataLoading])

  return (
    <AppContext.Provider
      value={{
        graphData,
        setGraphData,
        isDataLoading,
        updateQuery,
        clearQuery,
        getYears,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
