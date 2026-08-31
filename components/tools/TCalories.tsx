'use client'

import { useState, useEffect } from 'react'
import { useLang } from '../../lib/hooks/useLang'

const ACTIVITY = [
  { key: '1.2',  en: 'Sedentary',       fr: 'Sédentaire' },
  { key: '1.375',en: 'Light Exercise',  fr: 'Exercice léger' },
  { key: '1.55', en: 'Moderate',        fr: 'Modéré' },
  { key: '1.725',en: 'Very Active',     fr: 'Très actif' },
  { key: '1.9',  en: 'Athlete',         fr: 'Athlète' },
]

export default function TCalories() {
  const { lang } = useLang()
  const [age, setAge]       = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [sex, setSex]       = useState<'m'|'f'>('m')
  const [act, setAct]       = useState('1.55')
  const [result, setResult] = useState<{ bmr: number; tdee: number; loss: number; gain: number } | null>(null)

  useEffect(() => {
    const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height)
    if (a > 0 && w > 0 && h > 0) {
      const bmr = sex === 'm'
        ? 88.36 + 13.4 * w + 4.8 * h - 5.7 * a
        : 447.6 + 9.25 * w + 3.1 * h - 4.33 * a
      const tdee = Math.round(bmr * parseFloat(act))
      setResult({ bmr: Math.round(bmr), tdee, loss: tdee - 500, gain: tdee + 500 })
    } else setResult(null)
  }, [age, weight, height, sex, act])

  const orange = '#F97316'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Sex */}
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {lang === 'fr' ? 'Sexe' : 'Sex'}
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          {([['m', lang === 'fr' ? '♂ Homme' : '♂ Male'], ['f', lang === 'fr' ? '♀ Femme' : '♀ Female']] as const).map(([v, l]) => (
            <button key={v} onClick={() => setSex(v)} style={{ flex: 1, padding: '10px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: `2px solid ${sex===v ? orange : '#E2E8F0'}`, background: sex===v ? `${orange}10` : '#F8FAFC', color: sex===v ? orange : '#64748B' }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {[
          { label: lang==='fr' ? 'Âge' : 'Age', value: age, set: setAge, ph: '25', unit: lang==='fr' ? 'ans' : 'yrs' },
          { label: lang==='fr' ? 'Poids' : 'Weight', value: weight, set: setWeight, ph: '70', unit: 'kg' },
          { label: lang==='fr' ? 'Taille' : 'Height', value: height, set: setHeight, ph: '175', unit: 'cm' },
        ].map(f => (
          <div key={f.label} style={{ flex: 1, minWidth: 120 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label} ({f.unit})</label>
            <input type="number" value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.ph}
              style={{ width: '100%', padding: '12px 16px', borderRadius: 10, fontSize: 16, border: '1px solid #E2E8F0', background: '#F8FAFC', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }} />
          </div>
        ))}
      </div>

      {/* Activity */}
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{lang==='fr' ? 'Activité' : 'Activity'}</label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ACTIVITY.map(a => (
            <button key={a.key} onClick={() => setAct(a.key)} style={{ padding: '7px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: `2px solid ${act===a.key ? orange : '#E2E8F0'}`, background: act===a.key ? `${orange}10` : '#F8FAFC', color: act===a.key ? orange : '#64748B' }}>
              {lang==='fr' ? a.fr : a.en}
            </button>
          ))}
        </div>
      </div>

      {result ? (
        <div style={{ background: `${orange}10`, border: `2px solid ${orange}`, borderRadius: 14, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#64748B', marginBottom: 4 }}>{lang==='fr' ? 'Calories journalières' : 'Daily Calories'}</div>
          <div style={{ fontSize: 52, fontWeight: 800, color: orange, lineHeight: 1, marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>
            {result.tdee} kcal
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 600 }}>🔥 BMR: {result.bmr}</div>
            <div style={{ background: '#EFF6FF', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#2563EB' }}>📉 {lang==='fr' ? 'Perte' : 'Loss'}: {result.loss}</div>
            <div style={{ background: '#F0FDF4', borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#16A34A' }}>📈 {lang==='fr' ? 'Prise' : 'Gain'}: {result.gain}</div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 14, padding: 32, border: '1px dashed #E2E8F0', borderRadius: 14 }}>
          {lang==='fr' ? '👆 Remplissez les champs pour calculer' : '👆 Fill in the fields to calculate'}
        </div>
      )}
    </div>
  )
}
