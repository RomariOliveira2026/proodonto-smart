/** Tipos da Home Premium — preparados para Supabase / OpenAI / integrações futuras. */

export type MissionPriority = 'alta' | 'media' | 'baixa'

export type PatientPriority = 'critica' | 'alta' | 'media' | 'baixa'

export interface ReceitaRecuperavelHoje {
  valor: number
  variacaoSemanalPercent: number
  /** Supabase: clinic_daily_opportunities */
}

export interface MissaoInteligente {
  id: string
  titulo: string
  prioridade: MissionPriority
  valorEstimado: number
  /** WhatsApp / Calendar action key futuro */
  actionKey?: string
}

export interface OportunidadeFinanceira {
  id: string
  titulo: string
  receitaEstimada: number
  quantidade?: number
}

export interface IAGestoraBriefing {
  potencialIdentificado: number
  mensagem: string
}

export interface IndicadorPremium {
  id: string
  label: string
  valor: number
  prefix?: string
  suffix?: string
  decimals?: number
  formato?: 'moeda' | 'numero' | 'percentual' | 'horas'
}

export interface ReceitaRecuperadaMensal {
  mes: string
  valor: number
}

export interface PacientePrioritario {
  id: string
  nome: string
  ultimaConsulta: string
  status: string
  receitaPotencial: number
  prioridade: PatientPriority
  pacienteId?: string
}

export interface DashboardPremiumSnapshot {
  receitaHoje: ReceitaRecuperavelHoje
  missoes: MissaoInteligente[]
  oportunidades: OportunidadeFinanceira[]
  iaGestora: IAGestoraBriefing
  indicadores: IndicadorPremium[]
  receitaRecuperada12Meses: ReceitaRecuperadaMensal[]
  pacientesPrioritarios: PacientePrioritario[]
}
