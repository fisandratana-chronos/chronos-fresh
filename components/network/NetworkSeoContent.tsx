'use client'

// ── components/network/NetworkSeoContent.tsx ────────────────────
// Mampiseho ny content lalindalina (what/how/faq) ao ambanin'ny
// calculator NET_HUB tsirairay, mba tsy ho "fiche vide" ny pejy.
// Mampiasa ny NHThemeCtx sy ny useTrans() efa ao amin'ny NetworkHub
// mba hifanaraka amin'ny endrika/lang misy sahady.
import React from 'react'
import { NETWORK_SEO_CONTENT } from '../../lib/networkSeoContent'

// NOTE: alefa avy any amin'ny NetworkHub.tsx ny "T" (theme) sy "lang"
// amin'ny alalan'ny props, satria NHThemeCtx sy useTrans dia tsy
// exportina avy ao amin'ny NetworkHub.tsx amin'izao fotoana izao.

export default function NetworkSeoContent({
  tabId, T, lang,
}: {
  tabId: string
  T: {
    bgCard: string; border: string; textPrimary: string; textSecondary: string;
    cyan: string; green: string;
  }
  lang: string
}) {
  const content = NETWORK_SEO_CONTENT[tabId]
  if (!content) return null

  const getText = (field: string) =>
    (lang === 'fr' && (content as any)[`fr${field.charAt(0).toUpperCase()}${field.slice(1)}`]) || (content as any)[field]
  const getFormula = () => (lang === 'fr' && content.frFormula) ? content.frFormula : content.formula
  const getFaq = () => (lang === 'fr' && content.frFaq) ? content.frFaq : content.faq

  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{
      fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17,
      color: T.textPrimary, marginBottom: 10, marginTop: 26, lineHeight: 1.3,
    }}>
      {children}
    </h2>
  )

  const P = ({ children }: { children: React.ReactNode }) => (
    <p style={{
      fontFamily: 'Inter,sans-serif', fontSize: 14, color: T.textSecondary,
      lineHeight: 1.75, margin: 0,
    }}>
      {children}
    </p>
  )

  return (
    <article style={{
      marginTop: 28, paddingTop: 24, borderTop: `1px solid ${T.border}`,
      maxWidth: 820,
    }}>
      <h1 style={{
        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 21,
        color: T.textPrimary, marginBottom: 14, lineHeight: 1.3,
      }}>
        {getText('title')}
      </h1>

      <H2>{lang === 'fr' ? 'Qu\u2019est-ce que c\u2019est ?' : 'What is it?'}</H2>
      <P>{getText('what')}</P>

      <H2>{lang === 'fr' ? 'Comment ça fonctionne' : 'How it works'}</H2>
      <P>{getText('how')}</P>

      {content.formula && (
        <>
          <H2>{lang === 'fr' ? 'Formule' : 'Formula'}</H2>
          <div style={{
            background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10,
            padding: '14px 18px', marginBottom: 4,
          }}>
            <code style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
              color: T.cyan, display: 'block', marginBottom: 6,
            }}>
              {getFormula()?.expr}
            </code>
            {getFormula()?.note && (
              <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 12, color: T.textSecondary }}>
                {getFormula()?.note}
              </span>
            )}
          </div>
        </>
      )}

      {getFaq()?.length > 0 && (
        <>
          <H2>{lang === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions'}</H2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {getFaq().map((item, i) => (
              <details key={i} style={{
                borderBottom: i === getFaq().length - 1 ? 'none' : `1px solid ${T.border}`,
                padding: '12px 0',
              }}>
                <summary style={{
                  cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 600, fontSize: 13.5, color: T.textPrimary, listStyle: 'none',
                }}>
                  {item.q}
                </summary>
                <p style={{
                  fontFamily: 'Inter,sans-serif', fontSize: 13, color: T.textSecondary,
                  lineHeight: 1.7, marginTop: 8, marginBottom: 0,
                }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </>
      )}
    </article>
  )
}
