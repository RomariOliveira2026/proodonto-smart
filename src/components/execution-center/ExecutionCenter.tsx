import { useCallback, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button, FadeIn, useToast } from '../../builder-ui'
import { generateRecoveryMessage, estimateRecoveredValue } from '../../builder-intelligence/lib/executionMessages'
import { getExecutionSession } from '../../data/executionCenter'
import { ExecutivePanel } from './ExecutivePanel'
import { MessageGenerator } from './MessageGenerator'
import { MissionHeader } from './MissionHeader'
import { MissionProgress } from './MissionProgress'
import { MissionSummary } from './MissionSummary'
import { PatientQueue } from './PatientQueue'
import { RecoveryCard } from './RecoveryCard'

export function ExecutionCenter() {
  const { actionKey } = useParams<{ actionKey: string }>()
  const { showToast } = useToast()
  const session = useMemo(() => getExecutionSession(actionKey ?? 'cobrar_inadimplentes'), [actionKey])

  const [completedIds, setCompletedIds] = useState<string[]>([])
  const [recoveredTotal, setRecoveredTotal] = useState(0)
  const [currentId, setCurrentId] = useState<string | null>(() => session.pacientes[0]?.id ?? null)
  const [message, setMessage] = useState('')
  const [messageVisible, setMessageVisible] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const [startedAt] = useState(() => Date.now())

  const { mission, pacientes } = session
  const pending = pacientes.filter((p) => !completedIds.includes(p.id))
  const currentPatient = pacientes.find((p) => p.id === currentId) ?? pending[0] ?? null
  const concluidos = completedIds.length
  const total = pacientes.length
  const allDone = pending.length === 0

  const tempoInvestido = Math.max(1, Math.round((Date.now() - startedAt) / 60000))

  const handleGenerateMessage = useCallback(() => {
    if (!currentPatient) return
    setMessage(generateRecoveryMessage(currentPatient, mission))
    setMessageVisible(true)
  }, [currentPatient, mission])

  const completeCurrentPatient = useCallback(() => {
    if (!currentPatient) return

    const recovered = estimateRecoveredValue(currentPatient, mission)
    setCompletedIds((prev) => [...prev, currentPatient.id])
    setRecoveredTotal((prev) => prev + recovered)
    setMessageVisible(false)
    setMessage('')
    setCelebrate(true)
    showToast(`+${recovered.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })} recuperados · ${currentPatient.nome.split(' ')[0]}`)

    window.setTimeout(() => setCelebrate(false), 1200)

    const nextPending = pacientes.filter(
      (p) => ![...completedIds, currentPatient.id].includes(p.id),
    )
    setCurrentId(nextPending[0]?.id ?? null)
  }, [currentPatient, mission, pacientes, completedIds, showToast])

  const handleNextPatient = () => {
    if (!messageVisible) {
      showToast('Gere a mensagem antes de avançar — ou finalize se já enviou.')
      return
    }
    completeCurrentPatient()
  }

  const handleFinalize = () => {
    setShowSummary(true)
  }

  return (
    <div className="max-w-[1600px] mx-auto pb-16">
      <MissionHeader />
      <MissionProgress
        concluidos={concluidos}
        total={total}
        receitaRecuperada={recoveredTotal}
        meta={mission.metaRecuperacao}
      />

      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-3 rounded-2xl bg-success text-white font-semibold shadow-glow"
          >
            <CheckCircle2 className="w-5 h-5" />
            Paciente concluído!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <ExecutivePanel mission={mission} />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <FadeIn delay={0.08}>
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">Lista inteligente</p>

            <AnimatePresence mode="popLayout">
              {currentPatient && !allDone ? (
                <motion.div
                  key={currentPatient.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-5"
                >
                  <RecoveryCard
                    patient={currentPatient}
                    expanded
                    isActive
                    onToggleExpand={() => {}}
                  />

                  <MessageGenerator
                    message={message}
                    visible={messageVisible}
                    onGenerate={handleGenerateMessage}
                    onMessageChange={setMessage}
                    patientName={currentPatient.nome}
                    whatsappPhone={currentPatient.telefone}
                    email={currentPatient.email}
                  />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      icon={<ArrowRight className="w-5 h-5" />}
                      onClick={handleNextPatient}
                      fullWidth
                    >
                      Próximo paciente
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl border border-success/20 bg-success/5 p-8 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                  <p className="font-display text-xl font-bold text-fg-strong mb-2">Todos os pacientes foram processados.</p>
                  <p className="text-text-muted mb-6">Finalize a missão para ver o resumo completo.</p>
                  <Button variant="glow" size="xl" onClick={handleFinalize}>
                    Finalizar missão
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <PatientQueue
              patients={pacientes}
              currentPatientId={currentId}
              completedIds={completedIds}
              onSelect={(id) => {
                setCurrentId(id)
                setMessageVisible(false)
                setMessage('')
              }}
            />
          </FadeIn>

          {!allDone && concluidos > 0 && (
            <Button variant="outline" size="lg" fullWidth onClick={handleFinalize} className="mt-6">
              Finalizar missão
            </Button>
          )}
        </div>
      </div>

      {showSummary && (
        <MissionSummary
          stats={{
            receitaRecuperada: recoveredTotal,
            meta: mission.metaRecuperacao,
            pacientesConcluidos: concluidos,
            pacientesTotal: total,
            tempoInvestidoMinutos: tempoInvestido,
          }}
        />
      )}
    </div>
  )
}
