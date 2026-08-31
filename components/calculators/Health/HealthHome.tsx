'use client'
// ── components/calculators/Health/HealthHome.tsx ──
// "Barrel" ho an'ny kategoria Health: mamory ny component rehetra ao
// anatiny + ny PANEL_MAP ampiasain'ny SmartCalcHub shell.

import BmiCalculator from './BmiCalculator'
import AgeCalculator from './AgeCalculator'
import CalorieCalculator from './CalorieCalculator'

export const HEALTH_PANEL_MAP = {
  bmi: BmiCalculator,
  age: AgeCalculator,
  calories: CalorieCalculator
}

export const HEALTH_TOOLS = [
  { key: "bmi", label: "BMI Calculator", icon: "⚖️", Component: BmiCalculator },
  { key: "age", label: "Age Calculator", icon: "🎂", Component: AgeCalculator },
  { key: "calories", label: "Calorie Calculator", icon: "🔥", Component: CalorieCalculator }
]
