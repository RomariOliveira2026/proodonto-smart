import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { AnimatedNumber, Card, CardHeader } from '../../builder-ui'
import { oportunidadesVerdes } from '../../data/centroComando'

export function OportunidadesVerdes() {
  return (
    <Card padding="lg" className="border-emerald-100 dark:border-emerald-900/30">
      <CardHeader
        title="Oportunidades"
        subtitle="Receita pronta para ser capturada"
        badge={<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-success text-xs font-bold"><TrendingUp className="w-3 h-3" /> {oportunidadesVerdes.length} ativas</span>}
      />
      <div className="grid sm:grid-cols-2 gap-3">
        {oportunidadesVerdes.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -2 }}
            className="flex gap-3 p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 hover:shadow-[0_8px_24px_rgba(22,163,74,0.1)] transition-all"
          >
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 shrink-0">
              <o.icon className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="font-semibold text-fg-strong text-sm">{o.titulo}</p>
              <p className="text-xs text-text-muted mt-0.5">{o.descricao}</p>
              {o.valor && (
                <p className="text-xs font-bold text-success mt-1">
                  +<AnimatedNumber value={o.valor} prefix="R$ " />
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
