import { AuroraBackground, Navigation, SectionIndicator } from "@/components/layout"
import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  SkillsSection,
  AchievementsSection,
  ProjectsSection,
  TestimonialsSection,
  ContactSection,
  Footer,
} from "@/components/sections"

export default function HomePage() {
  return (
    <>
      {/* Background */}
      <AuroraBackground />

      {/* Navigation */}
      <Navigation />

      {/* Section Indicator */}
      <SectionIndicator />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <AchievementsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
