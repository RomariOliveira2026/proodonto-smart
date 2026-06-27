export type {
  BlockType,
  ChartItem,
  EngineName,
  IntelligenceBlock,
  IntelligenceContext,
  IntelligenceResponse,
  IntelligenceUser,
  MetricItem,
  PriorityItem,
  SuggestedAction,
  TimelineItem,
  UnitSnapshot,
} from './types'

export { createProOdontoContext } from './adapters/proodonto'
export { getOpeningBriefing, processQuery } from './query-router'

export {
  runAutomationEngine,
  runDecisionEngine,
  runInsightsEngine,
  runPredictionEngine,
  runRecommendationEngine,
  runRevenueEngine,
  runRiskEngine,
} from './engines'

export { BuilderIntelligenceProvider, useBuilderIntelligence } from './components/BuilderIntelligenceProvider'
export { BuilderIntelligenceShell } from './components/BuilderIntelligenceShell'
