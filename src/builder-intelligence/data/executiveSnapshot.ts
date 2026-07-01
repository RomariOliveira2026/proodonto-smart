import type {
  DailyMissionFocus,
  ExecutiveDecision,
  IntelligentTimelineItem,
  QuickQuestion,
  RevenueRecoveredPeriod,
  ClinicFeedItem,
  RevenueInsightItem,
} from '../types/executive'

export const executiveMissaoDoDiaSeed: DailyMissionFocus = {
  id: 'missao-principal',
  titulo: 'Cobrar 9 parcelas vencidas agora',
  mensagemExecutiva:
    'Encontrei R$ 12.400 parados na inadimplência. Uma cobrança amigável via WhatsApp pode liberar esse valor ainda hoje — é a ação de maior retorno agora.',
  impactoFinanceiro: 12400,
  tempoExecucaoMinutos: 15,
  prioridade: 'critica',
  actionKey: 'cobrar_inadimplentes',
}

export const executiveTimelineSeed: IntelligentTimelineItem[] = [
  {
    id: 'tl1',
    horario: '08:12',
    acao: 'Confirmações automáticas enviadas para 14 consultas de sexta',
    impactoFinanceiro: 4200,
    status: 'concluido',
  },
  {
    id: 'tl2',
    horario: '09:45',
    acao: 'Priorizei 3 pacientes VIP com orçamento quente para follow-up',
    impactoFinanceiro: 8900,
    status: 'concluido',
  },
  {
    id: 'tl3',
    horario: '11:20',
    acao: 'Fluxo de cobrança amigável preparado para 9 inadimplentes',
    impactoFinanceiro: 12400,
    status: 'em_execucao',
  },
  {
    id: 'tl4',
    horario: '14:00',
    acao: 'Campanha de reativação agendada para 38 pacientes sem retorno',
    impactoFinanceiro: 18700,
    status: 'agendado',
  },
  {
    id: 'tl5',
    horario: '16:30',
    acao: 'Lembretes de revisão para pacientes de Lagarto',
    impactoFinanceiro: 2100,
    status: 'agendado',
  },
]

export const executiveRevenueRecoveredSeed: RevenueRecoveredPeriod = {
  hoje: 3240,
  semana: 14800,
  mes: 42800,
  ano: 312400,
}

export const executiveQuickQuestionsSeed: QuickQuestion[] = [
  { id: 'qq1', label: 'Quanto posso recuperar hoje?', queryKey: 'quanto posso recuperar hoje' },
  { id: 'qq2', label: 'Quem devo ligar?', queryKey: 'quem devo ligar hoje' },
  { id: 'qq3', label: 'Quem abandonou tratamento?', queryKey: 'quem abandonou tratamento' },
  { id: 'qq4', label: 'Como aumentar meu faturamento?', queryKey: 'como aumentar faturamento' },
  { id: 'qq5', label: 'Mostrar pacientes VIP', queryKey: 'mostrar pacientes vip' },
]

export const executiveIntroParagraphsSeed = [
  'Eu não vim substituir seu sistema. Vim transformar os dados da sua clínica em decisões.',
  'Analisei agenda, pacientes, cobranças e tratamentos. Encontrei oportunidades reais de recuperação de faturamento.',
  'Minha recomendação para hoje é começar pelas ações com maior retorno financeiro.',
]

export const executiveMensagemExecutivaSeed =
  'Conectado à sua operação atual, identifiquei receita recuperável e riscos que passam despercebidos no dia a dia.'

export const executiveResumoDiaSeed: string[] = [
  'Antes do meio-dia, neutralize R$ 12.400 bloqueados em parcelas vencidas.',
  'Confirme as 18 consultas de sexta — evita perder R$ 14.800 em faltas.',
  'Uma reativação segmentada pode gerar R$ 18.700 sem aumentar investimento em marketing.',
]

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
      tempoExecucaoMinutos: 25,
    },
    {
      id: 'op2',
      problema: '8 orçamentos aprováveis aguardando follow-up',
      impactoFinanceiro: 22400,
      prioridade: 'alta',
      categoria: 'oportunidade',
      actionKey: 'fechar_orcamentos',
      tempoExecucaoMinutos: 20,
    },
    {
      id: 'op3',
      problema: '7 pacientes aptos para clareamento não contactados',
      impactoFinanceiro: 9800,
      prioridade: 'media',
      categoria: 'oportunidade',
      actionKey: 'upsell_clareamento',
      tempoExecucaoMinutos: 15,
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
      tempoExecucaoMinutos: 15,
    },
    {
      id: 'rk2',
      problema: '18 consultas de sexta sem confirmação',
      impactoFinanceiro: 14800,
      prioridade: 'alta',
      categoria: 'risco',
      actionKey: 'confirmar_consultas',
      tempoExecucaoMinutos: 12,
    },
    {
      id: 'rk3',
      problema: 'Agenda de Lagarto com 3h ociosas amanhã',
      impactoFinanceiro: 3800,
      prioridade: 'media',
      categoria: 'risco',
      actionKey: 'preencher_agenda',
      tempoExecucaoMinutos: 18,
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
      tempoExecucaoMinutos: 10,
    },
    {
      id: 'ms2',
      problema: 'Cobrar 4 pacientes inadimplentes',
      impactoFinanceiro: 3500,
      prioridade: 'alta',
      categoria: 'missao',
      actionKey: 'cobrar_inadimplentes',
      tempoExecucaoMinutos: 15,
    },
    {
      id: 'ms3',
      problema: 'Reativar 3 pacientes prioritários',
      impactoFinanceiro: 4900,
      prioridade: 'media',
      categoria: 'missao',
      actionKey: 'reativar_pacientes',
      tempoExecucaoMinutos: 20,
    },
    {
      id: 'ms4',
      problema: 'Fechar 2 orçamentos pendentes',
      impactoFinanceiro: 1780,
      prioridade: 'media',
      categoria: 'missao',
      actionKey: 'fechar_orcamentos',
      tempoExecucaoMinutos: 18,
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
      tempoExecucaoMinutos: 15,
    },
    {
      id: 'pl2',
      problema: 'Evitar R$ 14.800 em faltas de sexta',
      impactoFinanceiro: 14800,
      prioridade: 'alta',
      categoria: 'plano',
      actionKey: 'confirmar_consultas',
      tempoExecucaoMinutos: 12,
    },
    {
      id: 'pl3',
      problema: 'Recuperar R$ 18.700 com campanha de reativação',
      impactoFinanceiro: 18700,
      prioridade: 'alta',
      categoria: 'plano',
      actionKey: 'reativar_pacientes',
      tempoExecucaoMinutos: 25,
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
    descricao: 'Encontrei uma oportunidade de R$ 8.900 em facetas com alta chance de fechamento.',
    impactoFinanceiro: 8900,
    prioridade: 'alta',
    quando: 'há 42 min',
  },
  {
    id: 'f4',
    tipo: 'conquista',
    titulo: 'Receita capturada ontem',
    descricao: 'R$ 3.240 recuperados via confirmações automáticas e cobrança.',
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
