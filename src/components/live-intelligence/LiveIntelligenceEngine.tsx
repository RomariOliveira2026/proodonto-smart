import { useNavigate } from 'react-router-dom'
import { FadeIn } from '../../builder-ui'
import { liveIntelligenceSnapshot } from '../../builder-intelligence/data/liveIntelligenceSnapshot'
import type { LiveIntelligenceSnapshot } from '../../builder-intelligence/types/liveIntelligence'
import { useLiveClock } from '../../hooks/useLiveClock'
import { GlassPanel } from '../intelligence-center/GlassPanel'
import { AiNotifications } from './AiNotifications'
import { AiStatus } from './AiStatus'
import { LiveTimeline } from './LiveTimeline'
import { MissionEngine } from './MissionEngine'
import { RecoveryCounter } from './RecoveryCounter'

interface LiveIntelligenceEngineProps {
  data?: LiveIntelligenceSnapshot
  missionActionKey?: string
}

export function LiveIntelligenceEngine({
  data = liveIntelligenceSnapshot,
  missionActionKey = 'cobrar_inadimplentes',
}: LiveIntelligenceEngineProps) {
  const now = useLiveClock()
  const navigate = useNavigate()

  return (
    <FadeIn>
      <GlassPanel glow className="p-6 lg:p-8 mb-8">
        <AiStatus message={data.statusMessage} />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-3">
            <LiveTimeline items={data.activity} now={now} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <RecoveryCounter stats={data.stats} />
            <AiNotifications items={data.notifications} />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100/80 dark:border-white/[0.06]">
          <p className="text-sm text-text-muted mb-4 text-center lg:text-left">
            Quando estiver pronto, eu monto o plano e abro a execução — você só decide e aprova.
          </p>
          <MissionEngine
            steps={data.planSteps}
            onPlanComplete={() => navigate(`/app/execucao/${missionActionKey}`)}
          />
        </div>
      </GlassPanel>
    </FadeIn>
  )
}
