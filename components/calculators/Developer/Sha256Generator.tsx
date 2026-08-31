'use client'
// ── components/calculators/Developer/Sha256Generator.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TSHA256)

import { useState } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Btn, CopyBtn, Textarea } from '../shared/ui'

function Sha256Generator() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [inp,setInp]=useState(""); const [out,setOut]=useState(""); const [loading,setLoading]=useState(false);
  const hash=async()=>{
    if(!inp) return; setLoading(true);
    try {
      const buf=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(inp));
      setOut(Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join(""));
    } catch { setOut(""); }
    setLoading(false);
  };
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <Textarea value={inp} onChange={setInp} placeholder="Enter text to hash…" rows={3}/>
    <Btn label={loading?"Hashing…":"Generate SHA-256"} onClick={hash} color={T.purple}/>
    {out&&<div style={{display:"flex",flexDirection:"column",gap:6}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,textTransform:"uppercase",letterSpacing:"0.07em"}}>SHA-256 Hash</span>
        <CopyBtn text={out} small/>
      </div>
      <code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:T.purple,
        background:T.bg2,border:`1px solid ${T.purple}30`,borderRadius:8,
        padding:"12px 14px",wordBreak:"break-all",lineHeight:1.8}}>{out}</code>
    </div>}
  </div>;
}


export default Sha256Generator
