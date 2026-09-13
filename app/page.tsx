'use client'

import React, { useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLang } from '../lib/hooks/useLang'
import { useDark } from '../lib/hooks/useDark'
import { BP } from '../lib/breakpoints'
import { TOOLS, Tool } from '../lib/tools'
import CommandPalette from '../components/shell/CommandPalette'
import { Icon, IconSearch, IconX } from '../components/shared/Icons'
import Link from 'next/link'

// ── Known-stale icon names still sitting in lib/tools.ts (TOOLS) for a
// few Text Tools entries — the actual icon set was fixed inside
// TTextToolsHub.tsx itself, but this small array wasn't updated to match.
// Remapped here so the homepage never shows a blank icon while lib/tools.ts
// catches up. Safe to delete once TOOLS' icon fields are corrected. ──
const ICON_FIX: Record<string, string> = {
  hash: 'clipboard',
  sparkle: 'sparkles',
  layers: 'repeat',
  sort: 'scale',
  chart: 'chart-bar',
  code: 'braces',
}
const fixIcon = (name: string) => ICON_FIX[name] || name

// ── Quick actions — 4 one-tap shortcuts into the most-reached-for tools ──
const QUICK_ACTIONS = [
  { en: 'Compress PDF', fr: 'Compresser un PDF', icon: 'compress', color: '#EF4444', href: '/tools/compress-pdf' },
  { en: 'Convert image', fr: 'Convertir une image', icon: 'repeat', color: '#8B5CF6', href: '/tools/jpg-to-png' },
  { en: 'Calculate EMI', fr: "Calculer l'EMI", icon: 'credit-card', color: '#10B981', href: '/tools/emi-calculator' },
  { en: 'Check IP', fr: 'Vérifier une IP', icon: 'target', color: '#3B82F6', href: '/tools/ip-lookup' },
]

// ── Popular tools — 6 well-known, fully-wired tools spanning every hub ──
const POPULAR_TOOLS = [
  { en: 'BMI Calculator', fr: "Calculateur d'IMC",
    enDesc: 'Check your body mass index instantly.', frDesc: 'Vérifiez votre indice de masse corporelle instantanément.',
    icon: 'scale', color: '#10B981', href: '/tools/bmi-calculator' },
  { en: 'Currency Converter', fr: 'Convertisseur de Devises',
    enDesc: 'Convert between 160+ currencies.', frDesc: 'Convertissez entre plus de 160 devises.',
    icon: 'exchange', color: '#3B82F6', href: '/tools/currency-converter' },
  { en: 'PDF Compressor', fr: 'Compresseur PDF',
    enDesc: 'Reduce PDF size without losing quality.', frDesc: 'Réduisez la taille du PDF sans perte de qualité.',
    icon: 'compress', color: '#EF4444', href: '/tools/compress-pdf' },
  { en: 'Word Counter', fr: 'Compteur de Mots',
    enDesc: 'Count words, characters and reading time.', frDesc: 'Comptez mots, caractères et temps de lecture.',
    icon: 'clipboard', color: '#EC4899', href: '/tools/word-counter' },
  { en: 'Password Generator', fr: 'Générateur de Mot de Passe',
    enDesc: 'Generate strong & secure passwords.', frDesc: 'Générez des mots de passe forts et sécurisés.',
    icon: 'key', color: '#F59E0B', href: '/tools/password-generator' },
  { en: 'IP Lookup', fr: 'Recherche IP',
    enDesc: 'Find location and details of any IP.', frDesc: "Trouvez la localisation et les détails de n'importe quelle IP.",
    icon: 'target', color: '#06B6D4', href: '/tools/ip-lookup' },
]

// ── Explore by category — 6 hubs, tool counts measured directly from
// each hub's own tab list (PDF_TABS / ALL_TOOLS / CATS / CONV_TABS /
// TABS / TEXT_TABS) rather than guessed. ──
const CATEGORY_CARDS = [
  { en: 'PDF Tools', fr: 'Outils PDF', count: 14,
    enDesc: 'Edit, compress, convert and manage PDFs.', frDesc: 'Modifier, compresser, convertir et gérer des PDF.',
    icon: 'file-text', color: '#EF4444', href: '/tools/pdf-hub' },
  { en: 'Image Tools', fr: 'Outils Image', count: 16,
    enDesc: 'Edit, resize, convert and enhance images.', frDesc: 'Modifier, redimensionner, convertir et améliorer des images.',
    icon: 'image', color: '#8B5CF6', href: '/tools/image-hub' },
  { en: 'Calculators', fr: 'Calculatrices', count: 25,
    enDesc: 'Financial, health, math and more.', frDesc: 'Finance, santé, mathématiques et plus.',
    icon: 'calculator', color: '#2563EB', href: '/tools/smart-calculator' },
  { en: 'Converters', fr: 'Convertisseurs', count: 10,
    enDesc: 'Units, formats and more.', frDesc: 'Unités, formats et plus.',
    icon: 'repeat', color: '#06B6D4', href: '/tools/converters-hub' },
  { en: 'Network', fr: 'Réseau', count: 20,
    enDesc: 'IP, DNS, domain and network utilities.', frDesc: 'IP, DNS, domaine et utilitaires réseau.',
    icon: 'globe', color: '#10B981', href: '/tools/network-hub' },
  { en: 'Text Tools', fr: 'Outils Texte', count: 17,
    enDesc: 'Edit, format, generate and analyze text.', frDesc: 'Modifier, formater, générer et analyser du texte.',
    icon: 'edit', color: '#EC4899', href: '/tools/text-tools-hub' },
]

const FEATURE_BADGES = [
  { en: 'Free to use', fr: 'Gratuit', icon: 'infinity' },
  { en: 'No sign-up', fr: 'Sans inscription', icon: 'user' },
  { en: 'Fast in browser', fr: 'Rapide, dans le navigateur', icon: 'bolt' },
  { en: 'Privacy-friendly', fr: 'Respecte la vie privée', icon: 'shield' },
]

export default function Home() {
  const { lang, t } = useLang()
  const { dark } = useDark()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen(p => !p)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const suggestions = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return []
    return TOOLS.filter(tool => {
      const label = lang === 'fr' ? tool.frLabel : tool.label
      return label.toLowerCase().includes(q) || tool.keywords.some(k => k.toLowerCase().includes(q))
    }).slice(0, 6)
  }, [query, lang])

  const goToFirstMatch = () => {
    if (suggestions.length > 0) {
      router.push(`/tools${suggestions[0].slug}`)
    }
  }

  // ── Theme tokens ──
  const T = {
    bg: dark ? '#0B1120' : '#F8FAFC',
    card: dark ? '#111827' : '#fff',
    border: dark ? '#1E293B' : '#E2E8F0',
    text: dark ? '#F1F5F9' : '#0F172A',
    muted: dark ? '#94A3B8' : '#64748B',
    accent: '#3B82F6',
    accentBg: dark ? '#1E3A5F' : '#EFF6FF',
    accentBorder: dark ? '#2563EB50' : '#BFDBFE',
  }

  return (
    <main style={{ minHeight: '100vh', background: T.bg, fontFamily: 'Inter, system-ui, sans-serif', paddingTop: 80, transition: 'background 0.2s' }}>
      <style>{`
        @media (max-width: ${BP.tablet}px) {
          .ch-hero-img-left, .ch-hero-img-right { display: none !important; }
          .ch-hero { min-height: auto !important; }
          .ch-popular-grid, .ch-category-grid { grid-template-columns: 1fr !important; }
          .ch-quick-actions { overflow-x: auto !important; }
          .ch-feature-badges { flex-wrap: wrap !important; gap: 16px !important; }
        }
        @media (max-width: ${BP.mobile}px) {
          .ch-hero-badge { font-size: 12px !important; }
          .ch-hero-title { font-size: 32px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>

        {/* ── Hero ── */}
        <div className="ch-hero" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40, minHeight: 300, gap: 0 }}>

          <div className="ch-hero-img-left" style={{ flex: '0 0 220px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <img src="/images/saryakavia.png" alt="Chronos clock" style={{ width: 200, height: 'auto' }} />
          </div>

          <div style={{ flex: '1 1 auto', textAlign: 'center', padding: '0 24px', maxWidth: 560 }}>
            <div className="ch-hero-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: T.accentBg, border: `1px solid ${T.accentBorder}`,
              borderRadius: 99, padding: '6px 16px', fontSize: 13, color: T.accent, fontWeight: 600, marginBottom: 20,
            }}>
              ★ {TOOLS.length}+ {lang === 'fr' ? 'outils gratuits' : 'free tools'} · {lang === 'fr' ? 'Sans inscription' : 'No sign-up'}
            </div>
            <h1 className="ch-hero-title" style={{ fontSize: 42, fontWeight: 800, color: T.text, lineHeight: 1.15, margin: '0 0 14px', letterSpacing: '-0.03em' }}>
              {lang === 'fr' ? 'Tout ce dont vous avez besoin.' : 'Everything you need.'}
              <br />
              <span style={{ color: T.accent }}>{lang === 'fr' ? 'Une seule boîte à outils.' : 'One powerful toolkit.'}</span>
            </h1>
            <p style={{ fontSize: 16, color: T.muted, margin: '0 auto 28px', lineHeight: 1.6 }}>
              {lang === 'fr'
                ? 'Des outils en ligne gratuits pour travailler plus vite, plus facilement et plus intelligemment.'
                : 'Free online tools to make your work faster, easier and smarter.'}
            </p>

            {/* Search */}
            <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', display: 'flex', color: T.muted }}>
                <IconSearch size={16} />
              </span>
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                onKeyDown={e => { if (e.key === 'Enter') goToFirstMatch() }}
                placeholder={lang === 'fr' ? 'Rechercher un outil...' : 'Search a tool...'}
                style={{
                  width: '100%', padding: '14px 52px 14px 44px', borderRadius: 12, fontSize: 15,
                  border: `1px solid ${T.border}`, background: T.card, color: T.text, outline: 'none',
                  boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', boxShadow: dark ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
                }}
              />
              {query ? (
                <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 52, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: T.muted, display: 'flex' }}>
                  <IconX size={16} />
                </button>
              ) : null}
              <button
                onClick={goToFirstMatch}
                aria-label={lang === 'fr' ? 'Rechercher' : 'Search'}
                style={{
                  position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                  width: 36, height: 36, borderRadius: 9, border: 'none', cursor: 'pointer',
                  background: T.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >→</button>

              {focused && suggestions.length > 0 && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 50,
                  background: T.card, border: `1px solid ${T.border}`, borderRadius: 12,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.25)', overflow: 'hidden', textAlign: 'left',
                }}>
                  {suggestions.map(tool => (
                    <Link key={tool.id} href={`/tools${tool.slug}`} style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                      textDecoration: 'none', color: T.text, fontSize: 13.5, fontWeight: 500,
                      borderBottom: `1px solid ${T.border}`,
                    }}>
                      <Icon name={fixIcon(tool.icon)} size={15} />
                      {lang === 'fr' ? tool.frLabel : tool.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
              <a href="#popular-tools" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: T.accent, color: '#fff', padding: '11px 22px', borderRadius: 11,
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
              }}>
                {lang === 'fr' ? 'Explorer tous les outils' : 'Explore all tools'} →
              </a>
              <a href="#categories" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: T.text, border: `1px solid ${T.border}`,
                padding: '11px 22px', borderRadius: 11, fontSize: 14, fontWeight: 700, textDecoration: 'none',
              }}>
                ⊞ {lang === 'fr' ? 'Parcourir les catégories' : 'Browse categories'}
              </a>
            </div>
          </div>

          <div className="ch-hero-img-right" style={{ flex: '0 0 220px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <img src="/images/saryakavanana.png" alt="Chronos toolbox" style={{ width: 200, height: 'auto' }} />
          </div>
        </div>

        {/* ── Quick actions ── */}
        <div className="ch-quick-actions" style={{
          display: 'flex', alignItems: 'center', gap: 20, marginBottom: 48,
          background: T.card, border: `1px solid ${T.border}`, borderRadius: 14,
          padding: '14px 20px', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: T.accent, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
            ⚡ {lang === 'fr' ? 'Actions rapides' : 'Quick actions'}
          </div>
          <div style={{ width: 1, height: 20, background: T.border, flexShrink: 0 }} />
          {QUICK_ACTIONS.map((a, i) => (
            <React.Fragment key={a.en}>
              <Link href={a.href} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 9, background: `${a.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.color, flexShrink: 0,
                }}>
                  <Icon name={a.icon} size={15} />
                </div>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: T.text, whiteSpace: 'nowrap' }}>
                  {lang === 'fr' ? a.fr : a.en}
                </span>
              </Link>
              {i < QUICK_ACTIONS.length - 1 && <div style={{ width: 1, height: 20, background: T.border, flexShrink: 0 }} />}
            </React.Fragment>
          ))}
        </div>

        {/* ── Popular tools ── */}
        <div id="popular-tools" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: '0 0 4px' }}>
              {lang === 'fr' ? 'Outils populaires' : 'Popular tools'}
            </h2>
            <p style={{ fontSize: 14, color: T.muted, margin: 0 }}>
              {lang === 'fr' ? 'Les plus utilisés. Les plus appréciés.' : 'Most used. Most loved.'}
            </p>
          </div>
          <a href="#categories" style={{ color: T.accent, fontSize: 13.5, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {lang === 'fr' ? 'Voir tous les outils' : 'View all tools'} →
          </a>
        </div>
        <div className="ch-popular-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
          {POPULAR_TOOLS.map(tool => (
            <Link key={tool.en} href={tool.href} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '18px', borderRadius: 14,
              background: T.card, border: `1px solid ${T.border}`, textDecoration: 'none', transition: 'border-color .15s',
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 11, background: `${tool.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: tool.color, flexShrink: 0,
              }}>
                <Icon name={tool.icon} size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: T.text, marginBottom: 2 }}>
                  {lang === 'fr' ? tool.fr : tool.en}
                </div>
                <div style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.4 }}>
                  {lang === 'fr' ? tool.frDesc : tool.enDesc}
                </div>
              </div>
              <span style={{ color: T.muted, flexShrink: 0 }}>→</span>
            </Link>
          ))}
        </div>

        {/* ── Explore by category ── */}
        <div id="categories" style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: '0 0 4px' }}>
            {lang === 'fr' ? 'Explorer par catégorie' : 'Explore by category'}
          </h2>
          <p style={{ fontSize: 14, color: T.muted, margin: 0 }}>
            {lang === 'fr' ? "Trouvez l'outil qu'il vous faut." : 'Find the right tool for your needs.'}
          </p>
        </div>
        <div className="ch-category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
          {CATEGORY_CARDS.map(cat => (
            <Link key={cat.en} href={cat.href} style={{
              display: 'block', padding: '20px', borderRadius: 14,
              background: T.card, border: `1px solid ${T.border}`, textDecoration: 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: `${cat.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: cat.color,
                }}>
                  <Icon name={cat.icon} size={20} />
                </div>
                <span style={{ color: T.muted }}>→</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.text, marginBottom: 2 }}>
                {lang === 'fr' ? cat.fr : cat.en}
              </div>
              <div style={{ fontSize: 12.5, color: T.accent, fontWeight: 600, marginBottom: 8 }}>
                {cat.count}+ {lang === 'fr' ? 'outils' : 'tools'}
              </div>
              <div style={{ fontSize: 12.5, color: T.muted, lineHeight: 1.45 }}>
                {lang === 'fr' ? cat.frDesc : cat.enDesc}
              </div>
            </Link>
          ))}
        </div>

        {/* ── Feature badges ── */}
        <div className="ch-feature-badges" style={{
          display: 'flex', justifyContent: 'center', gap: 40, paddingTop: 32,
          borderTop: `1px solid ${T.border}`, flexWrap: 'wrap',
        }}>
          {FEATURE_BADGES.map(f => (
            <div key={f.en} style={{ display: 'flex', alignItems: 'center', gap: 8, color: T.muted, fontSize: 13, fontWeight: 600 }}>
              <Icon name={f.icon} size={15} />
              {lang === 'fr' ? f.fr : f.en}
            </div>
          ))}
        </div>

      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* ── Site Footer ── */}
      <footer style={{ borderTop: `1px solid ${T.border}`, marginTop: 32, padding: '32px 24px', textAlign: 'center', background: dark ? '#0B1120' : 'transparent' }}>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
          <Link href="/about"   style={{ color: T.muted, fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>{lang === 'fr' ? 'À propos' : 'About'}</Link>
          <Link href="/privacy" style={{ color: T.muted, fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>{lang === 'fr' ? 'Confidentialité' : 'Privacy Policy'}</Link>
          <Link href="/terms"   style={{ color: T.muted, fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>{lang === 'fr' ? 'Conditions' : 'Terms of Use'}</Link>
          <Link href="/contact" style={{ color: T.muted, fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>Contact</Link>
        </div>
        <p style={{ fontSize: 12, color: dark ? '#475569' : '#CBD5E1', margin: 0 }}>© {new Date().getFullYear()} CHRONOS — {lang === 'fr' ? 'Outils en Ligne Gratuits' : 'Free Online Tools'}</p>
      </footer>
    </main>
  )
}