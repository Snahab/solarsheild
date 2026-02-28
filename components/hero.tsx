import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B1F3B] pt-32 pb-24 md:pt-44 md:pb-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F4B400]/8 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-[#3A6EA5]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/20 bg-[#F4B400]/10 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#F4B400] animate-pulse" />
          <span className="text-xs font-medium text-[#F4B400]">
            AI-Powered Solar Intelligence
          </span>
        </div>

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#F7F8FA] md:text-6xl md:leading-tight text-balance">
          AI-Powered Solar Planning for Homeowners
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#8BA3C2] md:text-xl text-pretty">
          Maximize your savings with intelligent subsidy optimization, accurate ROI predictions, and personalized solar system recommendations -- all in minutes.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#F4B400] px-7 py-3.5 text-base font-semibold text-[#0B1F3B] shadow-lg shadow-[#F4B400]/20 transition-all hover:bg-[#D4A017] hover:shadow-xl hover:shadow-[#F4B400]/30"
          >
            Start Solar Planning
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#features"
            className="group inline-flex items-center gap-2 rounded-xl border border-[#3A6EA5]/40 px-7 py-3.5 text-base font-semibold text-[#B8C9DE] transition-all hover:border-[#3A6EA5] hover:bg-[#3A6EA5]/10"
          >
            <ChevronDown className="h-4 w-4" />
            Learn More
          </a>
        </div>

        {/* Trust metrics */}
        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-[#1A3A60] pt-10">
          <div>
            <p className="text-2xl font-bold text-[#F4B400] md:text-3xl">10K+</p>
            <p className="mt-1 text-xs text-[#6B8AB5] md:text-sm">Homeowners Served</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#F4B400] md:text-3xl">50MW</p>
            <p className="mt-1 text-xs text-[#6B8AB5] md:text-sm">Solar Capacity Planned</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#F4B400] md:text-3xl">98%</p>
            <p className="mt-1 text-xs text-[#6B8AB5] md:text-sm">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
