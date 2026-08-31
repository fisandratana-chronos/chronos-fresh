'use client'

// ── components/nav/NavClient.tsx ───────────────────────────────
import { useState } from 'react'
import { useDark } from '../../lib/hooks/useDark'
import Nav from './Nav'

export default function NavClient() {
  const { dark, setDark } = useDark()
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <Nav
      dark={dark}
      setDark={setDark}
      setCurrentPage={() => {}}
      setPaletteOpen={setPaletteOpen}
    />
  )
}