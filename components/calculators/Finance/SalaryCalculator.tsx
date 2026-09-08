'use client'
// ── components/calculators/Finance/SalaryCalculator.tsx ──
// Salary Calculator — converts a pay amount between Hourly / Daily /
// Weekly / Monthly / Yearly (two-way: any period → all the others),
// using adjustable hours/day, days/week, weeks/year assumptions
// (docx spec, priority #4).

import { useState, useMemo, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn, ModeToggle } from '../shared/ui'

const PERIODS = [
  { v:'hourly',  label:'Hourly' },
  { v:'daily',   label:'Daily' },
  { v:'weekly',  label:'Weekly' },
  { v:'monthly', label:'Monthly' },
  { v:'yearly',  label:'Yearly' },
];

function formatNum(v: number) {
  if (!isFinite(v)) return '—';
  return v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function SalaryCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [amount, setAmount] = useState('20');
  const [period, setPeriod] = useState('hourly');
  const [hoursPerDay, setHoursPerDay] = useState('8');
  const [daysPerWeek, setDaysPerWeek] = useState('5');
  const [weeksPerYear, setWeeksPerYear] = useState('52');

  const result = useMemo(()=>{
    const a = parseFloat(amount);
    const hpd = parseFloat(hoursPerDay), dpw = parseFloat(daysPerWeek), wpy = parseFloat(weeksPerYear);
    if (isNaN(a) || isNaN(hpd) || isNaN(dpw) || isNaN(wpy) || a<0 || hpd<=0 || dpw<=0 || wpy<=0) return null;

    const hoursPerWeek = hpd * dpw;
    const hoursPerYear = hoursPerWeek * wpy;
    const hoursPerMonth = hoursPerYear / 12;
    const daysPerYear = dpw * wpy;
    const daysPerMonth = daysPerYear / 12;

    let hourly: number;
    if (period==='hourly')  hourly = a;
    else if (period==='daily')   hourly = a / hpd;
    else if (period==='weekly')  hourly = a / hoursPerWeek;
    else if (period==='monthly') hourly = a / hoursPerMonth;
    else /* yearly */             hourly = a / hoursPerYear;

    return {
      hourly,
      daily:   hourly * hpd,
      weekly:  hourly * hoursPerWeek,
      monthly: hourly * hoursPerMonth,
      yearly:  hourly * hoursPerYear,
    };
  }, [amount, period, hoursPerDay, daysPerWeek, weeksPerYear]);

  useEffect(()=>{
    if (!result) return;
    onResult({
      label: `${amount} / ${period} → ${formatNum(result.yearly)} / year`,
      rows: [
        { label: 'Hourly',  value: formatNum(result.hourly) },
        { label: 'Monthly', value: formatNum(result.monthly) },
        { label: 'Yearly',  value: formatNum(result.yearly) },
      ],
    });
  }, [result]);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <ModeToggle options={PERIODS} value={period} onChange={setPeriod} />

      <Inp label={`Pay amount (${PERIODS.find(p=>p.v===period)?.label.toLowerCase()})`}
        value={amount} onChange={setAmount} placeholder="20" min={0} step={0.01} />

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        <Inp label="Hours/day" value={hoursPerDay} onChange={setHoursPerDay} placeholder="8" min={0.1} step={0.5} />
        <Inp label="Days/week" value={daysPerWeek} onChange={setDaysPerWeek} placeholder="5" min={0.1} step={0.5} />
        <Inp label="Weeks/year" value={weeksPerYear} onChange={setWeeksPerYear} placeholder="52" min={1} step={1} />
      </div>

      {result && (
        <ResBox accent={T.amber}>
          <div style={{marginBottom:4}}>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,
              textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>Yearly</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:700,color:T.amber}}>
                {formatNum(result.yearly)}
              </div>
              <CopyBtn text={`Hourly ${formatNum(result.hourly)} · Daily ${formatNum(result.daily)} · Weekly ${formatNum(result.weekly)} · Monthly ${formatNum(result.monthly)} · Yearly ${formatNum(result.yearly)}`} small/>
            </div>
          </div>
          <Row label="Hourly" value={formatNum(result.hourly)} accent={period==='hourly'?T.amber:undefined}/>
          <Row label="Daily" value={formatNum(result.daily)} accent={period==='daily'?T.amber:undefined}/>
          <Row label="Weekly" value={formatNum(result.weekly)} accent={period==='weekly'?T.amber:undefined}/>
          <Row label="Monthly" value={formatNum(result.monthly)} accent={period==='monthly'?T.amber:undefined}/>
        </ResBox>
      )}
    </div>
  );
}

export default SalaryCalculator
