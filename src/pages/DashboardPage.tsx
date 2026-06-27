import { useAuth } from '../contexts/AuthContext'
import { GrowthCenter } from '../components/growth-center'
import { growthCenterSnapshot } from '../data/growthCenter'
import { useLiveClock } from '../hooks/useLiveClock'

export function DashboardPage() {
  const now = useLiveClock()
  const { user } = useAuth()
  const nome = user?.nome ?? 'João Thales'

  return <GrowthCenter data={growthCenterSnapshot} nome={nome} now={now} />
}
