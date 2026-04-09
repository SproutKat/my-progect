"use client"

import { StatusBar } from "./status-bar"
import { ImageIcon, MessageSquare, StickyNote, Calendar } from "lucide-react"

interface HomeScreenProps {
  battery: number
  onOpenGallery: () => void
  onOpenMessages: () => void
  onOpenNotes: () => void
  onOpenCalendar: () => void
}

export function HomeScreen({
  battery,
  onOpenGallery,
  onOpenMessages,
  onOpenNotes,
  onOpenCalendar,
}: HomeScreenProps) {
  const apps = [
    {
      name: "Галерея",
      icon: <ImageIcon className="h-7 w-7 text-white" />,
      color: "bg-gradient-to-br from-orange-400 to-pink-500",
      action: onOpenGallery,
      badge: 0,
    },
    {
      name: "Сообщения",
      icon: <MessageSquare className="h-7 w-7 text-white" />,
      color: "bg-gradient-to-br from-green-400 to-green-600",
      action: onOpenMessages,
      badge: 2,
    },
    {
      name: "Заметки",
      icon: <StickyNote className="h-7 w-7 text-white" />,
      color: "bg-gradient-to-br from-yellow-300 to-yellow-500",
      action: onOpenNotes,
      badge: 0,
    },
    {
      name: "Календарь",
      icon: <Calendar className="h-7 w-7 text-white" />,
      color: "bg-gradient-to-br from-red-400 to-red-600",
      action: onOpenCalendar,
      badge: 1,
    },
  ]

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#1a1a2e] to-[#0a0a15]">
      <StatusBar
        time="09:41"
        battery={battery}
        showBatteryWarning={battery <= 5}
      />

      <div className="flex flex-1 flex-col justify-center px-8">
        <div className="grid grid-cols-4 gap-6">
          {apps.map((app) => (
            <button
              key={app.name}
              type="button"
              onClick={app.action}
              className="group flex flex-col items-center gap-1.5 active:animate-tap"
            >
              <div className="relative">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-[16px] ${app.color} shadow-lg transition-transform group-active:scale-90`}
                >
                  {app.icon}
                </div>
                {app.badge > 0 && (
                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {app.badge}
                  </div>
                )}
              </div>
              <span className="text-[11px] text-white/80">{app.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="mx-4 mb-6 flex items-center justify-center gap-8 rounded-3xl bg-white/10 px-6 py-3 backdrop-blur-xl">
        <button
          type="button"
          onClick={onOpenMessages}
          className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-green-400 to-green-600 transition-transform active:scale-90"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  )
}
