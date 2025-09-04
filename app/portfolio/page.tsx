"use client"

import ProjectGrid from "@/components/project-grid"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Portfolio() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current?.querySelector("h1"),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
      )

      gsap.fromTo(
        heroRef.current?.querySelector("p"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="px-4 sm:px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight mb-6">
            My Work
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-outfit max-w-2xl mx-auto">
            A collection of projects that showcase the intersection of technology and human experience, each crafted
            with purpose and precision.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <ProjectGrid />
    </div>
  )
}
