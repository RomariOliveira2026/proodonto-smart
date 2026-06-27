export const PLANO_MENSAL_BRL = 497

export interface CalculatorInputs {
  pacientesMes: number
  ticketMedio: number
  taxaFaltas: number
  inadimplenciaPercent: number
  tratamentosNaoFechados: number
}

export interface CalculatorResult {
  perdaFaltasMensal: number
  perdaInadimplenciaMensal: number
  perdaTratamentosMensal: number
  perdaMensal: number
  perdaAnual: number
  recuperavelAnual: number
  roiPercent: number
  planoAnual: number
}

export function calcularReceitaPerdida(inputs: CalculatorInputs): CalculatorResult {
  const faturamentoMensal = inputs.pacientesMes * inputs.ticketMedio
  const perdaFaltasMensal = inputs.pacientesMes * (inputs.taxaFaltas / 100) * inputs.ticketMedio
  const perdaInadimplenciaMensal = faturamentoMensal * (inputs.inadimplenciaPercent / 100)
  const perdaTratamentosMensal = inputs.tratamentosNaoFechados * inputs.ticketMedio * 0.85
  const perdaMensal = perdaFaltasMensal + perdaInadimplenciaMensal + perdaTratamentosMensal
  const perdaAnual = perdaMensal * 12
  const recuperavelAnual = perdaAnual * 0.62
  const planoAnual = PLANO_MENSAL_BRL * 12
  const roiPercent = Math.round((recuperavelAnual / planoAnual) * 100)

  return {
    perdaFaltasMensal,
    perdaInadimplenciaMensal,
    perdaTratamentosMensal,
    perdaMensal,
    perdaAnual,
    recuperavelAnual,
    roiPercent,
    planoAnual,
  }
}
