import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Building2, Eye, EyeOff, Loader2, Lock, Mail, MapPin, Phone, Sparkles, User } from 'lucide-react'
import { BrandLogo, ThemeToggle, useToast } from '../builder-ui'
import { useAuth } from '../contexts/AuthContext'
import { getLead } from '../lib/leadStorage'
import { LoginLeftPanel } from '../components/login/LoginLeftPanel'
import { LoginField } from '../components/login/LoginField'
import { LoginSecurityBadges } from '../components/login/LoginSecurityBadges'
import '../components/login/login.css'

export function SignupPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { register } = useAuth()
  const { showToast } = useToast()

  const [nome, setNome] = useState('')
  const [clinica, setClinica] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [cidade, setCidade] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const lead = getLead()
    if (lead) {
      setNome(lead.nome)
      setClinica(lead.clinica)
      setEmail(lead.email)
      setWhatsapp(lead.whatsapp)
      setCidade(lead.cidade)
    }
  }, [])

  const fromCalculator = searchParams.get('from') === 'calculator'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (senha !== confirmar) {
      showToast('As senhas não coincidem.')
      return
    }
    if (senha.length < 6) {
      showToast('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setLoading(true)
    try {
      await register({ nome, clinica, email, whatsapp, cidade, senha })
      setExiting(true)
      setTimeout(() => navigate('/app'), 450)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao cadastrar.')
      setLoading(false)
    }
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex">
        <LoginLeftPanel />

        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-surface dark:bg-bg overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[480px] py-8"
          >
            <div className="lg:hidden flex items-center justify-between mb-8">
              <BrandLogo size="md" />
              <ThemeToggle size="sm" />
            </div>

            <div className="hidden lg:flex justify-end mb-6">
              <ThemeToggle size="sm" />
            </div>

            <h2 className="font-display text-2xl font-bold text-fg-strong tracking-tight mb-2">
              Cadastre sua clínica
            </h2>
            <p className="text-text-muted font-light mb-8 text-[15px]">
              {fromCalculator
                ? 'Sua simulação foi salva. Crie sua conta para acessar o painel executivo.'
                : 'Comece grátis. Configure em minutos e veja oportunidades de receita.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <LoginField id="nome" label="Seu nome" type="text" value={nome} onChange={setNome} icon={User} />
              <LoginField id="clinica" label="Nome da clínica" type="text" value={clinica} onChange={setClinica} icon={Building2} />
              <LoginField id="email" label="E-mail" type="email" value={email} onChange={setEmail} icon={Mail} />
              <LoginField id="whatsapp" label="WhatsApp" type="tel" value={whatsapp} onChange={setWhatsapp} icon={Phone} />
              <LoginField id="cidade" label="Cidade" type="text" value={cidade} onChange={setCidade} icon={MapPin} />
              <LoginField
                id="senha"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                value={senha}
                onChange={setSenha}
                icon={Lock}
                trailing={
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted p-0.5" aria-label="Mostrar senha">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
              <LoginField id="confirmar" label="Confirmar senha" type="password" value={confirmar} onChange={setConfirmar} icon={Lock} />

              <motion.button
                type="submit"
                disabled={loading}
                className="login-btn-glow w-full inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold gradient-primary text-white shadow-glow disabled:opacity-80"
              >
                {loading ? <><Loader2 className="w-5 h-5 login-spinner" /> Criando conta...</> : <><Sparkles className="w-5 h-5" /> Criar conta e acessar</>}
              </motion.button>

              <LoginSecurityBadges />
            </form>

            <p className="text-center text-sm text-text-muted mt-8">
              Já tem conta?{' '}
              <Link to="/login" className="text-primary font-medium hover:text-primary-light">Entrar</Link>
            </p>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {exiting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-surface dark:bg-bg pointer-events-none" />
        )}
      </AnimatePresence>
    </>
  )
}
