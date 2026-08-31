'use client'

// ── TBMI — BMI Calculator ─────────────────────────────────────
// Mampiasa: weight (kg) sy height (cm) → BMI result + category

import { useState, useEffect } from 'react'
import { useLang } from '../../lib/hooks/useLang'

// ── BMI Categories ────────────────────────────────────────────
function getBmiCategory(bmi: number, lang: string) {
  if (bmi < 18.5) return { label: lang === 'fr' ? 'Insuffisance pondérale' : 'Underweight', color: '#3B82F6' }
  if (bmi < 25)   return { label: lang === 'fr' ? 'Poids normal' : 'Normal weight',          color: '#10B981' }
  if (bmi < 30)   return { label: lang === 'fr' ? 'Surpoids' : 'Overweight',                 color: '#F59E0B' }
  return           { label: lang === 'fr' ? 'Obésité' : 'Obese',                             color: '#EF4444' }
}

export default function TBMI() {
  const { lang } = useLang()
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi]       = useState<number | null>(null)

  // ── Calcul automatique ────────────────────────────────────
  useEffect(() => {
    const w = parseFloat(weight)
    const h = parseFloat(height) / 100 // cm → m
    if (w > 0 && h > 0) {
      setBmi(Math.round((w / (h * h)) * 10) / 10)
    } else {
      setBmi(null)
    }
  }, [weight, height])

  const category = bmi !== null ? getBmiCategory(bmi, lang) : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Inputs ── */}
      <div style={{ display: 'flex', gap: 12 }}>

        {/* Weight */}
        <div style={{ flex: 1 }}>
          <label style={{
            display: 'block', fontSize: 12, fontWeight: 600,
            color: '#64748B', marginBottom: 6, textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {lang === 'fr' ? 'Poids' : 'Weight'} (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="70"
            min="1" max="300"
            style={{
              width: '100%', padding: '12px 16px',
              borderRadius: 10, fontSize: 16,
              border: '1px solid #E2E8F0',
              background: '#F8FAFC',
              outline: 'none', boxSizing: 'border-box',
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </div>

        {/* Height */}
        <div style={{ flex: 1 }}>
          <label style={{
            display: 'block', fontSize: 12, fontWeight: 600,
            color: '#64748B', marginBottom: 6, textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {lang === 'fr' ? 'Taille' : 'Height'} (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={e => setHeight(e.target.value)}
            placeholder="175"
            min="50" max="250"
            style={{
              width: '100%', padding: '12px 16px',
              borderRadius: 10, fontSize: 16,
              border: '1px solid #E2E8F0',
              background: '#F8FAFC',
              outline: 'none', boxSizing: 'border-box',
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </div>
      </div>

      {/* ── Result ── */}
      {bmi !== null && category && (
        <div style={{
          background: `${category.color}10`,
          border: `2px solid ${category.color}`,
          borderRadius: 14, padding: '24px',
          textAlign: 'center',
          animation: 'fadeIn 0.3s ease',
        }}>
          {/* BMI Number */}
          <div style={{
            fontSize: 56, fontWeight: 800,
            color: category.color,
            lineHeight: 1, marginBottom: 8,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            {bmi}
          </div>

          {/* Category */}
          <div style={{
            fontSize: 18, fontWeight: 600,
            color: category.color, marginBottom: 16,
          }}>
            {category.label}
          </div>

          {/* Scale bar */}
          <div style={{
            background: '#E2E8F0', borderRadius: 99,
            height: 8, position: 'relative', marginBottom: 8,
          }}>
            <div style={{
              position: 'absolute',
              left: `${Math.min(Math.max((bmi - 10) / 30 * 100, 2), 98)}%`,
              top: '50%', transform: 'translate(-50%, -50%)',
              width: 16, height: 16, borderRadius: '50%',
              background: category.color,
              border: '3px solid #fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }} />
            {/* Scale colors */}
            <div style={{
              height: '100%', borderRadius: 99,
              background: 'linear-gradient(to right, #3B82F6 0%, #10B981 30%, #F59E0B 60%, #EF4444 100%)',
            }} />
          </div>

          {/* Scale labels */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 10, color: '#94A3B8', marginTop: 4,
          }}>
            <span>10</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>40</span>
          </div>

          {/* Copy button */}
          <button
            onClick={() => navigator.clipboard?.writeText(`BMI: ${bmi} — ${category.label}`)}
            style={{
              marginTop: 16, padding: '8px 20px',
              background: category.color, color: '#fff',
              border: 'none', borderRadius: 8,
              fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {lang === 'fr' ? '📋 Copier' : '📋 Copy'}
          </button>
        </div>
      )}

      {/* ── Empty state ── */}
      {bmi === null && (
        <div style={{
          textAlign: 'center', color: '#94A3B8',
          fontSize: 14, padding: '32px',
          border: '1px dashed #E2E8F0', borderRadius: 14,
        }}>
          {lang === 'fr'
            ? '👆 Entrez votre poids et taille pour calculer votre IMC'
            : '👆 Enter your weight and height to calculate your BMI'}
        </div>
      )}

    </div>
  )
}
