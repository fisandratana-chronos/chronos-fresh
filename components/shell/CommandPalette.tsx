'use client'

// ── components/shell/CommandPalette.tsx ────────────────────────
// Ctrl+K command palette — self-contained, uses our TOOLS array
// from lib/tools.ts (no legacy searchIndex needed).

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { useLang } from '../../lib/hooks/useLang'
import { TOOLS, Tool } from '../../lib/tools'

// ── Simple fuzzySearch (no pre-built index needed) ─────────────
function fuzzySearch(query: string, tools: Tool[]): Tool[] {
  const q = query.toLowerCase().trim()
  if (!q) return tools

  return tools
    .map(tool => {
      let score = 0
      const label = tool.label.toLowerCase()
      const frLabel = tool.frLabel.toLowerCase()

      if (label === q || frLabel === q)           score += 100
      if (label.startsWith(q) || frLabel.startsWith(q)) score += 60
      if (label.includes(q) || frLabel.includes(q))     score += 30
      tool.keywords.forEach(k => {
        if (k.toLowerCase().includes(q)) score += 15
      })
      return { tool, score }
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(x => x.tool)
}

// ── Quick actions (navigate to a hub directly) ─────────────────
const QUICK_ACTIONS = [
  { id: '__calc',    name: 'Smart Calculator',  frName: 'Calculatrice',   icon: '🧮', href: '/tools/smart-calculator' },
  { id: '__pdf',     name: 'PDF Tools',          frName: 'Outils PDF',     icon: '📄', href: '/tools/pdf-hub' },
  { id: '__network', name: 'Network Hub',        frName: 'Hub Réseau',     icon: '📡', href: '/tools/network-hub' },
  { id: '__bmi',     name: 'BMI Calculator',     frName: 'Calcul IMC',     icon: '⚖️', href: '/tools/bmi-calculator' },
  { id: '__merge',   name: 'Merge PDF',           frName: 'Fusionner PDF',  icon: '📑', href: '/tools/merge-pdf' },
  { id: '__ip',      name: 'IP Lookup',           frName: 'Recherche IP',   icon: '🌐', href: '/tools/ip-lookup' },
]

// ── CommandPalette component ───────────────────────────────────
interface Props {
  open: boolean
  onClose: () => void
  dark?: boolean
}

export default function CommandPalette({ open, onClose, dark = false }: Props) {
  const { lang, t } = useLang()
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIdx(0)
    }
  }, [open])

  // Search results
  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuzzySearch(query, TOOLS).slice(0, 8)
  }, [query])

  // Display items: search results OR quick actions
  const displayItems = useMemo(() =>
    query.trim()
      ? results.map(t => ({ id: t.id, name: lang === 'fr' ? t.frLabel : t.label, icon: t.icon, href: `/tools/${t.slug.replace(/^\//, '')}`, _type: 'tool' as const }))
      : QUICK_ACTIONS.map(a => ({ ...a, name: lang === 'fr' ? a.frName : a.name, _type: 'action' as const }))
  , [query, results, lang])

  // Reset selection when items change
  useEffect(() => { setSelectedIdx(0) }, [query])

  // Handle selection
  const handleSelect = useCallback((item: typeof displayItems[0]) => {
    onClose()
    window.location.href = item.href
  }, [onClose])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, displayItems.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)) }
      if (e.key === 'Enter')     { e.preventDefault(); if (displayItems[selectedIdx]) handleSelect(displayItems[selectedIdx]) }
      if (e.key === 'Escape')    { onClose() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, displayItems, selectedIdx, handleSelect, onClose])

  if (!open) return null

  const bg   = dark ? '#1E293B' : '#fff'
  const text = dark ? '#F1F5F9' : '#0F172A'
  const sub  = dark ? '#64748B' : '#94A3B8'
  const bdr  = dark ? '#334155' : '#F1F5F9'

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: 'clamp(60px, 12vh, 140px)',
      }}
    >
      <style>{`
        @keyframes cpSlide { from { opacity:0; transform:translateY(-12px) scale(0.98); } to { opacity:1; transform:none; } }
      `}</style>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(640px, calc(100vw - 32px))',
          background: bg, borderRadius: 16,
          boxShadow: dark
            ? '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)'
            : '0 24px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
          overflow: 'hidden',
          animation: 'cpSlide 0.18s cubic-bezier(.4,0,.2,1)',
        }}
      >
        {/* Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: `1px solid ${bdr}` }}>
          <span style={{ fontSize: 18, opacity: 0.5 }}>🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={lang === 'fr' ? 'Rechercher un outil…' : 'Search tools…'}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 17, fontWeight: 500, color: text, fontFamily: 'inherit',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: sub }}>✕</button>
          )}
          <kbd style={{ background: dark ? '#0F172A' : '#F8FAFC', border: `1px solid ${bdr}`, borderRadius: 6, padding: '3px 8px', fontSize: 11, color: sub, fontFamily: 'monospace' }}>ESC</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 420, overflowY: 'auto' }}>
          {displayItems.length > 0 && (
            <div style={{ padding: '10px 20px 4px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: sub }}>
              {query.trim()
                ? `${results.length} ${lang === 'fr' ? 'résultat(s)' : 'result(s)'}`
                : lang === 'fr' ? 'Accès rapide' : 'Quick access'}
            </div>
          )}

          {displayItems.map((item, i) => {
            const selected = i === selectedIdx
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIdx(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                  padding: '11px 20px', cursor: 'pointer', textAlign: 'left',
                  background: selected ? (dark ? '#2563EB22' : '#EFF6FF') : 'transparent',
                  borderLeft: `3px solid ${selected ? '#2563EB' : 'transparent'}`,
                  border: 'none', borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                  transition: 'background 0.1s',
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: dark ? '#0F172A' : '#F1F5F9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: text }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: sub, marginTop: 1 }}>
                    {item._type === 'action'
                      ? (lang === 'fr' ? 'Accès rapide' : 'Quick action')
                      : 'Tool'}
                  </div>
                </div>
                <span style={{ fontSize: 12, color: selected ? '#2563EB' : bdr, fontWeight: 700 }}>↵</span>
              </button>
            )
          })}

          {query.trim() && results.length === 0 && (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: sub }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                {lang === 'fr' ? `Aucun résultat pour "${query}"` : `No results for "${query}"`}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${bdr}`, padding: '10px 20px', display: 'flex', gap: 20, alignItems: 'center' }}>
          {[['↑↓', lang === 'fr' ? 'Naviguer' : 'Navigate'], ['↵', lang === 'fr' ? 'Ouvrir' : 'Open'], ['esc', lang === 'fr' ? 'Fermer' : 'Close']].map(([key, label]) => (
            <span key={key} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: sub }}>
              <kbd style={{ background: dark ? '#0F172A' : '#F8FAFC', border: `1px solid ${bdr}`, borderRadius: 4, padding: '2px 6px', fontFamily: 'monospace', fontSize: 10 }}>{key}</kbd>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
