'use client'
// ── app/terms/TermsClient.tsx ─────────────────────────────────
// NAOVANA: import path useDark nohavaozina
//   TALOHA → '../../lib/useDark'
//   ANKEHITRINY → '../../lib/hooks/useDark'  (toerana tena izy)

import Link from 'next/link'
import { useDark } from '../../lib/hooks/useDark'
import { InfoFooter, InfoHeading, InfoList, InfoParagraph, ACCENT } from '../_shared/InfoShared'

const SITE_URL   = 'https://chronos-tools.com'
const SITE_EMAIL = 'contact@chronostools.com'

export default function TermsClient() {
  const { dark } = useDark()

  return (
    <main style={{ minHeight: '100vh', background: dark ? '#0F172A' : '#F8FAFC', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      <Link href="/" style={{
        position: 'fixed', top: 80, left: 12, zIndex: 99999,
        background: ACCENT.terms, color: '#fff', borderRadius: 10,
        padding: '8px 16px', fontSize: 13, fontWeight: 700,
        textDecoration: 'none', boxShadow: `0 4px 16px ${ACCENT.terms}66`,
      }}>← CHRONOS</Link>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px 60px' }}>

        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 8px', color: dark ? '#F1F5F9' : '#0F172A' }}>
          Terms of Use
        </h1>
        <p style={{ fontSize: 13, color: dark ? '#94A3B8' : '#64748B', marginBottom: 32 }}>
          Last updated: June 15, 2026
        </p>

        <InfoParagraph dark={dark}>
          These Terms of Use ("Terms") govern your access to and use of CHRONOS ({SITE_URL}) and its tools.
          By using the Site, you agree to these Terms.
        </InfoParagraph>

        <InfoHeading dark={dark}>1. Use of the Service</InfoHeading>
        <InfoParagraph dark={dark}>
          CHRONOS provides free, browser-based tools "as is" and "as available", without any guarantee of
          uninterrupted availability. You may use these tools for personal or professional purposes, provided
          your use complies with these Terms and applicable law.
        </InfoParagraph>

        <InfoHeading dark={dark}>2. Acceptable Use</InfoHeading>
        <InfoList dark={dark} items={[
          'Do not use CHRONOS for any unlawful purpose, or to process content you do not have the right to use.',
          'Do not attempt to disrupt, overload, or interfere with the Site, including via automated scraping or bulk requests.',
          'Do not attempt to bypass, disable, or interfere with advertising shown on the Site.',
          'Do not upload or process malicious files, malware, or content that infringes the rights of others.',
        ]} />

        <InfoHeading dark={dark}>3. Your Content & Files</InfoHeading>
        <InfoParagraph dark={dark}>
          Files and text you process using CHRONOS tools remain yours. Most tools process content locally in
          your browser, and we do not claim any ownership over it.
        </InfoParagraph>

        <InfoHeading dark={dark}>4. Intellectual Property</InfoHeading>
        <InfoParagraph dark={dark}>
          The CHRONOS name, logo, design, and underlying code are the property of their respective owners and
          may not be copied or redistributed without permission, except as permitted by applicable law.
        </InfoParagraph>

        <InfoHeading dark={dark}>5. Advertising</InfoHeading>
        <InfoParagraph dark={dark}>
          CHRONOS is supported by advertising served through third-party advertising networks. See our{' '}
          <Link href="/privacy" style={{ color: '#2563EB', fontWeight: 600 }}>Privacy Policy</Link>
          {' '}for details.
        </InfoParagraph>

        <InfoHeading dark={dark}>6. Disclaimer of Warranties</InfoHeading>
        <InfoParagraph dark={dark}>
          CHRONOS tools are provided for general informational and productivity purposes. We make no warranties
          about the accuracy, reliability, or suitability of any tool's output for a particular purpose,
          including financial, medical, or legal decisions.
        </InfoParagraph>

        <InfoHeading dark={dark}>7. Limitation of Liability</InfoHeading>
        <InfoParagraph dark={dark}>
          To the fullest extent permitted by law, CHRONOS and its operators are not liable for any indirect,
          incidental, or consequential damages arising from your use of, or inability to use, the Site or its tools.
        </InfoParagraph>

        <InfoHeading dark={dark}>8. Third-Party Links & Services</InfoHeading>
        <InfoParagraph dark={dark}>
          The Site may link to or rely on third-party services. We are not responsible for the content,
          accuracy, or practices of third-party websites or services.
        </InfoParagraph>

        <InfoHeading dark={dark}>9. Changes to These Terms</InfoHeading>
        <InfoParagraph dark={dark}>
          We may update these Terms from time to time. Continued use of the Site after changes are posted
          means you accept the updated Terms.
        </InfoParagraph>

        <InfoHeading dark={dark}>10. Contact</InfoHeading>
        <InfoParagraph dark={dark}>
          Questions about these Terms?{' '}
          <Link href="/contact" style={{ color: '#2563EB', fontWeight: 600 }}>Contact us</Link>
          {' '}or email{' '}
          <a href={`mailto:${SITE_EMAIL}`} style={{ color: '#2563EB', fontWeight: 600 }}>{SITE_EMAIL}</a>.
        </InfoParagraph>

      </div>
      <InfoFooter dark={dark} />
    </main>
  )
}
