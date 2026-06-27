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

export type {
  DecisionPriority,
  DecisionCategory,
  ExecutiveDecision,
  ExecutiveBriefing,
  ExecutiveAnswer,
  DailyMissionFocus,
  IntelligentTimelineItem,
  TimelineStatus,
  RevenueRecoveredPeriod,
  QuickQuestion,
  RevenueInsightItem,
  ClinicFeedItem,
} from './types/executive'

export { createProOdontoContext } from './adapters/proodonto'
export { createExecutiveContext } from './adapters/executive'
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
export { runExecutiveEngine, getExecutiveBriefing } from './engines/executive-engine'
export { buildExecutiveAnswer, humanizeExecutiveTone } from './lib/executiveVoice'
export { runPlanThinkingSequence, formatActivityTime } from './lib/liveIntelligenceEngine'
export { liveIntelligenceSnapshot, formatTempoEconomizado } from './data/liveIntelligenceSnapshot'

export type {
  LiveActivityItem,
  LiveIntelligenceStats,
  LiveIntelligenceSnapshot,
  AiNotificationItem,
  AiNotificationType,
  PlanThinkingStep,
} from './types/liveIntelligence'

export { BuilderIntelligenceProvider, useBuilderIntelligence } from './components/BuilderIntelligenceProvider'
export { BuilderIntelligenceShell } from './components/BuilderIntelligenceShell'
