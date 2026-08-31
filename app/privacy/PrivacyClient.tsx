'use client'
// ── app/privacy/PrivacyClient.tsx ─────────────────────────────
// NAOVANA: import path useDark nohavaozina
//   TALOHA → '../../lib/useDark'
//   ANKEHITRINY → '../../lib/hooks/useDark'  (toerana tena izy)

import Link from 'next/link'
import { useDark } from '../../lib/hooks/useDark'
import { InfoFooter, InfoHeading, InfoParagraph, ACCENT } from '../_shared/InfoShared'

const SITE_URL   = 'https://chronos-tools.com'
const SITE_EMAIL = 'contact@chronostools.com'

export default function PrivacyClient() {
  const { dark } = useDark()

  return (
    <main style={{ minHeight: '100vh', background: dark ? '#0F172A' : '#F8FAFC', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      <Link href="/" style={{
        position: 'fixed', top: 80, left: 12, zIndex: 99999,
        background: ACCENT.privacy, color: '#fff', borderRadius: 10,
        padding: '8px 16px', fontSize: 13, fontWeight: 700,
        textDecoration: 'none', boxShadow: `0 4px 16px ${ACCENT.privacy}66`,
      }}>← CHRONOS</Link>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px 60px' }}>

        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 8px', color: dark ? '#F1F5F9' : '#0F172A' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 13, color: dark ? '#94A3B8' : '#64748B', marginBottom: 32 }}>
          Last updated: June 15, 2026
        </p>

        <InfoParagraph dark={dark}>
          This Privacy Policy explains how CHRONOS ("we", "us", "the Site") handles information when you use
          the tools and pages available at {SITE_URL}.
        </InfoParagraph>

        <InfoHeading dark={dark}>1. Information We Collect</InfoHeading>
        <InfoParagraph dark={dark}>
          CHRONOS does not require an account, and most tools run entirely in your browser. Files you use with
          tools such as the PDF, image, or text tools are processed locally on your device or sent only to the
          specific tool you choose — we do not store copies of your files on our servers.
        </InfoParagraph>
        <InfoParagraph dark={dark}>
          To improve your experience, CHRONOS stores a small amount of data in your browser's local storage,
          such as recently used tools, favorite tools, and your dark/light theme preference. This information
          stays on your device and is not sent to us.
        </InfoParagraph>

        <InfoHeading dark={dark}>2. Cookies & Similar Technologies</InfoHeading>
        <InfoParagraph dark={dark}>
          CHRONOS, and its advertising and analytics partners, may use cookies, web beacons, and similar
          technologies to operate the Site, remember preferences, and serve relevant advertising.
        </InfoParagraph>

        <InfoHeading dark={dark}>3. Advertising</InfoHeading>
        <InfoParagraph dark={dark}>
          CHRONOS displays advertising provided by third-party advertising networks, including Google AdSense
          and similar partners (e.g. Ezoic). These companies may use cookies and similar technologies to
          collect information about your visits to this and other websites in order to show ads about goods
          and services that may interest you.
        </InfoParagraph>
        <InfoParagraph dark={dark}>
          Google's use of advertising cookies allows it and its partners to serve ads based on your visits to
          this and other sites. You can opt out of personalized advertising via Google's Ads Settings, and via
          www.aboutads.info.
        </InfoParagraph>

        <InfoHeading dark={dark}>4. Analytics</InfoHeading>
        <InfoParagraph dark={dark}>
          We may use analytics services to understand, in aggregate and anonymized form, how visitors use
          CHRONOS. This helps us improve the Site and does not identify you personally.
        </InfoParagraph>

        <InfoHeading dark={dark}>5. Children's Privacy</InfoHeading>
        <InfoParagraph dark={dark}>
          CHRONOS is not directed at children under 13. If you believe a child has provided us with personal
          information, please contact us so we can remove it.
        </InfoParagraph>

        <InfoHeading dark={dark}>6. Your Privacy Choices</InfoHeading>
        <InfoParagraph dark={dark}>
          Depending on where you live, you may have rights to access, correct, or delete information collected
          about you. You can manage advertising cookie preferences via your browser settings or Google's Ads Settings.
        </InfoParagraph>

        <InfoHeading dark={dark}>7. Third-Party Links & Services</InfoHeading>
        <InfoParagraph dark={dark}>
          Some tools rely on third-party services. When you use these tools, the relevant request may be sent
          to that third-party service, which has its own privacy practices.
        </InfoParagraph>

        <InfoHeading dark={dark}>8. Data Security</InfoHeading>
        <InfoParagraph dark={dark}>
          We take reasonable measures to protect the Site, but no method of transmission or storage is 100%
          secure, and we cannot guarantee absolute security.
        </InfoParagraph>

        <InfoHeading dark={dark}>9. Changes to This Policy</InfoHeading>
        <InfoParagraph dark={dark}>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an
          updated "Last updated" date.
        </InfoParagraph>

        <InfoHeading dark={dark}>10. Contact Us</InfoHeading>
        <InfoParagraph dark={dark}>
          Questions about this Privacy Policy?{' '}
          <Link href="/contact" style={{ color: '#2563EB', fontWeight: 600 }}>Contact us</Link>
          {' '}or email{' '}
          <a href={`mailto:${SITE_EMAIL}`} style={{ color: '#2563EB', fontWeight: 600 }}>{SITE_EMAIL}</a>.
        </InfoParagraph>

      </div>
      <InfoFooter dark={dark} />
    </main>
  )
}
