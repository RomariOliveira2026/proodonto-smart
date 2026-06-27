import { FadeIn } from '../../builder-ui'

const features = [
  { title: 'Centro de Comando', desc: 'Riscos, oportunidades e ações do dia — tudo que precisa da sua atenção agora.', metric: 'Executivo' },
  { title: 'Agenda Inteligente', desc: 'Confirmações automáticas que reduzem faltas em até 40%.', metric: '-40% faltas' },
  { title: 'Financeiro Automatizado', desc: 'Recupere inadimplência sem ligar paciente por paciente.', metric: '+28% recebíveis' },
  { title: 'Inteligência do Paciente', desc: 'Cada paciente é um painel estratégico — LTV, risco e próxima ação.', metric: 'LTV +52%' },
  { title: 'Builder Intelligence™', desc: 'Diretora Executiva Virtual com 7 motores de inteligência.', metric: 'IA ativa' },
  { title: 'Smart Morning', desc: 'Seu dia em 30 segundos. Receita, agenda, metas e alertas.', metric: '07:00 daily' },
]

export function FeaturesSection() {
  return (
    <section id="recursos" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Recursos</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fg-strong tracking-tight mb-4">
            Cada módulo coloca mais dinheiro no seu bolso
          </h2>
          <p className="text-text-muted text-lg font-light">Não é funcionalidade. É resultado financeiro.</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((m, i) => (
            <FadeIn key={m.title} delay={i * 0.06}>
              <div className="group h-full p-7 lg:p-8 rounded-3xl bg-card border border-gray-100 dark:border-white/[0.06] shadow-soft hover:shadow-elevated hover:border-primary/20 hover:-translate-y-1 transition-all duration-500">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-bold mb-4">
                  {m.metric}
                </span>
                <h3 className="font-display text-xl font-bold text-fg-strong mb-2 group-hover:text-primary transition-colors">
                  {m.title}
                </h3>
                <p className="text-text-muted font-light leading-relaxed">{m.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
