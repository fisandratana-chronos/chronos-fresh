'use client'

import { useState, useEffect } from 'react'
import { useLang } from '../../lib/hooks/useLang'

const CURRENCIES = [
  { code: 'USD', symbol: '$',  name: 'US Dollar' },
  { code: 'EUR', symbol: '€',  name: 'Euro' },
  { code: 'GBP', symbol: '£',  name: 'British Pound' },
  { code: 'MGA', symbol: 'Ar', name: 'Ariary' },
  { code: 'JPY', symbol: '¥',  name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CNY', symbol: '¥',  name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹',  name: 'Indian Rupee' },
]

// Rates vs USD (static — updated manually or via API later)
const RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, MGA: 4500,
  JPY: 149.5, CAD: 1.36, CHF: 0.89, AUD: 1.53, CNY: 7.24, INR: 83.1,
}

export default function TCurrency() {
  const { lang } = useLang()
  const [amount, setAmount] = useState('1')
  const [from, setFrom]     = useState('USD')
  const [to, setTo]         = useState('EUR')
  const [result, setResult] = useState<number | null>(null)

  useEffect(() => {
    const a = parseFloat(amount)
    if (!a || !RATES[from] || !RATES[to]) { setResult(null); return }
    setResult(Math.round(a / RATES[from] * RATES[to] * 10000) / 10000)
  }, [amount, from, to])

  const cyan = '#06B6D4'
  const sel = { padding: '12px 16px', borderRadius: 10, fontSize: 15, border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none', fontFamily: 'Inter, sans-serif', cursor: 'pointer', width: '100%' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Amount */}
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {lang === 'fr' ? 'Montant' : 'Amount'}
        </label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="1"
          style={{ width: '100%', padding: '12px 16px', borderRadius: 10, fontSize: 16, border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }} />
      </div>

      {/* From / To */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {lang === 'fr' ? 'De' : 'From'}
          </label>
          <select value={from} onChange={e => setFrom(e.target.value)} style={sel}>
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
          </select>
        </div>

        {/* Swap button */}
        <button onClick={() => { setFrom(to); setTo(from) }}
          style={{ marginTop: 24, width: 40, height: 40, borderRadius: '50%', border: '1px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer', fontSize: 18, flexShrink: 0 }}>
          ⇄
        </button>

        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {lang === 'fr' ? 'Vers' : 'To'}
          </label>
          <select value={to} onChange={e => setTo(e.target.value)} style={sel}>
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Result */}
      {result !== null && (
        <div style={{ background: `${cyan}10`, border: `2px solid ${cyan}`, borderRadius: 14, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#64748B', marginBottom: 4 }}>
            {amount} {from} =
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: cyan, lineHeight: 1, marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
            {result.toLocaleString()} {to}
          </div>
          <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
            1 {from} = {(RATES[to]/RATES[from]).toFixed(4)} {to}
          </div>
          <button onClick={() => navigator.clipboard?.writeText(`${amount} ${from} = ${result} ${to}`)}
            style={{ padding: '8px 20px', background: cyan, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            {lang === 'fr' ? '📋 Copier' : '📋 Copy'}
          </button>
        </div>
      )}

    </div>
  )
}
