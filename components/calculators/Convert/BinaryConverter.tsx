'use client'
// ── components/calculators/Convert/BinaryConverter.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TBinary)

import { useState, useEffect } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp, ResBox, CopyBtn, ErrBox, ModeToggle } from '../shared/ui'

function BinaryConverter() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [val,setVal]=useState(""); const [from,setFrom]=useState("dec"); const [res,setRes]=useState(null); const [err,setErr]=useState("");
  const bases={dec:10,bin:2,hex:16,oct:8};
  const labels={dec:"Decimal",bin:"Binary",hex:"Hexadecimal",oct:"Octal"};
  useEffect(()=>{
    if(!val){setRes(null);setErr("");return;}
    try {
      const n=parseInt(val,bases[from]);
      if(isNaN(n)){setErr("Invalid number");setRes(null);return;}
      setErr("");
      setRes({dec:n.toString(10),bin:n.toString(2),hex:n.toString(16).toUpperCase(),oct:n.toString(8)});
      onResult({label:`${val} (${labels[from]})`,rows:[{k:"Dec",v:n.toString(10)},{k:"Bin",v:n.toString(2)},{k:"Hex",v:n.toString(16).toUpperCase()},{k:"Oct",v:n.toString(8)}]});
    } catch { setErr("Invalid input"); }
  },[val,from]);
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <ModeToggle options={Object.entries(labels).map(([v,l])=>({v,label:l}))} value={from} onChange={v=>{setFrom(v);setRes(null);setErr("");setVal("");}}/>
    <Inp label={`${labels[from]} input`} type="text" value={val} onChange={setVal} placeholder={from==="bin"?"1010":from==="hex"?"FF":from==="oct"?"17":"42"}/>
    <ErrBox msg={err}/>
    {res&&<ResBox accent={T.blue}>
      {(Object.entries(res) as [string,string][]).map(([k,v])=>(
        <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
          <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,textTransform:"uppercase",letterSpacing:"0.07em",width:80}}>{labels[k]}</span>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,color:k===from?T.txt3:T.blue}}>{v}</code>
            <CopyBtn text={v} small/>
          </div>
        </div>
      ))}
    </ResBox>}
  </div>;
}


export default BinaryConverter
