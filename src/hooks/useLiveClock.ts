import { useEffect, useState } from 'react'
import { msUntilNextMidnight, msUntilNextMinute } from '../lib/dateTime'

/**
 * Relógio ao vivo em Horário de Brasília: sincroniza a cada minuto e renova a data à 00:00 BRT.
 */
export function useLiveClock(): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const sync = () => setNow(new Date())

    let minuteInterval: ReturnType<typeof setInterval> | undefined
    const minuteTimeout = setTimeout(() => {
      sync()
      minuteInterval = setInterval(sync, 60_000)
    }, msUntilNextMinute())

    let midnightTimeout: ReturnType<typeof setTimeout>
    const scheduleMidnight = () => {
      midnightTimeout = setTimeout(() => {
        sync()
        scheduleMidnight()
      }, msUntilNextMidnight())
    }
    scheduleMidnight()

    return () => {
      clearTimeout(minuteTimeout)
      if (minuteInterval) clearInterval(minuteInterval)
      clearTimeout(midnightTimeout)
    }
  }, [])

  return now
}
