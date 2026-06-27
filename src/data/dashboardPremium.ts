import type { DashboardPremiumSnapshot } from '../types/dashboardPremium'

/** Snapshot simulado — substituir por Supabase + engines de IA. */
export const dashboardPremiumSnapshot: DashboardPremiumSnapshot = {
  receitaHoje: {
    valor: 4280,
    variacaoSemanalPercent: 18,
  },

  missoes: [
    { id: 'm1', titulo: 'Confirmar 8 consultas', prioridade: 'alta', valorEstimado: 3200, actionKey: 'confirmar_consultas' },
    { id: 'm2', titulo: 'Cobrar 4 pacientes inadimplentes', prioridade: 'alta', valorEstimado: 4800, actionKey: 'cobrar_inadimplentes' },
    { id: 'm3', titulo: 'Reativar 3 pacientes', prioridade: 'media', valorEstimado: 2100, actionKey: 'reativar_pacientes' },
    { id: 'm4', titulo: 'Oferecer clareamento para 7 pacientes', prioridade: 'media', valorEstimado: 5600, actionKey: 'upsell_clareamento' },
    { id: 'm5', titulo: 'Entrar em contato com 2 pacientes que abandonaram tratamento', prioridade: 'alta', valorEstimado: 3400, actionKey: 'retomar_tratamento' },
  ],

  oportunidades: [
    { id: 'o1', titulo: 'Pacientes sem retorno há mais de 6 meses', receitaEstimada: 9200, quantidade: 12 },
    { id: 'o2', titulo: 'Orçamentos não aprovados', receitaEstimada: 18700, quantidade: 8 },
    { id: 'o3', titulo: 'Parcelas vencidas', receitaEstimada: 12400, quantidade: 9 },
    { id: 'o4', titulo: 'Tratamentos interrompidos', receitaEstimada: 8600, quantidade: 5 },
    { id: 'o5', titulo: 'Revisões pendentes', receitaEstimada: 7400, quantidade: 22 },
  ],

  iaGestora: {
    potencialIdentificado: 6850,
    mensagem:
      'Hoje identifiquei oportunidades para recuperar aproximadamente R$ 6.850 para sua clínica.\n\nDeseja que eu monte um plano de ação?',
  },

  indicadores: [
    { id: 'i1', label: 'Receita Recuperada', valor: 42800, formato: 'moeda' },
    { id: 'i2', label: 'Receita Perdida', valor: 14200, formato: 'moeda' },
    { id: 'i3', label: 'Pacientes Ativos', valor: 847, formato: 'numero' },
    { id: 'i4', label: 'Faltas', valor: 4, formato: 'numero' },
    { id: 'i5', label: 'Conversão', valor: 68, formato: 'percentual' },
    { id: 'i6', label: 'Ticket Médio', valor: 285, formato: 'moeda' },
    { id: 'i7', label: 'Tempo Economizado', valor: 4.2, decimals: 1, suffix: 'h', formato: 'horas' },
  ],

  receitaRecuperada12Meses: [
    { mes: 'Jul', valor: 18200 },
    { mes: 'Ago', valor: 21400 },
    { mes: 'Set', valor: 19800 },
    { mes: 'Out', valor: 24100 },
    { mes: 'Nov', valor: 26500 },
    { mes: 'Dez', valor: 28900 },
    { mes: 'Jan', valor: 31200 },
    { mes: 'Fev', valor: 29800 },
    { mes: 'Mar', valor: 33400 },
    { mes: 'Abr', valor: 35600 },
    { mes: 'Mai', valor: 38900 },
    { mes: 'Jun', valor: 42800 },
  ],

  pacientesPrioritarios: [
    { id: 'pp1', pacienteId: '1', nome: 'Maria Silva Santos', ultimaConsulta: '20/06/2026', status: 'Parcela atrasada', receitaPotencial: 4800, prioridade: 'critica' },
    { id: 'pp2', pacienteId: '3', nome: 'Ana Carolina Mendes', ultimaConsulta: '15/06/2026', status: 'Sem retorno · 6+ meses', receitaPotencial: 3200, prioridade: 'alta' },
    { id: 'pp3', pacienteId: '5', nome: 'Fernanda Costa Ribeiro', ultimaConsulta: '22/06/2026', status: 'Orçamento pendente', receitaPotencial: 8900, prioridade: 'alta' },
    { id: 'pp4', pacienteId: '4', nome: 'Carlos Eduardo Lima', ultimaConsulta: '10/06/2026', status: 'Tratamento interrompido', receitaPotencial: 2100, prioridade: 'media' },
    { id: 'pp5', pacienteId: '6', nome: 'Ricardo Almeida Souza', ultimaConsulta: '05/06/2026', status: 'Revisão pendente', receitaPotencial: 650, prioridade: 'media' },
    { id: 'pp6', pacienteId: '2', nome: 'João Pedro Oliveira', ultimaConsulta: '18/06/2026', status: 'Upsell clareamento', receitaPotencial: 1800, prioridade: 'baixa' },
  ],
}
