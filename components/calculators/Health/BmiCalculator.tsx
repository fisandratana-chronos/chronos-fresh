'use client'
// ── components/calculators/Health/BmiCalculator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TBMI)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, BigNum, CopyBtn } from '../shared/ui'

function BmiCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [imperial, setImperial] = useState(false);
  const [w, setW] = useState(""); const [h, setH] = useState(""); const [hIn, setHIn] = useState("");
  const [res, setRes] = useState(null);

  useEffect(() => {
    const wVal = imperial ? +w * 0.453592 : +w;          // lbs→kg
    const hVal = imperial ? (+h * 12 + +hIn) * 0.0254   // ft+in→m
                          : +h / 100;                     // cm→m
    if (!wVal || !hVal) { setRes(null); return; }
    const bmi = wVal / (hVal * hVal);
    if (!isFinite(bmi) || bmi <= 0) { setRes(null); return; }
    const [label, color] = bmi < 18.5 ? ["Underweight", T.blue]
      : bmi < 25 ? ["Normal ✓", T.emerald]
      : bmi < 30 ? ["Overweight", T.amber]
      : ["Obese", T.red];
    setRes({ score: bmi.toFixed(1), label, color, pct: Math.min(bmi / 40 * 100, 100) });
    const wLabel = imperial ? `${w} lbs` : `${w} kg`;
    const hLabel = imperial ? `${h}ft ${hIn}in` : `${h} cm`;
    onResult({ label: `${wLabel} / ${hLabel}`, rows: [{ k: "BMI", v: bmi.toFixed(1) }, { k: "Category", v: label }] });
  }, [w, h, hIn, imperial]);

  return <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    {/* Imperial / Metric toggle */}
    <div style={{ display: "flex", background: T.bg3, borderRadius: 10, padding: 3, gap: 3 }}>
      {[{ v: false, l: "Metric (kg/cm)" }, { v: true, l: "Imperial (lbs/ft)" }].map(opt => (
        <button key={String(opt.v)} onClick={() => { setImperial(opt.v); setW(""); setH(""); setHIn(""); setRes(null); }}
          style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: imperial === opt.v ? T.cyan : "transparent",
            color: imperial === opt.v ? "#000" : T.txt2, transition: "all .15s" }}>
          {opt.l}
        </button>
      ))}
    </div>

    {imperial ? (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <Inp label="Weight" unit="lbs" value={w} onChange={setW} placeholder="154" />
        <Inp label="Height" unit="ft" value={h} onChange={setH} placeholder="5" />
        <Inp label="" unit="in" value={hIn} onChange={setHIn} placeholder="9" />
      </div>
    ) : (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Inp label="Weight" unit="kg" value={w} onChange={setW} placeholder="70" />
        <Inp label="Height" unit="cm" value={h} onChange={setH} placeholder="175" />
      </div>
    )}

    {res && <ResBox accent={res.color}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <BigNum value={+res.score} label="BMI Score" color={res.color} animate />
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: res.color }}>{res.label}</span>
        </div>
        <CopyBtn text={`BMI: ${res.score} — ${res.label}`} small />
      </div>
      <div style={{ height: 5, background: T.bg4, borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${res.pct}%`, borderRadius: 99, transition: "width .6s",
          background: `linear-gradient(90deg,${T.blue},${T.emerald},${T.amber},${T.red})` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.txt4, marginTop: 3, fontFamily: "Inter,sans-serif" }}>
        {["15", "18.5", "25", "30", "40"].map(v => <span key={v}>{v}</span>)}
      </div>
    </ResBox>}
  </div>;
}


export default BmiCalculator
