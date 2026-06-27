import type { CalculatorInputs, CalculatorResult } from '../lib/calculator'

export interface LeadCapture {
  id: string
  nome: string
  clinica: string
  whatsapp: string
  cidade: string
  email: string
  createdAt: string
  calculator?: {
    inputs: CalculatorInputs
    result: CalculatorResult
  }
}
