'use client'

import { useState, useEffect } from 'react'
import { useLang } from '../../lib/hooks/useLang'
import { IconCash, IconTrendingUp, IconClipboard, IconPointerClick } from '../shared/Icons'

export default function TEMI() {
  const { lang } = useLang()
  const [amount, setAmount] = useState('')
  const [rate, setRate]     = useState('')
  const [months, setMonths] = useState('')
  const [result, setResult] = useState<{ emi: number; total: number; interest: number } | null>(null)

  useEffect(() => {
    const p = parseFloat(amount)
    const r = parseFloat(rate) / 100 / 12
    const n = parseFloat(months)
    if (p > 0 && r > 0 && n > 0) {
      const emi = p * (r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1)
      const total = emi * n
      setResult({ emi: Math.round(emi), total: Math.round(total), interest: Math.round(total - p) })
    } else setResult(null)
  }, [amount, rate, months])

  const amber = '#F59E0B'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {[
        { label: lang === 'fr' ? 'Montant du prêt' : 'Loan Amount', value: amount, set: setAmount, ph: '10000', unit: '$' },
        { label: lang === 'fr' ? 'Taux annuel' : 'Annual Rate', value: rate, set: setRate, ph: '8.5', unit: '%' },
        { label: lang === 'fr' ? 'Durée' : 'Tenure', value: months, set: setMonths, ph: '24', unit: lang === 'fr' ? 'mois' : 'months' },
      ].map(f => (
        <div key={f.label}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {f.label} <span style={{ color: '#94A3B8' }}>({f.unit})</span>
          </label>
          <input type="number" value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.ph}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 10, fontSize: 16, border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }} />
        </div>
      ))}

      {result ? (
        <div style={{ background: `${amber}10`, border: `2px solid ${amber}`, borderRadius: 14, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#64748B', marginBottom: 4 }}>{lang === 'fr' ? 'Mensualité (EMI)' : 'Monthly EMI'}</div>
          <div style={{ fontSize: 52, fontWeight: 800, color: amber, lineHeight: 1, marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>
            ${result.emi.toLocaleString()}
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <IconCash size={14} /> {lang === 'fr' ? 'Total' : 'Total'}: ${result.total.toLocaleString()}
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <IconTrendingUp size={14} /> {lang === 'fr' ? 'Intérêts' : 'Interest'}: ${result.interest.toLocaleString()}
            </div>
          </div>
          <button onClick={() => navigator.clipboard?.writeText(`EMI: $${result.emi.toLocaleString()}`)}
            style={{ marginTop: 16, padding: '8px 20px', background: amber, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <><IconClipboard size={13} style={{marginRight:6,verticalAlign:-2}} />{lang === 'fr' ? 'Copier' : 'Copy'}</>
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 14, padding: 32, border: '1px dashed #E2E8F0', borderRadius: 14 }}>
          <IconPointerClick size={16} style={{marginBottom:6}} /><br/>{lang === 'fr' ? 'Remplissez les champs pour calculer' : 'Fill in the fields to calculate'}
        </div>
      )}
    </div>
  )
}
