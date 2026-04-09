"use client"

import { StatusBar } from "./status-bar"
import { ChevronLeft } from "lucide-react"

interface NotesScreenProps {
  battery: number
  onBack: () => void
}

export function NotesScreen({ battery, onBack }: NotesScreenProps) {
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
          Заметки
        </h1>
        <div className="w-14" />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Note 1 */}
        <div className="mb-3 animate-fade-in rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
          <p className="mb-1 text-xs text-yellow-400/60">
            Последнее изменение: 10 мая
          </p>
          <p className="text-sm leading-relaxed text-white/90">
            Хотел сделать предложение 15 мая.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Кольцо в чёрной коробке. Верхняя полка шкафа, за книгами.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/50">
            Она любит тюльпаны. Заказать жёлтые.
          </p>
        </div>

        {/* Note 2 */}
        <div
          className="mb-3 rounded-2xl border border-white/10 bg-white/5 p-4"
          style={{ animationDelay: "0.2s" }}
        >
          <p className="mb-1 text-xs text-white/40">
            Последнее изменение: 8 мая
          </p>
          <p className="text-sm leading-relaxed text-white/70">
            Пароль от Wi-Fi: sunflower2024
          </p>
        </div>

        {/* Note 3 - hidden hint */}
        <div
          className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="mb-1 text-xs text-red-400/60">
            Последнее изменение: сегодня, 03:48
          </p>
          <p className="text-sm leading-relaxed text-white/90">
            Если что-то пойдёт не так — набери{" "}
            <span className="font-bold text-red-400">15 мая</span> в чате.
          </p>
          <p className="mt-1 text-xs text-red-400/40">
            Ты поймёшь, когда придёт время.
          </p>
        </div>
      </div>
    </div>
  )
}
