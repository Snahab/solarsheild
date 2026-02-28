"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import SolarPlanner from "@/components/dashboard/solar-planner"
import SavingsBreakdown from "@/components/dashboard/savings-breakdown"
import { Projection } from "@/components/dashboard/projection"
import EnvironmentalImpact from "@/components/dashboard/environment"
import Education from "@/components/dashboard/education"
import { PerformanceMonitor } from "@/components/dashboard/performance-monitor"
import AIChatbot from "@/components/dashboard/ai-chatbot"

export default function DashboardPage() {

  const [activeTab, setActiveTab] = useState("planner")

  // 🔥 GLOBAL SOLAR DATA STATE
  const [solarData, setSolarData] = useState<any>(null)

  // 🔥 GLOBAL PLANNER INPUT STATE (NEW)
  const [plannerInputs, setPlannerInputs] = useState({
    bill: "",
    state: "",
    roofArea: ""
  })

  return (

    <div className="flex h-screen bg-[#F7F8FA]">

      {/* Sidebar */}
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Header */}
        <DashboardHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">

          <div className="mx-auto max-w-7xl">

            {activeTab === "planner" && (
              <SolarPlanner
                solarData={solarData}
                setSolarData={setSolarData}
                plannerInputs={plannerInputs}
                setPlannerInputs={setPlannerInputs}
              />
            )}

            {activeTab === "savings" && (
              <SavingsBreakdown solarData={solarData} />
            )}

            {activeTab === "projection" && (
              <Projection solarData={solarData} />
            )}

            {activeTab === "environment" && (
              <EnvironmentalImpact solarData={solarData} />
            )}

            {activeTab === "education" && (
              <Education />
            )}

            {activeTab === "performance" && (
              <PerformanceMonitor solarData={solarData} />
            )}

          </div>

        </main>

      </div>

      {/* Floating AI chatbot */}
      <AIChatbot solarData={solarData} />

    </div>

  )

}