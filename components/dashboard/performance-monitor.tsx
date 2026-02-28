"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Zap, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

const indianStates = [
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Delhi",
  "Gujarat",
  "Rajasthan",
  "Uttar Pradesh",
  "Telangana",
  "Kerala",
  "West Bengal",
  "Punjab",
  "Haryana",
  "Madhya Pradesh",
]

function formatCurrency(n: number = 0) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n)
}

export function PerformanceMonitor() {
  const [systemKW, setSystemKW] = useState("")
  const [actualGeneration, setActualGeneration] = useState("")
  const [state, setState] = useState("")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function analyzePerformance() {
    if (!systemKW || !actualGeneration || !state) return

    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemKW: Number(systemKW),
          actualGeneration: Number(actualGeneration),
          state: state,
        }),
      })

      const result = await res.json()
      setData(result)
    } catch (err) {
      console.error("Performance API error:", err)
    }

    setLoading(false)
  }

  const expectedGeneration = data?.expectedGeneration ?? 0
  const performancePercent = data?.performancePercent ?? 0
  const monthlyLoss = Number(data?.monthlyLoss) || 0
  const status = data?.status ?? ""
  const aiInsight = data?.aiInsight ?? "System analyzed successfully."

  const chartData = [
    { name: "Expected", value: expectedGeneration },
    { name: "Actual", value: Number(actualGeneration) || 0 },
  ]

  function getStatusColor(status: string) {
    switch (status) {
      case "Excellent":
        return "text-green-600 bg-green-100"
      case "Normal":
        return "text-yellow-600 bg-yellow-100"
      case "Needs Inspection":
        return "text-orange-600 bg-orange-100"
      case "Critical":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F3B]">
          Performance Monitor
        </h2>
        <p className="text-sm text-[#5A7A9E]">
          AI-powered post-installation system intelligence.
        </p>
      </div>

      {/* Input Section */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm grid gap-4 md:grid-cols-3">

        <input
          type="number"
          placeholder="Installed System Size (kW)"
          value={systemKW}
          onChange={(e) => setSystemKW(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          placeholder="Actual Monthly Generation (kWh)"
          value={actualGeneration}
          onChange={(e) => setActualGeneration(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Select State</option>
          {indianStates.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

      </div>

      <button
        onClick={analyzePerformance}
        className="bg-[#F4B400] text-[#0B1F3B] px-6 py-3 rounded-xl font-semibold"
      >
        {loading ? "Analyzing..." : "Analyze Performance"}
      </button>

      {data && (
        <>
          {/* Stats Row */}
          <div className="grid gap-4 md:grid-cols-4">

            <StatCard
              icon={Zap}
              label="Expected Generation"
              value={`${expectedGeneration} kWh`}
            />

            <StatCard
              icon={TrendingUp}
              label="Performance"
              value={`${performancePercent}%`}
            />

            <StatCard
              icon={AlertTriangle}
              label="Monthly Financial Loss"
              value={formatCurrency(monthlyLoss)}
            />

            <div className={`rounded-2xl p-5 shadow-sm ${getStatusColor(status)}`}>
              <div className="flex items-center gap-2">
                {status === "Excellent" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertTriangle className="h-5 w-5" />
                )}
                <p className="font-semibold">{status || "N/A"}</p>
              </div>
            </div>

          </div>

          {/* Chart */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-[#0B1F3B]">
              Expected vs Actual Generation
            </h3>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#F4B400" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insight */}
          <div className="rounded-2xl border border-[#F4B400]/20 bg-[#F4B400]/5 p-6 shadow-sm">
            <h4 className="font-semibold text-[#0B1F3B] mb-2">
              AI Performance Insight
            </h4>
            <p className="text-sm text-[#3A5A80]">
              {aiInsight}
            </p>
          </div>
        </>
      )}

    </div>
  )
}

function StatCard({ icon: Icon, label, value }: any) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4B400]/10 text-[#F4B400]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-xs text-[#5A7A9E]">{label}</p>
      <p className="mt-1 text-xl font-bold text-[#0B1F3B]">{value}</p>
    </div>
  )
}