'use client'
// ── app/contact/ContactClient.tsx ─────────────────────────────
// NAOVANA: import path useDark nohavaozina
//   TALOHA → '../../lib/useDark'
//   ANKEHITRINY → '../../lib/hooks/useDark'  (toerana tena izy)

import Link from 'next/link'
import { useDark } from '../../lib/hooks/useDark'
import { InfoFooter, InfoHeading, InfoList, InfoParagraph, ACCENT } from '../_shared/InfoShared'

const SITE_EMAIL = 'contact@chronostools.com'

export default function ContactClient() {
  const { dark } = useDark()

  return (
    <main style={{ minHeight: '100vh', background: dark ? '#0F172A' : '#F8FAFC', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      <Link href="/" style={{
        position: 'fixed', top: 80, left: 12, zIndex: 99999,
        background: ACCENT.contact, color: '#fff', borderRadius: 10,
        padding: '8px 16px', fontSize: 13, fontWeight: 700,
        textDecoration: 'none', boxShadow: `0 4px 16px ${ACCENT.contact}66`,
      }}>← CHRONOS</Link>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px 60px' }}>

        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 32px', color: dark ? '#F1F5F9' : '#0F172A' }}>
          Contact Us
        </h1>

        <InfoParagraph dark={dark}>
          We'd love to hear from you — whether it's a bug report, feedback, a feature request, or an
          advertising/business inquiry.
        </InfoParagraph>

        <a href={`mailto:${SITE_EMAIL}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          marginTop: 8, marginBottom: 32,
          background: ACCENT.contact, color: '#fff',
          padding: '12px 24px', borderRadius: 10,
          fontWeight: 700, fontSize: 14, textDecoration: 'none',
          boxShadow: `0 4px 14px ${ACCENT.contact}40`,
        }}>
          ✉️ Email us — {SITE_EMAIL}
        </a>

        <InfoHeading dark={dark}>What to include</InfoHeading>
        <InfoList dark={dark} items={[
          "Bug reports — which tool, what you did, and what went wrong (screenshots help).",
          "Feedback & feature requests — tools or improvements you'd like to see.",
          "Advertising / partnerships — if you'd like to advertise on CHRONOS.",
          "Privacy or legal questions — see our Privacy Policy and Terms of Use.",
        ]} />

        <InfoParagraph dark={dark}>
          We aim to respond to all messages as quickly as possible, though response times may vary.
        </InfoParagraph>

        <div style={{
          marginTop: 40, padding: '20px 24px',
          background: dark ? '#1E293B' : '#FFFFFF',
          border: `1px solid ${dark ? '#334155' : '#E2E8F0'}`,
          borderRadius: 14,
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: dark ? '#94A3B8' : '#64748B', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Legal pages
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/privacy" style={{ color: '#2563EB', fontWeight: 600, fontSize: 14 }}>Privacy Policy</Link>
            <Link href="/terms"   style={{ color: '#2563EB', fontWeight: 600, fontSize: 14 }}>Terms of Use</Link>
            <Link href="/about"   style={{ color: '#2563EB', fontWeight: 600, fontSize: 14 }}>About</Link>
          </div>
        </div>

      </div>
      <InfoFooter dark={dark} />
    </main>
  )
}
