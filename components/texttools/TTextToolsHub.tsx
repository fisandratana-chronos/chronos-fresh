'use client'

// ── components/texttools/TTextToolsHub.tsx ─────────────────────
// 8 text tool tabs (V1) — all in-browser, no dependencies.
// Tabs: Word Counter, Case Converter, Text Cleaner, Find & Replace,
//       Remove Duplicate Lines, Sort Lines, Text Diff, Slug Generator
//
// Pattern mirrors components/converters/TConvertersHub.tsx exactly:
// same theme context approach, same Label/inp helpers, same header
// + tab-nav shell. No SEO content block in this V1 (per decision) —
// that can be added later the same way CONVERTER_SEO_CONTENT was.

import React from 'react'
import { useLang } from '../../lib/hooks/useLang'
import { useDark } from '../../lib/hooks/useDark'
import { DARK, LIGHT } from '../../lib/theme'
import { BP } from '../../lib/breakpoints'
import { Icon, IconClipboard, IconLockClosed } from '../shared/Icons'

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

const TEXT_TABS = [
  { id: 'word-counter',   icon: 'hash',     en: 'Word Counter',          fr: 'Compteur de mots',        enDesc: 'Words, characters, sentences, reading time', frDesc: 'Mots, caractères, phrases, temps de lecture' },
  { id: 'case-converter', icon: 'typography', en: 'Case Converter',      fr: 'Convertisseur de casse',   enDesc: 'UPPERCASE, lowercase, Title Case, and more',  frDesc: 'MAJUSCULE, minuscule, Titre, et plus' },
  { id: 'text-cleaner',   icon: 'sparkle',  en: 'Text Cleaner',          fr: 'Nettoyeur de texte',       enDesc: 'Remove extra spaces, tabs, empty lines',      frDesc: "Supprimer espaces, tabulations, lignes vides" },
  { id: 'find-replace',   icon: 'search',   en: 'Find & Replace',        fr: 'Rechercher et remplacer',  enDesc: 'Search and replace text, with regex support', frDesc: 'Rechercher et remplacer, avec support regex' },
  { id: 'remove-duplicates', icon: 'layers', en: 'Remove Duplicate Lines', fr: 'Supprimer les doublons', enDesc: 'Remove duplicate lines from a list',          frDesc: 'Supprimer les lignes en double' },
  { id: 'sort-lines',     icon: 'sort',     en: 'Sort Lines',            fr: 'Trier les lignes',         enDesc: 'Sort lines alphabetically, numerically, or by length', frDesc: 'Trier par ordre alphabétique, numérique ou par longueur' },
  { id: 'text-diff',      icon: 'exchange', en: 'Text Diff',             fr: 'Comparateur de textes',    enDesc: 'Compare two texts and see what changed',      frDesc: 'Comparer deux textes et voir les différences' },
  { id: 'slug-generator', icon: 'link',     en: 'Slug Generator',        fr: 'Générateur de slug',       enDesc: 'Turn any text into a URL-friendly slug',      frDesc: 'Transformer un texte en slug pour URL' },
]

// ── Shared helpers (same shape as TConvertersHub) ──

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
// Also covers Character Counter, Line Counter, and Sentence Counter
// (merged in per the product decision — not built as separate tabs).

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
// Ported from the existing TextCaseTab in TConvertersHub.tsx, with the
// 3 extra modes from the Text-Tools.docx spec (alternating, inverse).

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
    let lines = text.split(/\r?\n/).filter(l => l.length > 0 || text === '')
    if (text === '') return []
    lines = text.split(/\r?\n/)
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
// Simple line-based LCS diff — good enough for paragraph/line comparisons.
// (A word-level diff is a possible V2 upgrade if needed.)

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
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')     // remove accents
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')                          // remove special chars
      .trim()
      .replace(/[\s_-]+/g, separator)                        // spaces → separator
      .replace(new RegExp(`\\${separator}{2,}`, 'g'), separator) // collapse duplicate separators
      .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '') // trim leading/trailing
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

// ── Hub shell ──
// Simpler than TConvertersHub's shell: no SEO/related-tools side column
// in this V1 (per decision) — just header, tab nav, and the tool panel.
// The two-column SEO layout can be added later by following the same
// pattern as ConverterSeoContent + RelatedConverters in TConvertersHub.

function TTextToolsHub({ onBack }: { onBack?: () => void }) {
  const { lang } = useLang()
  const { dark } = useDark()
  const C_T = React.useMemo(() => buildPalette(dark), [dark])
  const [tab, setTab] = React.useState('word-counter')
  const cur = TEXT_TABS.find(t => t.id === tab)

  const panels: Record<string, React.ReactNode> = {
    'word-counter':      <WordCounterTab lang={lang} />,
    'case-converter':    <CaseConverterTab lang={lang} />,
    'text-cleaner':      <TextCleanerTab lang={lang} />,
    'find-replace':      <FindReplaceTab lang={lang} />,
    'remove-duplicates': <RemoveDuplicatesTab lang={lang} />,
    'sort-lines':        <SortLinesTab lang={lang} />,
    'text-diff':         <TextDiffTab lang={lang} />,
    'slug-generator':    <SlugGeneratorTab lang={lang} />,
  }

  return (
    <TextThemeCtx.Provider value={C_T}>
    <div suppressHydrationWarning style={{ minHeight: '100vh', background: C_T.bg, fontFamily: "'Inter','Segoe UI',sans-serif", color: C_T.text }}>

      <style>{`
        @media(max-width:${BP.tablet}px){
          .texttools-tabs{overflow-x:auto;}
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
        <span style={{ fontWeight: 800, fontSize: 18, color: C_T.accent, letterSpacing: '-0.5px' }}>
          TEXT TOOLS
        </span>
        <span style={{ background: `${C_T.accent}22`, color: C_T.accent, border: `1px solid ${C_T.accent}44`,
          borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700, letterSpacing: '0.5px' }}>
          {TEXT_TABS.length} TOOLS
        </span>
        <span style={{ marginLeft: 'auto', background: `${C_T.success}22`, color: C_T.success,
          border: `1px solid ${C_T.success}44`, borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
          <IconLockClosed size={13} style={{ marginRight: 4, verticalAlign: -2 }} /> 100% In-Browser
        </span>
      </header>

      {/* Tab nav */}
      <nav className="texttools-tabs" style={{ display: 'flex', overflowX: 'auto', background: C_T.card,
        borderBottom: `1px solid ${C_T.border}`, padding: '0 16px', gap: 4 }}>
        {TEXT_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: 'transparent', border: 'none',
            borderBottom: tab === t.id ? `2px solid ${C_T.accent}` : '2px solid transparent',
            color: tab === t.id ? C_T.accent : C_T.muted,
            padding: '14px 16px', cursor: 'pointer',
            fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', transition: 'all 0.15s',
          }}>
            {lang === 'fr' ? t.fr : t.en}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 780, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
            {lang === 'fr' ? cur?.fr : cur?.en}
          </h1>
          <p style={{ color: C_T.muted, fontSize: 14, margin: '6px 0 0' }}>
            {lang === 'fr' ? cur?.frDesc : cur?.enDesc}
          </p>
        </div>
        <div style={{ background: C_T.card, border: `1px solid ${C_T.border}`, borderRadius: 16, padding: 24 }}>
          {panels[tab]}
        </div>
      </main>

    </div>
    </TextThemeCtx.Provider>
  )
}

export default TTextToolsHub
