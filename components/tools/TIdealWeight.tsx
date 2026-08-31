'use client'

import { useState, useEffect } from 'react'
import { useLang } from '../../lib/hooks/useLang'

export default function TIdealWeight() {
  const { lang } = useLang()
  const [height, setHeight] = useState('')
  const [sex, setSex]       = useState<'m' | 'f'>('m')
  const [result, setResult] = useState<{ kg: number; low: number; high: number; lbs: number } | null>(null)

  useEffect(() => {
    const h = parseFloat(height)
    if (!h || h < 100 || h > 250) { setResult(null); return }
    const hIn = h / 2.54
    const base = sex === 'm' ? 50 + 2.3 * (hIn - 60) : 45.5 + 2.3 * (hIn - 60)
    const kg = Math.round(Math.max(base, 0) * 10) / 10
    setResult({ kg, low: Math.round(kg * 0.9 * 10) / 10, high: Math.round(kg * 1.1 * 10) / 10, lbs: Math.round(kg * 2.20462 * 10) / 10 })
  }, [height, sex])

  const green = '#10B981'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Sex toggle */}
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {lang === 'fr' ? 'Sexe' : 'Sex'}
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          {([['m', lang === 'fr' ? '♂ Homme' : '♂ Male'], ['f', lang === 'fr' ? '♀ Femme' : '♀ Female']] as const).map(([v, label]) => (
            <button key={v} onClick={() => setSex(v)} style={{
              flex: 1, padding: '10px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer',
              border: `2px solid ${sex === v ? green : '#E2E8F0'}`,
              background: sex === v ? `${green}10` : '#F8FAFC',
              color: sex === v ? green : '#64748B',
            }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Height input */}
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {lang === 'fr' ? 'Taille' : 'Height'} (cm)
        </label>
        <input
          type="number" value={height} onChange={e => setHeight(e.target.value)}
          placeholder="175" min="100" max="250"
          style={{ width: '100%', padding: '12px 16px', borderRadius: 10, fontSize: 16, border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
        />
      </div>

      {/* Result */}
      {result && (
        <div style={{ background: `${green}10`, border: `2px solid ${green}`, borderRadius: 14, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 56, fontWeight: 800, color: green, lineHeight: 1, marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
            {result.kg} kg
          </div>
          <div style={{ fontSize: 14, color: '#64748B', marginBottom: 16 }}>
            {lang === 'fr' ? 'Poids idéal estimé' : 'Estimated ideal weight'}
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: '10px 20px', fontSize: 14, color: '#0F172A', fontWeight: 600 }}>
              📊 {lang === 'fr' ? 'Fourchette' : 'Range'}: {result.low}–{result.high} kg
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '10px 20px', fontSize: 14, color: '#0F172A', fontWeight: 600 }}>
              🇺🇸 {result.lbs} lbs
            </div>
          </div>
          <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 12 }}>
            {lang === 'fr' ? 'Basé sur la formule Devine (1974) — estimation clinique' : 'Based on Devine formula (1974) — clinical estimate'}
          </div>
          <button
            onClick={() => navigator.clipboard?.writeText(`${lang === 'fr' ? 'Poids idéal' : 'Ideal weight'}: ${result.kg} kg (${result.low}–${result.high} kg)`)}
            style={{ padding: '8px 20px', background: green, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            {lang === 'fr' ? '📋 Copier' : '📋 Copy'}
          </button>
        </div>
      )}

      {!result && (
        <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 14, padding: 32, border: '1px dashed #E2E8F0', borderRadius: 14 }}>
          {lang === 'fr' ? '👆 Entrez votre taille pour calculer' : '👆 Enter your height to calculate'}
        </div>
      )}
    </div>
  )
}
