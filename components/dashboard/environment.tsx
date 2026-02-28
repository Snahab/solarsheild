"use client"

import { useMemo } from "react"
import { Leaf, TreePine, Cloud, Globe, Car, Droplets, Flame } from "lucide-react"

function formatNumber(n: number = 0) {
  return new Intl.NumberFormat("en-IN").format(Math.round(n))
}

export default function EnvironmentalImpact({ solarData }: any) {

  if (!solarData) {
    return (
      <div className="p-6 text-[#5A7A9E]">
        Generate a solar plan first.
      </div>
    )
  }

  /* ===============================
     SAFE ENVIRONMENTAL CALCULATIONS
  =============================== */

  const impact = useMemo(() => {

    const yearlyCO2 = Number(solarData.yearlyCO2 ?? 0)
    const lifetimeCO2 = Number(solarData.lifetimeCO2 ?? 0)

    // 🌳 1 tree absorbs approx 21kg CO2 per year
    const treesEquivalent = yearlyCO2 / 21

    // 🚗 1 car emits approx 4.6 tons CO2 per year (4600 kg)
    const carsOffRoad = yearlyCO2 / 4600

    // 🔥 1 ton coal emits ~2.4 tons CO2
    const coalSavedTons = lifetimeCO2 / 2400

    // 💧 Thermal power uses ~2 liters per kWh
    const estimatedKwh = yearlyCO2 / 0.82
    const waterSavedLiters = estimatedKwh * 2

    const sustainabilityScore =
      yearlyCO2 > 5000 ? 9 :
      yearlyCO2 > 3000 ? 8 :
      yearlyCO2 > 1500 ? 7 :
      yearlyCO2 > 800 ? 6 :
      5

    return {
      yearlyCO2,
      lifetimeCO2,
      treesEquivalent,
      carsOffRoad,
      coalSavedTons,
      waterSavedLiters,
      estimatedKwh,
      sustainabilityScore
    }

  }, [solarData])

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F3B]">
          Environmental Impact
        </h2>
        <p className="text-sm text-[#5A7A9E]">
          Your solar system contributes to a cleaner and more sustainable future.
        </p>
      </div>

      {/* Top Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <Card
          icon={Leaf}
          title="CO₂ Saved per Year"
          value={`${formatNumber(impact.yearlyCO2)} kg`}
          note="Annual carbon emission reduction."
          color="text-green-600"
          bg="bg-green-100"
        />

        <Card
          icon={Cloud}
          title="Lifetime CO₂ Reduction"
          value={`${formatNumber(impact.lifetimeCO2)} kg`}
          note="Total reduction over 25 years."
          color="text-blue-600"
          bg="bg-blue-100"
        />

        <Card
          icon={TreePine}
          title="Equivalent Trees Planted"
          value={`${formatNumber(impact.treesEquivalent)}`}
          note="Environmental absorption equivalent."
          color="text-emerald-600"
          bg="bg-emerald-100"
        />

        <Card
          icon={Globe}
          title="Clean Energy Generated"
          value={`${formatNumber(impact.estimatedKwh)} kWh`}
          note="Estimated clean electricity per year."
          color="text-yellow-600"
          bg="bg-yellow-100"
        />

      </div>

      {/* Second Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <Card
          icon={Car}
          title="Vehicles Removed from Road"
          value={`${formatNumber(impact.carsOffRoad)}`}
          note="Equivalent cars offset annually."
          color="text-purple-600"
          bg="bg-purple-100"
        />

        <Card
          icon={Flame}
          title="Coal Consumption Avoided"
          value={`${formatNumber(impact.coalSavedTons)} tons`}
          note="Coal avoided over 25 years."
          color="text-orange-600"
          bg="bg-orange-100"
        />

        <Card
          icon={Droplets}
          title="Water Conserved"
          value={`${formatNumber(impact.waterSavedLiters)} liters`}
          note="Water saved from thermal power generation."
          color="text-cyan-600"
          bg="bg-cyan-100"
        />

      </div>

      {/* Sustainability Section */}
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">

        <h3 className="font-semibold text-[#0B1F3B] mb-2">
          Sustainability Intelligence
        </h3>

        <p className="text-sm text-[#3A5A80]">
          Installing this system significantly reduces carbon emissions,
          fossil fuel dependency, and water consumption from conventional power plants.
        </p>

        <div className="mt-4">
          <p className="text-xs text-[#5A7A9E]">
            Sustainability Score
          </p>
          <p className="text-xl font-bold text-green-700">
            {impact.sustainabilityScore} / 10
          </p>
        </div>

      </div>

    </div>
  )
}

function Card({
  icon: Icon,
  title,
  value,
  note,
  color,
  bg,
}: any) {

  return (
    <div className="rounded-2xl border border-[#D1D9E6] bg-white p-6 shadow-sm">

      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>

      <p className="text-sm text-[#5A7A9E]">
        {title}
      </p>

      <p className="text-2xl font-bold text-[#0B1F3B] mt-1">
        {value}
      </p>

      <p className="text-xs text-[#8BA3C2] mt-2">
        {note}
      </p>

    </div>
  )
}