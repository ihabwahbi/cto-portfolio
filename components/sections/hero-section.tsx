"use client"

import { motion } from "motion/react"
import { ArrowDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="container relative z-10 flex justify-center pt-20 sm:pt-24 md:pt-28 lg:pt-20 pb-16 sm:pb-20">
        <div className="max-w-4xl w-full text-center">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-emerald" />
            </span>
            <span className="text-sm font-medium text-brand-cyan">
              Available for CTO Opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-title mt-8 sm:mt-10 md:mt-12"
          >
            <span className="gradient-text-white block leading-[1.1]">Building the</span>
            <span className="gradient-text-animated block leading-[1.1]">Future of Tech</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="statement text-white/60 max-w-2xl w-full mx-auto mt-6 sm:mt-8 md:mt-10 text-center px-4"
          >
            Technology executive with 15+ years transforming organizations through
            innovative engineering leadership, scalable architectures, and
            high-performing teams.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mt-10 sm:mt-12 md:mt-14"
          >
            <Button variant="glow" size="xl" className="group">
              <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
              View My Journey
            </Button>
            <Button variant="outline" size="xl">
              Let&apos;s Connect
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Stats Section - Separated with more breathing room */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 w-full border-t border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
      >
        <div className="container py-10 sm:py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 max-w-5xl mx-auto">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "$2B+", label: "Revenue Impact" },
              { value: "500+", label: "Engineers Led" },
              { value: "12", label: "Products Launched" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="metric-value gradient-text mb-2 sm:mb-3">
                  {stat.value}
                </div>
                <div className="metric-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
