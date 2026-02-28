"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1F3B]/95 backdrop-blur-md border-b border-[#1A3A60]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 h-30 w-auto">
        <a href="#" className="flex items-center gap-2 -ml-10 mt-5" aria-label="SolarShield Home">
          <Image
            src="/images/solarshield_logo.png"
            alt="SolarShield Logo"
            width={120}
            height={120}
            className="h-40 w-auto"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="text-sm font-medium text-[#B8C9DE] transition-colors hover:text-[#F4B400]">
            How It Works
          </a>
          <a href="#benefits" className="text-sm font-medium text-[#B8C9DE] transition-colors hover:text-[#F4B400]">
            Benefits
          </a>
          <a href="#features" className="text-sm font-medium text-[#B8C9DE] transition-colors hover:text-[#F4B400]">
            Why SolarShield
          </a>
          <a
            href="#"
            className="rounded-xl border border-[#F4B400] px-5 py-2.5 text-sm font-semibold text-[#F4B400] transition-all hover:bg-[#F4B400]/10"
          >
            Login
          </a>
          <a
            href="#"
            className="rounded-xl border border-[#F4B400] px-5 py-2.5 text-sm font-semibold text-[#F4B400] transition-all hover:bg-[#F4B400]/10"
          >
            Register
          </a>
          <Link
            href="/dashboard"
            className="rounded-xl bg-[#F4B400] px-5 py-2.5 text-sm font-semibold text-[#0B1F3B] transition-all hover:bg-[#D4A017] hover:shadow-lg hover:shadow-[#F4B400]/20"
          >
            Start Solar Planning
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="text-[#B8C9DE] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {
        mobileOpen && (
          <div className="border-t border-[#1A3A60] bg-[#0B1F3B] px-6 py-6 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#how-it-works"
                className="text-sm font-medium text-[#B8C9DE] hover:text-[#F4B400]"
                onClick={() => setMobileOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#benefits"
                className="text-sm font-medium text-[#B8C9DE] hover:text-[#F4B400]"
                onClick={() => setMobileOpen(false)}
              >
                Benefits
              </a>
              <a
                href="#features"
                className="text-sm font-medium text-[#B8C9DE] hover:text-[#F4B400]"
                onClick={() => setMobileOpen(false)}
              >
                Why SolarShield
              </a>
              <a
                href="#"
                className="text-sm font-medium text-[#B8C9DE] hover:text-[#F4B400]"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </a>
              <a
                href="#"
                className="mt-2 rounded-xl border border-[#F4B400] px-5 py-2.5 text-center text-sm font-semibold text-[#F4B400] hover:bg-[#F4B400]/10"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </a>
              <Link
                href="/dashboard"
                className="rounded-xl bg-[#F4B400] px-5 py-2.5 text-center text-sm font-semibold text-[#0B1F3B] hover:bg-[#D4A017]"
                onClick={() => setMobileOpen(false)}
              >
                Start Solar Planning
              </Link>
            </div>
          </div>
        )
      }
    </header >
  )
}
