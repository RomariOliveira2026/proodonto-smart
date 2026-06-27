import { metricas, unidades } from '../../data/mock'
import { RECEITA_RECUPERAVEL } from '../../data/oportunidades'
import { riscos, oportunidadesVerdes } from '../../data/centroComando'
import type { IntelligenceContext } from '../types'

/** Adapter ProOdonto → Builder Intelligence™ (substituível por API real) */
export function createProOdontoContext(): IntelligenceContext {
  return {
    produto: 'ProOdonto Smart',
    usuario: {
      nome: 'João Thales',
      cargo: 'Sócio-Administrador',
      unidade: 'Lagarto',
    },
    indicadores: {
      faturamento: metricas.faturamento,
      receitaRecuperavel: RECEITA_RECUPERAVEL,
      riscosAtivos: riscos.length,
      oportunidadesAtivas: oportunidadesVerdes.length,
      taxaConversao: metricas.taxaConversao,
      pendencias: metricas.pendenciasFinanceiras,
    },
    unidades: unidades.map((u) => ({
      id: u.nome,
      nome: u.nome,
      faturamento: u.faturamento,
      meta: u.nome === 'Lagarto' ? 115000 : u.nome === 'Simão Dias' ? 120000 : 195000,
      conversao: u.taxaConversao,
      faltas: u.faltas,
      riscos: u.nome === 'Lagarto' ? 3 : u.nome === 'Simão Dias' ? 2 : 1,
      oportunidades: u.nome === 'Aracaju' ? 4 : 2,
    })),
  }
}
