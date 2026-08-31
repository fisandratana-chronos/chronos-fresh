'use client'
// ── components/calculators/Finance/DiscountCalculator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TDiscount)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn } from '../shared/ui'

function DiscountCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [orig,setOrig]=useState(""); const [pct,setPct]=useState(""); const [res,setRes]=useState(null);
  useEffect(()=>{
    const o=+orig,p=+pct;
    if(!orig||!pct||o===0){setRes(null);return;}
    const save=o*p/100;
    setRes({save:save.toFixed(2),final:(o-save).toFixed(2),pct:p});
    onResult({label:`$${orig} −${pct}%`,rows:[{k:"Save",v:`$${save.toFixed(2)}`},{k:"Final",v:`$${(o-save).toFixed(2)}`}]});
  },[orig,pct]);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:12}}>
      <Inp label="Original price" unit="$" value={orig} onChange={setOrig} placeholder="120"/>
      <Inp label="Discount" unit="%" value={pct} onChange={setPct} placeholder="25"/>
    </div>
    {res&&<ResBox accent={T.red}>
      <Row label="You save" value={`$${res.save}`} accent={T.red} large/>
      <Row label="Final price" value={`$${res.final}`} accent={T.emerald}/>
      <div style={{marginTop:10}}><CopyBtn text={`Save: $${res.save} | Final price: $${res.final}`}/></div>
    </ResBox>}
  </div>;
}


export default DiscountCalculator
