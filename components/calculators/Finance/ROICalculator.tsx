'use client'
// ── components/calculators/Finance/ROICalculator.tsx ──
// ROI Calculator — Investment + Return → Profit and ROI (%), with an
// optional time period for annualized ROI. Complements the existing
// Compound Interest Calculator (docx spec, priority #6).

import { useState, useMemo, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn } from '../shared/ui'

function formatNum(v: number, decimals=2) {
  if (!isFinite(v)) return '—';
  return v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function ROICalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [investment, setInvestment] = useState('1000');
  const [totalReturn, setTotalReturn] = useState('1300');
  const [years, setYears] = useState('');

  const result = useMemo(()=>{
    const inv = parseFloat(investment), ret = parseFloat(totalReturn);
    if (isNaN(inv) || isNaN(ret) || inv<=0 || ret<0) return null;

    const profit = ret - inv;
    const roi = (profit / inv) * 100;

    const y = parseFloat(years);
    let annualizedRoi: number | null = null;
    if (!isNaN(y) && y>0) {
      annualizedRoi = (Math.pow(ret / inv, 1/y) - 1) * 100;
    }

    return { profit, roi, annualizedRoi };
  }, [investment, totalReturn, years]);

  useEffect(()=>{
    if (!result) return;
    onResult({
      label: `Invest ${investment} → Return ${totalReturn} (ROI ${formatNum(result.roi)}%)`,
      rows: [
        { label: 'Profit', value: formatNum(result.profit) },
        { label: 'ROI', value: `${formatNum(result.roi)}%` },
        ...(result.annualizedRoi!==null ? [{ label: 'Annualized ROI', value: `${formatNum(result.annualizedRoi)}%` }] : []),
      ],
    });
  }, [result]);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <Inp label="Investment (initial cost)" value={investment} onChange={setInvestment} placeholder="1000" min={0} step={0.01} />
      <Inp label="Total return (final value)" value={totalReturn} onChange={setTotalReturn} placeholder="1300" min={0} step={0.01} />
      <Inp label="Time period" unit="years, optional" value={years} onChange={setYears} placeholder="e.g. 3" min={0} step={0.5} />

      {result && (
        <ResBox accent={T.amber}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,
                textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>ROI</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:700,
                color:result.roi>=0?T.amber:T.red}}>
                {formatNum(result.roi)}%
              </div>
            </div>
            <CopyBtn text={`Profit ${formatNum(result.profit)} · ROI ${formatNum(result.roi)}%${result.annualizedRoi!==null?` · Annualized ${formatNum(result.annualizedRoi)}%`:''}`} small/>
          </div>
          <Row label="Profit" value={formatNum(result.profit)} accent={result.profit>=0?T.emerald:T.red} large/>
          {result.annualizedRoi!==null &&
            <Row label="Annualized ROI" value={`${formatNum(result.annualizedRoi)}%`}/>}
        </ResBox>
      )}
    </div>
  );
}

export default ROICalculator
