'use client'
// ── components/calculators/Developer/Base64Tool.tsx ──
// (nafindra avy amin'ny SmartCalcHub.tsx taloha — fn: TBase64)

import { useState } from 'react'
import { useTheme, useOnResult } from '../shared/contexts'
import { CopyBtn, Textarea, ErrBox, ModeToggle } from '../shared/ui'

function Base64Tool() {
  const { T } = useTheme();
  const onResult = useOnResult();
  const [inp,setInp]=useState(""); const [out,setOut]=useState(""); const [mode,setMode]=useState("enc"); const [err,setErr]=useState("");
  const run=(text,m)=>{
    setInp(text); setErr(""); if(!text){setOut("");return;}
    try {
      setOut(m==="enc"?btoa(unescape(encodeURIComponent(text))):decodeURIComponent(escape(atob(text))));
    } catch { setErr("Invalid format"); setOut(""); }
  };
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <ModeToggle options={[{v:"enc",label:"🔒 Encode → Base64"},{v:"dec",label:"🔓 Decode → Text"}]} value={mode} onChange={m=>{setMode(m);run(inp,m);}}/>
    <Textarea value={inp} onChange={t=>run(t,mode)} placeholder={mode==="enc"?"café, emoji 🚀, unicode…":"SGVsbG8gV29ybGQ="}/>
    <ErrBox msg={err}/>
    {!err&&out&&<div style={{display:"flex",flexDirection:"column",gap:6}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:"Inter,sans-serif",fontSize:11,color:T.txt3,textTransform:"uppercase",letterSpacing:"0.07em"}}>Output</span>
        <CopyBtn text={out} small/>
      </div>
      <Textarea value={out} readOnly color={T.emerald}/>
    </div>}
    <div style={{fontSize:11,color:T.txt4,fontFamily:"Inter,sans-serif"}}>✓ UTF-8 safe · accents, emoji, unicode</div>
  </div>;
}


export default Base64Tool
