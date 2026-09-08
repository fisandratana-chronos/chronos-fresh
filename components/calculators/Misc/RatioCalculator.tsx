'use client'
// ── components/calculators/Misc/RatioCalculator.tsx ──
// Ratio Calculator — Simplify (e.g. 2:3) and Solve a proportion
// (e.g. 4:5 = x:25) for whichever term is missing (docx spec,
// priority #10, final tool).

import { useState, useMemo, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn, ModeToggle } from '../shared/ui'

const MODES = [
  { v:'simplify', label:'Simplify' },
  { v:'solve',     label:'Solve' },
];

const TERMS = [
  { v:'a', label:'A' },
  { v:'b', label:'B' },
  { v:'c', label:'C' },
  { v:'d', label:'D' },
];

function gcd(x: number, y: number): number {
  x = Math.abs(x); y = Math.abs(y);
  while (y) { [x, y] = [y, x % y]; }
  return x;
}

function formatNum(v: number, decimals=4) {
  if (!isFinite(v)) return '—';
  const rounded = parseFloat(v.toFixed(decimals));
  return rounded.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

function RatioCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [mode, setMode] = useState('simplify');

  // Simplify mode
  const [simA, setSimA] = useState('4');
  const [simB, setSimB] = useState('6');

  // Solve mode — proportion A:B = C:D, one term unknown
  const [unknown, setUnknown] = useState('c');
  const [a, setA] = useState('4');
  const [b, setB] = useState('5');
  const [c, setC] = useState('');
  const [d, setD] = useState('25');

  const simplified = useMemo(()=>{
    const x = parseFloat(simA), y = parseFloat(simB);
    if (isNaN(x) || isNaN(y) || x<=0 || y<=0) return null;
    const g = gcd(x, y) || 1;
    return { a: x/g, b: y/g };
  }, [simA, simB]);

  const solved = useMemo(()=>{
    const vals: Record<string, number> = {};
    for (const [key, raw] of [['a',a],['b',b],['c',c],['d',d]] as const) {
      if (key===unknown) continue;
      const n = parseFloat(raw);
      if (isNaN(n)) return null;
      vals[key] = n;
    }
    let result: number;
    if (unknown==='a') { if (vals.d===0) return null; result = (vals.b*vals.c)/vals.d; }
    else if (unknown==='b') { if (vals.c===0) return null; result = (vals.a*vals.d)/vals.c; }
    else if (unknown==='c') { if (vals.b===0) return null; result = (vals.a*vals.d)/vals.b; }
    else { if (vals.a===0) return null; result = (vals.b*vals.c)/vals.a; }
    return { ...vals, [unknown]: result };
  }, [unknown, a, b, c, d]);

  useEffect(()=>{
    if (mode==='simplify' && simplified) {
      onResult({
        label: `${simA}:${simB} simplifies to ${formatNum(simplified.a)}:${formatNum(simplified.b)}`,
        rows: [{ label: 'Simplified', value: `${formatNum(simplified.a)}:${formatNum(simplified.b)}` }],
      });
    } else if (mode==='solve' && solved) {
      onResult({
        label: `${formatNum(solved.a)}:${formatNum(solved.b)} = ${formatNum(solved.c)}:${formatNum(solved.d)}`,
        rows: [{ label: unknown.toUpperCase(), value: formatNum(solved[unknown]) }],
      });
    }
  }, [mode, simplified, solved]);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <ModeToggle options={MODES} value={mode} onChange={setMode} />

      {mode==='simplify' ? (
        <>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <Inp label="A" value={simA} onChange={setSimA} placeholder="4" min={0} step={0.01} />
            <Inp label="B" value={simB} onChange={setSimB} placeholder="6" min={0} step={0.01} />
          </div>
          {simplified && (
            <ResBox accent={T.amber}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,
                    textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>Simplified</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:700,color:T.amber}}>
                    {formatNum(simplified.a)} : {formatNum(simplified.b)}
                  </div>
                </div>
                <CopyBtn text={`${simA}:${simB} = ${formatNum(simplified.a)}:${formatNum(simplified.b)}`} small/>
              </div>
            </ResBox>
          )}
        </>
      ) : (
        <>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            <label style={{fontFamily:"Inter,sans-serif",fontSize:11,fontWeight:500,
              letterSpacing:"0.07em",textTransform:"uppercase",color:T.txt3}}>
              Which term is unknown?
            </label>
            <ModeToggle options={TERMS} value={unknown} onChange={setUnknown} />
          </div>

          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Inp label="A" value={unknown==='a'?'':a} onChange={setA} placeholder={unknown==='a'?'?':'4'} />
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,color:T.txt3,marginTop:20}}>:</span>
            <Inp label="B" value={unknown==='b'?'':b} onChange={setB} placeholder={unknown==='b'?'?':'5'} />
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,color:T.txt3,marginTop:20}}>=</span>
            <Inp label="C" value={unknown==='c'?'':c} onChange={setC} placeholder={unknown==='c'?'?':'20'} />
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,color:T.txt3,marginTop:20}}>:</span>
            <Inp label="D" value={unknown==='d'?'':d} onChange={setD} placeholder={unknown==='d'?'?':'25'} />
          </div>

          {solved && (
            <ResBox accent={T.amber}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,
                    textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>{unknown.toUpperCase()} =</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:700,color:T.amber}}>
                    {formatNum(solved[unknown])}
                  </div>
                </div>
                <CopyBtn text={`${formatNum(solved.a)}:${formatNum(solved.b)} = ${formatNum(solved.c)}:${formatNum(solved.d)}`} small/>
              </div>
              <Row label="Full proportion" value={`${formatNum(solved.a)} : ${formatNum(solved.b)} = ${formatNum(solved.c)} : ${formatNum(solved.d)}`}/>
            </ResBox>
          )}
        </>
      )}
    </div>
  );
}

export default RatioCalculator
