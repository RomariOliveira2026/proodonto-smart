import { Quote, Star } from 'lucide-react'
import { FadeIn } from '../../builder-ui'

const testimonials = [
  {
    name: 'João Thales',
    role: 'Sócio-Administrador · Lagarto',
    text: 'Abro o Centro de Comando e em 30 segundos sei exatamente onde está o dinheiro. Não volto para planilha.',
    metric: '+R$ 48k recuperados',
  },
  {
    name: 'Dra. Patrícia Almeida',
    role: 'Diretora Clínica · Aracaju',
    text: 'A Inteligência do Paciente mudou como vendemos tratamentos. Vejo oportunidade antes da consulta acabar.',
    metric: '+35% conversão',
  },
  {
    name: 'Carlos Mendes',
    role: 'Gestor Financeiro · Simão Dias',
    text: 'Inadimplência caiu 28% em 90 dias. A rotina inteligente cobra, confirma e atualiza o CRM sozinha.',
    metric: '-28% inadimplência',
  },
]

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 lg:py-32 bg-surface/50 dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Depoimentos</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fg-strong tracking-tight mb-4">
            Quem usa, não volta atrás
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
            <span className="ml-2 text-sm text-text-muted font-medium">4.9 · 127 clínicas</span>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className="h-full p-8 rounded-3xl bg-card border border-gray-100 dark:border-white/[0.06] shadow-soft hover:shadow-elevated transition-all duration-500 flex flex-col">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-fg-secondary font-light leading-relaxed flex-1 mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-white/[0.06]">
                  <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {t.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-fg-strong text-sm">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
                <span className="inline-block mt-4 text-xs font-bold text-success bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full w-fit">
                  {t.metric}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
