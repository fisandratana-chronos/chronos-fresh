'use client'
// ── components/calculators/Finance/TipCalculator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TTip)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn } from '../shared/ui'

function TipCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [bill,setBill]=useState(""); const [tip,setTip]=useState("15"); const [ppl,setPpl]=useState("1"); const [res,setRes]=useState(null);
  const pcts=["10","15","18","20","25"];
  useEffect(()=>{
    const b=+bill,t=+tip/100,p=Math.max(1,+ppl);
    if(!bill||b===0){setRes(null);return;}
    const tipAmt=b*t; const total=b+tipAmt;
    setRes({tip:tipAmt.toFixed(2),total:total.toFixed(2),perPerson:(total/p).toFixed(2)});
    onResult({label:`$${bill} bill / ${tip}% tip / ${ppl}p`,rows:[{k:"Tip",v:`$${tipAmt.toFixed(2)}`},{k:"Total",v:`$${total.toFixed(2)}`},{k:"Per person",v:`$${(total/p).toFixed(2)}`}]});
  },[bill,tip,ppl]);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
      {pcts.map(p=><button key={p} onClick={()=>setTip(p)}
        style={{padding:"6px 12px",borderRadius:7,border:`1px solid ${tip===p?T.amber:T.border}`,
          background:tip===p?`${T.amber}15`:T.bg3,color:tip===p?T.amber:T.txt2,
          fontFamily:"Inter,sans-serif",fontSize:12,cursor:"pointer"}}>{p}%</button>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
      <Inp label="Bill" unit="$" value={bill} onChange={setBill} placeholder="85"/>
      <Inp label="Tip" unit="%" value={tip} onChange={setTip} placeholder="15"/>
      <Inp label="People" value={ppl} onChange={setPpl} placeholder="2" min="1"/>
    </div>
    {res&&<ResBox accent={T.cyan}>
      <Row label="Tip amount" value={`$${res.tip}`} accent={T.amber}/>
      <Row label="Total" value={`$${res.total}`} accent={T.cyan} large/>
      <Row label="Per person" value={`$${res.perPerson}`}/>
      <div style={{marginTop:10}}><CopyBtn text={`Tip: $${res.tip} | Total: $${res.total} | Per person: $${res.perPerson}`}/></div>
    </ResBox>}
  </div>;
}


export default TipCalculator
