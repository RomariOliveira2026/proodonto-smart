import type { ExecutiveDecision, ClinicFeedItem, RevenueInsightItem } from '../types/executive'

/**
 * Camada de dados simulados do Copiloto Executivo.
 * Substituir por respostas OpenAI + Supabase no Builder Intelligence Engine.
 */
export const executiveDecisionsSeed: {
  oportunidades: ExecutiveDecision[]
  riscos: ExecutiveDecision[]
  missoes: ExecutiveDecision[]
  planoAcao: ExecutiveDecision[]
} = {
  oportunidades: [
    {
      id: 'op1',
      problema: '38 pacientes sem retorno há mais de 12 meses',
      impactoFinanceiro: 18700,
      prioridade: 'alta',
      categoria: 'oportunidade',
      actionKey: 'reativar_pacientes',
    },
    {
      id: 'op2',
      problema: '8 orçamentos aprováveis aguardando follow-up',
      impactoFinanceiro: 22400,
      prioridade: 'alta',
      categoria: 'oportunidade',
      actionKey: 'fechar_orcamentos',
    },
    {
      id: 'op3',
      problema: '7 pacientes aptos para clareamento não contactados',
      impactoFinanceiro: 9800,
      prioridade: 'media',
      categoria: 'oportunidade',
      actionKey: 'upsell_clareamento',
    },
  ],
  riscos: [
    {
      id: 'rk1',
      problema: '9 parcelas vencidas sem cobrança ativa',
      impactoFinanceiro: 12400,
      prioridade: 'critica',
      categoria: 'risco',
      actionKey: 'cobrar_inadimplentes',
    },
    {
      id: 'rk2',
      problema: '18 consultas de sexta sem confirmação',
      impactoFinanceiro: 14800,
      prioridade: 'alta',
      categoria: 'risco',
      actionKey: 'confirmar_consultas',
    },
    {
      id: 'rk3',
      problema: 'Agenda de Lagarto com 3h ociosas amanhã',
      impactoFinanceiro: 3800,
      prioridade: 'media',
      categoria: 'risco',
      actionKey: 'preencher_agenda',
    },
  ],
  missoes: [
    {
      id: 'ms1',
      problema: 'Confirmar 8 consultas de hoje',
      impactoFinanceiro: 3200,
      prioridade: 'alta',
      categoria: 'missao',
      actionKey: 'confirmar_consultas',
    },
    {
      id: 'ms2',
      problema: 'Cobrar 4 pacientes inadimplentes',
      impactoFinanceiro: 3500,
      prioridade: 'alta',
      categoria: 'missao',
      actionKey: 'cobrar_inadimplentes',
    },
    {
      id: 'ms3',
      problema: 'Reativar 3 pacientes prioritários',
      impactoFinanceiro: 4900,
      prioridade: 'media',
      categoria: 'missao',
      actionKey: 'reativar_pacientes',
    },
    {
      id: 'ms4',
      problema: 'Fechar 2 orçamentos pendentes',
      impactoFinanceiro: 1780,
      prioridade: 'media',
      categoria: 'missao',
      actionKey: 'fechar_orcamentos',
    },
  ],
  planoAcao: [
    {
      id: 'pl1',
      problema: 'Bloquear perda de R$ 12.400 em inadimplência',
      impactoFinanceiro: 12400,
      prioridade: 'critica',
      categoria: 'plano',
      actionKey: 'cobrar_inadimplentes',
    },
    {
      id: 'pl2',
      problema: 'Evitar R$ 14.800 em faltas de sexta',
      impactoFinanceiro: 14800,
      prioridade: 'alta',
      categoria: 'plano',
      actionKey: 'confirmar_consultas',
    },
    {
      id: 'pl3',
      problema: 'Recuperar R$ 18.700 com campanha de reativação',
      impactoFinanceiro: 18700,
      prioridade: 'alta',
      categoria: 'plano',
      actionKey: 'reativar_pacientes',
    },
  ],
}

export const executiveFeedSeed: ClinicFeedItem[] = [
  {
    id: 'f1',
    tipo: 'decisao',
    titulo: 'Prioridade #1 agora',
    descricao: 'Cobrança amigável das 9 parcelas vencidas — maior ROI em 15 minutos.',
    impactoFinanceiro: 12400,
    prioridade: 'critica',
    quando: 'agora',
  },
  {
    id: 'f2',
    tipo: 'alerta',
    titulo: 'Pico de faltas às quartas',
    descricao: 'Taxa 34% acima da média. Ativar confirmação dupla reduz perda estimada.',
    impactoFinanceiro: 4200,
    prioridade: 'alta',
    quando: 'há 18 min',
  },
  {
    id: 'f3',
    tipo: 'oportunidade',
    titulo: 'Orçamento quente — Fernanda Costa',
    descricao: 'Facetas R$ 8.900 com 78% de probabilidade de fechamento esta semana.',
    impactoFinanceiro: 8900,
    prioridade: 'alta',
    quando: 'há 42 min',
  },
  {
    id: 'f4',
    tipo: 'conquista',
    titulo: 'Receita recuperada ontem',
    descricao: 'R$ 3.240 capturados via confirmações automáticas e cobrança.',
    impactoFinanceiro: 3240,
    quando: 'ontem',
  },
]

export const executiveRevenueInsightsSeed: RevenueInsightItem[] = [
  { id: 'ri1', label: 'Recuperável hoje', valor: 12480, variant: 'potential' },
  { id: 'ri2', label: 'Em risco (7 dias)', valor: 27200, trendPercent: -8, variant: 'at_risk' },
  { id: 'ri3', label: 'Recuperada no mês', valor: 42800, trendPercent: 18, variant: 'recovered' },
  { id: 'ri4', label: 'Upsell identificado', valor: 16400, trendPercent: 12, variant: 'potential' },
]

export const executiveResumoDiaSeed: string[] = [
  '3 decisões críticas exigem ação antes das 12h.',
  'R$ 27.200 em risco podem ser neutralizados hoje com 2 fluxos automáticos.',
  'Campanha de reativação pode liberar R$ 18.700 sem aumentar marketing.',
]
