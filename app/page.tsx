'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useLang } from '../lib/hooks/useLang'
import { useDark } from '../lib/hooks/useDark'
import { BP } from '../lib/breakpoints'
import { TOOLS, Tool } from '../lib/tools'
import CommandPalette from '../components/shell/CommandPalette'
import Link from 'next/link'

const CATEGORIES = [
  { id: 'all',      en: 'All',          fr: 'Tous',           icon: '⚡' },
  { id: 'health',   en: 'Health',       fr: 'Santé',          icon: '❤️' },
  { id: 'finance',  en: 'Finance',      fr: 'Finance',        icon: '💰' },
  { id: 'dev',      en: 'Developer',    fr: 'Développeur',    icon: '⚙️' },
  { id: 'text',     en: 'Text',         fr: 'Texte',          icon: '📝' },
  { id: 'convert',  en: 'Converters',   fr: 'Convertisseurs', icon: '🔄' },
]

// Tools with Next.js pages (implemented — shown as clickable in the grid)
const IMPLEMENTED = new Set([
  // 7 standalone calculators
  'bmi-calculator', 'water-intake-calculator', 'ideal-weight-calculator',
  'mortgage-calculator', 'emi-calculator', 'calories-calculator', 'currency-converter',
  // Smart Calculator Hub
  'smart-calculator',
  // PDF Hub
  'pdf-hub', 'merge-pdf', 'split-pdf', 'compress-pdf', 'rotate-pdf', 'jpg-to-pdf',
  // Network Hub
  'network-hub', 'ip-lookup', 'internet-speed-test', 'dns-lookup',
  'whois-lookup', 'ssl-checker', 'website-status-checker', 'ping-checker',
])

export default function Home() {
  const { lang, setLang, t } = useLang()
  const { dark } = useDark()
  const [query, setQuery]   = useState('')
  const [cat, setCat]       = useState('all')
  const [paletteOpen, setPaletteOpen] = useState(false)

  // Ctrl+K listener
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

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return TOOLS.filter(tool => {
      const catOk = cat === 'all' || tool.cat === cat
      const label = lang === 'fr' ? tool.frLabel : tool.label
      const searchOk = !q || label.toLowerCase().includes(q) ||
        tool.keywords.some(k => k.toLowerCase().includes(q))
      return catOk && searchOk
    })
  }, [query, cat, lang])

  return (
    <main style={{ minHeight: '100vh', background: dark ? '#0F172A' : '#F8FAFC', fontFamily: 'Inter, system-ui, sans-serif', paddingTop: 80, transition: 'background 0.2s' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>

        {/* ── Hero ── */}
        <style>{`
          @media (max-width: ${BP.tablet}px) {
            .ch-hero-img-left, .ch-hero-img-right { display: none !important; }
            .ch-hero { min-height: auto !important; }
          }
        `}</style>
        <div className="ch-hero" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 48, minHeight: 320, gap: 0 }}>

          {/* Left image — clock */}
          <div className="ch-hero-img-left" style={{ flex: '0 0 260px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <img
              src="/images/saryakavia.png"
              alt="Chronos clock"
              style={{ width: 220, height: 'auto' }}
            />
          </div>

          {/* Center text */}
          <div style={{ flex: '1 1 auto', textAlign: 'center', padding: '0 24px', maxWidth: 520 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: dark ? '#1E3A5F' : '#EFF6FF', border: `1px solid ${dark ? '#2563EB50' : '#BFDBFE'}`, borderRadius: 99, padding: '6px 16px', fontSize: 13, color: '#3B82F6', fontWeight: 600, marginBottom: 20 }}>
              ✨ {TOOLS.length} {lang === 'fr' ? 'outils gratuits' : 'free tools'} · {lang === 'fr' ? 'Sans inscription' : 'No sign-up'}
            </div>
            <h1 style={{ fontSize: 44, fontWeight: 800, color: dark ? '#F1F5F9' : '#0F172A', lineHeight: 1.15, margin: '0 0 14px', letterSpacing: '-0.03em' }}>
              {t('home.headline') || 'Everything you need.'}
              <br />
              <span style={{ color: '#3B82F6' }}>{t('home.headlineSub') || 'One powerful toolkit.'}</span>
            </h1>
            <p style={{ fontSize: 16, color: dark ? '#94A3B8' : '#64748B', margin: '0 auto 28px', lineHeight: 1.6 }}>
              {t('home.description') || 'Free online tools. No sign-up required.'}
            </p>
            {/* Lang toggle */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              {(['en', 'fr'] as const).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: '8px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  border: `2px solid ${lang === l ? '#3B82F6' : '#E2E8F0'}`,
                  background: lang === l ? '#EFF6FF' : '#fff',
                  color: lang === l ? '#3B82F6' : '#64748B',
                }}>
                  {l === 'en' ? '🇬🇧 English' : '🇫🇷 Français'}
                </button>
              ))}
            </div>
          </div>

          {/* Right image — toolbox */}
          <div className="ch-hero-img-right" style={{ flex: '0 0 260px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <img
              src="/images/saryakavanana.png"
              alt="Chronos toolbox"
              style={{ width: 220, height: 'auto' }}
            />
          </div>

        </div>

        {/* ── Search ── */}
        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto 32px' }}>
          <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder={lang === 'fr' ? 'Rechercher des outils...' : 'Search tools...'}
            style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: 12, fontSize: 15, border: `1px solid ${dark ? '#334155' : '#E2E8F0'}`, background: dark ? '#1E293B' : '#fff', color: dark ? '#F1F5F9' : '#0F172A', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#94A3B8' }}>✕</button>
          )}
        </div>

        {/* ── Categories ── */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{
              padding: '8px 18px', borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              border: `2px solid ${cat === c.id ? '#3B82F6' : dark ? '#334155' : '#E2E8F0'}`,
              background: cat === c.id ? '#3B82F6' : dark ? '#1E293B' : '#fff',
              color: cat === c.id ? '#fff' : dark ? '#94A3B8' : '#64748B',
              transition: 'all 0.15s',
            }}>
              {c.icon} {lang === 'fr' ? c.fr : c.en}
              <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.75 }}>
                {cat === c.id || c.id === 'all' ? (c.id === 'all' ? TOOLS.length : TOOLS.filter(t => t.cat === c.id).length) : ''}
              </span>
            </button>
          ))}
        </div>

        {/* ── Tools Grid ── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 15, padding: 48 }}>
            {lang === 'fr' ? 'Aucun outil trouvé' : 'No tools found'} — <button onClick={() => { setQuery(''); setCat('all') }} style={{ color: '#3B82F6', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15 }}>{lang === 'fr' ? 'Réinitialiser' : 'Reset'}</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {filtered.map((tool: Tool) => {
              const label = lang === 'fr' ? tool.frLabel : tool.label
              const slug = tool.slug.replace(/^\//, '')
              const isLive = IMPLEMENTED.has(slug)
              return (
                <a key={tool.id} href={isLive ? `/tools/${slug}` : undefined}
                  style={{
                    display: 'block', padding: '20px', borderRadius: 14,
                    background: dark ? '#1E293B' : '#fff',
                    border: `1px solid ${dark ? '#334155' : isLive ? '#E2E8F0' : '#F1F5F9'}`,
                    textDecoration: 'none', cursor: isLive ? 'pointer' : 'default',
                    transition: 'all 0.15s', opacity: isLive ? 1 : 0.5,
                    boxShadow: dark ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={e => { if (isLive) { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)' }}}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)' }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{tool.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: dark ? '#F1F5F9' : '#0F172A', marginBottom: 4, lineHeight: 1.3 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 11, color: dark ? '#64748B' : '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {tool.cat}
                  </div>
                  {isLive && (
                    <div style={{ marginTop: 10, fontSize: 11, color: '#10B981', fontWeight: 600 }}>
                      ● {lang === 'fr' ? 'Disponible' : 'Live'}
                    </div>
                  )}
                </a>
              )
            })}
          </div>
        )}

        {/* ── Footer note ── */}
        <div style={{ textAlign: 'center', marginTop: 64, color: '#94A3B8', fontSize: 13 }}>
          {lang === 'fr'
            ? `${filtered.length} outil${filtered.length > 1 ? 's' : ''} affiché${filtered.length > 1 ? 's' : ''} sur ${TOOLS.length}`
            : `Showing ${filtered.length} of ${TOOLS.length} tools`}
        </div>

      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
        {/* ── Site Footer ── */}
      <footer style={{ borderTop: `1px solid ${dark ? '#1E293B' : '#E2E8F0'}`, marginTop: 64, padding: '32px 24px', textAlign: 'center', background: dark ? '#0F172A' : 'transparent' }}>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
          <Link href="/about"   style={{ color: dark ? '#94A3B8' : '#64748B', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>{lang === 'fr' ? 'À propos' : 'About'}</Link>
          <Link href="/privacy" style={{ color: dark ? '#94A3B8' : '#64748B', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>{lang === 'fr' ? 'Confidentialité' : 'Privacy Policy'}</Link>
          <Link href="/terms"   style={{ color: dark ? '#94A3B8' : '#64748B', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>{lang === 'fr' ? 'Conditions' : 'Terms of Use'}</Link>
          <Link href="/contact" style={{ color: dark ? '#94A3B8' : '#64748B', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>Contact</Link>
        </div>
        <p style={{ fontSize: 12, color: '#CBD5E1', margin: 0 }}>© {new Date().getFullYear()} CHRONOS — Free Online Tools</p>
      </footer>
    </main>
          
  )
}
