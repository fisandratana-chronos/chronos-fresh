// ── app/about/page.tsx ────────────────────────────────────────
// SERVER COMPONENT — metadata + render ny AboutClient fotsiny.
// Tsy misy 'use client' eto: mba hahafahana export metadata (SEO).
// Ny UI rehetra + useDark dia ao amin'ny AboutClient.tsx.

import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About CHRONOS — Free Online Tools',
  description:
    'Learn about CHRONOS, a free collection of 100+ online tools for PDF, image, ' +
    'AI writing, calculators, internet, and developer tasks. No sign-up, privacy-first.',
  alternates: { canonical: 'https://chronos-tools.com/about' },
  openGraph: {
    title: 'About CHRONOS — Free Online Tools',
    description: 'Free online tools. No sign-up. No paywalls.',
    type: 'website',
  },
}

export default function AboutPage() {
  return <AboutClient />
}
