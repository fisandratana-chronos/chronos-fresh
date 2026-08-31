'use client'
// ── components/calculators/Finance/PercentageCalculator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TPercentage)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, BigNum, CopyBtn, ModeToggle } from '../shared/ui'

function PercentageCalculator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [mode,setMode]=useState("of"); const [a,setA]=useState(""); const [b,setB]=useState(""); const [res,setRes]=useState(null);
  const modes=[{v:"of",label:"X% of Y"},{v:"is",label:"X is ?% of Y"},{v:"change",label:"% Change"}];
  useEffect(()=>{
    const na=+a,nb=+b;
    if(!a||!b){setRes(null);return;}
    if(mode==="of") setRes({val:(na/100*nb).toFixed(4),label:`${na}% of ${nb}`});
    else if(mode==="is") setRes({val:((na/nb)*100).toFixed(4),label:`${na} / ${nb} × 100`,pct:true});
    else setRes({val:(((nb-na)/Math.abs(na))*100).toFixed(2),label:`Change from ${na} to ${nb}`,pct:true});
    onResult({label:"",rows:[]});
  },[a,b,mode]);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <ModeToggle options={modes} value={mode} onChange={v=>{setMode(v);setRes(null);}}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Inp label={mode==="change"?"From":"A"} value={a} onChange={setA} placeholder="25"/>
      <Inp label={mode==="change"?"To":"B"} value={b} onChange={setB} placeholder="200"/>
    </div>
    {res&&<ResBox accent={T.amber}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <BigNum value={+res.val} unit={res.pct?"%":undefined} label={res.label}/>
        <CopyBtn text={`${res.val}${res.pct?"%":""}`} small/>
      </div>
    </ResBox>}
  </div>;
}


export default PercentageCalculator
