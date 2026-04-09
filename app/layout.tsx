import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: '5 Minutes — Interactive Story',
  description: 'An interactive phone story game. You have 5 minutes. What will you say?',
}

export const viewport: Viewport = {
  themeColor: '#000000',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
