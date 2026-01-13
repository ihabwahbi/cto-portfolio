"use client"

import { motion } from "motion/react"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { GlassCard, Badge, Button } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Cloud Platform Modernization",
    category: "Enterprise Architecture",
    description:
      "Led complete transformation from monolithic architecture to cloud-native microservices, serving 50M+ daily active users.",
    impact: "$120M annual cost savings",
    technologies: ["Kubernetes", "AWS", "Go", "Terraform"],
    metrics: [
      { label: "Latency Reduction", value: "65%" },
      { label: "Deployment Frequency", value: "100x" },
    ],
    featured: true,
    color: "cyan",
  },
  {
    title: "Real-time Analytics Engine",
    category: "Data Platform",
    description:
      "Architected and built a real-time data processing platform handling 10M+ events per second with sub-second latency.",
    impact: "Enabled ML-powered features",
    technologies: ["Apache Kafka", "Spark", "Python", "ClickHouse"],
    metrics: [
      { label: "Events/Second", value: "10M+" },
      { label: "Processing Latency", value: "<1s" },
    ],
    featured: true,
    color: "purple",
  },
  {
    title: "AI-Powered Recommendations",
    category: "Machine Learning",
    description:
      "Built and deployed ML recommendation system that increased user engagement by 40% and revenue by $50M annually.",
    impact: "$50M revenue increase",
    technologies: ["TensorFlow", "Python", "Redis", "gRPC"],
    metrics: [
      { label: "Engagement Lift", value: "40%" },
      { label: "Model Accuracy", value: "94%" },
    ],
    featured: false,
    color: "emerald",
  },
  {
    title: "Developer Platform",
    category: "Internal Tools",
    description:
      "Created internal developer platform that improved engineering productivity by 60% through automated workflows.",
    impact: "60% productivity gain",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker"],
    metrics: [
      { label: "Dev Productivity", value: "+60%" },
      { label: "Onboarding Time", value: "-75%" },
    ],
    featured: false,
    color: "amber",
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
          <span className="label-text mb-4 block">Featured Work</span>
          <h2 className="section-title gradient-text-white mb-6">
            Projects & <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="statement text-white/60">
            Transformative initiatives that drove significant business impact.
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
                      <button className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                        <Github className="w-4 h-4" />
                      </button>
                      <button className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </button>
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
                  <Badge
                    variant={
                      project.color === "emerald" ? "success" : "warning"
                    }
                    className="mb-3"
                  >
                    {project.category}
                  </Badge>
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
