// ── lib/theme.ts ─────────────────────────────────────────────
// Shared color tokens extracted from the legacy monolith. COLORS is
// the brand/category palette (used by Nav.tsx already, hand-copied
// there); DARK/LIGHT are the two full theme objects the Calculators/
// PdfHub/NetworkHub panels read via useTheme() (see
// components/calculators/smartcalc-context.tsx once you wire that
// bundle in).

export const COLORS = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  primaryLight: "#3B82F6",
  secondary: "#06B6D4",
  accent: "#F59E0B",
  bgLight: "#FFFFFF",
  bgDark: "#0F172A",
  surfaceLight: "#F8FAFC",
  surfaceDark: "#1E293B",
  cardLight: "#FFFFFF",
  cardDark: "#1E293B",
  borderLight: "#E2E8F0",
  borderDark: "#334155",
  textLight: "#0F172A",
  textDark: "#F1F5F9",
  mutedLight: "#64748B",
  mutedDark: "#94A3B8",
  // ── Design system tokens ──────────────────────────────────
  // Radius scale
  r: { xs: 6, sm: 8, md: 10, lg: 14, xl: 18, chip: 20, card: 18, dialog: 16 },
  // Shadow scale
  sh: {
    xs:   "0 1px 3px rgba(0,0,0,0.07)",
    sm:   "0 2px 8px rgba(0,0,0,0.08)",
    md:   "0 4px 16px rgba(0,0,0,0.10)",
    lg:   "0 8px 28px rgba(0,0,0,0.13)",
    xl:   "0 20px 40px rgba(0,0,0,0.15)",
    focus: (c) => `0 0 0 3px ${c}33`,
    card:  (c) => `0 8px 24px ${c}24`,
    btn:   (c) => `0 4px 14px ${c}40`,
  },
  // Motion scale — translateY + duration
  motion: { card: "translateY(-3px)", btn: "translateY(-1px)", none: "translateY(0)", dur: "0.2s", ease: "cubic-bezier(.4,0,.2,1)" },
  // Badge presets
  badge: {
    trending: { bg: "#FEF3C7", txt: "#D97706" },
    new:      { bg: "#DCFCE7", txt: "#16A34A" },
    fav:      { bg: "#FEF9C3", txt: "#CA8A04" },
    info:     (c) => ({ bg: c + "15", txt: c }),
  },
};;

export const DARK = {
  bg0:"#07090F", bg1:"#0C1018", bg2:"#111520", bg3:"#171D2E", bg4:"#1C2438",
  border:"#1E2A40", borderHov:"#2A3A58",
  amber:"#F59E0B", amberD:"#D97706", amberL:"#FCD34D",
  emerald:"#10B981", red:"#EF4444", blue:"#3B82F6", purple:"#8B5CF6",
  cyan:"#06B6D4",
  txt:"#F1F5F9", txt2:"#94A3B8", txt3:"#64748B", txt4:"#334155",
  scrollTrack:"#0C1018", scrollThumb:"#1E2A40",
  selectOption:"#111520",
};;

export const LIGHT = {
  bg0:"#F0F4FA", bg1:"#FFFFFF", bg2:"#F8FAFC", bg3:"#EEF2F8", bg4:"#E4EAF4",
  border:"#CBD5E1", borderHov:"#94A3B8",
  amber:"#D97706", amberD:"#B45309", amberL:"#F59E0B",
  emerald:"#059669", red:"#DC2626", blue:"#2563EB", purple:"#7C3AED",
  cyan:"#0891B2",
  txt:"#0F172A", txt2:"#374151", txt3:"#6B7280", txt4:"#9CA3AF",
  scrollTrack:"#F1F5F9", scrollThumb:"#CBD5E1",
  selectOption:"#F8FAFC",
};;

