// ── lib/breakpoints.ts ───────────────────────────────────────
// Single source of truth ho an'ny @media breakpoints rehetra amin'ity
// site ity. Ampiasao ity fa tsy manoratra valeur hardcoded isam-bokotra
// (lesona avy tamin'ny SmartCalcHub/PdfHub/ImageHub/TConvertersHub,
// izay samy nanana valeur samihafa talohan'izay).
//
// Ohatra fampiasana ao anaty <style>{`...`}</style> template string:
//
//   import { BP } from '../../lib/breakpoints'
//   ...
//   <style>{`
//     @media (max-width: ${BP.tablet}px) {
//       .layout { grid-template-columns: 1fr !important; }
//     }
//     @media (max-width: ${BP.mobile}px) {
//       .tool-grid { grid-template-columns: repeat(2, 1fr) !important; }
//     }
//   `}</style>

export const BP = {
  mobile: 480,   // écran finday kely (ex: iPhone SE)
  tablet: 768,   // finday lehibe / tablette portrait
  laptop: 1024,  // tablette landscape / laptop kely
  desktop: 1280, // desktop
} as const

// Ready-made media query strings, raha tianao ampiasaina mivantana
// (fanampiny fotsiny — azo ampiasaina na tsia)
export const MQ = {
  mobile: `(max-width: ${BP.mobile}px)`,
  tablet: `(max-width: ${BP.tablet}px)`,
  laptop: `(max-width: ${BP.laptop}px)`,
  desktop: `(max-width: ${BP.desktop}px)`,
} as const
