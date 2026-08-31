'use client'
// ── components/calculators/DateTime/DateTimeHome.tsx ──
// "Barrel" ho an'ny kategoria DateTime: mamory ny component rehetra ao
// anatiny + ny PANEL_MAP ampiasain'ny SmartCalcHub shell.

import DateDifferenceCalculator from './DateDifferenceCalculator'
import TimeZoneConverter from './TimeZoneConverter'

export const DATETIME_PANEL_MAP = {
  datediff: DateDifferenceCalculator,
  timezone: TimeZoneConverter
}

export const DATETIME_TOOLS = [
  { key: "datediff", label: "Date Difference Calculator", icon: "📅", Component: DateDifferenceCalculator },
  { key: "timezone", label: "Time Zone Converter", icon: "🕒", Component: TimeZoneConverter }
]
