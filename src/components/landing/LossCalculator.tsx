import { useMemo, useState } from 'react'
import { Calculator, Sparkles, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card, FadeIn, AnimatedNumber } from '../../builder-ui'
import { calcularReceitaPerdida, type CalculatorInputs } from '../../lib/calculator'
import { LeadCaptureModal } from './LeadCaptureModal'

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function LossCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    pacientesMes: 300,
    ticketMedio: 250,
    taxaFaltas: 15,
    inadimplenciaPercent: 12,
    tratamentosNaoFechados: 18,
  })
  const [calculated, setCalculated] = useState(false)
  const [leadOpen, setLeadOpen] = useState(false)

  const result = useMemo(() => calcularReceitaPerdida(inputs), [inputs])

  const fields = [
    { key: 'pacientesMes' as const, label: 'Pacientes por mês', min: 50, max: 2000, step: 10, suffix: '' },
    { key: 'ticketMedio' as const, label: 'Ticket médio (R$)', min: 80, max: 1500, step: 10, suffix: 'R$' },
    { key: 'taxaFaltas' as const, label: 'Taxa de faltas (%)', min: 1, max: 50, step: 1, suffix: '%' },
    { key: 'inadimplenciaPercent' as const, label: 'Inadimplência estimada (%)', min: 1, max: 40, step: 1, suffix: '%' },
    { key: 'tratamentosNaoFechados' as const, label: 'Tratamentos não fechados / mês', min: 0, max: 80, step: 1, suffix: '' },
  ]

  const update = (key: keyof CalculatorInputs, value: number) => {
    setCalculated(false)
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const handleCalc = () => setCalculated(true)

  return (
    <section id="calculadora" className="py-24 lg:py-32 bg-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-error/10 text-error text-sm font-semibold mb-6">
            <Calculator className="w-4 h-4" />
            Calculadora de Receita Perdida
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-fg-strong tracking-tight mb-4">
            Quanto sua clínica está perdendo?
          </h2>
          <p className="text-lg text-text-muted font-light max-w-2xl mx-auto">
            Simule faltas, inadimplência e tratamentos não fechados — e veja o ROI do ProOdonto Smart.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card padding="lg" glow className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {fields.map((field) => (
                <div key={field.key} className={field.key === 'tratamentosNaoFechados' ? 'sm:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-fg-secondary mb-2">{field.label}</label>
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={inputs[field.key]}
                    onChange={(e) => update(field.key, Number(e.target.value))}
                    className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <p className="text-right font-display font-bold text-primary text-lg mt-1">
                    {field.suffix === 'R$'
                      ? `R$ ${inputs[field.key].toLocaleString('pt-BR')}`
                      : field.suffix === '%'
                        ? `${inputs[field.key]}%`
                        : inputs[field.key]}
                  </p>
                </div>
              ))}
            </div>

            <Button variant="glow" size="xl" fullWidth onClick={handleCalc} icon={<Calculator className="w-5 h-5" />}>
              Calcular receita perdida
            </Button>

            <AnimatePresence>
              {calculated && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-white to-primary-light/5 dark:from-primary/10 dark:via-card dark:to-primary-light/5 border border-primary/15 text-center">
                    <Sparkles className="w-8 h-8 text-primary-light mx-auto mb-4" />
                    <p className="text-text-muted text-sm mb-6">Resultado da simulação</p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6 text-left">
                      <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06]">
                        <p className="text-xs text-text-muted mb-1">Perda mensal</p>
                        <p className="font-display text-xl font-bold text-error">{formatBRL(result.perdaMensal)}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06]">
                        <p className="text-xs text-text-muted mb-1">Perda anual</p>
                        <p className="font-display text-xl font-bold text-error">{formatBRL(result.perdaAnual)}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06]">
                        <p className="text-xs text-text-muted mb-1">Recuperável estimado / ano</p>
                        <p className="font-display text-2xl font-bold text-gradient">
                          <AnimatedNumber value={result.recuperavelAnual} prefix="R$ " />
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06]">
                        <p className="text-xs text-text-muted mb-1 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> ROI estimado do ProOdonto Smart
                        </p>
                        <p className="font-display text-2xl font-bold text-success">{result.roiPercent}%</p>
                        <p className="text-[11px] text-text-muted mt-1">vs. plano Professional (R$ 497/mês)</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-6 border-t border-primary/10 text-sm">
                      <div>
                        <p className="text-xs text-text-muted">Faltas</p>
                        <p className="font-semibold text-error">{formatBRL(result.perdaFaltasMensal)}/mês</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Inadimplência</p>
                        <p className="font-semibold text-warning">{formatBRL(result.perdaInadimplenciaMensal)}/mês</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Não fechados</p>
                        <p className="font-semibold text-fg-secondary">{formatBRL(result.perdaTratamentosMensal)}/mês</p>
                      </div>
                    </div>

                    <Button
                      variant="glow"
                      size="xl"
                      fullWidth
                      className="mt-8"
                      onClick={() => setLeadOpen(true)}
                    >
                      Quero recuperar esse dinheiro
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </FadeIn>
      </div>

      <LeadCaptureModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        calculator={{ inputs, result }}
      />
    </section>
  )
}
