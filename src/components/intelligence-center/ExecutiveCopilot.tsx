import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FadeIn, useToast } from '../../builder-ui'
import {
  buildExecutiveAnswer,
  createExecutiveContext,
  getExecutiveBriefing,
} from '../../builder-intelligence'
import type {
  DailyMissionFocus,
  ExecutiveAnswer,
  ExecutiveDecision,
  QuickQuestion,
} from '../../builder-intelligence/types/executive'
import { useAuth } from '../../contexts/AuthContext'
import { useLiveClock } from '../../hooks/useLiveClock'
import { DailyMission } from './DailyMission'
import { ExecutiveSummary } from './ExecutiveSummary'
import { GrowthSuggestions } from './GrowthSuggestions'
import { IntelligentTimeline } from './IntelligentTimeline'
import { QuickQuestions } from './QuickQuestions'
import { RevenueRecovered } from './RevenueRecovered'
import { LiveIntelligenceEngine } from '../live-intelligence'

export function ExecutiveCopilot() {
  const now = useLiveClock()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { user, organization } = useAuth()
  const nome = user?.nome ?? 'João Thales'

  const ctx = useMemo(
    () =>
      createExecutiveContext({
        nome,
        cargo: user?.cargo ?? 'Sócio-Administrador',
        unidade: organization?.city ?? 'Lagarto',
      }),
    [nome, user?.cargo, organization?.city],
  )

  const briefing = useMemo(() => getExecutiveBriefing(ctx), [ctx])

  const handleExecuteDecision = (decision: ExecutiveDecision) => {
    if (decision.actionKey.includes('cobrar') || decision.actionKey.includes('confirmar')) {
      navigate(`/app/execucao/${decision.actionKey}`)
      return
    }
    showToast(
      `Executando agora: ${decision.problema} · ${decision.impactoFinanceiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}`,
    )
    if (decision.actionKey.includes('orcamento') || decision.actionKey.includes('reativar')) {
      navigate('/app/oportunidades')
    }
  }

  const handleExecuteMission = (missao: DailyMissionFocus) => {
    navigate(`/app/execucao/${missao.actionKey}`)
  }

  const handleAsk = useCallback(
    (pergunta: QuickQuestion) => buildExecutiveAnswer(pergunta.queryKey, ctx),
    [ctx],
  )

  const handleExecuteAnswer = (answer: ExecutiveAnswer) => {
    showToast(answer.mensagem.slice(0, 120) + (answer.mensagem.length > 120 ? '…' : ''))
    navigate('/app/oportunidades')
  }

  return (
    <div className="space-y-10 lg:space-y-14 max-w-[1600px]">
      <FadeIn>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-text-muted text-center lg:text-left">
          Centro de Inteligência · Builder Intelligence Engine™
        </p>
      </FadeIn>

      <LiveIntelligenceEngine missionActionKey={briefing.missaoDoDia.actionKey} />

      <ExecutiveSummary
        nome={nome}
        now={now}
        briefing={briefing}
        onScrollToMission={() => document.getElementById('missao-do-dia')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      />

      <DailyMission missao={briefing.missaoDoDia} onExecute={handleExecuteMission} />

      <RevenueRecovered data={briefing.receitaRecuperada} variacaoPercent={briefing.receitaRecuperadaVariacao} />

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        <QuickQuestions
          perguntas={briefing.perguntasRapidas}
          onAsk={handleAsk}
          onExecuteAnswer={handleExecuteAnswer}
        />
        <IntelligentTimeline items={briefing.timeline} />
      </div>

      <GrowthSuggestions
        oportunidades={briefing.oportunidades}
        riscos={briefing.riscos}
        planoAcao={briefing.planoAcao}
        onExecute={handleExecuteDecision}
      />
    </div>
  )
}
