/** Live Intelligence Engine™ — tipos para IA contínua (OpenAI / Claude / Gemini futuro) */

export interface LiveActivityItem {
  id: string
  /** Minutos atrás em relação ao relógio ao vivo */
  offsetMinutes: number
  message: string
}

export interface LiveIntelligenceStats {
  tempoEconomizadoMinutos: number
  receitaRecuperada: number
  mensagensGeradas: number
  pacientesReativados: number
}

export type AiNotificationType = 'resposta' | 'confirmacao' | 'orcamento' | 'pagamento'

export interface AiNotificationItem {
  id: string
  message: string
  tipo: AiNotificationType
}

export interface PlanThinkingStep {
  id: string
  label: string
  durationMs: number
}

export interface LiveIntelligenceSnapshot {
  activity: LiveActivityItem[]
  stats: LiveIntelligenceStats
  notifications: AiNotificationItem[]
  planSteps: PlanThinkingStep[]
  statusMessage: string
}
