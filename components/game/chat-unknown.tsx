"use client"

import { useState, useEffect, useRef } from "react"
import { StatusBar } from "./status-bar"
import { ChevronLeft } from "lucide-react"

interface ChatUnknownProps {
  battery: number
  onBack: () => void
  hasSeenGallery: boolean
}

interface Message {
  id: number
  text: string
  sender: "them" | "system"
  delay: number
}

export function ChatUnknown({
  battery,
  onBack,
  hasSeenGallery,
}: ChatUnknownProps) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const messages: Message[] = hasSeenGallery
    ? [
        { id: 1, text: "Ты — призрак.", sender: "them", delay: 500 },
        { id: 2, text: "Батарея: 4%.", sender: "them", delay: 2000 },
        {
          id: 3,
          text: "Скажи Лике то, что я не успел.",
          sender: "them",
          delay: 4000,
        },
        {
          id: 4,
          text: "Тебе осталось мало времени. Торопись.",
          sender: "them",
          delay: 6500,
        },
        {
          id: 5,
          text: "Открой чат с Ликой. Она ждёт.",
          sender: "system",
          delay: 9000,
        },
      ]
    : [
        { id: 1, text: "Ты очнулся?", sender: "them", delay: 500 },
        {
          id: 2,
          text: "Проверь Галерею. Папка «Важные».",
          sender: "them",
          delay: 2500,
        },
        { id: 3, text: "Там ответы.", sender: "them", delay: 4500 },
      ]

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    for (const msg of messages) {
      const typingTimer = setTimeout(() => {
        setTyping(true)
      }, msg.delay - 800)
      timers.push(typingTimer)

      const msgTimer = setTimeout(() => {
        setTyping(false)
        setVisibleMessages((prev) => [...prev, msg.id])
      }, msg.delay)
      timers.push(msgTimer)
    }

    return () => {
      for (const t of timers) clearTimeout(t)
    }
  }, [hasSeenGallery])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [visibleMessages, typing])

  return (
    <div className="flex h-full flex-col bg-black">
      <StatusBar
        time="09:41"
        battery={battery}
        showBatteryWarning={battery <= 5}
      />

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[hsl(var(--accent))]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700">
            <span className="text-sm text-white/60">?</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Неизвестный</p>
            <p className="text-[10px] text-green-400">в сети</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
        {messages
          .filter((m) => visibleMessages.includes(m.id))
          .map((msg) => (
            <div
              key={msg.id}
              className={`animate-slide-in-left ${
                msg.sender === "system" ? "self-center" : "self-start"
              }`}
            >
              {msg.sender === "system" ? (
                <div className="rounded-xl bg-white/5 px-4 py-2">
                  <p className="text-xs text-white/50">{msg.text}</p>
                </div>
              ) : (
                <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-2.5">
                  <p className="text-sm leading-relaxed text-white/90">{msg.text}</p>
                </div>
              )}
            </div>
          ))}

        {typing && (
          <div className="animate-fade-in self-start">
            <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white/10 px-4 py-3">
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-white/40"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-white/40"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-white/40"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
