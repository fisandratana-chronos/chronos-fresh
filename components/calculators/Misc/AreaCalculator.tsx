'use client'
// ── components/calculators/Misc/AreaCalculator.tsx ──
// Area Calculator — multi-shape: Rectangle, Square, Triangle, Circle,
// Trapezoid (docx spec, priority #8). Perimeter/circumference is
// shown too where it only needs the same inputs already collected
// for area (Rectangle, Square, Circle); Triangle/Trapezoid only ask
// for the dimensions area needs, so only area is shown for those.

import { useState, useMemo, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn, ModeToggle } from '../shared/ui'

const SHAPES = [
  { v:'rectangle', label:'Rectangle' },
  { v:'square',    label:'Square' },
  { v:'triangle',  label:'Triangle' },
  { v:'circle',    label:'Circle' },
  { v:'trapezoid', label:'Trapezoid' },
];

function formatNum(v: number, decimals=4) {
  if (!isFinite(v)) return '—';
  const rounded = parseFloat(v.toFixed(decimals));
  return rounded.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

function AreaCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [shape, setShape] = useState('rectangle');
  const [width, setWidth] = useState('5');
  const [height, setHeight] = useState('3');
  const [side, setSide] = useState('4');
  const [base, setBase] = useState('6');
  const [triHeight, setTriHeight] = useState('4');
  const [radius, setRadius] = useState('3');
  const [base1, setBase1] = useState('6');
  const [base2, setBase2] = useState('4');
  const [trapHeight, setTrapHeight] = useState('3');

  const result = useMemo(()=>{
    if (shape==='rectangle') {
      const w = parseFloat(width), h = parseFloat(height);
      if (isNaN(w) || isNaN(h) || w<=0 || h<=0) return null;
      return { area: w*h, perimeter: 2*(w+h) };
    }
    if (shape==='square') {
      const s = parseFloat(side);
      if (isNaN(s) || s<=0) return null;
      return { area: s*s, perimeter: 4*s };
    }
    if (shape==='triangle') {
      const b = parseFloat(base), h = parseFloat(triHeight);
      if (isNaN(b) || isNaN(h) || b<=0 || h<=0) return null;
      return { area: 0.5*b*h, perimeter: null };
    }
    if (shape==='circle') {
      const r = parseFloat(radius);
      if (isNaN(r) || r<=0) return null;
      return { area: Math.PI*r*r, perimeter: 2*Math.PI*r };
    }
    // trapezoid
    const b1 = parseFloat(base1), b2 = parseFloat(base2), h = parseFloat(trapHeight);
    if (isNaN(b1) || isNaN(b2) || isNaN(h) || b1<=0 || b2<=0 || h<=0) return null;
    return { area: ((b1+b2)/2)*h, perimeter: null };
  }, [shape, width, height, side, base, triHeight, radius, base1, base2, trapHeight]);

  useEffect(()=>{
    if (!result) return;
    const shapeLabel = SHAPES.find(s=>s.v===shape)?.label || shape;
    onResult({
      label: `${shapeLabel} area = ${formatNum(result.area)}`,
      rows: [
        { label: 'Area', value: formatNum(result.area) },
        ...(result.perimeter!==null ? [{ label: shape==='circle' ? 'Circumference' : 'Perimeter', value: formatNum(result.perimeter) }] : []),
      ],
    });
  }, [result]);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <ModeToggle options={SHAPES} value={shape} onChange={setShape} />

      {shape==='rectangle' && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <Inp label="Width" value={width} onChange={setWidth} placeholder="5" min={0} step={0.01} />
          <Inp label="Height" value={height} onChange={setHeight} placeholder="3" min={0} step={0.01} />
        </div>
      )}
      {shape==='square' && (
        <Inp label="Side" value={side} onChange={setSide} placeholder="4" min={0} step={0.01} />
      )}
      {shape==='triangle' && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <Inp label="Base" value={base} onChange={setBase} placeholder="6" min={0} step={0.01} />
          <Inp label="Height" value={triHeight} onChange={setTriHeight} placeholder="4" min={0} step={0.01} />
        </div>
      )}
      {shape==='circle' && (
        <Inp label="Radius" value={radius} onChange={setRadius} placeholder="3" min={0} step={0.01} />
      )}
      {shape==='trapezoid' && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <Inp label="Base A" value={base1} onChange={setBase1} placeholder="6" min={0} step={0.01} />
          <Inp label="Base B" value={base2} onChange={setBase2} placeholder="4" min={0} step={0.01} />
          <Inp label="Height" value={trapHeight} onChange={setTrapHeight} placeholder="3" min={0} step={0.01} />
        </div>
      )}

      {result && (
        <ResBox accent={T.amber}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:result.perimeter!==null?12:0}}>
            <div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,
                textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>Area</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:32,fontWeight:700,color:T.amber}}>
                {formatNum(result.area)}<span style={{fontSize:15,color:T.txt2,marginLeft:6}}>units²</span>
              </div>
            </div>
            <CopyBtn text={`Area = ${formatNum(result.area)}${result.perimeter!==null?` · ${shape==='circle'?'Circumference':'Perimeter'} = ${formatNum(result.perimeter)}`:''}`} small/>
          </div>
          {result.perimeter!==null &&
            <Row label={shape==='circle' ? 'Circumference' : 'Perimeter'} value={formatNum(result.perimeter)} large/>}
        </ResBox>
      )}
    </div>
  );
}

export default AreaCalculator
