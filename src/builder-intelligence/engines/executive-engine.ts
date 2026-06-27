import type { IntelligenceContext } from '../types'
import type { ExecutiveBriefing } from '../types/executive'
import {
  executiveDecisionsSeed,
  executiveFeedSeed,
  executiveResumoDiaSeed,
  executiveRevenueInsightsSeed,
} from '../data/executiveSnapshot'

/**
 * Builder Intelligence Engine — motor executivo.
 * Agrega engines existentes + snapshot simulado.
 * Ponto único para substituir por pipeline OpenAI + Supabase.
 */
export function runExecutiveEngine(ctx: IntelligenceContext): ExecutiveBriefing {
  const receitaRecuperavel = Number(ctx.indicadores.receitaRecuperavel ?? 12480)
  const riscosCount = Number(ctx.indicadores.riscosAtivos ?? executiveDecisionsSeed.riscos.length)
  const oportunidadesCount = Number(
    ctx.indicadores.oportunidadesAtivas ?? executiveDecisionsSeed.oportunidades.length,
  )

  const receitaRecuperadaMes = Number(ctx.indicadores.receitaRecuperadaMes ?? 42800)
  const receitaRecuperadaVariacao = Number(ctx.indicadores.receitaRecuperadaVariacao ?? 18)

  const revenueInsights = executiveRevenueInsightsSeed.map((item) =>
    item.id === 'ri1' ? { ...item, valor: receitaRecuperavel } : item,
  )

  return {
    receitaRecuperavel,
    receitaRecuperadaMes,
    receitaRecuperadaVariacao,
    oportunidadesCount,
    riscosCount,
    resumoDia: executiveResumoDiaSeed,
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
