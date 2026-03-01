import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

const SESSION_DURATION = 5 * 60 * 1000 // 5 minutes in ms

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [sessionExpiry, setSessionExpiry] = useState(null)
  const navigate = useNavigate()

  // On mount: restore session if still valid
  useEffect(() => {
    const stored = localStorage.getItem('session')
    if (stored) {
      const { user: savedUser, expiry } = JSON.parse(stored)
      if (Date.now() < expiry) {
        setUser(savedUser)
        setSessionExpiry(expiry)
      } else {
        localStorage.removeItem('session')
      }
    }
  }, [])

  // Auto-logout when session expires
  useEffect(() => {
    if (!sessionExpiry) return
    const remaining = sessionExpiry - Date.now()
    if (remaining <= 0) {
      logout()
      return
    }
    const timer = setTimeout(() => {
      toast.error('Session expired. Please login again.')
      logout()
    }, remaining)
    return () => clearTimeout(timer)
  }, [sessionExpiry])

  const getUsers = () => {
    return JSON.parse(localStorage.getItem('users') || '[]')
  }

  const register = (name, email, password) => {
    const users = getUsers()
    const exists = users.find((u) => u.email === email)
    if (exists) {
      throw new Error('Email already registered')
    }
    const newUser = { id: Date.now().toString(), name, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    return true
  }

  const login = (email, password) => {
    const users = getUsers()
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) {
      throw new Error('Invalid email or password')
    }
    const expiry = Date.now() + SESSION_DURATION
    const sessionUser = { id: found.id, name: found.name, email: found.email }
    setUser(sessionUser)
    setSessionExpiry(expiry)
    localStorage.setItem('session', JSON.stringify({ user: sessionUser, expiry }))
    return true
  }

  const logout = useCallback(() => {
    setUser(null)
    setSessionExpiry(null)
    localStorage.removeItem('session')
    navigate('/login')
  }, [navigate])

  const updateProfile = (updates) => {
    const users = getUsers()
    const idx = users.findIndex((u) => u.id === user.id)
    if (idx === -1) throw new Error('User not found')

    const updated = { ...users[idx], ...updates }
    users[idx] = updated
    localStorage.setItem('users', JSON.stringify(users))

    const updatedSession = { id: updated.id, name: updated.name, email: updated.email }
    const expiry = sessionExpiry
    setUser(updatedSession)
    localStorage.setItem('session', JSON.stringify({ user: updatedSession, expiry }))
  }

  const timeLeft = sessionExpiry ? Math.max(0, sessionExpiry - Date.now()) : 0

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateProfile,
        sessionExpiry,
        timeLeft,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}