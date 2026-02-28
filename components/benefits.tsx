import { BadgeIndianRupee, CalendarCheck, Landmark } from "lucide-react"

const metrics = [
  {
    icon: Landmark,
    value: "Gov. Subsidy",
    label: "Support",
    description:
      "Access central and state government subsidies that can cover up to 40% of your solar installation cost.",
  },
  {
    icon: CalendarCheck,
    value: "3-5 Years",
    label: "Payback Period",
    description:
      "Typical payback period for residential solar systems, after which your electricity is essentially free.",
  },
  {
    icon: BadgeIndianRupee,
    value: "\u20B98L+",
    label: "25-Year Savings",
    description:
      "Potential long-term savings over the lifetime of your solar panels, factoring in rising electricity costs.",
  },
]

export function Benefits() {
  return (
    <section id="benefits" className="bg-[#0B1F3B] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F4B400]">
            Financial Impact
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#F7F8FA] md:text-4xl text-balance">
            See How Solar Becomes an Investment
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#8BA3C2]">
            Solar is not just about saving the planet. It is a smart financial
            decision that pays for itself.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl border border-[#1A3A60] bg-[#0F2A4A] p-8 text-center transition-all hover:border-[#F4B400]/30 hover:bg-[#132D54]"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B400]/10 text-[#F4B400]">
                <item.icon className="h-7 w-7" />
              </div>

              <p className="mt-6 text-3xl font-bold text-[#F4B400] md:text-4xl">
                {item.value}
              </p>
              <p className="mt-1 text-sm font-medium text-[#B8C9DE]">
                {item.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#6B8AB5]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
