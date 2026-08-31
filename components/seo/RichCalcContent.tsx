'use client'

// ── components/seo/RichCalcContent.tsx ──────────────────────────
// Mampiseho ny content lalindalina (what/how/formula/examples/faq)
// avy amin'ny lib/seoContent.ts, ho an'ny calculator tokana.
//
// Miavaka amin'ny ToolSeoContent.tsx (izay ho an'ny tool REHETRA,
// mampiasa ny registryTools description/faqSchema fotsiny) — ity
// component ity dia manokana ho an'ny calculator izay MANANA
// content lalindalina kokoa ao amin'ny SEO_CONTENT (bmi, mortgage,
// emi, vat, discount, percentage, tip, age, calories, datediff,
// compound, randompick).
//
// Fampiasana:
//   <RichCalcContent contentKey="bmi" />
// Raha tsy misy "contentKey" mifanandrify ao amin'ny SEO_CONTENT,
// tsy mamorona na inona na inona ity component ity (aza atahorana
// ny fampidirana azy amin'ny toerana rehetra).

import type { CSSProperties } from 'react'
import { SEO_CONTENT } from '../../lib/seoContent'
import { useLang } from '../../lib/hooks/useLang'

export default function RichCalcContent({ contentKey }: { contentKey: string }) {
  const { lang } = useLang()
  const entry = SEO_CONTENT[contentKey]
  if (!entry) return null

  const isFr = lang === 'fr'
  const what = isFr ? entry.frWhat : entry.what
  const how = isFr ? entry.frHow : entry.how
  const formula = isFr ? entry.frFormula : entry.formula
  const examples = isFr ? entry.frExamples : entry.examples
  const faq = isFr ? entry.frFaq : entry.faq

  const L = {
    what: isFr ? 'Qu\u2019est-ce que c\u2019est ?' : 'What is it?',
    how: isFr ? 'Comment ça marche ?' : 'How does it work?',
    formula: isFr ? 'Formule' : 'Formula',
    examples: isFr ? 'Exemples' : 'Examples',
    faq: isFr ? 'Questions fréquentes' : 'Frequently Asked Questions',
  }

  const sectionStyle: CSSProperties = { marginBottom: 28 }
  const h2Style: CSSProperties = { fontSize: 17, fontWeight: 800, margin: '0 0 10px', color: '#0F172A' }
  const pStyle: CSSProperties = { fontSize: 14, lineHeight: 1.7, color: '#475569', margin: 0 }

  return (
    <section style={{ maxWidth: 680, margin: '0 auto', padding: '8px 24px 48px' }}>
      {what && (
        <div style={sectionStyle}>
          <h2 style={h2Style}>{L.what}</h2>
          <p style={pStyle}>{what}</p>
        </div>
      )}

      {how && (
        <div style={sectionStyle}>
          <h2 style={h2Style}>{L.how}</h2>
          <p style={pStyle}>{how}</p>
        </div>
      )}

      {formula && (
        <div style={sectionStyle}>
          <h2 style={h2Style}>{L.formula}</h2>
          <div style={{
            background: '#0F172A', color: '#F1F5F9', borderRadius: 10,
            padding: '14px 18px', fontFamily: 'monospace', fontSize: 15,
          }}>
            {formula.expr}
          </div>
          <p style={{ ...pStyle, marginTop: 8, fontSize: 13 }}>{formula.note}</p>
        </div>
      )}

      {examples && examples.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={h2Style}>{L.examples}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {examples.map((ex, i) => (
              <div key={i} style={{
                border: '1px solid #E2E8F0', borderRadius: 10, padding: '10px 14px',
                display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{ex.label}</span>
                <span style={{ fontSize: 13, color: '#64748B' }}>{ex.input}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{ex.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {faq && faq.length > 0 && (
        <div>
          <h2 style={h2Style}>{L.faq}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faq.map((item, i) => (
              <details key={i} style={{
                border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px 16px', background: '#fff',
              }}>
                <summary style={{ fontSize: 14, fontWeight: 700, cursor: 'pointer', color: '#0F172A' }}>
                  {item.q}
                </summary>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#475569', margin: '10px 0 0' }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          {/* JSON-LD ho an'ity FAQ ity — mitovy filozofia amin'ny
             ToolSeoContent.tsx */}
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: (entry.faq || []).map((item) => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
              }),
            }}
          />
        </div>
      )}
    </section>
  )
}
