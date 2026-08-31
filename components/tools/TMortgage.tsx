'use client'

import { useState, useEffect } from 'react'
import { useLang } from '../../lib/hooks/useLang'

export default function TMortgage() {
  const { lang } = useLang()
  const [price, setPrice]     = useState('')
  const [down, setDown]       = useState('')
  const [rate, setRate]       = useState('')
  const [years, setYears]     = useState('30')
  const [result, setResult]   = useState<{ monthly: number; total: number; interest: number } | null>(null)

  useEffect(() => {
    const p = parseFloat(price) - parseFloat(down || '0')
    const r = parseFloat(rate) / 100 / 12
    const n = parseFloat(years) * 12
    if (p > 0 && r > 0 && n > 0) {
      const monthly = p * (r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1)
      const total = monthly * n
      setResult({
        monthly: Math.round(monthly),
        total: Math.round(total),
        interest: Math.round(total - p),
      })
    } else setResult(null)
  }, [price, down, rate, years])

  const blue = '#2563EB'

  const Inp = ({ label, value, onChange, placeholder, unit }: { label: string, value: string, onChange: (v: string) => void, placeholder: string, unit?: string }) => (
    <div style={{ flex: 1 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label} {unit && <span style={{ color: '#94A3B8' }}>({unit})</span>}
      </label>
      <input type="number" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', padding: '12px 16px', borderRadius: 10, fontSize: 16, border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }} />
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Inp label={lang === 'fr' ? 'Prix du bien' : 'Home Price'} value={price} onChange={setPrice} placeholder="300000" unit="$" />
        <Inp label={lang === 'fr' ? 'Apport' : 'Down Payment'} value={down} onChange={setDown} placeholder="60000" unit="$" />
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Inp label={lang === 'fr' ? 'Taux annuel' : 'Annual Rate'} value={rate} onChange={setRate} placeholder="6.5" unit="%" />
        <Inp label={lang === 'fr' ? 'Durée' : 'Term'} value={years} onChange={setYears} placeholder="30" unit={lang === 'fr' ? 'ans' : 'yrs'} />
      </div>

      {result ? (
        <div style={{ background: `${blue}10`, border: `2px solid ${blue}`, borderRadius: 14, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#64748B', marginBottom: 4 }}>{lang === 'fr' ? 'Mensualité' : 'Monthly Payment'}</div>
          <div style={{ fontSize: 52, fontWeight: 800, color: blue, lineHeight: 1, marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>
            ${result.monthly.toLocaleString()}
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600 }}>
              💰 {lang === 'fr' ? 'Total' : 'Total'}: ${result.total.toLocaleString()}
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600 }}>
              📈 {lang === 'fr' ? 'Intérêts' : 'Interest'}: ${result.interest.toLocaleString()}
            </div>
          </div>
          <button onClick={() => navigator.clipboard?.writeText(`${lang === 'fr' ? 'Mensualité' : 'Monthly'}: $${result.monthly.toLocaleString()}`)}
            style={{ marginTop: 16, padding: '8px 20px', background: blue, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            {lang === 'fr' ? '📋 Copier' : '📋 Copy'}
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 14, padding: 32, border: '1px dashed #E2E8F0', borderRadius: 14 }}>
          {lang === 'fr' ? '👆 Remplissez les champs pour calculer' : '👆 Fill in the fields to calculate'}
        </div>
      )}
    </div>
  )
}
