"use client"

import { useState, useEffect } from "react"
import {
  Calculator,
  Zap,
  TrendingUp,
  Landmark,
  Sparkles,
  Sun,
} from "lucide-react"

const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
  "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Chandigarh",
]

function formatCurrency(n: number = 0): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n)
}

export default function SolarPlanner({
  solarData,
  setSolarData,
  plannerInputs,
  setPlannerInputs
}: any) {

  const [loading, setLoading] = useState(false)

  async function handleCalculate() {

    if (!plannerInputs.bill || !plannerInputs.roofArea || !plannerInputs.state)
      return

    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bill: Number(plannerInputs.bill),
          roof: Number(plannerInputs.roofArea),
          state: plannerInputs.state,
        }),
      })

      const data = await res.json()

      let correctedPayback = data.payback

      if (data.netInvestment && data.yearlySavings) {
        correctedPayback = (
          data.netInvestment / data.yearlySavings
        ).toFixed(1)
      }

      setSolarData({
        ...data,
        payback: correctedPayback ?? 0,
        systemKW: data.systemKW ?? 0,
        netInvestment: data.netInvestment ?? 0,
        totalSavings: data.totalSavings ?? 0,
        coverage: data.coverage ?? 0,
        aiInsight:
          data.aiInsight ||
          "Solar reduces long‑term electricity costs and increases energy independence.",
      })

    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-8">

      {loading && <FullScreenLoader />}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F3B]">
          Welcome to SolarShield
        </h2>
        <p className="mt-1 text-sm text-[#64748B]">
          Enter your details to generate your AI solar plan.
        </p>
      </div>

      {/* INPUT CARD */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4B400]/10">
            <Sun className="h-5 w-5 text-[#F4B400]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              Solar Planning Calculator
            </h3>
            <p className="text-xs text-gray-500">
              Smart estimation based on your inputs
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <input
            type="number"
            placeholder="Monthly Bill ₹"
            value={plannerInputs.bill}
            onChange={(e)=>
              setPlannerInputs({
                ...plannerInputs,
                bill: e.target.value
              })
            }
            className="h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
          />

          <select
            value={plannerInputs.state}
            onChange={(e)=>
              setPlannerInputs({
                ...plannerInputs,
                state: e.target.value
              })
            }
            className="h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
          >
            <option value="">Select state</option>
            {indianStates.map((s)=>(
              <option key={s}>{s}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Roof area sq ft"
            value={plannerInputs.roofArea}
            onChange={(e)=>
              setPlannerInputs({
                ...plannerInputs,
                roofArea: e.target.value
              })
            }
            className="h-11 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#F4B400]"
          />

        </div>

        <button
          onClick={handleCalculate}
          disabled={loading}
          className="mt-6 rounded-xl bg-[#F4B400] px-6 py-3 font-semibold text-[#0B1F3B] hover:opacity-90 transition"
        >
          {loading ? "Generating Plan..." : "Calculate My Solar Plan"}
        </button>

      </div>

      {/* RESULTS */}
      {solarData && (
        <div className="flex flex-col gap-6">

          <div className="grid gap-4 lg:grid-cols-3">

            <ResultCard
              icon={Calculator}
              label="System Size"
              value={`${solarData.systemKW ?? 0} kW`}
              bg="bg-blue-100"
              color="text-blue-600"
            />

            <ResultCard
              icon={Landmark}
              label="Net Investment"
              value={formatCurrency(solarData.netInvestment ?? 0)}
              bg="bg-purple-100"
              color="text-purple-600"
            />

            <ResultCard
              icon={Zap}
              label="Payback"
              value={`${solarData.payback ?? 0} yrs`}
              bg="bg-yellow-100"
              color="text-yellow-600"
            />

          </div>

          <div className="grid gap-4 lg:grid-cols-2">

            <ResultCard
              icon={TrendingUp}
              label="25-Year Savings"
              value={formatCurrency(solarData.totalSavings ?? 0)}
              bg="bg-green-100"
              color="text-green-600"
            />

            <ResultCard
              icon={TrendingUp}
              label="Electricity Covered"
              value={`${solarData.coverage ?? 0}%`}
              bg="bg-emerald-100"
              color="text-emerald-600"
            />

          </div>

          {/* SIMPLE AI SUMMARY */}
          <div className="rounded-xl border border-[#F4B400]/30 bg-[#F4B400]/5 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-[#F4B400]"/>
              <h4 className="font-semibold text-sm text-[#0B1F3B]">
                AI Insight
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              {solarData.plannerInsight}
            </p>
          </div>

        </div>
      )}

    </div>
  )
}

/* RESULT CARD */
function ResultCard({
  icon: Icon,
  label,
  value,
  bg,
  color
}: any) {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">

      <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-[#0B1F3B]">
        {value}
      </p>

    </div>
  )
}

/* FULL SCREEN LOADER */
function FullScreenLoader() {

  const messages = [
    "Analyzing usage...",
    "Optimizing system size...",
    "Calculating savings...",
    "Generating AI insight...",
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1F3B]/95 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-[#F4B400] border-t-transparent mb-6"></div>
      <p className="text-white text-sm">
        {messages[index]}
      </p>
    </div>
  )
}