'use client'

// ── components/developer/TDeveloperHub.tsx ────────────────────
// 11 developer tool tabs — all in-browser, no dependencies.
// Tabs: JSON Formatter, JSON Validator, Base64 Encoder, Base64 Decoder,
//       URL Encoder, URL Decoder, Regex Tester, HTML Formatter,
//       CSS Minifier, JS Minifier, Word Counter

import React from 'react'
import { useLang } from '../../lib/hooks/useLang'

// ── Theme ──

const D_ACCENT = '#A78BFA' // violet — distinct from PDF red & Converter cyan

const D_T = {
  bg:      '#0F172A',
  card:    '#1E293B',
  border:  '#334155',
  accent:  D_ACCENT,
  text:    '#F1F5F9',
  muted:   '#94A3B8',
  success: '#22C55E',
  err:     '#EF4444',
  warn:    '#F59E0B',
}

// ── Tab config ──

const DEV_TABS = [
  { id: 'json-formatter',      icon: '🗂️',  en: 'JSON Formatter',   fr: 'Formateur JSON',      enDesc: 'Beautify & format JSON',                    frDesc: 'Formater et embellir du JSON' },
  { id: 'json-validator',      icon: '✅',  en: 'JSON Validator',   fr: 'Validateur JSON',     enDesc: 'Validate JSON syntax',                      frDesc: 'Valider la syntaxe JSON' },
  { id: 'base64-encoder',      icon: '🔐',  en: 'Base64 Encoder',   fr: 'Encodeur Base64',     enDesc: 'Encode text or files to Base64',             frDesc: 'Encoder du texte ou fichiers en Base64' },
  { id: 'base64-decoder',      icon: '🔓',  en: 'Base64 Decoder',   fr: 'Décodeur Base64',     enDesc: 'Decode Base64 to text',                     frDesc: 'Décoder Base64 en texte' },
  { id: 'url-encoder',         icon: '🔗',  en: 'URL Encoder',      fr: 'Encodeur URL',        enDesc: 'Encode URLs & special characters',           frDesc: 'Encoder les URLs et caractères spéciaux' },
  { id: 'url-decoder',         icon: '🔀',  en: 'URL Decoder',      fr: 'Décodeur URL',        enDesc: 'Decode percent-encoded URLs',               frDesc: 'Décoder les URLs encodées en pourcentage' },
  { id: 'regex-tester',        icon: '🔍',  en: 'Regex Tester',     fr: 'Testeur Regex',       enDesc: 'Test regular expressions live',             frDesc: 'Tester les expressions régulières en direct' },
  { id: 'html-formatter',      icon: '🌐',  en: 'HTML Formatter',   fr: 'Formateur HTML',      enDesc: 'Beautify & indent HTML code',               frDesc: 'Formater et indenter du code HTML' },
  { id: 'css-minifier',        icon: '🎨',  en: 'CSS Minifier',     fr: 'Minifieur CSS',       enDesc: 'Minify CSS to reduce file size',            frDesc: 'Minifier le CSS pour réduire la taille' },
  { id: 'javascript-minifier', icon: '⚡',  en: 'JS Minifier',      fr: 'Minifieur JS',        enDesc: 'Minify JavaScript code',                    frDesc: 'Minifier le code JavaScript' },
  { id: 'word-counter',        icon: '📝',  en: 'Word Counter',     fr: 'Compteur de Mots',   enDesc: 'Count words, characters & sentences',       frDesc: 'Compter les mots, caractères et phrases' },
]

// ── Shared helpers ──

const monoInp = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 13,
  border: `1px solid ${D_T.border}`, background: '#0F172A', color: D_T.text,
  outline: 'none', boxSizing: 'border-box', fontFamily: "'Fira Code','Cascadia Code',monospace",
  resize: 'vertical', ...extra,
})

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 700, color: D_T.muted, textTransform: 'uppercase',
      letterSpacing: '0.06em', marginBottom: 6 }}>
      {children}
    </div>
  )
}

function StatusBox({ ok, message }: { ok: boolean; message: string }) {
  const color = ok ? D_T.success : D_T.err
  return (
    <div style={{ background: `${color}15`, border: `1px solid ${color}44`, borderRadius: 10,
      padding: '10px 14px', fontSize: 13, color, fontWeight: 600 }}>
      {ok ? '✅' : '❌'} {message}
    </div>
  )
}

function CopyBtn({ text, lang }: { text: string; lang: string }) {
  const [copied, setCopied] = React.useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button onClick={copy} style={{ padding: '7px 16px', background: copied ? D_T.success : D_T.accent,
      color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
      transition: 'background 0.2s' }}>
      {copied ? '✅ Copied!' : `📋 ${lang === 'fr' ? 'Copier' : 'Copy'}`}
    </button>
  )
}

function OutputArea({ value, lang }: { value: string; lang: string }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <Label>{lang === 'fr' ? 'Résultat' : 'Output'}</Label>
        {value && <CopyBtn text={value} lang={lang} />}
      </div>
      <textarea readOnly value={value} rows={8} style={monoInp({ background: '#0a1120', color: D_T.accent })} />
    </div>
  )
}

function RunBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{ background: D_T.accent, color: '#fff', border: 'none',
      borderRadius: 10, padding: '11px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start' }}>
      {children}
    </button>
  )
}

// ── JSON Formatter ──

function JsonFormatterTab({ lang }: { lang: string }) {
  const [input, setInput] = React.useState('{"name":"CHRONOS","tools":10,"free":true}')
  const [output, setOutput] = React.useState('')
  const [indent, setIndent] = React.useState(2)
  const [status, setStatus] = React.useState<{ ok: boolean; msg: string } | null>(null)

  const run = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setStatus({ ok: true, msg: lang === 'fr' ? 'JSON valide et formaté !' : 'Valid JSON — formatted!' })
    } catch (e: any) {
      setOutput('')
      setStatus({ ok: false, msg: e.message })
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <Label>{lang === 'fr' ? 'JSON brut' : 'Raw JSON'}</Label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={6} style={monoInp()} />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Label>{lang === 'fr' ? 'Indentation' : 'Indent size'}</Label>
        {[2, 4].map(n => (
          <button key={n} onClick={() => setIndent(n)}
            style={{ padding: '5px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: indent === n ? D_T.accent : 'transparent',
              color: indent === n ? '#fff' : D_T.muted,
              border: `1px solid ${indent === n ? D_T.accent : D_T.border}` }}>
            {n}
          </button>
        ))}
        <RunBtn onClick={run}>🗂️ {lang === 'fr' ? 'Formater' : 'Format'}</RunBtn>
      </div>
      {status && <StatusBox ok={status.ok} message={status.msg} />}
      {output && <OutputArea value={output} lang={lang} />}
    </div>
  )
}

// ── JSON Validator ──

function JsonValidatorTab({ lang }: { lang: string }) {
  const [input, setInput] = React.useState('')
  const [status, setStatus] = React.useState<{ ok: boolean; msg: string } | null>(null)
  const [stats, setStats] = React.useState<{ keys: number; depth: number } | null>(null)

  const countKeys = (obj: any): number => {
  if (typeof obj !== 'object' || obj === null) return 0
  let total = Object.keys(obj).length
  for (const v of Object.values(obj)) {
    total += countKeys(v)
  }
  return total
}
  const maxDepth = (obj: any, d = 0): number => {
    if (typeof obj !== 'object' || obj === null) return d
    return Math.max(...Object.values(obj).map(v => maxDepth(v, d + 1)), d)
  }

  const run = () => {
    if (!input.trim()) { setStatus(null); setStats(null); return }
    try {
      const parsed = JSON.parse(input)
      setStatus({ ok: true, msg: lang === 'fr' ? 'JSON valide ✓' : 'Valid JSON ✓' })
      setStats({ keys: countKeys(parsed), depth: maxDepth(parsed) })
    } catch (e: any) {
      setStatus({ ok: false, msg: e.message })
      setStats(null)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <Label>{lang === 'fr' ? 'JSON à valider' : 'JSON to validate'}</Label>
        <textarea value={input} onChange={e => { setInput(e.target.value); setStatus(null); setStats(null) }}
          rows={8} style={monoInp()} placeholder='{"key": "value"}' />
      </div>
      <RunBtn onClick={run}>✅ {lang === 'fr' ? 'Valider' : 'Validate'}</RunBtn>
      {status && <StatusBox ok={status.ok} message={status.msg} />}
      {stats && (
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { label: lang === 'fr' ? 'Clés totales' : 'Total keys', value: stats.keys },
            { label: lang === 'fr' ? 'Profondeur max' : 'Max depth', value: stats.depth },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: `${D_T.accent}10`, border: `1px solid ${D_T.accent}44`,
              borderRadius: 10, padding: '12px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: D_T.accent }}>{s.value}</div>
              <div style={{ fontSize: 12, color: D_T.muted, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Base64 Encoder ──

function Base64EncoderTab({ lang }: { lang: string }) {
  const [input, setInput] = React.useState('')
  const [output, setOutput] = React.useState('')

  const run = () => {
    try { setOutput(btoa(unescape(encodeURIComponent(input)))) }
    catch { setOutput(btoa(input)) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <Label>{lang === 'fr' ? 'Texte à encoder' : 'Text to encode'}</Label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={5}
          style={monoInp()} placeholder="Hello, World!" />
      </div>
      <RunBtn onClick={run}>🔐 {lang === 'fr' ? 'Encoder' : 'Encode'}</RunBtn>
      {output && <OutputArea value={output} lang={lang} />}
    </div>
  )
}

// ── Base64 Decoder ──

function Base64DecoderTab({ lang }: { lang: string }) {
  const [input, setInput] = React.useState('')
  const [output, setOutput] = React.useState('')
  const [status, setStatus] = React.useState<{ ok: boolean; msg: string } | null>(null)

  const run = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input.trim()))))
      setStatus(null)
    } catch (e: any) {
      setOutput('')
      setStatus({ ok: false, msg: lang === 'fr' ? 'Base64 invalide' : 'Invalid Base64 string' })
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <Label>{lang === 'fr' ? 'Chaîne Base64' : 'Base64 string'}</Label>
        <textarea value={input} onChange={e => { setInput(e.target.value); setStatus(null) }} rows={5}
          style={monoInp()} placeholder="SGVsbG8sIFdvcmxkIQ==" />
      </div>
      <RunBtn onClick={run}>🔓 {lang === 'fr' ? 'Décoder' : 'Decode'}</RunBtn>
      {status && <StatusBox ok={status.ok} message={status.msg} />}
      {output && <OutputArea value={output} lang={lang} />}
    </div>
  )
}

// ── URL Encoder ──

function UrlEncoderTab({ lang }: { lang: string }) {
  const [input, setInput] = React.useState('')
  const [output, setOutput] = React.useState('')

  const run = () => setOutput(encodeURIComponent(input))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <Label>{lang === 'fr' ? 'Texte / URL à encoder' : 'Text / URL to encode'}</Label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
          style={monoInp()} placeholder="https://example.com/search?q=hello world&lang=fr" />
      </div>
      <RunBtn onClick={run}>🔗 {lang === 'fr' ? 'Encoder' : 'Encode'}</RunBtn>
      {output && <OutputArea value={output} lang={lang} />}
    </div>
  )
}

// ── URL Decoder ──

function UrlDecoderTab({ lang }: { lang: string }) {
  const [input, setInput] = React.useState('')
  const [output, setOutput] = React.useState('')
  const [status, setStatus] = React.useState<{ ok: boolean; msg: string } | null>(null)

  const run = () => {
    try {
      setOutput(decodeURIComponent(input))
      setStatus(null)
    } catch (e: any) {
      setOutput('')
      setStatus({ ok: false, msg: lang === 'fr' ? 'URL invalide' : 'Invalid encoded URL' })
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <Label>{lang === 'fr' ? 'URL encodée' : 'Encoded URL'}</Label>
        <textarea value={input} onChange={e => { setInput(e.target.value); setStatus(null) }} rows={4}
          style={monoInp()} placeholder="https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world" />
      </div>
      <RunBtn onClick={run}>🔀 {lang === 'fr' ? 'Décoder' : 'Decode'}</RunBtn>
      {status && <StatusBox ok={status.ok} message={status.msg} />}
      {output && <OutputArea value={output} lang={lang} />}
    </div>
  )
}

// ── Regex Tester ──

function RegexTesterTab({ lang }: { lang: string }) {
  const [pattern, setPattern] = React.useState('\\b\\w+@\\w+\\.\\w+\\b')
  const [flags, setFlags]     = React.useState('gi')
  const [text, setText]       = React.useState('Contact us at hello@chronos.app or support@test.com')
  const [matches, setMatches] = React.useState<string[]>([])
  const [status, setStatus]   = React.useState<{ ok: boolean; msg: string } | null>(null)

  const run = () => {
    try {
      const re = new RegExp(pattern, flags)
      const found = [...text.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags+'g'))].map(m => m[0])
      setMatches(found)
      setStatus({ ok: true, msg: `${found.length} ${lang === 'fr' ? 'correspondance(s)' : 'match(es)'}` })
    } catch (e: any) {
      setMatches([])
      setStatus({ ok: false, msg: e.message })
    }
  }

  const FLAG_LIST = ['g','i','m','s','u']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <Label>{lang === 'fr' ? 'Expression régulière' : 'Pattern'}</Label>
          <input value={pattern} onChange={e => setPattern(e.target.value)}
            style={{ ...monoInp(), resize: undefined }} />
        </div>
        <div style={{ flex: '0 1 100px', minWidth: 80 }}>
          <Label>Flags</Label>
          <input value={flags} onChange={e => setFlags(e.target.value)} maxLength={6}
            style={{ ...monoInp(), resize: undefined }} placeholder="gi" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {FLAG_LIST.map(f => (
          <button key={f} onClick={() => setFlags(prev => prev.includes(f) ? prev.replace(f,'') : prev+f)}
            style={{ padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer',
              background: flags.includes(f) ? D_T.accent : 'transparent',
              color: flags.includes(f) ? '#fff' : D_T.muted,
              border: `1px solid ${flags.includes(f) ? D_T.accent : D_T.border}` }}>
            {f}
          </button>
        ))}
      </div>
      <div>
        <Label>{lang === 'fr' ? 'Texte de test' : 'Test string'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={4} style={monoInp()} />
      </div>
      <RunBtn onClick={run}>🔍 {lang === 'fr' ? 'Tester' : 'Test'}</RunBtn>
      {status && <StatusBox ok={status.ok} message={status.msg} />}
      {matches.length > 0 && (
        <div>
          <Label>{lang === 'fr' ? 'Correspondances' : 'Matches'}</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {matches.map((m, i) => (
              <span key={i} style={{ background: `${D_T.accent}20`, border: `1px solid ${D_T.accent}44`,
                borderRadius: 6, padding: '3px 10px', fontSize: 13, color: D_T.accent, fontFamily: 'monospace' }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── HTML Formatter ──

function HtmlFormatterTab({ lang }: { lang: string }) {
  const [input, setInput] = React.useState('<div><p>Hello <strong>World</strong></p><ul><li>Item 1</li><li>Item 2</li></ul></div>')
  const [output, setOutput] = React.useState('')

  const format = (html: string, indent = 2): string => {
    const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'])
    let level = 0
    const pad = () => ' '.repeat(level * indent)
    return html
      .replace(/>\s+</g, '><')
      .replace(/(<\/?[^>]+>)/g, '$1\n')
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const isClose = /^<\//.test(line)
        const isVoid  = VOID.has((line.match(/<(\w+)/) || [])[1] ?? '')
        const isSelf  = line.endsWith('/>') || isVoid
        if (isClose) level = Math.max(0, level - 1)
        const result = pad() + line
        if (!isClose && !isSelf && line.startsWith('<') && !line.startsWith('</')) level++
        return result
      })
      .join('\n')
      .trim()
  }

  const run = () => setOutput(format(input))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <Label>{lang === 'fr' ? 'HTML brut' : 'Raw HTML'}</Label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={5} style={monoInp()} />
      </div>
      <RunBtn onClick={run}>🌐 {lang === 'fr' ? 'Formater' : 'Format'}</RunBtn>
      {output && <OutputArea value={output} lang={lang} />}
    </div>
  )
}

// ── CSS Minifier ──

function CssMinifierTab({ lang }: { lang: string }) {
  const [input, setInput] = React.useState(`.container {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding: 24px;\n  background: #fff;\n}`)
  const [output, setOutput] = React.useState('')
  const [saved, setSaved]   = React.useState<number | null>(null)

  const run = () => {
    const mini = input
      .replace(/\/\*[\s\S]*?\*\//g, '')   // remove comments
      .replace(/\s*([{}:;,>~+])\s*/g, '$1') // remove spaces around symbols
      .replace(/\s+/g, ' ')                // collapse whitespace
      .replace(/;\}/g, '}')               // remove last semicolon in block
      .trim()
    setOutput(mini)
    setSaved(Math.round((1 - mini.length / input.length) * 100))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <Label>{lang === 'fr' ? 'CSS à minifier' : 'CSS to minify'}</Label>
        <textarea value={input} onChange={e => { setInput(e.target.value); setOutput(''); setSaved(null) }}
          rows={7} style={monoInp()} />
      </div>
      <RunBtn onClick={run}>🎨 {lang === 'fr' ? 'Minifier' : 'Minify'}</RunBtn>
      {saved !== null && (
        <StatusBox ok={saved >= 0}
          message={saved > 0
            ? `${lang === 'fr' ? 'Réduit de' : 'Reduced by'} ${saved}% (${input.length} → ${output.length} ${lang === 'fr' ? 'caractères' : 'chars'})`
            : `${output.length} ${lang === 'fr' ? 'caractères' : 'chars'}`} />
      )}
      {output && <OutputArea value={output} lang={lang} />}
    </div>
  )
}

// ── JS Minifier ──

function JsMinifierTab({ lang }: { lang: string }) {
  const [input, setInput] = React.useState(`function greet(name) {\n  // Say hello\n  const message = "Hello, " + name + "!";\n  console.log(message);\n  return message;\n}`)
  const [output, setOutput] = React.useState('')
  const [saved, setSaved]   = React.useState<number | null>(null)

  const run = () => {
    const mini = input
      .replace(/\/\/[^\n]*/g, '')          // remove // comments
      .replace(/\/\*[\s\S]*?\*\//g, '')    // remove /* */ comments
      .replace(/\n+/g, ' ')               // collapse newlines
      .replace(/\s*([:=+\-*/%&|^~<>!?,;{}()[\]])\s*/g, '$1') // spaces around operators
      .replace(/\s+/g, ' ')               // collapse spaces
      .trim()
    setOutput(mini)
    setSaved(Math.round((1 - mini.length / input.length) * 100))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <Label>{lang === 'fr' ? 'JavaScript à minifier' : 'JavaScript to minify'}</Label>
        <textarea value={input} onChange={e => { setInput(e.target.value); setOutput(''); setSaved(null) }}
          rows={7} style={monoInp()} />
      </div>
      <div style={{ background: `${D_T.warn}15`, border: `1px solid ${D_T.warn}44`, borderRadius: 10,
        padding: '10px 14px', fontSize: 13, color: D_T.warn }}>
        ℹ️ {lang === 'fr'
          ? 'Minification basique — pour la production, utilisez Terser ou esbuild.'
          : 'Basic minification — for production, use Terser or esbuild.'}
      </div>
      <RunBtn onClick={run}>⚡ {lang === 'fr' ? 'Minifier' : 'Minify'}</RunBtn>
      {saved !== null && (
        <StatusBox ok={saved >= 0}
          message={saved > 0
            ? `${lang === 'fr' ? 'Réduit de' : 'Reduced by'} ${saved}% (${input.length} → ${output.length} ${lang === 'fr' ? 'caractères' : 'chars'})`
            : `${output.length} ${lang === 'fr' ? 'caractères' : 'chars'}`} />
      )}
      {output && <OutputArea value={output} lang={lang} />}
    </div>
  )
}

// ── Word Counter ──

function WordCounterTab({ lang }: { lang: string }) {
  const [text, setText] = React.useState(
    lang === 'fr'
      ? 'CHRONOS est une suite gratuite d\'outils en ligne. Aucune inscription requise.'
      : 'CHRONOS is a free suite of online tools. No sign-up required.'
  )

  const words     = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const chars     = text.length
  const charsNoSp = text.replace(/\s/g, '').length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
  const paragraphs = text.split(/\n{2,}/).filter(p => p.trim()).length
  const readTime  = Math.max(1, Math.ceil(words / 200))

  const STATS = [
    { label: lang === 'fr' ? 'Mots'         : 'Words',           value: words },
    { label: lang === 'fr' ? 'Caractères'   : 'Characters',      value: chars },
    { label: lang === 'fr' ? 'Sans espaces' : 'No spaces',       value: charsNoSp },
    { label: lang === 'fr' ? 'Phrases'      : 'Sentences',       value: sentences },
    { label: lang === 'fr' ? 'Paragraphes'  : 'Paragraphs',      value: paragraphs },
    { label: lang === 'fr' ? 'Lecture (min)': 'Read time (min)', value: readTime },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Label>{lang === 'fr' ? 'Votre texte' : 'Your text'}</Label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} style={{
          width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 14,
          border: `1px solid ${D_T.border}`, background: '#0F172A', color: D_T.text,
          outline: 'none', boxSizing: 'border-box', fontFamily: "'Inter','Segoe UI',sans-serif",
          resize: 'vertical',
        }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: `${D_T.accent}10`, border: `1px solid ${D_T.accent}33`,
            borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: D_T.accent,
              fontFamily: "'Space Grotesk',sans-serif" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: D_T.muted, marginTop: 4, textTransform: 'uppercase',
              letterSpacing: '0.05em' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Hub shell ──

function TDeveloperHub({ onBack }: { onBack?: () => void }) {
  const { lang } = useLang()
  const [tab, setTab] = React.useState('json-formatter')
  const cur = DEV_TABS.find(t => t.id === tab)

  const panels: Record<string, React.ReactNode> = {
    'json-formatter':      <JsonFormatterTab lang={lang} />,
    'json-validator':      <JsonValidatorTab lang={lang} />,
    'base64-encoder':      <Base64EncoderTab lang={lang} />,
    'base64-decoder':      <Base64DecoderTab lang={lang} />,
    'url-encoder':         <UrlEncoderTab lang={lang} />,
    'url-decoder':         <UrlDecoderTab lang={lang} />,
    'regex-tester':        <RegexTesterTab lang={lang} />,
    'html-formatter':      <HtmlFormatterTab lang={lang} />,
    'css-minifier':        <CssMinifierTab lang={lang} />,
    'javascript-minifier': <JsMinifierTab lang={lang} />,
    'word-counter':        <WordCounterTab lang={lang} />,
  }

  return (
    <div style={{ minHeight: '100vh', background: D_T.bg, fontFamily: "'Inter','Segoe UI',sans-serif", color: D_T.text }}>

      {/* Header */}
      <header style={{ background: D_T.card, borderBottom: `1px solid ${D_T.border}`, padding: '0 24px',
        height: 60, display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 100 }}>
        {onBack && (
          <button onClick={onBack} style={{ background: '#10B981', color: '#fff', border: 'none',
            borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
            ← CHRONOS
          </button>
        )}
        <span style={{ fontSize: 20 }}>⚡</span>
        <span style={{ fontWeight: 800, fontSize: 18, color: D_T.accent, letterSpacing: '-0.5px' }}>
          DEVELOPER TOOLS
        </span>
        <span style={{ background: `${D_T.accent}22`, color: D_T.accent, border: `1px solid ${D_T.accent}44`,
          borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700, letterSpacing: '0.5px' }}>
          11 TOOLS
        </span>
        <span style={{ marginLeft: 'auto', background: '#22C55E22', color: '#22C55E',
          border: '1px solid #22C55E44', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
          🔒 100% In-Browser
        </span>
      </header>

      {/* Tab nav */}
      <nav style={{ display: 'flex', overflowX: 'auto', background: D_T.card,
        borderBottom: `1px solid ${D_T.border}`, padding: '0 16px', gap: 2 }}>
        {DEV_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: 'transparent', border: 'none',
            borderBottom: tab === t.id ? `2px solid ${D_T.accent}` : '2px solid transparent',
            color: tab === t.id ? D_T.accent : D_T.muted,
            padding: '14px 14px', cursor: 'pointer',
            fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', transition: 'all 0.15s',
          }}>
            {t.icon} {lang === 'fr' ? t.fr : t.en}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            {cur?.icon} {lang === 'fr' ? cur?.fr : cur?.en}
          </h1>
          <p style={{ color: D_T.muted, fontSize: 14, margin: '6px 0 0' }}>
            {lang === 'fr' ? cur?.frDesc : cur?.enDesc}
          </p>
        </div>
        <div style={{ background: D_T.card, border: `1px solid ${D_T.border}`, borderRadius: 16, padding: 24 }}>
          {panels[tab]}
        </div>
      </main>

    </div>
  )
}

export default TDeveloperHub
