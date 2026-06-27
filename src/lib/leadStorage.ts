import type { LeadCapture } from '../types/lead'
import type { CalculatorInputs, CalculatorResult } from './calculator'
import { STORAGE_KEYS } from './storageKeys'

export function getLead(): LeadCapture | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.lead)
    return raw ? (JSON.parse(raw) as LeadCapture) : null
  } catch {
    return null
  }
}

export function saveLead(
  data: Omit<LeadCapture, 'id' | 'createdAt' | 'calculator'>,
  calculator?: { inputs: CalculatorInputs; result: CalculatorResult },
): LeadCapture {
  const lead: LeadCapture = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    calculator,
  }
  localStorage.setItem(STORAGE_KEYS.lead, JSON.stringify(lead))
  return lead
}

export function clearLead(): void {
  localStorage.removeItem(STORAGE_KEYS.lead)
}
