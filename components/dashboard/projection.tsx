"use client"

import { useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

function formatCurrency(n: number = 0) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n)
}

export function Projection({ solarData }: any) {

  if (!solarData) {
    return <div className="p-6">Run Solar Planner first.</div>
  }

  /* ===============================
     SAFE PROJECTION CALCULATION
  =============================== */

  const projectionData = useMemo(() => {

    const totalSavings = Number(solarData.totalSavings ?? 0)
    const investment = Number(solarData.netInvestment ?? 0)
    const yearlySavings = totalSavings / 25

    let cumulative = -investment
    const data = []

    for (let year = 0; year <= 25; year++) {
      if (year > 0) {
        cumulative += yearlySavings
      }

      data.push({
        year: `Yr ${year}`,
        value: Math.round(cumulative),
      })
    }

    return data

  }, [solarData])

  /* ===============================
     SMART PROFIT CLASSIFICATION
  =============================== */

  const smartIndicator = useMemo(() => {

    const totalSavings = Number(solarData.totalSavings ?? 0)
    const investment = Number(solarData.netInvestment ?? 0)
    const payback = Number(solarData.payback ?? 0)

    if (!investment || investment <= 0) {
      return {
        label: "Insufficient Data",
        color: "bg-gray-100 text-gray-600",
      }
    }

    const roiPercent = (totalSavings / investment) * 100

    if (roiPercent >= 250 && payback <= 5) {
      return {
        label: "Highly Profitable",
        color: "bg-green-100 text-green-700",
      }
    }

    if (roiPercent >= 150) {
      return {
        label: "Moderate Benefit",
        color: "bg-yellow-100 text-yellow-700",
      }
    }

    return {
      label: "Low Financial Return",
      color: "bg-red-100 text-red-700",
    }

  }, [solarData])

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F3B]">
          25-Year Wealth Projection
        </h2>
        <p className="text-sm text-[#5A7A9E]">
          Visual representation of cumulative savings over time.
        </p>
      </div>

      {/* GRAPH */}
      <div className="rounded-2xl border border-[#D1D9E6] bg-white p-6 shadow-sm">

        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={projectionData}>
            <defs>
              <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F4B400" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F4B400" stopOpacity={0.05}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
            <Tooltip formatter={(value:any) => formatCurrency(value)} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#F4B400"
              fillOpacity={1}
              fill="url(#colorSavings)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>

      </div>

      {/* SMART INDICATOR */}
      <div className="rounded-2xl border border-[#D1D9E6] bg-white p-6 shadow-sm space-y-4">

        <h3 className="text-lg font-semibold text-[#0B1F3B]">
          Smart Recommendation Indicator
        </h3>

        <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${smartIndicator.color}`}>
          {smartIndicator.label}
        </div>

        <p className="text-sm text-[#5A7A9E]">
          This classification is based on projected ROI and payback period,
          helping you quickly evaluate long‑term financial performance.
        </p>

      </div>

    </div>
  )
}