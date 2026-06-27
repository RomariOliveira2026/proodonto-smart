import { AlertTriangle, Lightbulb, ListChecks } from 'lucide-react'
import { FadeIn } from '../../builder-ui'
import type { ExecutiveDecision } from '../../builder-intelligence/types/executive'
import { DecisionCard } from './DecisionCard'
import { GlassPanel } from './GlassPanel'

interface GrowthSuggestionsProps {
  oportunidades: ExecutiveDecision[]
  riscos: ExecutiveDecision[]
  planoAcao: ExecutiveDecision[]
  onExecute?: (decision: ExecutiveDecision) => void
}

export function GrowthSuggestions({
  oportunidades,
  riscos,
  planoAcao,
  onExecute,
}: GrowthSuggestionsProps) {
  return (
    <div className="space-y-8 lg:space-y-10">
      <FadeIn delay={0.1}>
        <section>
          <div className="flex items-center gap-3 mb-5">
            <ListChecks className="w-5 h-5 text-primary-light" />
            <h2 className="font-display text-2xl font-bold text-fg-strong">Plano de ação</h2>
          </div>
          <div className="space-y-3">
            {planoAcao.map((d, i) => (
              <DecisionCard key={d.id} decision={d} index={i} onExecute={onExecute} />
            ))}
          </div>
        </section>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-8">
        <FadeIn delay={0.12}>
          <GlassPanel className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-5">
              <Lightbulb className="w-5 h-5 text-primary-light" />
              <h2 className="font-display text-xl font-bold text-fg-strong">Oportunidades</h2>
            </div>
            <div className="space-y-3">
              {oportunidades.map((d, i) => (
                <DecisionCard key={d.id} decision={d} index={i} onExecute={onExecute} compact />
              ))}
            </div>
          </GlassPanel>
        </FadeIn>

        <FadeIn delay={0.14}>
          <GlassPanel className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-xl font-bold text-fg-strong">Riscos</h2>
            </div>
            <div className="space-y-3">
              {riscos.map((d, i) => (
                <DecisionCard key={d.id} decision={d} index={i} onExecute={onExecute} compact />
              ))}
            </div>
          </GlassPanel>
        </FadeIn>
      </div>
    </div>
  )
}
