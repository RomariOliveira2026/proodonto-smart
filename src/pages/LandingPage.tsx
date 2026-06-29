import { ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Button, FadeIn, PageLoader } from '../builder-ui'
import { LandingHeader } from '../components/landing/LandingHeader'
import { LandingFooter } from '../components/landing/LandingFooter'
import { LandingSchema } from '../components/landing/LandingSchema'
import { HeroDashboard } from '../components/landing/HeroDashboard'
import { LossCalculator } from '../components/landing/LossCalculator'
import { BeforeAfter } from '../components/landing/BeforeAfter'
import { BenefitsSection } from '../components/landing/BenefitsSection'
import { HowItWorksSection } from '../components/landing/HowItWorksSection'
import { FeaturesSection } from '../components/landing/FeaturesSection'
import { TestimonialsSection } from '../components/landing/TestimonialsSection'
import { FaqSection } from '../components/landing/FaqSection'
import { FinalCtaSection } from '../components/landing/FinalCtaSection'
import '../components/landing/landing.css'

const trustBadges = ['LGPD', 'Dados criptografados', 'Backup automático', 'Builder Intelligence™']

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <PageLoader duration={550} />
      <LandingSchema />

      <div className="min-h-screen bg-bg overflow-x-hidden">
        <LandingHeader
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen(!menuOpen)}
          onNavClick={() => setMenuOpen(false)}
        />

        {/* Hero */}
        <section className="relative pt-28 lg:pt-40 pb-20 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 gradient-mesh" />
          <div className="landing-orb absolute top-20 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="landing-orb-delayed absolute bottom-0 -right-40 w-[400px] h-[400px] rounded-full bg-primary-light/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="max-w-xl lg:max-w-none">
                <FadeIn>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 dark:bg-primary/15 border border-primary/15 mb-8">
                    <Sparkles className="w-4 h-4 text-primary-light" />
                    <span className="text-xs font-semibold text-primary tracking-wide">
                      Powered by Builder Intelligence™
                    </span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.08}>
                  <h1 className="font-display text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-[3.75rem] font-extrabold text-fg-strong leading-[1.08] tracking-tight mb-7">
                    Sua clínica perde dinheiro todos os dias
                    <span className="text-gradient"> — e talvez você nem perceba.</span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.16}>
                  <p className="text-lg sm:text-xl text-text-muted font-light leading-relaxed mb-4 max-w-lg">
                    Pacientes faltam. Parcelas atrasam. Horários ficam vazios. Tratamentos deixam de ser vendidos.
                  </p>
                  <p className="text-lg font-medium text-fg-secondary mb-10">
                    O ProOdonto Smart automatiza tudo isso — e a IA encontra o dinheiro antes de você.
                  </p>
                </FadeIn>

                <FadeIn delay={0.24}>
                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <Button
                      to="/login"
                      variant="glow"
                      size="xl"
                      fullWidth
                      icon={<Sparkles className="w-5 h-5" />}
                      className="sm:flex-1 lg:flex-none shadow-glow"
                    >
                      Recuperar meu faturamento
                    </Button>
                    <Button
                      href="#calculadora"
                      variant="outline"
                      size="xl"
                      fullWidth
                      className="sm:flex-1 lg:flex-none group"
                    >
                      Ver demonstração
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </FadeIn>

                <FadeIn delay={0.32}>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {trustBadges.map((badge) => (
                      <span key={badge} className="text-xs font-medium text-text-muted flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-success" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </FadeIn>
              </div>

              <div className="lg:pl-4">
                <HeroDashboard />
              </div>
            </div>
          </div>
        </section>

        <BenefitsSection />
        <HowItWorksSection />
        <LossCalculator />
        <BeforeAfter />
        <FeaturesSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCtaSection />
        <LandingFooter />
      </div>
    </>
  )
}
