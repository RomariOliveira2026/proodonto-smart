import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Check, Sparkles } from 'lucide-react'
import { Button } from './Button'
import { Modal } from './Modal'

interface RotinaModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  titulo?: string
  subtitulo?: string
  itens: string[]
  confirmLabel?: string
}

export function RotinaModal({
  open,
  onClose,
  onConfirm,
  titulo = 'Rotina Inteligente',
  subtitulo = 'A IA executará todas as ações automaticamente.',
  itens,
  confirmLabel = 'Confirmar Execução',
}: RotinaModalProps) {
  const [confirming, setConfirming] = useState(false)
  const [checkedCount, setCheckedCount] = useState(0)

  useEffect(() => {
    if (!open) {
      setCheckedCount(0)
      setConfirming(false)
      return
    }
    setCheckedCount(0)
    const timers = itens.map((_, i) =>
      setTimeout(() => setCheckedCount(i + 1), 350 + i * 300),
    )
    return () => timers.forEach(clearTimeout)
  }, [open, itens])

  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => {
      onConfirm()
      onClose()
      setConfirming(false)
    }, 500)
  }

  return (
    <Modal open={open} onClose={onClose} title={titulo} size="lg">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Bot className="w-7 h-7 text-white" />
        </div>
        <p className="text-text-muted font-light flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-primary-light" />
          {subtitulo}
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {itens.map((item, i) => (
          <motion.li
            key={item}
            animate={i < checkedCount ? { opacity: 1, x: 0 } : { opacity: 0.35, x: 0 }}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-surface/80 border border-gray-100 dark:border-border"
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
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
        size="xl"
        fullWidth
        onClick={handleConfirm}
        disabled={checkedCount < itens.length || confirming}
      >
        {confirming ? 'Executando...' : confirmLabel}
      </Button>
    </Modal>
  )
}
