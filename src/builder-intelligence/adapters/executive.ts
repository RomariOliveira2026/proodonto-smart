import type { IntelligenceContext, IntelligenceUser } from '../types'
import { createProOdontoContext } from './proodonto'

/** Monta contexto do engine com dados do usuário autenticado */
export function createExecutiveContext(usuario?: Partial<IntelligenceUser>): IntelligenceContext {
  const base = createProOdontoContext()
  return {
    ...base,
    usuario: {
      ...base.usuario,
      ...usuario,
    },
    indicadores: {
      ...base.indicadores,
      receitaRecuperadaMes: 42800,
      receitaRecuperadaHoje: 3240,
      receitaRecuperadaVariacao: 18,
    },
  }
}
