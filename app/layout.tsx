import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import './globals.css'
import { LangProvider } from '../lib/hooks/useLang'
import { DarkProvider } from '../lib/hooks/useDark'   // ← import avy amin'ny .tsx
import NavClient from '../components/nav/NavClient'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  // metadataBase — mamela an'i Next.js hamaha automatique ireo
  // canonical/URL "relative" (ex: "/tools/pdf-hub") isaky ny pejy,
  // tsy mila manoratra ny SITE_URL feno isaky ny generateMetadata.
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CHRONOS — Free Online Tools',
    template: '%s | CHRONOS',
  },
  description: 'Free online tools — PDF, image, calculators, converters. No sign-up required.',
  openGraph: {
    siteName: 'CHRONOS',
    type: 'website',
  },
  // ── PWA manifest ──
  manifest: '/manifest.json',
  // ── Icons — favicon + Apple touch icon ──
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CHRONOS',
  },
}

// ── Viewport — themeColor tokony ho eto, tsy ao amin'ny metadata
// (Next.js 14+ dia mampiseho warning raha ao amin'ny metadata ihany) ──
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563EB',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Vakiana avy amin'ny cookie "ch-lang" (nosoratan'ny setLang() ao
  // amin'ny useLang.tsx) — server component ity RootLayout ity ka
  // azo atao mivantana ny mamaky cookie eto, alohan'ny SSR. Izany
  // no mahatonga ny <html lang> ho marina hatramin'ny fisehoana
  // voalohany, tsy hoe "en" hardcoded intsony.
  const cookieStore = await cookies()
  const savedLang = cookieStore.get('ch-lang')?.value
  const initialLang = savedLang === 'fr' ? 'fr' : 'en'

  return (
    <html lang={initialLang}>
      <body style={{ margin: 0, padding: 0, fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* paddingTop 64px eto mba tsy hisy content voasaron'ny Nav
           "fixed" (ny Nav dia nesorina tamin'ny document flow, ka tsy
           mamela toerana ho azy intsony ny fanaovana "fixed" azy) */}
        <div style={{ paddingTop: 64 }}>
        <DarkProvider>
          <LangProvider initialLang={initialLang}>
            <NavClient />
            {children}
          </LangProvider>
        </DarkProvider>
        </div>
      </body>
    </html>
  )
}
