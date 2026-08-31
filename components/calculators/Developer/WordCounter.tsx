'use client'
// ── components/calculators/Developer/WordCounter.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TWordCount)

import { useState } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Textarea } from '../shared/ui'

function WordCounter() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [txt,setTxt]=useState("");
  const words=txt.trim()?txt.trim().split(/\s+/).length:0;
  const chars=txt.length; const charsNoSp=txt.replace(/\s/g,"").length;
  const sentences=txt.split(/[.!?]+/).filter(Boolean).length;
  const readTime=Math.ceil(words/200);
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <Textarea value={txt} onChange={setTxt} placeholder="Paste your text here…" rows={6}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
      {([[words,"Words",T.amber],[chars,"Characters",T.cyan],[charsNoSp,"No spaces",T.blue],[sentences,"Sentences",T.purple],[readTime,"Min read",T.emerald]] as [any,string,string][]).map(([v,l,c])=>(
        <div key={l} style={{background:T.bg2,border:`1px solid ${c}25`,borderRadius:10,padding:"12px 14px",textAlign:"center"}}>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:24,fontWeight:700,color:c}}>{v}</div>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,marginTop:3}}>{l}</div>
        </div>
      ))}
    </div>
  </div>;
}


export default WordCounter
