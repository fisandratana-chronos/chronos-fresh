'use client'
// ── lib/hooks/useDark.ts (version nohavaozina) ─────────────────────────
// Niova avy amin'ny local state hook ho Context-based provider mba
// hizarana ny dark state amin'ny component rehetra, sy hampihatra
// .dark class amin'ny <html> element mba handehan'ny CSS variables.

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const KEY = 'ch-dark'

// ── 1. Context ──────────────────────────────────────────────────────────
type DarkCtx = { dark: boolean; setDark: (v: boolean) => void }

const DarkContext = createContext<DarkCtx>({
  dark: false,
  setDark: () => {},
})

// ── 2. Provider — apetraka ao amin'ny layout.tsx ────────────────────────
export function DarkProvider({ children }: { children: ReactNode }) {
  const [dark, setDarkState] = useState(false)

  // Vakio ny localStorage ary ampiharo ny class amin'ny <html> eo am-piantombohan'ny app
  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY) === '1'
      setDarkState(stored)
      document.documentElement.classList.toggle('dark', stored)
    } catch {
      // SSR / private mode → default light
    }
  }, [])

  const setDark = (v: boolean) => {
    setDarkState(v)
    // ✅ Ampiharo ny .dark class amin'ny <html> mba handehan'ny CSS variables
    document.documentElement.classList.toggle('dark', v)
    try {
      localStorage.setItem(KEY, v ? '1' : '0')
    } catch { /* noop */ }
  }

  return (
    <DarkContext.Provider value={{ dark, setDark }}>
      {children}
    </DarkContext.Provider>
  )
}

// ── 3. Hook — ampiasain'ny NavClient (toggle) sy components rehetra ─────
export function useDark() {
  return useContext(DarkContext)
}
