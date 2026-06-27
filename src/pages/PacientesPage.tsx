import { useState } from 'react'
import { Brain, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { Badge, FadeIn, RotinaModal, useToast } from '../builder-ui'
import { PatientIntelligenceCenter } from '../components/paciente-inteligente/PatientIntelligenceCenter'
import { formatCurrency, pacientes } from '../data/mock'
import { getPacienteInteligencia } from '../data/pacienteInteligente'

export function PacientesPage() {
  const { showToast } = useToast()
  const [busca, setBusca] = useState('')
  const [selected, setSelected] = useState(pacientes[0])
  const [planoOpen, setPlanoOpen] = useState(false)

  const filtrados = pacientes.filter(
    (p) => p.nome.toLowerCase().includes(busca.toLowerCase()) || p.email.toLowerCase().includes(busca.toLowerCase()),
  )

  const intel = getPacienteInteligencia(selected.id)

  return (
    <div className="space-y-6 max-w-[1600px]">
      <FadeIn>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <Badge variant="primary" dot>Patient Intelligence Center</Badge>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-fg-strong tracking-tight mt-3">
              Centro de Inteligência do Paciente
            </h1>
            <p className="text-text-muted text-lg font-light mt-1 max-w-2xl">
              Não é um cadastro. É um painel estratégico — entenda qualquer paciente em menos de 30 segundos.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/5 border border-primary/10">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-fg-secondary">{pacientes.length} pacientes · IA ativa</span>
          </div>
        </div>
      </FadeIn>

      <div className="grid xl:grid-cols-12 gap-6">
        {/* Lista lateral */}
        <div className="xl:col-span-3 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar paciente..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-gray-200/80 dark:border-border text-sm text-fg-strong placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 shadow-soft"
            />
          </div>

          <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {filtrados.map((p) => {
              const pIntel = getPacienteInteligencia(p.id)
              const active = selected.id === p.id
              return (
                <motion.button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    active
                      ? 'bg-card border-primary/30 shadow-glow'
                      : 'bg-card/60 border-gray-100 dark:border-border hover:border-primary/15 hover:shadow-soft'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {p.nome.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-fg-strong text-sm truncate">{p.nome}</p>
                      <p className="text-xs text-text-muted">{p.unidade} · Score {pIntel.builderScore}</p>
                    </div>
                    {p.valorPendente > 0 && (
                      <span className="text-xs font-bold text-error shrink-0">{formatCurrency(p.valorPendente)}</span>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Intelligence Center */}
        <div className="xl:col-span-9">
          <AnimatePresence mode="wait">
            <PatientIntelligenceCenter
              key={selected.id}
              paciente={selected}
              onExecutarPlano={() => setPlanoOpen(true)}
            />
          </AnimatePresence>
        </div>
      </div>

      <RotinaModal
        open={planoOpen}
        onClose={() => setPlanoOpen(false)}
        onConfirm={() => showToast('Plano executado.')}
        titulo="Plano Inteligente"
        subtitulo={`A IA preparará todas as ações para ${selected.nome}.`}
        itens={intel.planoInteligente}
        confirmLabel="Executar Plano"
      />
    </div>
  )
}
