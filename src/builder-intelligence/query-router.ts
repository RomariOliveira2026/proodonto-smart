import type { EngineResult, IntelligenceContext, IntelligenceResponse } from './types'
import {
  runAutomationEngine,
  runDecisionEngine,
  runInsightsEngine,
  runPredictionEngine,
  runRecommendationEngine,
  runRevenueEngine,
  runRiskEngine,
} from './engines'

function toResponse(result: EngineResult): IntelligenceResponse {
  return {
    id: crypto.randomUUID(),
    ...result,
  }
}

export function getOpeningBriefing(ctx: IntelligenceContext): IntelligenceResponse {
  return toResponse(runInsightsEngine(ctx))
}

export function processQuery(query: string, ctx: IntelligenceContext): IntelligenceResponse {
  const q = query.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')

  if (/lagarto|aracaju|simao|unidade/.test(q) && /como|esta|status|situacao/.test(q)) {
    const match = q.match(/lagarto|aracaju|simao dias/)
    return toResponse(runDecisionEngine(ctx, match?.[0] ?? 'lagarto'))
  }

  if (/lagarto|aracaju|simao/.test(q) && !/previsao|perdendo|ligar|receita|fechar|atencao/.test(q)) {
    const match = q.match(/lagarto|aracaju|simao dias/)
    return toResponse(runDecisionEngine(ctx, match?.[0]))
  }

  if (/perdendo|perda|onde.*dinheiro|vazando|fugindo/.test(q)) {
    return toResponse(runRevenueEngine(ctx))
  }

  if (/receita.*(escondida|oculta|recuperavel)|existe receita/.test(q)) {
    return toResponse(runRevenueEngine(ctx))
  }

  if (/ligar|quem.*hoje|contatar|ligacao/.test(q)) {
    return toResponse(runRecommendationEngine(ctx))
  }

  if (/fechar|chance|tratamento|converter|upsell/.test(q)) {
    return toResponse(runRecommendationEngine(ctx))
  }

  if (/unidade.*(atencao|precisa|critica|pior|melhor)|qual unidade/.test(q)) {
    const sorted = [...(ctx.unidades ?? [])].sort((a, b) => a.faturamento / a.meta - b.faturamento / b.meta)
    return toResponse(runDecisionEngine(ctx, sorted[0]?.nome))
  }

  if (/previsao|mes|faturamento.*mes|projecao/.test(q)) {
    return toResponse(runPredictionEngine(ctx))
  }

  if (/risco|perigo|alerta|problema/.test(q)) {
    return toResponse(runRiskEngine(ctx))
  }

  if (/automat|rotina|executar/.test(q)) {
    return toResponse(runAutomationEngine())
  }

  if (/oportunidade|recuperar|ganhar/.test(q)) {
    return toResponse(runRevenueEngine(ctx))
  }

  return toResponse(runInsightsEngine(ctx))
}
