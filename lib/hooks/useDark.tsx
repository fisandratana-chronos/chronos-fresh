'use client'

// ── lib/hooks/useDark.tsx ──────────────────────────────────────
import React, { createContext, useContext, useState, useEffect } from 'react'

interface DarkContextType {
  dark: boolean
  setDark: (dark: boolean) => void
}

const DarkCtx = createContext<DarkContextType>({
  dark: false,
  setDark: () => {},
})

export function DarkProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDarkState] = useState(false)

  // Vakio ny preference saved na ny system preference
  useEffect(() => {
    const saved = localStorage.getItem('chronos-dark')
    if (saved !== null) {
      setDarkState(saved === 'true')
    } else {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkState(prefersDark)
    }
  }, [])

  // Apply dark class amin'ny <html> ary save
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('chronos-dark', String(dark))
    // Background color global
    document.body.style.background = dark ? '#0F172A' : '#F8FAFC'
    document.body.style.color = dark ? '#F1F5F9' : '#0F172A'
  }, [dark])

  const setDark = (val: boolean) => setDarkState(val)

  return (
    <DarkCtx.Provider value={{ dark, setDark }}>
      {children}
    </DarkCtx.Provider>
  )
}

export function useDark() {
  return useContext(DarkCtx)
}
