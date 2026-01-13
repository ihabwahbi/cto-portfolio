"use client"

import { motion } from "motion/react"
import { Briefcase, GraduationCap, MapPin, Globe } from "lucide-react"
import { GlassCard } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { cn } from "@/lib/utils"

const highlights = [
  {
    icon: Briefcase,
    title: "Current Role",
    value: "VP of Engineering",
    description: "Fortune 500 Tech Company",
  },
  {
    icon: GraduationCap,
    title: "Education",
    value: "MS Computer Science",
    description: "Stanford University",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "San Francisco, CA",
    description: "Open to relocation",
  },
  {
    icon: Globe,
    title: "Languages",
    value: "English, Arabic",
    description: "Native & Fluent",
  },
]

export function AboutSection() {
  const { ref, isVisible, animationClass } = useAnimateIn<HTMLElement>({
    threshold: 0.2,
  })

  return (
    <section
      id="about"
      ref={ref}
      className={cn("section-spacing animate-in", isVisible && "is-visible", animationClass)}
    >
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="label-text mb-4 block"
          >
            About Me
          </motion.span>
          <h2 className="section-title gradient-text-white mb-6">
            Technology Leader & <br />
            <span className="gradient-text">Strategic Innovator</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Bio */}
          <div className="space-y-6">
            <p className="body-lg text-white/80 leading-relaxed">
              I&apos;m a passionate technology executive who thrives at the intersection
              of innovation and execution. With over 15 years of experience building
              and scaling engineering organizations, I&apos;ve led transformative
              initiatives that have generated billions in revenue.
            </p>
            <p className="body-lg text-white/60 leading-relaxed">
              My approach combines deep technical expertise with strategic business
              acumen. I believe in building cultures of excellence where engineers
              are empowered to solve complex problems and deliver exceptional value.
            </p>
            <p className="body-lg text-white/60 leading-relaxed">
              From architecting cloud-native platforms to leading M&A technical
              due diligence, I bring a comprehensive perspective to technology
              leadership that drives measurable outcomes.
            </p>

            {/* Core values */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
                Core Values
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Innovation",
                  "Excellence",
                  "Integrity",
                  "Collaboration",
                  "Growth Mindset",
                ].map((value) => (
                  <span
                    key={value}
                    className="px-3 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-white/70"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard padding="sm" className="h-full">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1.5">
                    {item.title}
                  </p>
                  <p className="text-lg font-semibold text-white mb-1.5">
                    {item.value}
                  </p>
                  <p className="text-sm text-white/50">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
