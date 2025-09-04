"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLElement>(null)
  const contactInfoRef = useRef<HTMLElement>(null)

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

      // Form animations
      gsap.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Contact info animations
      gsap.fromTo(
        contactInfoRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create WhatsApp message
    const message = `Hello! I'm ${formData.name}.

Subject: ${formData.subject}

${formData.message}

Email: ${formData.email}`

    const whatsappUrl = `https://wa.me/917501411769?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="px-4 sm:px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight mb-6">
            Let's Connect
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-outfit max-w-2xl mx-auto">
            Ready to transform your digital presence? Let's discuss how we can create something amazing together.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef}>
              <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Message Sent!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div ref={contactInfoRef} className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                <p className="text-gray-600 font-outfit mb-8">
                  I'm always excited to discuss new projects and opportunities. Whether you're looking to build
                  something from scratch or improve an existing solution, let's talk about how we can bring your vision
                  to life.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Mail className="h-6 w-6 text-black mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600 font-outfit">akarajuhalder@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Phone className="h-6 w-6 text-black mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600 font-outfit">+91 7501411769</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <MapPin className="h-6 w-6 text-black mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-gray-600 font-outfit">West Bengal, India</p>
                  </div>
                </div>
              </div>

              <div className="bg-black text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Why Work With Me?</h3>
                <ul className="space-y-3 font-outfit">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 shrink-0"></span>
                    5+ years of proven experience
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 shrink-0"></span>
                    30+ successful projects delivered
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 shrink-0"></span>
                    Human-centered approach to technology
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 shrink-0"></span>
                    End-to-end project management
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
