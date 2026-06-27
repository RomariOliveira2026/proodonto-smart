import { motion } from 'framer-motion'
import { AnimatedNumber, Card, CardHeader, CircularGauge } from '../../builder-ui'
import { NOTA_GERAL, termometroIndicadores } from '../../data/centroComando'

function gaugeColor(value: number): 'success' | 'warning' | 'orange' {
  if (value >= 90) return 'success'
  if (value >= 80) return 'warning'
  return 'orange'
}

export function TermometroClinica() {
  return (
    <Card padding="lg" className="h-full">
      <CardHeader title="Termômetro da Clínica" subtitle="Saúde geral da operação" />
      <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center"
        >
          <div className="w-36 h-36 rounded-full gradient-primary flex flex-col items-center justify-center shadow-glow text-white">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-80">Nota geral</span>
            <span className="font-display text-5xl font-extrabold">
              <AnimatedNumber value={NOTA_GERAL} />
            </span>
          </div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-3 px-4 py-1 rounded-full bg-success/10 text-success font-display font-bold text-lg"
          >
            A+
          </motion.span>
        </motion.div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 flex-1 w-full">
          {termometroIndicadores.map((ind) => (
            <CircularGauge
              key={ind.label}
              label={ind.label}
              value={ind.value}
              color={gaugeColor(ind.value)}
              size={76}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
