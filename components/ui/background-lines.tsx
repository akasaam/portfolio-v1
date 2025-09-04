"use client"
import { cn } from "@/lib/utils"
import type React from "react"

interface BackgroundLinesProps {
  className?: string
  children?: React.ReactNode
}

export const BackgroundLines = ({ className, children }: BackgroundLinesProps) => {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <path
          d="M0,100 Q250,50 500,100 T1000,100 L1000,0 L0,0 Z"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
        <path
          d="M0,200 Q250,150 500,200 T1000,200 L1000,100 L0,100 Z"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
        <path
          d="M0,300 Q250,250 500,300 T1000,300 L1000,200 L0,200 Z"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />
      </svg>
      {children}
    </div>
  )
}
