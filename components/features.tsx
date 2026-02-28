import Image from "next/image"
import { Calculator, FileText, TrendingUp, Activity } from "lucide-react"

const features = [
  {
    icon: Calculator,
    title: "Smart Solar Savings Planner",
    image: "/images/solar-calculator.png",
    description:
      "Enter your electricity bill and get an AI-powered recommendation for the perfect solar system size, tailored to your consumption and location.",
  },
  {
    icon: FileText,
    title: "Subsidy & Financial Breakdown",
    image: "/images/subsidy.png",
    description:
      "Get a clear, itemized breakdown of all available government subsidies at the central and state level. Know exactly what you qualify for.",
  },
  {
    icon: TrendingUp,
    title: "25-Year ROI Projection",
    image: "/images/roi.png",
    description:
      "See a detailed financial projection including your payback period, cumulative savings, and return on investment over the full lifetime of your panels.",
  },
  {
    icon: Activity,
    title: "Performance Monitoring",
    image: "/images/performance.png",
    description:
      "Track your solar system's real-time energy generation, savings accumulation, and environmental impact with our comprehensive dashboard.",
  },
]

export function Features() {
  return (
    <section id="features" className="bg-[#F7F8FA] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#3A6EA5]">
            Platform Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0B1F3B] md:text-4xl">
            Everything You Need to Go Solar
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#5A7A9E]">
            Built for homeowners who want full clarity and control over their
            solar investment journey.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-[#D1D9E6] bg-white p-6 shadow-sm transition-all hover:border-[#F4B400]/40 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-40 w-full overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Icon */}
              <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4B400]/10 text-[#F4B400] transition-colors group-hover:bg-[#F4B400] group-hover:text-[#0B1F3B]">
                <item.icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-semibold text-[#0B1F3B]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-[#5A7A9E]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}