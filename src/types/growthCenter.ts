/** Tipos do Centro de Crescimento — prontos para Supabase, OpenAI e Stripe. */

export type MissionIconKey = 'confirmar' | 'cobrar' | 'reativar' | 'orcamentos'

export interface GrowthHeroData {
  receitaRecuperavel: number
  oportunidadeFaturamento: number
}

export interface GrowthMission {
  id: string
  iconKey: MissionIconKey
  titulo: string
  descricao: string
  valorFinanceiro: number
  actionKey?: string
}

export interface RadarDimension {
  id: string
  label: string
  score: number
}

export interface ClinicRadarData {
  dimensions: RadarDimension[]
  saudeGeral: number
}

export interface AIInsightData {
  bullets: string[]
  potencialReativacao: number
}

export interface SimulatorBaseline {
  receitaAnualBase: number
  poolRecuperacaoFaltas: number
  poolRecuperacaoConversao: number
  poolUpsideTicket: number
}

export interface GrowthCenterSnapshot {
  hero: GrowthHeroData
  missoes: GrowthMission[]
  radar: ClinicRadarData
  insights: AIInsightData
  simulator: SimulatorBaseline
}
