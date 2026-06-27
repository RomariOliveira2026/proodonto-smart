type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary'

const variants: Record<BadgeVariant, string> = {
  success: 'bg-emerald-50 text-success border-emerald-200/60',
  warning: 'bg-amber-50 text-warning border-amber-200/60',
  danger: 'bg-red-50 text-error border-red-200/60',
  info: 'bg-sky-50 text-primary-light border-sky-200/60',
  neutral: 'bg-surface text-text-muted border-gray-200/60',
  primary: 'bg-primary/8 text-primary border-primary/15',
}

export function Badge({
  children,
  variant = 'neutral',
  dot,
}: {
  children: React.ReactNode
  variant?: BadgeVariant
  dot?: boolean
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${variants[variant]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${variant === 'success' ? 'bg-success' : variant === 'warning' ? 'bg-warning' : variant === 'danger' ? 'bg-error' : 'bg-primary'}`} />}
      {children}
    </span>
  )
}
