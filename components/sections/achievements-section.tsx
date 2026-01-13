"use client"

import { motion } from "motion/react"
import {
  TrendingUp,
  Users,
  Rocket,
  Award,
  DollarSign,
  Zap,
} from "lucide-react"
import { GlassCard } from "@/components/ui"
import { useAnimateIn, useCounter } from "@/hooks"
import { cn } from "@/lib/utils"

const metrics = [
  {
    icon: DollarSign,
    value: 2.4,
    suffix: "B+",
    label: "Revenue Generated",
    description: "Total business impact",
    color: "cyan",
  },
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Engineers Led",
    description: "Direct and indirect engineering reports",
    color: "purple",
  },
  {
    icon: Rocket,
    value: 12,
    suffix: "",
    label: "Products Launched",
    description: "Major product launches and initiatives",
    color: "emerald",
  },
  {
    icon: TrendingUp,
    value: 99.99,
    suffix: "%",
    label: "Platform Uptime",
    description: "Enterprise-grade reliability",
    color: "amber",
  },
  {
    icon: Zap,
    value: 80,
    suffix: "%",
    label: "Deployment Speed",
    description: "Reduction in deployment cycle time",
    color: "cyan",
  },
  {
    icon: Award,
    value: 3,
    suffix: "",
    label: "Patents Filed",
    description: "Technical innovations patented",
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
          <span className="label-text mb-4 block">Impact & Achievements</span>
          <h2 className="section-title gradient-text-white mb-6">
            Measurable <span className="gradient-text">Results</span>
          </h2>
          <p className="statement text-white/60">
            Numbers that tell the story of transformative leadership and execution excellence.
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

        {/* Awards/Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <GlassCard padding="xl">
            <h3 className="text-xl font-semibold text-white text-center mb-8">
              Recognition & Awards
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "CTO of the Year",
                  org: "Tech Leadership Awards",
                  year: "2023",
                },
                {
                  title: "Top 40 Under 40",
                  org: "Fortune Magazine",
                  year: "2022",
                },
                {
                  title: "Engineering Excellence",
                  org: "IEEE Computer Society",
                  year: "2021",
                },
              ].map((award, index) => (
                <div
                  key={award.title}
                  className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <Award className="w-8 h-8 text-brand-amber mx-auto mb-3" />
                  <h4 className="font-semibold text-white mb-1">{award.title}</h4>
                  <p className="text-sm text-white/50">{award.org}</p>
                  <p className="text-xs text-brand-cyan mt-2">{award.year}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
