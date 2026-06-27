import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FadeIn, useToast } from '../../builder-ui'
import {
  createExecutiveContext,
  getExecutiveBriefing,
} from '../../builder-intelligence'
import type { ExecutiveDecision } from '../../builder-intelligence/types/executive'
import { useAuth } from '../../contexts/AuthContext'
import { useLiveClock } from '../../hooks/useLiveClock'
import { ClinicFeed } from './ClinicFeed'
import { DailyMission } from './DailyMission'
import { ExecutiveSummary } from './ExecutiveSummary'
import { GrowthSuggestions } from './GrowthSuggestions'
import { RevenueInsights } from './RevenueInsights'
import { RevenueRecovered } from './RevenueRecovered'

export function ExecutiveCopilot() {
  const now = useLiveClock()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { user, organization } = useAuth()
  const nome = user?.nome ?? 'João Thales'

  const briefing = useMemo(() => {
    const ctx = createExecutiveContext({
      nome,
      cargo: user?.cargo ?? 'Sócio-Administrador',
      unidade: organization?.city ?? 'Lagarto',
    })
    return getExecutiveBriefing(ctx)
  }, [nome, user?.cargo, organization?.city])

  const handleExecute = (decision: ExecutiveDecision) => {
    showToast(`Executando: ${decision.problema} · impacto ${decision.impactoFinanceiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}`)
    if (decision.actionKey.includes('orcamento') || decision.actionKey.includes('reativar')) {
      navigate('/app/oportunidades')
    }
  }

  return (
    <div className="space-y-10 lg:space-y-14 max-w-[1600px]">
      <FadeIn>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-text-muted text-center lg:text-left">
          Centro de Inteligência · Builder Intelligence Engine™
        </p>
      </FadeIn>

      <ExecutiveSummary nome={nome} now={now} briefing={briefing} />

      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-3">
          <RevenueInsights
            receitaRecuperavel={briefing.receitaRecuperavel}
            insights={briefing.revenueInsights}
          />
        </div>
        <div className="lg:col-span-2">
          <RevenueRecovered
            valorMes={briefing.receitaRecuperadaMes}
            variacaoPercent={briefing.receitaRecuperadaVariacao}
          />
        </div>
      </div>

      <GrowthSuggestions
        oportunidades={briefing.oportunidades}
        riscos={briefing.riscos}
        planoAcao={briefing.planoAcao}
        onExecute={handleExecute}
      />

      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-3">
          <DailyMission missoes={briefing.missoes} onExecute={handleExecute} />
        </div>
        <div className="lg:col-span-2">
          <ClinicFeed items={briefing.feed} />
        </div>
      </div>
    </div>
  )
}
