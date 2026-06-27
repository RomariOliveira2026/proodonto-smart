import type { LiveIntelligenceSnapshot } from '../types/liveIntelligence'

/** Dados simulados — substituir por stream Supabase + Builder Intelligence Engine */
export const liveIntelligenceSnapshot: LiveIntelligenceSnapshot = {
  statusMessage: 'Trabalhando pela sua clínica agora',

  activity: [
    { id: 'a1', offsetMinutes: 4, message: 'Analisei a agenda.' },
    { id: 'a2', offsetMinutes: 3, message: 'Cruzei pagamentos com consultas.' },
    { id: 'a3', offsetMinutes: 2, message: 'Detectei 9 pacientes inadimplentes.' },
    { id: 'a4', offsetMinutes: 1, message: 'Calculei prioridade financeira.' },
    { id: 'a5', offsetMinutes: 0, message: 'Plano pronto.' },
  ],

  stats: {
    tempoEconomizadoMinutos: 163,
    receitaRecuperada: 42800,
    mensagensGeradas: 47,
    pacientesReativados: 12,
  },

  notifications: [
    { id: 'n1', message: 'Maria acabou de responder.', tipo: 'resposta' },
    { id: 'n2', message: 'Carlos confirmou consulta.', tipo: 'confirmacao' },
    { id: 'n3', message: 'Paciente aceitou orçamento.', tipo: 'orcamento' },
    { id: 'n4', message: 'Pagamento recebido.', tipo: 'pagamento' },
  ],

  planSteps: [
    { id: 's1', label: 'Analisando pacientes...', durationMs: 650 },
    { id: 's2', label: 'Preparando mensagens...', durationMs: 700 },
    { id: 's3', label: 'Calculando melhor estratégia...', durationMs: 750 },
    { id: 's4', label: 'Selecionando prioridades...', durationMs: 700 },
    { id: 's5', label: 'Plano concluído.', durationMs: 200 },
  ],
}

export function formatTempoEconomizado(totalMinutos: number): string {
  const h = Math.floor(totalMinutos / 60)
  const m = totalMinutos % 60
  if (h === 0) return `${m}min`
  return `${h}h${m.toString().padStart(2, '0')}min`
}
