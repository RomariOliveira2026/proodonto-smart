/** Builder Intelligence Engine — tipos do Copiloto Executivo */

export type DecisionPriority = 'critica' | 'alta' | 'media' | 'baixa'

export type DecisionCategory = 'oportunidade' | 'risco' | 'missao' | 'plano'

export interface ExecutiveDecision {
  id: string
  problema: string
  impactoFinanceiro: number
  prioridade: DecisionPriority
  categoria: DecisionCategory
  /** Chave para automação futura (WhatsApp, Stripe, Calendar) */
  actionKey: string
}

export interface RevenueInsightItem {
  id: string
  label: string
  valor: number
  trendPercent?: number
  variant: 'recovered' | 'at_risk' | 'potential'
}

export interface ClinicFeedItem {
  id: string
  tipo: 'alerta' | 'oportunidade' | 'conquista' | 'decisao'
  titulo: string
  descricao: string
  impactoFinanceiro?: number
  prioridade?: DecisionPriority
  /** ISO ou label relativo — ex: "há 12 min" */
  quando: string
}

export interface ExecutiveBriefing {
  receitaRecuperavel: number
  receitaRecuperadaMes: number
  receitaRecuperadaVariacao: number
  oportunidadesCount: number
  riscosCount: number
  resumoDia: string[]
  planoAcao: ExecutiveDecision[]
  oportunidades: ExecutiveDecision[]
  riscos: ExecutiveDecision[]
  missoes: ExecutiveDecision[]
  revenueInsights: RevenueInsightItem[]
  feed: ClinicFeedItem[]
}
