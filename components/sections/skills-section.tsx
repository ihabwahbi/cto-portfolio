"use client"

import { motion } from "motion/react"
import {
  Code2,
  Cloud,
  Database,
  Brain,
  Users,
  TrendingUp,
  Shield,
  Workflow,
} from "lucide-react"
import { GlassCard } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { cn } from "@/lib/utils"

const skillCategories = [
  {
    title: "Technical Leadership",
    icon: Code2,
    color: "cyan",
    skills: [
      { name: "System Architecture", level: 95 },
      { name: "Technical Strategy", level: 92 },
      { name: "Code Review & Standards", level: 90 },
      { name: "Performance Optimization", level: 88 },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    color: "purple",
    skills: [
      { name: "AWS / GCP / Azure", level: 94 },
      { name: "Kubernetes & Docker", level: 92 },
      { name: "CI/CD Pipelines", level: 90 },
      { name: "Infrastructure as Code", level: 88 },
    ],
  },
  {
    title: "Data & AI/ML",
    icon: Brain,
    color: "emerald",
    skills: [
      { name: "Data Architecture", level: 88 },
      { name: "Machine Learning", level: 82 },
      { name: "Analytics & BI", level: 85 },
      { name: "Real-time Processing", level: 90 },
    ],
  },
  {
    title: "Engineering Management",
    icon: Users,
    color: "amber",
    skills: [
      { name: "Team Building", level: 96 },
      { name: "Agile / Scrum", level: 94 },
      { name: "Mentorship", level: 95 },
      { name: "Cross-functional Leadership", level: 92 },
    ],
  },
]

const technologies = [
  "TypeScript", "Python", "Go", "Java", "Rust", "SQL",
  "React", "Node.js", "GraphQL", "gRPC",
  "PostgreSQL", "MongoDB", "Redis", "Elasticsearch",
  "Kubernetes", "Terraform", "AWS", "GCP",
  "Kafka", "RabbitMQ", "Apache Spark",
  "TensorFlow", "PyTorch", "OpenAI",
]

export function SkillsSection() {
  const { ref, isVisible, animationClass } = useAnimateIn<HTMLElement>({
    threshold: 0.1,
  })

  return (
    <section
      id="skills"
      ref={ref}
      className={cn("section-spacing animate-in", isVisible && "is-visible", animationClass)}
    >
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="label-text mb-4 block">Skills & Expertise</span>
          <h2 className="section-title gradient-text-white mb-6">
            Technical <span className="gradient-text">Mastery</span>
          </h2>
          <p className="statement text-white/60">
            Deep expertise across the full technology stack, from architecture to execution.
          </p>
        </div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="h-full">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      category.color === "cyan" && "bg-brand-cyan/10 text-brand-cyan",
                      category.color === "purple" && "bg-brand-purple/10 text-brand-purple",
                      category.color === "emerald" && "bg-brand-emerald/10 text-brand-emerald",
                      category.color === "amber" && "bg-brand-amber/10 text-brand-amber"
                    )}
                  >
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/80">{skill.name}</span>
                        <span className="text-white/50">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className={cn(
                            "h-full rounded-full",
                            category.color === "cyan" && "bg-gradient-to-r from-brand-cyan/50 to-brand-cyan",
                            category.color === "purple" && "bg-gradient-to-r from-brand-purple/50 to-brand-purple",
                            category.color === "emerald" && "bg-gradient-to-r from-brand-emerald/50 to-brand-emerald",
                            category.color === "amber" && "bg-gradient-to-r from-brand-amber/50 to-brand-amber"
                          )}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Technologies cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold text-white/80 mb-6">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                viewport={{ once: true }}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm hover:border-brand-cyan/30 hover:text-white transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
