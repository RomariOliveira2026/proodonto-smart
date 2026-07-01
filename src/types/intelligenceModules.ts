/** Tipos dos módulos de inteligência conectável */

import type { DecisionPriority } from '../builder-intelligence/types/executive'

export interface InvisibleLossItem {
  id: string
  titulo: string
  quantidade: number
  impactoFinanceiro: number
  prioridade: DecisionPriority
  descricao: string
  actionKey: string
}

export interface InvisibleLossSnapshot {
  totalImpacto: number
  itens: InvisibleLossItem[]
}

export interface IntegrationFlowStep {
  id: string
  titulo: string
  descricao: string
}

export interface IntegrationDataSource {
  id: string
  label: string
  icon: string
}

export interface IntegrationMethod {
  id: string
  label: string
  descricao: string
}

export interface ConsultantQuestion {
  id: string
  label: string
  queryKey: string
}

export interface ConsultantResponse {
  diagnostico: string
  impactoFinanceiro: number
  recomendacao: string
  actionLabel: string
  actionKey: string
}

export interface ExecutiveReportSection {
  id: string
  titulo: string
  conteudo: string
  valor?: number
  variant?: 'success' | 'warning' | 'primary' | 'neutral'
}

export interface ExecutiveReportSnapshot {
  periodo: string
  geradoEm: string
  secoes: ExecutiveReportSection[]
  resumoFinanceiro: {
    recuperada: number
    emRisco: number
    oportunidadesAbertas: number
  }
}
