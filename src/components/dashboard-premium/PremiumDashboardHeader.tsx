import { Badge, FadeIn } from '../../builder-ui'
import { formatMonthYearPT, getGreetingPT } from '../../lib/dateTime'

interface PremiumDashboardHeaderProps {
  nome: string
  clinica: string
  now: Date
}

export function PremiumDashboardHeader({ nome, clinica, now }: PremiumDashboardHeaderProps) {
  return (
    <FadeIn>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <Badge variant="primary" dot>Inteligência de Faturamento</Badge>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-fg-strong tracking-tight mt-3">
            {getGreetingPT(now)}, {nome.split(' ')[0]}.
          </h1>
          <p className="text-text-muted font-light mt-2 max-w-2xl">
            A IA analisou <strong className="text-fg-secondary font-medium">{clinica}</strong> e priorizou ações para aumentar faturamento hoje — apoio administrativo e comercial, sem diagnóstico clínico.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm shrink-0">
          <span className="px-3 py-1.5 rounded-full glass border border-gray-100/70 dark:border-white/[0.06] text-fg-secondary">
            {formatMonthYearPT(now)}
          </span>
          <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold border border-primary/15">
            Builder Intelligence™
          </span>
        </div>
      </div>
    </FadeIn>
  )
}
