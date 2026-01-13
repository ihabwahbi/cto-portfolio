"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useReducedMotion, useIsTouchDevice } from "@/hooks"

export function AuroraBackground() {
  const prefersReducedMotion = useReducedMotion()
  const isTouch = useIsTouchDevice()
  const { scrollY } = useScroll()

  const y1 = useTransform(scrollY, [0, 2000], [0, 200])
  const y2 = useTransform(scrollY, [0, 2000], [0, 150])
  const y3 = useTransform(scrollY, [0, 2000], [0, 100])

  // Static fallback for reduced motion or touch devices
  if (prefersReducedMotion || isTouch) {
    return (
      <div className="fixed-background">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-void via-brand-obsidian to-brand-void" />

        {/* Static orbs */}
        <div
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-[40%] right-[10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[20%] w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 60%)",
          }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>
    )
  }

  return (
    <div className="fixed-background">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-void via-brand-obsidian to-brand-void" />

      {/* Animated cyan orb - top left */}
      <motion.div
        className="absolute top-[5%] left-[0%] w-[600px] h-[600px]"
        style={{ y: y1 }}
      >
        <div className="aurora-orb aurora-orb-cyan w-full h-full" />
      </motion.div>

      {/* Animated purple orb - center right */}
      <motion.div
        className="absolute top-[30%] right-[5%] w-[700px] h-[700px]"
        style={{ y: y2 }}
      >
        <div
          className="aurora-orb aurora-orb-purple w-full h-full"
          style={{ animationDelay: "2s" }}
        />
      </motion.div>

      {/* Animated cyan orb - bottom */}
      <motion.div
        className="absolute bottom-[10%] left-[15%] w-[500px] h-[500px]"
        style={{ y: y3 }}
      >
        <div
          className="aurora-orb aurora-orb-cyan w-full h-full"
          style={{ animationDelay: "4s" }}
        />
      </motion.div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
