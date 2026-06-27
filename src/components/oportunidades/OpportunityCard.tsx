import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button, AnimatedNumber } from '../../builder-ui'
import type { Oportunidade } from '../../data/oportunidades'

interface OpportunityCardProps {
  oportunidade: Oportunidade
  index: number
  onExecutar: (id: string) => void
}

export function OpportunityCard({ oportunidade, index, onExecutar }: OpportunityCardProps) {
  const Icon = oportunidade.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(11, 95, 165, 0.15)' }}
      className="group relative bg-card rounded-2xl border border-gray-100 dark:border-border p-6 shadow-soft hover:border-primary/25 hover:shadow-glow transition-colors duration-300"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary-light/0 group-hover:from-primary/5 group-hover:to-primary-light/5 transition-all duration-300 pointer-events-none" />

      <div className="relative">
        <div className={`w-12 h-12 rounded-xl ${oportunidade.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
          <Icon className={`w-6 h-6 ${oportunidade.color}`} />
        </div>

        <h3 className="font-display font-bold text-fg-strong text-base leading-snug mb-3 min-h-[2.5rem]">
          {oportunidade.titulo}
        </h3>

        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-2xl font-display font-bold text-primary">
              <AnimatedNumber value={oportunidade.valor} prefix="R$ " />
            </p>
            <p className="text-xs text-text-muted mt-1">
              {oportunidade.quantidade} {oportunidade.quantidadeLabel}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => onExecutar(oportunidade.id)}
          className="group/btn"
        >
          Executar
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </motion.div>
  )
}
