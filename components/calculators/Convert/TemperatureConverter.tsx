'use client'
// ── components/calculators/Convert/TemperatureConverter.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TTemp)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, Row, CopyBtn } from '../shared/ui'

function TemperatureConverter() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [val,setVal]=useState(""); const [from,setFrom]=useState("C"); const [res,setRes]=useState(null);
  useEffect(()=>{
    if(val===""){setRes(null);return;}
    const v=+val; let c=from==="C"?v:from==="F"?(v-32)*5/9:v-273.15;
    setRes({C:c.toFixed(2),F:(c*9/5+32).toFixed(2),K:(c+273.15).toFixed(2)});
    onResult({label:`${val}°${from}`,rows:[{k:"°C",v:c.toFixed(2)},{k:"°F",v:(c*9/5+32).toFixed(2)},{k:"K",v:(c+273.15).toFixed(2)}]});
  },[val,from]);
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:12,alignItems:"end"}}>
      <Inp label="Value" value={val} onChange={setVal} placeholder="100"/>
      <div style={{display:"flex",gap:6}}>
        {["C","F","K"].map(u=><button key={u} onClick={()=>setFrom(u)}
          style={{flex:1,padding:"11px 8px",borderRadius:8,border:`1px solid ${from===u?T.amber:T.border}`,
            background:from===u?`${T.amber}15`:T.bg4,color:from===u?T.amber:T.txt2,
            fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,cursor:"pointer"}}>°{u}</button>)}
      </div>
    </div>
    {res&&<ResBox accent={T.red}>
      {[["°C",res.C,T.blue],["°F",res.F,T.red],["K",res.K,T.purple]].map(([u,v,col])=>(
        <Row key={u} label={u} value={v} accent={u===`°${from}`?T.txt3:col} large={u===`°${from}`?false:true}/>
      ))}
      <div style={{marginTop:10}}><CopyBtn text={`${val}°${from} = ${res.C}°C = ${res.F}°F = ${res.K}K`}/></div>
    </ResBox>}
  </div>;
}


export default TemperatureConverter
