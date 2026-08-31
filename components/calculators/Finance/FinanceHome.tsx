'use client'
// ── components/calculators/Finance/FinanceHome.tsx ──
// "Barrel" ho an'ny kategoria Finance: mamory ny component rehetra ao
// anatiny + ny PANEL_MAP ampiasain'ny SmartCalcHub shell.

import MortgageCalculator from './MortgageCalculator'
import EmiCalculator from './EmiCalculator'
import VatCalculator from './VatCalculator'
import DiscountCalculator from './DiscountCalculator'
import PercentageCalculator from './PercentageCalculator'
import TipCalculator from './TipCalculator'
import CompoundInterestCalculator from './CompoundInterestCalculator'
import LoanCalculator from './LoanCalculator'
import CurrencyConverter from './CurrencyConverter'

export const FINANCE_PANEL_MAP = {
  mortgage: MortgageCalculator,
  emi: EmiCalculator,
  vat: VatCalculator,
  discount: DiscountCalculator,
  percentage: PercentageCalculator,
  tip: TipCalculator,
  compound: CompoundInterestCalculator,
  loan: LoanCalculator,
  currency: CurrencyConverter
}

export const FINANCE_TOOLS = [
  { key: "mortgage", label: "Mortgage Calculator", icon: "🏠", Component: MortgageCalculator },
  { key: "emi", label: "EMI Calculator", icon: "💳", Component: EmiCalculator },
  { key: "vat", label: "VAT Calculator", icon: "🧾", Component: VatCalculator },
  { key: "discount", label: "Discount Calculator", icon: "🏷️", Component: DiscountCalculator },
  { key: "percentage", label: "Percentage Calculator", icon: "％", Component: PercentageCalculator },
  { key: "tip", label: "Tip Calculator", icon: "💵", Component: TipCalculator },
  { key: "compound", label: "Compound Interest Calculator", icon: "📈", Component: CompoundInterestCalculator },
  { key: "loan", label: "Loan Calculator", icon: "🏦", Component: LoanCalculator },
  { key: "currency", label: "Currency Converter", icon: "💱", Component: CurrencyConverter }
]
