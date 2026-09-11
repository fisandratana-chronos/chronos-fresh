'use client'

// ── components/texttools/TTextToolsHub.tsx ─────────────────────
// 12 text tool tabs (Phase 1 + Phase 2) — all in-browser, no dependencies.
//
// Phase 1: Word Counter, Case Converter, Text Cleaner, Find & Replace,
//          Remove Duplicate Lines, Sort Lines, Text Diff, Slug Generator
// Phase 2: Text Statistics, Lorem Ipsum Generator, Markdown → HTML,
//          HTML → Markdown
//
// Pattern mirrors components/converters/TConvertersHub.tsx exactly:
// same theme context approach, same Label/inp helpers, same header
// + tab-nav shell. No SEO content block in this version (per decision)
// — that can be added later the same way CONVERTER_SEO_CONTENT was.

import React from 'react'
import { useLang } from '../../lib/hooks/useLang'
import { useDark } from '../../lib/hooks/useDark'
import { DARK, LIGHT } from '../../lib/theme'
import { BP } from '../../lib/breakpoints'
import { Icon, IconClipboard } from '../shared/Icons'

// ── Theme (identical approach to TConvertersHub) ──

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

const TextThemeCtx = React.createContext(buildPalette(true))

// ── Tab config ──

// Icon — SVG Icon component (mitovy amin'ny ImageHub.tsx / TConvertersHub.tsx),
// nampiasaina indray ho an'ny tool tsirairay (ny 3D glossy PNG teo aloha
// dia nesorina satria tsy nety tsara ny endriny).

const TEXT_TABS = [
  { id: 'word-counter',   icon: 'clipboard', en: 'Word Counter',          fr: 'Compteur de mots',        enDesc: 'Words, characters, sentences, reading time', frDesc: 'Mots, caractères, phrases, temps de lecture' },
  { id: 'case-converter', icon: 'typography', en: 'Case Converter',      fr: 'Convertisseur de casse',   enDesc: 'UPPERCASE, lowercase, Title Case, and more',  frDesc: 'MAJUSCULE, minuscule, Titre, et plus' },
  { id: 'text-cleaner',   icon: 'sparkles', en: 'Text Cleaner',          fr: 'Nettoyeur de texte',       enDesc: 'Remove extra spaces, tabs, empty lines',      frDesc: "Supprimer espaces, tabulations, lignes vides" },
  { id: 'find-replace',   icon: 'search',   en: 'Find & Replace',        fr: 'Rechercher et remplacer',  enDesc: 'Search and replace text, with regex support', frDesc: 'Rechercher et remplacer, avec support regex' },
  { id: 'remove-duplicates', icon: 'repeat', en: 'Remove Duplicate Lines', fr: 'Supprimer les doublons', enDesc: 'Remove duplicate lines from a list',          frDesc: 'Supprimer les lignes en double' },
  { id: 'sort-lines',     icon: 'scale',    en: 'Sort Lines',            fr: 'Trier les lignes',         enDesc: 'Sort lines alphabetically, numerically, or by length', frDesc: 'Trier par ordre alphabétique, numérique ou par longueur' },
  { id: 'text-diff',      icon: 'exchange', en: 'Text Diff',             fr: 'Comparateur de textes',    enDesc: 'Compare two texts and see what changed',      frDesc: 'Comparer deux textes et voir les différences' },
  { id: 'slug-generator', icon: 'link',     en: 'Slug Generator',        fr: 'Générateur de slug',       enDesc: 'Turn any text into a URL-friendly slug',      frDesc: 'Transformer un texte en slug pour URL' },
  { id: 'text-statistics', icon: 'chart-bar', en: 'Text Statistics',     fr: 'Statistiques de texte',    enDesc: 'Word frequency, averages, and more',          frDesc: 'Fréquence des mots, moyennes, et plus' },
  { id: 'lorem-ipsum',    icon: 'edit',     en: 'Lorem Ipsum Generator', fr: 'Générateur Lorem Ipsum',   enDesc: 'Generate placeholder text',                   frDesc: 'Générer du texte de remplissage' },
  { id: 'markdown-to-html', icon: 'braces', en: 'Markdown → HTML',       fr: 'Markdown → HTML',          enDesc: 'Convert Markdown to HTML',                    frDesc: 'Convertir du Markdown en HTML' },
  { id: 'html-to-markdown', icon: 'braces', en: 'HTML → Markdown',       fr: 'HTML → Markdown',          enDesc: 'Convert HTML to Markdown',                    frDesc: 'Convertir du HTML en Markdown' },
  { id: 'remove-empty-lines', icon: 'eye-off', en: 'Remove Empty Lines', fr: 'Supprimer les lignes vides', enDesc: 'Remove blank lines from a text',              frDesc: 'Supprimer les lignes vides d\u2019un texte' },
  { id: 'remove-spaces',  icon: 'sparkles', en: 'Remove Spaces',         fr: 'Supprimer les espaces',    enDesc: 'Strip, trim, or collapse whitespace',         frDesc: 'Supprimer, ajuster ou fusionner les espaces' },
  { id: 'text-reverser',  icon: 'exchange', en: 'Text Reverser',        fr: 'Inverseur de texte',       enDesc: 'Reverse characters, words, or lines',         frDesc: 'Inverser les caractères, mots ou lignes' },
  { id: 'text-to-list',   icon: 'file-text', en: 'Text → List',         fr: 'Texte → Liste',            enDesc: 'Turn lines into a numbered or bulleted list', frDesc: 'Transformer des lignes en liste numérotée ou à puces' },
  { id: 'list-to-text',   icon: 'file-text', en: 'List → Text',         fr: 'Liste → Texte',            enDesc: 'Strip list markers back to plain lines',      frDesc: 'Retirer les puces/numéros pour du texte simple' },
]

// ── Sidebar categories — mitovy filaharana amin'ny PdfHub.tsx sidebar
// (POPULAR / CONVERT / SECURITY, sns.) ──
const TEXT_CATEGORIES = [
  { en: 'Essential', fr: 'Essentiel', tools: ['word-counter', 'case-converter', 'text-cleaner', 'find-replace'] },
  { en: 'Lists',     fr: 'Listes',    tools: ['remove-duplicates', 'sort-lines', 'remove-empty-lines', 'text-to-list', 'list-to-text'] },
  { en: 'Format',    fr: 'Formater',  tools: ['remove-spaces', 'text-reverser'] },
  { en: 'Compare',   fr: 'Comparer',  tools: ['text-diff'] },
  { en: 'Generate',  fr: 'Générer',   tools: ['slug-generator', 'lorem-ipsum'] },
  { en: 'Analyze',   fr: 'Analyser',  tools: ['text-statistics'] },
  { en: 'Convert',   fr: 'Convertir', tools: ['markdown-to-html', 'html-to-markdown'] },
]

// ── Shared helpers (same shape as TConvertersHub) ──

const inp = (C_T: ReturnType<typeof buildPalette>, extra: React.CSSProperties = {}): React.CSSProperties => ({
  width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 15,
  border: `1px solid ${C_T.border}`, background: C_T.bg, color: C_T.text,
  outline: 'none', boxSizing: 'border-box', fontFamily: "'Inter','Segoe UI',sans-serif",
  ...extra,
})

function Label({ children }: { children: React.ReactNode }) {
  const C_T = React.useContext(TextThemeCtx)
  return (
    <div style={{ fontSize: 12, fontWeight: 700, color: C_T.muted, textTransform: 'uppercase',
      letterSpacing: '0.06em', marginBottom: 6 }}>
      {children}
    </div>
  )
}

function CopyBtn({ getText, lang }: { getText: () => string; lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [copied, setCopied] = React.useState(false)
  return (
    <button onClick={() => { navigator.clipboard?.writeText(getText()); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      style={{ padding: '9px 16px', background: copied ? C_T.success : C_T.accent, color: '#fff',
        border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'background .15s' }}>
      <IconClipboard size={13} style={{ marginRight: 4, verticalAlign: -2 }} />
      {copied ? (lang === 'fr' ? 'Copié !' : 'Copied!') : (lang === 'fr' ? 'Copier' : 'Copy')}
    </button>
  )
}

function CheckOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  const C_T = React.useContext(TextThemeCtx)
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C_T.text, cursor: 'pointer', userSelect: 'none' }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        style={{ width: 16, height: 16, accentColor: C_T.accent, cursor: 'pointer' }} />
      {label}
    </label>
  )
}

// ── 1. Word Counter ──

function WordCounterTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState('')

  const stats = React.useMemo(() => {
    const words = (text.trim().match(/\S+/g) || [])
    const sentences = (text.match(/[.!?]+(?=\s|$)/g) || [])
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0)
    const lines = text ? text.split(/\r?\n/).length : 0
    const chars = text.length
    const charsNoSpaces = text.replace(/\s/g, '').length
    const avgWordLen = words.length ? (words.join('').length / words.length) : 0
    const minutes = words.length ? Math.max(1, Math.ceil(words.length / 200)) : 0
    return { words: words.length, sentences: sentences.length, paragraphs: paragraphs.length, lines, chars, charsNoSpaces, avgWordLen, minutes }
  }, [text])

  const isFr = lang === 'fr'
  const STAT_LABELS: [string, string, number][] = [
    [isFr ? 'Mots' : 'Words', '', stats.words],
    [isFr ? 'Caractères' : 'Characters', '', stats.chars],
    [isFr ? 'Sans espaces' : 'No spaces', '', stats.charsNoSpaces],
    [isFr ? 'Lignes' : 'Lines', '', stats.lines],
    [isFr ? 'Phrases' : 'Sentences', '', stats.sentences],
    [isFr ? 'Paragraphes' : 'Paragraphs', '', stats.paragraphs],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Votre texte' : 'Your text'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={10}
          placeholder={isFr ? 'Écrivez ou collez votre texte ici…' : 'Write or paste your text here…'}
          style={{ ...inp(C_T), resize: 'vertical', lineHeight: 1.6 }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10 }}>
        {STAT_LABELS.map(([label, , value]) => (
          <div key={label} style={{ border: `1px solid ${C_T.border}`, background: C_T.bg, borderRadius: 11, padding: '11px 12px' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: C_T.text }}>{value.toLocaleString()}</div>
            <div style={{ fontSize: 10, color: C_T.muted, textTransform: 'uppercase', letterSpacing: '.05em' }}>{label}</div>
          </div>
        ))}
        <div style={{ border: `1px solid ${C_T.border}`, background: C_T.bg, borderRadius: 11, padding: '11px 12px' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: C_T.accent }}>{stats.minutes} {isFr ? 'min' : 'min'}</div>
          <div style={{ fontSize: 10, color: C_T.muted, textTransform: 'uppercase', letterSpacing: '.05em' }}>{isFr ? 'Lecture' : 'Reading time'}</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: C_T.muted }}>
        {isFr ? 'Longueur moyenne des mots' : 'Average word length'}: {stats.avgWordLen.toFixed(1)} {isFr ? 'caractères' : 'characters'}
      </div>
    </div>
  )
}

// ── 2. Case Converter ──

function CaseConverterTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState(lang === 'fr' ? 'Bonjour le monde' : 'Hello World')
  const [mode, setMode] = React.useState('upper')

  const transforms: Record<string, (s: string) => string> = {
    upper:       s => s.toUpperCase(),
    lower:       s => s.toLowerCase(),
    title:       s => s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
    sentence:    s => s.length ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s,
    alternating: s => s.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(''),
    inverse:     s => s.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''),
    camel:       s => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, ''),
    pascal:      s => s.replace(/(?:^\w|[A-Z]|\b\w)/g, w => w.toUpperCase()).replace(/\s+/g, ''),
    snake:       s => s.toLowerCase().replace(/\s+/g, '_'),
    kebab:       s => s.toLowerCase().replace(/\s+/g, '-'),
  }

  const MODES = [
    { id: 'upper',       en: 'UPPERCASE',    fr: 'MAJUSCULE' },
    { id: 'lower',       en: 'lowercase',    fr: 'minuscule' },
    { id: 'title',       en: 'Title Case',   fr: 'Titre' },
    { id: 'sentence',    en: 'Sentence case', fr: 'Phrase' },
    { id: 'alternating', en: 'aLtErNaTiNg',  fr: 'aLtErNé' },
    { id: 'inverse',     en: 'iNVERSE',      fr: 'iNVERSE' },
    { id: 'camel',       en: 'camelCase',    fr: 'camelCase' },
    { id: 'pascal',      en: 'PascalCase',   fr: 'PascalCase' },
    { id: 'snake',       en: 'snake_case',   fr: 'snake_case' },
    { id: 'kebab',       en: 'kebab-case',   fr: 'kebab-case' },
  ]

  const result = transforms[mode]?.(text) ?? text
  const isFr = lang === 'fr'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Texte' : 'Text'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
          style={{ ...inp(C_T), resize: 'vertical', fontFamily: 'inherit' }} />
      </div>
      <div>
        <Label>{isFr ? 'Format' : 'Case format'}</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                background: mode === m.id ? C_T.accent : 'transparent',
                color: mode === m.id ? '#fff' : C_T.muted,
                border: `1px solid ${mode === m.id ? C_T.accent : C_T.border}` }}>
              {isFr ? m.fr : m.en}
            </button>
          ))}
        </div>
      </div>
      <div style={{ background: `${C_T.accent}10`, border: `2px solid ${C_T.accent}`, borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ fontSize: 15, color: C_T.text, wordBreak: 'break-word', fontFamily: 'monospace' }}>{result}</div>
        <div style={{ marginTop: 12 }}><CopyBtn getText={() => result} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── 3. Text Cleaner ──

function TextCleanerTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState('')
  const [opts, setOpts] = React.useState({
    extraSpaces: true, emptyLines: false, trim: true,
    normalizeBreaks: true, tabs: true, duplicateSpaces: true,
  })
  const isFr = lang === 'fr'

  const cleaned = React.useMemo(() => {
    let t = text
    if (opts.normalizeBreaks) t = t.replace(/\r\n/g, '\n')
    if (opts.tabs) t = t.replace(/\t/g, '    ')
    if (opts.duplicateSpaces || opts.extraSpaces) t = t.replace(/ {2,}/g, ' ')
    if (opts.trim) t = t.split('\n').map(l => l.trim()).join('\n')
    if (opts.emptyLines) t = t.split('\n').filter(l => l.trim() !== '').join('\n')
    return t
  }, [text, opts])

  const OPTIONS: [keyof typeof opts, string, string][] = [
    ['extraSpaces', 'Remove extra spaces', 'Supprimer les espaces superflus'],
    ['emptyLines', 'Remove empty lines', 'Supprimer les lignes vides'],
    ['trim', 'Trim each line', 'Ajuster (trim) chaque ligne'],
    ['normalizeBreaks', 'Normalize line breaks', 'Normaliser les sauts de ligne'],
    ['tabs', 'Convert tabs to spaces', 'Convertir les tabulations en espaces'],
    ['duplicateSpaces', 'Collapse duplicate spaces', 'Fusionner les espaces multiples'],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Texte à nettoyer' : 'Text to clean'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} style={{ ...inp(C_T), resize: 'vertical' }} />
      </div>
      <div>
        <Label>{isFr ? 'Options' : 'Options'}</Label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
          {OPTIONS.map(([key, en, fr]) => (
            <CheckOption key={key} label={isFr ? fr : en} checked={opts[key]} onChange={v => setOpts(o => ({ ...o, [key]: v }))} />
          ))}
        </div>
      </div>
      <div>
        <Label>{isFr ? 'Résultat' : 'Result'}</Label>
        <textarea readOnly value={cleaned} rows={8} style={{ ...inp(C_T), resize: 'vertical', background: C_T.bg }} />
        <div style={{ marginTop: 10 }}><CopyBtn getText={() => cleaned} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── 4. Find & Replace ──

function FindReplaceTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState('')
  const [find, setFind] = React.useState('')
  const [replace, setReplace] = React.useState('')
  const [matchCase, setMatchCase] = React.useState(false)
  const [wholeWord, setWholeWord] = React.useState(false)
  const [useRegex, setUseRegex] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const isFr = lang === 'fr'

  const result = React.useMemo(() => {
    if (!find) { setError(null); return text }
    try {
      let pattern = useRegex ? find : find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      if (wholeWord) pattern = `\\b${pattern}\\b`
      const re = new RegExp(pattern, matchCase ? 'g' : 'gi')
      setError(null)
      return text.replace(re, replace)
    } catch (e) {
      setError(isFr ? 'Regex invalide' : 'Invalid regex')
      return text
    }
  }, [text, find, replace, matchCase, wholeWord, useRegex, isFr])

  const matchCount = React.useMemo(() => {
    if (!find) return 0
    try {
      let pattern = useRegex ? find : find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      if (wholeWord) pattern = `\\b${pattern}\\b`
      const re = new RegExp(pattern, matchCase ? 'g' : 'gi')
      return (text.match(re) || []).length
    } catch { return 0 }
  }, [text, find, matchCase, wholeWord, useRegex])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Texte' : 'Text'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={7} style={{ ...inp(C_T), resize: 'vertical' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <Label>{isFr ? 'Rechercher' : 'Find'}</Label>
          <input value={find} onChange={e => setFind(e.target.value)} style={inp(C_T)} />
        </div>
        <div>
          <Label>{isFr ? 'Remplacer par' : 'Replace with'}</Label>
          <input value={replace} onChange={e => setReplace(e.target.value)} style={inp(C_T)} />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <CheckOption label={isFr ? 'Respecter la casse' : 'Match case'} checked={matchCase} onChange={setMatchCase} />
        <CheckOption label={isFr ? 'Mot entier' : 'Whole word'} checked={wholeWord} onChange={setWholeWord} />
        <CheckOption label={isFr ? 'Mode regex' : 'Regex mode'} checked={useRegex} onChange={setUseRegex} />
      </div>
      {error && <div style={{ color: C_T.err, fontSize: 12 }}>{error}</div>}
      <div style={{ fontSize: 12, color: C_T.muted }}>
        {matchCount} {isFr ? 'correspondance(s)' : 'match(es)'}
      </div>
      <div>
        <Label>{isFr ? 'Résultat' : 'Result'}</Label>
        <textarea readOnly value={result} rows={7} style={{ ...inp(C_T), resize: 'vertical' }} />
        <div style={{ marginTop: 10 }}><CopyBtn getText={() => result} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── 5. Remove Duplicate Lines ──

function RemoveDuplicatesTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState('')
  const [preserveOrder, setPreserveOrder] = React.useState(true)
  const [caseSensitive, setCaseSensitive] = React.useState(true)
  const [removeEmpty, setRemoveEmpty] = React.useState(false)
  const isFr = lang === 'fr'

  const result = React.useMemo(() => {
    let lines = text.split(/\r?\n/)
    if (removeEmpty) lines = lines.filter(l => l.trim() !== '')
    const seen = new Set<string>()
    const out: string[] = []
    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase()
      if (!seen.has(key)) { seen.add(key); out.push(line) }
    }
    return preserveOrder ? out : [...out].sort((a, b) => a.localeCompare(b))
  }, [text, preserveOrder, caseSensitive, removeEmpty])

  const removedCount = text ? text.split(/\r?\n/).length - result.length : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Liste (une valeur par ligne)' : 'List (one value per line)'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} style={{ ...inp(C_T), resize: 'vertical' }} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <CheckOption label={isFr ? "Conserver l'ordre original" : 'Preserve original order'} checked={preserveOrder} onChange={setPreserveOrder} />
        <CheckOption label={isFr ? 'Sensible à la casse' : 'Case sensitive'} checked={caseSensitive} onChange={setCaseSensitive} />
        <CheckOption label={isFr ? 'Supprimer les lignes vides' : 'Remove empty lines'} checked={removeEmpty} onChange={setRemoveEmpty} />
      </div>
      <div style={{ fontSize: 12, color: C_T.muted }}>
        {removedCount} {isFr ? 'ligne(s) en double supprimée(s)' : 'duplicate line(s) removed'}
      </div>
      <div>
        <Label>{isFr ? 'Résultat' : 'Result'}</Label>
        <textarea readOnly value={result.join('\n')} rows={8} style={{ ...inp(C_T), resize: 'vertical' }} />
        <div style={{ marginTop: 10 }}><CopyBtn getText={() => result.join('\n')} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── 6. Sort Lines ──

function SortLinesTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState('')
  const [order, setOrder] = React.useState<'az' | 'za' | 'numeric' | 'length'>('az')
  const [ignoreCase, setIgnoreCase] = React.useState(true)
  const [dedupe, setDedupe] = React.useState(false)
  const isFr = lang === 'fr'

  const result = React.useMemo(() => {
    if (text === '') return []
    let lines = text.split(/\r?\n/)
    if (dedupe) lines = Array.from(new Set(lines))

    const sorted = [...lines].sort((a, b) => {
      if (order === 'numeric') return (parseFloat(a) || 0) - (parseFloat(b) || 0)
      if (order === 'length') return a.length - b.length
      const x = ignoreCase ? a.toLowerCase() : a
      const y = ignoreCase ? b.toLowerCase() : b
      return x.localeCompare(y)
    })
    return order === 'za' ? sorted.reverse() : sorted
  }, [text, order, ignoreCase, dedupe])

  const ORDERS: [typeof order, string, string][] = [
    ['az', 'A → Z', 'A → Z'],
    ['za', 'Z → A', 'Z → A'],
    ['numeric', 'Numeric', 'Numérique'],
    ['length', 'By length', 'Par longueur'],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Liste (une valeur par ligne)' : 'List (one value per line)'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} style={{ ...inp(C_T), resize: 'vertical' }} />
      </div>
      <div>
        <Label>{isFr ? 'Trier par' : 'Sort by'}</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ORDERS.map(([id, en, fr]) => (
            <button key={id} onClick={() => setOrder(id)}
              style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                background: order === id ? C_T.accent : 'transparent',
                color: order === id ? '#fff' : C_T.muted,
                border: `1px solid ${order === id ? C_T.accent : C_T.border}` }}>
              {isFr ? fr : en}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <CheckOption label={isFr ? 'Ignorer la casse' : 'Ignore case'} checked={ignoreCase} onChange={setIgnoreCase} />
        <CheckOption label={isFr ? 'Supprimer les doublons' : 'Remove duplicates'} checked={dedupe} onChange={setDedupe} />
      </div>
      <div>
        <Label>{isFr ? 'Résultat' : 'Result'}</Label>
        <textarea readOnly value={result.join('\n')} rows={8} style={{ ...inp(C_T), resize: 'vertical' }} />
        <div style={{ marginTop: 10 }}><CopyBtn getText={() => result.join('\n')} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── 7. Text Diff ──

type DiffOp = { type: 'equal' | 'add' | 'remove'; line: string }

function lineDiff(a: string[], b: string[]): DiffOp[] {
  const n = a.length, m = b.length
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }
  const ops: DiffOp[] = []
  let i = 0, j = 0
  while (i < n && j < m) {
    if (a[i] === b[j]) { ops.push({ type: 'equal', line: a[i] }); i++; j++ }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { ops.push({ type: 'remove', line: a[i] }); i++ }
    else { ops.push({ type: 'add', line: b[j] }); j++ }
  }
  while (i < n) { ops.push({ type: 'remove', line: a[i] }); i++ }
  while (j < m) { ops.push({ type: 'add', line: b[j] }); j++ }
  return ops
}

function TextDiffTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [a, setA] = React.useState('')
  const [b, setB] = React.useState('')
  const isFr = lang === 'fr'

  const ops = React.useMemo(() => lineDiff(a.split(/\r?\n/), b.split(/\r?\n/)), [a, b])
  const added = ops.filter(o => o.type === 'add').length
  const removed = ops.filter(o => o.type === 'remove').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <Label>{isFr ? 'Original' : 'Original'}</Label>
          <textarea value={a} onChange={e => setA(e.target.value)} rows={8} style={{ ...inp(C_T), resize: 'vertical' }} />
        </div>
        <div>
          <Label>{isFr ? 'Modifié' : 'Modified'}</Label>
          <textarea value={b} onChange={e => setB(e.target.value)} rows={8} style={{ ...inp(C_T), resize: 'vertical' }} />
        </div>
      </div>
      <div style={{ fontSize: 12, color: C_T.muted }}>
        <span style={{ color: C_T.success }}>+{added} {isFr ? 'ajoutée(s)' : 'added'}</span>
        {'  ·  '}
        <span style={{ color: C_T.err }}>-{removed} {isFr ? 'supprimée(s)' : 'removed'}</span>
      </div>
      <div style={{ border: `1px solid ${C_T.border}`, borderRadius: 12, overflow: 'hidden', fontFamily: 'monospace', fontSize: 13 }}>
        {ops.length === 0 ? (
          <div style={{ padding: 16, color: C_T.muted }}>{isFr ? 'Aucune différence' : 'No differences'}</div>
        ) : ops.map((op, idx) => (
          <div key={idx} style={{
            padding: '4px 12px',
            background: op.type === 'add' ? `${C_T.success}18` : op.type === 'remove' ? `${C_T.err}18` : 'transparent',
            color: op.type === 'add' ? C_T.success : op.type === 'remove' ? C_T.err : C_T.text,
            borderBottom: `1px solid ${C_T.border}`,
          }}>
            {op.type === 'add' ? '+ ' : op.type === 'remove' ? '- ' : '  '}{op.line || '\u00A0'}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 8. Slug Generator ──

function SlugGeneratorTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState('')
  const [separator, setSeparator] = React.useState('-')
  const isFr = lang === 'fr'

  const slug = React.useMemo(() => {
    return text
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/[\s_-]+/g, separator)
      .replace(new RegExp(`\\${separator}{2,}`, 'g'), separator)
      .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '')
  }, [text, separator])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Texte' : 'Text'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
          placeholder={isFr ? 'Comment créer un excellent site web en 2026 ?' : 'How to build a great website in 2026?'}
          style={{ ...inp(C_T), resize: 'vertical' }} />
      </div>
      <div>
        <Label>{isFr ? 'Séparateur' : 'Separator'}</Label>
        <div style={{ display: 'flex', gap: 8 }}>
          {['-', '_'].map(s => (
            <button key={s} onClick={() => setSeparator(s)}
              style={{ padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                background: separator === s ? C_T.accent : 'transparent',
                color: separator === s ? '#fff' : C_T.muted,
                border: `1px solid ${separator === s ? C_T.accent : C_T.border}` }}>
              {s === '-' ? (isFr ? 'Tiret (-)' : 'Dash (-)') : (isFr ? 'Underscore (_)' : 'Underscore (_)')}
            </button>
          ))}
        </div>
      </div>
      <div style={{ background: `${C_T.accent}10`, border: `2px solid ${C_T.accent}`, borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ fontSize: 15, color: C_T.text, wordBreak: 'break-all', fontFamily: 'monospace' }}>{slug || '—'}</div>
        <div style={{ marginTop: 12 }}><CopyBtn getText={() => slug} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── 9. Text Statistics (Phase 2) ──

function TextStatisticsTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState('')
  const isFr = lang === 'fr'

  const STOP_WORDS = new Set([
    'the','a','an','and','or','but','of','to','in','on','at','for','is','are','was','were','it','this','that','with','as','be','by','i','you','he','she','we','they',
    'le','la','les','un','une','des','et','ou','de','du','à','en','pour','est','sont','était','étaient','ce','cette','avec','comme','être','par','je','tu','il','elle','nous','vous','ils','elles',
  ])

  const stats = React.useMemo(() => {
    const words: string[] = text.toLowerCase().match(/[\p{L}''']+/gu) ?? []
    const sentences = (text.match(/[.!?]+(?=\s|$)/g) || [])
    const uniqueWords = new Set(words)
    const freq = new Map<string, number>()
    for (const w of words) {
      if (STOP_WORDS.has(w) || w.length < 2) continue
      freq.set(w, (freq.get(w) || 0) + 1)
    }
    const topWords = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10)
    const longestWord = words.reduce((a: string, w: string) => w.length > a.length ? w : a, '')
    const avgWordLen = words.length ? words.join('').length / words.length : 0
    const avgSentenceLen = sentences.length ? words.length / sentences.length : 0
    const maxFreq = topWords.length ? topWords[0][1] : 1
    return { totalWords: words.length, uniqueWords: uniqueWords.size, topWords, longestWord, avgWordLen, avgSentenceLen, maxFreq }
  }, [text])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Votre texte' : 'Your text'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={9} style={{ ...inp(C_T), resize: 'vertical' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
        <div style={{ border: `1px solid ${C_T.border}`, background: C_T.bg, borderRadius: 11, padding: '11px 12px' }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{stats.totalWords}</div>
          <div style={{ fontSize: 10, color: C_T.muted, textTransform: 'uppercase' }}>{isFr ? 'Mots totaux' : 'Total words'}</div>
        </div>
        <div style={{ border: `1px solid ${C_T.border}`, background: C_T.bg, borderRadius: 11, padding: '11px 12px' }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{stats.uniqueWords}</div>
          <div style={{ fontSize: 10, color: C_T.muted, textTransform: 'uppercase' }}>{isFr ? 'Mots uniques' : 'Unique words'}</div>
        </div>
        <div style={{ border: `1px solid ${C_T.border}`, background: C_T.bg, borderRadius: 11, padding: '11px 12px' }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{stats.avgWordLen.toFixed(1)}</div>
          <div style={{ fontSize: 10, color: C_T.muted, textTransform: 'uppercase' }}>{isFr ? 'Longueur moy. mot' : 'Avg word length'}</div>
        </div>
        <div style={{ border: `1px solid ${C_T.border}`, background: C_T.bg, borderRadius: 11, padding: '11px 12px' }}>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{stats.avgSentenceLen.toFixed(1)}</div>
          <div style={{ fontSize: 10, color: C_T.muted, textTransform: 'uppercase' }}>{isFr ? 'Mots/phrase' : 'Words/sentence'}</div>
        </div>
      </div>
      {stats.longestWord && (
        <div style={{ fontSize: 12, color: C_T.muted }}>
          {isFr ? 'Mot le plus long' : 'Longest word'}: <span style={{ color: C_T.text, fontWeight: 700 }}>{stats.longestWord}</span> ({stats.longestWord.length} {isFr ? 'caractères' : 'characters'})
        </div>
      )}
      {stats.topWords.length > 0 && (
        <div>
          <Label>{isFr ? 'Mots les plus fréquents' : 'Most frequent words'}</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {stats.topWords.map(([word, count]) => (
              <div key={word} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 90, fontSize: 13, color: C_T.text, flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{word}</div>
                <div style={{ flex: 1, height: 8, background: C_T.bg, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${(count / stats.maxFreq) * 100}%`, height: '100%', background: C_T.accent }} />
                </div>
                <div style={{ width: 24, fontSize: 12, color: C_T.muted, textAlign: 'right', flexShrink: 0 }}>{count}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── 10. Lorem Ipsum Generator (Phase 2) ──

const LOREM_WORDS = ('lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum').split(' ')

function generateLoremWords(n: number): string[] {
  const out: string[] = []
  for (let i = 0; i < n; i++) out.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)])
  return out
}
function capitalizeFirst(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

function generateLoremSentence(): string {
  const len = 6 + Math.floor(Math.random() * 10)
  const words = generateLoremWords(len)
  return capitalizeFirst(words.join(' ')) + '.'
}
function generateLoremParagraph(): string {
  const sentCount = 4 + Math.floor(Math.random() * 4)
  return Array.from({ length: sentCount }, generateLoremSentence).join(' ')
}

function LoremIpsumTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [unit, setUnit] = React.useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [count, setCount] = React.useState(3)
  const [startClassic, setStartClassic] = React.useState(true)
  const isFr = lang === 'fr'

  const result = React.useMemo(() => {
    let parts: string[] = []
    if (unit === 'paragraphs') parts = Array.from({ length: count }, generateLoremParagraph)
    else if (unit === 'sentences') parts = Array.from({ length: count }, generateLoremSentence)
    else return capitalizeFirst(generateLoremWords(count).join(' ')) + (count > 0 ? '.' : '')

    if (startClassic && parts.length > 0) {
      parts[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + parts[0]
    }
    return unit === 'paragraphs' ? parts.join('\n\n') : parts.join(' ')
  }, [unit, count, startClassic])

  const UNITS: [typeof unit, string, string][] = [
    ['paragraphs', 'Paragraphs', 'Paragraphes'],
    ['sentences', 'Sentences', 'Phrases'],
    ['words', 'Words', 'Mots'],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
        <div>
          <Label>{isFr ? 'Unité' : 'Unit'}</Label>
          <div style={{ display: 'flex', gap: 8 }}>
            {UNITS.map(([id, en, fr]) => (
              <button key={id} onClick={() => setUnit(id)}
                style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  background: unit === id ? C_T.accent : 'transparent',
                  color: unit === id ? '#fff' : C_T.muted,
                  border: `1px solid ${unit === id ? C_T.accent : C_T.border}` }}>
                {isFr ? fr : en}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label>{isFr ? 'Nombre' : 'Count'}</Label>
          <input type="number" min={1} max={50} value={count}
            onChange={e => setCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
            style={{ ...inp(C_T), width: 90 }} />
        </div>
        <CheckOption label={isFr ? 'Commencer par "Lorem ipsum..."' : 'Start with "Lorem ipsum..."'} checked={startClassic} onChange={setStartClassic} />
      </div>
      <div>
        <Label>{isFr ? 'Résultat' : 'Result'}</Label>
        <textarea readOnly value={result} rows={12} style={{ ...inp(C_T), resize: 'vertical', lineHeight: 1.6 }} />
        <div style={{ marginTop: 10 }}><CopyBtn getText={() => result} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── 11. Markdown → HTML (Phase 2) ──

function markdownToHtml(md: string): string {
  const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const codeBlocks: string[] = []
  let src = md.replace(/```([\s\S]*?)```/g, (_, code) => {
    codeBlocks.push(`<pre><code>${escapeHtml(code.trim())}</code></pre>`)
    return `\u0000CODEBLOCK${codeBlocks.length - 1}\u0000`
  })

  const lines = src.split(/\r?\n/)
  const html: string[] = []
  let inList: 'ul' | 'ol' | null = null
  let inBlockquote = false

  const closeList = () => { if (inList) { html.push(`</${inList}>`); inList = null } }
  const closeQuote = () => { if (inBlockquote) { html.push('</blockquote>'); inBlockquote = false } }

  const inline = (line: string) => escapeHtml(line)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  for (const raw of lines) {
    const line = raw
    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    const ulItem = line.match(/^[-*]\s+(.*)$/)
    const olItem = line.match(/^\d+\.\s+(.*)$/)
    const quote = line.match(/^>\s?(.*)$/)

    if (heading) {
      closeList(); closeQuote()
      const level = heading[1].length
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`)
    } else if (ulItem) {
      closeQuote()
      if (inList !== 'ul') { closeList(); html.push('<ul>'); inList = 'ul' }
      html.push(`<li>${inline(ulItem[1])}</li>`)
    } else if (olItem) {
      closeQuote()
      if (inList !== 'ol') { closeList(); html.push('<ol>'); inList = 'ol' }
      html.push(`<li>${inline(olItem[1])}</li>`)
    } else if (quote) {
      closeList()
      if (!inBlockquote) { html.push('<blockquote>'); inBlockquote = true }
      html.push(`<p>${inline(quote[1])}</p>`)
    } else if (line.trim() === '') {
      closeList(); closeQuote()
    } else if (line.includes('\u0000CODEBLOCK')) {
      closeList(); closeQuote()
      html.push(line)
    } else {
      closeList(); closeQuote()
      html.push(`<p>${inline(line)}</p>`)
    }
  }
  closeList(); closeQuote()

  return html.join('\n').replace(/\u0000CODEBLOCK(\d+)\u0000/g, (_, i) => codeBlocks[Number(i)])
}

function MarkdownToHtmlTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [md, setMd] = React.useState('# Hello\n\nThis is **bold** and *italic* text with a [link](https://example.com).\n\n- Item one\n- Item two')
  const isFr = lang === 'fr'
  const html = React.useMemo(() => markdownToHtml(md), [md])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>Markdown</Label>
        <textarea value={md} onChange={e => setMd(e.target.value)} rows={10} style={{ ...inp(C_T), resize: 'vertical', fontFamily: 'monospace' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <Label>HTML</Label>
          <textarea readOnly value={html} rows={10} style={{ ...inp(C_T), resize: 'vertical', fontFamily: 'monospace', fontSize: 12.5 }} />
          <div style={{ marginTop: 10 }}><CopyBtn getText={() => html} lang={lang} /></div>
        </div>
        <div>
          <Label>{isFr ? 'Aperçu' : 'Preview'}</Label>
          <div style={{ ...inp(C_T), minHeight: 240, overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  )
}

// ── 12. HTML → Markdown (Phase 2) ──

function htmlNodeToMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return (node.textContent || '').replace(/\s+/g, ' ')
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return ''
  const el = node as HTMLElement
  const children = Array.from(el.childNodes).map(htmlNodeToMarkdown).join('')
  const tag = el.tagName.toLowerCase()

  switch (tag) {
    case 'h1': return `# ${children.trim()}\n\n`
    case 'h2': return `## ${children.trim()}\n\n`
    case 'h3': return `### ${children.trim()}\n\n`
    case 'h4': return `#### ${children.trim()}\n\n`
    case 'h5': return `##### ${children.trim()}\n\n`
    case 'h6': return `###### ${children.trim()}\n\n`
    case 'strong': case 'b': return `**${children}**`
    case 'em': case 'i': return `*${children}*`
    case 'code': return `\`${children}\``
    case 'pre': return `\`\`\`\n${el.textContent}\n\`\`\`\n\n`
    case 'a': return `[${children}](${el.getAttribute('href') || ''})`
    case 'p': return `${children.trim()}\n\n`
    case 'br': return '\n'
    case 'li': {
      const parent = el.parentElement?.tagName.toLowerCase()
      const prefix = parent === 'ol' ? '1. ' : '- '
      return `${prefix}${children.trim()}\n`
    }
    case 'ul': case 'ol': return `${children}\n`
    case 'blockquote': return children.trim().split('\n').map(l => `> ${l}`).join('\n') + '\n\n'
    default: return children
  }
}

function htmlToMarkdown(html: string): string {
  if (typeof window === 'undefined') return ''
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return htmlNodeToMarkdown(doc.body).replace(/\n{3,}/g, '\n\n').trim()
}

function HtmlToMarkdownTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [html, setHtml] = React.useState('<h1>Hello</h1>\n<p>This is <strong>bold</strong> and <em>italic</em> text with a <a href="https://example.com">link</a>.</p>\n<ul>\n  <li>Item one</li>\n  <li>Item two</li>\n</ul>')
  const [markdown, setMarkdown] = React.useState('')

  React.useEffect(() => {
    setMarkdown(htmlToMarkdown(html))
  }, [html])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>HTML</Label>
        <textarea value={html} onChange={e => setHtml(e.target.value)} rows={10} style={{ ...inp(C_T), resize: 'vertical', fontFamily: 'monospace', fontSize: 12.5 }} />
      </div>
      <div>
        <Label>Markdown</Label>
        <textarea readOnly value={markdown} rows={10} style={{ ...inp(C_T), resize: 'vertical', fontFamily: 'monospace' }} />
        <div style={{ marginTop: 10 }}><CopyBtn getText={() => markdown} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── 13. Remove Empty Lines (Phase 3) ──

function RemoveEmptyLinesTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState('')
  const [treatWhitespaceAsEmpty, setTreatWhitespaceAsEmpty] = React.useState(true)
  const [collapseToOne, setCollapseToOne] = React.useState(false)
  const isFr = lang === 'fr'

  const result = React.useMemo(() => {
    let lines = text.split(/\r?\n/)
    lines = lines.filter(l => treatWhitespaceAsEmpty ? l.trim() !== '' : l !== '')
    if (collapseToOne) {
      // Keep at most one blank line between kept lines — only relevant
      // when treatWhitespaceAsEmpty is off and some blanks survived.
      const out: string[] = []
      let prevBlank = false
      for (const l of text.split(/\r?\n/)) {
        const isBlank = l.trim() === ''
        if (isBlank && (treatWhitespaceAsEmpty || prevBlank)) continue
        out.push(l)
        prevBlank = isBlank
      }
      return out
    }
    return lines
  }, [text, treatWhitespaceAsEmpty, collapseToOne])

  const removedCount = text ? text.split(/\r?\n/).length - result.length : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Texte' : 'Text'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={9} style={{ ...inp(C_T), resize: 'vertical' }} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <CheckOption label={isFr ? 'Traiter les espaces seuls comme vides' : 'Treat whitespace-only lines as empty'} checked={treatWhitespaceAsEmpty} onChange={setTreatWhitespaceAsEmpty} />
        <CheckOption label={isFr ? 'Ne garder qu\u2019une ligne vide entre les blocs' : 'Collapse to a single blank line between blocks'} checked={collapseToOne} onChange={setCollapseToOne} />
      </div>
      <div style={{ fontSize: 12, color: C_T.muted }}>
        {removedCount} {isFr ? 'ligne(s) vide(s) supprimée(s)' : 'empty line(s) removed'}
      </div>
      <div>
        <Label>{isFr ? 'Résultat' : 'Result'}</Label>
        <textarea readOnly value={result.join('\n')} rows={9} style={{ ...inp(C_T), resize: 'vertical' }} />
        <div style={{ marginTop: 10 }}><CopyBtn getText={() => result.join('\n')} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── 14. Remove Spaces / Whitespace (Phase 3) ──

function RemoveSpacesTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState('')
  const [mode, setMode] = React.useState<'trim' | 'collapse' | 'all' | 'tabs'>('collapse')
  const isFr = lang === 'fr'

  const result = React.useMemo(() => {
    switch (mode) {
      case 'trim':     return text.split('\n').map(l => l.trim()).join('\n')
      case 'collapse': return text.replace(/[ \t]{2,}/g, ' ')
      case 'all':      return text.replace(/\s+/g, '')
      case 'tabs':      return text.replace(/\t/g, '    ')
      default:          return text
    }
  }, [text, mode])

  const MODES: [typeof mode, string, string][] = [
    ['trim', 'Trim each line', 'Ajuster chaque ligne'],
    ['collapse', 'Collapse multiple spaces', 'Fusionner les espaces multiples'],
    ['all', 'Remove all whitespace', 'Supprimer tous les espaces'],
    ['tabs', 'Tabs to spaces', 'Tabulations en espaces'],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Texte' : 'Text'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={9} style={{ ...inp(C_T), resize: 'vertical' }} />
      </div>
      <div>
        <Label>{isFr ? 'Mode' : 'Mode'}</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {MODES.map(([id, en, fr]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                background: mode === id ? C_T.accent : 'transparent',
                color: mode === id ? '#fff' : C_T.muted,
                border: `1px solid ${mode === id ? C_T.accent : C_T.border}` }}>
              {isFr ? fr : en}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>{isFr ? 'Résultat' : 'Result'}</Label>
        <textarea readOnly value={result} rows={9} style={{ ...inp(C_T), resize: 'vertical' }} />
        <div style={{ marginTop: 10 }}><CopyBtn getText={() => result} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── 15. Text Reverser (Phase 3) ──

function TextReverserTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState('')
  const [mode, setMode] = React.useState<'chars' | 'words' | 'lines'>('chars')
  const isFr = lang === 'fr'

  const result = React.useMemo(() => {
    if (mode === 'chars') return text.split('').reverse().join('')
    if (mode === 'words') return text.split(/(\s+)/).reverse().join('')
    return text.split(/\r?\n/).reverse().join('\n')
  }, [text, mode])

  const MODES: [typeof mode, string, string][] = [
    ['chars', 'Characters', 'Caractères'],
    ['words', 'Words', 'Mots'],
    ['lines', 'Lines', 'Lignes'],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Texte' : 'Text'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} style={{ ...inp(C_T), resize: 'vertical' }} />
      </div>
      <div>
        <Label>{isFr ? 'Inverser par' : 'Reverse by'}</Label>
        <div style={{ display: 'flex', gap: 8 }}>
          {MODES.map(([id, en, fr]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                background: mode === id ? C_T.accent : 'transparent',
                color: mode === id ? '#fff' : C_T.muted,
                border: `1px solid ${mode === id ? C_T.accent : C_T.border}` }}>
              {isFr ? fr : en}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>{isFr ? 'Résultat' : 'Result'}</Label>
        <textarea readOnly value={result} rows={8} style={{ ...inp(C_T), resize: 'vertical' }} />
        <div style={{ marginTop: 10 }}><CopyBtn getText={() => result} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── 16. Text → List (Phase 3) ──

function TextToListTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState('')
  const [style, setStyle] = React.useState<'numbered' | 'bullet' | 'dash' | 'checkbox'>('bullet')
  const [skipEmpty, setSkipEmpty] = React.useState(true)
  const isFr = lang === 'fr'

  const result = React.useMemo(() => {
    let lines = text.split(/\r?\n/)
    if (skipEmpty) lines = lines.filter(l => l.trim() !== '')
    return lines.map((l, i) => {
      if (style === 'numbered') return `${i + 1}. ${l}`
      if (style === 'bullet') return `• ${l}`
      if (style === 'dash') return `- ${l}`
      return `- [ ] ${l}`
    }).join('\n')
  }, [text, style, skipEmpty])

  const STYLES: [typeof style, string, string][] = [
    ['numbered', '1. 2. 3.', '1. 2. 3.'],
    ['bullet', '• Bullet', '• Puce'],
    ['dash', '- Dash', '- Tiret'],
    ['checkbox', '- [ ] Checkbox', '- [ ] Case à cocher'],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Lignes' : 'Lines'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} style={{ ...inp(C_T), resize: 'vertical' }} />
      </div>
      <div>
        <Label>{isFr ? 'Style de liste' : 'List style'}</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {STYLES.map(([id, en, fr]) => (
            <button key={id} onClick={() => setStyle(id)}
              style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                background: style === id ? C_T.accent : 'transparent',
                color: style === id ? '#fff' : C_T.muted,
                border: `1px solid ${style === id ? C_T.accent : C_T.border}` }}>
              {isFr ? fr : en}
            </button>
          ))}
        </div>
      </div>
      <CheckOption label={isFr ? 'Ignorer les lignes vides' : 'Skip empty lines'} checked={skipEmpty} onChange={setSkipEmpty} />
      <div>
        <Label>{isFr ? 'Résultat' : 'Result'}</Label>
        <textarea readOnly value={result} rows={8} style={{ ...inp(C_T), resize: 'vertical' }} />
        <div style={{ marginTop: 10 }}><CopyBtn getText={() => result} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── 17. List → Text (Phase 3) ──

function ListToTextTab({ lang }: { lang: string }) {
  const C_T = React.useContext(TextThemeCtx)
  const [text, setText] = React.useState('')
  const isFr = lang === 'fr'

  const result = React.useMemo(() => {
    return text.split(/\r?\n/)
      .map(l => l.replace(/^\s*(?:\d+[.)]|[-*•]|\[[ xX]?\]|- \[[ xX]?\])\s*/, '').replace(/^\s*-\s*\[[ xX]?\]\s*/, ''))
      .join('\n')
  }, [text])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{isFr ? 'Liste (numérotée, à puces, ou cases à cocher)' : 'List (numbered, bulleted, or checkboxes)'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} style={{ ...inp(C_T), resize: 'vertical' }}
          placeholder={isFr ? '1. Premier élément\n- Deuxième élément\n- [ ] Troisième élément' : '1. First item\n- Second item\n- [ ] Third item'} />
      </div>
      <div>
        <Label>{isFr ? 'Résultat' : 'Result'}</Label>
        <textarea readOnly value={result} rows={8} style={{ ...inp(C_T), resize: 'vertical' }} />
        <div style={{ marginTop: 10 }}><CopyBtn getText={() => result} lang={lang} /></div>
      </div>
    </div>
  )
}

// ── Hub shell ──
// Redesigned to match components/pdf/PdfHub.tsx: a left sidebar with
// tools grouped by category, instead of a horizontal tab strip — the
// strip became hard to scan once the tool count grew past ~8.

function TTextToolsHub({ onBack }: { onBack?: () => void }) {
  const { lang } = useLang()
  const { dark } = useDark()
  const C_T = React.useMemo(() => buildPalette(dark), [dark])
  const [tab, setTab] = React.useState('word-counter')
  const [openBadgeInfo, setOpenBadgeInfo] = React.useState<number | null>(null)
  const [sidebarPinned, setSidebarPinned] = React.useState(false)
  const [sidebarHovered, setSidebarHovered] = React.useState(false)
  const sidebarExpanded = sidebarPinned || sidebarHovered
  const cur = TEXT_TABS.find(t => t.id === tab)
  const isFr = lang === 'fr'

  const panels: Record<string, React.ReactNode> = {
    'word-counter':      <WordCounterTab lang={lang} />,
    'case-converter':    <CaseConverterTab lang={lang} />,
    'text-cleaner':      <TextCleanerTab lang={lang} />,
    'find-replace':      <FindReplaceTab lang={lang} />,
    'remove-duplicates': <RemoveDuplicatesTab lang={lang} />,
    'sort-lines':        <SortLinesTab lang={lang} />,
    'text-diff':         <TextDiffTab lang={lang} />,
    'slug-generator':    <SlugGeneratorTab lang={lang} />,
    'text-statistics':   <TextStatisticsTab lang={lang} />,
    'lorem-ipsum':       <LoremIpsumTab lang={lang} />,
    'markdown-to-html':  <MarkdownToHtmlTab lang={lang} />,
    'html-to-markdown':  <HtmlToMarkdownTab lang={lang} />,
    'remove-empty-lines': <RemoveEmptyLinesTab lang={lang} />,
    'remove-spaces':     <RemoveSpacesTab lang={lang} />,
    'text-reverser':     <TextReverserTab lang={lang} />,
    'text-to-list':      <TextToListTab lang={lang} />,
    'list-to-text':      <ListToTextTab lang={lang} />,
  }

  return (
    <TextThemeCtx.Provider value={C_T}>
    <div suppressHydrationWarning className="texttools-shell" style={{
      height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column',
      background: C_T.bg, fontFamily: "'Inter','Segoe UI',sans-serif", color: C_T.text, overflow: 'hidden',
    }}>

      <style>{`
        .tt-scroll { scrollbar-width: thin; scrollbar-color: ${C_T.border} transparent; }
        .tt-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .tt-scroll::-webkit-scrollbar-track { background: transparent; }
        .tt-scroll::-webkit-scrollbar-thumb { background: ${C_T.border}; border-radius: 3px; }
        .tt-scroll::-webkit-scrollbar-thumb:hover { background: ${C_T.muted}; }
        .tool-link.rail-collapsed .tool-link-label { display: none; }
        .texttools-sidebar-pin { opacity: 0; transition: opacity .15s; }
        .texttools-sidebar:hover .texttools-sidebar-pin, .texttools-sidebar-pin.pinned { opacity: 1; }
        @media(max-width:${BP.tablet}px){
          .texttools-shell { height: auto !important; overflow: visible !important; }
          .texttools-layout { flex-direction: column !important; flex: none !important; overflow: visible !important; }
          .texttools-sidebar-spacer { display: none !important; }
          .texttools-sidebar { width: auto !important; height: auto !important; position: static !important; box-shadow: none !important;
            display: flex !important; overflow-x: auto !important; overflow-y: hidden !important; gap: 4px !important;
            border-right: none !important; border-bottom: 1px solid ${C_T.border}; }
          .texttools-sidebar .side-title, .texttools-sidebar .sidebar-heading { display: none !important; }
          .texttools-sidebar .tool-link { white-space: nowrap !important; padding: 8px 12px !important; }
          .texttools-sidebar .tool-link.rail-collapsed .tool-link-label { display: inline !important; }
          .texttools-sidebar .tool-link.rail-collapsed { justify-content: flex-start !important; gap: 10px !important; }
          .texttools-main { overflow: visible !important; }
        }
      `}</style>

      {/* Sidebar + content — each scrolls independently within this row.
          No separate full-width header strip: the "TEXT TOOLS · N tools"
          label lives at the top of the sidebar itself, exactly like
          PdfHub's "PDF TOOLS / 14 tools" — matching that hub's structure
          instead of duplicating the title in a header bar above it. */}
      <div className="texttools-layout" style={{ display: 'flex', flex: 1, minHeight: 0, width: '100%', position: 'relative' }}>

        {/* Spacer reserves the collapsed-rail width so main content doesn't jump when the sidebar overlays open on hover */}
        <div className="texttools-sidebar-spacer" style={{ width: sidebarPinned ? 240 : 64, flexShrink: 0, transition: 'width .16s ease' }} />

        <aside
          className="texttools-sidebar tt-scroll"
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          style={{
            width: sidebarExpanded ? 240 : 64, flexShrink: 0,
            overflowY: sidebarExpanded ? 'auto' : 'hidden', overflowX: 'hidden',
            borderRight: `1px solid ${C_T.border}`,
            padding: sidebarExpanded ? '20px 12px' : '20px 8px',
            position: 'absolute', top: 0, left: 0, bottom: 0, zIndex: 50,
            background: C_T.card,
            transition: 'width .16s ease, padding .16s ease',
            boxShadow: sidebarHovered && !sidebarPinned ? '8px 0 24px rgba(0,0,0,0.35)' : 'none',
          }}
        >
          <div className="sidebar-heading" style={{ padding: sidebarExpanded ? '4px 10px 16px' : '4px 0 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 4 }}>
            <div style={{ minWidth: 0 }}>
              {onBack && sidebarExpanded && (
                <button onClick={onBack} style={{ background: 'transparent', color: C_T.muted, border: 'none',
                  padding: 0, marginBottom: 10, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                  ← CHRONOS
                </button>
              )}
              {sidebarExpanded ? (
                <>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C_T.accent, letterSpacing: '-0.3px' }}>
                    {isFr ? 'OUTILS TEXTE' : 'TEXT TOOLS'}
                  </div>
                  <div style={{ fontSize: 12, color: C_T.muted, marginTop: 2 }}>
                    {TEXT_TABS.length} {isFr ? 'outils' : 'tools'}
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 15, fontWeight: 800, color: C_T.accent, textAlign: 'center' }}>T</div>
              )}
            </div>
            {sidebarExpanded && (
              <button
                type="button"
                className={`texttools-sidebar-pin${sidebarPinned ? ' pinned' : ''}`}
                onClick={() => setSidebarPinned(p => !p)}
                title={sidebarPinned
                  ? (isFr ? 'Détacher la barre latérale' : 'Unpin sidebar')
                  : (isFr ? 'Épingler la barre latérale' : 'Pin sidebar')}
                aria-pressed={sidebarPinned}
                style={{
                  flexShrink: 0, width: 26, height: 26, borderRadius: 7,
                  border: `1px solid ${C_T.border}`, cursor: 'pointer',
                  background: sidebarPinned ? `${C_T.accent}18` : 'transparent',
                  color: sidebarPinned ? C_T.accent : C_T.muted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
                }}
              >
                📌
              </button>
            )}
          </div>
          {TEXT_CATEGORIES.map(cat => (
            <React.Fragment key={cat.en}>
              {sidebarExpanded && (
                <div className="side-title" style={{ fontSize: 10.5, color: C_T.muted, textTransform: 'uppercase',
                  fontWeight: 800, letterSpacing: '.06em', padding: '10px 10px 6px' }}>
                  {isFr ? cat.fr : cat.en}
                </div>
              )}
              {cat.tools.map(toolId => {
                const t = TEXT_TABS.find(x => x.id === toolId)
                if (!t) return null
                const active = tab === toolId
                return (
                  <button
                    key={toolId}
                    className={`tool-link${!sidebarExpanded ? ' rail-collapsed' : ''}`}
                    onClick={() => setTab(toolId)}
                    title={!sidebarExpanded ? (isFr ? t.fr : t.en) : undefined}
                    style={{
                      display: 'flex', alignItems: 'center', gap: sidebarExpanded ? 10 : 0, width: '100%',
                      justifyContent: sidebarExpanded ? 'flex-start' : 'center',
                      padding: sidebarExpanded ? '10px 10px' : '10px 0', borderRadius: 9, margin: '2px 0',
                      background: active ? `${C_T.accent}18` : 'transparent',
                      border: 'none', borderLeft: active ? `2px solid ${C_T.accent}` : '2px solid transparent',
                      color: active ? C_T.accent : C_T.muted,
                      fontSize: 13, fontWeight: active ? 700 : 500, cursor: 'pointer', textAlign: 'left',
                      transition: 'all .15s',
                    }}>
                    <Icon name={t.icon} size={16} style={{ flexShrink: 0 }} />
                    <span className="tool-link-label">{isFr ? t.fr : t.en}</span>
                  </button>
                )
              })}
            </React.Fragment>
          ))}
        </aside>

        <main className="texttools-main tt-scroll" style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '32px 32px 64px' }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{ fontSize: 12, color: C_T.muted, marginBottom: 12 }}>
            CHRONOS / {isFr ? 'Outils Texte' : 'Text Tools'} / <span style={{ color: C_T.text, fontWeight: 600 }}>{isFr ? cur?.fr : cur?.en}</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.06em', marginBottom: 10 }}>
            <span style={{ color: C_T.accent }}>{isFr ? 'TEXTE' : 'TEXT'}</span>
            <span style={{ color: C_T.muted }}> / </span>
            <span style={{ color: C_T.text }}>{(isFr ? cur?.fr : cur?.en)?.toUpperCase()}</span>
          </div>
          <div style={{ marginBottom: 22 }}>
            <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0, lineHeight: 1.15, letterSpacing: '-0.5px' }}>
              {isFr ? cur?.fr : cur?.en}
            </h1>
            <p style={{ color: C_T.muted, fontSize: 15, margin: '8px 0 0' }}>
              {isFr ? cur?.frDesc : cur?.enDesc}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 24 }}>
            {[
              { icon: 'lock', en: '100% Private', fr: '100% Privé', enSub: 'Processed in your browser', frSub: 'Traité dans votre navigateur',
                enInfo: "Your text is processed locally with client-side JavaScript. It's never uploaded to a server or stored anywhere — everything stays in your browser tab.",
                frInfo: "Votre texte est traité localement en JavaScript côté client. Il n'est jamais envoyé à un serveur ni stocké nulle part — tout reste dans votre navigateur." },
              { icon: 'bolt', en: 'Instant', fr: 'Instantané', enSub: 'No upload, no waiting', frSub: 'Sans envoi, sans attente',
                enInfo: "Since there's no file upload or server round-trip, results update instantly as you type or paste.",
                frInfo: "Comme il n'y a ni envoi de fichier ni aller-retour vers un serveur, le résultat se met à jour instantanément pendant que vous tapez ou collez." },
              { icon: 'edit', en: 'Easy to Use', fr: 'Facile à utiliser', enSub: 'Just type or paste', frSub: 'Il suffit de taper ou coller',
                enInfo: "No sign-up, no settings to configure. Just type or paste your text into the box and the tool does the rest.",
                frInfo: "Pas d'inscription, pas de réglage à configurer. Il suffit de taper ou coller votre texte dans la zone, l'outil fait le reste." },
            ].map((f, i) => {
              const open = openBadgeInfo === i
              return (
                <div key={f.en} style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setOpenBadgeInfo(o => o === i ? null : i)}
                    aria-expanded={open}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
                      background: 'transparent', border: 'none', padding: 0, margin: 0,
                      cursor: 'pointer', font: 'inherit', color: 'inherit', appearance: 'none',
                      WebkitAppearance: 'none', borderRadius: 0,
                    }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: 9, border: `1px solid ${C_T.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: C_T.accent, flexShrink: 0 }}>
                      <Icon name={f.icon} size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: C_T.text }}>{isFr ? f.fr : f.en}</div>
                      <div style={{ fontSize: 11, color: C_T.muted }}>{isFr ? f.frSub : f.enSub}</div>
                    </div>
                  </button>
                  {open && (
                    <>
                      <div onClick={() => setOpenBadgeInfo(null)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                      <div role="dialog" style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, width: 260, zIndex: 41,
                        border: `1px solid ${C_T.border}`, borderRadius: 14, background: C_T.card,
                        boxShadow: '0 12px 32px rgba(0,0,0,0.35)', padding: 16 }}>
                        <b style={{ fontSize: 12, color: C_T.text, display: 'block', marginBottom: 6 }}>
                          {isFr ? f.fr : f.en} — {isFr ? f.frSub : f.enSub}
                        </b>
                        <p style={{ fontSize: 11, lineHeight: 1.6, color: C_T.muted, margin: 0 }}>
                          {isFr ? f.frInfo : f.enInfo}
                        </p>
                        <button type="button" onClick={() => setOpenBadgeInfo(null)}
                          style={{ marginTop: 12, fontSize: 10, color: C_T.muted, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                          {isFr ? 'Fermer' : 'Close'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
          <div style={{ background: C_T.card, border: `1px solid ${C_T.border}`, borderRadius: 16, padding: 24 }}>
            {panels[tab]}
          </div>
        </div>
        </main>

      </div>

    </div>
    </TextThemeCtx.Provider>
  )
}

export default TTextToolsHub