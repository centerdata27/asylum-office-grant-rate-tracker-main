"use client"

import { useAppContext } from "@/context/AppContext"

export const Loading = () => {
  const { isDataLoading } = useAppContext()

  if (!isDataLoading) return null

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-40 text-6xl text-amber-50 w-full h-full flex justify-center items-center z-50">
      <div className="bg-amber-900 text-6xl text-amber-50 p-5 rounded-2xl">
        Loading Data...
      </div>
    </div>
  )
}
