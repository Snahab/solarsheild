"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, User, Calculator, FileText, TrendingUp, Activity, Home } from "lucide-react"

const navItems = [
  { icon: Calculator, label: "Solar Planner", id: "planner" },
  { icon: FileText, label: "Savings Breakdown", id: "savings" },
  { icon: TrendingUp, label: "25-Year Projection", id: "projection" },
  { icon: Activity, label: "Performance Monitor", id: "performance" },
]

interface HeaderProps {
  activeTab: string
  onTabChange: (id: string) => void
}

export function DashboardHeader({ activeTab, onTabChange }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#D1D9E6] bg-[#FFFFFF] px-4 lg:px-8">
      {/* Mobile: Logo + Menu */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-[#0B1F3B]"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <Link href="/" aria-label="Back to home">
          <Image
            src="/images/solarshield_logo.png"
            alt="SolarShield Logo"
            height={80}
            width={200}
            className="h-24 w-auto"
          />
        </Link>
      </div>

      {/* Desktop: Page title */}
      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold text-[#0B1F3B]">Solar Dashboard</h1>
      </div>

      {/* User profile */}
      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-medium text-[#5A7A9E] sm:block">Welcome back</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1F3B] text-[#F4B400]">
          <User className="h-5 w-5" />
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-[#0B1F3B]/95 backdrop-blur-sm lg:hidden">
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id)
                    setMobileOpen(false)
                  }}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                    ? "bg-[#F4B400]/10 text-[#F4B400]"
                    : "text-[#8BA3C2] hover:bg-[#132D54]"
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              )
            })}
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#6B8AB5] hover:bg-[#132D54]"
              onClick={() => setMobileOpen(false)}
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
