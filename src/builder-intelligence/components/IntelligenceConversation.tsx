import { IntelligenceBlocks } from './IntelligenceBlocks'
import type { IntelligenceResponse } from '../types'

interface Message {
  id: string
  role: 'assistant' | 'user'
  query?: string
  response?: IntelligenceResponse
  loading?: boolean
}

interface ConversationProps {
  messages: Message[]
}

export function IntelligenceConversation({ messages }: ConversationProps) {
  return (
    <div className="space-y-6">
      {messages.map((msg) => (
        <div key={msg.id}>
          {msg.role === 'user' && msg.query && (
            <div className="flex justify-end mb-4">
              <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-md bg-primary/10 dark:bg-primary/20 border border-primary/15 text-sm font-medium text-fg-secondary">
                {msg.query}
              </div>
            </div>
          )}

          {msg.role === 'assistant' && (
            <div className="space-y-4">
              {msg.loading ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface/60 border border-gray-100 dark:border-border">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-muted font-light">Analisando operação...</span>
                </div>
              ) : msg.response && (
                <IntelligenceBlocks response={msg.response} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export type { Message }
