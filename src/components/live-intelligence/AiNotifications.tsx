import { useEffect, useState } from 'react'
import { Bell, CalendarCheck, DollarSign, MessageCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { AiNotificationItem, AiNotificationType } from '../../builder-intelligence/types/liveIntelligence'

interface AiNotificationsProps {
  items: AiNotificationItem[]
}

const iconMap: Record<AiNotificationType, typeof Bell> = {
  resposta: MessageCircle,
  confirmacao: CalendarCheck,
  orcamento: DollarSign,
  pagamento: DollarSign,
}

const accentMap: Record<AiNotificationType, string> = {
  resposta: 'text-primary-light bg-primary/10',
  confirmacao: 'text-success bg-success/10',
  orcamento: 'text-amber-400 bg-amber-500/10',
  pagamento: 'text-success bg-emerald-500/10',
}

export function AiNotifications({ items }: AiNotificationsProps) {
  const [visible, setVisible] = useState<AiNotificationItem[]>([])

  useEffect(() => {
    setVisible([])
    items.forEach((item, i) => {
      window.setTimeout(() => {
        setVisible((prev) => [...prev, item])
      }, 800 + i * 1200)
    })
  }, [items])

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
        <Bell className="w-3.5 h-3.5" />
        Sinais ao vivo
      </p>
      <ul className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
        <AnimatePresence>
          {visible.map((item) => {
            const Icon = iconMap[item.tipo]
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: 20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100/80 dark:border-white/[0.06] bg-card/60 dark:bg-white/[0.02]"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${accentMap[item.tipo]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-sm text-fg-secondary">{item.message}</p>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>
    </div>
  )
}
