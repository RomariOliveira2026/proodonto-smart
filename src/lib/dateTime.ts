/** Data e hora sempre em Horário de Brasília (America/Sao_Paulo). */

export const BRASILIA_TZ = 'America/Sao_Paulo'

const brasiliaFormatOpts = { timeZone: BRASILIA_TZ } as const

function getBrasiliaParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    ...brasiliaFormatOpts,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parseInt(parts.find((p) => p.type === type)?.value ?? '0', 10)

  return {
    year: pick('year'),
    month: pick('month'),
    day: pick('day'),
    hour: pick('hour'),
    minute: pick('minute'),
    second: pick('second'),
  }
}

export function formatTimePT(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    ...brasiliaFormatOpts,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function formatLongDatePT(date: Date): string {
  const raw = date.toLocaleDateString('pt-BR', {
    ...brasiliaFormatOpts,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

export function formatMonthYearPT(date: Date): string {
  const raw = date.toLocaleDateString('pt-BR', {
    ...brasiliaFormatOpts,
    month: 'long',
    year: 'numeric',
  })
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

export function getGreetingPT(date: Date): 'Bom dia' | 'Boa tarde' | 'Boa noite' {
  const { hour } = getBrasiliaParts(date)
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

/** Data civil de hoje em Brasília (YYYY-MM-DD). */
export function toISODateBrasilia(date: Date): string {
  return date.toLocaleDateString('sv-SE', brasiliaFormatOpts)
}

/** Soma dias a uma data ISO (YYYY-MM-DD) — uso em dados demo relativos a "hoje". */
export function addDaysISO(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  const next = new Date(y, m - 1, d + days)
  const year = next.getFullYear()
  const month = String(next.getMonth() + 1).padStart(2, '0')
  const day = String(next.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** @deprecated Use toISODateBrasilia */
export const toISODateLocal = toISODateBrasilia

export function msUntilNextMidnight(from = new Date()): number {
  const { hour, minute, second } = getBrasiliaParts(from)
  const elapsedMs = ((hour * 3600 + minute * 60 + second) * 1000) + from.getMilliseconds()
  return 24 * 60 * 60 * 1000 - elapsedMs
}

export function msUntilNextMinute(from = new Date()): number {
  const { second } = getBrasiliaParts(from)
  return (60 - second) * 1000 - from.getMilliseconds()
}
