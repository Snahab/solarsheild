"use client"

import { BookOpen, Landmark, TrendingUp, Sun, IndianRupee } from "lucide-react"

export default function Education() {

  return (

    <div className="flex flex-col gap-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#0B1F3B]">
          Learn About Solar
        </h2>

        <p className="text-sm text-[#5A7A9E]">
          Understand how solar works, government subsidies, and your long‑term benefits.
        </p>
      </div>


      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


        {/* What is solar */}
        <Card
          icon={Sun}
          title="What is a Solar System?"
          text="Solar panels convert sunlight into electricity, reducing your dependence on grid power and lowering electricity bills."
          color="text-yellow-600"
          bg="bg-yellow-100"
        />


        {/* Subsidy */}
        <Card
          icon={Landmark}
          title="Government Subsidy"
          text="Under PM Surya Ghar Yojana, homeowners receive subsidies up to ₹78,000, reducing the installation cost significantly."
          color="text-green-600"
          bg="bg-green-100"
        />


        {/* Savings */}
        <Card
          icon={IndianRupee}
          title="How You Save Money"
          text="Solar systems generate free electricity for 25+ years, helping you avoid rising electricity costs."
          color="text-blue-600"
          bg="bg-blue-100"
        />


        {/* ROI */}
        <Card
          icon={TrendingUp}
          title="Return on Investment"
          text="Most systems recover their cost in 3–5 years and provide decades of additional savings."
          color="text-purple-600"
          bg="bg-purple-100"
        />


        {/* Lifetime */}
        <Card
          icon={BookOpen}
          title="System Lifetime"
          text="Solar panels typically last 25–30 years with minimal maintenance and consistent performance."
          color="text-orange-600"
          bg="bg-orange-100"
        />


        {/* Next steps */}
        <Card
          icon={Sun}
          title="Next Steps"
          text="After planning, you can apply for subsidies, choose an installer, and begin generating clean energy."
          color="text-emerald-600"
          bg="bg-emerald-100"
        />


      </div>


      {/* Bottom info */}
      <div className="rounded-2xl border border-[#F4B400]/30 bg-[#F4B400]/5 p-6">

        <h3 className="font-semibold text-[#0B1F3B] mb-2">
          Why SolarShield helps you
        </h3>

        <p className="text-sm text-[#3A5A80]">
          SolarShield uses AI and real data to estimate your savings, environmental impact,
          and financial returns so you can confidently switch to solar energy.
        </p>

      </div>


    </div>

  )

}



function Card({
  icon: Icon,
  title,
  text,
  color,
  bg,
}: any) {

  return (

    <div className="rounded-2xl border border-[#D1D9E6] bg-white p-6 shadow-sm">

      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>

      <p className="text-sm font-semibold text-[#0B1F3B]">
        {title}
      </p>

      <p className="text-xs text-[#5A7A9E] mt-2 leading-relaxed">
        {text}
      </p>

    </div>

  )

}