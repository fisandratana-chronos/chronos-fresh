// ── lib/site.ts ──────────────────────────────────────────────────
// Toerana IRAY ihany hametrahana ny domain-n'ny CHRONOS. Ampiasain'ny
// app/sitemap.ts, app/robots.ts, app/layout.tsx (metadataBase), ary
// app/tools/[slug]/page.tsx (canonical URL). Isaky ny manana domain
// manokana ianao, apetraho ao amin'ny .env.local:
//   NEXT_PUBLIC_SITE_URL=https://ny-domain-nao.com
// dia hivoaka automatique amin'ny toerana efatra ireo — tsy mila
// mikitika code intsony.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://chronos.vercel.app'
