import type { IntelligenceContext } from '../types'
import type { ExecutiveBriefing } from '../types/executive'
import {
  executiveDecisionsSeed,
  executiveFeedSeed,
  executiveIntroParagraphsSeed,
  executiveMensagemExecutivaSeed,
  executiveMissaoDoDiaSeed,
  executiveQuickQuestionsSeed,
  executiveResumoDiaSeed,
  executiveRevenueInsightsSeed,
  executiveRevenueRecoveredSeed,
  executiveTimelineSeed,
} from '../data/executiveSnapshot'
import { humanizeExecutiveTone } from '../lib/executiveVoice'

/**
 * Builder Intelligence Engine — motor executivo.
 * Ponto único para substituir por pipeline OpenAI / Claude / Gemini + Supabase.
 */
export function runExecutiveEngine(ctx: IntelligenceContext): ExecutiveBriefing {
  const receitaRecuperavel = Number(ctx.indicadores.receitaRecuperavel ?? 12480)
  const riscosCount = Number(ctx.indicadores.riscosAtivos ?? executiveDecisionsSeed.riscos.length)
  const oportunidadesCount = Number(
    ctx.indicadores.oportunidadesAtivas ?? executiveDecisionsSeed.oportunidades.length,
  )

  const receitaRecuperadaVariacao = Number(ctx.indicadores.receitaRecuperadaVariacao ?? 18)
  const receitaRecuperada = {
    ...executiveRevenueRecoveredSeed,
    mes: Number(ctx.indicadores.receitaRecuperadaMes ?? executiveRevenueRecoveredSeed.mes),
    hoje: Number(ctx.indicadores.receitaRecuperadaHoje ?? executiveRevenueRecoveredSeed.hoje),
  }

  const revenueInsights = executiveRevenueInsightsSeed.map((item) =>
    item.id === 'ri1' ? { ...item, valor: receitaRecuperavel } : item,
  )

  const missaoDoDia: typeof executiveMissaoDoDiaSeed = {
    ...executiveMissaoDoDiaSeed,
    impactoFinanceiro:
      executiveDecisionsSeed.planoAcao[0]?.impactoFinanceiro ?? executiveMissaoDoDiaSeed.impactoFinanceiro,
  }

  return {
    mensagemExecutiva: humanizeExecutiveTone(executiveMensagemExecutivaSeed),
    introParagraphs: executiveIntroParagraphsSeed.map(humanizeExecutiveTone),
    receitaRecuperavel,
    receitaRecuperada,
    receitaRecuperadaVariacao,
    oportunidadesCount,
    riscosCount,
    resumoDia: executiveResumoDiaSeed.map(humanizeExecutiveTone),
    missaoDoDia,
    timeline: executiveTimelineSeed,
    perguntasRapidas: executiveQuickQuestionsSeed,
    planoAcao: executiveDecisionsSeed.planoAcao,
    oportunidades: executiveDecisionsSeed.oportunidades,
    riscos: executiveDecisionsSeed.riscos,
    missoes: executiveDecisionsSeed.missoes,
    revenueInsights,
    feed: executiveFeedSeed,
  }
}

export function getExecutiveBriefing(ctx: IntelligenceContext): ExecutiveBriefing {
  return runExecutiveEngine(ctx)
}
