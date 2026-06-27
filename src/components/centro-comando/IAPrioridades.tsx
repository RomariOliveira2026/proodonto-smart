import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { AnimatedNumber, Badge, Button, Card, CardHeader } from '../../builder-ui'
import { iaPrioridades } from '../../data/centroComando'

interface IAPrioridadesProps {
  onExecutar: (id: string) => void
}

export function IAPrioridades({ onExecutar }: IAPrioridadesProps) {
  return (
    <Card padding="lg" glow className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />
      <CardHeader
        title="O que eu faria hoje"
        subtitle="Se a IA fosse a gestora..."
        badge={<Badge variant="primary" dot>IA Gestora</Badge>}
      />
      <div className="space-y-4">
        {iaPrioridades.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-surface/60 border border-gray-100 dark:border-border hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-display font-bold shrink-0">
              {p.ordem}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-fg-strong">{p.titulo}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm">
                <span className="text-success font-semibold">
                  Impacto +<AnimatedNumber value={p.impacto} prefix="R$ " />
                </span>
                <span className="text-text-muted">Tempo: {p.tempo}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => onExecutar(p.id)} icon={<Zap className="w-4 h-4" />}>
              Executar
            </Button>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
