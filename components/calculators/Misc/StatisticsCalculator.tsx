'use client'
// ── components/calculators/Misc/StatisticsCalculator.tsx ──
// Average / Basic Statistics Calculator — a list of numbers → Sum,
// Average, Median, Min, Max, Range, Count (docx spec, priority #7).

import { useState, useMemo, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Textarea, ResBox, Row, CopyBtn, ErrBox } from '../shared/ui'

function formatNum(v: number, decimals=4) {
  if (!isFinite(v)) return '—';
  // Trim trailing zeros so integers show as integers, not 5.0000
  const rounded = parseFloat(v.toFixed(decimals));
  return rounded.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

function parseNumbers(raw: string): number[] {
  return raw
    .split(/[\s,;\n]+/)
    .map(s=>s.trim())
    .filter(s=>s.length>0)
    .map(s=>parseFloat(s))
    .filter(n=>!isNaN(n));
}

function StatisticsCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [raw, setRaw] = useState('4, 8, 15, 16, 23, 42');

  const numbers = useMemo(()=>parseNumbers(raw), [raw]);

  const result = useMemo(()=>{
    if (numbers.length===0) return null;
    const sorted = [...numbers].sort((a,b)=>a-b);
    const sum = numbers.reduce((s,n)=>s+n,0);
    const avg = sum / numbers.length;
    const mid = Math.floor(sorted.length/2);
    const median = sorted.length%2===0 ? (sorted[mid-1]+sorted[mid])/2 : sorted[mid];
    const min = sorted[0], max = sorted[sorted.length-1];
    const range = max - min;
    return { count: numbers.length, sum, avg, median, min, max, range };
  }, [numbers]);

  useEffect(()=>{
    if (!result) return;
    onResult({
      label: `${result.count} numbers → avg ${formatNum(result.avg)}`,
      rows: [
        { label: 'Sum', value: formatNum(result.sum) },
        { label: 'Average', value: formatNum(result.avg) },
        { label: 'Median', value: formatNum(result.median) },
      ],
    });
  }, [result]);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        <label style={{fontFamily:"Inter,sans-serif",fontSize:11,fontWeight:500,
          letterSpacing:"0.07em",textTransform:"uppercase",color:T.txt3}}>
          Numbers (separated by commas, spaces, or new lines)
        </label>
        <Textarea value={raw} onChange={setRaw} placeholder="4, 8, 15, 16, 23, 42" rows={4} />
      </div>

      {raw.trim().length>0 && numbers.length===0 &&
        <ErrBox msg="No valid numbers found — check your input." />}

      {result && (
        <ResBox accent={T.amber}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,
                textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>Average</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:700,color:T.amber}}>
                {formatNum(result.avg)}
              </div>
            </div>
            <CopyBtn text={`Count ${result.count} · Sum ${formatNum(result.sum)} · Average ${formatNum(result.avg)} · Median ${formatNum(result.median)} · Min ${formatNum(result.min)} · Max ${formatNum(result.max)} · Range ${formatNum(result.range)}`} small/>
          </div>
          <Row label="Count" value={result.count} />
          <Row label="Sum" value={formatNum(result.sum)} large/>
          <Row label="Median" value={formatNum(result.median)} />
          <Row label="Min" value={formatNum(result.min)} />
          <Row label="Max" value={formatNum(result.max)} />
          <Row label="Range" value={formatNum(result.range)} />
        </ResBox>
      )}
    </div>
  );
}

export default StatisticsCalculator
