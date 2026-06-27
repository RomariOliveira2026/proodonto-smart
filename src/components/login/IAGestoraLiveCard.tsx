import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Check } from 'lucide-react'

const snapshots = [
  [
    '12 consultas confirmadas hoje',
    'R$ 3.200 recuperados',
    '4 pacientes para revisão',
    '18 lembretes enviados',
  ],
  [
    '8 oportunidades identificadas',
    'R$ 5.100 em cobranças recuperadas',
    '6 revisões agendadas',
    '22 confirmações automáticas',
  ],
  [
    '3 unidades sincronizadas',
    'R$ 2.800 em upsell detectado',
    '9 pacientes reativados',
    '15 campanhas disparadas',
  ],
]

export function IAGestoraLiveCard() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % snapshots.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      className="mt-auto w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white/90" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">IA Gestora</p>
          <p className="text-[10px] text-white/50 font-medium">Em ação agora</p>
        </div>
        <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <ul className="space-y-2.5 min-h-[108px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {snapshots[index].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                <span className="font-light leading-snug">{item}</span>
              </li>
            ))}
          </motion.div>
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}
