import { BarChart3, Bot, Clock, Shield, TrendingUp, Wallet } from 'lucide-react'
import { FadeIn } from '../../builder-ui'

const benefits = [
  {
    icon: Wallet,
    title: 'Recupere faturamento oculto',
    desc: 'A IA identifica cobranças, revisões e upsells que sua equipe não tem tempo de perseguir.',
    metric: 'R$ 61k+',
  },
  {
    icon: Clock,
    title: 'Economize horas por dia',
    desc: 'Confirmações, lembretes e rotinas administrativas rodam sozinhas — sua equipe foca no paciente.',
    metric: '2h40/dia',
  },
  {
    icon: TrendingUp,
    title: 'Decisões em 30 segundos',
    desc: 'Centro de Comando, Builder Intelligence™ e dashboards executivos — zero planilha.',
    metric: '30 seg',
  },
  {
    icon: BarChart3,
    title: 'Multiunidade unificada',
    desc: 'Aracaju, Simão Dias, Lagarto — uma visão, um painel, uma estratégia.',
    metric: '3 unidades',
  },
  {
    icon: Bot,
    title: 'IA que age, não só informa',
    desc: 'Diagnóstico, oportunidade, recomendação e ação — em cada interação.',
    metric: '7 engines',
  },
  {
    icon: Shield,
    title: 'Segurança enterprise',
    desc: 'LGPD, criptografia e backup automático. Dados da sua clínica protegidos.',
    metric: 'LGPD',
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Benefícios</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-fg-strong tracking-tight leading-tight mb-5">
            Não é software de cadastro.
            <br />
            <span className="text-gradient">É motor de crescimento.</span>
          </h2>
          <p className="text-lg text-text-muted font-light leading-relaxed">
            Cada recurso existe para você ganhar dinheiro, economizar tempo ou tomar decisões melhores.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {benefits.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.07}>
              <div className="group h-full p-7 lg:p-8 rounded-3xl bg-card border border-gray-100/90 dark:border-white/[0.06] shadow-soft hover:shadow-elevated hover:border-primary/20 hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
                    <b.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/8 px-2.5 py-1 rounded-full">{b.metric}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-fg-strong mb-2 group-hover:text-primary transition-colors">
                  {b.title}
                </h3>
                <p className="text-text-muted font-light leading-relaxed text-[15px]">{b.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
