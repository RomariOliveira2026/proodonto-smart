import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md'
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const dim = size === 'sm' ? 'w-9 h-9' : 'w-10 h-10'
  const icon = size === 'sm' ? 'w-4 h-4' : 'w-[18px] h-[18px]'

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      title={isDark ? 'Tema claro' : 'Tema escuro'}
      className={`relative ${dim} rounded-xl flex items-center justify-center transition-colors
        bg-gray-100/80 hover:bg-gray-200/80 text-gray-600
        dark:bg-white/10 dark:hover:bg-white/15 dark:text-amber-300
        border border-gray-200/60 dark:border-white/10
        ${className}`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {isDark ? <Sun className={icon} /> : <Moon className={icon} />}
      </motion.span>
    </motion.button>
  )
}
