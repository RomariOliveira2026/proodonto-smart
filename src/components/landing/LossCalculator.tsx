import { useState } from 'react'
import { Calculator, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card, FadeIn, AnimatedNumber } from '../../builder-ui'

export function LossCalculator() {
  const [pacientes, setPacientes] = useState(300)
  const [valorConsulta, setValorConsulta] = useState(250)
  const [taxaFaltas, setTaxaFaltas] = useState(15)
  const [valorAberto, setValorAberto] = useState(45000)
  const [calculated, setCalculated] = useState(false)

  const perdaFaltas = pacientes * (taxaFaltas / 100) * valorConsulta * 12
  const perdaInadimplencia = valorAberto * 0.35 * 12
  const perdaOciosidade = pacientes * 0.08 * valorConsulta * 12
  const totalAnual = perdaFaltas + perdaInadimplencia + perdaOciosidade
  const recuperavel = totalAnual * 0.62

  const handleCalc = () => setCalculated(true)

  return (
    <section id="calculadora" className="py-24 lg:py-32 bg-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-error/10 text-error text-sm font-semibold mb-6">
            <Calculator className="w-4 h-4" />
            Calculadora de perdas
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
            Quanto sua clínica está perdendo?
          </h2>
          <p className="text-lg text-text-muted font-light max-w-2xl mx-auto">
            Descubra o valor que escoa todos os meses — e quanto você pode recuperar com automação inteligente.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card padding="lg" glow className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {[
                { label: 'Pacientes por mês', value: pacientes, set: setPacientes, min: 50, max: 2000, step: 10 },
                { label: 'Valor médio da consulta (R$)', value: valorConsulta, set: setValorConsulta, min: 80, max: 1500, step: 10 },
                { label: 'Taxa de faltas (%)', value: taxaFaltas, set: setTaxaFaltas, min: 1, max: 50, step: 1 },
                { label: 'Valor em aberto (R$)', value: valorAberto, set: setValorAberto, min: 5000, max: 500000, step: 1000 },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{field.label}</label>
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={field.value}
                    onChange={(e) => { setCalculated(false); field.set(Number(e.target.value)) }}
                    className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <p className="text-right font-display font-bold text-primary text-lg mt-1">
                    {field.label.includes('R$') ? `R$ ${field.value.toLocaleString('pt-BR')}` : field.label.includes('%') ? `${field.value}%` : field.value}
                  </p>
                </div>
              ))}
            </div>

            <Button variant="glow" size="xl" fullWidth onClick={handleCalc} icon={<Calculator className="w-5 h-5" />}>
              Calcular
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
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-white to-primary-light/5 border border-primary/15 text-center">
                    <Sparkles className="w-8 h-8 text-primary-light mx-auto mb-4" />
                    <p className="text-text-muted text-lg mb-2">Sua clínica pode recuperar aproximadamente</p>
                    <p className="font-display text-4xl sm:text-5xl font-bold text-gradient mb-2">
                      <AnimatedNumber value={recuperavel} prefix="R$ " />
                    </p>
                    <p className="text-sm text-text-muted">por ano com o ProOdonto Smart</p>
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-primary/10">
                      <div>
                        <p className="text-xs text-text-muted">Perda por faltas</p>
                        <p className="font-semibold text-error text-sm">R$ {(perdaFaltas / 1000).toFixed(0)}k/ano</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Inadimplência</p>
                        <p className="font-semibold text-warning text-sm">R$ {(perdaInadimplencia / 1000).toFixed(0)}k/ano</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-muted">Ociosidade</p>
                        <p className="font-semibold text-gray-600 text-sm">R$ {(perdaOciosidade / 1000).toFixed(0)}k/ano</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
