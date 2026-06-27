import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button, FadeIn } from '../../builder-ui'

export function FinalCtaSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-[0.97]" />
      <div className="absolute inset-0 landing-shimmer opacity-30" />
      <div className="landing-orb absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="landing-orb-delayed absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-primary-light/20 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          <p className="text-sm font-semibold text-white/70 uppercase tracking-[0.2em] mb-6">
            Pronto para crescer?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Se você tivesse isso há 3 anos,
            <br />
            quanto teria economizado?
          </h2>
          <p className="text-lg text-white/75 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Centenas de milhares de reais. Agora imagine os próximos 3 anos com o ProOdonto Smart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button
                variant="secondary"
                size="xl"
                icon={<Sparkles className="w-5 h-5" />}
                className="bg-white text-primary hover:bg-white/95 shadow-elevated border-0 w-full sm:w-auto"
              >
                Quero recuperar meu faturamento
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                size="xl"
                className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Acessar demonstração
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
