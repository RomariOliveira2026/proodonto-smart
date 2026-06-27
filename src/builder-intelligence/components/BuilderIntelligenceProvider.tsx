import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useToast } from '../../builder-ui'
import { createProOdontoContext } from '../adapters/proodonto'
import { getOpeningBriefing, processQuery } from '../query-router'
import type { IntelligenceContext, SuggestedAction } from '../types'
import type { Message } from './IntelligenceConversation'

interface BuilderIntelligenceContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  messages: Message[]
  sendQuery: (query: string) => void
  handleAction: (action: SuggestedAction) => void
  context: IntelligenceContext
}

const BuilderIntelligenceContext = createContext<BuilderIntelligenceContextValue | null>(null)

export function useBuilderIntelligence() {
  const ctx = useContext(BuilderIntelligenceContext)
  if (!ctx) throw new Error('useBuilderIntelligence must be used within BuilderIntelligenceProvider')
  return ctx
}

interface BuilderIntelligenceProviderProps {
  children: ReactNode
  contextFactory?: () => IntelligenceContext
}

export function BuilderIntelligenceProvider({
  children,
  contextFactory = createProOdontoContext,
}: BuilderIntelligenceProviderProps) {
  const { showToast } = useToast()
  const [open, setOpen] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const context = useMemo(() => contextFactory(), [contextFactory])

  const openPanel = useCallback((isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen && !initialized) {
      setInitialized(true)
      const briefing = getOpeningBriefing(context)
      setMessages([{ id: 'briefing', role: 'assistant', response: briefing }])
    }
  }, [context, initialized])

  const sendQuery = useCallback((query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', query: trimmed }
    const loadingId = `l-${Date.now()}`
    const loadingMsg: Message = { id: loadingId, role: 'assistant', loading: true }

    setMessages((prev) => [...prev, userMsg, loadingMsg])

    setTimeout(() => {
      const response = processQuery(trimmed, context)
      setMessages((prev) =>
        prev.map((m) => (m.id === loadingId ? { ...m, loading: false, response } : m)),
      )
    }, 700)
  }, [context])

  const handleAction = useCallback((action: SuggestedAction) => {
    showToast(`${action.label} — ação iniciada.`)
  }, [showToast])

  const value: BuilderIntelligenceContextValue = {
    open,
    setOpen: openPanel,
    messages,
    sendQuery,
    handleAction,
    context,
  }

  return (
    <BuilderIntelligenceContext.Provider value={value}>
      {children}
    </BuilderIntelligenceContext.Provider>
  )
}
