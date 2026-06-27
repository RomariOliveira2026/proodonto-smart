import type { SimulatorBaseline } from '../types/growthCenter'

export interface SimulatorInputs {
  reduzirFaltas: number
  aumentarConversao: number
  aumentarTicket: number
}

export const SIMULATOR_MAX = 30

export function calcularReceitaSimulada(
  baseline: SimulatorBaseline,
  inputs: SimulatorInputs,
): number {
  const faltas = baseline.poolRecuperacaoFaltas * (inputs.reduzirFaltas / SIMULATOR_MAX)
  const conversao = baseline.poolRecuperacaoConversao * (inputs.aumentarConversao / SIMULATOR_MAX)
  const ticket = baseline.poolUpsideTicket * (inputs.aumentarTicket / SIMULATOR_MAX)
  return Math.round(faltas + conversao + ticket)
}
