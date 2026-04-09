"use client"

import { useState, useEffect, useCallback } from "react"
import { MainMenu } from "./main-menu"
import { PhoneFrame } from "./phone-frame"
import { LockScreen } from "./lock-screen"
import { HomeScreen } from "./home-screen"
import { GalleryScreen } from "./gallery-screen"
import { MessagesScreen } from "./messages-screen"
import { ChatUnknown } from "./chat-unknown"
import { ChatLika } from "./chat-lika"
import { NotesScreen } from "./notes-screen"
import { CalendarScreen } from "./calendar-screen"
import { EndingScreen } from "./ending-screen"
import { Notification } from "./notification"

type Screen =
  | "menu"
  | "lock"
  | "home"
  | "gallery"
  | "messages"
  | "chatUnknown"
  | "chatLika"
  | "notes"
  | "calendar"
  | "ending"

type PhotoChoice = "tickets" | "bracelet" | "black"

interface GameState {
  screen: Screen
  battery: number
  hasSeenGallery: boolean
  gameStarted: boolean
  sentText?: string
  sentPhoto?: PhotoChoice
  dimLevel: number
}

export function GameController() {
  const [state, setState] = useState<GameState>({
    screen: "menu",
    battery: 5,
    hasSeenGallery: false,
    gameStarted: false,
    dimLevel: 0,
  })

  const [notification, setNotification] = useState<{
    title: string
    body: string
  } | null>(null)

  // Battery drain timer
  useEffect(() => {
    if (!state.gameStarted || state.screen === "ending" || state.screen === "lock") return

    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.battery <= 0) {
          clearInterval(interval)
          return { ...prev, screen: "ending", dimLevel: 1 }
        }
        const newBattery = Math.max(0, prev.battery - 1)
        const newDim = newBattery <= 2 ? (3 - newBattery) * 0.15 : 0
        return { ...prev, battery: newBattery, dimLevel: newDim }
      })
    }, 25000) // Lose 1% every 25 seconds

    return () => clearInterval(interval)
  }, [state.gameStarted, state.screen])

  // Show notification when gallery is seen
  useEffect(() => {
    if (state.hasSeenGallery && state.screen === "gallery") {
      const t = setTimeout(() => {
        setNotification({
          title: "Неизвестный",
          body: "Ты — призрак. Батарея: 4%. Скажи Лике то, что я не успел.",
        })
      }, 2000)
      return () => clearTimeout(t)
    }
  }, [state.hasSeenGallery, state.screen])

  const handleUnlock = useCallback(() => {
    setState((prev) => ({
      ...prev,
      screen: "home",
      gameStarted: true,
    }))
  }, [])

  const goTo = useCallback((screen: Screen) => {
    setState((prev) => ({ ...prev, screen }))
  }, [])

  const handlePhotoViewed = useCallback(() => {
    setState((prev) => ({ ...prev, hasSeenGallery: true }))
  }, [])

  const handleSendToLika = useCallback(
    (payload: { text?: string; photo?: PhotoChoice }) => {
      setState((prev) => ({
        ...prev,
        sentText: payload.text,
        sentPhoto: payload.photo,
        screen: "ending",
      }))
    },
    []
  )

  const handleStartGame = useCallback(() => {
    setState({
      screen: "lock",
      battery: 5,
      hasSeenGallery: false,
      gameStarted: false,
      dimLevel: 0,
    })
    setNotification(null)
  }, [])

  const handleBackToMenu = useCallback(() => {
    setState({
      screen: "menu",
      battery: 5,
      hasSeenGallery: false,
      gameStarted: false,
      dimLevel: 0,
    })
    setNotification(null)
  }, [])

  const renderScreen = () => {
    switch (state.screen) {
      case "menu":
        return null
      case "lock":
        return <LockScreen onUnlock={handleUnlock} />
      case "home":
        return (
          <HomeScreen
            battery={state.battery}
            onOpenGallery={() => goTo("gallery")}
            onOpenMessages={() => goTo("messages")}
            onOpenNotes={() => goTo("notes")}
            onOpenCalendar={() => goTo("calendar")}
          />
        )
      case "gallery":
        return (
          <GalleryScreen
            battery={state.battery}
            onBack={() => goTo("home")}
            onPhotoViewed={handlePhotoViewed}
          />
        )
      case "messages":
        return (
          <MessagesScreen
            battery={state.battery}
            onBack={() => goTo("home")}
            onOpenChatUnknown={() => goTo("chatUnknown")}
            onOpenChatLika={() => goTo("chatLika")}
            hasSeenGallery={state.hasSeenGallery}
          />
        )
      case "chatUnknown":
        return (
          <ChatUnknown
            battery={state.battery}
            onBack={() => goTo("messages")}
            hasSeenGallery={state.hasSeenGallery}
          />
        )
      case "chatLika":
        return (
          <ChatLika
            battery={state.battery}
            onBack={() => goTo("messages")}
            onSend={handleSendToLika}
          />
        )
      case "notes":
        return (
          <NotesScreen
            battery={state.battery}
            onBack={() => goTo("home")}
          />
        )
      case "calendar":
        return (
          <CalendarScreen
            battery={state.battery}
            onBack={() => goTo("home")}
          />
        )
      case "ending":
        return (
          <EndingScreen
            sentText={state.sentText}
            sentPhoto={state.sentPhoto}
            onRestart={handleStartGame}
            onMenu={handleBackToMenu}
          />
        )
      default:
        return null
    }
  }

  if (state.screen === "menu") {
    return <MainMenu onStartGame={handleStartGame} />
  }

  return (
    <PhoneFrame dimLevel={state.screen === "ending" ? 0 : state.dimLevel}>
      {renderScreen()}
      {notification && (
        <Notification
          title={notification.title}
          body={notification.body}
          duration={5000}
        />
      )}
    </PhoneFrame>
  )
}
