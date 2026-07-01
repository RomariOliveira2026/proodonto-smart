/** Dados simulados — Relatório Executivo semanal */
import type { ExecutiveReportSnapshot } from '../types/intelligenceModules'

export const executiveReportSnapshot: ExecutiveReportSnapshot = {
  periodo: '17 – 23 jun. 2026',
  geradoEm: '24 jun. 2026 · 07:00',
  resumoFinanceiro: {
    recuperada: 42800,
    emRisco: 27200,
    oportunidadesAbertas: 89400,
  },
  secoes: [
    {
      id: 'resumo',
      titulo: 'Resumo da semana',
      conteudo:
        'A operação manteve ritmo estável com foco em recuperação de receita. A IA executou 47 ações automáticas e priorizou 12 decisões de alto impacto para a equipe.',
      variant: 'primary',
    },
    {
      id: 'recuperada',
      titulo: 'Receita recuperada',
      conteudo: 'R$ 42.800 capturados com cobranças, confirmações e reativações — 18% acima da semana anterior.',
      valor: 42800,
      variant: 'success',
    },
    {
      id: 'risco',
      titulo: 'Receita em risco',
      conteudo: 'R$ 27.200 ainda expostos em faltas previstas, parcelas vencidas e orçamentos sem follow-up.',
      valor: 27200,
      variant: 'warning',
    },
    {
      id: 'oportunidades',
      titulo: 'Oportunidades abertas',
      conteudo: 'R$ 89.400 identificados no radar de perda invisível — aguardando execução da equipe.',
      valor: 89400,
      variant: 'primary',
    },
    {
      id: 'melhor',
      titulo: 'Unidade com melhor desempenho',
      conteudo: 'Lagarto liderou com 94% de comparecimento e R$ 18.200 em receita recuperada.',
      variant: 'success',
    },
    {
      id: 'atencao',
      titulo: 'Unidade que precisa de atenção',
      conteudo: 'Simão Dias concentra 62% das parcelas vencidas e 8 orçamentos parados — priorize cobrança e follow-up.',
      variant: 'warning',
    },
    {
      id: 'proxima',
      titulo: 'Recomendações para próxima semana',
      conteudo:
        '1) Neutralizar inadimplência de Simão Dias. 2) Confirmar agenda de sexta em ambas unidades. 3) Reativar 38 pacientes inativos com campanha segmentada. 4) Fechar os 8 orçamentos pendentes.',
      variant: 'neutral',
    },
  ],
}
