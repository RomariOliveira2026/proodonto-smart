import type { DecisionPriority } from '../../builder-intelligence/types/executive'

export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export const priorityMeta: Record<
  DecisionPriority,
  { label: string; className: string }
> = {
  critica: { label: 'Crítica', className: 'bg-red-500/15 text-red-400 border-red-500/25' },
  alta: { label: 'Alta', className: 'bg-amber-500/15 text-amber-400 border-amber-500/25' },
  media: { label: 'Média', className: 'bg-primary/10 text-primary-light border-primary/20' },
  baixa: { label: 'Baixa', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
}
