'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLang } from '../../lib/hooks/useLang'
import Link from 'next/link'

// ── Colors ──────────────────────────────────────────────────
const COLORS = {
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
   focus: (c: string) => `0 0 0 3px ${c}33`,
   card:  (c: string) => `0 8px 24px ${c}24`,
   btn:   (c: string) => `0 4px 14px ${c}40`,
  },
  // Motion scale — translateY + duration
  motion: { card: "translateY(-3px)", btn: "translateY(-1px)", none: "translateY(0)", dur: "0.2s", ease: "cubic-bezier(.4,0,.2,1)" },
  // Badge presets
  badge: {
    trending: { bg: "#FEF3C7", txt: "#D97706" },
    new:      { bg: "#DCFCE7", txt: "#16A34A" },
    fav:      { bg: "#FEF9C3", txt: "#CA8A04" },
    info: (c: string) => ({ bg: c + "15", txt: c }),
  },
};

// ── Constants ─────────────────────────────────────────────────
const LANGS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

// ── Types ─────────────────────────────────────────────────────
interface NavProps {
  dark: boolean
  setDark: (dark: boolean) => void
  setCurrentPage: (page: string) => void
  setPaletteOpen: (open: boolean) => void
}

// ── Component ─────────────────────────────────────────────────
export default function Nav({ dark, setDark, setCurrentPage, setPaletteOpen }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const router = useRouter()

  // ── Nav link → action map ───────────────────────────────
  // NOTE / DIAGNOSTIC: tamin'ny version teo aloha, "Converters" tao @ list
  // fa tsy nisy onClick branch ho azy (dead click), ary "AI Tools" no nisy
  // branch fa tsy tao @ list mihitsy (unreachable code). Ireo roa ireo dia
  // voasolo amin'ity array ity, izay manome action manokana ho an'ny link
  // tsirairay (tsy misy dead branch intsony).
  //
  // ⚠️ "Converters" → apetraka eo @ "smartcalc" satria ao @ SmartCalcHub
  // (TUnits / TCurrency / TTemp / TRGB / TBinary / TRoman / TDateDiff, ...)
  // no misy ny converter tools amin'izao fotoana izao. Ovay raha tianao
  // destination/hub manokana ho an'ny Converters.
  const NAV_LINKS = [
  { label: t("nav.pdfTools"),    action: () => router.push('/tools/pdf-hub')            },
  { label: t("nav.imageTools"),  action: () => router.push('/tools/image-hub')          },
  { label: t("nav.calculators"), action: () => router.push('/tools/smart-calculator')   },
  { label: t("nav.converters"),  action: () => router.push('/tools/converters-hub')     },
  { label: t("nav.network"),     action: () => router.push('/tools/network-hub')        },
];

  const linkBtnStyle = {
    background: "none", border: "none", cursor: "pointer",
    padding: "8px 12px", borderRadius: 8, fontSize: 14, fontWeight: 500,
    color: dark ? "#94A3B8" : "#64748B",
    transition: "all 0.15s",
    whiteSpace: "nowrap" as const,
  };

  return (
    <>
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999999,
      height: 64,
      background: dark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.95)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${dark ? "#1E293B" : "#F1F5F9"}`,
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
    }}>
      {/* Responsive rules — Nav hamburger / mobile menu (≤767px) */}
      <style>{`
        .ch-nav-hamburger { display: none; }
        .ch-nav-mobile-menu { display: none; }
        @media (max-width: 767px) {
          .ch-nav-links, .ch-nav-cta { display: none !important; }
          .ch-nav-hamburger { display: flex !important; }
          .ch-nav-mobile-menu.open { display: flex !important; }
        }
        @media (max-width: 480px) {
          .ch-search-kbd { display: none !important; }
        }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 900, fontSize: 16, letterSpacing: "-0.03em"
          }}>⏱</div>
          <span style={{ fontWeight: 900, fontSize: 22, letterSpacing: "-0.04em", color: dark ? "#F1F5F9" : "#0F172A" }}>
            CHRON<span style={{ color: COLORS.primary }}>OS</span>
          </span>
        </Link>

        {/* Nav links — desktop/tablet (≥768px) */}
        <div className="ch-nav-links" style={{ gap: 4, flex: 1, alignItems: "center" }}>
          {NAV_LINKS.map(({ label, action }) => (
            <button key={label} onClick={action} style={linkBtnStyle}
              onMouseEnter={e => { e.currentTarget.style.background = dark ? "#1E293B" : "#F1F5F9"; e.currentTarget.style.color = dark ? "#F1F5F9" : "#0F172A"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = dark ? COLORS.mutedDark : COLORS.mutedLight; }}
            >{label}</button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setPaletteOpen(true)}
            title={t("nav.commandPalette")}
            aria-label={t("nav.searchTools")}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: dark ? "#1E293B" : "#F1F5F9",
              border: `1px solid ${dark ? "#334155" : "#E2E8F0"}`,
              borderRadius: 10, padding: "0 12px",
              height: 38, cursor: "pointer", fontSize: 12,
              color: dark ? "#64748B" : "#94A3B8", fontWeight: 600,
              transition: "all 0.15s", flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.color = "#2563EB"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "#334155" : "#E2E8F0"; e.currentTarget.style.color = dark ? "#64748B" : "#94A3B8"; }}
          >
            <span style={{ fontSize: 14 }}>🔍</span>
            <span className="ch-search-kbd" style={{ display: "flex", gap: 3, alignItems: "center" }}>
              <kbd style={{ background: dark ? "#0F172A" : "#fff", border: `1px solid ${dark ? "#475569" : "#CBD5E1"}`, borderRadius: 4, padding: "1px 5px", fontFamily: "monospace", fontSize: 10 }}>⌘</kbd>
              <kbd style={{ background: dark ? "#0F172A" : "#fff", border: `1px solid ${dark ? "#475569" : "#CBD5E1"}`, borderRadius: 4, padding: "1px 5px", fontFamily: "monospace", fontSize: 10 }}>K</kbd>
            </span>
          </button>
          {/* Language switcher — toggles en ⇄ fr (next languages just need a DICT entry) */}
          <button
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
            aria-label={t("nav.language")}
            title={t("nav.language")}
            style={{
              background: dark ? "#1E293B" : "#F1F5F9", border: "none", cursor: "pointer",
              width: 38, height: 38, borderRadius: 10, fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.15s",
            }}>{LANGS.find(l => l.code === lang)?.flag}</button>
          <button onClick={() => setDark(!dark)} aria-label={dark ? t("nav.switchToLight") : t("nav.switchToDark")} style={{
            background: dark ? "#1E293B" : "#F1F5F9", border: "none", cursor: "pointer",
            width: 38, height: 38, borderRadius: 10, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.15s",
          }}>{dark ? "☀️" : "🌙"}</button>
          <button className="ch-nav-cta"
            onClick={() => router.push('/')}
            style={{
              background: COLORS.primary, color: "#fff", border: "none", cursor: "pointer",
              padding: "9px 20px", borderRadius: 10, fontSize: 14, fontWeight: 700,
              transition: "background 0.15s", whiteSpace: "nowrap",
            }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.primaryDark}
            onMouseLeave={e => e.currentTarget.style.background = COLORS.primary}
          >{t("nav.allTools")}</button>

          {/* Hamburger — mobile only (≤767px) */}
          <button
            className="ch-nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={menuOpen}
            style={{
              background: dark ? "#1E293B" : "#F1F5F9", border: "none", cursor: "pointer",
              width: 38, height: 38, borderRadius: 10, fontSize: 18,
              alignItems: "center", justifyContent: "center",
              transition: "background 0.15s", flexShrink: 0,
            }}
          >{menuOpen ? "✕" : "☰"}</button>
        </div>
      </div>
    </nav>

    {/* Mobile dropdown menu (≤767px) — fixed to the viewport so it's
        always visible right where the hamburger was tapped, no matter
        how far the page has been scrolled (the header itself is no
        longer sticky, so an in-flow menu would otherwise be scrolled
        out of view along with it). */}
    <div className={`ch-nav-mobile-menu${menuOpen ? " open" : ""}`} style={{
      position: "fixed", top: 65, left: 0, right: 0, zIndex: 1001,
      flexDirection: "column", gap: 2,
      maxWidth: 1200, margin: "0 auto",
      padding: "8px 0 16px",
      maxHeight: "calc(100vh - 65px)", overflowY: "auto",
      background: dark ? "rgba(15,23,42,0.98)" : "rgba(255,255,255,0.98)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${dark ? "#1E293B" : "#F1F5F9"}`,
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    }}>
        {NAV_LINKS.map(({ label, action }) => (
          <button key={label} onClick={() => { action(); setMenuOpen(false); }} style={{
            ...linkBtnStyle,
            textAlign: "left", width: "100%", minHeight: 44,
            padding: "10px 8px",
          }}>{label}</button>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={() => { setPaletteOpen(true); setMenuOpen(false); }} aria-label={t("nav.search")} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: dark ? "#1E293B" : "#F1F5F9",
            border: `1px solid ${dark ? "#334155" : "#E2E8F0"}`,
            borderRadius: 10, minHeight: 44, cursor: "pointer",
            color: dark ? "#94A3B8" : "#64748B", fontWeight: 600, fontSize: 13,
          }}>🔍 {t("nav.search")}</button>
          <button onClick={() => { setDark(!dark); setMenuOpen(false); }} aria-label={dark ? t("nav.switchToLight") : t("nav.switchToDark")} aria-pressed={dark} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: dark ? "#1E293B" : "#F1F5F9",
            border: `1px solid ${dark ? "#334155" : "#E2E8F0"}`,
            borderRadius: 10, minHeight: 44, cursor: "pointer",
            color: dark ? "#94A3B8" : "#64748B", fontWeight: 600, fontSize: 13,
          }}>{dark ? `☀️ ${t("nav.lightMode")}` : `🌙 ${t("nav.darkMode")}`}</button>
          <button onClick={() => { setLang(lang === "en" ? "fr" : "en"); setMenuOpen(false); }} aria-label={t("nav.language")} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: dark ? "#1E293B" : "#F1F5F9",
            border: `1px solid ${dark ? "#334155" : "#E2E8F0"}`,
            borderRadius: 10, minHeight: 44, cursor: "pointer",
            color: dark ? "#94A3B8" : "#64748B", fontWeight: 600, fontSize: 13,
          }}>{LANGS.find(l => l.code === lang)?.flag} {LANGS.find(l => l.code === lang)?.label}</button>
        </div>
        <button onClick={() => {
          setMenuOpen(false);
          router.push('/');
        }} style={{
          marginTop: 8, width: "100%", minHeight: 44,
          background: COLORS.primary, color: "#fff", border: "none", cursor: "pointer",
          borderRadius: 10, fontSize: 14, fontWeight: 700,
        }}>{t("nav.allTools")}</button>
    </div>
    </>
  );
}
