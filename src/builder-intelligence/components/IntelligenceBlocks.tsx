import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  Calendar,
  CreditCard,
  FileText,
  Megaphone,
  MessageCircle,
  Zap,
} from 'lucide-react'
import { AnimatedNumber, ProgressBar } from '../../builder-ui'
import type { IntelligenceBlock, IntelligenceResponse, SuggestedAction } from '../types'

const actionIcons = {
  confirmar: Calendar,
  cobrar: CreditCard,
  whatsapp: MessageCircle,
  agendar: Calendar,
  campanha: Megaphone,
  relatorio: FileText,
  executar: Zap,
}

const variantColors = {
  default: 'text-fg-strong',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-error',
  primary: 'text-primary',
}

function BlockRenderer({ block }: { block: IntelligenceBlock }) {
  switch (block.type) {
    case 'greeting':
    case 'text':
      return (
        <p className="text-sm text-fg-secondary font-light leading-relaxed whitespace-pre-line">
          {block.content}
        </p>
      )

    case 'insight':
      return (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/8 to-primary-light/5 border border-primary/15">
          {block.highlight && (
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">{block.highlight}</p>
          )}
          <p className="text-sm text-fg-secondary leading-relaxed">{block.content}</p>
        </div>
      )

    case 'metrics':
      return (
        <div className="grid grid-cols-3 gap-2">
          {block.metrics?.map((m) => (
            <div key={m.label} className="p-3 rounded-xl bg-surface/70 border border-gray-100 dark:border-border text-center">
              <p className="text-[9px] font-semibold text-text-muted uppercase tracking-wider">{m.label}</p>
              <p className={`font-display font-bold text-lg mt-1 ${variantColors[m.variant ?? 'default']}`}>
                {typeof m.value === 'number' ? (
                  <AnimatedNumber value={m.value} prefix={m.prefix} suffix={m.suffix} />
                ) : (
                  m.value
                )}
              </p>
              {m.trend && <p className="text-[10px] text-success font-semibold mt-0.5">{m.trend}</p>}
            </div>
          ))}
        </div>
      )

    case 'priority-list':
      return (
        <div>
          {block.title && <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">{block.title}</p>}
          <div className="space-y-2">
            {(block.items as import('../types').PriorityItem[])?.map((item) => (
              <motion.div
                key={item.rank}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface/60 border border-gray-100 dark:border-border"
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  item.urgencia === 'alta' ? 'bg-error/10 text-error' :
                  item.urgencia === 'media' ? 'bg-warning/10 text-warning' :
                  'bg-gray-100 dark:bg-gray-800 text-text-muted'
                }`}>
                  {item.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-fg-strong truncate">{item.titulo}</p>
                  <p className="text-xs text-text-muted">{item.tempo ?? item.urgencia}</p>
                </div>
                <p className="text-sm font-bold text-success shrink-0">{item.impacto}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )

    case 'bar-chart':
      return (
        <div>
          {block.title && <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">{block.title}</p>}
          <div className="space-y-3">
            {(block.items as import('../types').ChartItem[])?.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-fg-secondary">{item.label}</span>
                  <span className="font-bold text-fg-strong">{item.value}{typeof item.value === 'number' && item.value < 100 ? '%' : ''}</span>
                </div>
                <ProgressBar
                  value={item.value}
                  max={Math.max(...((block.items as import('../types').ChartItem[])?.map((i) => i.value) ?? [100]))}
                  color={item.color ?? '#0B5FA5'}
                />
              </div>
            ))}
          </div>
        </div>
      )

    case 'comparison':
      return (
        <div>
          {block.title && <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">{block.title}</p>}
          <div className="space-y-3">
            {block.comparison?.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-fg-secondary">{item.label}</span>
                  <span className="font-bold text-primary">{item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}</span>
                </div>
                <ProgressBar value={item.value} max={item.max} color="gradient-primary" />
              </div>
            ))}
          </div>
        </div>
      )

    case 'timeline':
      return (
        <div>
          {block.title && <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">{block.title}</p>}
          <ul className="space-y-2">
            {block.timeline?.map((ev) => (
              <li key={ev.texto} className="flex gap-3 text-sm">
                <span className="text-xs font-mono font-semibold text-primary shrink-0 w-14">{ev.hora}</span>
                <span className="text-fg-secondary">{ev.texto}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    default:
      return null
  }
}

function ActionButtons({ actions, onAction }: { actions: SuggestedAction[]; onAction: (a: SuggestedAction) => void }) {
  return (
    <div className="pt-2 border-t border-gray-100 dark:border-border">
      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Ação sugerida</p>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => {
          const Icon = actionIcons[action.tipo]
          return (
            <motion.button
              key={action.id}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAction(action)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-primary/8 hover:bg-primary/15 text-primary border border-primary/15 transition-colors"
            >
              <Icon className="w-3.5 h-3.5" />
              {action.label}
              {action.impacto && <span className="text-success">({action.impacto})</span>}
              <ArrowRight className="w-3 h-3 opacity-50" />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

interface IntelligenceBlocksProps {
  response: IntelligenceResponse
  onAction?: (action: SuggestedAction) => void
}

export function IntelligenceBlocks({ response, onAction }: IntelligenceBlocksProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl bg-card border border-gray-100/80 dark:border-border shadow-soft space-y-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-glow">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0 space-y-3">
          {response.blocks.map((block, i) => (
            <BlockRenderer key={`${block.type}-${i}`} block={block} />
          ))}
        </div>
      </div>

      <div className="grid gap-2 text-xs">
        <div className="flex gap-2">
          <span className="font-bold text-primary shrink-0">→</span>
          <p className="text-fg-tertiary"><strong className="text-fg-secondary">Recomendação:</strong> {response.recomendacao}</p>
        </div>
      </div>

      {onAction && response.actions.length > 0 && (
        <ActionButtons actions={response.actions} onAction={onAction} />
      )}
    </motion.div>
  )
}

export function IntelligenceBlocksStatic({ response }: { response: IntelligenceResponse }) {
  return <IntelligenceBlocks response={response} />
}
