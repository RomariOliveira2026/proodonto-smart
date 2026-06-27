import { motion } from 'framer-motion'
import {
  ArrowDown,
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  Target,
  TrendingUp,
  UserX,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { FadeIn, AnimatedNumber, Badge, Card, CardHeader, ExecutiveShortcut } from '../builder-ui'
import { NOTA_GERAL, riscos, oportunidadesVerdes } from '../data/centroComando'
import { ReceitaRecuperavelCard } from '../components/executive/ReceitaRecuperavelCard'
import { IAGestoraPanel } from '../components/executive/IAGestoraPanel'
import { faturamentoMensal, formatCurrency, metricas, unidades } from '../data/mock'
import { useLiveClock } from '../hooks/useLiveClock'
import { formatMonthYearPT, getGreetingPT } from '../lib/dateTime'

const funnelData = [
  { stage: 'Leads', value: 420, fill: '#E0F2FE' },
  { stage: 'Avaliações', value: 280, fill: '#BAE6FD' },
  { stage: 'Orçamentos', value: 195, fill: '#7DD3FC' },
  { stage: 'Aceitos', value: 124, fill: '#38BDF8' },
  { stage: 'Em tratamento', value: 98, fill: '#1DA7E0' },
  { stage: 'Finalizados', value: 76, fill: '#0B5FA5' },
]

const receitaSemanal = [
  { dia: 'Seg', valor: 14200 },
  { dia: 'Ter', valor: 16800 },
  { dia: 'Qua', valor: 18420 },
  { dia: 'Qui', valor: 15900 },
  { dia: 'Sex', valor: 19200 },
  { dia: 'Sáb', valor: 8400 },
]

const ranking = [...unidades].sort((a, b) => b.faturamento - a.faturamento)

const mapPins = [
  { nome: 'Aracaju', x: 72, y: 35, faturamento: 187500, top: true },
  { nome: 'Simão Dias', x: 45, y: 55, faturamento: 112300 },
  { nome: 'Lagarto', x: 58, y: 72, faturamento: 89400 },
]

export function DashboardPage() {
  const now = useLiveClock()
  const chartData = faturamentoMensal.map((d) => ({
    mes: d.mes,
    total: (d.Aracaju + d['Simão Dias'] + d.Lagarto) / 1000,
  }))

  return (
    <div className="space-y-8 max-w-[1600px]">
      <FadeIn>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <Badge variant="primary" dot>Dashboard Executivo</Badge>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-fg-strong tracking-tight mt-3">
              {getGreetingPT(now)}, João Thales.
            </h1>
            <p className="text-text-muted font-light mt-1">
              Sua rede faturou <strong className="text-success font-semibold">{formatCurrency(metricas.faturamento)}</strong> este mês — com <strong className="text-primary font-semibold">R$ 61.840</strong> ainda recuperáveis.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <span className="px-3 py-1.5 rounded-full bg-card border border-gray-100 dark:border-border shadow-soft text-fg-secondary">
              {formatMonthYearPT(now)}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-success font-semibold border border-emerald-200/60 dark:border-emerald-800/40">+12,4% vs. anterior</span>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <ExecutiveShortcut
          to="/app/centro-comando"
          badge={
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-light/15 text-primary-light text-[11px] font-bold uppercase tracking-wider">
              <Target className="w-3 h-3" />
              Sala de controle
            </span>
          }
          title="Centro de Comando"
          subtitle="Tudo o que precisa da sua atenção agora — riscos, oportunidades e ações prioritárias da IA."
          icon={<Target className="w-7 h-7 text-white" />}
          metrics={[
            { label: 'Riscos ativos', value: riscos.length },
            { label: 'Oportunidades', value: oportunidadesVerdes.length },
            { label: 'Nota da clínica', value: `${NOTA_GERAL} · A+` },
            { label: 'Ação urgente', value: 'R$ 12.400' },
          ]}
          cta="Abrir Centro de Comando"
        />
      </FadeIn>

      {/* Giant card + IA */}
      <div className="grid xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3">
          <ReceitaRecuperavelCard />
        </div>
        <div className="xl:col-span-2">
          <IAGestoraPanel compact />
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: 'Faturamento', value: metricas.faturamento, prefix: 'R$ ', icon: DollarSign, color: 'text-primary', bg: 'bg-primary/8' },
          { label: 'Consultas', value: metricas.consultas, icon: Calendar, color: 'text-primary-light', bg: 'bg-sky-50' },
          { label: 'Faltas', value: metricas.faltas, icon: UserX, color: 'text-warning', bg: 'bg-amber-50' },
          { label: 'Pendências', value: metricas.pendenciasFinanceiras, prefix: 'R$ ', icon: DollarSign, color: 'text-error', bg: 'bg-red-50' },
          { label: 'Conversão', value: metricas.taxaConversao, suffix: '%', icon: TrendingUp, color: 'text-success', bg: 'bg-emerald-50' },
          { label: 'Unidades', value: metricas.unidadesAtivas, icon: Building2, color: 'text-fg-tertiary', bg: 'bg-surface' },
        ].map((kpi, i) => (
          <FadeIn key={kpi.label} delay={i * 0.05}>
            <Card padding="sm" hover className="!p-5">
              <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center mb-3`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">{kpi.label}</p>
              <p className={`font-display text-xl font-bold ${kpi.color} mt-0.5`}>
                <AnimatedNumber value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
              </p>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" padding="lg">
          <CardHeader title="Receita consolidada" subtitle="Evolução mensal · 3 unidades" badge={<Badge variant="success" dot>+12,4%</Badge>} />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1DA7E0" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#1DA7E0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}k`} />
                <Tooltip formatter={(v) => [`R$ ${v}k`, 'Receita']} contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
                <Area type="monotone" dataKey="total" stroke="#0B5FA5" strokeWidth={2.5} fill="url(#grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="lg">
          <CardHeader title="Receita da semana" subtitle="Projeção diária" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={receitaSemanal} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="dia" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip formatter={(v) => [formatCurrency(Number(v)), 'Receita']} contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0' }} />
                <Bar dataKey="valor" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1DA7E0" />
                    <stop offset="100%" stopColor="#0B5FA5" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Funnel + Ranking + Map */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card padding="lg">
          <CardHeader title="Funil comercial" subtitle="Lead → Tratamento finalizado" />
          <div className="space-y-2">
            {funnelData.map((stage, i) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-fg-tertiary">{stage.stage}</span>
                  <span className="font-bold text-fg-strong">{stage.value}</span>
                </div>
                <div className="h-8 rounded-lg overflow-hidden bg-surface" style={{ paddingLeft: `${i * 4}%`, paddingRight: `${i * 4}%` }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(stage.value / 420) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-lg"
                    style={{ backgroundColor: stage.fill }}
                  />
                </div>
                {i < funnelData.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown className="w-3 h-3 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-text-muted mt-4 text-center">
            Taxa de conversão global: <strong className="text-success">{metricas.taxaConversao}%</strong>
          </p>
        </Card>

        <Card padding="lg">
          <CardHeader title="Ranking de unidades" subtitle="Por faturamento · Junho" />
          <div className="space-y-4">
            {ranking.map((u, i) => (
              <motion.div
                key={u.nome}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-surface/60 hover:bg-surface transition-colors"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-sm ${
                  i === 0 ? 'gradient-primary text-white' : 'bg-card text-text-muted border border-gray-100 dark:border-border'
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-fg-strong">{u.nome}</p>
                  <p className="text-xs text-text-muted">{u.consultasMes} consultas · {u.taxaConversao}% conversão</p>
                </div>
                <p className="font-display font-bold text-primary">{formatCurrency(u.faturamento)}</p>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card padding="lg">
          <CardHeader title="Mapa da rede" subtitle="Sergipe · 3 unidades ativas" />
          <div className="relative h-56 rounded-2xl bg-gradient-to-br from-primary/5 to-primary-light/10 border border-primary/10 overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(11,95,165,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(29,167,224,0.1) 0%, transparent 50%)',
            }} />
            {mapPins.map((pin) => (
              <motion.div
                key={pin.nome}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="absolute group cursor-pointer"
                style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative">
                  {pin.top && <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white" />}
                  <div className="w-4 h-4 rounded-full gradient-primary shadow-glow animate-pulse" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-elevated">
                      <p className="font-semibold">{pin.nome}</p>
                      <p className="text-white/70">{formatCurrency(pin.faturamento)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-text-muted">
              <MapPin className="w-3.5 h-3.5" />
              Rede Odonto Sergipe
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
