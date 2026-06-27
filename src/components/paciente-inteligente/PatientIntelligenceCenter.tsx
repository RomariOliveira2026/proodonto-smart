import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Bot,
  Calendar,
  Clock,
  Crown,
  DollarSign,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from 'lucide-react'
import {
  AnimatedNumber,
  Badge,
  Button,
  Card,
  CardHeader,
  ChannelTimeline,
  DetailGrid,
  ExecutiveSummary,
  JourneyStepper,
  MetricHero,
  PatientScoreCard,
  RiskMeter,
} from '../../builder-ui'
import { canalIcons, getPacienteInteligencia, metodoIcons } from '../../data/pacienteInteligente'
import { formatCurrency } from '../../data/mock'
import type { Paciente } from '../../types'

interface PatientIntelligenceCenterProps {
  paciente: Paciente
  onExecutarPlano: () => void
}

const statusMap = {
  ativo: { label: 'Ativo', variant: 'success' as const },
  inativo: { label: 'Inativo', variant: 'neutral' as const },
  em_tratamento: { label: 'Em tratamento', variant: 'primary' as const },
}

export function PatientIntelligenceCenter({ paciente, onExecutarPlano }: PatientIntelligenceCenterProps) {
  const intel = getPacienteInteligencia(paciente.id)
  const iniciais = paciente.nome.split(' ').map((n) => n[0]).slice(0, 2).join('')

  return (
    <motion.div
      key={paciente.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-100/80 dark:border-border bg-card shadow-elevated">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary-light/5" />
        <div className="relative p-6 lg:p-8">
          <div className="flex flex-col xl:flex-row gap-6 xl:items-center">
            <div className="flex items-start gap-5 flex-1 min-w-0">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="w-24 h-24 lg:w-28 lg:h-28 rounded-3xl gradient-primary flex items-center justify-center text-white text-3xl font-bold shadow-glow shrink-0 ring-4 ring-primary/10"
              >
                {iniciais}
              </motion.div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <Badge variant="primary" dot>Patient Intelligence Center</Badge>
                  <Badge variant={statusMap[paciente.status].variant}>{statusMap[paciente.status].label}</Badge>
                </div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-fg-strong tracking-tight">{paciente.nome}</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-text-muted">
                  <span>{intel.idade} anos</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{intel.cidade}</span>
                  <span>{paciente.unidade}</span>
                  <span>{intel.dentista}</span>
                </div>
                <p className="text-sm font-medium text-primary mt-2">{intel.statusTratamento}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 xl:justify-end">
              {[
                { label: 'Ticket Total', value: intel.ticketTotal, icon: DollarSign },
                { label: 'Relacionamento', value: intel.tempoRelacionamento, icon: Clock, text: true },
                { label: intel.builderScoreLabel, value: intel.builderScore, suffix: '/100', icon: Crown, score: true },
              ].map((m) => (
                <div key={m.label} className="px-4 py-3 rounded-2xl bg-surface/80 border border-gray-100 dark:border-border min-w-[120px] hover:border-primary/20 hover:shadow-soft transition-all">
                  <div className="flex items-center gap-1.5 mb-1">
                    <m.icon className="w-3.5 h-3.5 text-primary" />
                    <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">{m.label}</p>
                  </div>
                  {'text' in m && m.text ? (
                    <p className="font-display font-bold text-fg-strong">{m.value}</p>
                  ) : (
                    <p className={`font-display font-bold text-lg ${'score' in m && m.score ? (intel.builderScore >= 90 ? 'text-success' : 'text-warning') : 'text-fg-strong'}`}>
                      {'score' in m && m.score ? (
                        <><AnimatedNumber value={m.value as number} />{m.suffix}</>
                      ) : (
                        formatCurrency(m.value as number)
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ExecutiveSummary
        nome={paciente.nome}
        paragrafos={intel.resumoExecutivo}
        recomendacao={intel.recomendacao}
      />

      <div className="grid xl:grid-cols-2 gap-6">
        <PatientScoreCard
          nota={intel.builderScore}
          grade={intel.builderScoreGrade}
          label={intel.builderScoreLabel}
          componentes={intel.scoreComponentes}
        />
        <Card padding="lg" glow className="h-full">
          <CardHeader title="Valor do Paciente" subtitle="Lifetime value e potencial comercial" badge={<Badge variant="success" dot>Premium</Badge>} />
          <MetricHero
            metrics={[
              { label: 'Total investido', value: intel.valor.totalInvestido, highlight: true },
              { label: 'Ainda contratado', value: intel.valor.aindaContratado },
              { label: 'Potencial futuro', value: intel.valor.potencialFuturo },
              { label: 'Lifetime Value estimado', value: intel.valor.lifetimeValue },
            ]}
          />
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="lg" hover>
          <CardHeader title="Visão Geral" subtitle="Dados de contato e origem" />
          <DetailGrid
            items={[
              { label: 'Telefone', value: intel.visaoGeral.telefone, icon: <Phone className="w-3.5 h-3.5" /> },
              { label: 'WhatsApp', value: intel.visaoGeral.whatsapp, icon: <MessageCircle className="w-3.5 h-3.5" /> },
              { label: 'E-mail', value: intel.visaoGeral.email, icon: <Mail className="w-3.5 h-3.5" /> },
              { label: 'CPF', value: intel.visaoGeral.cpf },
              { label: 'Última consulta', value: intel.visaoGeral.ultimaConsulta, icon: <Calendar className="w-3.5 h-3.5" /> },
              { label: 'Próxima consulta', value: intel.visaoGeral.proximaConsulta, icon: <Calendar className="w-3.5 h-3.5" /> },
              { label: 'Último contato', value: intel.visaoGeral.ultimoContato },
              { label: 'Origem', value: intel.visaoGeral.origem },
            ]}
          />
        </Card>

        <Card padding="lg" glow className="relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />
          <CardHeader
            title="Próxima Melhor Ação"
            subtitle="IA Gestora"
            badge={<Badge variant="primary" dot>IA Gestora</Badge>}
          />
          <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-primary-light/5 border border-primary/10 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-fg-strong">{intel.proximaAcao.titulo}</p>
                <p className="text-sm text-text-muted mt-1 font-light">{intel.proximaAcao.descricao}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-surface/60 text-center">
              <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Probabilidade</p>
              <p className="font-display text-3xl font-bold text-success mt-1">
                <AnimatedNumber value={intel.proximaAcao.probabilidade} suffix="%" />
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface/60 text-center">
              <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Receita estimada</p>
              <p className="font-display text-3xl font-bold text-primary mt-1">
                <AnimatedNumber value={intel.proximaAcao.receitaEstimada} prefix="R$ " />
              </p>
            </div>
          </div>
          <Button variant="glow" fullWidth icon={<Sparkles className="w-4 h-4" />}>
            {intel.proximaAcao.cta}
          </Button>
        </Card>
      </div>

      <Card padding="lg">
        <CardHeader title="Jornada do Paciente" subtitle="Do primeiro contato à fidelização" />
        <JourneyStepper etapas={intel.jornada} />
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="lg" className="border-error/10">
          <CardHeader
            title="Risco"
            subtitle="Probabilidades preditivas"
            badge={<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 text-error text-xs font-bold"><AlertTriangle className="w-3 h-3" /> Monitorar</span>}
          />
          <RiskMeter riscos={intel.riscos} />
        </Card>

        <Card padding="lg" className="border-success/10">
          <CardHeader
            title="Oportunidades"
            subtitle="Upsell e cross-sell"
            badge={<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-success text-xs font-bold"><TrendingUp className="w-3 h-3" /> {intel.oportunidades.length} ativas</span>}
          />
          <div className="space-y-3">
            {intel.oportunidades.map((op, i) => (
              <motion.div
                key={op.id}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 hover:shadow-soft transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center">
                    <Target className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-fg-strong group-hover:text-success transition-colors">{op.titulo}</p>
                    <p className="text-xs text-text-muted">Chance: <strong className="text-success">{op.chance}%</strong></p>
                  </div>
                </div>
                <p className="font-display font-bold text-success">{formatCurrency(op.receita)}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="lg">
          <CardHeader title="Comunicação" subtitle="WhatsApp · SMS · E-mail · Ligações" />
          <ChannelTimeline
            eventos={intel.comunicacoes.map((c) => {
              const Icon = canalIcons[c.canal]
              return {
                id: c.id,
                canal: c.canal,
                data: c.data,
                hora: c.hora,
                resumo: c.resumo,
                direcao: c.direcao,
                icon: <Icon className="w-3.5 h-3.5" />,
              }
            })}
          />
        </Card>

        <Card padding="lg">
          <CardHeader title="Documentos" subtitle="Contratos · Fotos · Exames · PDFs" />
          <div className="grid grid-cols-2 gap-3">
            {intel.documentos.map((doc, i) => (
              <motion.button
                key={doc.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(11,95,165,0.1)' }}
                className="p-4 rounded-xl border border-gray-100 dark:border-border bg-surface/40 hover:border-primary/20 text-left transition-all group"
              >
                <doc.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-fg-strong leading-tight">{doc.titulo}</p>
                <p className="text-[10px] text-text-muted mt-1">{doc.data}</p>
              </motion.button>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="lg">
          <CardHeader title="Histórico Financeiro" subtitle="Parcelas · PIX · Cartão · Boletos" />
          <div className="space-y-3">
            {intel.financeiro.map((f) => {
              const Icon = metodoIcons[f.metodo]
              const statusColors = {
                pago: 'text-success bg-emerald-50 dark:bg-emerald-950/30',
                pendente: 'text-warning bg-amber-50 dark:bg-amber-950/30',
                atrasado: 'text-error bg-red-50 dark:bg-red-950/30',
                negociado: 'text-primary bg-primary/5',
              }
              return (
                <div key={f.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-gray-100 dark:border-border hover:border-primary/15 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-card border border-gray-100 dark:border-border flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-fg-strong truncate">{f.descricao}</p>
                    <p className="text-xs text-text-muted">Venc. {f.vencimento}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-fg-strong">{formatCurrency(f.valor)}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${statusColors[f.status]}`}>{f.status}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card padding="lg" glow>
          <CardHeader title="Satisfação" subtitle="NPS · Avaliações · Indicações" badge={<Badge variant="success" dot>Alta fidelidade</Badge>} />
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-2xl bg-surface/60">
              <p className="text-[10px] font-semibold text-text-muted uppercase">NPS</p>
              <p className="font-display text-4xl font-bold text-success mt-1">{intel.satisfacao.nps}</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-surface/60">
              <p className="text-[10px] font-semibold text-text-muted uppercase">Estrelas</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <p className="font-display text-2xl font-bold text-fg-strong">{intel.satisfacao.estrelas}</p>
              </div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-surface/60">
              <p className="text-[10px] font-semibold text-text-muted uppercase">Avaliações</p>
              <p className="font-display text-4xl font-bold text-fg-strong mt-1">{intel.satisfacao.avaliacoes}</p>
            </div>
          </div>
          <blockquote className="p-4 rounded-2xl bg-primary/5 border border-primary/10 italic text-sm text-fg-secondary mb-4">
            {intel.satisfacao.comentarioDestaque}
          </blockquote>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
            <Heart className="w-5 h-5 text-success shrink-0" />
            <div>
              <p className="text-xs text-text-muted">Probabilidade de indicar amigos</p>
              <p className="font-display text-2xl font-bold text-success">
                <AnimatedNumber value={intel.satisfacao.probabilidadeIndicar} suffix="%" />
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-center pt-2 pb-4">
        <Button
          variant="glow"
          size="xl"
          onClick={onExecutarPlano}
          icon={<Sparkles className="w-5 h-5" />}
          className="px-12 py-5 text-lg shadow-glow"
        >
          Executar Plano Inteligente
        </Button>
      </div>
    </motion.div>
  )
}
