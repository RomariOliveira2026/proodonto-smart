import { useEffect, useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import type { LiveActivityItem } from '../../builder-intelligence/types/liveIntelligence'
import { formatActivityTime } from '../../builder-intelligence/lib/liveIntelligenceEngine'

interface LiveTimelineProps {
  items: LiveActivityItem[]
  now: Date
}

export function LiveTimeline({ items, now }: LiveTimelineProps) {
  const [visibleCount, setVisibleCount] = useState(0)

  const sorted = useMemo(
    () => [...items].sort((a, b) => b.offsetMinutes - a.offsetMinutes),
    [items],
  )

  useEffect(() => {
    setVisibleCount(0)
    const timers = sorted.map((_, i) =>
      window.setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), 400 + i * 450),
    )
    return () => timers.forEach(clearTimeout)
  }, [sorted, now.getMinutes()])

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Atividade da IA</p>
      <ol className="relative space-y-0">
        <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />

        {sorted.map((item, index) => {
          const visible = index < visibleCount
          const time = new Date(now.getTime() - item.offsetMinutes * 60_000)

          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-4 py-2.5"
            >
              <span className="w-14 shrink-0 text-xs font-bold text-primary-light tabular-nums text-right">
                {formatActivityTime(time)}
              </span>
              <motion.div
                initial={{ scale: 0 }}
                animate={visible ? { scale: 1 } : { scale: 0 }}
                className="relative z-10 w-7 h-7 rounded-full bg-success/15 border border-success/30 flex items-center justify-center shrink-0"
              >
                <Check className="w-3.5 h-3.5 text-success" />
              </motion.div>
              <p className="text-sm text-fg-secondary flex-1">{item.message}</p>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
