import { Bot, Sparkles } from 'lucide-react'
import { FadeIn, Button } from '../builder-ui'
import { useBuilderIntelligence } from '../builder-intelligence'

const capabilities = [
  { engine: 'Decision Engine', desc: 'Interpretação de indicadores por unidade' },
  { engine: 'Revenue Engine', desc: 'Receita oculta e recuperável' },
  { engine: 'Risk Engine', desc: 'Riscos operacionais priorizados' },
  { engine: 'Prediction Engine', desc: 'Previsão de faturamento' },
  { engine: 'Recommendation Engine', desc: 'Quem ligar e o que oferecer' },
  { engine: 'Automation Engine', desc: 'Rotinas inteligentes automáticas' },
]

export function IAAssistentePage() {
  const { setOpen } = useBuilderIntelligence()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 via-card to-primary-light/5 p-8 lg:p-10">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-light/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow shrink-0">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Builder Intelligence™</p>
              <h1 className="font-display text-3xl font-bold text-fg-strong tracking-tight">
                Sua Diretora Executiva Virtual
              </h1>
              <p className="text-text-muted font-light mt-2 max-w-xl leading-relaxed">
                Não é um chatbot. É inteligência executiva — diagnóstico, oportunidade, recomendação e ação em cada resposta.
              </p>
            </div>
            <Button variant="glow" size="lg" onClick={() => setOpen(true)} icon={<Sparkles className="w-5 h-5" />}>
              Abrir Intelligence
            </Button>
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="font-display text-lg font-bold text-fg-strong mb-4">Motores ativos</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {capabilities.map((c) => (
            <div
              key={c.engine}
              className="p-5 rounded-2xl bg-card border border-gray-100 dark:border-border hover:border-primary/20 hover:shadow-soft transition-all"
            >
              <p className="text-sm font-bold text-primary">{c.engine}</p>
              <p className="text-sm text-text-muted mt-1 font-light">{c.desc}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40">
          <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
            <strong>Aviso:</strong> Builder Intelligence™ atua em apoio administrativo, comercial e financeiro.
            Não realiza diagnóstico clínico. Orientações clínicas devem ser confirmadas por profissional habilitado (CRO).
          </p>
        </div>
      </FadeIn>
    </div>
  )
}
