'use client'

import { useState, useEffect } from 'react'
import { useLang } from '../../lib/hooks/useLang'

const ACTIVITY_LEVELS = [
  { key: 'sedentary',  mult: 1.0,  en: 'Sedentary',     fr: 'Sédentaire' },
  { key: 'light',      mult: 1.2,  en: 'Light Exercise', fr: 'Exercice léger' },
  { key: 'active',     mult: 1.4,  en: 'Active',         fr: 'Actif' },
  { key: 'athlete',    mult: 1.6,  en: 'Athlete',        fr: 'Athlète' },
]

export default function TWaterIntake() {
  const { lang } = useLang()
  const [weight, setWeight]   = useState('')
  const [activity, setActivity] = useState('sedentary')
  const [hot, setHot]         = useState(false)
  const [result, setResult]   = useState<{ liters: number; ml: number; cups: number } | null>(null)

  useEffect(() => {
    const w = parseFloat(weight)
    if (!w || w <= 0) { setResult(null); return }
    const act = ACTIVITY_LEVELS.find(a => a.key === activity)?.mult ?? 1
    const climate = hot ? 1.15 : 1
    const ml = Math.round(w * 33 * act * climate)
    setResult({ liters: Math.round(ml / 100) / 10, ml, cups: Math.round(ml / 240) })
  }, [weight, activity, hot])

  const blue = '#3B82F6'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Weight input */}
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {lang === 'fr' ? 'Poids' : 'Weight'} (kg)
        </label>
        <input
          type="number" value={weight} onChange={e => setWeight(e.target.value)}
          placeholder="70" min="1" max="300"
          style={{ width: '100%', padding: '12px 16px', borderRadius: 10, fontSize: 16, border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
        />
      </div>

      {/* Activity level */}
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {lang === 'fr' ? 'Niveau d\'activité' : 'Activity Level'}
        </label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ACTIVITY_LEVELS.map(a => (
            <button key={a.key} onClick={() => setActivity(a.key)} style={{
              padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              border: `2px solid ${activity === a.key ? blue : '#E2E8F0'}`,
              background: activity === a.key ? `${blue}10` : '#F8FAFC',
              color: activity === a.key ? blue : '#64748B',
            }}>
              {lang === 'fr' ? a.fr : a.en}
            </button>
          ))}
        </div>
      </div>

      {/* Hot climate toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setHot(h => !h)} style={{
          width: 44, height: 24, borderRadius: 99, border: 'none', cursor: 'pointer',
          background: hot ? blue : '#E2E8F0', position: 'relative', transition: 'background 0.2s',
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: '50%', background: '#fff',
            position: 'absolute', top: 3, left: hot ? 23 : 3, transition: 'left 0.2s',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }} />
        </button>
        <span style={{ fontSize: 14, color: '#64748B' }}>
          {lang === 'fr' ? '☀️ Climat chaud / humide' : '☀️ Hot / humid climate'}
        </span>
      </div>

      {/* Result */}
      {result && (
        <div style={{ background: `${blue}10`, border: `2px solid ${blue}`, borderRadius: 14, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 56, fontWeight: 800, color: blue, lineHeight: 1, marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
            {result.liters} L
          </div>
          <div style={{ fontSize: 16, color: '#64748B', marginBottom: 16 }}>
            {lang === 'fr' ? 'par jour' : 'per day'}
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: '10px 20px', fontSize: 14, color: '#0F172A', fontWeight: 600 }}>
              💧 {result.ml.toLocaleString()} ml
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '10px 20px', fontSize: 14, color: '#0F172A', fontWeight: 600 }}>
              ☕ {result.cups} {lang === 'fr' ? 'tasses' : 'cups'}
            </div>
          </div>
          <button
            onClick={() => navigator.clipboard?.writeText(`${lang === 'fr' ? 'Apport en eau' : 'Water intake'}: ${result.liters} L / ${result.cups} cups`)}
            style={{ marginTop: 16, padding: '8px 20px', background: blue, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            {lang === 'fr' ? '📋 Copier' : '📋 Copy'}
          </button>
        </div>
      )}

      {!result && (
        <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 14, padding: 32, border: '1px dashed #E2E8F0', borderRadius: 14 }}>
          {lang === 'fr' ? '👆 Entrez votre poids pour calculer' : '👆 Enter your weight to calculate'}
        </div>
      )}
    </div>
  )
}
