import { useState } from 'react'
import { Copy, Edit3, Mail, MessageSquare, Sparkles, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, useToast } from '../../builder-ui'

interface MessageGeneratorProps {
  message: string
  visible: boolean
  onGenerate: () => void
  onMessageChange: (text: string) => void
  patientName: string
  whatsappPhone?: string
  email?: string
}

export function MessageGenerator({
  message,
  visible,
  onGenerate,
  onMessageChange,
  patientName,
  whatsappPhone,
  email,
}: MessageGeneratorProps) {
  const { showToast } = useToast()
  const [editing, setEditing] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message)
    showToast('Mensagem copiada.')
  }

  const handleWhatsApp = () => {
    if (!whatsappPhone) {
      showToast('Telefone não cadastrado para este paciente.')
      return
    }
    const url = `https://wa.me/55${whatsappPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    showToast(`WhatsApp aberto para ${patientName.split(' ')[0]}.`)
  }

  const handleEmail = () => {
    if (!email) {
      showToast('E-mail não cadastrado para este paciente.')
      return
    }
    const subject = encodeURIComponent('Regularização — PróOdonto')
    const body = encodeURIComponent(message)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="space-y-4">
      {!visible ? (
        <Button variant="glow" size="lg" fullWidth icon={<Sparkles className="w-5 h-5" />} onClick={onGenerate}>
          Gerar mensagem
        </Button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.04] to-transparent p-5 lg:p-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary-light mb-3 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> Mensagem personalizada · IA
            </p>

            {editing ? (
              <textarea
                value={message}
                onChange={(e) => onMessageChange(e.target.value)}
                rows={6}
                className="w-full rounded-xl border border-gray-200/80 dark:border-white/[0.08] bg-card dark:bg-white/[0.03] p-4 text-sm text-fg-secondary leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            ) : (
              <p className="text-sm text-fg-secondary leading-relaxed whitespace-pre-line">{message}</p>
            )}

            <div className="flex flex-wrap gap-2 mt-5">
              <Button variant="outline" size="sm" icon={<Edit3 className="w-3.5 h-3.5" />} onClick={() => setEditing(!editing)}>
                {editing ? 'Salvar' : 'Editar'}
              </Button>
              <Button variant="outline" size="sm" icon={<Copy className="w-3.5 h-3.5" />} onClick={handleCopy}>
                Copiar
              </Button>
              <Button variant="primary" size="sm" icon={<Send className="w-3.5 h-3.5" />} onClick={handleWhatsApp}>
                Enviar WhatsApp
              </Button>
              <Button variant="ghost" size="sm" icon={<Mail className="w-3.5 h-3.5" />} onClick={handleEmail}>
                Enviar Email
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
