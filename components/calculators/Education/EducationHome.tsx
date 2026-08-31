'use client'
// ── components/calculators/Education/EducationHome.tsx ──
// "Barrel" ho an'ny kategoria Education: mamory ny component rehetra ao
// anatiny + ny PANEL_MAP ampiasain'ny SmartCalcHub shell.

import GpaCalculator from './GpaCalculator'
import ScientificCalculator from './ScientificCalculator'

export const EDUCATION_PANEL_MAP = {
  gpa: GpaCalculator,
  scientific: ScientificCalculator
}

export const EDUCATION_TOOLS = [
  { key: "gpa", label: "GPA Calculator", icon: "🎓", Component: GpaCalculator },
  { key: "scientific", label: "Scientific Calculator", icon: "🧮", Component: ScientificCalculator }
]
