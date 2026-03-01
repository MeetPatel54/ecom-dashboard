import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

// Returns { minutes, seconds, percent } of session remaining
export function useSessionTimer() {
  const { sessionExpiry } = useAuth()
  const SESSION_DURATION = 5 * 60 * 1000

  const getRemaining = () => {
    if (!sessionExpiry) return 0
    return Math.max(0, sessionExpiry - Date.now())
  }

  const [remaining, setRemaining] = useState(getRemaining)

  useEffect(() => {
    if (!sessionExpiry) return
    const interval = setInterval(() => {
      setRemaining(getRemaining())
    }, 1000)
    return () => clearInterval(interval)
  }, [sessionExpiry])

  const minutes = Math.floor(remaining / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)
  const percent = (remaining / SESSION_DURATION) * 100

  return { minutes, seconds, percent, remaining }
}