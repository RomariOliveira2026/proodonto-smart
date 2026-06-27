import { motion } from 'framer-motion'
import { IAGestoraLiveCard } from './IAGestoraLiveCard'
import './login.css'

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 5.2) % 88}%`,
  top: `${12 + (i * 7.3) % 76}%`,
  size: i % 3 === 0 ? 3 : 2,
  delay: `${(i % 6) * 1.2}s`,
  duration: `${7 + (i % 5)}s`,
}))

export function LoginLeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary" />

      {/* Ondas de gradiente lentas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="login-wave absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full bg-white/10 blur-3xl" />
        <div className="login-wave-delayed absolute -bottom-1/4 -right-1/4 w-[60%] h-[60%] rounded-full bg-primary-light/25 blur-3xl" />
      </div>

      {/* Grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-2h-2v2h2zm0-4v-2h-2v2h2zm0-4v-2h-2v2h2zm0-4v-2h-2v2h2zm0-4v-2h-2v2h2zm0-4v-2h-2v2h2zm0-4v-2h-2v2h2zm0-4v-2h-2v2h2zm0-4v-2h-2v2h2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Partículas + linhas conectadas */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" aria-hidden>
        <defs>
          <linearGradient id="login-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={`${15 + i * 18}%`}
            y1={`${25 + (i % 2) * 20}%`}
            x2={`${35 + i * 14}%`}
            y2={`${55 + (i % 3) * 10}%`}
            stroke="url(#login-line)"
            strokeWidth="1"
          />
        ))}
      </svg>

      {particles.map((p) => (
        <span
          key={p.id}
          className="login-particle absolute rounded-full bg-white pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col min-h-full px-12 xl:px-20 py-14 text-white"
      >
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-10 shadow-glow"
          >
            <span className="text-2xl font-bold">P</span>
          </motion.div>

          <p className="text-xs font-semibold text-white/55 uppercase tracking-[0.2em] mb-5">
            ProOdonto Smart
          </p>
          <h1 className="font-display text-4xl xl:text-[2.75rem] font-bold leading-[1.15] tracking-tight mb-6 max-w-lg">
            A inteligência que faz sua clínica crescer.
          </h1>
          <p className="text-white/65 text-lg font-light leading-relaxed max-w-md">
            Recupere faturamento. Reduza faltas. Automatize cobranças. Tudo em um painel executivo.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-14 grid grid-cols-3 gap-8"
          >
            {[
              { v: 'R$ 61k', l: 'Recuperável' },
              { v: '-40%', l: 'Faltas' },
              { v: '+35%', l: 'Conversão' },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl xl:text-3xl font-bold tracking-tight">{s.v}</p>
                <p className="text-xs text-white/45 mt-1.5 font-medium tracking-wide">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <IAGestoraLiveCard />
      </motion.div>
    </div>
  )
}
