import { Target } from 'lucide-react'
import { FadeIn } from '../../builder-ui'
import type { ExecutiveDecision } from '../../builder-intelligence/types/executive'
import { DecisionCard } from './DecisionCard'
import { GlassPanel } from './GlassPanel'

interface DailyMissionProps {
  missoes: ExecutiveDecision[]
  onExecute?: (decision: ExecutiveDecision) => void
}

export function DailyMission({ missoes, onExecute }: DailyMissionProps) {
  return (
    <FadeIn delay={0.14}>
      <GlassPanel glow className="p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary-light" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-fg-strong">Missões do dia</h2>
            <p className="text-sm text-text-muted">{missoes.length} ações priorizadas pela IA</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {missoes.map((missao, index) => (
            <DecisionCard key={missao.id} decision={missao} index={index} onExecute={onExecute} compact />
          ))}
        </div>
      </GlassPanel>
    </FadeIn>
  )
}
