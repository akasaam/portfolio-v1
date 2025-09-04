import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import LoadingScreen from "@/components/loading-screen"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Raju Halder - Full-Stack Developer & Entrepreneur",
  description:
    "Portfolio of Raju Halder - Full-Stack Web Developer, Entrepreneur, and Digital Brand Strategist. Creating digital experiences that transform businesses.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingScreen />
        <Header />
        {children}
      </body>
    </html>
  )
}
