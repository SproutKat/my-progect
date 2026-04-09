"use client"

import { Signal, Wifi, Battery } from "lucide-react"

interface StatusBarProps {
  time: string
  battery: number
  carrier?: string
  showBatteryWarning?: boolean
}

export function StatusBar({
  time,
  battery,
  carrier = "МТС",
  showBatteryWarning = false,
}: StatusBarProps) {
  const batteryColor =
    battery <= 5
      ? "text-red-500"
      : battery <= 20
        ? "text-yellow-500"
        : "text-green-500"

  return (
    <div className="flex items-center justify-between px-6 py-2 text-sm font-semibold text-white">
      <div className="flex items-center gap-1">
        <span className="ios-time text-sm font-semibold">{time}</span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        {/* Notch / Dynamic Island */}
        <div className="h-[28px] w-[120px] rounded-full bg-black" />
      </div>

      <div className="flex items-center gap-1.5">
        <Signal className="h-3.5 w-3.5" />
        <span className="text-xs">{carrier}</span>
        <Wifi className="h-3.5 w-3.5" />
        <div className="flex items-center gap-0.5">
          <span
            className={`text-xs font-bold ${batteryColor} ${showBatteryWarning ? "animate-pulse" : ""}`}
          >
            {battery}%
          </span>
          <Battery
            className={`h-4 w-4 ${batteryColor} ${showBatteryWarning ? "animate-pulse" : ""}`}
          />
        </div>
      </div>
    </div>
  )
}
