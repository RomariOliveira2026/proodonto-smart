import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Badge, Button, Card, CardHeader, AnimatedNumber } from '../../builder-ui'
import { recomendacoes } from '../../data/oportunidades'

const prioridadeMap = {
  alta: { label: 'Prioridade Alta', variant: 'danger' as const },
  media: { label: 'Prioridade Média', variant: 'warning' as const },
  baixa: { label: 'Prioridade Baixa', variant: 'info' as const },
}

interface RecomendacoesIAProps {
  onExecutar: (id: string) => void
}

export function RecomendacoesIA({ onExecutar }: RecomendacoesIAProps) {
  return (
    <Card padding="lg">
      <CardHeader
        title="O que fazer hoje"
        subtitle="Recomendações da IA Gestora"
        badge={<Badge variant="primary" dot>IA</Badge>}
      />
      <div className="space-y-4">
        {recomendacoes.map((rec, i) => {
          const p = prioridadeMap[rec.prioridade]
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-surface/60 border border-gray-100 dark:border-border hover:border-primary/20 hover:shadow-soft transition-all"
            >
              <div className="flex-1">
                <Badge variant={p.variant}>{p.label}</Badge>
                <p className="font-display font-bold text-fg-strong mt-2">{rec.titulo}</p>
                <p className="text-sm text-text-muted mt-1">
                  Potencial:{' '}
                  <span className="font-semibold text-success">
                    <AnimatedNumber value={rec.potencial} prefix="R$ " />
                  </span>
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => onExecutar(rec.id)} icon={<Zap className="w-4 h-4" />}>
                Executar
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
