"use client"

import { useState, useEffect } from "react"

type PhotoChoice = "tickets" | "bracelet" | "black"
type TextChoice = string

interface EndingScreenProps {
  sentText?: TextChoice
  sentPhoto?: PhotoChoice
  onRestart: () => void
}

interface EndingData {
  likaResponse: string
  title: string
  subtitle: string
  isSecret: boolean
}

function getEnding(text?: string, photo?: PhotoChoice): EndingData {
  // Secret ending
  if (text?.toLowerCase().includes("15 мая")) {
    return {
      likaResponse: "",
      title: "Пароль принят. Сохраняю тебя...",
      subtitle: "Вы остались в памяти навсегда.",
      isSecret: true,
    }
  }

  // Ending 1: Love + tickets
  if (
    text === "Я всегда буду любить тебя" ||
    photo === "tickets"
  ) {
    return {
      likaResponse: "Арт? Что это? Я звоню...",
      title: "Батарея 0%. Экран погас.",
      subtitle: "Она носит билет в кошельке 10 лет.",
      isSecret: false,
    }
  }

  // Ending 2: Truth
  if (
    text === "Ищи чёрную коробку в шкафу" ||
    photo === "bracelet"
  ) {
    return {
      likaResponse: "Нет... это шутка...",
      title: "Батарея 0%. Экран погас.",
      subtitle: "Она нашла кольцо. Не надела его.",
      isSecret: false,
    }
  }

  // Ending 3: Silence / black screen
  if (
    text === "Живи счастливо без меня" ||
    photo === "black"
  ) {
    return {
      likaResponse: "",
      title: "Батарея 0%. Экран погас.",
      subtitle: "Иногда тишина — самый громкий ответ.",
      isSecret: false,
    }
  }

  // Default ending for custom messages
  return {
    likaResponse: "Арт?.. Это правда ты?",
    title: "Батарея 0%. Экран погас.",
    subtitle: "Последние слова всегда самые важные.",
    isSecret: false,
  }
}

export function EndingScreen({
  sentText,
  sentPhoto,
  onRestart,
}: EndingScreenProps) {
  const [phase, setPhase] = useState<
    "likaResponse" | "screenOff" | "title" | "subtitle" | "restart"
  >("likaResponse")
  const ending = getEnding(sentText, sentPhoto)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    if (ending.isSecret) {
      // Secret ending: skip to reboot
      setPhase("title")
      timers.push(setTimeout(() => setPhase("subtitle"), 3000))
      timers.push(setTimeout(() => setPhase("restart"), 6000))
    } else {
      if (ending.likaResponse) {
        timers.push(setTimeout(() => setPhase("screenOff"), 3000))
      } else {
        setPhase("screenOff")
      }
      timers.push(
        setTimeout(
          () => setPhase("title"),
          ending.likaResponse ? 5000 : 2000
        )
      )
      timers.push(
        setTimeout(
          () => setPhase("subtitle"),
          ending.likaResponse ? 8000 : 5000
        )
      )
      timers.push(
        setTimeout(
          () => setPhase("restart"),
          ending.likaResponse ? 12000 : 9000
        )
      )
    }

    return () => {
      for (const t of timers) clearTimeout(t)
    }
  }, [ending.isSecret, ending.likaResponse])

  return (
    <div
      className={`flex h-full flex-col items-center justify-center ${
        ending.isSecret && phase !== "likaResponse"
          ? "animate-reboot bg-white"
          : "bg-black"
      }`}
    >
      {/* Lika response */}
      {phase === "likaResponse" && ending.likaResponse && (
        <div className="animate-fade-in p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-500">
              <span className="text-sm text-white">Л</span>
            </div>
            <p className="text-sm font-semibold text-white">Лика</p>
          </div>
          <div className="rounded-2xl rounded-bl-md bg-white/10 px-5 py-3">
            <p className="text-base leading-relaxed text-white/90">
              {ending.likaResponse}
            </p>
          </div>
        </div>
      )}

      {/* Screen off */}
      {phase === "screenOff" && !ending.isSecret && (
        <div className="animate-screen-off flex h-full w-full items-center justify-center">
          <div className="text-center">
            <p className="animate-flicker text-6xl text-red-500">0%</p>
          </div>
        </div>
      )}

      {/* Title card */}
      {(phase === "title" || phase === "subtitle" || phase === "restart") && (
        <div className="flex flex-col items-center gap-8 p-8 text-center">
          <p
            className={`animate-slow-fade text-xl font-light leading-relaxed ${
              ending.isSecret ? "text-black" : "text-white/80"
            }`}
          >
            {ending.title}
          </p>

          {(phase === "subtitle" || phase === "restart") && (
            <p
              className={`animate-slow-fade text-sm leading-relaxed ${
                ending.isSecret ? "text-black/60" : "text-white/40"
              }`}
            >
              {ending.subtitle}
            </p>
          )}

          {phase === "restart" && (
            <button
              type="button"
              onClick={onRestart}
              className={`animate-slow-fade mt-8 rounded-full px-8 py-3 text-sm font-medium transition-all active:scale-95 ${
                ending.isSecret
                  ? "bg-black text-white hover:bg-black/80"
                  : "border border-white/20 text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {ending.isSecret ? "Начать заново" : "Попробовать снова"}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
