'use client'
// ── components/calculators/Convert/ConvertHome.tsx ──
// "Barrel" ho an'ny kategoria Convert: mamory ny component rehetra ao
// anatiny + ny PANEL_MAP ampiasain'ny SmartCalcHub shell.

import TemperatureConverter from './TemperatureConverter'
import BinaryConverter from './BinaryConverter'
import RgbHexConverter from './RgbHexConverter'
import UnitConverter from './UnitConverter'
import RomanNumeralConverter from './RomanNumeralConverter'

export const CONVERT_PANEL_MAP = {
  temp: TemperatureConverter,
  binary: BinaryConverter,
  rgb: RgbHexConverter,
  units: UnitConverter,
  roman: RomanNumeralConverter
}

export const CONVERT_TOOLS = [
  { key: "temp", label: "Temperature Converter", icon: "🌡️", Component: TemperatureConverter },
  { key: "binary", label: "Binary Converter", icon: "0️⃣", Component: BinaryConverter },
  { key: "rgb", label: "RGB ↔ HEX Converter", icon: "🎨", Component: RgbHexConverter },
  { key: "units", label: "Unit Converter", icon: "📏", Component: UnitConverter },
  { key: "roman", label: "Roman Numeral Converter", icon: "🅾️", Component: RomanNumeralConverter }
]
