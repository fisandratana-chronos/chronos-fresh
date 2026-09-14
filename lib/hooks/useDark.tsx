'use client'
// ── lib/hooks/useDark.ts (version SSR-aware — tsy misy "flash" na
// amin'ny PC na amin'ny finday) ──────────────────────────────────
//
// ⚠️ NAHOANA NISY "FLASH" TAMIN'NY FINDAY IHANY: ny loko rehetra
// (dark ? '#0B1120' : '#F8FAFC') dia mifototra amin'ny STATE REACT
// "dark", tsy amin'ny class CSS ".dark". Ny SERVER (SSR) dia tsy
// mahalala ny safidin'ny mpampiasa (tsy afaka mamaky localStorage),
// ka manoratra HTML "hazavana" foana voalohany. Ny client dia
// manitsy izany aorian'ny hydration — haingana amin'ny PC (tsy hita),
// miadana kokoa amin'ny finday (hita ho "flash").
//
// VAHAOLANA: ampiasao COOKIE (fa tsy localStorage ihany) mba
// hahafahan'ny SERVER mamaky ny safidy "dark" ALOHAN'ny fandefasana
// ny HTML — jereo app/layout.tsx, izay tokony hamaky ilay cookie
// amin'ny alalan'ny next/headers ary handefa "initialDark" ho eto.

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const KEY = 'ch-dark'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 taona

// ── 1. Context ──────────────────────────────────────────────────────────
type DarkCtx = { dark: boolean; setDark: (v: boolean) => void }

const DarkContext = createContext<DarkCtx>({
  dark: false,
  setDark: () => {},
})

// ── 2. Provider — apetraka ao amin'ny layout.tsx ────────────────────────
// "initialDark" dia avy amin'ny SERVER (cookie, jereo layout.tsx) — ka
// mitovy tanteraka amin'izay efa nosoratan'ny server ao amin'ny HTML
// voalohany ny state React voalohany eto, ka TSY MISY "fanitsiana"
// mila atao intsony rehefa mihydrate — izany no manala ilay "flash".
export function DarkProvider({ children, initialDark = false }: { children: ReactNode; initialDark?: boolean }) {
  const [dark, setDarkState] = useState(initialDark)

  // Mampihatra ny class ".dark" amin'ny <html> mba handehan'ny CSS
  // variables (raha misy), mifanaraka amin'ilay state voalohany avy
  // amin'ny server — tsy manova na inona na inona amin'ny loko efa
  // marina hatramin'ny voalohany.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', initialDark)
  }, [])

  const setDark = (v: boolean) => {
    setDarkState(v)
    document.documentElement.classList.toggle('dark', v)
    try {
      // localStorage — mbola ilaina ho an'ny fampiasana any anaty client
      // (ohatra raha misy component mamaky azy mivantana).
      localStorage.setItem(KEY, v ? '1' : '0')
      // ✅ COOKIE — ity no vaovao, ary ity no ahafahan'ny SERVER (SSR)
      // mahalala ny safidy manaraka amin'ny fandefasana HTML manaraka,
      // izay manala ilay "flash" tanteraka na dia amin'ny finday miadana aza.
      document.cookie = `${KEY}=${v ? '1' : '0'}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
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