// ── app/terms/page.tsx ────────────────────────────────────────
// SERVER COMPONENT — metadata + render ny TermsClient fotsiny.

import type { Metadata } from 'next'
import TermsClient from './TermsClient'

export const metadata: Metadata = {
  title: 'Terms of Use | CHRONOS',
  description:
    'Terms of use for CHRONOS — the rules and disclaimers that apply when using our free online tools.',
  alternates: { canonical: 'https://chronos-tools.com/terms' },
  openGraph: {
    title: 'Terms of Use | CHRONOS',
    description: 'Rules and disclaimers for using CHRONOS free tools.',
    type: 'website',
  },
}

export default function TermsPage() {
  return <TermsClient />
}
