'use client'

// ── components/converters/TConvertersHub.tsx ──────────────────
// 10 converter tabs — all in-browser, no dependencies.
// Tabs: Length, Weight, Area, Volume, Speed, Temperature,
//       Currency, RGB→HEX, HEX→RGB, Text Case

import React from 'react'
import { useLang } from '../../lib/hooks/useLang'
import { useDark } from '../../lib/hooks/useDark'
import { DARK, LIGHT } from '../../lib/theme'
import { BP } from '../../lib/breakpoints'

// ── Theme ──

// Loko miova arakaraka ny dark/light state — nalaina avy amin'ny
// DARK/LIGHT ao amin'ny lib/theme.ts (tsy hardcoded intsony).
function buildPalette(dark: boolean) {
  const T = dark ? DARK : LIGHT
  return {
    bg:      T.bg0,
    card:    T.bg1,
    border:  T.border,
    accent:  T.cyan,
    text:    T.txt,
    muted:   T.txt2,
    success: T.emerald,
    err:     T.red,
  }
}

// Context mizara ny C_T amin'ireo tab/component rehetra (Length, Weight,
// Currency, RGB↔HEX, sns.) — mameno ny tsy fahampian'ilay C_T hardcoded taloha.
const ConvThemeCtx = React.createContext(buildPalette(true))

// ── Tab config ──

const CONV_TABS = [
  { id: 'length',      icon: '📏', en: 'Length',      fr: 'Longueur',      enDesc: 'Convert between length units',           frDesc: 'Convertir entre unités de longueur' },
  { id: 'weight',      icon: '⚖️',  en: 'Weight',      fr: 'Poids',         enDesc: 'Convert between weight & mass units',    frDesc: 'Convertir entre unités de masse' },
  { id: 'area',        icon: '📐', en: 'Area',         fr: 'Superficie',    enDesc: 'Convert between area units',             frDesc: 'Convertir entre unités de surface' },
  { id: 'volume',      icon: '🧪', en: 'Volume',       fr: 'Volume',        enDesc: 'Convert between volume units',           frDesc: 'Convertir entre unités de volume' },
  { id: 'speed',       icon: '🚀', en: 'Speed',        fr: 'Vitesse',       enDesc: 'Convert between speed units',            frDesc: 'Convertir entre unités de vitesse' },
  { id: 'temperature', icon: '🌡️', en: 'Temperature',  fr: 'Température',   enDesc: 'Celsius, Fahrenheit, Kelvin',            frDesc: 'Celsius, Fahrenheit, Kelvin' },
  { id: 'currency',    icon: '💱', en: 'Currency',     fr: 'Devise',        enDesc: 'Convert between currencies (static)',    frDesc: 'Convertir entre devises (statique)' },
  { id: 'rgb2hex',     icon: '🎨', en: 'RGB → HEX',   fr: 'RGB → HEX',     enDesc: 'Convert RGB color to HEX code',          frDesc: 'Convertir couleur RGB en code HEX' },
  { id: 'hex2rgb',     icon: '🖌️', en: 'HEX → RGB',   fr: 'HEX → RGB',     enDesc: 'Convert HEX color code to RGB',          frDesc: 'Convertir code HEX en couleur RGB' },
  { id: 'textcase',    icon: '🔤', en: 'Text Case',    fr: 'Casse Texte',   enDesc: 'UPPER, lower, Title, Sentence case',     frDesc: 'MAJUSCULE, minuscule, Titre, Phrase' },
]

// ── RELATED_CONVERTERS — static map: tool id → related tool ids ──
// (internal linking ho an'ny SEO + mba hanampy ny mpampiasa hitady
// tool mifandray amin'izay eo am-pelatanany)
const RELATED_CONVERTERS: Record<string, string[]> = {
  length:      ['weight', 'area', 'volume'],
  weight:      ['length', 'volume', 'area'],
  area:        ['length', 'volume', 'weight'],
  volume:      ['weight', 'length', 'area'],
  speed:       ['length', 'temperature', 'weight'],
  temperature: ['speed', 'length', 'weight'],
  currency:    ['length', 'weight', 'volume'],
  rgb2hex:     ['hex2rgb', 'textcase'],
  hex2rgb:     ['rgb2hex', 'textcase'],
  textcase:    ['rgb2hex', 'hex2rgb'],
}

// ── Converter SEO content — content lalindalina isaky ny tab (what/how/
// examples/faq), mitovy endrika amin'ny NetworkSeoContent ao amin'ny
// NetworkHub.tsx, fa self-contained ato anatin'ity fichier ity ihany. ──

type SeoExample = { label: string; input: string; result: string }
type SeoFaqItem = { q: string; a: string }
type ConverterSeoEntry = {
  title: string; frTitle: string
  what: string; frWhat: string
  how: string; frHow: string
  examples: SeoExample[]
  faq: SeoFaqItem[]; frFaq: SeoFaqItem[]
}

const CONVERTER_SEO_CONTENT: Record<string, ConverterSeoEntry> = {
  length: {
    title: 'Length Converter — Meters, Feet, Miles & More',
    frTitle: 'Convertisseur de Longueur — Mètres, Pieds, Miles et Plus',
    what: 'A length converter changes a distance measurement from one unit to another — for example, converting meters to feet, or miles to kilometers — using fixed conversion ratios based on the metric and imperial systems.',
    frWhat: "Un convertisseur de longueur transforme une mesure de distance d'une unité à une autre — par exemple mètres en pieds, ou miles en kilomètres — grâce à des ratios de conversion fixes basés sur les systèmes métrique et impérial.",
    how: 'Enter a value, pick the unit you\'re converting from and the unit you want, and the tool multiplies your value by the ratio between the two units (both converted through meters as a common base) to give an instant result.',
    frHow: "Saisissez une valeur, choisissez l'unité de départ et l'unité voulue, et l'outil multiplie votre valeur par le ratio entre les deux unités (converties via le mètre comme base commune) pour un résultat instantané.",
    examples: [
      { label: 'Miles to kilometers', input: '5 mi', result: '8.05 km' },
      { label: 'Feet to meters', input: '10 ft', result: '3.05 m' },
      { label: 'Inches to centimeters', input: '12 in', result: '30.48 cm' },
    ],
    faq: [
      { q: 'How many kilometers are in a mile?', a: '1 mile equals approximately 1.609 kilometers.' },
      { q: 'Is a nautical mile the same as a regular mile?', a: 'No — a nautical mile (1,852 m) is longer than a statute mile (1,609.344 m). It\'s based on the Earth\'s circumference and used mainly in aviation and maritime navigation.' },
    ],
    frFaq: [
      { q: 'Combien de kilomètres y a-t-il dans un mile ?', a: '1 mile équivaut à environ 1,609 kilomètre.' },
      { q: 'Un mile nautique est-il identique à un mile classique ?', a: "Non — un mile nautique (1 852 m) est plus long qu'un mile terrestre (1 609,344 m). Il est basé sur la circonférence de la Terre et utilisé surtout en aviation et navigation maritime." },
    ],
  },
  weight: {
    title: 'Weight Converter — Kilograms, Pounds, Ounces & More',
    frTitle: 'Convertisseur de Poids — Kilogrammes, Livres, Onces et Plus',
    what: 'A weight (mass) converter translates a measurement between metric units like kilograms and grams and imperial/US units like pounds, ounces, and stone.',
    frWhat: "Un convertisseur de poids (masse) traduit une mesure entre les unités métriques comme le kilogramme et le gramme et les unités impériales/américaines comme la livre, l'once et le stone.",
    how: 'Type your value, select the source and target units, and the converter applies the fixed ratio between them (using kilograms as the common base) instantly.',
    frHow: "Saisissez votre valeur, sélectionnez l'unité de départ et celle d'arrivée, et le convertisseur applique instantanément le ratio fixe entre elles (en utilisant le kilogramme comme base commune).",
    examples: [
      { label: 'Pounds to kilograms', input: '150 lb', result: '68.04 kg' },
      { label: 'Kilograms to pounds', input: '10 kg', result: '22.05 lb' },
      { label: 'Ounces to grams', input: '8 oz', result: '226.8 g' },
    ],
    faq: [
      { q: 'How many pounds are in a kilogram?', a: '1 kilogram equals approximately 2.205 pounds.' },
      { q: 'What is a stone used for?', a: 'The stone (14 lb, ~6.35 kg) is a traditional unit still commonly used in the UK and Ireland, mainly for body weight.' },
    ],
    frFaq: [
      { q: 'Combien de livres y a-t-il dans un kilogramme ?', a: '1 kilogramme équivaut à environ 2,205 livres.' },
      { q: 'À quoi sert le stone ?', a: "Le stone (14 lb, environ 6,35 kg) est une unité traditionnelle encore courante au Royaume-Uni et en Irlande, surtout pour le poids corporel." },
    ],
  },
  area: {
    title: 'Area Converter — Square Meters, Acres, Hectares & More',
    frTitle: 'Convertisseur de Surface — Mètres Carrés, Acres, Hectares et Plus',
    what: 'An area converter changes a surface measurement — like square meters, acres, or hectares — from one unit into another, useful for land, real estate, and construction calculations.',
    frWhat: "Un convertisseur de surface transforme une mesure de superficie — mètres carrés, acres, hectares — d'une unité à une autre, utile pour le foncier, l'immobilier et les calculs de construction.",
    how: 'Enter the area value, choose the unit you have and the unit you need, and the tool converts both through a common base unit to give the equivalent area.',
    frHow: "Saisissez la valeur de surface, choisissez l'unité de départ et celle voulue, et l'outil convertit les deux via une unité de base commune pour obtenir la surface équivalente.",
    examples: [
      { label: 'Acres to hectares', input: '1 acre', result: '0.4047 ha' },
      { label: 'Square feet to square meters', input: '1,000 ft²', result: '92.9 m²' },
      { label: 'Hectares to square meters', input: '2 ha', result: '20,000 m²' },
    ],
    faq: [
      { q: 'How big is one hectare?', a: 'One hectare equals 10,000 square meters, or about 2.47 acres.' },
      { q: 'Is an acre bigger than a hectare?', a: 'No — one hectare is larger than one acre. 1 hectare ≈ 2.47 acres.' },
    ],
    frFaq: [
      { q: "Quelle est la taille d'un hectare ?", a: 'Un hectare équivaut à 10 000 mètres carrés, soit environ 2,47 acres.' },
      { q: "Un acre est-il plus grand qu'un hectare ?", a: 'Non — un hectare est plus grand qu\'un acre. 1 hectare ≈ 2,47 acres.' },
    ],
  },
  volume: {
    title: 'Volume Converter — Liters, Gallons, Cups & More',
    frTitle: 'Convertisseur de Volume — Litres, Gallons, Tasses et Plus',
    what: 'A volume converter translates liquid or dry volume measurements between metric units (liters, milliliters) and US/imperial units (gallons, cups, fluid ounces).',
    frWhat: "Un convertisseur de volume traduit des mesures de volume liquide ou sec entre les unités métriques (litres, millilitres) et les unités américaines/impériales (gallons, tasses, onces liquides).",
    how: 'Enter your value, pick the source and target units, and the tool applies the exact ratio between them (via liters as the base) to give the converted amount.',
    frHow: "Saisissez votre valeur, choisissez l'unité de départ et d'arrivée, et l'outil applique le ratio exact entre elles (via le litre comme base) pour donner le montant converti.",
    examples: [
      { label: 'Gallons to liters', input: '1 gal', result: '3.785 L' },
      { label: 'Cups to milliliters', input: '2 cups', result: '473.2 ml' },
      { label: 'Liters to fluid ounces', input: '1 L', result: '33.81 fl oz' },
    ],
    faq: [
      { q: 'Is a US gallon the same as a UK gallon?', a: 'No — a US gallon (3.785 L) is smaller than a UK/imperial gallon (4.546 L).' },
      { q: 'How many cups are in a liter?', a: 'One liter is approximately 4.23 US cups.' },
    ],
    frFaq: [
      { q: 'Un gallon américain est-il identique à un gallon britannique ?', a: 'Non — un gallon américain (3,785 L) est plus petit qu\'un gallon impérial britannique (4,546 L).' },
      { q: 'Combien de tasses y a-t-il dans un litre ?', a: 'Un litre équivaut à environ 4,23 tasses américaines.' },
    ],
  },
  speed: {
    title: 'Speed Converter — km/h, mph, m/s & Knots',
    frTitle: 'Convertisseur de Vitesse — km/h, mph, m/s et Nœuds',
    what: 'A speed converter changes a rate of movement — like kilometers per hour, miles per hour, meters per second, or knots — from one unit to another.',
    frWhat: "Un convertisseur de vitesse transforme une vitesse de déplacement — kilomètres par heure, miles par heure, mètres par seconde ou nœuds — d'une unité à une autre.",
    how: 'Enter the speed value, choose the units to convert from and to, and the tool scales it using the fixed ratio between the two units (via m/s as the common base).',
    frHow: "Saisissez la vitesse, choisissez les unités de départ et d'arrivée, et l'outil l'ajuste selon le ratio fixe entre les deux unités (via le m/s comme base commune).",
    examples: [
      { label: 'km/h to mph', input: '100 km/h', result: '62.14 mph' },
      { label: 'mph to km/h', input: '60 mph', result: '96.56 km/h' },
      { label: 'Knots to km/h', input: '20 kn', result: '37.04 km/h' },
    ],
    faq: [
      { q: 'What is a knot used for?', a: 'A knot (1 nautical mile per hour) is the standard speed unit in maritime and aviation navigation.' },
      { q: 'How fast is 100 km/h in mph?', a: '100 km/h is approximately 62.14 mph.' },
    ],
    frFaq: [
      { q: 'À quoi sert le nœud ?', a: 'Le nœud (1 mile nautique par heure) est l\'unité de vitesse standard en navigation maritime et aérienne.' },
      { q: '100 km/h équivaut à combien de mph ?', a: '100 km/h équivaut à environ 62,14 mph.' },
    ],
  },
  temperature: {
    title: 'Temperature Converter — Celsius, Fahrenheit, Kelvin',
    frTitle: 'Convertisseur de Température — Celsius, Fahrenheit, Kelvin',
    what: 'A temperature converter changes a reading between Celsius, Fahrenheit, and Kelvin — the three most common temperature scales worldwide.',
    frWhat: "Un convertisseur de température transforme une valeur entre Celsius, Fahrenheit et Kelvin — les trois échelles de température les plus utilisées dans le monde.",
    how: 'Enter a temperature value and pick the scale to convert to. Unlike length or weight, temperature scales use different formulas (not simple multiplication) because their zero points differ.',
    frHow: "Saisissez une valeur de température et choisissez l'échelle voulue. Contrairement à la longueur ou au poids, les échelles de température utilisent des formules différentes (pas une simple multiplication) car leurs points zéro diffèrent.",
    examples: [
      { label: 'Celsius to Fahrenheit', input: '0°C', result: '32°F' },
      { label: 'Fahrenheit to Celsius', input: '98.6°F', result: '37°C' },
      { label: 'Celsius to Kelvin', input: '25°C', result: '298.15 K' },
    ],
    faq: [
      { q: 'What is 0°C in Fahrenheit?', a: '0°C (water\'s freezing point) equals 32°F.' },
      { q: 'Why does Kelvin have no negative values?', a: 'Kelvin starts at absolute zero (-273.15°C), the coldest possible temperature, so it never goes negative.' },
    ],
    frFaq: [
      { q: 'Que vaut 0°C en Fahrenheit ?', a: "0°C (point de congélation de l'eau) équivaut à 32°F." },
      { q: "Pourquoi le Kelvin n'a-t-il pas de valeurs négatives ?", a: "Le Kelvin commence au zéro absolu (-273,15°C), la température la plus froide possible, donc il ne descend jamais sous zéro." },
    ],
  },
  currency: {
    title: 'Currency Converter — Convert Between World Currencies',
    frTitle: 'Convertisseur de Devises — Convertir Entre Devises Mondiales',
    what: 'A currency converter estimates how much one currency is worth in another — for example, how many euros a given amount of US dollars is worth — based on exchange rates.',
    frWhat: "Un convertisseur de devises estime la valeur d'une devise dans une autre — par exemple combien d'euros valent un montant donné en dollars américains — sur la base des taux de change.",
    how: 'Enter an amount, pick the currency you have and the one you want, and the converter applies the exchange rate between them. Rates used here are static reference values, not live market data.',
    frHow: "Saisissez un montant, choisissez la devise de départ et celle voulue, et le convertisseur applique le taux de change entre elles. Les taux utilisés ici sont des valeurs de référence statiques, pas des données de marché en direct.",
    examples: [
      { label: 'USD to EUR', input: '$100', result: '≈ €92' },
      { label: 'EUR to USD', input: '€50', result: '≈ $54' },
    ],
    faq: [
      { q: 'Are these exchange rates live?', a: 'No — this tool uses static reference rates for quick estimates, not real-time market rates. For transactions, check a live financial source.' },
      { q: 'Why do exchange rates change?', a: 'Exchange rates move constantly based on supply and demand, interest rates, inflation, and economic and political events in each country.' },
    ],
    frFaq: [
      { q: 'Ces taux de change sont-ils en direct ?', a: "Non — cet outil utilise des taux de référence statiques pour des estimations rapides, pas des taux de marché en temps réel. Pour des transactions, consultez une source financière en direct." },
      { q: 'Pourquoi les taux de change varient-ils ?', a: "Les taux de change évoluent constamment selon l'offre et la demande, les taux d'intérêt, l'inflation et les événements économiques et politiques de chaque pays." },
    ],
  },
  rgb2hex: {
    title: 'RGB to HEX Converter — Color Code Converter',
    frTitle: 'Convertisseur RGB en HEX — Convertisseur de Code Couleur',
    what: 'This tool converts an RGB color value (Red, Green, Blue, each 0–255) into its equivalent HEX color code, the format used in CSS, HTML, and design tools.',
    frWhat: "Cet outil convertit une valeur de couleur RGB (Rouge, Vert, Bleu, chacun de 0 à 255) en son code couleur HEX équivalent, le format utilisé en CSS, HTML et dans les outils de design.",
    how: 'Enter values for Red, Green, and Blue (0–255 each), and the tool converts each number to its two-digit hexadecimal equivalent and combines them into a single HEX code.',
    frHow: "Saisissez les valeurs de Rouge, Vert et Bleu (0 à 255 chacune), et l'outil convertit chaque nombre en son équivalent hexadécimal à deux chiffres puis les combine en un seul code HEX.",
    examples: [
      { label: 'Pure red', input: 'rgb(255, 0, 0)', result: '#FF0000' },
      { label: 'Sky blue', input: 'rgb(135, 206, 235)', result: '#87CEEB' },
      { label: 'Black', input: 'rgb(0, 0, 0)', result: '#000000' },
    ],
    faq: [
      { q: 'Why does HEX use 6 characters?', a: 'Each pair of characters represents one of the Red, Green, and Blue channels in hexadecimal (00–FF), so 3 channels × 2 digits = 6 characters.' },
      { q: 'What is the RGB range?', a: 'Each of the Red, Green, and Blue values ranges from 0 (none) to 255 (full intensity).' },
    ],
    frFaq: [
      { q: 'Pourquoi le HEX utilise-t-il 6 caractères ?', a: "Chaque paire de caractères représente un des canaux Rouge, Vert ou Bleu en hexadécimal (00 à FF), donc 3 canaux × 2 chiffres = 6 caractères." },
      { q: 'Quelle est la plage des valeurs RGB ?', a: 'Chaque valeur de Rouge, Vert et Bleu va de 0 (aucune) à 255 (intensité maximale).' },
    ],
  },
  hex2rgb: {
    title: 'HEX to RGB Converter — Color Code Converter',
    frTitle: 'Convertisseur HEX en RGB — Convertisseur de Code Couleur',
    what: 'This tool converts a HEX color code (like #FF6347) into its equivalent RGB values (Red, Green, Blue), which many design and code tools require separately.',
    frWhat: "Cet outil convertit un code couleur HEX (comme #FF6347) en ses valeurs RGB équivalentes (Rouge, Vert, Bleu), que de nombreux outils de design et de code exigent séparément.",
    how: 'Enter a 6-digit HEX code, and the tool splits it into three pairs of digits, converting each pair from hexadecimal back to a decimal value between 0 and 255.',
    frHow: "Saisissez un code HEX à 6 chiffres, et l'outil le divise en trois paires de chiffres, convertissant chaque paire de l'hexadécimal vers une valeur décimale entre 0 et 255.",
    examples: [
      { label: 'Tomato', input: '#FF6347', result: 'rgb(255, 99, 71)' },
      { label: 'White', input: '#FFFFFF', result: 'rgb(255, 255, 255)' },
      { label: 'Navy', input: '#000080', result: 'rgb(0, 0, 128)' },
    ],
    faq: [
      { q: 'Does HEX need to start with #?', a: 'The # is a common convention in CSS/HTML, but the underlying code is just the 6 hexadecimal digits.' },
      { q: 'Can HEX codes be 3 digits?', a: 'Yes — a shorthand HEX like #F00 expands to #FF0000 by doubling each digit.' },
    ],
    frFaq: [
      { q: 'Le HEX doit-il commencer par # ?', a: "Le # est une convention courante en CSS/HTML, mais le code sous-jacent est simplement les 6 chiffres hexadécimaux." },
      { q: 'Les codes HEX peuvent-ils avoir 3 chiffres ?', a: 'Oui — un HEX abrégé comme #F00 se développe en #FF0000 en doublant chaque chiffre.' },
    ],
  },
  textcase: {
    title: 'Text Case Converter — UPPERCASE, lowercase, camelCase & More',
    frTitle: 'Convertisseur de Casse de Texte — MAJUSCULE, minuscule, camelCase et Plus',
    what: 'A text case converter reformats text between different capitalization styles — UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and more — commonly needed in writing and programming.',
    frWhat: "Un convertisseur de casse de texte reformate un texte selon différents styles de capitalisation — MAJUSCULE, minuscule, Titre, camelCase, snake_case, kebab-case et plus — souvent nécessaires en rédaction et en programmation.",
    how: 'Type or paste your text, choose the case format you need, and the tool instantly transforms every word according to that format\'s rules (capitalization, spacing, and separators).',
    frHow: "Saisissez ou collez votre texte, choisissez le format de casse voulu, et l'outil transforme instantanément chaque mot selon les règles de ce format (capitalisation, espacement et séparateurs).",
    examples: [
      { label: 'Title Case', input: 'hello world', result: 'Hello World' },
      { label: 'camelCase', input: 'hello world', result: 'helloWorld' },
      { label: 'snake_case', input: 'Hello World', result: 'hello_world' },
    ],
    faq: [
      { q: 'What is camelCase used for?', a: 'camelCase is a common naming convention in programming for variables and function names, e.g. firstName.' },
      { q: 'What\'s the difference between snake_case and kebab-case?', a: 'snake_case uses underscores between words (my_variable), while kebab-case uses hyphens (my-variable) — kebab-case is common in URLs and CSS classes.' },
    ],
    frFaq: [
      { q: 'À quoi sert le camelCase ?', a: 'Le camelCase est une convention de nommage courante en programmation pour les variables et fonctions, ex. firstName.' },
      { q: 'Quelle est la différence entre snake_case et kebab-case ?', a: 'Le snake_case utilise des underscores entre les mots (ma_variable), tandis que le kebab-case utilise des tirets (ma-variable) — le kebab-case est courant dans les URLs et classes CSS.' },
    ],
  },
}

function ConvFaqItem({ q, a, last }: { q: string; a: string; last?: boolean }) {
  const C_T = React.useContext(ConvThemeCtx)
  const [open, setOpen] = React.useState(false)
  return (
    <div style={{ borderBottom: last ? 'none' : `1px solid ${C_T.border}` }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 12, padding: '14px 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontFamily: "'Inter','Segoe UI',sans-serif", fontWeight: 700, fontSize: 13, color: C_T.text }}>{q}</span>
        <span style={{ color: C_T.muted, fontSize: 14, flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>▾</span>
      </button>
      {open && (
        <p style={{ fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: 13, color: C_T.muted, lineHeight: 1.7, margin: '0 0 16px' }}>{a}</p>
      )}
    </div>
  )
}

function ConverterSeoContent({ toolId, lang }: { toolId: string; lang: string }) {
  const C_T = React.useContext(ConvThemeCtx)
  const content = CONVERTER_SEO_CONTENT[toolId]
  if (!content) return null
  const isFr = lang === 'fr'

  return (
    <article style={{ marginTop: 24, padding: '24px 20px', background: C_T.card, border: `1px solid ${C_T.border}`, borderRadius: 14 }}>
      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, color: C_T.text, marginBottom: 10, marginTop: 4, lineHeight: 1.3 }}>
        {isFr ? "Qu'est-ce que c'est ?" : 'What is it?'}
      </h2>
      <p style={{ fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: 13.5, color: C_T.muted, lineHeight: 1.75, margin: 0 }}>
        {isFr ? content.frWhat : content.what}
      </p>

      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, color: C_T.text, marginBottom: 10, marginTop: 26, lineHeight: 1.3 }}>
        {isFr ? 'Comment ça marche' : 'How it works'}
      </h2>
      <p style={{ fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: 13.5, color: C_T.muted, lineHeight: 1.75, margin: 0 }}>
        {isFr ? content.frHow : content.how}
      </p>

      {content.examples.length > 0 && (
        <>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, color: C_T.text, marginBottom: 10, marginTop: 26, lineHeight: 1.3 }}>
            {isFr ? 'Exemples' : 'Examples'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {content.examples.map((ex, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px', background: C_T.bg, borderRadius: 9, border: `1px solid ${C_T.border}` }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: C_T.accent, fontWeight: 700, flexShrink: 0, paddingTop: 2 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 12, color: C_T.text, display: 'block', marginBottom: 2 }}>
                    {ex.label}
                  </span>
                  <span style={{ fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: 12, color: C_T.muted }}>
                    <code style={{ fontFamily: "'JetBrains Mono',monospace", color: C_T.muted, fontSize: 11 }}>{ex.input}</code>
                    <span style={{ margin: '0 6px', color: C_T.muted }}>→</span>
                    <span style={{ color: C_T.success, fontWeight: 500 }}>{ex.result}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {(isFr ? content.frFaq : content.faq).length > 0 && (
        <>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, color: C_T.text, marginBottom: 10, marginTop: 26, lineHeight: 1.3 }}>
            {isFr ? 'Questions fréquentes' : 'Frequently asked questions'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(isFr ? content.frFaq : content.faq).map((item, i, arr) => (
              <ConvFaqItem key={i} q={item.q} a={item.a} last={i === arr.length - 1} />
            ))}
          </div>
        </>
      )}
    </article>
  )
}

// ── RelatedConverters — internal-linking block ("You might also like") ──
function RelatedConverters({ currentId, lang, onSelect }: { currentId: string; lang: string; onSelect: (id: string) => void }) {
  const C_T = React.useContext(ConvThemeCtx)
  const relatedIds = RELATED_CONVERTERS[currentId] || []
  const related = relatedIds.map(id => CONV_TABS.find(t => t.id === id)).filter(Boolean) as typeof CONV_TABS
  if (related.length === 0) return null

  return (
    <div style={{ marginTop: 24, padding: '20px', background: C_T.card, border: `1px solid ${C_T.border}`, borderRadius: 14 }}>
      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: C_T.text, marginBottom: 14 }}>
        {lang === 'fr' ? 'Voir aussi' : 'You might also like'}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {related.map(t => (
          <button key={t.id} onClick={() => onSelect(t.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
              background: C_T.bg, border: `1px solid ${C_T.border}`, borderRadius: 10,
              color: C_T.text, fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'border-color .15s' }}>
            <span>{t.icon}</span>
            <span>{lang === 'fr' ? t.fr : t.en}</span>
            <span style={{ color: C_T.accent }}>→</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Shared helpers ──

const inp = (C_T: ReturnType<typeof buildPalette>, extra: React.CSSProperties = {}): React.CSSProperties => ({
  width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 15,
  border: `1px solid ${C_T.border}`, background: C_T.bg, color: C_T.text,
  outline: 'none', boxSizing: 'border-box', fontFamily: "'Inter','Segoe UI',sans-serif",
  ...extra,
})

const sel = (C_T: ReturnType<typeof buildPalette>, extra: React.CSSProperties = {}): React.CSSProperties => ({
  ...inp(C_T), cursor: 'pointer', ...extra,
})

function Label({ children }: { children: React.ReactNode }) {
  const C_T = React.useContext(ConvThemeCtx)
  return (
    <div style={{ fontSize: 12, fontWeight: 700, color: C_T.muted, textTransform: 'uppercase',
      letterSpacing: '0.06em', marginBottom: 6 }}>
      {children}
    </div>
  )
}

function ResultBox({ value, unit, extra }: { value: string; unit: string; extra?: string }) {
  const C_T = React.useContext(ConvThemeCtx)
  return (
    <div style={{ background: `${C_T.accent}10`, border: `2px solid ${C_T.accent}`, borderRadius: 14,
      padding: '20px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 36, fontWeight: 800, color: C_T.accent, fontFamily: "'Space Grotesk',sans-serif" }}>
        {value} <span style={{ fontSize: 20 }}>{unit}</span>
      </div>
      {extra && <div style={{ fontSize: 13, color: C_T.muted, marginTop: 6 }}>{extra}</div>}
      <button onClick={() => navigator.clipboard?.writeText(`${value} ${unit}`)}
        style={{ marginTop: 14, padding: '7px 18px', background: C_T.accent, color: '#fff',
          border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
        📋 Copy
      </button>
    </div>
  )
}

function SwapBtn({ onClick }: { onClick: () => void }) {
  const C_T = React.useContext(ConvThemeCtx)
  return (
    <button onClick={onClick} style={{ width: 40, height: 40, borderRadius: '50%',
      border: `1px solid ${C_T.border}`, background: C_T.card, color: C_T.text,
      cursor: 'pointer', fontSize: 18, flexShrink: 0, alignSelf: 'flex-end', marginBottom: 2 }}>
      ⇄
    </button>
  )
}

// ── Generic unit converter ──

function UnitConverter({
  units, convert, inputLabel, fromLabel, toLabel,
}: {
  units: { value: string; label: string }[]
  convert: (val: number, from: string, to: string) => number
  inputLabel: string
  fromLabel: string
  toLabel: string
}) {
  const C_T = React.useContext(ConvThemeCtx)
  const [val, setVal] = React.useState('1')
  const [from, setFrom] = React.useState(units[0].value)
  const [to, setTo]     = React.useState(units[1].value)

  const n = parseFloat(val)
  const result = !isNaN(n) ? convert(n, from, to) : null
  const fmt = (v: number) => parseFloat(v.toPrecision(8)).toLocaleString('en', { maximumFractionDigits: 8 })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{inputLabel}</Label>
        <input type="number" value={val} onChange={e => setVal(e.target.value)} style={inp(C_T)} />
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <Label>{fromLabel}</Label>
          <select value={from} onChange={e => setFrom(e.target.value)} style={sel(C_T)}>
            {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
        <SwapBtn onClick={() => { setFrom(to); setTo(from) }} />
        <div style={{ flex: 1 }}>
          <Label>{toLabel}</Label>
          <select value={to} onChange={e => setTo(e.target.value)} style={sel(C_T)}>
            {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
      </div>
      {result !== null && (
        <ResultBox
          value={fmt(result)}
          unit={units.find(u => u.value === to)?.label ?? to}
          extra={`${val} ${units.find(u => u.value === from)?.label} = ${fmt(result)} ${units.find(u => u.value === to)?.label}`}
        />
      )}
    </div>
  )
}

// ── Length ──

function LengthTab({ lang }: { lang: string }) {
  const units = [
    { value: 'm',   label: 'Meter (m)' },
    { value: 'km',  label: 'Kilometer (km)' },
    { value: 'cm',  label: 'Centimeter (cm)' },
    { value: 'mm',  label: 'Millimeter (mm)' },
    { value: 'mi',  label: 'Mile (mi)' },
    { value: 'yd',  label: 'Yard (yd)' },
    { value: 'ft',  label: 'Foot (ft)' },
    { value: 'in',  label: 'Inch (in)' },
    { value: 'nmi', label: 'Nautical Mile (nmi)' },
  ]
  const TO_M: Record<string, number> = { m:1, km:1000, cm:0.01, mm:0.001, mi:1609.344, yd:0.9144, ft:0.3048, in:0.0254, nmi:1852 }
  const convert = (v: number, f: string, t: string) => v * TO_M[f] / TO_M[t]
  return <UnitConverter units={units} convert={convert}
    inputLabel={lang === 'fr' ? 'Valeur' : 'Value'}
    fromLabel={lang === 'fr' ? 'De' : 'From'}
    toLabel={lang === 'fr' ? 'Vers' : 'To'} />
}

// ── Weight ──

function WeightTab({ lang }: { lang: string }) {
  const units = [
    { value: 'kg',  label: 'Kilogram (kg)' },
    { value: 'g',   label: 'Gram (g)' },
    { value: 'mg',  label: 'Milligram (mg)' },
    { value: 'lb',  label: 'Pound (lb)' },
    { value: 'oz',  label: 'Ounce (oz)' },
    { value: 't',   label: 'Metric Ton (t)' },
    { value: 'st',  label: 'Stone (st)' },
  ]
  const TO_KG: Record<string, number> = { kg:1, g:0.001, mg:0.000001, lb:0.453592, oz:0.0283495, t:1000, st:6.35029 }
  const convert = (v: number, f: string, t: string) => v * TO_KG[f] / TO_KG[t]
  return <UnitConverter units={units} convert={convert}
    inputLabel={lang === 'fr' ? 'Valeur' : 'Value'}
    fromLabel={lang === 'fr' ? 'De' : 'From'}
    toLabel={lang === 'fr' ? 'Vers' : 'To'} />
}

// ── Area ──

function AreaTab({ lang }: { lang: string }) {
  const units = [
    { value: 'm2',   label: 'Square Meter (m²)' },
    { value: 'km2',  label: 'Square Kilometer (km²)' },
    { value: 'cm2',  label: 'Square Centimeter (cm²)' },
    { value: 'ft2',  label: 'Square Foot (ft²)' },
    { value: 'in2',  label: 'Square Inch (in²)' },
    { value: 'mi2',  label: 'Square Mile (mi²)' },
    { value: 'ac',   label: 'Acre (ac)' },
    { value: 'ha',   label: 'Hectare (ha)' },
  ]
  const TO_M2: Record<string, number> = { m2:1, km2:1e6, cm2:0.0001, ft2:0.092903, in2:0.00064516, mi2:2589988.11, ac:4046.86, ha:10000 }
  const convert = (v: number, f: string, t: string) => v * TO_M2[f] / TO_M2[t]
  return <UnitConverter units={units} convert={convert}
    inputLabel={lang === 'fr' ? 'Valeur' : 'Value'}
    fromLabel={lang === 'fr' ? 'De' : 'From'}
    toLabel={lang === 'fr' ? 'Vers' : 'To'} />
}

// ── Volume ──

function VolumeTab({ lang }: { lang: string }) {
  const units = [
    { value: 'l',    label: 'Liter (L)' },
    { value: 'ml',   label: 'Milliliter (mL)' },
    { value: 'm3',   label: 'Cubic Meter (m³)' },
    { value: 'cm3',  label: 'Cubic Centimeter (cm³)' },
    { value: 'gal',  label: 'Gallon (US)' },
    { value: 'qt',   label: 'Quart (US)' },
    { value: 'pt',   label: 'Pint (US)' },
    { value: 'floz', label: 'Fluid Ounce (fl oz)' },
    { value: 'cup',  label: 'Cup (US)' },
    { value: 'tbsp', label: 'Tablespoon' },
    { value: 'tsp',  label: 'Teaspoon' },
  ]
  const TO_L: Record<string, number> = { l:1, ml:0.001, m3:1000, cm3:0.001, gal:3.78541, qt:0.946353, pt:0.473176, floz:0.0295735, cup:0.236588, tbsp:0.0147868, tsp:0.00492892 }
  const convert = (v: number, f: string, t: string) => v * TO_L[f] / TO_L[t]
  return <UnitConverter units={units} convert={convert}
    inputLabel={lang === 'fr' ? 'Valeur' : 'Value'}
    fromLabel={lang === 'fr' ? 'De' : 'From'}
    toLabel={lang === 'fr' ? 'Vers' : 'To'} />
}

// ── Speed ──

function SpeedTab({ lang }: { lang: string }) {
  const units = [
    { value: 'ms',   label: 'm/s' },
    { value: 'kmh',  label: 'km/h' },
    { value: 'mph',  label: 'mph' },
    { value: 'kt',   label: 'Knot (kt)' },
    { value: 'fps',  label: 'ft/s' },
    { value: 'mach', label: 'Mach' },
  ]
  const TO_MS: Record<string, number> = { ms:1, kmh:0.277778, mph:0.44704, kt:0.514444, fps:0.3048, mach:340.29 }
  const convert = (v: number, f: string, t: string) => v * TO_MS[f] / TO_MS[t]
  return <UnitConverter units={units} convert={convert}
    inputLabel={lang === 'fr' ? 'Valeur' : 'Value'}
    fromLabel={lang === 'fr' ? 'De' : 'From'}
    toLabel={lang === 'fr' ? 'Vers' : 'To'} />
}

// ── Temperature — special (non-linear) ──

function TemperatureTab({ lang }: { lang: string }) {
  const C_T = React.useContext(ConvThemeCtx)
  const [val, setVal] = React.useState('0')
  const [from, setFrom] = React.useState('c')
  const [to, setTo]     = React.useState('f')

  const toC = (v: number, u: string) => u === 'c' ? v : u === 'f' ? (v - 32) * 5/9 : v - 273.15
  const fromC = (v: number, u: string) => u === 'c' ? v : u === 'f' ? v * 9/5 + 32 : v + 273.15
  const convert = (v: number, f: string, t: string) => fromC(toC(v, f), t)

  const units = [
    { value: 'c', label: 'Celsius (°C)' },
    { value: 'f', label: 'Fahrenheit (°F)' },
    { value: 'k', label: 'Kelvin (K)' },
  ]
  const n = parseFloat(val)
  const result = !isNaN(n) ? convert(n, from, to) : null
  const fmt = (v: number) => parseFloat(v.toFixed(4)).toString()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{lang === 'fr' ? 'Valeur' : 'Value'}</Label>
        <input type="number" value={val} onChange={e => setVal(e.target.value)} style={inp(C_T)} />
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <Label>{lang === 'fr' ? 'De' : 'From'}</Label>
          <select value={from} onChange={e => setFrom(e.target.value)} style={sel(C_T)}>
            {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
        <SwapBtn onClick={() => { setFrom(to); setTo(from) }} />
        <div style={{ flex: 1 }}>
          <Label>{lang === 'fr' ? 'Vers' : 'To'}</Label>
          <select value={to} onChange={e => setTo(e.target.value)} style={sel(C_T)}>
            {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
      </div>
      {result !== null && (
        <ResultBox
          value={fmt(result)}
          unit={units.find(u => u.value === to)?.label ?? ''}
          extra={`${val} ${units.find(u => u.value === from)?.label} = ${fmt(result)} ${units.find(u => u.value === to)?.label}`}
        />
      )}
    </div>
  )
}

// ── Currency ──

function CurrencyTab({ lang }: { lang: string }) {
  const C_T = React.useContext(ConvThemeCtx)
  const CURRENCIES = [
    { code: 'USD', label: 'USD — US Dollar' },
    { code: 'EUR', label: 'EUR — Euro' },
    { code: 'GBP', label: 'GBP — British Pound' },
    { code: 'MGA', label: 'MGA — Ariary' },
    { code: 'JPY', label: 'JPY — Japanese Yen' },
    { code: 'CAD', label: 'CAD — Canadian Dollar' },
    { code: 'CHF', label: 'CHF — Swiss Franc' },
    { code: 'AUD', label: 'AUD — Australian Dollar' },
    { code: 'CNY', label: 'CNY — Chinese Yuan' },
    { code: 'INR', label: 'INR — Indian Rupee' },
    { code: 'BRL', label: 'BRL — Brazilian Real' },
    { code: 'ZAR', label: 'ZAR — South African Rand' },
    { code: 'MXN', label: 'MXN — Mexican Peso' },
    { code: 'SGD', label: 'SGD — Singapore Dollar' },
    { code: 'KRW', label: 'KRW — South Korean Won' },
  ]
  const RATES: Record<string, number> = {
    USD:1, EUR:0.92, GBP:0.79, MGA:4500, JPY:149.5, CAD:1.36,
    CHF:0.89, AUD:1.53, CNY:7.24, INR:83.1, BRL:5.02, ZAR:18.6,
    MXN:17.1, SGD:1.34, KRW:1325,
  }
  const [amount, setAmount] = React.useState('1')
  const [from, setFrom]     = React.useState('USD')
  const [to, setTo]         = React.useState('EUR')

  const n = parseFloat(amount)
  const result = !isNaN(n) && RATES[from] && RATES[to]
    ? Math.round(n / RATES[from] * RATES[to] * 10000) / 10000
    : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: `${C_T.muted}15`, border: `1px solid ${C_T.border}`, borderRadius: 10,
        padding: '10px 14px', fontSize: 13, color: C_T.muted }}>
        ℹ️ {lang === 'fr' ? 'Taux statiques — mise à jour manuelle.' : 'Static rates — updated manually.'}
      </div>
      <div>
        <Label>{lang === 'fr' ? 'Montant' : 'Amount'}</Label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={inp(C_T)} />
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <Label>{lang === 'fr' ? 'De' : 'From'}</Label>
          <select value={from} onChange={e => setFrom(e.target.value)} style={sel(C_T)}>
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
          </select>
        </div>
        <SwapBtn onClick={() => { setFrom(to); setTo(from) }} />
        <div style={{ flex: 1 }}>
          <Label>{lang === 'fr' ? 'Vers' : 'To'}</Label>
          <select value={to} onChange={e => setTo(e.target.value)} style={sel(C_T)}>
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
          </select>
        </div>
      </div>
      {result !== null && (
        <ResultBox
          value={result.toLocaleString()}
          unit={to}
          extra={`1 ${from} = ${(RATES[to]/RATES[from]).toFixed(4)} ${to}`}
        />
      )}
    </div>
  )
}

// ── RGB → HEX ──

function RgbToHexTab({ lang }: { lang: string }) {
  const C_T = React.useContext(ConvThemeCtx)
  const [r, setR] = React.useState('255')
  const [g, setG] = React.useState('99')
  const [b, setB] = React.useState('71')

  const clamp = (v: string) => Math.min(255, Math.max(0, parseInt(v) || 0))
  const toHex = (v: number) => v.toString(16).padStart(2, '0').toUpperCase()
  const hex = `#${toHex(clamp(r))}${toHex(clamp(g))}${toHex(clamp(b))}`

  const sliderStyle = (color: string): React.CSSProperties => ({
    width: '100%', accentColor: color, cursor: 'pointer',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[
        { label: 'R — Red',   val: r, set: setR, color: C_T.err, max: 255 },
        { label: 'G — Green', val: g, set: setG, color: C_T.success, max: 255 },
        { label: 'B — Blue',  val: b, set: setB, color: '#3B82F6', max: 255 },
      ].map(({ label, val, set, color, max }) => (
        <div key={label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <Label>{label}</Label>
            <span style={{ fontSize: 13, color: C_T.muted }}>{clamp(val)}</span>
          </div>
          <input type="range" min={0} max={max} value={clamp(val)}
            onChange={e => set(e.target.value)} style={sliderStyle(color)} />
          <input type="number" min={0} max={max} value={val}
            onChange={e => set(e.target.value)} style={inp(C_T, { marginTop: 6, width: 90 })} />
        </div>
      ))}
      <div style={{ background: `${C_T.accent}10`, border: `2px solid ${C_T.accent}`, borderRadius: 14,
        padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: 12, background: hex, margin: '0 auto 14px',
          border: `2px solid ${C_T.border}` }} />
        <div style={{ fontSize: 32, fontWeight: 800, color: C_T.accent, fontFamily: "'Space Grotesk',sans-serif" }}>
          {hex}
        </div>
        <div style={{ fontSize: 13, color: C_T.muted, marginTop: 4 }}>
          rgb({clamp(r)}, {clamp(g)}, {clamp(b)})
        </div>
        <button onClick={() => navigator.clipboard?.writeText(hex)}
          style={{ marginTop: 14, padding: '7px 18px', background: C_T.accent, color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          📋 {lang === 'fr' ? 'Copier HEX' : 'Copy HEX'}
        </button>
      </div>
    </div>
  )
}

// ── HEX → RGB ──

function HexToRgbTab({ lang }: { lang: string }) {
  const C_T = React.useContext(ConvThemeCtx)
  const [hex, setHex] = React.useState('#FF6347')

  const parse = (h: string) => {
    const clean = h.replace('#', '').trim()
    if (clean.length === 3) {
      const [r,g,b] = clean.split('').map(c => parseInt(c+c, 16))
      return { r, g, b, valid: true }
    }
    if (clean.length === 6) {
      const r = parseInt(clean.slice(0,2), 16)
      const g = parseInt(clean.slice(2,4), 16)
      const b = parseInt(clean.slice(4,6), 16)
      return { r, g, b, valid: !isNaN(r+g+b) }
    }
    return { r: 0, g: 0, b: 0, valid: false }
  }

  const { r, g, b, valid } = parse(hex)
  const normalized = valid ? `#${hex.replace('#','').trim().toUpperCase().padStart(6,'0')}` : ''

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{lang === 'fr' ? 'Code HEX' : 'HEX Code'}</Label>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input type="color" value={valid ? normalized : '#000000'}
            onChange={e => setHex(e.target.value)}
            style={{ width: 48, height: 44, borderRadius: 8, border: `1px solid ${C_T.border}`,
              background: 'transparent', cursor: 'pointer', padding: 2 }} />
          <input type="text" value={hex} onChange={e => setHex(e.target.value)}
            placeholder="#FF6347" style={inp(C_T, { flex: '1' })} />
        </div>
      </div>
      {valid ? (
        <div style={{ background: `${C_T.accent}10`, border: `2px solid ${C_T.accent}`, borderRadius: 14,
          padding: '20px 24px', textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: 12, background: normalized, margin: '0 auto 14px',
            border: `2px solid ${C_T.border}` }} />
          <div style={{ fontSize: 32, fontWeight: 800, color: C_T.accent, fontFamily: "'Space Grotesk',sans-serif" }}>
            rgb({r}, {g}, {b})
          </div>
          <div style={{ fontSize: 13, color: C_T.muted, marginTop: 4 }}>
            R: {r} · G: {g} · B: {b}
          </div>
          <button onClick={() => navigator.clipboard?.writeText(`rgb(${r}, ${g}, ${b})`)}
            style={{ marginTop: 14, padding: '7px 18px', background: C_T.accent, color: '#fff',
              border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            📋 {lang === 'fr' ? 'Copier RGB' : 'Copy RGB'}
          </button>
        </div>
      ) : (
        <div style={{ background: `${C_T.err}15`, border: `1px solid ${C_T.err}44`, borderRadius: 10,
          padding: '10px 14px', fontSize: 13, color: C_T.err }}>
          ❌ {lang === 'fr' ? 'Code HEX invalide' : 'Invalid HEX code'}
        </div>
      )}
    </div>
  )
}

// ── Text Case ──

function TextCaseTab({ lang }: { lang: string }) {
  const C_T = React.useContext(ConvThemeCtx)
  const [text, setText] = React.useState(lang === 'fr' ? 'Bonjour le monde' : 'Hello World')
  const [mode, setMode] = React.useState('upper')

  const transforms: Record<string, (s: string) => string> = {
    upper:    s => s.toUpperCase(),
    lower:    s => s.toLowerCase(),
    title:    s => s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
    sentence: s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(),
    camel:    s => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (w,i) => i===0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g,''),
    pascal:   s => s.replace(/(?:^\w|[A-Z]|\b\w)/g, w => w.toUpperCase()).replace(/\s+/g,''),
    snake:    s => s.toLowerCase().replace(/\s+/g,'_'),
    kebab:    s => s.toLowerCase().replace(/\s+/g,'-'),
    dot:      s => s.toLowerCase().replace(/\s+/g,'.'),
  }

  const MODES = [
    { id:'upper',    en:'UPPERCASE',    fr:'MAJUSCULE' },
    { id:'lower',    en:'lowercase',    fr:'minuscule' },
    { id:'title',    en:'Title Case',   fr:'Titre' },
    { id:'sentence', en:'Sentence case',fr:'Phrase' },
    { id:'camel',    en:'camelCase',    fr:'camelCase' },
    { id:'pascal',   en:'PascalCase',   fr:'PascalCase' },
    { id:'snake',    en:'snake_case',   fr:'snake_case' },
    { id:'kebab',    en:'kebab-case',   fr:'kebab-case' },
    { id:'dot',      en:'dot.case',     fr:'dot.case' },
  ]

  const result = transforms[mode]?.(text) ?? text

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{lang === 'fr' ? 'Texte' : 'Text'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
          style={{ ...inp(C_T), resize: 'vertical', fontFamily: 'inherit' }} />
      </div>
      <div>
        <Label>{lang === 'fr' ? 'Format' : 'Case format'}</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                background: mode === m.id ? C_T.accent : 'transparent',
                color:      mode === m.id ? '#fff' : C_T.muted,
                border: `1px solid ${mode === m.id ? C_T.accent : C_T.border}` }}>
              {lang === 'fr' ? m.fr : m.en}
            </button>
          ))}
        </div>
      </div>
      <div style={{ background: `${C_T.accent}10`, border: `2px solid ${C_T.accent}`, borderRadius: 14,
        padding: '16px 20px' }}>
        <div style={{ fontSize: 15, color: C_T.text, wordBreak: 'break-all', fontFamily: 'monospace' }}>
          {result}
        </div>
        <button onClick={() => navigator.clipboard?.writeText(result)}
          style={{ marginTop: 12, padding: '7px 18px', background: C_T.accent, color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          📋 {lang === 'fr' ? 'Copier' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

// ── Hub shell ──

function TConvertersHub({ onBack }: { onBack?: () => void }) {
  const { lang } = useLang()
  const { dark } = useDark()
  const C_T = React.useMemo(() => buildPalette(dark), [dark])
  const [tab, setTab] = React.useState('length')
  const cur = CONV_TABS.find(t => t.id === tab)

  const panels: Record<string, React.ReactNode> = {
    length:      <LengthTab lang={lang} />,
    weight:      <WeightTab lang={lang} />,
    area:        <AreaTab lang={lang} />,
    volume:      <VolumeTab lang={lang} />,
    speed:       <SpeedTab lang={lang} />,
    temperature: <TemperatureTab lang={lang} />,
    currency:    <CurrencyTab lang={lang} />,
    rgb2hex:     <RgbToHexTab lang={lang} />,
    hex2rgb:     <HexToRgbTab lang={lang} />,
    textcase:    <TextCaseTab lang={lang} />,
  }

  const seoEntry = CONVERTER_SEO_CONTENT[tab]
  const isFr = lang === 'fr'
  const faqList = seoEntry ? (isFr ? seoEntry.frFaq : seoEntry.faq) : []

  // ── FAQPage structured data (JSON-LD) — mba haseho ho "Rich Result"
  // ao amin'ny Google search (mitovy amin'ny schemaFAQ ao amin'ny
  // SmartCalcHub.tsx / NetworkHub.tsx) ──
  const schemaFAQ = faqList.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  } : null

  return (
    <ConvThemeCtx.Provider value={C_T}>
    <div suppressHydrationWarning style={{ minHeight: '100vh', background: C_T.bg, fontFamily: "'Inter','Segoe UI',sans-serif", color: C_T.text }}>

      {schemaFAQ && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      )}

      {/* Responsive rules for the two-column layout — ajanona ao anaty
          <style> satria tsy azo atao amin'ny inline style ny @media ── */}
      <style>{`
        .conv-layout{display:grid;grid-template-columns:1fr 380px;gap:24px;align-items:flex-start;}
        .conv-tool{position:sticky;top:76px;}
        @media(max-width:${BP.tablet}px){
          .conv-layout{grid-template-columns:1fr;}
          .conv-tool{position:static;order:-1;}
        }
      `}</style>

      {/* Header */}
      <header style={{ background: C_T.card, borderBottom: `1px solid ${C_T.border}`, padding: '0 24px',
        height: 60, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 100 }}>
        {onBack && (
          <button onClick={onBack} style={{ background: C_T.success, color: '#fff', border: 'none',
            borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
            ← CHRONOS
          </button>
        )}
        <span style={{ fontSize: 20 }}>💱</span>
        <span style={{ fontWeight: 800, fontSize: 18, color: C_T.accent, letterSpacing: '-0.5px' }}>
          CONVERTERS
        </span>
        <span style={{ background: `${C_T.accent}22`, color: C_T.accent, border: `1px solid ${C_T.accent}44`,
          borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700, letterSpacing: '0.5px' }}>
          10 TOOLS
        </span>
        <span style={{ marginLeft: 'auto', background: `${C_T.success}22`, color: C_T.success,
          border: `1px solid ${C_T.success}44`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
          🔒 100% In-Browser
        </span>
      </header>

      {/* Tab nav */}
      <nav style={{ display: 'flex', overflowX: 'auto', background: C_T.card,
        borderBottom: `1px solid ${C_T.border}`, padding: '0 16px', gap: 4 }}>
        {CONV_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: 'transparent', border: 'none',
            borderBottom: tab === t.id ? `2px solid ${C_T.accent}` : '2px solid transparent',
            color: tab === t.id ? C_T.accent : C_T.muted,
            padding: '14px 16px', cursor: 'pointer',
            fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', transition: 'all 0.15s',
          }}>
            {t.icon} {lang === 'fr' ? t.fr : t.en}
          </button>
        ))}
      </nav>

      {/* Content — 2 column: tool (sticky, havanana) + article (mihetsika, havia) */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C_T.muted, marginBottom: 8 }}>
            <span>{cur?.icon}</span>
            <span>{lang === 'fr' ? cur?.fr : cur?.en}</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
            {seoEntry ? (isFr ? seoEntry.frTitle : seoEntry.title) : (lang === 'fr' ? cur?.fr : cur?.en)}
          </h1>
          <p style={{ color: C_T.muted, fontSize: 14, margin: '6px 0 0' }}>
            {lang === 'fr' ? cur?.frDesc : cur?.enDesc}
          </p>
        </div>

        <div className="conv-layout">
          <div>
            <ConverterSeoContent toolId={tab} lang={lang} />
            <RelatedConverters currentId={tab} lang={lang} onSelect={setTab} />
          </div>
          <div className="conv-tool">
            <div style={{ background: C_T.card, border: `1px solid ${C_T.border}`, borderRadius: 16, padding: 24 }}>
              {panels[tab]}
            </div>
          </div>
        </div>
      </main>

    </div>
    </ConvThemeCtx.Provider>
  )
}

export default TConvertersHub