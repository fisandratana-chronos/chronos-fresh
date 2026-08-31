'use client'

// ── app/tools/[slug]/ToolPageClient.tsx ────────────────────────

import type { ComponentType } from 'react'
import { useLang } from '../../../lib/hooks/useLang'
import { RegistryTool, Tool } from '../../../lib/tools'

import TBMI from '../../../components/tools/TBMI'
import TCalories from '../../../components/tools/TCalories'
import TCurrency from '../../../components/tools/TCurrency'
import TEMI from '../../../components/tools/TEMI'
import TIdealWeight from '../../../components/tools/TIdealWeight'
import TMortgage from '../../../components/tools/TMortgage'
import TWaterIntake from '../../../components/tools/TWaterIntake'
import SmartCalcHub from '../../../components/calculators/SmartCalcHub'
import PdfHub from '../../../components/pdf/PdfHub'
import NetworkHub from '../../../components/network/NetworkHub'
import TConvertersHub from '../../../components/converters/TConvertersHub'
import TDeveloperHub from '../../../components/developer/TDeveloperHub'
import ImageHub from '../../../components/image/ImageHub'
import ToolSeoContent from '../../../components/seo/ToolSeoContent'
import RichCalcContent from '../../../components/seo/RichCalcContent'

// Slug (URL /tools/xxx) → key ao amin'ny lib/seoContent.ts (SEO_CONTENT).
// Ireto 4 tool ireto ihany no manana content lalindalina (what/how/
// formula/examples) amin'izao — ny hafa dia mampiasa ny ToolSeoContent
// mahazatra (description + FAQ avy amin'ny registryTools).
const RICH_CONTENT_SLUGS: Record<string, string> = {
  'bmi-calculator': 'bmi',
  'mortgage-calculator': 'mortgage',
  'emi-calculator': 'emi',
  'calories-calculator': 'calories',
}

const COMPONENT_MAP: Record<string, ComponentType<any>> = {
  // Calculators
  'bmi-calculator':          TBMI,
  'calories-calculator':     TCalories,
  'emi-calculator':          TEMI,
  'ideal-weight-calculator': TIdealWeight,
  'mortgage-calculator':     TMortgage,
  'water-intake-calculator': TWaterIntake,
  'smart-calculator':        SmartCalcHub,
  'age-calculator':          SmartCalcHub,
  'vat-calculator':          SmartCalcHub,
  'percentage-calculator':   SmartCalcHub,
  'date-difference-calculator': SmartCalcHub,
  'loan-calculator':         SmartCalcHub,
  'gpa-calculator':          SmartCalcHub,
  'scientific-calculator':   SmartCalcHub,

  // PDF Hub slugs
  'pdf-hub':      PdfHub,
  'merge-pdf':    PdfHub,
  'split-pdf':    PdfHub,
  'compress-pdf': PdfHub,
  'rotate-pdf':   PdfHub,
  'jpg-to-pdf':   PdfHub,
  'pdf-to-jpg':   PdfHub,
  'pdf-to-word':  PdfHub,
  'pdf-to-excel': PdfHub,

  // Network Hub slugs
  'network-hub':           NetworkHub,
  'internet-speed-test':   NetworkHub,
  'website-status-checker':NetworkHub,
  'ping-checker':          NetworkHub,
  'dns-lookup':            NetworkHub,
  'ip-lookup':             NetworkHub,
  'whois-lookup':          NetworkHub,
  'ssl-checker':           NetworkHub,

  // Image Hub — placeholder (Canvas API tools — mbola tsy misy implementation)
  'image-hub': ImageHub,
  'image-compressor': ImageHub,
  'resize-image': ImageHub,
  'remove-background': ImageHub,
  'jpg-to-png': ImageHub,
  'png-to-jpg': ImageHub,
  'crop-image': ImageHub,
  'flip-image': ImageHub,
  'add-watermark': ImageHub,
  'color-picker': ImageHub,

  // Converters Hub slugs — all tabs inside TConvertersHub
  'converters-hub':    TConvertersHub,
  'length-converter':  TConvertersHub,
  'weight-converter':  TConvertersHub,
  'area-converter':    TConvertersHub,
  'volume-converter':  TConvertersHub,
  'speed-converter':   TConvertersHub,
  'temperature-converter': TConvertersHub,
  'currency-converter':    TConvertersHub,
  'rgb-to-hex':        TConvertersHub,
  'hex-to-rgb':        TConvertersHub,
  'text-case-converter':   TConvertersHub,

  // Developer Hub slugs — all tabs inside TDeveloperHub
  'developer-hub':         TDeveloperHub,
  'json-formatter':        TDeveloperHub,
  'json-validator':        TDeveloperHub,
  'base64-encoder':        TDeveloperHub,
  'base64-decoder':        TDeveloperHub,
  'url-encoder':           TDeveloperHub,
  'url-decoder':           TDeveloperHub,
  'regex-tester':          TDeveloperHub,
  'html-formatter':        TDeveloperHub,
  'css-minifier':          TDeveloperHub,
  'javascript-minifier':   TDeveloperHub,
  'word-counter':          TDeveloperHub,
}

// Hub-level slugs that render full-screen (own header/nav — skip the wrapper)
const FULLSCREEN_SLUGS = new Set([
  'image-hub',
  'image-compressor','resize-image','remove-background','jpg-to-png','png-to-jpg',
  'crop-image','flip-image','add-watermark','color-picker',
  'smart-calculator',
  'age-calculator','vat-calculator','percentage-calculator','date-difference-calculator',
  'loan-calculator','gpa-calculator','scientific-calculator',
  'pdf-hub','merge-pdf','split-pdf','compress-pdf','rotate-pdf','jpg-to-pdf',
  'pdf-to-jpg','pdf-to-word','pdf-to-excel',
  'network-hub','internet-speed-test','website-status-checker','ping-checker',
  'dns-lookup','ip-lookup','whois-lookup','ssl-checker',
  'converters-hub','length-converter','weight-converter','area-converter',
  'volume-converter','speed-converter','temperature-converter','currency-converter',
  'rgb-to-hex','hex-to-rgb','text-case-converter',
  'developer-hub','json-formatter','json-validator','base64-encoder','base64-decoder',
  'url-encoder','url-decoder','regex-tester','html-formatter','css-minifier',
  'javascript-minifier','word-counter',
])

// Slug (URL /tools/xxx) → props ho an'ny ImageHub.tsx (tab + format
// raha ilaina). Ireto 5 ireto dia efa VITA ao anaty ImageHub — "convert"
// no ampiasain'ny jpg-to-png sy png-to-jpg, samy manondro targetFmt
// hafa fotsiny.
const IMAGE_HUB_PROPS_BY_SLUG: Record<string, { initialTab: string; initialFormat?: string }> = {
  'image-compressor': { initialTab: 'compress' },
  'resize-image': { initialTab: 'resize' },
  'remove-background': { initialTab: 'bgremove' },
  'jpg-to-png': { initialTab: 'convert', initialFormat: 'image/png' },
  'png-to-jpg': { initialTab: 'convert', initialFormat: 'image/jpeg' },
  'crop-image': { initialTab: 'crop' },
  'flip-image': { initialTab: 'flip' },
  'add-watermark': { initialTab: 'watermark' },
  'color-picker': { initialTab: 'colorpicker' },
}

// Slug (URL /tools/xxx) → tab id ao anaty SmartCalcHub.tsx (PANEL_MAP).
// Ireto 4 calculator ireto dia efa VITA sy miasa ao anaty hub — tsy
// nisy afa-tsy URL manokana mankany aminy fotsiny.
const SMARTCALC_TOOL_BY_SLUG: Record<string, string> = {
  'age-calculator': 'age',
  'vat-calculator': 'vat',
  'percentage-calculator': 'percentage',
  'date-difference-calculator': 'datediff',
  'loan-calculator': 'loan',
  'gpa-calculator': 'gpa',
  'scientific-calculator': 'scientific',
}
// Slug (URL /tools/xxx) → tab id ao anaty PdfHub.tsx (jereo PDF_TABS
// ao amin'io fichier io). Ilaina mba hisokafan'ilay tabana MARINA
// rehefa misy mitsidika mivantana ny URL, fa tsy ilay "merge" default
// foana (izay olana efa nisy na dia ho an'ny split-pdf/compress-pdf/
// rotate-pdf/jpg-to-pdf aza — nohavaozina daholo eto).
const PDF_TAB_BY_SLUG: Record<string, string> = {
  'merge-pdf': 'merge',
  'split-pdf': 'split',
  'compress-pdf': 'compress',
  'rotate-pdf': 'rotate',
  'jpg-to-pdf': 'jpg2pdf',
  'pdf-to-jpg': 'pdf2jpg',
  'pdf-to-word': 'pdf2word',
  'pdf-to-excel': 'pdf2excel',
}

export default function ToolPageClient({
  slug,
  regTool,
  tool,
}: {
  slug: string
  regTool: RegistryTool | null
  tool: Tool | null
}) {
  const { lang } = useLang()
  const Component = COMPONENT_MAP[slug]

  const label = regTool
    ? (lang === 'fr' ? regTool.frName : regTool.name)
    : tool
      ? (lang === 'fr' ? tool.frLabel : tool.label)
      : slug

  // Hub components render their own full-screen shell.
  // Ny ToolSeoContent dia apetraka AO AMBANIN'ilay hub (tsy anatiny),
  // satria ny hub ihany no misy ny "minHeight: 100vh" fa tsy fixed/
  // overflow-hidden — ka mety tsara ny fametrahana content ao
  // ambaniny amin'ny document flow, tsy misy fifandiran'ny UI.
  if (Component && FULLSCREEN_SLUGS.has(slug)) {
    const extraProps = PDF_TAB_BY_SLUG[slug]
      ? { initialTab: PDF_TAB_BY_SLUG[slug] }
      : SMARTCALC_TOOL_BY_SLUG[slug]
        ? { initialTool: SMARTCALC_TOOL_BY_SLUG[slug] }
        : IMAGE_HUB_PROPS_BY_SLUG[slug]
          ? IMAGE_HUB_PROPS_BY_SLUG[slug]
          : {}
    return (
      <>
        <Component {...extraProps} />
        <ToolSeoContent regTool={regTool} tool={tool} slug={slug} />
      </>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC', paddingTop: 96, paddingBottom: 64 }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px' }}>
        <a href="/" style={{ fontSize: 13, color: '#64748B', textDecoration: 'none' }}>
          ← {lang === 'fr' ? 'Retour' : 'Back'}
        </a>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', margin: '12px 0 24px' }}>
          {label}
        </h1>

        {Component ? (
          <Component />
        ) : (
          <div style={{
            padding: 32, borderRadius: 14, background: '#fff',
            border: '1px dashed #E2E8F0', textAlign: 'center', color: '#64748B',
          }}>
            {lang === 'fr'
              ? "Cet outil n'est pas encore disponible — le composant n'a pas encore été créé."
              : "This tool isn't wired up yet — its component hasn't been built."}
            {regTool && (
              <div style={{ marginTop: 12, fontSize: 13 }}>
                {lang === 'fr' ? 'Catégorie' : 'Category'}: {regTool.category}
              </div>
            )}
          </div>
        )}
      </div>
      {RICH_CONTENT_SLUGS[slug] ? (
        <RichCalcContent contentKey={RICH_CONTENT_SLUGS[slug]} />
      ) : (
        <ToolSeoContent regTool={regTool} tool={tool} slug={slug} />
      )}
    </main>
  )
}
