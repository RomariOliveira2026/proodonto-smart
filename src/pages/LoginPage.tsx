import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, Lock, Mail, Sparkles } from 'lucide-react'
import { ThemeToggle, BrandLogo, useToast } from '../builder-ui'
import { useAuth } from '../contexts/AuthContext'
import { getLead } from '../lib/leadStorage'
import { IAGestoraLiveCard } from '../components/login/IAGestoraLiveCard'
import { LoginField } from '../components/login/LoginField'
import { LoginLeftPanel } from '../components/login/LoginLeftPanel'
import { LoginSecurityBadges } from '../components/login/LoginSecurityBadges'
import '../components/login/login.css'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { showToast } = useToast()

  const [email, setEmail] = useState('joao@proodonto.com')
  const [password, setPassword] = useState('demo123')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [welcomeName, setWelcomeName] = useState('João Thales')

  useEffect(() => {
    const lead = getLead()
    if (lead?.email) setEmail(lead.email)
    if (lead?.nome) setWelcomeName(lead.nome)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      setExiting(true)
      const from = (location.state as { from?: string } | null)?.from ?? '/app'
      setTimeout(() => navigate(from), 450)
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erro ao entrar.')
      setLoading(false)
    }
  }

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen flex">
        <LoginLeftPanel />

        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-surface dark:bg-bg">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[420px]"
          >
            <div className="lg:hidden flex items-center justify-between mb-8">
              <BrandLogo size="md" />
              <ThemeToggle size="sm" />
            </div>

            <div className="hidden lg:flex justify-end mb-8">
              <ThemeToggle size="sm" />
            </div>

            <div className="login-form-card rounded-3xl border border-gray-100/80 dark:border-white/[0.06] bg-white/80 dark:bg-card/90 backdrop-blur-sm p-7 sm:p-8 lg:p-0 lg:border-0 lg:bg-transparent lg:backdrop-blur-none lg:shadow-none">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                <h2 className="font-display text-[1.65rem] sm:text-2xl font-bold text-fg-strong tracking-tight leading-tight">
                  Bem-vindo, {welcomeName.split(' ')[0]}.
                </h2>
                <p className="text-text-muted font-light mt-2.5 mb-9 text-[15px] leading-relaxed">
                  Sócio-Administrador · Acesse o painel da sua clínica
                </p>
              </motion.div>

              <div className="lg:hidden mb-8 rounded-2xl overflow-hidden border border-primary/15">
                <div className="gradient-primary p-4">
                  <IAGestoraLiveCard />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <LoginField id="email" label="E-mail" type="email" value={email} onChange={setEmail} icon={Mail} placeholder="seu@email.com" delay={0.28} />
                <LoginField
                  id="password"
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={setPassword}
                  icon={Lock}
                  placeholder="••••••••"
                  delay={0.36}
                  trailing={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors p-0.5" aria-label="Mostrar senha">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />

                <div className="flex justify-end -mt-2">
                  <Link to="/forgot-password" className="text-sm text-primary font-medium hover:text-primary-light transition-colors">
                    Esqueci minha senha
                  </Link>
                </div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44, duration: 0.5 }} className="pt-1">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={loading ? {} : { y: -2 }}
                    whileTap={loading ? {} : { scale: 0.985 }}
                    className="login-btn-glow w-full inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold gradient-primary text-white shadow-glow hover:shadow-elevated disabled:opacity-80 disabled:cursor-wait transition-shadow duration-300"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 login-spinner" /> Entrando...</> : <><Sparkles className="w-5 h-5" /> Acessar painel executivo</>}
                  </motion.button>
                  <LoginSecurityBadges />
                </motion.div>
              </form>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52 }} className="text-center text-sm text-text-muted mt-8">
                Não tem conta?{' '}
                <Link to="/signup" className="text-primary font-medium hover:text-primary-light transition-colors">Cadastre sua clínica</Link>
              </motion.p>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.54 }} className="text-center text-sm text-text-muted mt-4">
                <Link to="/" className="text-primary font-medium hover:text-primary-light transition-colors">← Voltar ao site</Link>
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }} className="mt-6 p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 text-center">
                <p className="text-xs text-text-muted leading-relaxed">
                  <strong className="text-primary font-semibold">Demo:</strong> joao@proodonto.com / demo123
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {exiting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeInOut' }} className="fixed inset-0 z-[100] bg-surface dark:bg-bg pointer-events-none" aria-hidden />
        )}
      </AnimatePresence>
    </>
  )
}
