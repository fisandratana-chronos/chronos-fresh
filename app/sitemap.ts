// ── app/sitemap.ts ──────────────────────────────────────────────
// Next.js App Router mamorona sitemap.xml automatique amin'ity fichier ity.
// Tsy mila mamorona XML manokana — ampy ny mamerina array araka ity
// "MetadataRoute.Sitemap" ity, ary Next.js no mikarakara ny XML.
//
// Rehefa efa manana domain manokana ianao, ovay ny SITE_URL any ambany,
// na (tsara kokoa) apetraho ao amin'ny .env.local:
//   NEXT_PUBLIC_SITE_URL=https://ny-domain-nao.com
// mba tsy hisy ovaina intsony ao amin'ity fichier ity.

import { MetadataRoute } from 'next'
import { TOOLS, registryTools, WIRED_SLUGS } from '../lib/tools'
import { SITE_URL } from '../lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // ── 1. Pejy static (home + info pages) ──────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ── 2. Tool pages, avy amin'ny roa rafitra (TOOLS + registryTools) ──
  // Mampiasa Set mba tsy hisy duplicate raha samy manana ilay slug
  // ihany ny roa rafitra (ex: "currency-converter").
  const seenSlugs = new Set<string>()
  const toolRoutes: MetadataRoute.Sitemap = []

  for (const t of registryTools) {
    const slug = t.slug.replace(/^\/tools\//, '')
    // Aza alefa amin'i Google raha mbola tsy manana pejy tena miasa
    // ilay tool — soft 404 raha tsy izany (jereo ny fanamarihana
    // ao amin'ny lib/tools.ts momba ny WIRED_SLUGS).
    if (!WIRED_SLUGS.has(slug)) continue
    if (seenSlugs.has(slug)) continue
    seenSlugs.add(slug)
    toolRoutes.push({
      url: `${SITE_URL}/tools/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: t.popular || t.trending ? 0.9 : 0.7,
    })
  }

  for (const t of TOOLS) {
    const slug = t.slug.replace(/^\//, '')
    if (!WIRED_SLUGS.has(slug)) continue
    if (seenSlugs.has(slug)) continue
    seenSlugs.add(slug)
    toolRoutes.push({
      url: `${SITE_URL}/tools/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  return [...staticRoutes, ...toolRoutes]
}
