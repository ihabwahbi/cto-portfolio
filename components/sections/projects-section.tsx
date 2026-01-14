"use client"

import { motion } from "motion/react"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { GlassCard, Badge, Button } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Enterprise Cost Management Platform",
    category: "Business Intelligence",
    description:
      "Complete cost intelligence system with real-time P&L tracking, automated reporting, and predictive forecasting. Replaced manual spreadsheet processes with instant visibility.",
    impact: "80% faster reporting",
    technologies: ["Dashboards", "Automation", "Cloud", "Analytics"],
    metrics: [
      { label: "Report Time", value: "-80%" },
      { label: "Visibility", value: "Real-time" },
    ],
    featured: true,
    color: "cyan",
    liveUrl: "https://truespend.app",
    githubUrl: "https://github.com/ihabwahbi/cost-management",
  },
  {
    title: "Multi-Site Operations Platform",
    category: "Business System",
    description:
      "End-to-end business platform with client portal, CRM, billing, and bilingual Arabic/English support. Demonstrates ability to deliver complete business solutions rapidly.",
    impact: "Full digital operations",
    technologies: ["Web Platform", "CRM", "Billing", "Mobile-Ready"],
    metrics: [
      { label: "Modules", value: "8+" },
      { label: "Languages", value: "AR/EN" },
    ],
    featured: true,
    color: "purple",
    liveUrl: "https://t964datacenter.azurewebsites.net",
    githubUrl: "https://github.com/ihabwahbi/t964-datacenter",
  },
  {
    title: "Demand Forecasting System",
    category: "Planning Tool",
    description:
      "Intelligent forecasting system that significantly improved prediction accuracy over legacy methods. Helps leadership plan resources and manage inventory proactively.",
    impact: "35% more accurate",
    technologies: ["AI/ML", "Analytics", "Integration"],
    metrics: [
      { label: "Accuracy", value: "+35%" },
      { label: "Planning", value: "Proactive" },
    ],
    featured: false,
    color: "emerald",
    githubUrl: "https://github.com/ihabwahbi/aquapulse-langgraph",
  },
  {
    title: "Staff Self-Service Assistant",
    category: "Operations Tool",
    description:
      "Easy-to-use tool allowing staff to query inventory and supply chain data using natural language. Reduced training time and improved information access across teams.",
    impact: "70% faster onboarding",
    technologies: ["AI Chat", "Self-Service", "Mobile"],
    metrics: [
      { label: "Training", value: "-70%" },
      { label: "Access", value: "Instant" },
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
          <span className="label-text mb-4 block">Solutions Delivered</span>
          <h2 className="section-title gradient-text-white mb-6">
            Technology That <span className="gradient-text">Drives Business</span>
          </h2>
          <p className="statement text-white/60">
            Real platforms delivering measurable business value—from concept to production.
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
