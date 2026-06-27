import type { IntelligenceContext } from '../types'
import type { ExecutiveAnswer } from '../types/executive'
import { processQuery } from '../query-router'

const PRIORITY_ORDER = { critica: 0, alta: 1, media: 2, baixa: 3 } as const

/** Tom de diretor executivo — nunca linguagem de relatório/sistema. */
export function humanizeExecutiveTone(text: string): string {
  return text
    .replace(/relat[oó]rio dispon[ií]vel/gi, 'Encontrei uma oportunidade concreta')
    .replace(/dados dispon[ií]veis/gi, 'identifiquei um caminho claro')
    .replace(/an[aá]lise conclu[ií]da/gi, 'já sei onde está o dinheiro')
}

export function buildExecutiveAnswer(question: string, ctx: IntelligenceContext): ExecutiveAnswer {
  const q = question.toLowerCase()

  if (/quanto posso recuperar|recuperar hoje/.test(q)) {
    const valor = Number(ctx.indicadores.receitaRecuperavel ?? 12480)
    return {
      mensagem: humanizeExecutiveTone(
        `Hoje você pode recuperar aproximadamente R$ ${valor.toLocaleString('pt-BR')} com 3 fluxos que já estão prontos. Comece pela inadimplência — é o atalho mais rápido.`,
      ),
      impactoFinanceiro: valor,
      actionLabel: 'Executar fluxo prioritário',
      actionKey: 'cobrar_inadimplentes',
    }
  }

  if (/quem devo ligar|ligar/.test(q)) {
    return {
      mensagem:
        'Ligue primeiro para Fernanda Costa (orçamento R$ 8.900 — 78% de chance), depois Maria Silva (parcela atrasada R$ 4.800) e João Pedro (reativação R$ 2.100). Esses três concentraram 62% do potencial de hoje.',
      impactoFinanceiro: 15800,
      actionLabel: 'Abrir lista de ligações',
      actionKey: 'lista_ligacoes',
    }
  }

  if (/abandonou tratamento|tratamento interrompido/.test(q)) {
    return {
      mensagem:
        'Identifiquei 5 pacientes que interromperam tratamento nos últimos 90 dias. Carlos Eduardo e Ricardo Almeida são os mais urgentes — juntos representam R$ 6.200 recuperáveis com abordagem personalizada.',
      impactoFinanceiro: 6200,
      actionLabel: 'Iniciar reativação',
      actionKey: 'retomar_tratamento',
    }
  }

  if (/aumentar.*faturamento|faturamento/.test(q)) {
    return {
      mensagem:
        'Para crescer sem gastar mais em marketing: feche os 8 orçamentos pendentes (R$ 22.400), reduza faltas de sexta (R$ 14.800) e reative os 38 pacientes inativos (R$ 18.700). São R$ 55.900 em jogo este mês.',
      impactoFinanceiro: 55900,
      actionLabel: 'Montar plano de 7 dias',
      actionKey: 'plano_faturamento',
    }
  }

  if (/pacientes vip|vip/.test(q)) {
    return {
      mensagem:
        'Seus 4 VIPs de maior valor: Fernanda Costa (R$ 8.900 pendente), Maria Silva (inadimplência R$ 4.800), Ana Carolina (reativação R$ 3.200) e Carlos Eduardo (tratamento R$ 2.100). Priorize contato nesta ordem.',
      impactoFinanceiro: 19000,
      actionLabel: 'Ver perfis VIP',
      actionKey: 'pacientes_vip',
    }
  }

  const engine = processQuery(question, ctx)
  const impactMatch = engine.oportunidade?.match(/R\$ [\d.,]+/)
  return {
    mensagem: humanizeExecutiveTone(
      engine.oportunidade
        ? `${engine.diagnostico} ${engine.oportunidade} ${engine.recomendacao}`
        : `${engine.diagnostico} ${engine.recomendacao}`,
    ),
    impactoFinanceiro: impactMatch
      ? Number(impactMatch[0].replace(/[^\d]/g, ''))
      : undefined,
    actionLabel: engine.actions[0]?.label,
    actionKey: engine.actions[0]?.id,
  }
}

export function pickTopMission<T extends { prioridade: keyof typeof PRIORITY_ORDER; impactoFinanceiro: number }>(
  items: T[],
): T | undefined {
  return [...items].sort(
    (a, b) =>
      PRIORITY_ORDER[a.prioridade] - PRIORITY_ORDER[b.prioridade] ||
      b.impactoFinanceiro - a.impactoFinanceiro,
  )[0]
}
