import type { ConsultantResponse } from '../types/intelligenceModules'

/** Respostas simuladas do Consultor IA — substituir por pipeline OpenAI. */
export function buildConsultantResponse(queryKey: string): ConsultantResponse {
  const q = queryKey.toLowerCase()

  if (/quanto perdi/.test(q)) {
    return {
      diagnostico: 'Este mês, R$ 31.600 ficaram na mesa por faltas, parcelas atrasadas e orçamentos não fechados.',
      impactoFinanceiro: 31600,
      recomendacao: 'Recupere pelo menos 40% nas próximas duas semanas com cobrança amigável e confirmação de agenda.',
      actionLabel: 'Ver perdas detalhadas',
      actionKey: 'radar_perda',
    }
  }

  if (/quem devo ligar/.test(q)) {
    return {
      diagnostico:
        'Eu priorizaria 8 pacientes. Eles somam R$ 32.400 em receita potencial e têm alta chance de retorno porque já iniciaram atendimento nos últimos 12 meses.',
      impactoFinanceiro: 32400,
      recomendacao: 'Comece por Fernanda Costa, Maria Silva e João Pedro — concentram 62% do potencial de hoje.',
      actionLabel: 'Ver lista de pacientes',
      actionKey: 'lista_ligacoes',
    }
  }

  if (/pacientes podem voltar/.test(q)) {
    return {
      diagnostico: '38 pacientes inativos há mais de 12 meses com perfil de retorno favorável.',
      impactoFinanceiro: 18700,
      recomendacao: 'Dispare campanha de reativação segmentada por valor e último procedimento.',
      actionLabel: 'Iniciar reativação',
      actionKey: 'reativar_pacientes',
    }
  }

  if (/orcamentos parados/.test(q)) {
    return {
      diagnostico: '8 orçamentos sem follow-up nos últimos 30 dias — R$ 22.400 em receita travada.',
      impactoFinanceiro: 22400,
      recomendacao: 'Priorize os 3 de maior ticket com mensagem personalizada via WhatsApp.',
      actionLabel: 'Ver orçamentos',
      actionKey: 'orcamentos_pendentes',
    }
  }

  if (/aumentar.*faturamento/.test(q)) {
    return {
      diagnostico: 'Há R$ 55.900 recuperáveis sem aumentar investimento em marketing.',
      impactoFinanceiro: 55900,
      recomendacao: 'Feche orçamentos pendentes, reduza faltas de sexta e reative inativos — nessa ordem.',
      actionLabel: 'Montar plano de ação',
      actionKey: 'plano_faturamento',
    }
  }

  if (/unidade/.test(q)) {
    return {
      diagnostico: 'Simão Dias concentra 62% da inadimplência e 8 orçamentos parados.',
      impactoFinanceiro: 18600,
      recomendacao: 'Alocar 30 minutos diários da equipe administrativa para cobrança e follow-up nessa unidade.',
      actionLabel: 'Ver unidade Simão Dias',
      actionKey: 'multiunidades',
    }
  }

  if (/maior retorno/.test(q)) {
    return {
      diagnostico: 'Cobrar 9 parcelas vencidas é a ação de maior retorno imediato — 15 minutos, R$ 12.400.',
      impactoFinanceiro: 12400,
      recomendacao: 'Execute agora antes de abrir outros fluxos — libera caixa no mesmo dia.',
      actionLabel: 'Executar cobrança',
      actionKey: 'cobrar_inadimplentes',
    }
  }

  return {
    diagnostico: 'Identifiquei oportunidades de recuperação na operação atual.',
    impactoFinanceiro: 12480,
    recomendacao: 'Comece pelas ações de prioridade crítica no Centro de Inteligência.',
    actionLabel: 'Ver plano de hoje',
    actionKey: 'centro_inteligencia',
  }
}
