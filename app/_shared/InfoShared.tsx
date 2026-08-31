'use client'
// ── app/_shared/InfoShared.tsx ────────────────────────────────
// Shared building blocks ampiasain'ny pages 4 (About/Privacy/Terms/Contact).
// Ny underscore prefix (_shared) dia manakana Next.js tsy handika azy
// ho route — tsy ho hita ao amin'ny browser ny /\_shared/.

import Link from 'next/link'

// ── Accent colors — iray ho an'ny page tsirairay ─────────────
export const ACCENT = {
  about:   '#2563EB',   // Blue
  privacy: '#06B6D4',   // Cyan
  terms:   '#F59E0B',   // Amber
  contact: '#8B5CF6',   // Violet
}

// ── Design tokens ─────────────────────────────────────────────
const C = {
  text:    { light: '#0F172A', dark: '#F1F5F9'  },
  muted:   { light: '#64748B', dark: '#94A3B8'  },
  surface: { light: '#FFFFFF', dark: '#1E293B'  },
  border:  { light: '#E2E8F0', dark: '#334155'  },
}

// ── Sub-components ────────────────────────────────────────────
export function InfoHeading({ children, dark }: { children: React.ReactNode; dark: boolean }) {
  return (
    <h2 style={{ fontSize: 19, fontWeight: 800, margin: '32px 0 12px', color: dark ? C.text.dark : C.text.light }}>
      {children}
    </h2>
  )
}

export function InfoParagraph({ children, dark }: { children: React.ReactNode; dark: boolean }) {
  return (
    <p style={{ fontSize: 15, lineHeight: 1.75, margin: '0 0 14px', color: dark ? C.muted.dark : C.muted.light }}>
      {children}
    </p>
  )
}

export function InfoList({ items, dark }: { items: string[]; dark: boolean }) {
  return (
    <ul style={{ fontSize: 15, lineHeight: 1.75, margin: '0 0 14px', paddingLeft: 22, color: dark ? C.muted.dark : C.muted.light }}>
      {items.map((item, i) => <li key={i} style={{ marginBottom: 6 }}>{item}</li>)}
    </ul>
  )
}

// ── Footer commun (4 links) ───────────────────────────────────
export function InfoFooter({ dark }: { dark: boolean }) {
  const links = [
    { href: '/about',   label: 'About'          },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms',   label: 'Terms of Use'   },
    { href: '/contact', label: 'Contact'         },
  ]
  return (
    <footer style={{
      borderTop: `1px solid ${dark ? C.border.dark : C.border.light}`,
      background: dark ? C.surface.dark : C.surface.light,
      padding: '24px', textAlign: 'center', fontSize: 13,
      color: dark ? C.muted.dark : C.muted.light,
    }}>
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
        {links.map(({ href, label }) => (
          <Link key={href} href={href} style={{ color: dark ? C.muted.dark : C.muted.light, textDecoration: 'none', fontWeight: 500 }}>
            {label}
          </Link>
        ))}
      </div>
      <p style={{ margin: '12px 0 0' }}>© {new Date().getFullYear()} CHRONOS — Free Online Tools</p>
    </footer>
  )
}
