# CHRONOS — tetikasa vaovao (manomboka amin'ny voalohany)

Ity dia tetikasa Next.js **tena vonona** — misy `package.json`,
`lib/`, `app/`, `components/` mifandray tsara — mifototra amin'ny asa
fizarazarana rehetra natao teo aloha (Calculators, PdfHub, NetworkHub,
CoreRegistry, sns.), fa efa "wired" tanteraka ny ampahany fototra mba
azo alefa amin'ny `npm run dev`.

## ✅ Izay MANDEHA amin'izao fotoana izao

- Pejy fototra (`/`) — hero, fikarohana, sivana category, tool grid
- Nav (Ctrl+K palette tsy mbola miasa, fa ny sisa eny)
- Fanovana teny EN⇄FR (mampiasa ny DICT feno, 53 KB, avy amin'ny
  CoreRegistry)
- Fanovana lava/maizina (dark/light) ao amin'ny Nav
- **7 calculator manontolo**: `/tools/bmi-calculator`,
  `/tools/water-intake-calculator`, `/tools/ideal-weight-calculator`,
  `/tools/mortgage-calculator`, `/tools/emi-calculator`,
  `/tools/calories-calculator`, `/tools/currency-converter`
- SEO metadata (title/description) isaky ny tool voarakitra ao anaty
  `registryTools`

## Ny fahadisoana 2 hitako sy novahako

1. **`app/tools/[slug]/page.tsx`** tao amin'ny zip voalohany dia
   kopian'ny pejy fototra fotsiny (diso port), ka na dia iray aza
   amin'ireo 7 tool teo ambony dia tsy ho niasa. Novako ho ilay
   version tao amin'ny `tool-slug-page.tsx` teo akaikiny (izay tsy
   nampiasaina, "draft" fotsiny).
2. **`app/tools/[slug]/ToolPageClient.tsx`** dia nampiasain'ilay pejy
   voalaza teo ambony fa **tsy nisy mihitsy** — midika izany fa na
   dia ilay `page.tsx` marina aza dia tsy ho vita ny `npm run build`.
   Noforoniko izy io izao, misy `COMPONENT_MAP` mifandray amin'ny 7
   component ao amin'ny `components/tools/`.

Nisy fahadisoana `slug` faharoa koa: ny `registryTools[].slug` dia
misy endrika `"/tools/xxx"` (miaraka amin'ny prefix), fa ny `TOOLS`
tsotra kosa `"/xxx"` fotsiny — ny `.replace('/', '')` tao amin'ny
version voalohany dia tsy nahavita nanaisotra ilay `"tools/"` manontolo.
Novaiko ho `.replace(/^\/tools\//, '')` mba tsy hisian'io olana io.

## Firafitry ny tetikasa

```
chronos-fresh/
├── package.json, next.config.js, tsconfig.json   → fototra Next.js
├── app/
│   ├── layout.tsx        → LangProvider + Nav manodidina ny pejy rehetra
│   ├── page.tsx           → pejy fototra (efa nisy, tsy nokasihina)
│   ├── globals.css        → CSS reset tsotra
│   ├── not-found.tsx      → pejy 404
│   └── tools/[slug]/
│       ├── page.tsx           → ✅ novaozina (bug fix #1 + #2)
│       └── ToolPageClient.tsx → ✅ vaovao (bug fix #2)
├── lib/
│   ├── hooks/useLang.tsx  → LangProvider/useLang, mampiasa ny DICT
│   │                         FENO (53 KB, EN+FR) avy amin'ny CoreRegistry
│   ├── tools.ts            → TOOLS (7 tool tsotra) + registryTools/
│   │                         registryCategories (63 tool FENO)
│   └── theme.ts            → COLORS, DARK, LIGHT
├── components/
│   ├── nav/Nav.tsx, NavClient.tsx   → efa nisy, tsy nokasihina
│   └── tools/*.tsx (7)               → efa nisy, tsy nokasihina
└── reference/    ← TSY ampiasain'ny app/ (tsy misy import mankany
                     aminy), fa ato daholo ny asa fizarazarana rehetra
                     natao teo aloha, ho entinao mandroso
    ├── Calculators/    (25 panel: TMortgage, TUnits, sns. + context)
    ├── PdfHub/         (5 tool miasa + 3 placeholder)
    ├── NetworkHub/     (12 tab, misy fanamarihana CORS proxy)
    ├── Converters/, DeveloperTools/, ImageTools/, AiTools/
    ├── AppShell/       (Nav/Search/CommandPalette/Toast/Ads legacy)
    └── Router/         (ChronosApp manontolo + route map)
```

## Ny roa rafitra ao amin'ny `lib/tools.ts` — antony

Efa hitantsika ela izay fa nisy rafitra roa mifanandrify: ny `TOOLS`
tsotra (efa nampiasain'ny `app/page.tsx`) sy ny `registryTools` be
(avy amin'ny monolith). **Tsy nesoriko ny iray na iray**, fa
navelako hiara-miasa:
- `TOOLS` = ilay 7 tool tena manana pejy MIASA — io no ampiasain'ny
  pejy fototra hanaovana ny grid
- `registryTools` = ny 63 tool rehetra (metadata SEO feno) — io no
  ampiasain'ny `page.tsx` hamoronana `generateStaticParams`/
  `generateMetadata`, na dia tsy misy component ho an'ny ankamaroany
  aza (dia hiseho ilay hoe "tsy mbola vonona" fotsiny, tsy 404)

Rehefa hanampy tool vaovao ianao (ohatra ny PDF Hub), dia manampy
`Component` iray ao anaty `COMPONENT_MAP` ao amin'ny
`ToolPageClient.tsx`, tsy mila mikasika ny `page.tsx` intsony.

## Ny tokony hatao manaraka (araka ny filaharana tsara indrindra)

1. **`npm install`** dia **`npm run dev`** — jereo raha mandeha ny
   `localhost:3000` sy ny 7 calculator
2. Manampy `SmartCalcHub` manontolo (25 panel): kopeo ny
   `reference/Calculators/legacy-source/*.js` ho ao anaty
   `components/calculators/*.tsx`, ampio `'use client'` + `export`,
   dia ampio `smartcalc-calculator` (na anarana hafa) ao anaty
   `COMPONENT_MAP`
3. Manampy `PdfHub`: kopeo ny `reference/PdfHub/legacy-source/*.js`
   ho ao anaty `components/pdf/*.tsx`, `npm install pdf-lib`, dia
   soloy ilay `import("https://cdn.jsdelivr.net/...")` amin'ny
   `import { PDFDocument } from "pdf-lib"` mahazatra
4. Manampy `NetworkHub`: kopeo toy izany ihany, fa jereo tsara ny
   fanamarihana momba ny `corsproxy.io`/`allorigins.win` ao amin'ny
   `reference/NetworkHub/README.md` — mila `/api/*` route raha
   production

Isaky ny dingana iray, `npm run dev` foana alohan'ny hanaovana ny
manaraka.
