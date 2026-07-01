import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Button, FadeIn } from '../../builder-ui'
import { LeadCaptureModal } from './LeadCaptureModal'
import { calcularReceitaPerdida, type CalculatorInputs } from '../../lib/calculator'

const defaultInputs: CalculatorInputs = {
  pacientesMes: 300,
  ticketMedio: 250,
  taxaFaltas: 15,
  inadimplenciaPercent: 12,
  tratamentosNaoFechados: 18,
}

export function PilotCtaSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const calculator = calcularReceitaPerdida(defaultInputs)

  return (
    <>
      <section id="piloto" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] via-card to-primary-light/[0.04] p-10 lg:p-16 text-center">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative max-w-2xl mx-auto">
                <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Sem troca de sistema</p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-fg-strong tracking-tight mb-5">
                  Não precisa trocar seu sistema agora
                </h2>
                <p className="text-text-muted text-lg font-light leading-relaxed mb-8">
                  O ProOdonto Smart pode iniciar como uma camada de inteligência sobre a operação atual da clínica.
                  Primeiro ele prova valor. Depois, se fizer sentido, pode evoluir para uma plataforma completa.
                </p>
                <Button
                  variant="glow"
                  size="xl"
                  icon={<Sparkles className="w-5 h-5" />}
                  onClick={() => setModalOpen(true)}
                >
                  Quero simular na minha clínica
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <LeadCaptureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        calculator={{ inputs: defaultInputs, result: calculator }}
      />
    </>
  )
}
