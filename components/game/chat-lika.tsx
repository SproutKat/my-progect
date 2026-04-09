"use client"

import { useState, useEffect, useRef } from "react"
import { StatusBar } from "./status-bar"
import {
  ChevronLeft,
  SendHorizontal,
  ImageIcon,
  X,
} from "lucide-react"

type PhotoChoice = "tickets" | "bracelet" | "black"
type TextChoice =
  | "Я всегда буду любить тебя"
  | "Ищи чёрную коробку в шкафу"
  | "Живи счастливо без меня"
  | "15 мая"
  | string

interface ChatLikaProps {
  battery: number
  onBack: () => void
  onSend: (payload: { text?: TextChoice; photo?: PhotoChoice }) => void
}

interface ChatMsg {
  id: string
  text: string
  sender: "lika" | "you" | "system"
  isPhoto?: boolean
  photoId?: PhotoChoice
}

const photoLabels: Record<PhotoChoice, string> = {
  tickets: "Билеты в кино",
  bracelet: "Больничный браслет",
  black: "Чёрный экран",
}

export function ChatLika({ battery, onBack, onSend }: ChatLikaProps) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: "1",
      text: "Напиши, когда проснёшься 🌸",
      sender: "lika",
    },
    {
      id: "2",
      text: "Арт, ты где? Уже два дня не отвечаешь...",
      sender: "lika",
    },
    {
      id: "3",
      text: "Пожалуйста, скажи что ты в порядке.",
      sender: "lika",
    },
  ])

  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [customText, setCustomText] = useState("")
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [hasSent, setHasSent] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const quickReplies: TextChoice[] = [
    "Я всегда буду любить тебя",
    "Ищи чёрную коробку в шкафу",
    "Живи счастливо без меня",
  ]

  const handleSendText = (text: string) => {
    if (hasSent || !text.trim()) return
    setHasSent(true)
    setShowQuickReplies(false)
    setMessages((prev) => [
      ...prev,
      { id: `you-${Date.now()}`, text, sender: "you" },
    ])
    // Small delay then trigger ending
    setTimeout(() => onSend({ text: text.trim() }), 1500)
  }

  const handleSendPhoto = (photoId: PhotoChoice) => {
    if (hasSent) return
    setHasSent(true)
    setShowPhotoModal(false)
    setShowQuickReplies(false)
    setMessages((prev) => [
      ...prev,
      {
        id: `you-photo-${Date.now()}`,
        text: `📷 ${photoLabels[photoId]}`,
        sender: "you",
        isPhoto: true,
        photoId,
      },
    ])
    setTimeout(() => onSend({ photo: photoId }), 1500)
  }

  return (
    <div className="flex h-full flex-col bg-black">
      <StatusBar
        time="09:41"
        battery={battery}
        showBatteryWarning={battery <= 5}
      />

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[hsl(var(--accent))]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-rose-500">
            <span className="text-sm text-white">Л</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Лика</p>
            <p className="text-[10px] text-white/40">
              последний раз: 2 дн. назад
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`${
              msg.sender === "you"
                ? "animate-slide-in-right self-end"
                : msg.sender === "system"
                  ? "self-center"
                  : "animate-slide-in-left self-start"
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {msg.sender === "system" ? (
              <div className="rounded-xl bg-white/5 px-4 py-2">
                <p className="text-xs text-white/50">{msg.text}</p>
              </div>
            ) : msg.sender === "you" ? (
              <div className="max-w-[80%] rounded-2xl rounded-br-md bg-[hsl(var(--accent))] px-4 py-2.5">
                <p className="text-sm leading-relaxed text-white">{msg.text}</p>
              </div>
            ) : (
              <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-2.5">
                <p className="text-sm leading-relaxed text-white/90">{msg.text}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Battery warning */}
      {battery <= 3 && !hasSent && (
        <div className="mx-4 mb-2 animate-pulse rounded-xl bg-red-500/20 border border-red-500/30 px-4 py-2 text-center">
          <p className="text-xs text-red-400">
            Батарея: {battery}% — Торопись! Отправь последнее сообщение
          </p>
        </div>
      )}

      {/* Quick replies */}
      {showQuickReplies && !hasSent && (
        <div className="border-t border-white/5 px-4 py-3">
          <p className="mb-2 text-[10px] text-white/30 uppercase tracking-wider">
            Быстрые ответы
          </p>
          <div className="flex flex-col gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => handleSendText(reply)}
                className="rounded-xl border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10 px-4 py-2.5 text-left text-sm text-white/90 transition-all hover:bg-[hsl(var(--accent))]/20 active:scale-[0.98]"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      {!hasSent && (
        <div className="flex items-end gap-2 border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => setShowPhotoModal(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20"
          >
            <ImageIcon className="h-4 w-4" />
          </button>

          <div className="flex flex-1 items-center gap-2 rounded-full bg-white/10 px-4 py-2">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendText(customText)
              }}
              placeholder="Сообщение..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => handleSendText(customText)}
            disabled={!customText.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-white transition-opacity disabled:opacity-30"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Photo selection modal */}
      {showPhotoModal && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/60 backdrop-blur-sm">
          <div className="w-full animate-slide-in-left rounded-t-3xl bg-[#1c1c1e] p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">
                Отправить фото
              </h3>
              <button type="button" onClick={() => setShowPhotoModal(false)}>
                <X className="h-5 w-5 text-white/60" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleSendPhoto("tickets")}
                className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-left text-sm text-amber-200 transition-all active:scale-[0.98]"
              >
                🎬 Билеты в кино
                <span className="block text-xs text-amber-400/50 mt-0.5">
                  Намёк на прошлое счастье
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleSendPhoto("bracelet")}
                className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 text-left text-sm text-blue-200 transition-all active:scale-[0.98]"
              >
                🏥 Больничный браслет
                <span className="block text-xs text-blue-400/50 mt-0.5">
                  Правда о смерти
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleSendPhoto("black")}
                className="rounded-xl bg-white/5 border border-white/10 p-3 text-left text-sm text-white/70 transition-all active:scale-[0.98]"
              >
                ⬛ Пустой чёрный экран
                <span className="block text-xs text-white/30 mt-0.5">
                  Молчание
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
