import { X, Check } from 'lucide-react'
import { FadeIn } from '../../builder-ui'

const antes = [
  'Agenda bagunçada',
  'Cobranças manuais',
  'WhatsApp lotado',
  'Pacientes esquecem consultas',
  'Horários vazios',
]

const depois = [
  'Agenda Inteligente',
  'IA Comercial',
  'CRM integrado',
  'Financeiro Automatizado',
  'Confirmações Automáticas',
  'Retorno Inteligente',
]

export function BeforeAfter() {
  return (
    <section id="comparativo" className="py-24 lg:py-32 bg-surface/80 dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16 lg:mb-20">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Comparativo</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fg-strong tracking-tight mb-4">
            Antes x Depois
          </h2>
          <p className="text-lg text-text-muted font-light max-w-2xl mx-auto">
            A transformação que seu faturamento precisa — em uma única plataforma.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <FadeIn direction="left">
            <div className="h-full p-8 lg:p-10 rounded-3xl bg-card border border-red-100/80 dark:border-red-900/30 shadow-soft relative overflow-hidden transition-shadow duration-300 hover:shadow-elevated">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 dark:bg-red-950/40 rounded-bl-full opacity-60" />
              <div className="relative">
                <span className="inline-block px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/50 text-error text-xs font-bold uppercase tracking-wider mb-6">
                  Antes do ProOdonto Smart
                </span>
                <ul className="space-y-5">
                  {antes.map((item) => (
                    <li key={item} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center shrink-0">
                        <X className="w-4 h-4 text-error" />
                      </div>
                      <span className="text-fg-secondary font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div className="h-full p-8 lg:p-10 rounded-3xl gradient-primary text-white shadow-elevated relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6">
                  Depois do ProOdonto Smart
                </span>
                <ul className="space-y-5">
                  {depois.map((item) => (
                    <li key={item} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
