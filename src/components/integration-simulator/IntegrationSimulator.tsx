import { Calendar, Clock, FileText, Heart, Users, Wallet } from 'lucide-react'
import { FadeIn } from '../../builder-ui'
import type { IntegrationDataSource, IntegrationFlowStep, IntegrationMethod } from '../../types/intelligenceModules'
import { GlassPanel } from '../intelligence-center/GlassPanel'

const sourceIcons: Record<string, typeof Calendar> = {
  calendar: Calendar,
  users: Users,
  wallet: Wallet,
  file: FileText,
  heart: Heart,
  clock: Clock,
}

interface IntegrationFlowProps {
  steps: IntegrationFlowStep[]
}

export function IntegrationFlow({ steps }: IntegrationFlowProps) {
  return (
    <FadeIn>
      <GlassPanel glow className="p-6 lg:p-10">
        <h2 className="font-display text-xl font-bold text-fg-strong mb-8 text-center">Como a inteligência se conecta</h2>
        <div className="flex flex-col items-center gap-0 max-w-md mx-auto">
          {steps.map((step, i) => (
            <div key={step.id} className="w-full flex flex-col items-center">
              <div className="w-full rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] to-transparent p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Etapa {i + 1}</p>
                <h3 className="font-display font-bold text-fg-strong mb-1">{step.titulo}</h3>
                <p className="text-sm text-text-muted">{step.descricao}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="flex flex-col items-center py-2 text-primary/40">
                  <span className="w-px h-6 bg-primary/20" />
                  <span className="text-lg leading-none">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </GlassPanel>
    </FadeIn>
  )
}

interface IntegrationCardsProps {
  dataSources: IntegrationDataSource[]
  methods: IntegrationMethod[]
}

export function IntegrationCards({ dataSources, methods }: IntegrationCardsProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
      <FadeIn delay={0.1}>
        <GlassPanel className="p-6 lg:p-8 h-full">
          <h2 className="font-display text-xl font-bold text-fg-strong mb-2">Dados que podemos analisar</h2>
          <p className="text-sm text-text-muted mb-6">Conectados ao seu sistema atual — sem substituí-lo.</p>
          <div className="grid grid-cols-2 gap-3">
            {dataSources.map((src) => {
              const Icon = sourceIcons[src.icon] ?? FileText
              return (
                <div
                  key={src.id}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-100/80 dark:border-white/[0.06] bg-surface/50 dark:bg-white/[0.02]"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary-light" />
                  </div>
                  <span className="text-sm font-medium text-fg-secondary">{src.label}</span>
                </div>
              )
            })}
          </div>
        </GlassPanel>
      </FadeIn>

      <FadeIn delay={0.15}>
        <GlassPanel className="p-6 lg:p-8 h-full">
          <h2 className="font-display text-xl font-bold text-fg-strong mb-2">Formas possíveis de integração</h2>
          <p className="text-sm text-text-muted mb-6">Flexível conforme o sistema da clínica.</p>
          <div className="space-y-3">
            {methods.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-xl border border-gray-100/80 dark:border-white/[0.06] hover:border-primary/20 transition-colors"
              >
                <p className="font-semibold text-fg-strong text-sm mb-1">{m.label}</p>
                <p className="text-xs text-text-muted leading-relaxed">{m.descricao}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </FadeIn>
    </div>
  )
}
