import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Check } from 'lucide-react'
import { Button, Modal } from '../../builder-ui'
import { planoChecklist } from '../../data/oportunidades'

interface PlanoInteligenteModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  tituloOportunidade?: string
}

export function PlanoInteligenteModal({ open, onClose, onConfirm, tituloOportunidade }: PlanoInteligenteModalProps) {
  const [confirming, setConfirming] = useState(false)
  const [checkedCount, setCheckedCount] = useState(0)

  useEffect(() => {
    if (!open) {
      setCheckedCount(0)
      setConfirming(false)
      return
    }
    setCheckedCount(0)
    const timers = planoChecklist.map((_, i) =>
      setTimeout(() => setCheckedCount(i + 1), 400 + i * 350),
    )
    return () => timers.forEach(clearTimeout)
  }, [open])

  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => {
      onConfirm()
      onClose()
      setConfirming(false)
    }, 600)
  }

  return (
    <Modal open={open} onClose={onClose} title="Plano Inteligente" size="lg">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Bot className="w-7 h-7 text-white" />
        </div>
        <p className="text-text-muted font-light leading-relaxed">
          A IA preparou automaticamente todas as ações necessárias
          {tituloOportunidade ? (
            <> para <strong className="text-fg-strong">{tituloOportunidade}</strong></>
          ) : (
            '.'
          )}
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {planoChecklist.map((item, i) => (
          <motion.li
            key={item}
            animate={i < checkedCount ? { opacity: 1, x: 0 } : { opacity: 0.35, x: 0 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-surface/80"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
              i < checkedCount ? 'bg-success text-white' : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              {i < checkedCount && <Check className="w-4 h-4" />}
            </div>
            <span className={`text-sm font-medium ${i < checkedCount ? 'text-fg-strong' : 'text-text-muted'}`}>
              {item}
            </span>
          </motion.li>
        ))}
      </ul>

      <Button
        variant="glow"
        size="lg"
        fullWidth
        onClick={handleConfirm}
        disabled={checkedCount < planoChecklist.length || confirming}
      >
        {confirming ? 'Iniciando...' : 'Confirmar Execução'}
      </Button>
    </Modal>
  )
}
