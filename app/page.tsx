"use client"

import Image from "next/image"
import Link from "next/link"
import PageWrapper from "@/components/layout/PageWrapper"
import { useAppContext } from "@/context/AppContext"

export default function HomePage() {
  const { graphData } = useAppContext()

  const scrollToTop = () => {
    let scrollStep = -window.scrollY / 20
    const scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval)
      } else {
        window.scrollBy(0, scrollStep)
      }
    }, 10)
  }

  const downloadCSV = () => {
    const flattenObject = (obj: any, prefix = ""): Record<string, any> => {
      if (obj) {
        return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
          const pre = prefix.length ? `${prefix}.` : ""

          if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
            Object.assign(acc, flattenObject(obj[key], `${pre}${key}`))
          } else if (Array.isArray(obj[key])) {
            obj[key].forEach((item: any, index: number) => {
              Object.assign(acc, flattenObject(item, `${pre}${key}[${index}]`))
            })
          } else {
            acc[`${pre}${key}`] = obj[key]
          }

          return acc
        }, {})
      }
      return {}
    }

    const flattenData = flattenObject(graphData)
    const csvRows: string[] = []
    const headers = Object.keys(flattenData)
    csvRows.push(headers.join(","))

    const row = headers
      .map((header) =>
        JSON.stringify(flattenData[header], (_, value) =>
          value === null ? "" : value
        )
      )
      .join(",")
    csvRows.push(row)

    const csvString = csvRows.join("\n")
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.setAttribute("href", url)
    link.setAttribute("download", "asylum_data.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <PageWrapper>
      <div className="flex-c w-full secondary-c">
        <div className="bg-[#666555] pt-4 pb-8">
          <h1 className="text-6xl mb-8 text-white">
            Asylum Office Grant Rate Tracker
          </h1>
          <h3 className="text-white px-4">
            The Asylum Office Grant Rate Tracker provides asylum seekers,
            researchers, policymakers, and the public an interactive tool to
            explore USCIS data on Asylum Office decisions
          </h3>
        </div>

        <div className="flex justify-center m-14 gap-20 text-2xl flex-wrap">
          <div>
            <Image
              src="/images/bar-graph.png"
              alt="Bar graph visualization"
              width={500}
              height={300}
              className="flex-c gap-3 h-[300px] w-[500px] m-[20px] object-contain"
            />
            <h3>Search Grant Rates By Office</h3>
          </div>
          <div>
            <Image
              src="/images/pie-chart.png"
              alt="Pie chart visualization"
              width={400}
              height={300}
              className="flex-c gap-3 h-[300px] w-[400px] m-[20px] object-contain"
            />
            <h3>Search Grant Rates By Nationality</h3>
          </div>
          <div>
            <Image
              src="/images/line-graph.png"
              alt="Line graph visualization"
              width={500}
              height={300}
              className="flex-c gap-3 h-[300px] w-[500px] m-[20px] object-contain"
            />
            <h3>Search Grant Rates Over Time</h3>
          </div>
        </div>

        <div className="flex items-center mx-auto gap-8">
          <Link
            href="/graphs"
            className="bg-[#aaa] px-[10px] py-[5px] text-white text-md font-semibold"
          >
            View the Data
          </Link>
          <button
            onClick={downloadCSV}
            className="bg-[#aaa] px-[10px] py-[5px] text-white text-md font-semibold"
          >
            Download the Data
          </button>
        </div>

        <section className="middle-section flex flex-wrap">
          <div className="flex-1 min-w-[300px] content-center p-20">
            <Image
              src="/images/paper-stack.jpg"
              alt="Stack of papers"
              width={600}
              height={400}
              className="rounded-2xl h-auto w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-[300px] content-center p-20 text-left">
            <p className="text-xl">
              Human Rights First has created a search tool to give you a
              user-friendly way to explore a data set of asylum decisions
              between FY 2016 and May 2021 by the USCIS Asylum Office, which we
              received through a Freedom of Information Act request. You can
              search for information on asylum grant rates by year, nationality,
              and asylum office, visualize the data with charts and heat maps,
              and download the data set.
            </p>
          </div>
        </section>

        <h1 className="text-5xl mb-[50px]">Systemic Disparity Insights</h1>

        <div className="insights-section-details flex justify-center m-14 gap-20 text-1xl flex-wrap">
          <div className="flex-c-1 gap-12 min-w-[250px] max-w-[350px]">
            <div className="insights-details-header">
              <h3 className="text-4xl">36%</h3>
            </div>
            <div className="insights-details-content">
              <h3 className="text-lg">
                By the end of the Trump administration, the average asylum
                office grant rate had fallen 36% from an average of 44 percent
                in fiscal year 2016 to 28 percent in fiscal year 2020.
              </h3>
            </div>
          </div>
          <div className="flex-c-1 gap-12 min-w-[250px] max-w-[350px]">
            <div className="insights-details-header">
              <h3 className="text-4xl">5%</h3>
            </div>
            <div className="insights-details-content">
              <h3 className="text-lg">
                The New York asylum office grant rate dropped to 5 percent in
                fiscal year 2020.
              </h3>
            </div>
          </div>
          <div className="flex-c-1 gap-12 min-w-[250px] max-w-[350px]">
            <div className="insights-details-header">
              <h3 className="text-4xl">6x Lower</h3>
            </div>
            <div className="insights-details-content">
              <h3 className="text-lg">
                Between fiscal year 2017 and 2020, the New York asylum
                office&apos;s average grant rate was 6 times lower than the San
                Francisco asylum office.
              </h3>
            </div>
          </div>
        </div>

        <div className="read-more-butt-container mb-8">
          <Link
            href="https://humanrightsfirst.org/"
            target="_blank"
            className="primary-c text-white px-4 py-2"
          >
            Read More
          </Link>
        </div>

        <button className="p-[64px]" onClick={scrollToTop}>
          Back To Top ^
        </button>
      </div>
    </PageWrapper>
  )
}
