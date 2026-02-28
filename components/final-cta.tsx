import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[#0B1F3B] py-24 md:py-32">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F4B400]/6 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[200px] w-[400px] rounded-full bg-[#3A6EA5]/8 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#F7F8FA] md:text-5xl text-balance">
          Ready to Power Your Home with Solar?
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#8BA3C2] md:text-lg">
          Join thousands of homeowners who have already made the switch to clean,
          affordable energy with SolarShield.
        </p>

        <div className="mt-10">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#F4B400] px-8 py-4 text-base font-semibold text-[#0B1F3B] shadow-lg shadow-[#F4B400]/20 transition-all hover:bg-[#D4A017] hover:shadow-xl hover:shadow-[#F4B400]/30 md:text-lg"
          >
            Start Solar Planning
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <p className="mt-6 text-xs text-[#6B8AB5]">
          No credit card required. Get your personalized solar report in 2 minutes.
        </p>
      </div>
    </section>
  )
}
