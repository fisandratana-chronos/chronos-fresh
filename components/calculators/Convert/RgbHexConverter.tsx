'use client'
// ── components/calculators/Convert/RgbHexConverter.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TRGB)

import { useState } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { Inp } from '../shared/ui'

function RgbHexConverter() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [r,setR]=useState("245"); const [g,setG]=useState("158"); const [b,setB]=useState("11");
  const toH=c=>{const x=Math.max(0,Math.min(255,parseInt(c)||0)).toString(16);return x.length===1?"0"+x:x;};
  const hex=`#${toH(r)}${toH(g)}${toH(b)}`;
  const [copied,setCopied]=useState(false);
  const copy=()=>{navigator.clipboard?.writeText(hex);setCopied(true);setTimeout(()=>setCopied(false),1400);};
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    {([["R","Red",r,setR,T.red],["G","Green",g,setG,T.emerald],["B","Blue",b,setB,T.blue]] as [string,string,string,(v:string)=>void,string][]).map(([k,lbl,val,fn,col])=>(
      <div key={k} style={{display:"flex",flexDirection:"column",gap:6}}>
        <label style={{fontFamily:"Inter,sans-serif",fontSize:11,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.07em",color:col}}>{lbl} (0–255) — {val}</label>
        <input type="range" min="0" max="255" value={val} onChange={e=>fn(e.target.value)} style={{accentColor:col,cursor:"pointer",height:6}}/>
        <Inp type="number" value={val} onChange={fn} min="0" max="255"/>
      </div>
    ))}
    <div style={{display:"flex",alignItems:"center",gap:16,background:T.bg2,borderRadius:12,padding:16,border:`1px solid ${T.border}`}}>
      <div style={{width:60,height:60,borderRadius:10,background:hex,boxShadow:`0 4px 20px ${hex}60`,flexShrink:0,transition:"background .1s"}}/>
      <div style={{flex:1}}>
        <div style={{fontSize:10,color:T.txt3,fontFamily:"Inter,sans-serif",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>HEX CODE</div>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:26,fontWeight:700,color:T.amber}}>{hex.toUpperCase()}</div>
      </div>
      <button onClick={copy} style={{background:copied?T.emerald:T.bg3,border:`1px solid ${T.border}`,borderRadius:8,padding:"9px 14px",fontFamily:"'Space Grotesk',sans-serif",fontSize:12,fontWeight:600,color:copied?"#000":T.txt2,cursor:"pointer",transition:"all .2s"}}>{copied?"✓":"Copy"}</button>
    </div>
  </div>;
}


export default RgbHexConverter
