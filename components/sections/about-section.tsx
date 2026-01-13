"use client"

import { motion } from "motion/react"
import { Briefcase, GraduationCap, MapPin, Globe } from "lucide-react"
import { GlassCard } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { cn } from "@/lib/utils"

const highlights = [
  {
    icon: Briefcase,
    title: "Current Focus",
    value: "AI & Operations",
    description: "Building intelligent systems at SLB",
  },
  {
    icon: GraduationCap,
    title: "Education",
    value: "B.Eng Electrical",
    description: "University of Jordan",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Perth → Dubai",
    description: "Ready to relocate immediately",
  },
  {
    icon: Globe,
    title: "Languages",
    value: "English & Arabic",
    description: "Native in both",
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
            Operations DNA, <br />
            <span className="gradient-text">Technology Mindset</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Bio */}
          <div className="space-y-6">
            <p className="body-lg text-white/80 leading-relaxed">
              I started my career on the front lines—running field operations in Iraq,
              managing crews in remote locations, and learning what it takes to keep
              complex operations running smoothly. That foundation taught me something
              no classroom could: technology only matters if it solves real problems
              for real people.
            </p>
            <p className="body-lg text-white/60 leading-relaxed">
              Over 14 years, I progressed from field engineer to leading AI product
              development at a Fortune 500 global headquarters. Along the way, I&apos;ve
              held full P&L accountability for $12M operations, managed 50+ engineers
              through the COVID crisis, and built AI systems that cut costs and
              accelerated decision-making.
            </p>
            <p className="body-lg text-white/60 leading-relaxed">
              With Iraqi heritage and native Arabic fluency, I understand the Middle
              East market deeply. I&apos;m not just relocating to Dubai—I&apos;m coming
              home to a region I know and where I can make an immediate impact.
            </p>

            {/* Core values */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
                What I Bring
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "P&L Accountability",
                  "Team Development",
                  "Operational Excellence",
                  "AI & Automation",
                  "Supply Chain Expertise",
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
