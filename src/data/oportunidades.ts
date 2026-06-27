import type { LucideIcon } from 'lucide-react'
import {
  CalendarCheck,
  CreditCard,
  RefreshCw,
  Sparkles,
  Stethoscope,
  UserCheck,
  UserX,
} from 'lucide-react'

export const RECEITA_RECUPERAVEL = 101230

export interface Oportunidade {
  id: string
  titulo: string
  quantidade: number
  quantidadeLabel: string
  valor: number
  icon: LucideIcon
  color: string
  bg: string
  categoria: 'operacional' | 'financeiro' | 'relacionamento' | 'upsell'
}

export const oportunidades: Oportunidade[] = [
  { id: 'confirmacoes', titulo: 'Consultas aguardando confirmação', quantidade: 18, quantidadeLabel: 'pacientes', valor: 14800, icon: CalendarCheck, color: 'text-sky-600', bg: 'bg-sky-500/10', categoria: 'operacional' },
  { id: 'parcelas', titulo: 'Parcelas vencidas', quantidade: 9, quantidadeLabel: 'cobranças', valor: 12400, icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-500/10', categoria: 'financeiro' },
  { id: 'revisoes', titulo: 'Revisões pendentes', quantidade: 22, quantidadeLabel: 'pacientes', valor: 18700, icon: Stethoscope, color: 'text-primary', bg: 'bg-primary/10', categoria: 'operacional' },
  { id: 'inativos', titulo: 'Pacientes inativos', quantidade: 14, quantidadeLabel: 'pacientes', valor: 9200, icon: UserX, color: 'text-violet-600', bg: 'bg-violet-500/10', categoria: 'relacionamento' },
  { id: 'retorno', titulo: 'Pacientes sem retorno', quantidade: 12, quantidadeLabel: 'pacientes', valor: 8600, icon: RefreshCw, color: 'text-rose-600', bg: 'bg-rose-500/10', categoria: 'relacionamento' },
  { id: 'clareamento', titulo: 'Oportunidade — Clareamento', quantidade: 15, quantidadeLabel: 'pacientes', valor: 11800, icon: Sparkles, color: 'text-emerald-600', bg: 'bg-emerald-500/10', categoria: 'upsell' },
  { id: 'facetas', titulo: 'Oportunidade — Facetas', quantidade: 8, quantidadeLabel: 'pacientes', valor: 11530, icon: UserCheck, color: 'text-rose-600', bg: 'bg-rose-500/10', categoria: 'upsell' },
  { id: 'implantes', titulo: 'Oportunidade — Implantes', quantidade: 6, quantidadeLabel: 'pacientes', valor: 14200, icon: Stethoscope, color: 'text-primary-light', bg: 'bg-primary-light/10', categoria: 'upsell' },
]

export const radarIndicadores = [
  { label: 'Saúde Geral', value: 96, color: 'success' as const },
  { label: 'Agenda', value: 97, color: 'success' as const },
  { label: 'Financeiro', value: 92, color: 'success' as const },
  { label: 'Conversão', value: 88, color: 'warning' as const },
  { label: 'Fidelização', value: 95, color: 'success' as const },
  { label: 'Marketing', value: 81, color: 'orange' as const },
  { label: 'Equipe', value: 90, color: 'success' as const },
]

export const funilEtapas = [
  { etapa: 'Avaliações', valor: 486, conversao: null },
  { etapa: 'Orçamentos', valor: 312, conversao: 64 },
  { etapa: 'Aceitos', valor: 198, conversao: 63 },
  { etapa: 'Em tratamento', valor: 156, conversao: 79 },
  { etapa: 'Finalizados', valor: 124, conversao: 79 },
  { etapa: 'Programa Fidelidade', valor: 98, conversao: 79 },
]

export const previsaoFaturamento = [
  { semana: 'S1', confirmada: 42, prevista: 48, recuperavel: 12, risco: 8 },
  { semana: 'S2', confirmada: 58, prevista: 62, recuperavel: 18, risco: 6 },
  { semana: 'S3', confirmada: 71, prevista: 78, recuperavel: 22, risco: 9 },
  { semana: 'S4', confirmada: 89, prevista: 95, recuperavel: 28, risco: 7 },
]

export const recomendacoes = [
  { id: '1', prioridade: 'alta' as const, titulo: 'Cobrar 9 parcelas', potencial: 12400 },
  { id: '2', prioridade: 'media' as const, titulo: 'Confirmar consultas', potencial: 14800 },
  { id: '3', prioridade: 'baixa' as const, titulo: 'Campanha Clareamento', potencial: 11800 },
]

export const planoChecklist = [
  'WhatsApps enviados',
  'SMS enviados',
  'Emails enviados',
  'Agenda atualizada',
  'Cobranças programadas',
  'CRM atualizado',
]
