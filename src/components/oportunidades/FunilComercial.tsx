import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Card, CardHeader } from '../../builder-ui'
import { funilEtapas } from '../../data/oportunidades'

const maxValor = funilEtapas[0].valor

export function FunilComercial() {
  return (
    <Card padding="lg" className="h-full">
      <CardHeader title="Funil Comercial" subtitle="Da avaliação à fidelização" />
      <div className="space-y-1">
        {funilEtapas.map((etapa, i) => (
          <div key={etapa.etapa}>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative"
              style={{ paddingLeft: `${i * 3}%`, paddingRight: `${i * 3}%` }}
            >
              <div className="flex items-center justify-between text-sm mb-1.5 px-1">
                <span className="font-semibold text-fg-secondary">{etapa.etapa}</span>
                <span className="font-display font-bold text-primary">{etapa.valor}</span>
              </div>
              <div className="h-10 rounded-xl overflow-hidden bg-surface">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(etapa.valor / maxValor) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full gradient-primary rounded-xl opacity-90"
                />
              </div>
            </motion.div>
            {etapa.conversao !== null && (
              <div className="flex items-center justify-center gap-1 py-1 text-xs text-text-muted">
                <ArrowDown className="w-3 h-3" />
                <span className="font-semibold text-success">{etapa.conversao}% conversão</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
