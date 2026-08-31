'use client'
// ── components/calculators/Misc/MiscHome.tsx ──
// "Barrel" ho an'ny kategoria Misc: mamory ny component rehetra ao
// anatiny + ny PANEL_MAP ampiasain'ny SmartCalcHub shell.

import RandomPicker from './RandomPicker'

export const MISC_PANEL_MAP = {
  randompick: RandomPicker
}

export const MISC_TOOLS = [
  { key: "randompick", label: "Random Picker", icon: "🎲", Component: RandomPicker }
]
