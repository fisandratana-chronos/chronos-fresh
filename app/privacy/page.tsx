// ── app/privacy/page.tsx ──────────────────────────────────────
// SERVER COMPONENT — metadata + render ny PrivacyClient fotsiny.

import type { Metadata } from 'next'
import PrivacyClient from './PrivacyClient'

export const metadata: Metadata = {
  title: 'Privacy Policy | CHRONOS',
  description:
    'Read the CHRONOS privacy policy: what data we collect, how cookies and advertising ' +
    '(including Google AdSense) work on this site, and your privacy choices.',
  alternates: { canonical: 'https://chronos-tools.com/privacy' },
  openGraph: {
    title: 'Privacy Policy | CHRONOS',
    description: 'How CHRONOS handles your data and advertising cookies.',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return <PrivacyClient />
}
