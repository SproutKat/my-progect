"use client"

import { useState } from "react"
import { StatusBar } from "./status-bar"
import { ChevronLeft, X } from "lucide-react"

interface GalleryScreenProps {
  battery: number
  onBack: () => void
  onPhotoViewed: () => void
}

const photos = [
  {
    id: "tickets",
    title: "Билеты в кино",
    date: "15 мая, прошлый год",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-amber-900/40 to-amber-800/20 p-6">
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/50 p-6 shadow-lg">
          <p className="mb-1 text-center text-xs text-amber-400/60 uppercase tracking-widest">
            СИНЕМА ПАРК
          </p>
          <div className="my-3 border-t border-dashed border-amber-500/20" />
          <p className="text-center text-lg font-semibold text-amber-200">
            Зал 7, Ряд 12
          </p>
          <p className="text-center text-sm text-amber-300/70">
            Места 14-15
          </p>
          <div className="my-3 border-t border-dashed border-amber-500/20" />
          <p className="text-center text-xs text-amber-400/50">
            15.05 — 19:30
          </p>
          <p className="mt-2 text-center text-sm text-amber-200/80">
            {"«Вечное сияние чистого разума»"}
          </p>
        </div>
        <p className="text-xs text-amber-400/40">Два билета. Один вечер.</p>
      </div>
    ),
  },
  {
    id: "bracelet",
    title: "Больничный браслет",
    date: "3 месяца назад",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-blue-900/30 to-slate-900/40 p-6">
        <div className="rounded-xl border border-blue-400/20 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <p className="text-xs text-blue-300/60 uppercase tracking-widest">
              ГКБ №52
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-white">Артем В.</p>
            <p className="text-sm text-blue-200/70">Палата 407</p>
            <div className="my-2 border-t border-blue-400/10" />
            <p className="text-xs text-blue-300/40">Дата поступления: 12.02</p>
            <p className="text-xs text-red-400/60">Реанимация</p>
          </div>
        </div>
        <p className="text-xs text-blue-400/30">
          Кто это? Это... ваш браслет?
        </p>
      </div>
    ),
  },
  {
    id: "screenshot",
    title: "Снимок экрана",
    date: "Сегодня",
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-4">
        <div className="w-full rounded-2xl border border-white/10 bg-black/60 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white/60">
              ?
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Неизвестный</p>
              <p className="text-[10px] text-white/40">вчера, 03:47</p>
            </div>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-sm leading-relaxed text-white/90">
              Если читаешь это — я умер.
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white/90">
              Моё сознание в телефоне на 5 минут.
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white/90">
              {"Скажи Лике..."}
            </p>
            <p className="mt-1 text-sm italic text-white/40">
              (сообщение оборвано)
            </p>
          </div>
        </div>
        <p className="text-center text-xs leading-relaxed text-red-400/70">
          Это... ваше последнее сообщение.
          <br />
          Вы — Артём?
        </p>
      </div>
    ),
  },
]

export function GalleryScreen({
  battery,
  onBack,
  onPhotoViewed,
}: GalleryScreenProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [viewedPhotos, setViewedPhotos] = useState<Set<string>>(new Set())

  const handleViewPhoto = (id: string) => {
    setSelectedPhoto(id)
    setViewedPhotos((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
    if (viewedPhotos.size >= 1) {
      onPhotoViewed()
    }
  }

  const selected = photos.find((p) => p.id === selectedPhoto)

  return (
    <div className="flex h-full flex-col bg-black">
      <StatusBar
        time="09:41"
        battery={battery}
        showBatteryWarning={battery <= 5}
      />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 pb-3">
        <button
          type="button"
          onClick={selectedPhoto ? () => setSelectedPhoto(null) : onBack}
          className="flex items-center gap-1 text-[hsl(var(--accent))]"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm">
            {selectedPhoto ? "Назад" : "Домой"}
          </span>
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-white">
          {selectedPhoto ? selected?.title : "Важные"}
        </h1>
        <div className="w-14" />
      </div>

      {selectedPhoto && selected ? (
        /* Full photo view */
        <div className="flex flex-1 flex-col animate-fade-in">
          <div className="flex-1 p-4">{selected.content}</div>
          <div className="p-4 text-center">
            <p className="text-xs text-white/40">{selected.date}</p>
          </div>
        </div>
      ) : (
        /* Photo grid */
        <div className="flex-1 overflow-y-auto p-4">
          <p className="mb-4 text-xs text-white/40 uppercase tracking-wider">
            Папка: Важные — 3 фото
          </p>
          <div className="grid grid-cols-1 gap-3">
            {photos.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => handleViewPhoto(photo.id)}
                className={`group relative overflow-hidden rounded-2xl border transition-all active:scale-[0.98] ${
                  viewedPhotos.has(photo.id)
                    ? "border-white/10 bg-white/5"
                    : "border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/5 animate-pulse-glow"
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-left text-sm font-medium text-white">
                        {photo.title}
                      </p>
                      <p className="text-left text-xs text-white/40">
                        {photo.date}
                      </p>
                    </div>
                    {!viewedPhotos.has(photo.id) && (
                      <div className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
