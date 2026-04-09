"use client"

import React from "react"

interface PhoneFrameProps {
  children: React.ReactNode
  dimLevel?: number
}

export function PhoneFrame({ children, dimLevel = 0 }: PhoneFrameProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4">
      <div className="relative">
        {/* Phone body */}
        <div className="relative h-[812px] w-[375px] overflow-hidden rounded-[50px] border-[3px] border-[#2a2a2a] bg-black shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          {/* Screen content */}
          <div
            className="relative h-full w-full overflow-hidden"
            style={{
              filter: dimLevel > 0 ? `brightness(${1 - dimLevel})` : undefined,
              transition: "filter 2s ease-in",
            }}
          >
            {children}
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <div className="h-1 w-32 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  )
}
