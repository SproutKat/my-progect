"use client"

import { StatusBar } from "./status-bar"
import { ChevronLeft } from "lucide-react"

interface CalendarScreenProps {
  battery: number
  onBack: () => void
}

export function CalendarScreen({ battery, onBack }: CalendarScreenProps) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

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
          Май
        </h1>
        <div className="w-14" />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Week headers */}
        <div className="mb-2 grid grid-cols-7 gap-1">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
            <div
              key={d}
              className="text-center text-xs text-white/40"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Offset for May starting on Wednesday (index 2) */}
          <div />
          <div />
          {days.map((day) => (
            <div
              key={day}
              className={`flex h-10 items-center justify-center rounded-full text-sm ${
                day === 15
                  ? "bg-red-500 font-bold text-white ring-2 ring-red-400/50"
                  : day === 12
                    ? "bg-blue-500/20 text-blue-300"
                    : "text-white/60"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Event */}
        <div className="mt-6 space-y-3">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <p className="text-sm font-semibold text-white">15 мая</p>
            </div>
            <p className="mt-1 pl-5 text-sm text-white/70">
              День Лики
            </p>
            <p className="mt-0.5 pl-5 text-xs text-red-400/60">
              Весь день
            </p>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <p className="text-sm font-semibold text-white">12 мая</p>
            </div>
            <p className="mt-1 pl-5 text-sm text-white/70">
              Приём у врача — 10:00
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
