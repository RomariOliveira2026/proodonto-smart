/** Execution Center™ — tipos preparados para IA real + WhatsApp / Email APIs */

import type { DecisionPriority } from '../builder-intelligence/types/executive'

export interface ExecutionMission {
  id: string
  actionKey: string
  titulo: string
  objetivo: string
  impactoFinanceiro: number
  metaRecuperacao: number
  probabilidadeSucesso: number
  tempoEstimadoMinutos: number
  prioridade: DecisionPriority
}

export interface ExecutionPatient {
  id: string
  nome: string
  avatarInitials: string
  valorAberto: number
  diasAtraso: number
  ultimoAtendimento: string
  scoreRecuperacao: number
  historico: string[]
  tratamentos: string[]
  mensagensAnteriores: string[]
  sugestaoIA: string
  telefone?: string
  email?: string
}

export interface ExecutionSessionSnapshot {
  mission: ExecutionMission
  pacientes: ExecutionPatient[]
}

export interface MissionCompletionStats {
  receitaRecuperada: number
  meta: number
  pacientesConcluidos: number
  pacientesTotal: number
  tempoInvestidoMinutos: number
}
