/** Builder Intelligence Engine — tipos do Copiloto Executivo */

export type DecisionPriority = 'critica' | 'alta' | 'media' | 'baixa'

export type DecisionCategory = 'oportunidade' | 'risco' | 'missao' | 'plano'

export type TimelineStatus = 'concluido' | 'em_execucao' | 'agendado'

export interface ExecutiveDecision {
  id: string
  problema: string
  impactoFinanceiro: number
  prioridade: DecisionPriority
  categoria: DecisionCategory
  tempoExecucaoMinutos?: number
  /** Chave para automação futura (WhatsApp, Stripe, Calendar) */
  actionKey: string
}

export interface DailyMissionFocus {
  id: string
  titulo: string
  mensagemExecutiva: string
  impactoFinanceiro: number
  tempoExecucaoMinutos: number
  prioridade: DecisionPriority
  actionKey: string
}

export interface IntelligentTimelineItem {
  id: string
  horario: string
  acao: string
  impactoFinanceiro: number
  status: TimelineStatus
}

export interface RevenueRecoveredPeriod {
  hoje: number
  semana: number
  mes: number
  ano: number
}

export interface QuickQuestion {
  id: string
  label: string
  /** Roteamento futuro OpenAI / Claude / Gemini */
  queryKey: string
}

export interface ExecutiveAnswer {
  mensagem: string
  impactoFinanceiro?: number
  actionLabel?: string
  actionKey?: string
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
  quando: string
}

export interface ExecutiveBriefing {
  mensagemExecutiva: string
  introParagraphs: string[]
  receitaRecuperavel: number
  receitaRecuperada: RevenueRecoveredPeriod
  receitaRecuperadaVariacao: number
  oportunidadesCount: number
  riscosCount: number
  resumoDia: string[]
  missaoDoDia: DailyMissionFocus
  timeline: IntelligentTimelineItem[]
  perguntasRapidas: QuickQuestion[]
  planoAcao: ExecutiveDecision[]
  oportunidades: ExecutiveDecision[]
  riscos: ExecutiveDecision[]
  missoes: ExecutiveDecision[]
  revenueInsights: RevenueInsightItem[]
  feed: ClinicFeedItem[]
}
