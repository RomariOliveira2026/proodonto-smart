import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Mail, MapPin, Phone, User } from 'lucide-react'
import { Button, Modal } from '../../builder-ui'
import { saveLead } from '../../lib/leadStorage'
import type { CalculatorInputs, CalculatorResult } from '../../lib/calculator'

interface LeadCaptureModalProps {
  open: boolean
  onClose: () => void
  calculator: { inputs: CalculatorInputs; result: CalculatorResult }
}

export function LeadCaptureModal({ open, onClose, calculator }: LeadCaptureModalProps) {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [clinica, setClinica] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [cidade, setCidade] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    saveLead({ nome, clinica, whatsapp, cidade, email }, calculator)
    setTimeout(() => {
      setLoading(false)
      onClose()
      navigate('/signup?from=calculator')
    }, 600)
  }

  const fieldClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200/90 dark:border-border bg-white dark:bg-card text-fg-strong placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30'

  return (
    <Modal open={open} onClose={onClose} title="Quero recuperar esse dinheiro">
      <p className="text-sm text-text-muted mb-6 leading-relaxed">
        Preencha os dados da sua clínica. Em seguida, você cria sua conta e acessa o painel com as oportunidades identificadas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-fg-tertiary mb-2">
            <User className="w-4 h-4" /> Nome
          </label>
          <input required value={nome} onChange={(e) => setNome(e.target.value)} className={fieldClass} placeholder="Seu nome" />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-fg-tertiary mb-2">
            <Building2 className="w-4 h-4" /> Clínica
          </label>
          <input required value={clinica} onChange={(e) => setClinica(e.target.value)} className={fieldClass} placeholder="Nome da clínica" />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-fg-tertiary mb-2">
            <Phone className="w-4 h-4" /> WhatsApp
          </label>
          <input required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={fieldClass} placeholder="(79) 99999-0000" />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-fg-tertiary mb-2">
            <MapPin className="w-4 h-4" /> Cidade
          </label>
          <input required value={cidade} onChange={(e) => setCidade(e.target.value)} className={fieldClass} placeholder="Sua cidade" />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-fg-tertiary mb-2">
            <Mail className="w-4 h-4" /> E-mail
          </label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} placeholder="seu@email.com" />
        </div>

        <Button type="submit" variant="glow" size="lg" fullWidth disabled={loading} className="mt-2">
          {loading ? 'Salvando...' : 'Continuar para cadastro'}
        </Button>
      </form>
    </Modal>
  )
}
