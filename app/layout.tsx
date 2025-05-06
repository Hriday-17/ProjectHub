import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ProjectHub - Connecting Students with Transformative Projects",
  description:
    "A student-facing platform that streamlines project discovery, mentor collaboration, task tracking, and group communication within a university ecosystem.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning className={`${inter.className} overflow-x-hidden`}>{children}</body>
    </html>
  )
}
