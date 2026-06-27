/** Builder Intelligence™ — tipos de domínio agnósticos (Builder Core) */

export interface IntelligenceUser {
  nome: string
  cargo: string
  unidade?: string
}

export interface IntelligenceContext {
  produto: string
  usuario: IntelligenceUser
  indicadores: Record<string, number | string>
  unidades?: UnitSnapshot[]
  meta?: Record<string, unknown>
}

export interface UnitSnapshot {
  id: string
  nome: string
  faturamento: number
  meta: number
  conversao: number
  faltas: number
  riscos: number
  oportunidades: number
}

export interface SuggestedAction {
  id: string
  label: string
  impacto?: string
  tipo: 'confirmar' | 'cobrar' | 'whatsapp' | 'agendar' | 'campanha' | 'relatorio' | 'executar'
}

export type BlockType =
  | 'greeting'
  | 'text'
  | 'metrics'
  | 'comparison'
  | 'priority-list'
  | 'bar-chart'
  | 'timeline'
  | 'insight'

export interface MetricItem {
  label: string
  value: string | number
  prefix?: string
  suffix?: string
  trend?: string
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary'
}

export interface PriorityItem {
  rank: number
  titulo: string
  impacto: string
  tempo?: string
  urgencia: 'alta' | 'media' | 'baixa'
}

export interface ChartItem {
  label: string
  value: number
  color?: string
}

export interface TimelineItem {
  hora: string
  texto: string
}

export interface IntelligenceBlock {
  type: BlockType
  content?: string
  metrics?: MetricItem[]
  title?: string
  items?: PriorityItem[] | ChartItem[]
  comparison?: { label: string; value: number; max: number }[]
  timeline?: TimelineItem[]
  highlight?: string
}

export interface IntelligenceResponse {
  id: string
  diagnostico: string
  oportunidade?: string
  recomendacao: string
  blocks: IntelligenceBlock[]
  actions: SuggestedAction[]
}

export interface EngineResult {
  blocks: IntelligenceBlock[]
  diagnostico: string
  oportunidade?: string
  recomendacao: string
  actions: SuggestedAction[]
}

export type EngineName =
  | 'decision'
  | 'prediction'
  | 'automation'
  | 'revenue'
  | 'risk'
  | 'insights'
  | 'recommendation'
