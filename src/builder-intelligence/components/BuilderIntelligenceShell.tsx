import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useBuilderIntelligence } from './BuilderIntelligenceProvider'
import { IntelligenceBlocks } from './IntelligenceBlocks'

const suggestedPrompts = [
  'Como está Lagarto?',
  'Onde estou perdendo dinheiro?',
  'Quem devo ligar hoje?',
  'Existe receita escondida?',
  'Qual minha previsão para este mês?',
]

export function BuilderIntelligenceFab() {
  const { open, setOpen } = useBuilderIntelligence()

  return (
    <motion.button
      onClick={() => setOpen(!open)}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 350, damping: 28 }}
      whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(11, 95, 165, 0.35)' }}
      whileTap={{ scale: 0.96 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-2xl font-semibold text-sm text-white shadow-glow border border-white/10 transition-shadow ${
        open ? 'gradient-primary ring-2 ring-primary-light/40' : 'gradient-primary'
      }`}
      aria-label="Builder Intelligence"
    >
      <div className="relative">
        <Bot className="w-5 h-5" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white animate-pulse" />
      </div>
      <span className="hidden sm:inline tracking-tight">Builder Intelligence™</span>
    </motion.button>
  )
}

export function BuilderIntelligencePanel() {
  const { open, setOpen, messages, sendQuery, handleAction, context } = useBuilderIntelligence()
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    sendQuery(input)
    setInput('')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/20 dark:bg-black/40 backdrop-blur-[2px] lg:bg-transparent lg:backdrop-blur-none lg:pointer-events-none"
            onClick={() => setOpen(false)}
          />

          <motion.aside
            initial={{ x: '100%', opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.8 }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] lg:w-[480px] flex flex-col bg-card dark:bg-[#0c1222] border-l border-gray-100/80 dark:border-white/[0.06] shadow-[-8px_0_48px_rgba(0,0,0,0.12)]"
          >
            {/* Header */}
            <div className="relative shrink-0 px-5 pt-5 pb-4 border-b border-gray-100 dark:border-white/[0.06]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-light/5 pointer-events-none" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-fg-strong tracking-tight leading-tight">
                      Builder Intelligence™
                    </h2>
                    <p className="text-[11px] text-text-muted font-medium mt-0.5">
                      Diretora Executiva Virtual · {context.produto}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl hover:bg-surface text-text-muted hover:text-fg-strong transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative mt-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-[11px] text-success font-semibold">Análise em tempo real</span>
              </div>
            </div>

            {/* Conversation */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
              {messages.map((msg) => (
                <div key={msg.id} className="mb-6">
                  {msg.role === 'user' && msg.query && (
                    <div className="flex justify-end mb-4">
                      <div className="max-w-[88%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-primary text-white text-sm font-medium">
                        {msg.query}
                      </div>
                    </div>
                  )}
                  {msg.role === 'assistant' && (
                    msg.loading ? (
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface/60 border border-gray-100 dark:border-border">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 120}ms` }} />
                          ))}
                        </div>
                        <span className="text-sm text-text-muted font-light">Analisando operação...</span>
                      </div>
                    ) : msg.response && (
                      <IntelligenceBlocks response={msg.response} onAction={handleAction} />
                    )
                  )}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Suggested prompts */}
            <div className="shrink-0 px-5 pb-2">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendQuery(prompt)}
                    className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium bg-surface border border-gray-100 dark:border-border text-fg-tertiary hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="shrink-0 p-4 border-t border-gray-100 dark:border-white/[0.06] bg-surface/30 dark:bg-white/[0.02]">
              <div className="relative flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte sobre sua operação..."
                  className="flex-1 pl-4 pr-12 py-3 rounded-xl border border-gray-200/80 dark:border-border bg-card text-sm text-fg-strong placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-1.5 p-2 rounded-lg gradient-primary text-white disabled:opacity-40 transition-opacity"
                  aria-label="Enviar"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-text-muted/70 text-center mt-2.5 font-light">
                Apoio administrativo e comercial · Não substitui orientação clínica (CRO)
              </p>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export function BuilderIntelligenceShell() {
  return (
    <>
      <BuilderIntelligenceFab />
      <BuilderIntelligencePanel />
    </>
  )
}
