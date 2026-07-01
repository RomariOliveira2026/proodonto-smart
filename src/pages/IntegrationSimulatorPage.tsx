import { PlugZap } from 'lucide-react'
import { Badge, FadeIn } from '../builder-ui'
import {
  integrationDataSources,
  integrationFlowSteps,
  integrationMethods,
} from '../data/integrationSimulator'
import { IntegrationCards, IntegrationFlow } from '../components/integration-simulator/IntegrationSimulator'

export function IntegrationSimulatorPage() {
  return (
    <div className="space-y-8 max-w-[1600px]">
      <FadeIn>
        <Badge variant="primary" dot>Camada conectável</Badge>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-fg-strong tracking-tight mt-3">
          Simulador de Integração
        </h1>
        <p className="text-text-muted font-light mt-2 max-w-2xl">
          Veja como o ProOdonto Smart funcionaria conectado ao sistema odontológico que sua clínica já utiliza — sem substituí-lo no primeiro momento.
        </p>
      </FadeIn>

      <IntegrationFlow steps={integrationFlowSteps} />
      <IntegrationCards dataSources={integrationDataSources} methods={integrationMethods} />

      <FadeIn delay={0.2}>
        <div className="flex gap-4 p-6 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20">
          <PlugZap className="w-5 h-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-fg-strong text-sm mb-1">Fase piloto</p>
            <p className="text-sm text-text-muted leading-relaxed">
              Na fase piloto, a integração pode começar de forma simples com exportação de dados, sem trocar o sistema atual da clínica.
            </p>
            <p className="text-xs text-text-muted mt-3 italic">
              A integração depende da disponibilidade técnica do sistema utilizado pela clínica.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
