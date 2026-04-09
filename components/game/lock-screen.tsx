"use client"

import { useState, useEffect } from "react"
import { StatusBar } from "./status-bar"
import { ChevronUp } from "lucide-react"

interface LockScreenProps {
  onUnlock: () => void
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [swiping, setSwiping] = useState(false)

  useEffect(() => {
    const now = new Date()
    setTime(
      now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    )
    setDate(
      now.toLocaleDateString("ru-RU", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    )
  }, [])

  const handleUnlock = () => {
    setSwiping(true)
    setTimeout(onUnlock, 500)
  }

  return (
    <div
      className={`flex h-full flex-col bg-gradient-to-b from-[#1a1a2e] to-[#0a0a15] transition-transform duration-500 ${swiping ? "-translate-y-full" : ""}`}
    >
      <StatusBar time={time} battery={5} />

      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <div className="ios-time text-[72px] font-thin leading-none tracking-tight text-white">
          {time || "09:41"}
        </div>
        <p className="text-lg capitalize text-white/60">{date || "Понедельник, 15 мая"}</p>
      </div>

      {/* Notification */}
      <div className="mx-4 mb-6 rounded-2xl bg-white/10 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500">
            <span className="text-lg">💬</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Сообщения</p>
            <p className="text-sm text-white/70">
              Неизвестный: Ты очнулся?
            </p>
          </div>
          <span className="text-xs text-white/50">сейчас</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleUnlock}
        className="mb-10 flex flex-col items-center gap-1 text-white/50 transition-colors hover:text-white/80"
      >
        <ChevronUp className="h-6 w-6 animate-bounce" />
        <span className="text-sm">Смахните для разблокировки</span>
      </button>
    </div>
  )
}
