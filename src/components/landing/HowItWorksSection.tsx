import { FadeIn } from '../../builder-ui'

const steps = [
  {
    step: '01',
    title: 'Conecte sua operação',
    desc: 'Importe pacientes, agenda e financeiro. A IA mapeia sua clínica em minutos — sem migração complexa.',
  },
  {
    step: '02',
    title: 'A IA analisa tudo',
    desc: 'Builder Intelligence™ encontra riscos, oportunidades e receita recuperável antes de você abrir o e-mail.',
  },
  {
    step: '03',
    title: 'Execute com um clique',
    desc: 'Rotina inteligente: confirmar consultas, cobrar parcelas, disparar campanhas e atualizar o CRM automaticamente.',
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24 lg:py-32 bg-surface/50 dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16 lg:mb-20">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Como funciona</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fg-strong tracking-tight mb-4">
            Da análise à ação em 3 passos
          </h2>
          <p className="text-lg text-text-muted font-light max-w-2xl mx-auto">
            Sem curva de aprendizado de ERP. Você abre o painel e já sabe o que fazer.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 relative">
          <div className="hidden lg:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {steps.map((s, i) => (
            <FadeIn key={s.step} delay={i * 0.12}>
              <div className="relative text-center lg:text-left p-8 rounded-3xl bg-card border border-gray-100 dark:border-white/[0.06] shadow-soft hover:shadow-elevated transition-shadow duration-500">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl font-display text-2xl font-bold text-white gradient-primary shadow-glow mb-6">
                  {s.step}
                </span>
                <h3 className="font-display text-xl font-bold text-fg-strong mb-3">{s.title}</h3>
                <p className="text-text-muted font-light leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
