'use client'
// ── components/calculators/Finance/ProfitMarginCalculator.tsx ──
// Profit Margin Calculator — Cost + Selling price → Profit, Margin
// (%), and Markup (%) together, since people usually want all three
// at once (docx spec, priority #5). A second mode solves for the
// selling price given a target margin instead.

import { useState, useMemo, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn, ModeToggle } from '../shared/ui'

const MODES = [
  { v:'prices', label:'From Prices' },
  { v:'margin', label:'From Target Margin' },
];

function formatNum(v: number, decimals=2) {
  if (!isFinite(v)) return '—';
  return v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function ProfitMarginCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [mode, setMode] = useState('prices');
  const [cost, setCost] = useState('50');
  const [sellingPrice, setSellingPrice] = useState('80');
  const [targetMargin, setTargetMargin] = useState('30');

  const result = useMemo(()=>{
    const c = parseFloat(cost);
    if (isNaN(c) || c<0) return null;

    let sp: number;
    if (mode==='prices') {
      sp = parseFloat(sellingPrice);
      if (isNaN(sp) || sp<0) return null;
    } else {
      const m = parseFloat(targetMargin);
      if (isNaN(m) || m>=100 || m<0) return null; // margin can't reach/exceed 100% of selling price
      sp = c / (1 - m/100);
    }

    const profit = sp - c;
    const margin = sp>0 ? (profit / sp) * 100 : 0;
    const markup = c>0 ? (profit / c) * 100 : 0;
    return { sp, profit, margin, markup };
  }, [mode, cost, sellingPrice, targetMargin]);

  useEffect(()=>{
    if (!result) return;
    onResult({
      label: `Cost ${cost} → Sell ${formatNum(result.sp)} (margin ${formatNum(result.margin)}%)`,
      rows: [
        { label: 'Selling price', value: formatNum(result.sp) },
        { label: 'Profit', value: formatNum(result.profit) },
        { label: 'Margin', value: `${formatNum(result.margin)}%` },
        { label: 'Markup', value: `${formatNum(result.markup)}%` },
      ],
    });
  }, [result]);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <ModeToggle options={MODES} value={mode} onChange={setMode} />

      <Inp label="Cost" value={cost} onChange={setCost} placeholder="50" min={0} step={0.01} />

      {mode==='prices'
        ? <Inp label="Selling price" value={sellingPrice} onChange={setSellingPrice} placeholder="80" min={0} step={0.01} />
        : <Inp label="Target margin" unit="%" value={targetMargin} onChange={setTargetMargin} placeholder="30" min={0} max={99.9} step={0.5} />}

      {result && (
        <ResBox accent={T.amber}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,
                textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>Profit</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:700,color:T.amber}}>
                {formatNum(result.profit)}
              </div>
            </div>
            <CopyBtn text={`Sell ${formatNum(result.sp)} · Profit ${formatNum(result.profit)} · Margin ${formatNum(result.margin)}% · Markup ${formatNum(result.markup)}%`} small/>
          </div>
          {mode==='margin' && <Row label="Selling price" value={formatNum(result.sp)} large/>}
          <Row label="Margin" value={`${formatNum(result.margin)}%`} accent={T.emerald} large/>
          <Row label="Markup" value={`${formatNum(result.markup)}%`}/>
        </ResBox>
      )}
    </div>
  );
}

export default ProfitMarginCalculator
