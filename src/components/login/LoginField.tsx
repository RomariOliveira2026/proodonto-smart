import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface LoginFieldProps {
  id: string
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  icon: LucideIcon
  placeholder?: string
  delay?: number
  trailing?: ReactNode
}

export function LoginField({
  id,
  label,
  type,
  value,
  onChange,
  icon: Icon,
  placeholder,
  delay = 0,
  trailing,
}: LoginFieldProps) {
  const [focused, setFocused] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <label htmlFor={id} className="block text-sm font-medium text-fg-tertiary mb-2.5 tracking-wide">
        {label}
      </label>
      <div className="relative group">
        <Icon
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
            focused ? 'text-primary-light' : 'text-text-muted'
          }`}
        />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-11 pr-12 py-3.5 rounded-xl border bg-white dark:bg-card text-fg-strong placeholder:text-text-muted/70
            transition-[box-shadow,border-color,transform] duration-300 ease-out
            focus:outline-none
            ${focused
              ? 'border-primary/40 dark:border-primary-light/40 shadow-[0_0_0_3px_rgba(29,167,224,0.12)] dark:shadow-[0_0_0_3px_rgba(29,167,224,0.18)] scale-[1.005]'
              : 'border-gray-200/90 dark:border-border shadow-soft hover:border-gray-300/80 dark:hover:border-border/80'
            }`}
        />
        {trailing}
      </div>
    </motion.div>
  )
}
