import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return NextResponse.json(data)

  } catch (error) {
    console.error("API CHAT ERROR:", error)

    return NextResponse.json(
      { reply: "AI service unavailable." },
      { status: 500 }
    )
  }
}