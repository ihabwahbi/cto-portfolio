"use client"

import { motion } from "motion/react"
import { Building2, Calendar, ArrowUpRight } from "lucide-react"
import { GlassCard, Badge } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { cn } from "@/lib/utils"

const experiences = [
  {
    company: "TechCorp Global",
    logo: "TC",
    role: "VP of Engineering",
    period: "2021 - Present",
    location: "San Francisco, CA",
    description:
      "Leading 200+ engineers across 5 product verticals. Drove architectural transformation to microservices, reducing deployment time by 80%.",
    achievements: [
      "Scaled engineering org from 80 to 200+ engineers",
      "Led $500M platform modernization initiative",
      "Achieved 99.99% platform uptime",
      "Reduced infrastructure costs by 40%",
    ],
    technologies: ["Kubernetes", "AWS", "Go", "React", "PostgreSQL"],
    color: "cyan",
  },
  {
    company: "InnovateTech Inc",
    logo: "IT",
    role: "Senior Director of Engineering",
    period: "2018 - 2021",
    location: "New York, NY",
    description:
      "Built and led the platform engineering organization. Architected real-time data processing systems handling 10M+ events/second.",
    achievements: [
      "Built engineering team from 0 to 60",
      "Launched 3 major product lines",
      "Implemented ML-powered recommendations",
      "Drove 150% revenue growth",
    ],
    technologies: ["Python", "Kafka", "Spark", "TensorFlow", "GCP"],
    color: "purple",
  },
  {
    company: "StartupXYZ",
    logo: "SX",
    role: "Engineering Manager",
    period: "2015 - 2018",
    location: "Austin, TX",
    description:
      "First engineering hire. Built the technical foundation and scaled the team through Series A to C funding rounds.",
    achievements: [
      "Grew from seed to $50M Series C",
      "Built core product from scratch",
      "Established engineering culture",
      "Led technical due diligence for acquisition",
    ],
    technologies: ["Node.js", "React", "MongoDB", "Redis", "Docker"],
    color: "emerald",
  },
  {
    company: "Enterprise Systems Co",
    logo: "ES",
    role: "Senior Software Engineer",
    period: "2011 - 2015",
    location: "Seattle, WA",
    description:
      "Core contributor to enterprise cloud platform. Led migration of legacy systems to cloud-native architecture.",
    achievements: [
      "Architected microservices framework",
      "Mentored 15+ junior engineers",
      "Filed 3 patents",
      "Promoted twice in 4 years",
    ],
    technologies: ["Java", "Spring", "AWS", "MySQL", "Elasticsearch"],
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
            A Journey of <br />
            <span className="gradient-text">Impact & Growth</span>
          </h2>
          <p className="statement text-white/60">
            15+ years of progressive leadership across startups and Fortune 500 companies.
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
