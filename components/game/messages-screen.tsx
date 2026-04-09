"use client"

import { useState, useEffect } from "react"
import { StatusBar } from "./status-bar"
import { ChevronLeft } from "lucide-react"

interface MessagesScreenProps {
  battery: number
  onBack: () => void
  onOpenChatUnknown: () => void
  onOpenChatLika: () => void
  hasSeenGallery: boolean
}

export function MessagesScreen({
  battery,
  onBack,
  onOpenChatUnknown,
  onOpenChatLika,
  hasSeenGallery,
}: MessagesScreenProps) {
  const [showNewMessage, setShowNewMessage] = useState(false)

  useEffect(() => {
    if (hasSeenGallery) {
      const t = setTimeout(() => setShowNewMessage(true), 800)
      return () => clearTimeout(t)
    }
  }, [hasSeenGallery])

  return (
    <div className="flex h-full flex-col bg-black">
      <StatusBar
        time="09:41"
        battery={battery}
        showBatteryWarning={battery <= 5}
      />

      <div className="flex items-center gap-3 px-4 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[hsl(var(--accent))]"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm">Домой</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">
          Сообщения
        </h1>
        <div className="w-14" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Unknown chat */}
        <button
          type="button"
          onClick={onOpenChatUnknown}
          className={`flex w-full items-center gap-3 border-b border-white/5 p-4 text-left transition-colors active:bg-white/5 ${
            showNewMessage ? "animate-slide-in-left" : ""
          }`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-700">
            <span className="text-lg text-white/60">?</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Неизвестный</p>
              <span className="text-xs text-white/40">сейчас</span>
            </div>
            <p className="truncate text-sm text-white/60">
              {showNewMessage
                ? "Ты — призрак. Батарея: 4%..."
                : "Ты очнулся?"}
            </p>
          </div>
          <div className="h-3 w-3 shrink-0 rounded-full bg-[hsl(var(--accent))]" />
        </button>

        {/* Lika chat */}
        <button
          type="button"
          onClick={onOpenChatLika}
          className="flex w-full items-center gap-3 border-b border-white/5 p-4 text-left transition-colors active:bg-white/5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-500">
            <span className="text-lg text-white">Л</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Лика ❤️</p>
              <span className="text-xs text-white/40">2 дн. назад</span>
            </div>
            <p className="truncate text-sm text-white/60">
              Напиши, когда проснёшься 🌸
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}
