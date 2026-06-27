import { motion, type HTMLMotionProps } from 'framer-motion'
import { type ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow'
type Size = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  size?: Size
  children: ReactNode
  fullWidth?: boolean
  icon?: ReactNode
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white shadow-soft hover:shadow-elevated hover:bg-primary-dark',
  secondary: 'bg-primary-light text-white shadow-glow hover:opacity-95',
  outline: 'border border-primary/20 dark:border-primary/30 text-primary bg-white dark:bg-card hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/40',
  ghost: 'text-primary hover:bg-primary/5',
  glow: 'gradient-primary text-white shadow-glow hover:shadow-elevated',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2',
  xl: 'px-8 py-4 text-base gap-2.5 font-semibold',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  )
}
