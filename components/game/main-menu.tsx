"use client"

import { useState, useEffect } from "react"
import { Ghost, Lock, ChevronRight } from "lucide-react"

interface MainMenuProps {
  onStartGame: () => void
}

export function MainMenu({ onStartGame }: MainMenuProps) {
  const [showContent, setShowContent] = useState(false)
  const [showCard, setShowCard] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 300)
    const t2 = setTimeout(() => setShowCard(true), 800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-10">
        {/* Logo / Title */}
        <div
          className={`flex flex-col items-center gap-4 transition-all duration-1000 ${
            showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <Ghost className="h-8 w-8 text-white/70" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              5 Minutes
            </h1>
            <p className="mt-1 text-sm text-white/40">
              Interactive Stories
            </p>
          </div>
        </div>

        {/* Games List */}
        <div
          className={`w-full transition-all duration-700 ${
            showCard ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="mb-3 px-1 text-xs font-medium uppercase tracking-wider text-white/30">
            Истории
          </p>

          {/* Game Card: Ghost in the Phone */}
          <button
            type="button"
            onClick={onStartGame}
            className="group w-full rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/[0.08] transition-all hover:bg-white/[0.07] hover:ring-white/[0.15] active:scale-[0.98]"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 ring-1 ring-blue-500/20">
                <Ghost className="h-6 w-6 text-blue-400" />
              </div>

              {/* Info */}
              <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
                <h2 className="text-base font-medium text-white">
                  Призрак в телефоне
                </h2>
                <p className="text-left text-sm leading-relaxed text-white/40">
                  5 минут. 4% батареи. Одно последнее сообщение.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-white/30">
                    ~5 мин
                  </span>
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-white/30">
                    4 концовки
                  </span>
                  <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] text-blue-400/70">
                    1 секрет
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-white/20 transition-transform group-hover:translate-x-0.5 group-hover:text-white/40" />
            </div>
          </button>

          {/* Locked game placeholder */}
          <div className="mt-3 flex w-full items-center gap-4 rounded-2xl bg-white/[0.02] p-4 ring-1 ring-white/[0.05]">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.03] ring-1 ring-white/[0.06]">
              <Lock className="h-5 w-5 text-white/15" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-medium text-white/20">
                Скоро...
              </h2>
              <p className="text-sm text-white/10">
                Новая история в разработке
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p
          className={`text-[11px] text-white/15 transition-all delay-500 duration-1000 ${
            showCard ? "opacity-100" : "opacity-0"
          }`}
        >
          v1.0
        </p>
      </div>
    </div>
  )
}
