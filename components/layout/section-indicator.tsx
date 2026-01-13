"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Impact" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
]

export function SectionIndicator() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const activeIndex = sections.findIndex((s) => s.id === activeSection)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {/* Track line */}
      <div className="absolute w-[2px] bg-white/10 rounded-full inset-y-0 left-1/2 -translate-x-1/2" />

      {/* Progress indicator */}
      <motion.div
        className="absolute w-[2px] bg-gradient-to-b from-brand-cyan to-brand-purple rounded-full left-1/2 -translate-x-1/2 top-0"
        animate={{
          height: `${((activeIndex + 1) / sections.length) * 100}%`,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Dots */}
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="relative group z-10"
          aria-label={`Go to ${section.label}`}
        >
          <motion.div
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              activeSection === section.id
                ? "bg-brand-cyan scale-125"
                : "bg-white/30 hover:bg-white/50"
            )}
            whileHover={{ scale: 1.3 }}
          />

          {/* Tooltip */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="px-3 py-1.5 rounded-lg bg-brand-slate text-white text-xs font-medium whitespace-nowrap">
              {section.label}
            </div>
          </div>
        </button>
      ))}
    </nav>
  )
}
