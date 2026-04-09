"use client"

import { useEffect, useState } from "react"

interface NotificationProps {
  title: string
  body: string
  icon?: string
  duration?: number
}

export function Notification({
  title,
  body,
  icon = "💬",
  duration = 4000,
}: NotificationProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(t)
  }, [duration])

  if (!visible) return null

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-[100] px-4 pt-12">
      <div className="animate-notif rounded-2xl bg-[#2c2c2e]/95 p-3 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500">
            <span className="text-lg">{icon}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="truncate text-sm text-white/70">{body}</p>
          </div>
          <span className="shrink-0 text-xs text-white/40">сейчас</span>
        </div>
      </div>
    </div>
  )
}
