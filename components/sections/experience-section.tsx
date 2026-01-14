"use client"

import { motion } from "motion/react"
import { Building2, Calendar, ArrowUpRight } from "lucide-react"
import { GlassCard, Badge } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { cn } from "@/lib/utils"

const experiences = [
  {
    company: "SLB (Fortune 500)",
    logo: "SLB",
    role: "Resource Strategy & Analytics Manager",
    period: "2025 - Present",
    location: "Perth, Australia",
    description:
      "Leading digital transformation across regional operations. Built real-time cost intelligence and reporting systems that enable leadership to make faster, data-driven decisions across all business lines.",
    achievements: [
      "Created real-time dashboards replacing 30-day manual reporting cycles",
      "Established weekly data-driven decision framework for senior leadership",
      "Reduced manual reporting effort by 80% through process automation",
      "Implemented cost forecasting for proactive budget management",
    ],
    technologies: ["Dashboards", "Automation", "Forecasting", "Cost Control"],
    color: "cyan",
  },
  {
    company: "SLB (Global HQ)",
    logo: "SLB",
    role: "Strategic Planning & Technology Lead",
    period: "2023 - 2024",
    location: "Paris, France",
    description:
      "Selected for global headquarters role to lead technology-driven planning initiatives. Redesigned enterprise systems affecting operations across 120+ countries, improving forecast accuracy and resource allocation.",
    achievements: [
      "Achieved 35% improvement in demand forecast accuracy",
      "Led enterprise system architecture overhaul across global operations",
      "Authored strategic roadmap adopted by executive leadership",
      "Streamlined planning workflows reducing cycle time significantly",
    ],
    technologies: ["Strategic Planning", "Enterprise Systems", "Change Management"],
    color: "purple",
  },
  {
    company: "SLB",
    logo: "SLB",
    role: "Supply Chain & Inventory Manager",
    period: "2022 - 2023",
    location: "Adelaide, Australia",
    description:
      "Established and led supply chain function across Australia, NZ, and PNG. Transformed manual operations into automated, data-driven systems while managing critical enterprise system migration with zero disruption.",
    achievements: [
      "Reduced inventory holding from 160 to 90 days (44% cost saving)",
      "Led major system migration with zero operational disruption",
      "Exceeded $22M revenue target through better resource planning",
      "Created self-service tools reducing staff training time by 70%",
    ],
    technologies: ["Supply Chain", "Inventory", "ERP Migration", "Process Design"],
    color: "emerald",
  },
  {
    company: "SLB",
    logo: "SLB",
    role: "Operations Manager",
    period: "2020 - 2022",
    location: "South Australia",
    description:
      "Full P&L accountability for $12M annual operation across multiple sites. Led 50+ team members through COVID crisis while scaling operations and maintaining exceptional safety and service quality standards.",
    achievements: [
      "Managed $12M P&L through crisis - strategic downsizing then rapid scale-up",
      "Tripled operations capacity, growing revenue from $4M to $8.5M",
      "Achieved ZERO safety incidents through culture transformation",
      "Maintained 95% service quality despite major logistical constraints",
    ],
    technologies: ["P&L Management", "Multi-Site Ops", "Team Leadership", "Crisis Response"],
    color: "amber",
  },
]

export function ExperienceSection() {
  const { ref, isVisible, animationClass } = useAnimateIn<HTMLElement>({
    threshold: 0.1,
    trackAs: "Experience",
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
            From Operations <br />
            <span className="gradient-text">To Executive Leadership</span>
          </h2>
          <p className="statement text-white/60">
            14+ years progressing through operations, supply chain, and technology leadership at a Fortune 500 company.
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
