import { motion } from 'framer-motion'
import { Database, Lock, Shield } from 'lucide-react'

const items = [
  { icon: Shield, label: 'LGPD' },
  { icon: Lock, label: 'Dados criptografados' },
  { icon: Database, label: 'Backup automático' },
]

export function LoginSecurityBadges() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.5 }}
      className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2"
    >
      {items.map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-1.5 text-[11px] text-text-muted/80 font-medium"
        >
          <item.icon className="w-3 h-3 text-primary/50" />
          {item.label}
        </span>
      ))}
    </motion.div>
  )
}
