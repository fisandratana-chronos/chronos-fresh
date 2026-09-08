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
import FuelCostCalculator from './FuelCostCalculator'
import SalaryCalculator from './SalaryCalculator'
import ProfitMarginCalculator from './ProfitMarginCalculator'
import ROICalculator from './ROICalculator'

export const FINANCE_PANEL_MAP = {
  mortgage: MortgageCalculator,
  emi: EmiCalculator,
  vat: VatCalculator,
  discount: DiscountCalculator,
  percentage: PercentageCalculator,
  tip: TipCalculator,
  compound: CompoundInterestCalculator,
  loan: LoanCalculator,
  currency: CurrencyConverter,
  fuel: FuelCostCalculator,
  salary: SalaryCalculator,
  margin: ProfitMarginCalculator,
  roi: ROICalculator
}

export const FINANCE_TOOLS = [
  { key: "mortgage", label: "Mortgage Calculator", icon: "home", Component: MortgageCalculator },
  { key: "emi", label: "EMI Calculator", icon: "credit-card", Component: EmiCalculator },
  { key: "vat", label: "VAT Calculator", icon: "receipt", Component: VatCalculator },
  { key: "discount", label: "Discount Calculator", icon: "tag", Component: DiscountCalculator },
  { key: "percentage", label: "Percentage Calculator", icon: "percent", Component: PercentageCalculator },
  { key: "tip", label: "Tip Calculator", icon: "banknote", Component: TipCalculator },
  { key: "compound", label: "Compound Interest Calculator", icon: "trending-up", Component: CompoundInterestCalculator },
  { key: "loan", label: "Loan Calculator", icon: "bank", Component: LoanCalculator },
  { key: "currency", label: "Currency Converter", icon: "exchange", Component: CurrencyConverter },
  { key: "fuel", label: "Fuel Cost Calculator", icon: "droplet", Component: FuelCostCalculator },
  { key: "salary", label: "Salary Calculator", icon: "briefcase", Component: SalaryCalculator },
  { key: "margin", label: "Profit Margin Calculator", icon: "percent", Component: ProfitMarginCalculator },
  { key: "roi", label: "ROI Calculator", icon: "rocket", Component: ROICalculator }
]
