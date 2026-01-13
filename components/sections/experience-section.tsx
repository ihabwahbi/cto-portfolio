"use client"

import { motion } from "motion/react"
import { Building2, Calendar, ArrowUpRight } from "lucide-react"
import { GlassCard, Badge } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { cn } from "@/lib/utils"

const experiences = [
  {
    company: "SLB (Global Energy Leader)",
    logo: "SLB",
    role: "Resource Strategy & Analytics Manager",
    period: "2025 - Present",
    location: "Perth, Australia",
    description:
      "Leading digital transformation of financial operations through AI-powered analytics. Built enterprise cost intelligence platform from scratch, enabling real-time P&L visibility and predictive decision-making across the region.",
    achievements: [
      "Built AI-powered P&L forecasting engine predicting costs 3-12 months ahead",
      "Architected full-stack Cost Management Hub with real-time dashboards",
      "Reduced manual reporting effort by 80% through intelligent automation",
      "Established weekly data-driven decision cadence for senior leadership",
    ],
    technologies: ["Python", "Next.js", "PostgreSQL", "Power BI", "Azure", "Machine Learning"],
    color: "cyan",
  },
  {
    company: "SLB (Global HQ)",
    logo: "SLB",
    role: "Product Development Lead, AI Systems",
    period: "2023 - 2024",
    location: "Paris, France",
    description:
      "Selected to lead AI product innovation at global headquarters. Designed and built intelligent automation systems that transformed how the company forecasts demand and manages resources across 120+ countries.",
    achievements: [
      "Built 'AquaPulse' - multi-agent AI system for demand planning",
      "Achieved 20-35% improvement in forecast accuracy over legacy methods",
      "Led SAP IBP architecture overhaul affecting $50M+ enterprise system",
      "Authored strategic roadmap adopted by global executive leadership",
    ],
    technologies: ["Python", "LangGraph", "OpenAI API", "SAP IBP", "Neo4j", "Google Cloud"],
    color: "purple",
  },
  {
    company: "SLB",
    logo: "SLB",
    role: "Materials & Supply Chain Lead",
    period: "2022 - 2023",
    location: "Adelaide, Australia",
    description:
      "First person to establish this regional function. Transformed manual supply chain operations into automated, data-driven systems while leading critical enterprise system migration across Australia, NZ, and Papua New Guinea.",
    achievements: [
      "Reduced inventory days-on-hand from 160 to 90 days (44% improvement)",
      "Built AI chatbot for supply chain queries, cutting training time by 70%",
      "Led Lawson-to-SAP migration ensuring zero operational disruption",
      "Exceeded $22M annual revenue target through predictive resource planning",
    ],
    technologies: ["Python", "SAP S/4HANA", "Power BI", "Azure Functions", "SvelteKit"],
    color: "emerald",
  },
  {
    company: "SLB",
    logo: "SLB",
    role: "Field Service Manager",
    period: "2020 - 2022",
    location: "South Australia (Cooper Basin)",
    description:
      "Full P&L accountability for $12M annual operation during COVID-19 crisis. Led 50+ engineers through unprecedented challenges while scaling operations and maintaining exceptional safety and service quality standards.",
    achievements: [
      "Managed full P&L through COVID - strategic downsizing then rapid scale-up",
      "Tripled truck operations, growing revenue from $4M to $8.5M annually",
      "Achieved ZERO safety incidents (down from 96% TRIF) through culture change",
      "Maintained 95% service quality despite interstate travel restrictions",
    ],
    technologies: ["Operations Management", "P&L", "Team Leadership", "Crisis Management"],
    color: "amber",
  },
]

export function ExperienceSection() {
  const { ref, isVisible, animationClass } = useAnimateIn<HTMLElement>({
    threshold: 0.1,
  })

  return (
    <section
      id="experience"
      ref={ref}
      className={cn("section-spacing animate-in", isVisible && "is-visible", animationClass)}
    >
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="label-text mb-4 block">Experience</span>
          <h2 className="section-title gradient-text-white mb-6">
            From Field Operations <br />
            <span className="gradient-text">To Global Tech Leadership</span>
          </h2>
          <p className="statement text-white/60">
            14+ years progressing from frontline operations to building AI systems at global headquarters—with P&L accountability at every level.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-cyan via-brand-purple to-brand-emerald opacity-30 hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={cn(
                  "relative grid md:grid-cols-2 gap-8 md:gap-16",
                  index % 2 === 1 && "md:direction-rtl"
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 hidden md:block">
                  <div className="w-4 h-4 rounded-full bg-brand-obsidian border-2 border-brand-cyan shadow-lg shadow-brand-cyan/30" />
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "md:direction-ltr",
                    index % 2 === 0 ? "md:pr-16" : "md:col-start-2 md:pl-16"
                  )}
                >
                  <GlassCard>
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg",
                          exp.color === "cyan" && "bg-brand-cyan/10 text-brand-cyan",
                          exp.color === "purple" && "bg-brand-purple/10 text-brand-purple",
                          exp.color === "emerald" && "bg-brand-emerald/10 text-brand-emerald",
                          exp.color === "amber" && "bg-brand-amber/10 text-brand-amber"
                        )}
                      >
                        {exp.logo}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {exp.role}
                        </h3>
                        <p className="text-white/60 flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-white/50">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span>{exp.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2 mb-6">
                      {exp.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm text-white/60"
                        >
                          <ArrowUpRight className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
