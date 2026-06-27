import { useAuth } from '../contexts/AuthContext'
import {
  IAGestoraChatCard,
  IndicadoresPremium,
  MissoesInteligentes,
  OportunidadesFinanceiras,
  PacientesPrioritariosTable,
  PremiumDashboardHeader,
  ReceitaRecuperadaChart,
  ReceitaRecuperavelHojeHero,
} from '../components/dashboard-premium'
import { dashboardPremiumSnapshot } from '../data/dashboardPremium'
import { useLiveClock } from '../hooks/useLiveClock'

export function DashboardPage() {
  const now = useLiveClock()
  const { user, organization } = useAuth()
  const nome = user?.nome ?? 'João Thales'
  const clinica = organization?.name ?? 'sua clínica'
  const data = dashboardPremiumSnapshot

  return (
    <div className="space-y-8 max-w-[1600px]">
      <PremiumDashboardHeader nome={nome} clinica={clinica} now={now} />

      <ReceitaRecuperavelHojeHero data={data.receitaHoje} />

      <div className="grid xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3">
          <MissoesInteligentes missoes={data.missoes} />
        </div>
        <div className="xl:col-span-2">
          <IAGestoraChatCard briefing={data.iaGestora} now={now} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <OportunidadesFinanceiras oportunidades={data.oportunidades} />
        <ReceitaRecuperadaChart data={data.receitaRecuperada12Meses} />
      </div>

      <IndicadoresPremium indicadores={data.indicadores} />

      <PacientesPrioritariosTable pacientes={data.pacientesPrioritarios} />
    </div>
  )
}
