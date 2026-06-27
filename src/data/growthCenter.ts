import type { GrowthCenterSnapshot } from '../types/growthCenter'

/** Dados simulados — substituir por queries Supabase + engines OpenAI. */
export const growthCenterSnapshot: GrowthCenterSnapshot = {
  hero: {
    receitaRecuperavel: 12480,
    oportunidadeFaturamento: 12480,
  },

  missoes: [
    {
      id: 'gm1',
      iconKey: 'confirmar',
      titulo: 'Confirmar consultas',
      descricao: 'Evitar R$ 2.300 em faltas',
      valorFinanceiro: 2300,
      actionKey: 'confirmar_consultas',
    },
    {
      id: 'gm2',
      iconKey: 'cobrar',
      titulo: 'Cobrar pacientes',
      descricao: 'Recuperar R$ 3.500',
      valorFinanceiro: 3500,
      actionKey: 'cobrar_inadimplentes',
    },
    {
      id: 'gm3',
      iconKey: 'reativar',
      titulo: 'Reativar pacientes',
      descricao: 'Receita potencial R$ 4.900',
      valorFinanceiro: 4900,
      actionKey: 'reativar_pacientes',
    },
    {
      id: 'gm4',
      iconKey: 'orcamentos',
      titulo: 'Orçamentos pendentes',
      descricao: 'Receita R$ 1.780',
      valorFinanceiro: 1780,
      actionKey: 'orcamentos_pendentes',
    },
  ],

  radar: {
    dimensions: [
      { id: 'financeiro', label: 'Financeiro', score: 94 },
      { id: 'agenda', label: 'Agenda', score: 88 },
      { id: 'marketing', label: 'Marketing', score: 79 },
      { id: 'conversao', label: 'Conversão', score: 97 },
      { id: 'relacionamento', label: 'Relacionamento', score: 90 },
    ],
    saudeGeral: 92,
  },

  insights: {
    bullets: [
      'Quartas-feiras concentram o maior índice de faltas.',
      'Existem 38 pacientes sem retorno há mais de 12 meses.',
      'O ticket médio caiu 6%.',
      'Há potencial para recuperar R$ 18.700 apenas com reativações.',
    ],
    potencialReativacao: 18700,
  },

  simulator: {
    receitaAnualBase: 892000,
    poolRecuperacaoFaltas: 47000,
    poolRecuperacaoConversao: 47000,
    poolUpsideTicket: 47000,
  },
}
