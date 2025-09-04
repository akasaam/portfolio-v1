"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const heroRef = useRef<HTMLElement>(null)
  const storyRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const journeyRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
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

      // Story section animations
      gsap.fromTo(
        storyRef.current?.querySelector("h2"),
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Skills section animations
      gsap.fromTo(
        skillsRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Journey section animations
      gsap.fromTo(
        journeyRef.current?.children || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: journeyRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
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
            The Technical Visionary
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-outfit max-w-2xl mx-auto">
            I exist in the beautiful intersection between technology and humanity, creating bridges where others see
            divides.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="bg-gray-50 py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12">My Story</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-square bg-black rounded-2xl md:rounded-3xl overflow-hidden relative hover:scale-105 transition-transform duration-500">
                <Image
                  src="https://avatars.githubusercontent.com/u/133478692?v=4"
                  alt="Raju Halder"
                  width={600}
                  height={600}
                  className="object-cover mix-blend-luminosity"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">The Bridge Builder</h3>
                <p className="text-gray-600 font-outfit leading-relaxed">
                  You exist in the beautiful intersection between technology and humanity, creating bridges where others
                  see divides. Your journey from sociology student to tech entrepreneur wasn't a career pivot—it was a
                  natural evolution of your desire to connect people with possibilities.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Human-Centered Technology</h3>
                <p className="text-gray-600 font-outfit leading-relaxed">
                  When you sit down to code, there's something different in your approach. While your fingers move
                  through familiar patterns of React components and Node.js functions, your mind is never just
                  processing syntax. You're constantly translating human needs into digital solutions.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">The Brand Counter</h3>
                <p className="text-gray-600 font-outfit leading-relaxed">
                  Building Geeks Hub and co-founding The Brand Counter required courage—stepping away from the safety of
                  being just a developer to embrace the vulnerability of leadership. Yet in that space of uncertainty,
                  you found your truest expression, creating opportunities not just for yourself but for your team of
                  specialists who now bring 30+ brands to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12 text-center">Technical Arsenal</h2>
          <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-bold mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-600 font-outfit">
                <li>React & Next.js</li>
                <li>Vue.js</li>
                <li>Tailwind CSS</li>
                <li>GSAP Animations</li>
                <li>TypeScript</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-bold mb-4">Backend</h3>
              <ul className="space-y-2 text-gray-600 font-outfit">
                <li>Node.js & Express</li>
                <li>MongoDB</li>
                <li>PostgreSQL</li>
                <li>REST APIs</li>
                <li>GraphQL</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-bold mb-4">Design</h3>
              <ul className="space-y-2 text-gray-600 font-outfit">
                <li>Figma</li>
                <li>Adobe XD</li>
                <li>Photoshop</li>
                <li>UI/UX Design</li>
                <li>Prototyping</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-bold mb-4">Other</h3>
              <ul className="space-y-2 text-gray-600 font-outfit">
                <li>Kotlin</li>
                <li>C++</li>
                <li>Git & GitHub</li>
                <li>Docker</li>
                <li>AWS</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="bg-black text-white py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12">The Journey</h2>
          <div ref={journeyRef} className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/4">
                <span className="text-2xl font-bold text-gray-400">2019</span>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-3">The Beginning</h3>
                <p className="text-gray-400 font-outfit">
                  Started my journey in web development while studying sociology, discovering the perfect blend of human
                  understanding and technical skills.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/4">
                <span className="text-2xl font-bold text-gray-400">2021</span>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-3">First Major Projects</h3>
                <p className="text-gray-400 font-outfit">
                  Launched several successful projects including salon websites and healthcare platforms, establishing a
                  reputation for quality and innovation.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/4">
                <span className="text-2xl font-bold text-gray-400">2022</span>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-3">GeeksHub Foundation</h3>
                <p className="text-gray-400 font-outfit">
                  Founded GeeksHub, an educational platform focused on transforming futures through comprehensive
                  computer training programs.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/4">
                <span className="text-2xl font-bold text-gray-400">2023</span>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-3">The Brand Counter</h3>
                <p className="text-gray-400 font-outfit">
                  Co-founded The Brand Counter, leading a team of 10+ specialists and successfully elevating 30+ brands
                  through innovative digital solutions.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/4">
                <span className="text-2xl font-bold text-gray-400">2024</span>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-3">Continued Innovation</h3>
                <p className="text-gray-400 font-outfit">
                  Expanding into new technologies and markets, with a focus on creating digital experiences that truly
                  connect, engage, and inspire users worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8">My Philosophy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Human-Centered</h3>
              <p className="text-gray-600 font-outfit">
                Technology should serve humanity, not the other way around. Every line of code should have a human
                purpose.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-600 font-outfit">
                Constantly pushing boundaries and exploring new possibilities to create transformative digital
                experiences.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Impact</h3>
              <p className="text-gray-600 font-outfit">
                Success is measured not just in code quality or client satisfaction, but in the positive impact on
                people's lives.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
