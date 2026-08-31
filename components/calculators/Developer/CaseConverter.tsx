'use client'
// ── components/calculators/Developer/CaseConverter.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TCase)

import { useState } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { CopyBtn, Textarea } from '../shared/ui'

function CaseConverter() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [inp,setInp]=useState(""); const [mode,setMode]=useState("upper");
  const transforms={
    upper:s=>s.toUpperCase(), lower:s=>s.toLowerCase(),
    title:s=>s.replace(/\w\S*/g,w=>w[0].toUpperCase()+w.slice(1).toLowerCase()),
    camel:s=>s.toLowerCase().replace(/\W+(.)/g,(_,c)=>c.toUpperCase()),
    snake:s=>s.toLowerCase().replace(/\W+/g,"_"),
    kebab:s=>s.toLowerCase().replace(/\W+/g,"-"),
    sentence:s=>s.charAt(0).toUpperCase()+s.slice(1).toLowerCase(),
  };
  const out=inp?transforms[mode](inp):"";
  const modes=["upper","lower","title","camel","snake","kebab","sentence"];
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <Textarea value={inp} onChange={setInp} placeholder="Type or paste text here…" rows={3}/>
    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
      {modes.map(m=><button key={m} onClick={()=>setMode(m)}
        style={{padding:"7px 12px",borderRadius:7,border:`1px solid ${mode===m?T.cyan:T.border}`,
          background:mode===m?`${T.cyan}15`:T.bg3,color:mode===m?T.cyan:T.txt2,
          fontFamily:"'JetBrains Mono',monospace",fontSize:11,cursor:"pointer"}}>{m}</button>)}
    </div>
    {out&&<div style={{display:"flex",flexDirection:"column",gap:6}}>
      <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:T.txt3,fontFamily:"Inter,sans-serif",textTransform:"uppercase",letterSpacing:"0.07em"}}>{mode}</span><CopyBtn text={out} small/></div>
      <Textarea value={out} readOnly color={T.cyan} rows={3}/>
    </div>}
  </div>;
}


export default CaseConverter
