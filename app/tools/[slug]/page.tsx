// ── app/tools/[slug]/page.tsx ─────────────────────────────────
// NOTE: the version of this file in the original upload was an
// accidental duplicate of the home page (app/page.tsx), pointing at
// the wrong import depth ('../lib/tools' instead of '../../../lib/
// tools'). This is the corrected version, adapted from the sibling
// tool-slug-page.tsx draft that was sitting next to it unused.

import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { registryTools, TOOLS, RegistryTool, Tool, WIRED_SLUGS } from '../../../lib/tools'
import { CATEGORY_SEO } from '../../../lib/categorySeo'
import ToolPageClient from './ToolPageClient'

// generateStaticParams (misy eto ambany) dia mamela an'i Next.js
// hahafantatra ny slug rehetra ho an'ny SEO/routing, fa TSY tokony
// hahatonga ny pejy ho "static" tanteraka — satria ny votoaty
// (title, description, ary indrindra ny teny EN/FR ao anaty
// ToolPageClient/ImageHub sns.) dia miankina amin'ny cookie
// "ch-lang" izay miova isaky ny mpampiasa. Raha "static" ilay
// pejy, dia amin'ny fotoana "build" ihany (tsy misy cookie) no
// hamoronana ny HTML — "en" foana no ho voarindra ao, ka
// tsy hifanaraka amin'ny teny nofidin'ny mpampiasa ilay HTML
// server, ary hisy "hydration mismatch" rehefa miova amin'ny
// client ilay teny. "force-dynamic" dia manery an'i Next.js
// hamaky ny cookie isaky ny request, tahaka ny natao ao amin'ny
// layout.tsx sy generateMetadata eto ambany.
export const dynamic = 'force-dynamic'

type Params = Promise<{ slug: string }>

// ── Helper: mitady tool amin'ny slug ──────────────────────────
// registryTools[].slug dia "/tools/xxx" (misy "/tools/" prefix),
// fa TOOLS[].slug kosa "/xxx" fotsiny — samy ovaina ho "xxx" tsotra
// alohan'ny hampitahana amin'ny params.slug (ilay teboka nisy bug
// tao amin'ny version voalohany: .replace('/', '') dia manaisotra
// ilay '/' voalohany ihany, ka mijanona "tools/xxx" ho an'ny
// registryTools — tsy mety mihitsy).
function findTools(slug: string): {
  regTool: RegistryTool | null
  tool: Tool | null
} {
  const regTool = registryTools.find(
    (t: RegistryTool) => t.slug.replace(/^\/tools\//, '') === slug
  ) ?? null
  const tool = TOOLS.find(
    (t: Tool) => t.slug.replace(/^\//, '') === slug
  ) ?? null
  return { regTool, tool }
}

// ── 1. Static Generation ──────────────────────────────────────
export async function generateStaticParams() {
  const r = registryTools.map((t: RegistryTool) => ({
    slug: t.slug.replace(/^\/tools\//, ''),
  }))
  const s = TOOLS.map((t: Tool) => ({
    slug: t.slug.replace(/^\//, ''),
  }))
  return [...r, ...s]
}

// ── 2. SEO Metadata ───────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params
  const { regTool, tool } = findTools(slug)

  // Mamaky ilay cookie "ch-lang" (mitovy amin'ny app/layout.tsx) mba
  // hamerenana ny title/description FR raha izay no teny nofidin'ny
  // mpampiasa — talohan'ity fanovana ity, teny anglisy foana no
  // naseho na dia "fr" aza ilay lang.
  const cookieStore = await cookies()
  const isFr = cookieStore.get('ch-lang')?.value === 'fr'

  // ── URL "relative" ho an'ity pejy ity (mifototra amin'ny
  // metadataBase napetraka ao amin'ny app/layout.tsx). Mampiasa
  // "x-default" fotsiny — TSY manao hreflang "en"/"fr" miavaka
  // satria iray ihany ny URL ho an'ny teny roa tonta amin'izao
  // (ny lang dia miova amin'ny cookie, tsy amin'ny URL). Ny
  // "x-default" dia milaza amin'i Google fa "ity URL ity no
  // fallback marina ho an'ny mpampiasa rehetra, na inona na inona
  // teny fiteniny" — marina io fanambarana io satria mitovy ny URL
  // amin'ny roa teny. Raha misy /fr/... routing tena marina any
  // aoriana, dia hosoloina hreflang tanteraka io.
  const canonicalPath = `/tools/${slug}`
  const alternates = {
    canonical: canonicalPath,
    languages: { 'x-default': canonicalPath },
  }

  // ── Hub pages (ex: pdf-hub, network-hub) — mampiasa CATEGORY_SEO
  // raha misy, satria tsara kokoa noho ny metadata generic avy amin'ny
  // TOOLS array (jereo lib/categorySeo.ts) ──
  const catSeo = CATEGORY_SEO[slug]
  if (catSeo) {
    return {
      title: isFr ? catSeo.frTitle : catSeo.title,
      description: isFr ? catSeo.frDescription : catSeo.description,
      keywords: isFr ? catSeo.frKeywords : catSeo.keywords,
      alternates,
      openGraph: {
        title: isFr ? catSeo.frTitle : catSeo.title,
        description: isFr ? catSeo.frDescription : catSeo.description,
        type: 'website',
      },
    }
  }

  if (regTool) {
    return {
      title: isFr ? regTool.frTitle : regTool.title,
      description: isFr ? regTool.frDescription : regTool.description,
      keywords: isFr ? regTool.frKeywords : regTool.keywords,
      alternates,
      openGraph: {
        title: isFr ? regTool.frTitle : regTool.title,
        description: isFr ? regTool.frDescription : regTool.description,
        type: 'website',
      },
    }
  }
  if (tool) {
    return {
      title: isFr ? `${tool.frLabel} — Outil Gratuit en Ligne` : `${tool.label} — Free Online Tool`,
      description: isFr
        ? `${tool.frLabel} gratuit en ligne. Sans inscription.`
        : `Free online ${tool.label.toLowerCase()}. No sign-up required.`,
      keywords: tool.keywords,
      alternates,
    }
  }
  return { title: 'Tool Not Found' }
}

// ── 3. Page ───────────────────────────────────────────────────
export default async function ToolPage({
  params,
}: {
  params: Params
}) {
  const { slug } = await params
  const { regTool, tool } = findTools(slug)

  // Allow any slug that is wired in COMPONENT_MAP (ToolPageClient handles
  // the 'not built yet' fallback for slugs not in TOOLS/registryTools)
  // WIRED_SLUGS is now shared from lib/tools.ts — see the comment there.
  if (!regTool && !tool && !WIRED_SLUGS.has(slug)) notFound()

  return (
    <ToolPageClient
      slug={slug}
      regTool={regTool}
      tool={tool}
    />
  )
}
