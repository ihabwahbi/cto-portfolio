"use client"

import { motion } from "motion/react"
import {
  TrendingUp,
  Users,
  Rocket,
  DollarSign,
  Zap,
  Brain,
} from "lucide-react"
import { GlassCard } from "@/components/ui"
import { useAnimateIn, useCounter } from "@/hooks"
import { cn } from "@/lib/utils"

const metrics = [
  {
    icon: DollarSign,
    value: 12,
    suffix: "M",
    label: "P&L Managed",
    description: "Full budget & financial accountability",
    color: "cyan",
  },
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "Team Members Led",
    description: "Across multiple locations",
    color: "purple",
  },
  {
    icon: TrendingUp,
    value: 44,
    suffix: "%",
    label: "Cost Reduction",
    description: "Inventory days from 160 to 90",
    color: "emerald",
  },
  {
    icon: Zap,
    value: 80,
    suffix: "%",
    label: "Process Automation",
    description: "Manual tasks eliminated",
    color: "amber",
  },
  {
    icon: Rocket,
    value: 95,
    suffix: "%",
    label: "Service Quality",
    description: "Consistent delivery across sites",
    color: "cyan",
  },
  {
    icon: Brain,
    value: 0,
    suffix: "",
    label: "Safety Incidents",
    description: "Zero incidents through culture change",
    color: "purple",
  },
]

function MetricCard({
  metric,
  index,
  isVisible,
}: {
  metric: (typeof metrics)[0]
  index: number
  isVisible: boolean
}) {
  const value = useCounter(metric.value, isVisible, {
    duration: 2000,
    delay: index * 150,
    decimals: metric.value % 1 !== 0 ? 2 : 0,
  })

  return (
    <GlassCard className="text-center group">
      <div
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110",
          metric.color === "cyan" && "bg-brand-cyan/10 text-brand-cyan",
          metric.color === "purple" && "bg-brand-purple/10 text-brand-purple",
          metric.color === "emerald" && "bg-brand-emerald/10 text-brand-emerald",
          metric.color === "amber" && "bg-brand-amber/10 text-brand-amber"
        )}
      >
        <metric.icon className="w-7 h-7" />
      </div>

      <div className="metric-value mb-2">
        <span
          className={cn(
            metric.color === "cyan" && "gradient-text",
            metric.color === "purple" && "gradient-text-purple",
            metric.color === "emerald" && "text-brand-emerald",
            metric.color === "amber" && "text-brand-amber"
          )}
        >
          {metric.value % 1 !== 0 ? value.toFixed(2) : Math.round(value)}
          {metric.suffix}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{metric.label}</h3>
      <p className="text-sm text-white/50">{metric.description}</p>
    </GlassCard>
  )
}

export function AchievementsSection() {
  const { ref, isVisible, animationClass } = useAnimateIn<HTMLElement>({
    threshold: 0.2,
  })

  return (
    <section
      id="achievements"
      ref={ref}
      className={cn("section-spacing animate-in", isVisible && "is-visible", animationClass)}
    >
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="label-text mb-4 block">Track Record</span>
          <h2 className="section-title gradient-text-white mb-6">
            Proven <span className="gradient-text">Impact</span>
          </h2>
          <p className="statement text-white/60">
            Measurable business outcomes from my leadership journey.
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MetricCard metric={metric} index={index} isVisible={isVisible} />
            </motion.div>
          ))}
        </div>

        {/* Enterprise Platforms Built */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <GlassCard padding="xl">
            <h3 className="text-xl font-semibold text-white text-center mb-8">
              Key Transformation Initiatives
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Cost Intelligence Platform",
                  org: "Real-time P&L visibility",
                  year: "Reduced reporting time by 80%",
                },
                {
                  title: "Operations Dashboard",
                  org: "Multi-site performance tracking",
                  year: "Enabled data-driven decisions",
                },
                {
                  title: "Demand Forecasting System",
                  org: "AI-powered planning",
                  year: "35% more accurate forecasts",
                },
              ].map((project) => (
                <div
                  key={project.title}
                  className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <Rocket className="w-8 h-8 text-brand-cyan mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-1">{project.title}</h4>
                  <p className="text-sm text-white/50">{project.org}</p>
                  <p className="text-xs text-brand-emerald mt-2">{project.year}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
