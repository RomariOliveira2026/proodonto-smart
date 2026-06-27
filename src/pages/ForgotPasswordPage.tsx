import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Loader2, Mail } from 'lucide-react'
import { BrandLogo, Button, ThemeToggle } from '../builder-ui'
import { useAuth } from '../contexts/AuthContext'
import { LoginLeftPanel } from '../components/login/LoginLeftPanel'
import { LoginField } from '../components/login/LoginField'
import '../components/login/login.css'

export function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const ok = await requestPasswordReset(email)
    setLoading(false)
    if (ok) setSent(true)
    else setError('E-mail não encontrado. Verifique ou cadastre sua clínica.')
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex">
      <LoginLeftPanel />

      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-surface dark:bg-bg">
        <div className="w-full max-w-[420px]">
          <div className="lg:hidden flex items-center justify-between mb-8">
            <BrandLogo size="md" />
            <ThemeToggle size="sm" />
          </div>

          <div className="hidden lg:flex justify-end mb-8">
            <ThemeToggle size="sm" />
          </div>

          <h2 className="font-display text-2xl font-bold text-fg-strong tracking-tight mb-2">
            Esqueci minha senha
          </h2>
          <p className="text-text-muted font-light mb-8">
            Enviaremos instruções de recuperação para o seu e-mail cadastrado.
          </p>

          {sent ? (
            <div className="p-6 rounded-2xl bg-success/10 border border-success/20 text-center">
              <CheckCircle2 className="w-10 h-10 text-success mx-auto mb-3" />
              <p className="font-semibold text-fg-strong mb-2">Link enviado (simulação)</p>
              <p className="text-sm text-text-muted">
                Em produção, o e-mail chegaria em <strong>{email}</strong>. Por enquanto, use a demo ou cadastre nova conta.
              </p>
              <Link to="/login" className="inline-block mt-6 text-primary font-medium">
                Voltar ao login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <LoginField id="email" label="E-mail" type="email" value={email} onChange={setEmail} icon={Mail} placeholder="seu@email.com" />
              {error && <p className="text-sm text-error">{error}</p>}
              <Button type="submit" variant="glow" size="lg" fullWidth disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</> : 'Enviar instruções'}
              </Button>
            </form>
          )}

          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-text-muted mt-10 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar ao login
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
