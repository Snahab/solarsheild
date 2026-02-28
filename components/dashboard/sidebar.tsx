"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Calculator,
  FileText,
  TrendingUp,
  Activity,
  Home,
  Leaf,
  BookOpen,
} from "lucide-react"

const navItems = [
  { icon: Calculator, label: "Solar Planner", id: "planner" },
  { icon: FileText, label: "Savings Breakdown", id: "savings" },
  { icon: TrendingUp, label: "25-Year Projection", id: "projection" },

  // ✅ NEW SECTIONS
  { icon: Leaf, label: "Environmental Impact", id: "environment" },
  { icon: BookOpen, label: "Educational Section", id: "education" },

  { icon: Activity, label: "Performance Monitor", id: "performance" },
]

interface SidebarProps {
  activeTab: string
  onTabChange: (id: string) => void
}

export function DashboardSidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="hidden flex-shrink-0 border-r border-[#1A3A60] bg-[#0B1F3B] lg:flex lg:flex-col w-64">

      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[#1A3A60] px-5">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/solarshield_logo.png"
            alt="SolarShield Logo"
            width={120}
            height={40}
            className="h-12 w-auto"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-[#6B8AB5]">
          Dashboard
        </p>

        <ul className="flex flex-col gap-1">

          {navItems.map((item) => {

            const isActive = activeTab === item.id

            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#F4B400]/10 text-[#F4B400]"
                      : "text-[#8BA3C2] hover:bg-[#132D54] hover:text-[#B8C9DE]"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            )
          })}

        </ul>

      </nav>

      {/* Back to Home */}
      <div className="border-t border-[#1A3A60] px-3 py-4">

        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#6B8AB5] transition-colors hover:bg-[#132D54] hover:text-[#B8C9DE]"
        >
          <Home className="h-5 w-5" />
          Back to Home
        </Link>

      </div>

    </aside>
  )
}