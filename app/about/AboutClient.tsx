'use client'
// ── app/about/AboutClient.tsx ─────────────────────────────────
// NAOVANA: import path useDark nohavaozina
//   TALOHA → '../../lib/useDark'
//   ANKEHITRINY → '../../lib/hooks/useDark'  (toerana tena izy)

import Link from 'next/link'
import { useDark } from '../../lib/hooks/useDark'
import { InfoFooter, InfoHeading, InfoList, InfoParagraph, ACCENT } from '../_shared/InfoShared'

export default function AboutClient() {
  const { dark } = useDark()

  return (
    <main style={{ minHeight: '100vh', background: dark ? '#0F172A' : '#F8FAFC', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      <Link href="/" style={{
        position: 'fixed', top: 80, left: 12, zIndex: 99999,
        background: ACCENT.about, color: '#fff', borderRadius: 10,
        padding: '8px 16px', fontSize: 13, fontWeight: 700,
        textDecoration: 'none', boxShadow: `0 4px 16px ${ACCENT.about}66`,
      }}>← CHRONOS</Link>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px 60px' }}>

        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 32px', color: dark ? '#F1F5F9' : '#0F172A' }}>
          About CHRONOS
        </h1>

        <InfoParagraph dark={dark}>
          CHRONOS is a free collection of 100+ online tools — PDF editors, image converters, AI writing
          assistants, calculators, unit converters, internet/network utilities, and developer tools — all in one place.
        </InfoParagraph>

        <InfoParagraph dark={dark}>
          Our goal is simple: give everyone fast, reliable, browser-based tools without sign-ups, software
          installs, or paywalls. Most CHRONOS tools run entirely in your browser, so your files and data stay
          on your device — they are never uploaded to our servers unless a specific tool says otherwise.
        </InfoParagraph>

        <InfoHeading dark={dark}>What you'll find on CHRONOS</InfoHeading>
        <InfoList dark={dark} items={[
          'PDF Tools — merge, split, compress, and convert PDF files',
          'Image Tools — resize, compress, convert, and remove backgrounds',
          'AI Writing Tools (TextCraft) — summarize, rewrite, and improve text',
          'Calculators & Converters — BMI, loans, units, currency, and more',
          'Internet & Network Tools — speed test, IP lookup, DNS, and Whois',
          'Developer Tools — JSON formatter, Base64, regex tester, and more',
        ]} />

        <InfoHeading dark={dark}>How CHRONOS is funded</InfoHeading>
        <InfoParagraph dark={dark}>
          CHRONOS is supported by advertising. Ads help us keep every tool free and accessible to everyone,
          with no subscriptions or hidden fees. See our{' '}
          <Link href="/privacy" style={{ color: '#2563EB', fontWeight: 600 }}>Privacy Policy</Link>
          {' '}for details on how ads and cookies work on this site.
        </InfoParagraph>

        <InfoHeading dark={dark}>Get in touch</InfoHeading>
        <InfoParagraph dark={dark}>
          Have feedback, found a bug, or want to advertise on CHRONOS? Visit our{' '}
          <Link href="/contact" style={{ color: '#2563EB', fontWeight: 600 }}>Contact page</Link>.
        </InfoParagraph>

      </div>
      <InfoFooter dark={dark} />
    </main>
  )
}
