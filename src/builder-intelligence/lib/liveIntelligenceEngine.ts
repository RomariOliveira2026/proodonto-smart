import type { PlanThinkingStep } from '../types/liveIntelligence'

/** Executa sequência do plano — hook futuro para pipeline IA real */
export async function runPlanThinkingSequence(
  steps: PlanThinkingStep[],
  onStep: (index: number, step: PlanThinkingStep) => void,
): Promise<void> {
  for (let i = 0; i < steps.length; i++) {
    onStep(i, steps[i])
    await new Promise((r) => setTimeout(r, steps[i].durationMs))
  }
}

export function formatActivityTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  })
}
