"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

export default function AIChatbot({ solarData }: any) {

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement | null>(null)

  // ✅ Auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function sendMessage() {

    if (!input.trim() || loading) return

    const currentInput = input

    const userMsg = {
      role: "user",
      text: currentInput,
    }

    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {

      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          solarData: solarData || {},
        }),
      })

      if (!res.ok) {
        throw new Error("Server error")
      }

      const data = await res.json()

      setMessages(prev => [
        ...prev,
        {
          role: "ai",
          text: data.reply || "No response from AI.",
        },
      ])

    } catch (error) {

      setMessages(prev => [
        ...prev,
        {
          role: "ai",
          text: "AI service unavailable. Please check backend.",
        },
      ])

    }

    setLoading(false)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-[#F4B400] text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
      >
        <MessageCircle />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-xl border flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b bg-[#F4B400] text-white">
            <span className="font-semibold">
              SolarShield AI Advisor
            </span>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50">

            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "text-right" : "text-left"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "inline-block bg-[#F4B400] text-white px-3 py-2 rounded-lg text-sm max-w-[75%]"
                      : "inline-block bg-white border px-3 py-2 rounded-lg text-sm max-w-[75%]"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-left">
                <div className="inline-block bg-white border px-3 py-2 rounded-lg text-sm">
                  Thinking...
                </div>
              </div>
            )}

            <div ref={bottomRef} />

          </div>

          {/* Input */}
          <div className="flex border-t bg-white">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 outline-none text-sm"
              placeholder="Ask about ROI, CO₂ savings, upgrades..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage()
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-4 text-[#F4B400] hover:scale-105 transition"
            >
              <Send size={18}/>
            </button>

          </div>

        </div>
      )}
    </>
  )
}