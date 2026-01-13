"use client"

import { motion } from "motion/react"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { GlassCard, Badge, Button } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "TrueSpend Cost Intelligence",
    category: "Financial Platform",
    description:
      "Built a complete enterprise cost management platform solo in 2 months. Real-time P&L tracking, AI-powered forecasting, and automated variance reporting.",
    impact: "$1.1M-$1.5M platform value",
    technologies: ["Next.js", "TypeScript", "Python", "OpenAI", "Azure"],
    metrics: [
      { label: "Lines of Code", value: "195K" },
      { label: "Build Time", value: "2 months" },
    ],
    featured: true,
    color: "cyan",
    liveUrl: "https://truespend.app",
    githubUrl: "https://github.com/ihabwahbi/cost-management",
  },
  {
    title: "T964 Datacenter Platform",
    category: "Full Business System",
    description:
      "Complete enterprise platform built solo in ONE WEEK: client portal, admin panel, CRM, billing, AI chat advisor, and bilingual Arabic/English support.",
    impact: "$485K-$695K platform value",
    technologies: ["Next.js", "React", "tRPC", "PostgreSQL", "AI"],
    metrics: [
      { label: "Lines of Code", value: "167K" },
      { label: "Build Time", value: "1 week" },
    ],
    featured: true,
    color: "purple",
    liveUrl: "https://t964datacenter.azurewebsites.net",
    githubUrl: "https://github.com/ihabwahbi/t964-datacenter",
  },
  {
    title: "AquaPulse Multi-Agent AI",
    category: "AI System",
    description:
      "Production-grade AI system with multiple specialized agents for demand planning, inventory queries, and operations support. Deployed at global HQ.",
    impact: "20-35% better forecasts",
    technologies: ["Python", "LangGraph", "Neo4j", "OpenAI"],
    metrics: [
      { label: "Agent Types", value: "5" },
      { label: "Accuracy Gain", value: "35%" },
    ],
    featured: false,
    color: "emerald",
    githubUrl: "https://github.com/ihabwahbi/aquapulse-langgraph",
  },
  {
    title: "Operations AI Chatbot",
    category: "Staff Tool",
    description:
      "AI-powered chatbot for operations staff to query inventory, supply chain status, and planning data using natural language instead of complex systems.",
    impact: "70% faster training",
    technologies: ["SvelteKit", "Python", "OpenAI", "Azure"],
    metrics: [
      { label: "Training Time", value: "-70%" },
      { label: "Query Speed", value: "<200ms" },
    ],
    featured: false,
    color: "amber",
    githubUrl: "https://github.com/ihabwahbi/mns-chatbot-sveltekit-jsdoc",
  },
]

export function ProjectsSection() {
  const { ref, isVisible, animationClass } = useAnimateIn<HTMLElement>({
    threshold: 0.1,
  })

  return (
    <section
      id="projects"
      ref={ref}
      className={cn("section-spacing animate-in", isVisible && "is-visible", animationClass)}
    >
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="label-text mb-4 block">What I&apos;ve Built</span>
          <h2 className="section-title gradient-text-white mb-6">
            Systems That <span className="gradient-text">Actually Ship</span>
          </h2>
          <p className="statement text-white/60">
            Real platforms I&apos;ve built solo—production-grade, enterprise-ready, and fast.
          </p>
        </div>

        {/* Featured projects */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8 max-w-6xl mx-auto">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <GlassCard className="h-full flex flex-col group">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <Badge
                      variant={project.color === "cyan" ? "default" : "secondary"}
                    >
                      {project.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Impact highlight */}
                  <div className="p-4 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20 mb-6">
                    <div className="flex items-center gap-2 text-brand-cyan">
                      <ArrowUpRight className="w-5 h-5" />
                      <span className="font-semibold">{project.impact}</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="text-center p-3 rounded-lg bg-white/[0.02]">
                        <div className="text-lg font-bold text-white">
                          {metric.value}
                        </div>
                        <div className="text-xs text-white/50">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
        </div>

        {/* Other projects */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {projects
            .filter((p) => !p.featured)
            .map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="h-full group">
                  <div className="flex items-start justify-between mb-3">
                    <Badge
                      variant={
                        project.color === "emerald" ? "success" : "warning"
                      }
                    >
                      {project.category}
                    </Badge>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}
