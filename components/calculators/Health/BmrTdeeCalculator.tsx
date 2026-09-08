'use client'
// ── components/calculators/Health/BmrTdeeCalculator.tsx ──
// BMR/TDEE Calculator — Basal Metabolic Rate (Mifflin-St Jeor
// equation) and Total Daily Energy Expenditure across 5 activity
// levels. Complements the existing BMI/Calorie calculators (docx
// spec, priority #9).

import { useState, useMemo, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn, ModeToggle } from '../shared/ui'

const GENDERS = [
  { v:'male',   label:'Male' },
  { v:'female', label:'Female' },
];

const ACTIVITY_LEVELS = [
  { v:'sedentary',  label:'Sedentary',      mult:1.2,   desc:'little or no exercise' },
  { v:'light',      label:'Light',          mult:1.375, desc:'exercise 1-3 days/week' },
  { v:'moderate',   label:'Moderate',       mult:1.55,  desc:'exercise 3-5 days/week' },
  { v:'active',     label:'Active',         mult:1.725, desc:'exercise 6-7 days/week' },
  { v:'veryactive', label:'Very Active',    mult:1.9,   desc:'hard exercise + physical job' },
];

function formatNum(v: number) {
  if (!isFinite(v)) return '—';
  return Math.round(v).toLocaleString();
}

function BmrTdeeCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [age, setAge] = useState('30');
  const [activity, setActivity] = useState('moderate');

  const result = useMemo(()=>{
    const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age);
    if (isNaN(w) || isNaN(h) || isNaN(a) || w<=0 || h<=0 || a<=0) return null;

    // Mifflin-St Jeor equation
    const base = 10*w + 6.25*h - 5*a;
    const bmr = gender==='male' ? base + 5 : base - 161;

    const level = ACTIVITY_LEVELS.find(l=>l.v===activity)!;
    const tdee = bmr * level.mult;

    return { bmr, tdee, level };
  }, [gender, weight, height, age, activity]);

  useEffect(()=>{
    if (!result) return;
    onResult({
      label: `BMR ${formatNum(result.bmr)} kcal · TDEE ${formatNum(result.tdee)} kcal`,
      rows: [
        { label: 'BMR', value: `${formatNum(result.bmr)} kcal/day` },
        { label: 'TDEE', value: `${formatNum(result.tdee)} kcal/day` },
      ],
    });
  }, [result]);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <ModeToggle options={GENDERS} value={gender} onChange={setGender} />

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        <Inp label="Weight" unit="kg" value={weight} onChange={setWeight} placeholder="70" min={0} step={0.1} />
        <Inp label="Height" unit="cm" value={height} onChange={setHeight} placeholder="175" min={0} step={0.5} />
        <Inp label="Age" unit="years" value={age} onChange={setAge} placeholder="30" min={0} step={1} />
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        <label style={{fontFamily:"Inter,sans-serif",fontSize:11,fontWeight:500,
          letterSpacing:"0.07em",textTransform:"uppercase",color:T.txt3}}>
          Activity level
        </label>
        <ModeToggle options={ACTIVITY_LEVELS.map(l=>({v:l.v,label:l.label}))} value={activity} onChange={setActivity} />
        <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt4}}>
          {ACTIVITY_LEVELS.find(l=>l.v===activity)?.desc}
        </span>
      </div>

      {result && (
        <ResBox accent={T.amber}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,
                textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>TDEE</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:700,color:T.amber}}>
                {formatNum(result.tdee)}<span style={{fontSize:15,color:T.txt2,marginLeft:6}}>kcal/day</span>
              </div>
            </div>
            <CopyBtn text={`BMR ${formatNum(result.bmr)} kcal/day · TDEE (${result.level.label}) ${formatNum(result.tdee)} kcal/day`} small/>
          </div>
          <Row label="BMR (base metabolism)" value={`${formatNum(result.bmr)} kcal/day`} large/>
          <Row label={`Maintenance (${result.level.label})`} value={`${formatNum(result.tdee)} kcal/day`}/>
        </ResBox>
      )}
    </div>
  );
}

export default BmrTdeeCalculator
