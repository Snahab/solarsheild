"use client"

import { useMemo } from "react"
import { Zap, Landmark, TrendingDown, PiggyBank, Sparkles } from "lucide-react"

function formatCurrency(n: number = 0) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n)
}

export default function SavingsBreakdown({ solarData }: any) {

  if (!solarData) {
    return <div className="p-6">Run Solar Planner first.</div>
  }

  // ✅ SAFE CALCULATIONS (NO NaN)
  const financialData = useMemo(() => {

    const kw = Number(solarData.systemKW ?? 0)

    const systemCost = Math.round(kw * 55000)

    const centralSubsidy = Math.round(Math.min(kw, 3) * 18000)

    const stateSubsidy = Math.round(kw * 6000)

    const finalPrice =
      systemCost - centralSubsidy - stateSubsidy

    const yearlySavings =
      Number(solarData.totalSavings ?? 0) / 25

    const monthlySavings =
      yearlySavings / 12

    return {
      kw,
      systemCost,
      centralSubsidy,
      stateSubsidy,
      finalPrice,
      yearlySavings,
      monthlySavings
    }

  }, [solarData])

  return (
    <div className="w-full space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F3B]">
          Savings Breakdown
        </h2>
        <p className="text-sm text-[#5A7A9E]">
          Detailed financial analysis of your solar investment.
        </p>
      </div>

      {/* COST SECTION */}
      <div className="grid md:grid-cols-2 gap-6">

        <LargeCard
          icon={Zap}
          title={`Total System Cost (${financialData.kw} kW)`}
          value={formatCurrency(financialData.systemCost)}
          note="Estimated cost before subsidies."
          iconColor="text-[#3A6EA5]"
          bg="bg-[#3A6EA5]/10"
        />

        <LargeCard
          icon={Landmark}
          title="Central Government Subsidy"
          value={`− ${formatCurrency(financialData.centralSubsidy)}`}
          note="Under PM Surya Ghar Yojana."
          iconColor="text-[#22C55E]"
          bg="bg-[#22C55E]/10"
        />

        <LargeCard
          icon={TrendingDown}
          title="State Government Subsidy"
          value={`− ${formatCurrency(financialData.stateSubsidy)}`}
          note="Additional state-level support."
          iconColor="text-[#16A34A]"
          bg="bg-[#16A34A]/10"
        />

        <LargeCard
          icon={PiggyBank}
          title="Final Price You Pay"
          value={formatCurrency(financialData.finalPrice)}
          note="Your investment after subsidies."
          iconColor="text-[#F4B400]"
          bg="bg-[#F4B400]/10"
        />

      </div>

      {/* SAVINGS SECTION */}
      <div className="grid md:grid-cols-2 gap-6">

        <LargeCard
          icon={Zap}
          title="Monthly Savings"
          value={formatCurrency(financialData.monthlySavings)}
          note="Estimated savings per month."
          iconColor="text-[#10B981]"
          bg="bg-[#10B981]/10"
        />

        <LargeCard
          icon={Zap}
          title="Yearly Savings"
          value={formatCurrency(financialData.yearlySavings)}
          note="Estimated savings per year."
          iconColor="text-[#059669]"
          bg="bg-[#059669]/10"
        />

      </div>

      {/* AI FINANCIAL INSIGHT */}
      <div className="rounded-2xl border border-[#F4B400]/30 bg-[#F4B400]/5 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-[#F4B400]" />
          <h3 className="font-semibold text-[#0B1F3B]">
            AI Financial Insight
          </h3>
        </div>
        <p className="text-sm text-[#3A5A80] leading-relaxed">
          {solarData.savingsInsight}
        </p>
      </div>

    </div>
  )
}

function LargeCard({
  icon: Icon,
  title,
  value,
  note,
  iconColor,
  bg
}: any) {

  return (
    <div className="rounded-2xl border border-[#D1D9E6] bg-white p-7 shadow-sm">

      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>

      <p className="text-sm text-[#5A7A9E]">
        {title}
      </p>

      <p className="text-3xl font-bold text-[#0B1F3B] mt-1">
        {value}
      </p>

      <p className="text-xs text-[#8BA3C2] mt-2">
        {note}
      </p>

    </div>
  )
}