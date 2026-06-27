import type { EngineResult, IntelligenceContext } from '../types'

export function runInsightsEngine(ctx: IntelligenceContext): EngineResult {
  const receitaRecuperavel = Number(ctx.indicadores.receitaRecuperavel ?? 61840)
  const riscos = Number(ctx.indicadores.riscosAtivos ?? 5)
  const oportunidades = Number(ctx.indicadores.oportunidadesAtivas ?? 8)

  return {
    diagnostico: `Analisei toda sua operação. Hoje identifiquei ${riscos} riscos e ${oportunidades} oportunidades.`,
    oportunidade: `R$ ${receitaRecuperavel.toLocaleString('pt-BR')} recuperáveis nas próximas 30 dias.`,
    recomendacao: 'Cobrar pacientes em atraso e confirmar consultas pendentes — maior impacto em menos de 20 minutos.',
    blocks: [
      {
        type: 'greeting',
        content: `Bom dia, ${ctx.usuario.nome.split(' ')[0]}.\n\nAnalisei toda sua operação.\n\nHoje encontrei:`,
      },
      {
        type: 'metrics',
        metrics: [
          { label: 'Riscos', value: riscos, variant: 'danger' },
          { label: 'Oportunidades', value: oportunidades, variant: 'success' },
          { label: 'Recuperável', value: receitaRecuperavel, prefix: 'R$ ', variant: 'primary' },
        ],
      },
      {
        type: 'insight',
        highlight: 'Prioridade #1',
        content: '9 parcelas vencidas (R$ 12.400) + 18 consultas em risco (R$ 14.800). Ação combinada pode recuperar R$ 27.200 esta semana.',
      },
    ],
    actions: [
      { id: 'cobrar', label: 'Cobrar parcelas', impacto: '+R$ 12.400', tipo: 'cobrar' },
      { id: 'confirmar', label: 'Confirmar consultas', impacto: '+R$ 14.800', tipo: 'confirmar' },
      { id: 'executar', label: 'Executar rotina inteligente', impacto: '+R$ 27.200', tipo: 'executar' },
    ],
  }
}

export function runRiskEngine(ctx: IntelligenceContext): EngineResult {
  const unidadeCritica = ctx.unidades?.find((u) => u.faturamento / u.meta < 0.85)

  return {
    diagnostico: 'Identifiquei pontos de atenção que podem impactar faturamento nos próximos 7 dias.',
    oportunidade: unidadeCritica
      ? `${unidadeCritica.nome} está ${Math.round((unidadeCritica.faturamento / unidadeCritica.meta) * 100)}% da meta — lacuna recuperável.`
      : 'Riscos concentrados em inadimplência e faltas.',
    recomendacao: 'Ativar confirmação automática e fluxo de cobrança amigável hoje.',
    blocks: [
      {
        type: 'priority-list',
        title: 'Riscos prioritários',
        items: [
          { rank: 1, titulo: '18 parcelas vencidas', impacto: 'R$ 12.400', tempo: '15 min', urgencia: 'alta' },
          { rank: 2, titulo: 'Taxa de faltas elevada — Sexta', impacto: 'R$ 4.200', tempo: '8 min', urgencia: 'alta' },
          { rank: 3, titulo: 'Agenda vazia amanhã — Lagarto', impacto: 'R$ 3.800', tempo: '12 min', urgencia: 'media' },
          { rank: 4, titulo: 'Conversão caiu — Simão Dias', impacto: '-6%', urgencia: 'media' },
          { rank: 5, titulo: 'Paciente VIP cancelou', impacto: 'R$ 4.800', urgencia: 'alta' },
        ],
      },
      {
        type: 'bar-chart',
        title: 'Risco por unidade',
        items: [
          { label: 'Aracaju', value: 22, color: '#F59E0B' },
          { label: 'Simão Dias', value: 35, color: '#F97316' },
          { label: 'Lagarto', value: 43, color: '#DC2626' },
        ],
      },
    ],
    actions: [
      { id: 'whatsapp', label: 'Enviar lembretes WhatsApp', tipo: 'whatsapp' },
      { id: 'cobrar', label: 'Cobrar parcelas', tipo: 'cobrar' },
      { id: 'agendar', label: 'Preencher agenda Lagarto', tipo: 'agendar' },
    ],
  }
}

export function runRevenueEngine(_ctx: IntelligenceContext): EngineResult {
  return {
    diagnostico: 'Mapeei receita oculta em cobranças, revisões e upsells não explorados.',
    oportunidade: 'R$ 61.840 identificados — 78% recuperáveis com ações já disponíveis no sistema.',
    recomendacao: 'Priorizar cobrança + campanha de clareamento para pacientes aptos.',
    blocks: [
      {
        type: 'metrics',
        metrics: [
          { label: 'Cobranças atrasadas', value: 12400, prefix: 'R$ ', variant: 'danger' },
          { label: 'Consultas em risco', value: 14800, prefix: 'R$ ', variant: 'warning' },
          { label: 'Revisões pendentes', value: 18700, prefix: 'R$ ', variant: 'success' },
          { label: 'Upsell estético', value: 16400, prefix: 'R$ ', variant: 'primary' },
        ],
      },
      {
        type: 'comparison',
        title: 'Receita escondida por categoria',
        comparison: [
          { label: 'Financeiro', value: 12400, max: 20000 },
          { label: 'Agenda', value: 14800, max: 20000 },
          { label: 'CRM / Revisões', value: 18700, max: 20000 },
          { label: 'Comercial', value: 16400, max: 20000 },
        ],
      },
    ],
    actions: [
      { id: 'cobrar', label: 'Cobrar parcelas', impacto: '+R$ 12.400', tipo: 'cobrar' },
      { id: 'campanha', label: 'Executar campanha', impacto: '+R$ 11.800', tipo: 'campanha' },
      { id: 'relatorio', label: 'Gerar relatório', tipo: 'relatorio' },
    ],
  }
}

export function runDecisionEngine(ctx: IntelligenceContext, unidadeNome?: string): EngineResult {
  const unidade = ctx.unidades?.find(
    (u) => u.nome.toLowerCase().includes((unidadeNome ?? '').toLowerCase()),
  ) ?? ctx.unidades?.find((u) => u.nome === 'Lagarto')

  if (!unidade) {
    return runInsightsEngine(ctx)
  }

  const pctMeta = Math.round((unidade.faturamento / unidade.meta) * 100)

  return {
    diagnostico: `${unidade.nome} opera com ${pctMeta}% da meta mensal e conversão de ${unidade.conversao}%.`,
    oportunidade: `${unidade.oportunidades} oportunidades ativas — potencial imediato de recuperação.`,
    recomendacao:
      pctMeta < 85
        ? `Focar preenchimento de agenda e reativação de pacientes inativos em ${unidade.nome}.`
        : `Manter ritmo e explorar upsell estético em ${unidade.nome}.`,
    blocks: [
      {
        type: 'text',
        content: `Diagnóstico completo — Unidade ${unidade.nome}`,
      },
      {
        type: 'metrics',
        metrics: [
          { label: 'Faturamento', value: unidade.faturamento, prefix: 'R$ ', variant: 'primary' },
          { label: 'Meta', value: `${pctMeta}%`, variant: pctMeta >= 90 ? 'success' : 'warning' },
          { label: 'Conversão', value: unidade.conversao, suffix: '%', variant: 'default' },
          { label: 'Faltas', value: unidade.faltas, variant: 'danger' },
        ],
      },
      {
        type: 'bar-chart',
        title: 'Performance vs. rede',
        items: (ctx.unidades ?? []).map((u) => ({
          label: u.nome,
          value: Math.round((u.faturamento / u.meta) * 100),
          color: u.nome === unidade.nome ? '#0B5FA5' : '#94A3B8',
        })),
      },
    ],
    actions: [
      { id: 'agendar', label: 'Preencher agenda', tipo: 'agendar' },
      { id: 'whatsapp', label: 'Enviar WhatsApp', tipo: 'whatsapp' },
      { id: 'relatorio', label: 'Gerar relatório', tipo: 'relatorio' },
    ],
  }
}

export function runPredictionEngine(_ctx: IntelligenceContext): EngineResult {
  return {
    diagnostico: 'Projeção baseada em histórico, sazonalidade e pipeline comercial.',
    oportunidade: 'Cenário otimista: +R$ 42.000 se todas as ações forem executadas.',
    recomendacao: 'Executar rotina inteligente diariamente para manter trajetória de crescimento.',
    blocks: [
      {
        type: 'metrics',
        metrics: [
          { label: 'Previsão Junho', value: 412000, prefix: 'R$ ', trend: '+8,4%', variant: 'primary' },
          { label: 'Receita em risco', value: 18400, prefix: 'R$ ', variant: 'danger' },
          { label: 'Pipeline', value: 48200, prefix: 'R$ ', variant: 'success' },
        ],
      },
      {
        type: 'bar-chart',
        title: 'Previsão próximos 7 dias (R$ mil)',
        items: [
          { label: 'Qui', value: 18.4 },
          { label: 'Sex', value: 22.1 },
          { label: 'Sáb', value: 12.6 },
          { label: 'Seg', value: 19.8 },
          { label: 'Ter', value: 21.3 },
          { label: 'Qua', value: 20.5 },
          { label: 'Qui', value: 23.7 },
        ],
      },
    ],
    actions: [
      { id: 'executar', label: 'Executar rotina inteligente', tipo: 'executar' },
      { id: 'relatorio', label: 'Gerar relatório mensal', tipo: 'relatorio' },
    ],
  }
}

export function runRecommendationEngine(_ctx: IntelligenceContext): EngineResult {
  return {
    diagnostico: 'Ranking de pacientes com maior probabilidade de fechamento esta semana.',
    oportunidade: 'Top 5 pacientes representam R$ 28.400 em receita potencial.',
    recomendacao: 'Ligar para os 3 primeiros hoje — janela de decisão ideal.',
    blocks: [
      {
        type: 'priority-list',
        title: 'Quem ligar hoje',
        items: [
          { rank: 1, titulo: 'Maria Silva Santos — Clareamento', impacto: 'R$ 2.400', tempo: '87% chance', urgencia: 'alta' },
          { rank: 2, titulo: 'Fernanda Costa — Facetas', impacto: 'R$ 8.200', tempo: '76% chance', urgencia: 'alta' },
          { rank: 3, titulo: 'Ana Carolina — Ortodontia', impacto: 'R$ 6.800', tempo: '68% chance', urgencia: 'media' },
          { rank: 4, titulo: 'Carlos Eduardo — Retorno', impacto: 'R$ 850', tempo: '62% chance', urgencia: 'media' },
          { rank: 5, titulo: 'João Pedro — Revisão', impacto: 'R$ 350', tempo: '55% chance', urgencia: 'baixa' },
        ],
      },
    ],
    actions: [
      { id: 'whatsapp', label: 'Enviar WhatsApp', tipo: 'whatsapp' },
      { id: 'agendar', label: 'Agendar revisões', tipo: 'agendar' },
      { id: 'campanha', label: 'Executar campanha', tipo: 'campanha' },
    ],
  }
}

export function runAutomationEngine(): EngineResult {
  return {
    diagnostico: 'Identifiquei 6 tarefas repetitivas que podem ser automatizadas hoje.',
    oportunidade: 'Economia estimada de 2h40 do time administrativo.',
    recomendacao: 'Executar rotina inteligente agora — zero intervenção manual.',
    blocks: [
      {
        type: 'timeline',
        title: 'Automações disponíveis',
        timeline: [
          { hora: 'Agora', texto: 'Confirmar 18 consultas pendentes' },
          { hora: '+2 min', texto: 'Cobrar 9 parcelas vencidas' },
          { hora: '+5 min', texto: 'Agendar 22 revisões' },
          { hora: '+8 min', texto: 'Atualizar CRM' },
          { hora: '+10 min', texto: 'Disparar campanha clareamento' },
          { hora: '+12 min', texto: 'Atualizar Dashboard' },
        ],
      },
    ],
    actions: [
      { id: 'executar', label: 'Executar rotina inteligente', impacto: '2h40 economizadas', tipo: 'executar' },
    ],
  }
}
