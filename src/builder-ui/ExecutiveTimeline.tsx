import { motion } from 'framer-motion'

export interface TimelineEvent {
  hora: string
  texto: string
  tipo?: string
}

const dotColors: Record<string, string> = {
  agenda: 'bg-primary',
  financeiro: 'bg-success',
  crm: 'bg-violet-500',
  venda: 'bg-amber-500',
  ia: 'bg-primary-light',
  default: 'bg-gray-400',
}

interface ExecutiveTimelineProps {
  eventos: TimelineEvent[]
}

export function ExecutiveTimeline({ eventos }: ExecutiveTimelineProps) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700" />
      <ul className="space-y-5">
        {eventos.map((ev, i) => (
          <motion.li
            key={`${ev.hora}-${i}`}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="relative flex gap-4"
          >
            <div className={`absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-card ${dotColors[ev.tipo ?? 'default'] ?? dotColors.default}`} />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-mono font-semibold text-primary">{ev.hora}</span>
              <p className="text-sm font-medium text-fg-secondary mt-0.5">{ev.texto}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
