'use client'
// ── components/calculators/Misc/MiscHome.tsx ──
// "Barrel" ho an'ny kategoria Misc: mamory ny component rehetra ao
// anatiny + ny PANEL_MAP ampiasain'ny SmartCalcHub shell.

import RandomPicker from './RandomPicker'
import StatisticsCalculator from './StatisticsCalculator'
import AreaCalculator from './AreaCalculator'
import RatioCalculator from './RatioCalculator'

export const MISC_PANEL_MAP = {
  randompick: RandomPicker,
  stats: StatisticsCalculator,
  area: AreaCalculator,
  ratio: RatioCalculator
}

export const MISC_TOOLS = [
  { key: "randompick", label: "Random Picker", icon: "dice", Component: RandomPicker },
  { key: "stats", label: "Statistics Calculator", icon: "chart-bar", Component: StatisticsCalculator },
  { key: "area", label: "Area Calculator", icon: "ruler", Component: AreaCalculator },
  { key: "ratio", label: "Ratio Calculator", icon: "scale", Component: RatioCalculator }
]