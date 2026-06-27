import { useNavigate } from 'react-router-dom'
import {
  CalendarCheck,
  FileText,
  Rocket,
  Sparkles,
  UserPlus,
  Wallet,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge, Button, FadeIn, useToast } from '../../builder-ui'
import { useBuilderIntelligence } from '../../builder-intelligence'
import { getGreetingPT } from '../../lib/dateTime'
import type { GrowthCenterSnapshot, GrowthMission, MissionIconKey } from '../../types/growthCenter'
import { AIInsights } from './AIInsights'
import { ClinicRadar } from './ClinicRadar'
import { GrowthSimulator } from './GrowthSimulator'
import { MissionCard } from './MissionCard'
import { RevenueGauge } from './RevenueGauge'

interface GrowthCenterProps {
  data: GrowthCenterSnapshot
  nome: string
  now: Date
}

const missionIcons: Record<MissionIconKey, typeof CalendarCheck> = {
  confirmar: CalendarCheck,
  cobrar: Wallet,
  reativar: UserPlus,
  orcamentos: FileText,
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

function getDoctorGreeting(nome: string, now: Date) {
  const firstName = nome.split(' ')[0]
  return `${getGreetingPT(now)}, Dr. ${firstName}.`
}

export function GrowthCenter({ data, nome, now }: GrowthCenterProps) {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { setOpen } = useBuilderIntelligence()

  const handleExecutePlan = () => {
    navigate('/app/oportunidades')
    showToast('Plano de hoje iniciado — Central de Oportunidades aberta.')
  }

  const handleMissionExecute = (missao: GrowthMission) => {
    showToast(`Executando: ${missao.titulo} · ${formatCurrency(missao.valorFinanceiro)}`)
  }

  const handleGeneratePlan = () => {
    setOpen(true)
    showToast('IA Gestora montando plano completo de crescimento.')
  }

  return (
    <div className="space-y-10 lg:space-y-14 max-w-[1600px]">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Badge variant="primary" dot>Consultor de negócios · IA</Badge>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">Centro de Crescimento</p>
        </div>
      </FadeIn>

      {/* Hero */}
      <FadeIn delay={0.04}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10"
        >
          <div className="absolute inset-0 gradient-primary opacity-[0.98]" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="relative p-8 lg:p-12 xl:p-14">
            <div className="grid xl:grid-cols-[1fr_auto] gap-10 xl:gap-16 items-center">
              <div className="text-white max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/12 text-xs font-semibold uppercase tracking-wider mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  Seu consultor trabalhando agora
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                  {getDoctorGreeting(nome, now)}
                </h1>
                <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed mb-8">
                  Hoje encontramos oportunidades para recuperar aproximadamente{' '}
                  <strong className="text-white font-semibold">
                    {formatCurrency(data.hero.oportunidadeFaturamento)}
                  </strong>{' '}
                  em faturamento.
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Rocket className="w-5 h-5 text-primary" />}
                  onClick={handleExecutePlan}
                  className="!bg-white !text-primary hover:!bg-white/90 !border-white/20 shadow-soft [&_svg]:text-primary"
                >
                  Executar Plano de Hoje
                </Button>
              </div>

              <RevenueGauge label="Receita Recuperável" value={data.hero.receitaRecuperavel} max={16000} />
            </div>
          </div>
        </motion.div>
      </FadeIn>

      {/* Missões do Dia */}
      <section>
        <FadeIn delay={0.08}>
          <div className="mb-6 lg:mb-8">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-fg-strong tracking-tight">
              Missões do Dia
            </h2>
            <p className="text-text-muted mt-2 font-light">
              Ações prioritárias geradas pela IA para maximizar faturamento hoje.
            </p>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
          {data.missoes.map((missao, index) => {
            const Icon = missionIcons[missao.iconKey]
            return (
              <MissionCard
                key={missao.id}
                icon={<Icon className="w-6 h-6" />}
                titulo={missao.titulo}
                descricao={missao.descricao}
                valorFinanceiro={missao.valorFinanceiro}
                index={index}
                onExecute={() => handleMissionExecute(missao)}
              />
            )
          })}
        </div>
      </section>

      {/* Radar + Insights */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        <ClinicRadar data={data.radar} />
        <AIInsights data={data.insights} onGeneratePlan={handleGeneratePlan} />
      </div>

      {/* Simulador */}
      <GrowthSimulator baseline={data.simulator} />
    </div>
  )
}
