'use client'

// ── components/seo/ToolSeoContent.tsx ───────────────────────────
// Component iray hampiasaina isaky ny pejy tool (ao amin'ny
// ToolPageClient.tsx), mba hampiseho:
//   1. Teny fanazavana (description) — TENY HITA amin'ilay pejy,
//      tsy hoe metadata miafina fotsiny. Ilaina io satria i Google
//      dia mamaky ny "contenu" tena hita amin'ilay pejy, tsy ny
//      metadata ihany.
//   2. FAQ — mitovy amin'ny 1, teny hita amin'ilay pejy
//   3. JSON-LD FAQPage schema — mety hahazoana "rich snippet" ao
//      amin'ny valin'ny recherche Google (ilay FAQ miseho mivantana
//      ao ambanin'ny link amin'ny résultats)
//
// Mampiasa ny angona efa ao amin'ny registryTools (lib/tools.ts) —
// tsy mila mamorona teny vaovao, fa mampiseho izay efa nisy.

import { RegistryTool, Tool } from '../../lib/tools'
import { CATEGORY_SEO } from '../../lib/categorySeo'
import { useLang } from '../../lib/hooks/useLang'

export default function ToolSeoContent({
  regTool,
  tool,
  slug,
}: {
  regTool: RegistryTool | null
  tool: Tool | null
  slug?: string
}) {
  const { lang } = useLang()

  const catSeo = slug ? CATEGORY_SEO[slug] : undefined

  // Tsy misy angona hampiseho (na hub SEO, na regTool, na tool) →
  // aza mamorona na inona na inona
  if (!catSeo && !regTool && !tool) return null

  const description = catSeo
    ? (lang === 'fr' ? catSeo.frDescription : catSeo.description)
    : regTool
      ? (lang === 'fr' ? regTool.frDescription : regTool.description)
      : null

  const faqList: { q: string; a: string }[] | undefined = regTool
    ? (lang === 'fr' ? regTool.frFaqSchema : regTool.faqSchema)
    : undefined

  const heading = lang === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'
  const aboutHeading = lang === 'fr' ? 'À propos de cet outil' : 'About this tool'

  return (
    <section
      style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: '8px 24px 64px',
      }}
    >
      {/* ── 1. Teny fanazavana (visible description) ── */}
      {description && (
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 10px' }}>
            {aboutHeading}
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#475569', margin: 0 }}>
            {description}
          </p>
        </div>
      )}

      {/* ── 2. FAQ (visible text, <details>/<summary> = azo iasana
             na dia tsy JS aza — tena tsara ho an'ny crawler) ── */}
      {faqList && faqList.length > 0 && (
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 12px' }}>
            {heading}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqList.map((item, i) => (
              <details
                key={i}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: 10,
                  padding: '12px 16px',
                  background: '#fff',
                }}
              >
                <summary
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: '#0F172A',
                  }}
                >
                  {item.q}
                </summary>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#475569', margin: '10px 0 0' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. JSON-LD structured data — mitovy amin'ny FAQ eo
             ambony (tsy fanoloana azy, fa fanampiny ho an'i Google
             mba hamorona "rich snippet" amin'ny valin'ny recherche).
             Mampiasa ny teny EN foana eto satria ny JSON-LD dia tsy
             miova araka ny toggle-n'ny mpampiasa fa araka ny fiteny
             tena voarakitra amin'ilay <html lang> amin'ny SSR. ── */}
      {regTool?.faqSchema && regTool.faqSchema.length > 0 && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: regTool.faqSchema.map((item: { q: string; a: string }) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              })),
            }),
          }}
        />
      )}
    </section>
  )
}
