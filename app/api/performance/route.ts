import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      systemKW = 0,
      yearlySavings = 0,
      netInvestment = 0,
      coverage = 0
    } = body

    const roi =
      netInvestment > 0
        ? ((yearlySavings * 25) / netInvestment) * 100
        : 0

    const performanceScore = Math.min(
      10,
      Math.round((roi / 50) + (coverage / 20))
    )

    return NextResponse.json({
      roiPercent: Number(roi.toFixed(1)),
      performanceScore,
      status:
        performanceScore >= 8
          ? "Excellent"
          : performanceScore >= 5
          ? "Good"
          : "Average",
    })

  } catch (error) {
    console.error("API PERFORMANCE ERROR:", error)

    return NextResponse.json(
      { error: "Performance calculation failed" },
      { status: 500 }
    )
  }
}