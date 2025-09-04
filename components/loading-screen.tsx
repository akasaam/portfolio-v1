"use client"

import { useEffect, useState } from "react"
import { BackgroundLines } from "@/components/ui/background-lines"
import { SparklesCore } from "@/components/ui/sparkles-core"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background Lines */}
      <BackgroundLines className="absolute inset-0 bg-black" />

      {/* Sparkles */}
      <SparklesCore
        id="loading-particles"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={50}
        className="absolute inset-0"
        particleColor="#FFFFFF"
        speed={1}
      />

      {/* Loading Content */}
      <div className="relative z-20 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-black mb-8 animate-pulse">RH</h1>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-white transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-4 text-sm font-outfit text-gray-400">{progress}%</p>
      </div>
    </div>
  )
}
