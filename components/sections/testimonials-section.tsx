"use client"

import { motion } from "motion/react"
import {
  Target,
  Users,
  BarChart3,
  Code2,
  Compass,
  Heart,
} from "lucide-react"
import { GlassCard } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { cn } from "@/lib/utils"

const principles = [
  {
    icon: Target,
    title: "Business First, Technology Second",
    description:
      "Technology must drive revenue, cut costs, or improve customer experience. If it doesn't move the business forward, it doesn't get built.",
    color: "cyan",
  },
  {
    icon: Users,
    title: "Build Teams, Not Just Systems",
    description:
      "Great results come from great people. I invest heavily in growing talent, creating cultures of ownership, and building teams that thrive long after I've moved on.",
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    description:
      "I replace gut feelings with dashboards and KPIs. Every major decision should be backed by data—whether it's inventory, costs, staff performance, or customer satisfaction.",
    color: "emerald",
  },
  {
    icon: Code2,
    title: "Hands-On When It Matters",
    description:
      "I'm not a manager disconnected from reality. I understand the technology, can evaluate solutions properly, and roll up my sleeves when things get critical.",
    color: "amber",
  },
  {
    icon: Compass,
    title: "Operations Experience",
    description:
      "I've managed P&L, led frontline teams, and navigated crises. I understand that technology serves operations, not the other way around.",
    color: "purple",
  },
  {
    icon: Heart,
    title: "Customer Experience First",
    description:
      "Technology should delight customers—faster service, personalized experiences, and seamless interactions that keep them coming back.",
    color: "emerald",
  },
]

export function TestimonialsSection() {
  const { ref, isVisible, animationClass } = useAnimateIn<HTMLElement>({
    threshold: 0.2,
  })

  return (
    <section
      id="approach"
      ref={ref}
      className={cn("section-spacing animate-in", isVisible && "is-visible", animationClass)}
    >
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="label-text mb-4 block">Leadership Philosophy</span>
          <h2 className="section-title gradient-text-white mb-6">
            My Approach to <span className="gradient-text">Leadership</span>
          </h2>
          <p className="statement text-white/60">
            How I think about leading teams, implementing technology, and delivering business value.
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="h-full group hover:border-white/20 transition-all duration-300">
                {/* Icon */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110",
                    principle.color === "cyan" && "bg-brand-cyan/10 text-brand-cyan",
                    principle.color === "purple" && "bg-brand-purple/10 text-brand-purple",
                    principle.color === "emerald" && "bg-brand-emerald/10 text-brand-emerald",
                    principle.color === "amber" && "bg-brand-amber/10 text-brand-amber"
                  )}
                >
                  <principle.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                  {principle.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {principle.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/50 text-sm max-w-2xl mx-auto">
            These principles have guided me through every leadership role—from multi-site operations
            to enterprise technology initiatives. They&apos;ll guide how I lead your technology department too.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
