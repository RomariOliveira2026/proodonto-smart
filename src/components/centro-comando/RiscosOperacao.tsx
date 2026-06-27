import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Card, CardHeader } from '../../builder-ui'
import { riscos } from '../../data/centroComando'

export function RiscosOperacao() {
  return (
    <Card padding="lg" className="border-red-100 dark:border-red-900/30">
      <CardHeader
        title="Riscos da Operação"
        subtitle="Problemas que precisam de atenção imediata"
        badge={<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 text-error text-xs font-bold"><AlertTriangle className="w-3 h-3" /> {riscos.length} ativos</span>}
      />
      <div className="grid sm:grid-cols-2 gap-3">
        {riscos.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -2 }}
            className="flex gap-3 p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 hover:shadow-[0_8px_24px_rgba(220,38,38,0.1)] transition-all cursor-default"
          >
            <div className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30 shrink-0">
              <r.icon className="w-4 h-4 text-error" />
            </div>
            <div>
              <p className="font-semibold text-fg-strong text-sm">{r.titulo}</p>
              <p className="text-xs text-text-muted mt-0.5">{r.descricao}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
