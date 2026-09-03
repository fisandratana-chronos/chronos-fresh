'use client'

// ── components/nav/NavClient.tsx ───────────────────────────────
import { useState, useEffect } from 'react'
import { useDark } from '../../lib/hooks/useDark'
import Nav from './Nav'
import CommandPalette from '../shell/CommandPalette'

export default function NavClient() {
  const { dark, setDark } = useDark()
  const [paletteOpen, setPaletteOpen] = useState(false)

  // ⌘K / Ctrl+K — mamoha ny CommandPalette na aiza na aiza misy ny
  // sary (jereo ilay hint "⌘K" eo amin'ny Nav). Tsy nisy mihitsy
  // ity teo aloha, ka tsy niasa ilay shortcut.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <Nav
        dark={dark}
        setDark={setDark}
        setCurrentPage={() => {}}
        setPaletteOpen={setPaletteOpen}
      />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        dark={dark}
      />
    </>
  )
}