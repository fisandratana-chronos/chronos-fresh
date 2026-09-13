'use client'
// ── lib/hooks/useDark.ts (version nohavaozina — tsy misy "flash") ──────
// Niova avy amin'ny local state hook ho Context-based provider mba
// hizarana ny dark state amin'ny component rehetra, sy hampihatra
// .dark class amin'ny <html> element mba handehan'ny CSS variables.
//
// ⚠️ FIX (fisokafan'ny hazavana vetivety rehefa reload/remount): ny
// useState() dia namboarina mba hamaky mivantana ny class ".dark" efa
// napetraky ilay inline <script> ao amin'ny layout.tsx (jereo
// app/layout.tsx — mila ampiana io script io raha mbola tsy misy),
// fa tsy hanomboka amin'ny "false" (light) foana ary hiova aty
// aoriana ao anaty useEffect ihany — io fahataran'ny useEffect io no
// niteraka ilay "flash" hita.

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const KEY = 'ch-dark'

// ── 1. Context ──────────────────────────────────────────────────────────
type DarkCtx = { dark: boolean; setDark: (v: boolean) => void }

const DarkContext = createContext<DarkCtx>({
  dark: false,
  setDark: () => {},
})

// Mamaky ny class ".dark" efa napetraky ny inline script ao amin'ny
// <head> (layout.tsx) — io script io dia mandeha ALOHAN'i React, ka
// rehefa mby eto isika dia efa marina ny valiny (tsy mila miandry
// useEffect intsony). Miverina ho "false" tsotra amin'ny SSR (server
// tsy manana "document").
function getInitialDark(): boolean {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

// ── 2. Provider — apetraka ao amin'ny layout.tsx ────────────────────────
export function DarkProvider({ children }: { children: ReactNode }) {
  const [dark, setDarkState] = useState(getInitialDark)

  // Mbola ilaina ho an'ny toe-javatra voalohany indrindra (tsy mbola
  // nanoratra na inona na inona tao amin'ny localStorage/class ny
  // mpampiasa) — mamerina mamaky ny localStorage mba hahazoana antoka
  // fa mifanaraka tsara ny state amin'izay tena voarakitra.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY) === '1'
      if (stored !== dark) {
        setDarkState(stored)
        document.documentElement.classList.toggle('dark', stored)
      }
    } catch {
      // SSR / private mode → default light
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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