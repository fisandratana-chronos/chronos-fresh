'use client'
// ── components/calculators/Misc/RandomPicker.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TRandomPick)

import { useState } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { ResBox, CopyBtn } from '../shared/ui'

function RandomPicker() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [text,setText]=useState(""); const [picked,setPicked]=useState(null); const [spinning,setSpinning]=useState(false);
  const items = text.split("\n").map(s=>s.trim()).filter(Boolean);
  const pick = ()=>{
    if(items.length===0) return;
    setSpinning(true);
    let count=0; const maxCount=14;
    const interval=setInterval(()=>{
      setPicked(items[Math.floor(Math.random()*items.length)]);
      count++;
      if(count>=maxCount){
        clearInterval(interval);
        setSpinning(false);
        const final=items[Math.floor(Math.random()*items.length)];
        setPicked(final);
        onResult({label:`${items.length} options`,rows:[{k:"Picked",v:final},{k:"From",v:`${items.length} items`}]});
      }
    },80);
  };
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      <label style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,textTransform:"uppercase",letterSpacing:"0.07em"}}>
        Options (one per line)
      </label>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={6}
        placeholder={"Pizza\nSushi\nBurger\nTacos"}
        style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:T.txt,
          background:T.bg4,border:`1px solid ${T.border}`,borderRadius:8,padding:"11px 13px",
          outline:"none",resize:"vertical",lineHeight:1.6,boxSizing:"border-box"}}/>
    </div>
    <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:T.txt3}}>
      {items.length} option{items.length!==1?"s":""} entered
    </div>
    <button onClick={pick} disabled={items.length<2||spinning}
      style={{padding:"13px 18px",borderRadius:9,border:"none",
        background:items.length<2?T.bg4:T.amber,
        color:items.length<2?T.txt4:"#000",
        fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,
        cursor:items.length<2||spinning?"default":"pointer",transition:"all .15s"}}>
      {spinning?"🎲 Picking...":"🎲 Pick Random"}
    </button>
    {items.length<2&&<div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:T.txt4}}>
      Enter at least 2 options, one per line.
    </div>}
    {picked&&<ResBox accent={T.amber}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:28,fontWeight:700,
          color:T.amber,wordBreak:"break-word"}}>
          {picked}
        </div>
        {!spinning&&<CopyBtn text={picked} small/>}
      </div>
    </ResBox>}
  </div>;
}

// ── TLoan — mitovy amin'ny TEMI (EMI calculator) fa manana


export default RandomPicker
