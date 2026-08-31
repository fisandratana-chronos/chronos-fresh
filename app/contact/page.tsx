// ── app/contact/page.tsx ──────────────────────────────────────
// SERVER COMPONENT — metadata + render ny ContactClient fotsiny.

import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact CHRONOS',
  description:
    'Contact the CHRONOS team for support, feedback, partnerships, or advertising inquiries.',
  alternates: { canonical: 'https://chronos-tools.com/contact' },
  openGraph: {
    title: 'Contact CHRONOS',
    description: 'Reach the CHRONOS team for support or advertising.',
    type: 'website',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
