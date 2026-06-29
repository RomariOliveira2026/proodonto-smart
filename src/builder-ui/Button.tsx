import { motion, type HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { type MouseEventHandler, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow'
type Size = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  size?: Size
  children: ReactNode
  fullWidth?: boolean
  icon?: ReactNode
  loading?: boolean
  /** Rota interna — renderiza como Link (sem aninhar button) */
  to?: string
  /** Âncora ou URL externa */
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
}

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white shadow-soft hover:shadow-elevated hover:bg-primary-dark active:bg-primary-dark',
  secondary: 'bg-primary-light text-white shadow-glow hover:opacity-95 hover:shadow-elevated',
  outline:
    'border border-primary/20 dark:border-primary/30 text-primary bg-white dark:bg-card hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/40',
  ghost: 'text-primary hover:bg-primary/5 dark:hover:bg-primary/10',
  glow: 'gradient-primary text-white shadow-glow hover:shadow-elevated',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2',
  xl: 'px-8 py-4 text-base gap-2.5 font-semibold',
}

export function getButtonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className = '',
}: {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  className?: string
}) {
  return `inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 ease-out cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth,
  icon,
  loading,
  className = '',
  disabled,
  to,
  href,
  onClick,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading
  const classes = getButtonClassName({ variant, size, fullWidth, className })
  const content = (
    <>
      {loading ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : icon}
      {children}
    </>
  )

  const motionProps = {
    whileHover: isDisabled ? undefined : { scale: 1.02, y: -1 },
    whileTap: isDisabled ? undefined : { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
  }

  if (to) {
    return (
      <motion.span {...motionProps} className={fullWidth ? 'block w-full' : 'inline-flex'}>
        <Link to={to} className={classes} onClick={onClick} aria-disabled={isDisabled ? true : undefined}>
          {content}
        </Link>
      </motion.span>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        {...motionProps}
        className={classes}
        aria-disabled={isDisabled ? true : undefined}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      {...motionProps}
      className={classes}
      disabled={isDisabled}
      {...props}
    >
      {content}
    </motion.button>
  )
}
