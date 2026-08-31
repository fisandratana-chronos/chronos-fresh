// ── app/robots.ts ────────────────────────────────────────────────
// Next.js App Router mamorona robots.txt automatique amin'ity fichier ity.
// Mitovy amin'ny sitemap.ts: ovay ny SITE_URL (na apetraho ao amin'ny
// .env.local ny NEXT_PUBLIC_SITE_URL) rehefa efa manana domain manokana.

import { MetadataRoute } from 'next'
import { SITE_URL } from '../lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Tsy misy pejy tokony ho blocked amin'izao (tsy misy /admin,
      // /api private, sns.). Ampio raha misy any aoriana.
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
