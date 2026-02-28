import Image from "next/image"
import { Receipt, Sun, TrendingUp } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Receipt,
    title: "Enter Your Monthly Electricity Bill",
    description:
      "Share your average monthly electricity bill and basic location details. It takes less than 30 seconds.",
    image: "/images/image1.png",
  },
  {
    step: "02",
    icon: Sun,
    title: "Get Recommended Solar System Size",
    description:
      "Our intelligent algorithm calculates the optimal solar system size tailored to your consumption patterns.",
    image: "/images/image2.png",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "See Your Long-Term Savings & Payback",
    description:
      "Get a detailed financial projection including subsidies, payback period, and 25-year savings estimate.",
    image: "/images/image3.png",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F7F8FA] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#3A6EA5]">
            Simple Process
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0B1F3B] md:text-4xl text-balance">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#5A7A9E]">
            Three simple steps to understand your solar potential and start
            saving on electricity.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="group relative overflow-hidden rounded-2xl border border-[#D1D9E6] bg-[#FFFFFF] p-8 shadow-sm transition-all hover:border-[#F4B400]/40 hover:shadow-lg hover:shadow-[#F4B400]/5"
            >
              {/* Background image at 40% opacity */}
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover opacity-40 pointer-events-none"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Gradient overlay from bottom ~60% */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, #0B1F3B 0%, #0B1F3Bcc 30%, #0B1F3B99 50%, transparent 60%)",
                }}
              />

              {/* Content */}
              <span className="relative text-5xl font-extrabold text-[#F4B400]/30 transition-colors group-hover:text-[#F4B400]/50">
                {item.step}
              </span>

              <div className="relative mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4B400] text-[#0B1F3B]">
                <item.icon className="h-6 w-6" />
              </div>

              <h3 className="relative mt-5 text-lg font-semibold text-[#FFFFFF]">
                {item.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-[#B8C9DE]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
