import type { ExecutionMission, ExecutionPatient } from '../../types/executionCenter'

/** Gera mensagem personalizada — substituir por OpenAI / Claude / Gemini */
export function generateRecoveryMessage(patient: ExecutionPatient, mission: ExecutionMission): string {
  const firstName = patient.nome.split(' ')[0]

  if (mission.actionKey === 'confirmar_consultas') {
    return `Olá ${firstName}.\n\nPassando para confirmar sua consulta na clínica.\n\nPodemos contar com sua presença no horário agendado?\n\nQualquer dúvida, estou à disposição.`
  }

  return `Olá ${firstName}.\n\nPercebemos que existe uma parcela em aberto referente ao seu tratamento.\n\nGostaríamos de facilitar sua regularização.\n\nPosso lhe enviar as opções disponíveis?`
}

export function estimateRecoveredValue(patient: ExecutionPatient, mission: ExecutionMission): number {
  const rate = mission.probabilidadeSucesso / 100
  return Math.round(patient.valorAberto * (patient.scoreRecuperacao / 100) * rate)
}
