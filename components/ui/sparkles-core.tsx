"use client"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface SparklesCoreProps {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  particleColor?: string
  speed?: number
}

export const SparklesCore = ({
  id = "tsparticles",
  className,
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  particleColor = "#FFFFFF",
  speed = 1,
}: SparklesCoreProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      fadeDirection: number
    }> = []

    // Create particles
    for (let i = 0; i < particleDensity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random(),
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Update opacity
        particle.opacity += particle.fadeDirection * 0.01
        if (particle.opacity <= 0 || particle.opacity >= 1) {
          particle.fadeDirection *= -1
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [minSize, maxSize, particleDensity, particleColor, speed])

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("absolute inset-0 w-full h-full", className)}
      style={{ background }}
    />
  )
}
